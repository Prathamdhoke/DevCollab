import { useEffect, useState, useRef } from "react";

import "./ChatWindow.css";

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

import {
  MainContainer,
  ChatContainer,
  ConversationHeader,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";

import api from "../../api/axios.js";

import { useAuth } from "../../context/AuthContext.jsx";

import socket from "../../socket/socket.js";

function ChatWindow({ conversation, selectedUser, setConversations }) {
  const { user } = useAuth();

  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(true);

  const messagesEndRef = useRef(null);

  /* =====================================================
              SCROLL TO BOTTOM
  ===================================================== */

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  /* =====================================================
              GET OLD MESSAGES
  ===================================================== */

  const getMessages = async () => {
    try {
      setLoading(true);

      const response = await api.get(`/messages/${conversation._id}`);

      if (response.data.success) {
        setMessages(response.data.data);
      }
    } catch (error) {
      console.log("Get Conversation Messages Error:", error);
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
              LOAD MESSAGES
  ===================================================== */

  useEffect(() => {
    if (!conversation?._id) {
      return;
    }

    getMessages();
  }, [conversation?._id]);

  /* =====================================================
              AUTO SCROLL
  ===================================================== */

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  /* =====================================================
              JOIN CONVERSATION
  ===================================================== */

  useEffect(() => {
    if (!conversation?._id) {
      return;
    }

    if (!socket.connected) {
      socket.connect();
    }

    socket.emit("join-conversation", conversation._id);

    return () => {
      socket.off("new-message");
    };
  }, [conversation?._id]);

  /* =====================================================
              RECEIVE NEW MESSAGE
  ===================================================== */

  useEffect(() => {
    if (!conversation?._id) {
      return;
    }

    const handleNewMessage = (message) => {
      if (message.conversation?.toString() !== conversation._id.toString()) {
        return;
      }

      setMessages((previousMessages) => {
        const alreadyExists = previousMessages.some(
          (previousMessage) => previousMessage._id === message._id,
        );

        if (alreadyExists) {
          return previousMessages;
        }

        return [...previousMessages, message];
      });

      /*
          MOVE CONVERSATION TO TOP
      */

      if (setConversations) {
        setConversations((previousConversations) => {
          const updatedConversation = previousConversations.find(
            (item) => item._id === conversation._id,
          );

          if (!updatedConversation) {
            return previousConversations;
          }

          const newConversation = {
            ...updatedConversation,

            lastMessage: message.text,

            updatedAt: new Date(),
          };

          return [
            newConversation,

            ...previousConversations.filter(
              (item) => item._id !== conversation._id,
            ),
          ];
        });
      }
    };

    socket.on("new-message", handleNewMessage);

    return () => {
      socket.off("new-message", handleNewMessage);
    };
  }, [conversation?._id]);

  /* =====================================================
              SEND MESSAGE
  ===================================================== */

  const handleSendMessage = (text) => {
    if (!text || !text.trim()) {
      return;
    }

    socket.emit("send-message", {
      conversationId: conversation._id,

      text: text.trim(),
    });
  };

  if (!conversation || !selectedUser) {
    return null;
  }

  return (
    <div className="chat-window">
      <MainContainer>
        <ChatContainer>
          <ConversationHeader>
            <ConversationHeader.Content
              userName={selectedUser.name}
              info={selectedUser.isOnline ? "Online" : "Offline"}
            />
          </ConversationHeader>

          <MessageList>
            {loading ? (
              <div className="chat-loading">Loading messages...</div>
            ) : messages.length === 0 ? (
              <div className="chat-empty">
                <p>No messages yet.</p>

                <span>Send a message to start the conversation.</span>
              </div>
            ) : (
              messages.map((message) => (
                <Message
                  key={message._id}
                  model={{
                    message: message.text,

                    sentTime: new Date(message.createdAt).toLocaleTimeString(
                      [],
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      },
                    ),

                    sender: message.sender?.name || "User",

                    direction:
                      message.sender?._id?.toString() === user?._id?.toString()
                        ? "outgoing"
                        : "incoming",

                    position: "single",
                  }}
                />
              ))
            )}

            <div ref={messagesEndRef} />
          </MessageList>

          <MessageInput
            placeholder="Type your message..."
            onSend={handleSendMessage}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
}

export default ChatWindow;
