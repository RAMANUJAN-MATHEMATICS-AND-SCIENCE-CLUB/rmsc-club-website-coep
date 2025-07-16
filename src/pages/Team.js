import React from "react";
import "./Team.css";

const teamData = [
  {
    title: "Mentor",
    members: ["Dr. [Mentor Name] - Faculty Mentor"],
  },
  {
    title: "Secretary",
    members: ["[Secretary Name]"],
  },
  {
    title: "Heads",
    members: ["[Head 1 Name] - Technical Head", "[Head 2 Name] - Media Head"],
  },
  {
    title: "Coordinators",
    members: [
      "[Coordinator 1 Name]",
      "[Coordinator 2 Name]",
      "[Coordinator 3 Name]",
    ],
  },
];

function Team() {
  return (
    <div className="team-page">
      <h1>Meet Our Team</h1>
      {teamData.map((section) => (
        <section className="team-section" key={section.title}>
          <h2>{section.title}</h2>
          {section.members.map((member, idx) => (
            <div className="team-card" key={idx}>
              {member}
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}

export default Team;
