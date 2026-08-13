import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">

      <h2>DevCollab</h2>

      <p className="footer-description">
        DevCollab is a collaborative workspace built for developers to create
        projects, work with teams, discuss ideas, manage tasks and deliver
        software from one unified platform.
      </p>

      <p className="footer-tagline">
        Empowering developers to build better, together.
      </p>

      <div className="footer-bottom">
        © {new Date().getFullYear()} DevCollab. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;