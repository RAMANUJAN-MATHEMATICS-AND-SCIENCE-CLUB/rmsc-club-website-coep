import React, { useState } from "react";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 2000);
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-header">
          <h1>📞 Get in Touch</h1>
          <p>
            Have questions? We'd love to hear from you. Send us a message and
            we'll respond as soon as possible.
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <h3>📍 Contact Information</h3>
            <div className="info-item">
              <span className="icon">🏫</span>
              <div>
                <strong>Address</strong>
                <p>
                  COEP Technological University
                  <br />
                  Shivajinagar, Pune - 411005
                </p>
              </div>
            </div>
            <div className="info-item">
              <span className="icon">📧</span>
              <div>
                <strong>Email</strong>
                <p>rmsc@coep.ac.in</p>
              </div>
            </div>
            <div className="info-item">
              <span className="icon">📱</span>
              <div>
                <strong>Phone</strong>
                <p>+91 20 2507 7000</p>
              </div>
            </div>
            <div className="info-item">
              <span className="icon">🕐</span>
              <div>
                <strong>Office Hours</strong>
                <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
              </div>
            </div>

            <div className="social-links">
              <h4>🌐 Follow Us</h4>
              <div className="social-buttons">
                <button className="social-btn instagram">📸 Instagram</button>
                <button className="social-btn linkedin">💼 LinkedIn</button>
                <button className="social-btn twitter">🐦 Twitter</button>
                <button className="social-btn youtube">📺 YouTube</button>
              </div>
            </div>
          </div>

          <div className="contact-form-section">
            {isSubmitted ? (
              <div className="success-message">
                <div className="success-icon">✅</div>
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for reaching out. We'll get back to you soon.</p>
                <button
                  className="send-another-btn"
                  onClick={() => setIsSubmitted(false)}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <h3>💌 Send us a Message</h3>
                <div className="form-row">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows="6"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="loading-spinner"></span>
                      Sending...
                    </>
                  ) : (
                    "🚀 Send Message"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="map-section">
          <h3>🗺️ Find Us</h3>
          <div className="map-placeholder">
            <p>📍 COEP Technological University Campus Map</p>
            <p>Interactive map would be integrated here</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
