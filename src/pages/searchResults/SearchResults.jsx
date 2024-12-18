import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./SearchResults.css";
import Navbar from "../../components/navbar/Navbar";
import SearchBar from "../../components/searchBar/SearchBar";
import { data } from "../../utils/data";

const SearchResults = () => {
  const [filteredUsers, setFilteredUsers] = useState(data);
  const [loading, setLoading] = useState(false);
  const location = useLocation(); // Get the current location (URL)
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("q"); // Get the search query parameter
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  function filterUsersByName(q) {
    return data.filter(
      (user) =>
        user.first_name.toLowerCase().includes(q.toLowerCase()) ||
        user.last_name.toLowerCase().includes(q.toLowerCase())
    );
  }

  useEffect(() => {
    if (searchTerm) {
      const users = filterUsersByName(searchTerm);
      setFilteredUsers(users);
    }
  }, [searchTerm]);

  const handleFetchDetails = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  return (
    <>
      <Navbar searchResultPage={true} />
      <SearchBar isSearchResults={true} />
      {/* Show only on mobile */}
      <div className={`search-results ${showModal ? "blur-background" : ""}`}>
        {loading && <p>Loading...</p>}
        {filteredUsers.length === 0 && !loading ? (
          <div className="empty-state">
            <img src="errorImg.png" alt="No Results" />
            <p>No results found</p>
          </div>
        ) : (
          <div className="card-container">
            {filteredUsers?.map((user, idx) => (
              <div key={idx} className="user-card">
                <div className="card-top">
                  <img src={"ellipseImg.png"} alt={`${user.first_name}`} />
                  <span className="name">{`${user.first_name} ${user.last_name}`}</span>
                  <span>
                    <i className="fas fa-map-marker-alt location-icon"></i>
                    <span>{user.city}</span>
                  </span>
                </div>

                <div className="card-bottom">
                  <div className="details">
                    <i className="fas fa-phone contact-icon"></i>
                    <span>{user.contact_number}</span> <br />
                    <span className="available">Available on phone</span>
                  </div>

                  <div className="fetch-btn-container">
                    <button onClick={() => handleFetchDetails(user)}>
                      Fetch Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {showModal && selectedUser && (
          <div className="modal">
            <div className="modal-content">
              <h2>Fetch Details</h2>
              <p>Here are the details of the following employee.</p>
              <p className="headings">
                <strong>Name:</strong> {selectedUser.first_name}{" "}
                {selectedUser.last_name}
              </p>
              <p className="headings">
                <strong>Location:</strong> {selectedUser.city}
              </p>
              <p className="headings">
                <strong>Contact Number:</strong> {selectedUser.contact_number}
              </p>
              <p>
                <strong>Profile Image:</strong>
              </p>
              <img
                src="popupImg.png"
                alt="Profile"
                style={{ width: "100px", height: "100px" }}
              />
              <button onClick={handleCloseModal} className="close-button">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchResults;
