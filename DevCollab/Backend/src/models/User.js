import mongoose from "mongoose";

import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    /* ===========================================
                    AUTHENTICATION
        =========================================== */

    name: {
      type: String,

      required: true,

      trim: true,
    },

    username: {
      type: String,

      required: true,

      unique: true,

      trim: true,
    },

    email: {
      type: String,

      required: true,

      unique: true,

      lowercase: true,

      trim: true,
    },

    password: {
      type: String,

      required: true,

      minlength: 8,
    },

    /* ===========================================
                        PROFILE
        =========================================== */

    avatar: {
      type: String,

      default: "/avatars/default.png",
    },

    bio: {
      type: String,

      default: "",
    },

    location: {
      type: String,

      default: "",
    },

    website: {
      type: String,

      default: "",
    },

    role: {
      type: String,

      default: "",
    },

    /* ===========================================
                        SKILLS
        =========================================== */

    skills: [
      {
        type: String,
      },
    ],

    /* ===========================================
                    SOCIAL LINKS
        =========================================== */

    socialLinks: {
      github: {
        type: String,

        default: "",
      },

      linkedin: {
        type: String,

        default: "",
      },

      portfolio: {
        type: String,

        default: "",
      },

      twitter: {
        type: String,

        default: "",
      },
    },

    /* ===========================================
                        STATUS
        =========================================== */

    isVerified: {
      type: Boolean,

      default: false,
    },

    isOnline: {
      type: Boolean,

      default: false,
    },

    lastSeen: {
      type: Date,

      default: Date.now,
    },

    /* ===========================================
                    RELATIONSHIPS
        =========================================== */

    ownedTeams: [
      {
        type: mongoose.Schema.Types.ObjectId,

        ref: "Team",
      },
    ],

    joinedTeams: [
      {
        type: mongoose.Schema.Types.ObjectId,

        ref: "Team",
      },
    ],

    ownedProjects: [
      {
        type: mongoose.Schema.Types.ObjectId,

        ref: "Project",
      },
    ],

    joinedProjects: [
      {
        type: mongoose.Schema.Types.ObjectId,

        ref: "Project",
      },
    ],

    assignedTasks: [
      {
        type: mongoose.Schema.Types.ObjectId,

        ref: "Task",
      },
    ],

    conversations: [
      {
        type: mongoose.Schema.Types.ObjectId,

        ref: "Conversation",
      },
    ],

    notifications: [
      {
        type: mongoose.Schema.Types.ObjectId,

        ref: "Notification",
      },
    ],
  },

  {
    timestamps: true,
  },
);

/* ===========================================
        PASSWORD HASHING
=========================================== */

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  this.password = await bcrypt.hash(this.password, 12);
});

/* ===========================================
        PASSWORD COMPARISON
=========================================== */

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(
    enteredPassword,

    this.password,
  );
};

const User = mongoose.model(
  "User",

  userSchema,
);

export default User;
