import React from "react";
import "./HowItWorks.css";

const HowItWorks = () => {
  return (
    <section className="how-it-works">

      <h2>How It Works</h2>

      <p className="workflow-description">
        From project creation to deployment, DevCollab keeps your entire
        development workflow in one place.
      </p>

      <div className="workflow-grid">

        <div className="workflow-card">
          <div className="step-number">1</div>

          <h3>Create Project</h3>

          <p>
            Start a new project and invite your teammates with just a few clicks.
          </p>
        </div>

        <div className="workflow-card">
          <div className="step-number">2</div>

          <h3>Collaborate</h3>

          <p>
            Discuss ideas, assign tasks and work together in real time.
          </p>
        </div>

        <div className="workflow-card">
          <div className="step-number">3</div>

          <h3>Track Progress</h3>

          <p>
            Monitor completed tasks, project milestones and overall team progress.
          </p>
        </div>

        <div className="workflow-card">
          <div className="step-number">4</div>

          <h3>Deploy</h3>

          <p>
            Finish development and prepare your project for deployment with confidence.
          </p>
        </div>

      </div>

    </section>
  );
};

export default HowItWorks;