import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import clubImage from "../assets/images/rmsc-banner.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, duration: 0.6, ease: "easeOut" },
  }),
};

const Home = () => (
  <div className="home container-fluid px-0">
    <motion.section
      className="hero-alt row align-items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="hero-content col-md-6"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={0}
      >
        <h1 className="hero-title-alt display-4">
          Ramanujan Mathematics & Science Club
        </h1>
        <p className="hero-sub lead">COEP Technological University</p>
        <p className="hero-tagline">
          Igniting logic, science and creativity through vibrant learning
          experiences.
        </p>
        <Link to="/events" className="hero-button btn btn-primary">
          Explore Events
        </Link>
      </motion.div>
      <motion.img
        src={clubImage}
        alt="RMSC Club"
        className="hero-img col-md-6 img-fluid"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      />
    </motion.section>

    <motion.section
      className="vision-section colored-section py-5"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="container">
        <motion.h2 variants={fadeUp} custom={1} className="mb-3">
          What's Next in 2024–25?
        </motion.h2>
        <motion.p variants={fadeUp} custom={2}>
          RMSC is ready with more puzzles, coding challenges, science
          exhibitions, and expert lectures — all to make learning thrilling and
          collaborative!
        </motion.p>
      </div>
    </motion.section>

    <motion.section
      className="activities-section py-5"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="container">
        <motion.h2 variants={fadeUp} custom={1} className="mb-3">
          What We Do
        </motion.h2>
        <motion.p variants={fadeUp} custom={2}>
          From quiz-based inductions and guest talks to creative competitions
          like poster-making, we make learning engaging. Whether you're into
          calculus, code, or climate — there's something for everyone!
        </motion.p>
        <motion.section
          className="highlight-section mt-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 variants={fadeUp} custom={1} className="mb-3">
            Last Year's Highlights (2023–24)
          </motion.h2>
          <motion.p variants={fadeUp} custom={2}>
            ✨ Over 200 participants joined events like{" "}
            <strong>Delta Sigma Pi</strong>, <strong>Integration Bee</strong>,
            and <strong>Math Day Writing Contest</strong>. 🔐 Guest lectures on
            SSL, Linear Dynamics, and eSIM Trust Building. 🧮 Celebrated Pi Day
            & Ramanujan Week with exciting contests and talks.
          </motion.p>
        </motion.section>
      </div>
    </motion.section>

    <section className="gallery-strip py-5 bg-light">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          Event Moments
        </motion.h2>
        <motion.div
          className="gallery-row row g-3 justify-content-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, staggerChildren: 0.1 }}
        >
          {[
            { src: require("../assets/images/event1.jpeg"), alt: "event1" },
            { src: require("../assets/images/event2.jpeg"), alt: "event2" },
            { src: require("../assets/images/event3.jpg"), alt: "event3" },
            { src: require("../assets/images/event4.jpeg"), alt: "event4" },
            { src: require("../assets/images/event5.png"), alt: "event5" },
          ].map((image, index) => (
            <motion.div className="col-6 col-md-2" key={index}>
              <motion.img
                src={image.src}
                alt={image.alt}
                className="img-fluid rounded shadow-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>

    <motion.section
      className="event-slider-section py-5"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          📅 Past Event Banners
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            pagination={{
              el: ".swiper-pagination-custom",
              clickable: true,
              dynamicBullets: true,
              renderBullet: function (index, className) {
                return '<span class="' + className + ' custom-bullet"></span>';
              },
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            centeredSlides={true}
            grabCursor={true}
            speed={800}
            effect="slide"
            className="event-slider professional"
          >
            {[
              {
                src: require("../assets/images/events/Banner1.png"),
                alt: "Banner 1",
                title: "Integration Bee Competition",
                description:
                  "Mathematical competition showcasing problem-solving skills",
                category: "Competition",
              },
              {
                src: require("../assets/images/events/Banner2.jpeg"),
                alt: "Banner 2",
                title: "Math Day Celebration",
                description:
                  "Annual celebration of mathematics and its applications",
                category: "Celebration",
              },
              {
                src: require("../assets/images/events/Banner3.jpg"),
                alt: "Banner 3",
                title: "Ramanujan Week",
                description: "Week-long tribute to the mathematical genius",
                category: "Tribute",
              },
            ].map((banner, index) => (
              <SwiperSlide key={index}>
                <div className="slide-content-wrapper row align-items-center">
                  <div className="slide-image-container col-md-7">
                    <img
                      src={banner.src}
                      alt={banner.alt}
                      className="img-fluid rounded"
                    />
                    <div className="slide-gradient-overlay"></div>
                  </div>
                  <div className="slide-info-panel col-md-5">
                    <div className="slide-category text-primary fw-bold">
                      {banner.category}
                    </div>
                    <h3 className="slide-title">{banner.title}</h3>
                    <p className="slide-description">{banner.description}</p>
                    <div className="slide-number">
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <span className="slide-total">
                        / {String(3).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation */}
          <div className="slider-controls d-flex align-items-center justify-content-center mt-3">
            <button className="swiper-button-prev-custom slider-nav-btn btn btn-outline-secondary me-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div className="swiper-pagination-custom slider-pagination mx-2"></div>
            <button className="swiper-button-next-custom slider-nav-btn btn btn-outline-secondary ms-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>
    </motion.section>

    <motion.section
      className="quote-section py-5 bg-light"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      <div className="container">
        <motion.blockquote
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="blockquote text-center"
        >
          "An equation means nothing to me unless it expresses a thought of
          God."
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="blockquote-footer mt-2"
          >
            — Srinivasa Ramanujan
          </motion.span>
        </motion.blockquote>
      </div>
    </motion.section>
  </div>
);

export default Home;
