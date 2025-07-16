import React from "react";
import { motion } from "framer-motion";
import "./About.css";

const objectives = [
  {
    icon: "🔬",
    title: "Scientific Curiosity",
    description:
      "Cultivate curiosity about the elegance and depth of mathematics and science",
  },
  {
    icon: "🌐",
    title: "Interdisciplinary Learning",
    description: "Familiarize students with various interdisciplinary branches",
  },
  {
    icon: "🎓",
    title: "Expert Sessions",
    description:
      "Host lectures, workshops, and webinars by eminent personalities",
  },
  {
    icon: "🏆",
    title: "Competitions",
    description: "Organize innovative competitions, quizzes, and exhibitions",
  },
  {
    icon: "📚",
    title: "Research Focus",
    description: "Encourage research-oriented and project-based learning",
  },
];

const achievements = [
  { number: "500+", label: "Active Members", icon: "👥" },
  { number: "50+", label: "Events Conducted", icon: "📅" },
  { number: "20+", label: "Guest Lectures", icon: "🎤" },
  { number: "15+", label: "Research Projects", icon: "🔬" },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const About = () => (
  <div className="about-page">
    <motion.section
      className="about-hero"
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
    >
      <div className="hero-content">
        <motion.div className="hero-badge" variants={fadeInUp}>
          <span>🧮 Est. 2018</span>
        </motion.div>
        <motion.h1 variants={fadeInUp}>
          Ramanujan Mathematics & Science Club
        </motion.h1>
        <motion.p variants={fadeInUp}>
          Inspiring the next generation of mathematicians, scientists, and
          innovators at COEP Technological University
        </motion.p>
        <motion.div className="hero-stats" variants={staggerContainer}>
          {achievements.map((achievement, index) => (
            <motion.div key={index} className="stat-card" variants={fadeInUp}>
              <span className="stat-icon">{achievement.icon}</span>
              <span className="stat-number">{achievement.number}</span>
              <span className="stat-label">{achievement.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>

    <motion.section
      className="about-story"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
    >
      <div className="story-content">
        <div className="story-text">
          <h2>Our Story</h2>
          <p>
            Named after the legendary mathematician{" "}
            <strong>Srinivasa Ramanujan</strong>, our club embodies the spirit
            of curiosity and mathematical intuition that made him extraordinary.
            Since our establishment in 2018, we have been fostering a community
            where students can explore the beautiful intersection of
            mathematics, science, and technology.
          </p>
          <p>
            At RMSC, we believe that mathematics and science are not just
            subjects to be studied, but languages to understand the universe.
            Our mission is to make these subjects accessible, engaging, and fun
            for every student at COEP.
          </p>
        </div>
        <div className="story-image">
          <div className="ramanujan-tribute">
            <h3>🧠 Srinivasa Ramanujan</h3>
            <p>
              "An equation means nothing to me unless it expresses a thought of
              God."
            </p>
            <div className="tribute-details">
              <span>1887 - 1920</span>
              <span>Mathematical Genius</span>
            </div>
          </div>
        </div>
      </div>
    </motion.section>

    <motion.section
      className="about-objectives"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
    >
      <motion.h2 variants={fadeInUp}>Our Mission & Objectives</motion.h2>
      <motion.div className="objectives-grid" variants={staggerContainer}>
        {objectives.map((objective, index) => (
          <motion.div
            key={index}
            className="objective-card"
            variants={fadeInUp}
          >
            <div className="objective-icon">{objective.icon}</div>
            <h3>{objective.title}</h3>
            <p>{objective.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>

    <motion.section
      className="about-vision"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
    >
      <div className="vision-content">
        <div className="vision-text">
          <h2>Why Choose RMSC?</h2>
          <div className="benefits-list">
            <div className="benefit-item">
              <span className="benefit-icon">🚀</span>
              <div>
                <h4>Innovation-Driven Learning</h4>
                <p>
                  Explore cutting-edge topics through hands-on workshops and
                  practical sessions
                </p>
              </div>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">🤝</span>
              <div>
                <h4>Collaborative Environment</h4>
                <p>
                  Work with like-minded peers on exciting projects and research
                  initiatives
                </p>
              </div>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">🎯</span>
              <div>
                <h4>Industry Connections</h4>
                <p>
                  Network with professionals and experts through guest lectures
                  and seminars
                </p>
              </div>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">📈</span>
              <div>
                <h4>Skill Development</h4>
                <p>
                  Enhance analytical thinking, problem-solving, and presentation
                  skills
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>

    <motion.section
      className="about-cta"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
    >
      <div className="cta-content">
        <h2>Ready to Join Our Journey?</h2>
        <p>
          Whether you're passionate about pure mathematics, applied sciences, or
          simply curious about how the world works, RMSC welcomes you with open
          arms.
        </p>
        <div className="cta-buttons">
          <button
            className="cta-btn primary"
            onClick={() => (window.location.href = "/events")}
          >
            🎯 Explore Events
          </button>
          <button
            className="cta-btn secondary"
            onClick={() => (window.location.href = "/contact")}
          >
            💬 Get in Touch
          </button>
        </div>
      </div>
    </motion.section>
  </div>
);

export default About;
