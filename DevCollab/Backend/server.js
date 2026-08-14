import dotenv from "dotenv";

dotenv.config();

import http from "http";

import jwt from "jsonwebtoken";

import app from "./src/app.js";

import connectDB from "./src/config/db.js";

import User from "./src/models/User.js";

import Conversation from "./src/models/Conversation.js";

import Message from "./src/models/Message.js";

import { Server } from "socket.io";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    const server = http.createServer(app);

    const io = new Server(server, {
      cors: {
        origin: ["http://localhost:5173", "https://devcollab-phi.vercel.app" , "https://devcollab-5xtqii2y-pratham-s-projects22.vercel.app"],

        methods: ["GET", "POST"],

        credentials: true,
      },
    });

    /* =====================================================
                    SOCKET AUTHENTICATION
    ===================================================== */

    io.use(async (socket, next) => {
      try {
        const cookieHeader = socket.handshake.headers.cookie;

        if (!cookieHeader) {
          return next(new Error("Authentication required."));
        }

        const tokenCookie = cookieHeader
          .split(";")
          .find((cookie) => cookie.trim().startsWith("token="));

        if (!tokenCookie) {
          return next(new Error("Authentication required."));
        }

        const token = tokenCookie.trim().substring("token=".length);

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
          return next(new Error("User not found."));
        }

        socket.user = user;

        next();
      } catch (error) {
        next(new Error("Invalid or expired token."));
      }
    });

    /* =====================================================
                        SOCKET CONNECTION
    ===================================================== */

    const onlineUsers = new Map();

    io.on("connection", async (socket) => {
      console.log(`Socket connected: ${socket.user.name} (${socket.id})`);

      const userId = socket.user._id.toString();

      const currentConnections = onlineUsers.get(userId) || 0;

      onlineUsers.set(userId, currentConnections + 1);

      if (currentConnections === 0) {
        await User.findByIdAndUpdate(userId, {
          isOnline: true,
        });

        io.emit("user-status", {
          userId,

          isOnline: true,
        });
      }

      /* =====================================================
                    JOIN CONVERSATION
      ===================================================== */

      socket.on("join-conversation", async (conversationId) => {
        try {
          const conversation = await Conversation.findById(conversationId);

          if (!conversation) {
            return;
          }

          const isParticipant = conversation.participants.some(
            (participantId) => participantId.toString() === userId,
          );

          if (!isParticipant) {
            return;
          }

          socket.join(conversationId);

          console.log(
            `${socket.user.name} joined conversation ${conversationId}`,
          );
        } catch (error) {
          console.log("Join Conversation Error:", error);
        }
      });

      /* =====================================================
                    SEND MESSAGE
      ===================================================== */

      socket.on("send-message", async ({ conversationId, text }) => {
        try {
          if (!conversationId) {
            return;
          }

          if (!text || !text.trim()) {
            return;
          }

          const conversation = await Conversation.findById(conversationId);

          if (!conversation) {
            console.log("Conversation not found.");

            return;
          }

          const isParticipant = conversation.participants.some(
            (participantId) =>
              participantId.toString() === socket.user._id.toString(),
          );

          if (!isParticipant) {
            console.log("User is not a participant.");

            return;
          }

          const receiverId = conversation.participants.find(
            (participantId) =>
              participantId.toString() !== socket.user._id.toString(),
          );

          if (!receiverId) {
            console.log("Receiver not found.");

            return;
          }

          const newMessage = new Message({
            conversation: conversation._id,

            sender: socket.user._id,

            receiver: receiverId,

            text: text.trim(),
          });

          await newMessage.save();

          console.log("Message saved:", newMessage._id.toString());

          conversation.updatedAt = new Date();

          conversation.lastMessage = text.trim();

          await conversation.save();

          await newMessage.populate("sender", "name username avatar");

          await newMessage.populate("receiver", "name username avatar");

          io.to(conversationId).emit("new-message", newMessage);
        } catch (error) {
          console.log("Socket Send Message Error:", error);
        }
      });

      /* =====================================================
                    DISCONNECT
      ===================================================== */

      socket.on("disconnect", async () => {
        console.log(`Socket disconnected: ${socket.user.name} (${socket.id})`);

        const connections = onlineUsers.get(userId) || 1;

        if (connections > 1) {
          onlineUsers.set(userId, connections - 1);

          return;
        }

        onlineUsers.delete(userId);

        await User.findByIdAndUpdate(userId, {
          isOnline: false,

          lastSeen: new Date(),
        });

        io.emit("user-status", {
          userId,

          isOnline: false,

          lastSeen: new Date(),
        });
      });
    });

    server.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();
