import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    /* ===========================================
                        BASIC INFORMATION
        =========================================== */

    name: {
      type: String,

      required: true,

      trim: true,
    },

    description: {
      type: String,

      default: "",

      trim: true,
    },

    /* ===========================================
                            OWNER
        =========================================== */

    owner: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,
    },

    /* ===========================================
                            MEMBERS
        =========================================== */

    members: [
      {
        type: mongoose.Schema.Types.ObjectId,

        ref: "User",
      },
    ],

    /* ===========================================
                            STATUS
        =========================================== */

    status: {
      type: String,

      enum: ["planning", "active", "completed", "archived"],

      default: "planning",
    },

    /* ===========================================
                            VISIBILITY
        =========================================== */

    visibility: {
      type: String,

      enum: ["public", "private"],

      default: "private",
    },

    /* ===========================================
                        TECHNOLOGIES
        =========================================== */

    technologies: [
      {
        type: String,

        trim: true,
      },
    ],
  },

  {
    timestamps: true,
  },
);

const Project = mongoose.model(
  "Project",

  projectSchema,
);

export default Project;
