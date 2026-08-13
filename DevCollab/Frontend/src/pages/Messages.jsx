import { useEffect, useState } from "react";

import "./Messages.css";

import api from "../api/axios.js";

import { useAuth } from "../context/AuthContext.jsx";

import ConversationList from "../components/Messages/ConversationList";
import ChatWindow from "../components/Messages/ChatWindow";
import UserProfile from "../components/Messages/UserProfile";
import SearchUsers from "../components/Messages/SearchUsers";

import socket from "../socket/socket.js";

function Messages() {
  const { user } = useAuth();

  const [conversations, setConversations] = useState([]);

  const [selectedConversation, setSelectedConversation] = useState(null);

  const [loading, setLoading] = useState(true);

  /* =====================================================
                    SOCKET CONNECTION
  ===================================================== */

  useEffect(() => {
    if (!user) {
      return;
    }

    socket.connect();

    const handleConnect = () => {
      console.log("Socket connected:", socket.id);
    };

    socket.on("connect", handleConnect);

    return () => {
      socket.off("connect", handleConnect);

      socket.disconnect();
    };
  }, [user]);

  /* =====================================================
                    USER ONLINE / OFFLINE
  ===================================================== */

  useEffect(() => {
    if (!user) {
      return;
    }

    const handleUserStatus = (statusData) => {
      setConversations((previousConversations) =>
        previousConversations.map((conversation) => ({
          ...conversation,

          participants: conversation.participants.map((participant) => {
            if (participant._id?.toString() === statusData.userId?.toString()) {
              return {
                ...participant,

                isOnline: statusData.isOnline,

                ...(statusData.lastSeen && {
                  lastSeen: statusData.lastSeen,
                }),
              };
            }

            return participant;
          }),
        })),
      );
    };

    socket.on("user-status", handleUserStatus);

    return () => {
      socket.off("user-status", handleUserStatus);
    };
  }, [user]);

  useEffect(() => {
    const handleNewMessage = (message) => {
      setConversations((previousConversations) => {
        const updatedConversations = previousConversations.map(
          (conversation) => {
            if (
              conversation._id.toString() === message.conversation.toString()
            ) {
              return {
                ...conversation,

                lastMessage: message.text,

                updatedAt: message.createdAt,
              };
            }

            return conversation;
          },
        );

        return updatedConversations.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt),
        );
      });
    };

    socket.on("new-message", handleNewMessage);

    return () => {
      socket.off("new-message", handleNewMessage);
    };
  }, []);

  /* =====================================================
                    GET CONVERSATIONS
  ===================================================== */

  const getConversations = async () => {
    try {
      setLoading(true);

      const response = await api.get("/conversations");

      if (response.data.success) {
        const conversationData = response.data.data;

        setConversations(conversationData);

        if (conversationData.length > 0) {
          setSelectedConversation(conversationData[0]);
        } else {
          setSelectedConversation(null);
        }
      }
    } catch (error) {
      console.log("Get Conversations Error:", error);
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
                        LOAD
  ===================================================== */

  useEffect(() => {
    if (user) {
      getConversations();
    }
  }, [user]);

  /* =====================================================
                    GET OTHER USER
  ===================================================== */

  const getOtherUser = (conversation) => {
    if (!conversation || !user) {
      return null;
    }

    return (
      conversation.participants?.find(
        (participant) => participant._id?.toString() !== user._id?.toString(),
      ) || null
    );
  };

  const selectedUser = getOtherUser(selectedConversation);

  /* =====================================================
                NEW CONVERSATION CREATED
  ===================================================== */

  const handleConversationCreated = (conversation) => {
    setConversations((previousConversations) => {
      const alreadyExists = previousConversations.some(
        (item) => item._id === conversation._id,
      );

      if (alreadyExists) {
        return previousConversations.map((item) =>
          item._id === conversation._id ? conversation : item,
        );
      }

      return [conversation, ...previousConversations];
    });

    setSelectedConversation(conversation);
  };

  /* =====================================================
                        RENDER
  ===================================================== */

  return (
    <div className="messages-page">
      <div className="messages-container">
        {/* ==========================
                CONVERSATIONS
        ========================== */}

        <div className="conversation-panel">
          <SearchUsers onConversationCreated={handleConversationCreated} />

          {loading ? (
            <div className="conversation-loading">Loading conversations...</div>
          ) : conversations.length === 0 ? (
            <div className="conversation-empty">
              <p>No conversations yet.</p>

              <span>Start a new chat to begin messaging.</span>
            </div>
          ) : (
            <ConversationList
              conversations={conversations}
              selectedConversation={selectedConversation}
              setSelectedConversation={setSelectedConversation}
              currentUser={user}
            />
          )}
        </div>

        {/* ==========================
                    CHAT
        ========================== */}

        <div className="chat-panel">
          {selectedConversation && selectedUser ? (
            <ChatWindow
              conversation={selectedConversation}
              selectedUser={selectedUser}
              setConversations={setConversations}
            />
          ) : (
            <div className="empty-chat">
              <h2>No conversation selected</h2>

              <p>Start a new chat to begin messaging.</p>
            </div>
          )}
        </div>

        {/* ==========================
                USER PROFILE
        ========================== */}

        <div className="profile-panel">
          {selectedUser && <UserProfile selectedUser={selectedUser} />}
        </div>
      </div>
    </div>
  );
}

export default Messages;
