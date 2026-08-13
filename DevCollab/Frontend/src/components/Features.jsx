import React from 'react';
import './Features.css';

const Features = () => {
  return (
    <section className="features">

      <h2>Core Features</h2>

      <div className="feature-grid">

        <div className="feature-card">
          <span>📁</span>
          <h3>Project Management</h3>
          <p>Create, organize and manage development projects efficiently.</p>
        </div>

        <div className="feature-card">
          <span>💬</span>
          <h3>Team Collaboration</h3>
          <p>Work together with teammates through a unified workspace.</p>
        </div>

        <div className="feature-card">
          <span>📌</span>
          <h3>Task Tracking</h3>
          <p>Assign, prioritize and monitor tasks with ease.</p>
        </div>

        <div className="feature-card">
          <span>🧑‍💻</span>
          <h3>Code Discussions</h3>
          <p>Discuss implementation details directly inside the project.</p>
        </div>

        <div className="feature-card">
          <span>📊</span>
          <h3>Team Dashboard</h3>
          <p>Track project progress and team productivity in one place.</p>
        </div>

      </div>

    </section>
  );
};

export default Features;