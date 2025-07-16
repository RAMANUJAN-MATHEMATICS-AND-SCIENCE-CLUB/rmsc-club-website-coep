import React, { useState } from "react";
import "./Events.css";

// Events component to display club events
// This component includes sections for upcoming and past events with images and descriptions

function Events() {
  const [registrations, setRegistrations] = useState({});
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    year: "",
    branch: "",
  });

  const handleRegister = (eventTitle) => {
    setSelectedEvent(eventTitle);
    setShowRegistrationForm(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setRegistrations({
      ...registrations,
      [selectedEvent]: [...(registrations[selectedEvent] || []), formData],
    });
    setFormData({ name: "", email: "", phone: "", year: "", branch: "" });
    setShowRegistrationForm(false);
    alert(`Successfully registered for ${selectedEvent}!`);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Use require to import images so they are bundled correctly
  return (
    <div className="events-page">
      <h1>Club Events</h1>

      {showRegistrationForm && (
        <div className="registration-modal">
          <div className="registration-form">
            <h3>Register for {selectedEvent}</h3>
            <form onSubmit={handleFormSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
              <select
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Year</option>
                <option value="1st">1st Year</option>
                <option value="2nd">2nd Year</option>
                <option value="3rd">3rd Year</option>
                <option value="4th">4th Year</option>
              </select>
              <input
                type="text"
                name="branch"
                placeholder="Branch/Department"
                value={formData.branch}
                onChange={handleInputChange}
                required
              />
              <div className="form-actions">
                <button type="submit" className="register-btn">
                  Register
                </button>
                <button
                  type="button"
                  onClick={() => setShowRegistrationForm(false)}
                  className="cancel-btn"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <section className="event-section">
        <h2>Upcoming Events</h2>
        <div className="event-card">
          <img
            src={require("../assets/images/event1.jpeg")}
            alt="Tech Quiz 2025"
            className="event-image"
          />
          <div className="event-content">
            <h3>Tech Quiz 2025</h3>
            <p className="event-date">📅 Date: 10th August 2025</p>
            <p className="event-time">🕐 Time: 2:00 PM - 4:00 PM</p>
            <p className="event-venue">📍 Venue: Seminar Hall, COEP</p>
            <p>
              Join us for a challenging and fun-filled tech quiz open to all
              students! Test your knowledge in various tech domains.
            </p>
            <div className="event-stats">
              <span className="stat">💰 Free Entry</span>
              <span className="stat">🎁 Exciting Prizes</span>
              <span className="stat">📝 Certificate</span>
            </div>
            <button
              className="register-event-btn"
              onClick={() => handleRegister("Tech Quiz 2025")}
            >
              🎯 Register Now
            </button>
          </div>
        </div>
      </section>

      <section className="event-section">
        <h2>Past Events</h2>
        <div className="event-card past-event">
          <img
            src={require("../assets/images/event2.jpeg")}
            alt="Science Fair 2024"
            className="event-image"
          />
          <div className="event-content">
            <h3>Science Fair 2024</h3>
            <p className="event-date">📅 Date: 5th March 2024</p>
            <p>A showcase of student-led science and technology projects.</p>
            <div className="event-stats">
              <span className="stat">👥 150+ Participants</span>
              <span className="stat">🏆 20 Winners</span>
              <span className="stat">⭐ Huge Success</span>
            </div>
            <button className="view-gallery-btn" disabled>
              📸 View Gallery
            </button>
          </div>
        </div>
        <div className="event-card past-event">
          <img
            src={require("../assets/images/event3.jpg")}
            alt="Workshop on AI"
            className="event-image"
          />
          <div className="event-content">
            <h3>Workshop on AI</h3>
            <p className="event-date">📅 Date: 15th September 2023</p>
            <p>
              Hands-on workshop introducing students to Artificial Intelligence.
            </p>
            <div className="event-stats">
              <span className="stat">👥 80+ Participants</span>
              <span className="stat">💻 Hands-on Learning</span>
              <span className="stat">📜 Certificates</span>
            </div>
            <button className="view-gallery-btn" disabled>
              📸 View Gallery
            </button>
          </div>
        </div>
        <div className="event-card past-event">
          <img
            src={require("../assets/images/event4.jpeg")}
            alt="Coding Competition"
            className="event-image"
          />
          <div className="event-content">
            <h3>Coding Competition</h3>
            <p className="event-date">📅 Date: 20th November 2023</p>
            <p>
              Annual coding competition with challenging problems and exciting
              prizes.
            </p>
            <div className="event-stats">
              <span className="stat">👥 120+ Coders</span>
              <span className="stat">🏆 Cash Prizes</span>
              <span className="stat">⚡ Intense Competition</span>
            </div>
            <button className="view-gallery-btn" disabled>
              📸 View Gallery
            </button>
          </div>
        </div>
        <div className="event-card past-event">
          <img
            src={require("../assets/images/event5.png")}
            alt="Tech Talk Series"
            className="event-image"
          />
          <div className="event-content">
            <h3>Tech Talk Series</h3>
            <p className="event-date">📅 Date: 12th October 2023</p>
            <p>
              Industry experts sharing insights on latest technology trends.
            </p>
            <div className="event-stats">
              <span className="stat">👥 200+ Attendees</span>
              <span className="stat">🎤 Industry Experts</span>
              <span className="stat">🚀 Career Insights</span>
            </div>
            <button className="view-gallery-btn" disabled>
              📸 View Gallery
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Events;
