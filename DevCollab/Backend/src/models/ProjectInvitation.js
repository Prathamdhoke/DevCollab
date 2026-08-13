import mongoose from "mongoose";

const projectInvitationSchema = new mongoose.Schema(
  {
    /* ===========================================
                    PROJECT
        =========================================== */

    project: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "Project",

      required: true,
    },

    /* ===========================================
                    INVITED USER
        =========================================== */

    invitedUser: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,
    },

    /* ===========================================
                    INVITED BY
        =========================================== */

    invitedBy: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,
    },

    /* ===========================================
                    INVITATION STATUS
        =========================================== */

    status: {
      type: String,

      enum: ["pending", "accepted", "rejected"],

      default: "pending",
    },
  },

  {
    timestamps: true,
  },
);

/* =====================================================
            PREVENT DUPLICATE PENDING INVITATIONS
===================================================== */

projectInvitationSchema.index({
  project: 1,

  invitedUser: 1,

  status: 1,
});

const ProjectInvitation = mongoose.model(
  "ProjectInvitation",
  projectInvitationSchema,
);

export default ProjectInvitation;
