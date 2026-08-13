import "./ConversationList.css";

function ConversationList({
  conversations,
  selectedConversation,
  setSelectedConversation,
  currentUser,
}) {
  /* =====================================================
                    GET OTHER USER
  ===================================================== */

  const getOtherUser = (conversation) => {
    if (!conversation || !currentUser) {
      return null;
    }

    return (
      conversation.participants?.find(
        (participant) =>
          participant._id?.toString() !== currentUser._id?.toString(),
      ) || null
    );
  };

  /* =====================================================
                        RENDER
  ===================================================== */

  return (
    <div className="conversation-list">
      {/* ==========================
              HEADER
      ========================== */}

      <div className="conversation-header">
        <h2>Conversations</h2>
      </div>

      {/* ==========================
              CONVERSATIONS
      ========================== */}

      <div className="conversation-items">
        {conversations.length === 0 ? (
          <div className="conversation-empty">
            <p>No conversations yet.</p>

            <span>Start a new chat to begin messaging.</span>
          </div>
        ) : (
          conversations.map((conversation) => {
            const otherUser = getOtherUser(conversation);

            if (!otherUser) {
              return null;
            }

            const isSelected = selectedConversation?._id === conversation._id;

            return (
              <div
                key={conversation._id}
                className={`conversation-card ${isSelected ? "active" : ""}`}
                onClick={() => setSelectedConversation(conversation)}
              >
                <div className="conversation-avatar">
                  {otherUser.name?.charAt(0).toUpperCase()}
                </div>

                <div className="conversation-info">
                  <div className="conversation-top">
                    <h3>
                      {otherUser?.name || otherUser?.username || "Unknown User"}
                    </h3>

                    <span>
                      {conversation.updatedAt &&
                        new Date(conversation.updatedAt).toLocaleTimeString(
                          [],
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          },
                        )}
                    </span>
                  </div>

                  <p className="last-message">
                    {conversation.lastMessage || "Start a conversation"}
                  </p>

                  <div className="conversation-footer">
                    <span className={otherUser.isOnline ? "online" : "offline"}>
                      {otherUser.isOnline ? "● Online" : "● Offline"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default ConversationList;
