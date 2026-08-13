import "./Skills.css";

function Skills({ profile }) {
  const skills = profile?.skills || [];

  return (
    <section>
      <h2>Technical Skills</h2>

      <div className="skills-grid">
        {skills.length > 0 ? (
          skills.map((skill, index) => (
            <div key={index} className="skill-chip">
              {skill}
            </div>
          ))
        ) : (
          <p>No skills added yet.</p>
        )}
      </div>
    </section>
  );
}

export default Skills;
