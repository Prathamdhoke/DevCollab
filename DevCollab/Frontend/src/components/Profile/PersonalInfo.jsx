import "./PersonalInfo.css";

import { Mail, User, MapPin, Globe, FileText } from "lucide-react";

function PersonalInfo({ profile }) {
  return (
    <section>
      <h2>Personal Information</h2>

      <div className="info-list">
        <div className="info-item">
          <Mail size={18} />

          <div>
            <span>Email</span>

            <p>{profile?.email || "Not provided"}</p>
          </div>
        </div>

        <div className="info-item">
          <User size={18} />

          <div>
            <span>Username</span>

            <p>{profile?.username || "Not provided"}</p>
          </div>
        </div>

        <div className="info-item">
          <MapPin size={18} />

          <div>
            <span>Location</span>

            <p>{profile?.location || "Not provided"}</p>
          </div>
        </div>

        <div className="info-item">
          <Globe size={18} />

          <div>
            <span>Website</span>

            <p>{profile?.website || "Not provided"}</p>
          </div>
        </div>

        <div className="info-item">
          <FileText size={18} />

          <div>
            <span>Bio</span>

            <p>{profile?.bio || "No bio added yet."}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PersonalInfo;
