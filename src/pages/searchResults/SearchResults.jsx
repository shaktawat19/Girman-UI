import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./SearchResults.css";
import Navbar from "../../components/navbar/Navbar";
import SearchBar from "../../components/searchBar/SearchBar";
import { Modal } from "../../components/Modal/Modal";
import { data } from "../../utils/data";

const SearchResults = () => {
  const [filteredUsers, setFilteredUsers] = useState(data);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("q");
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

        {/* Shadcn Modal */}
        <Modal
          isOpen={showModal}
          onClose={handleCloseModal}
          title="Fetch Details"
          description="Here are the details of the following employee."
        >
          {selectedUser && (
            <>
              <p className="mt-2">
                <strong>Name:</strong> {selectedUser.first_name}{" "}
                {selectedUser.last_name}
              </p>
              <p className="">
                <strong>Location:</strong> {selectedUser.city}
              </p>
              <p className="">
                <strong>Contact Number:</strong> {selectedUser.contact_number}
              </p>
              <p className="mt-2">
                <strong>Profile Image:</strong>
              </p>
              <img
                src="popupImg.png"
                alt="Profile"
                className="mt-2 w-24 h-24"
              />
            </>
          )}
        </Modal>
      </div>
    </>
  );
};

export default SearchResults;
