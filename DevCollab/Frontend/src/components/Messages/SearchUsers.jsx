import { useState } from "react";

import "./SearchUsers.css";

import { Search, UserPlus, Users, X } from "lucide-react";

import api from "../../api/axios.js";

function SearchUsers({ onConversationCreated }) {
  const [showNewChat, setShowNewChat] = useState(false);

  const [contacts, setContacts] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [searchResult, setSearchResult] = useState(null);

  const [loadingContacts, setLoadingContacts] = useState(false);

  const [searching, setSearching] = useState(false);

  const [creating, setCreating] = useState(false);

  const [error, setError] = useState("");

  /* =====================================================
                    OPEN NEW CHAT
  ===================================================== */

  const handleOpenNewChat = async () => {
    setShowNewChat(true);

    setError("");

    setSearchTerm("");

    setSearchResult(null);

    try {
      setLoadingContacts(true);

      const response = await api.get("/conversations/contacts");

      if (response.data.success) {
        setContacts(response.data.data);
      }
    } catch (error) {
      console.log("Get Project Contacts Error:", error);

      setError(
        error.response?.data?.message || "Failed to load project members.",
      );
    } finally {
      setLoadingContacts(false);
    }
  };

  /* =====================================================
                    CLOSE NEW CHAT
  ===================================================== */

  const handleCloseNewChat = () => {
    setShowNewChat(false);

    setSearchTerm("");

    setSearchResult(null);

    setError("");
  };

  /* =====================================================
                    SEARCH USER
  ===================================================== */

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchTerm.trim()) {
      setSearchResult(null);

      return;
    }

    try {
      setSearching(true);

      setError("");

      const response = await api.get(
        `/conversations/search?username=${encodeURIComponent(
          searchTerm.trim(),
        )}`,
      );

      if (response.data.success) {
        setSearchResult(response.data.data);
      }
    } catch (error) {
      console.log("Search User Error:", error);

      setSearchResult(null);

      setError(error.response?.data?.message || "User not found.");
    } finally {
      setSearching(false);
    }
  };

  /* =====================================================
                CREATE / OPEN CONVERSATION
  ===================================================== */

  const handleStartChat = async (selectedUser) => {
    if (!selectedUser) {
      return;
    }

    try {
      setCreating(true);

      setError("");

      const response = await api.post("/conversations", {
        userId: selectedUser._id,
      });

      if (response.data.success) {
        onConversationCreated(response.data.data);

        handleCloseNewChat();
      }
    } catch (error) {
      console.log("Create Conversation Error:", error);

      setError(
        error.response?.data?.message || "Failed to start conversation.",
      );
    } finally {
      setCreating(false);
    }
  };

  /* =====================================================
                    CONTACT CARD
  ===================================================== */

  const renderUser = (contact) => {
    return (
      <button
        type="button"
        className="new-chat-user"
        key={contact._id}
        onClick={() => handleStartChat(contact)}
        disabled={creating}
      >
        <div className="new-chat-avatar">
          {contact.name?.charAt(0).toUpperCase()}
        </div>

        <div className="new-chat-user-info">
          <strong>{contact.name}</strong>

          <span>@{contact.username}</span>

          <small className={contact.isOnline ? "online" : "offline"}>
            {contact.isOnline ? "● Online" : "● Offline"}
          </small>
        </div>
      </button>
    );
  };

  return (
    <>
      {/* =================================================
                        NEW CHAT BUTTON
      ================================================= */}

      <button
        type="button"
        className="new-chat-btn"
        onClick={handleOpenNewChat}
      >
        <UserPlus size={18} />
        New Chat
      </button>

      {/* =================================================
                        NEW CHAT MODAL
      ================================================= */}

      {showNewChat && (
        <div className="new-chat-overlay">
          <div className="new-chat-modal">
            {/* ==========================
                    HEADER
            ========================== */}

            <div className="new-chat-header">
              <div>
                <h2>New Chat</h2>

                <p>Choose someone from your projects or search by username.</p>
              </div>

              <button
                type="button"
                className="new-chat-close"
                onClick={handleCloseNewChat}
              >
                <X size={20} />
              </button>
            </div>

            {/* ==========================
                    SEARCH
            ========================== */}

            <form className="new-chat-search" onSubmit={handleSearch}>
              <Search size={18} />

              <input
                type="text"
                placeholder="Search by username..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);

                  setSearchResult(null);

                  setError("");
                }}
              />

              <button type="submit" disabled={searching || !searchTerm.trim()}>
                {searching ? "Searching..." : "Search"}
              </button>
            </form>

            {/* ==========================
                    ERROR
            ========================== */}

            {error && <div className="new-chat-error">{error}</div>}

            {/* ==========================
                    SEARCH RESULT
            ========================== */}

            {searchResult && (
              <div className="new-chat-section">
                <h3>Search Result</h3>

                {renderUser(searchResult)}
              </div>
            )}

            {/* ==========================
                PROJECT CONTACTS
            ========================== */}

            <div className="new-chat-section">
              <div className="new-chat-section-title">
                <Users size={17} />

                <h3>People From Your Projects</h3>
              </div>

              {loadingContacts ? (
                <p className="new-chat-message">Loading project members...</p>
              ) : contacts.length === 0 ? (
                <p className="new-chat-message">
                  No other project members found.
                </p>
              ) : (
                <div className="new-chat-users">
                  {contacts.map((contact) => renderUser(contact))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SearchUsers;
