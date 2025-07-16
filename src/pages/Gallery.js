import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Gallery.css";

const galleryCategories = [
  {
    id: "events",
    title: "Events & Activities",
    description: "Memorable moments from our club events and activities",
    images: [
      {
        src: "/src/assets/images/event1.jpeg",
        alt: "Technical Workshop",
        title: "Technical Workshop 2024",
        description: "Students participating in hands-on technical workshop",
        date: "March 2024",
      },
      {
        src: "/src/assets/images/event2.jpeg",
        alt: "Club Meeting",
        title: "Monthly Club Meeting",
        description: "Regular club meeting discussing upcoming projects",
        date: "February 2024",
      },
      {
        src: "/src/assets/images/event3.jpg",
        alt: "Science Fair",
        title: "Science Fair Exhibition",
        description: "Students showcasing their innovative projects",
        date: "January 2024",
      },
      {
        src: "/src/assets/images/event4.jpeg",
        alt: "Team Building",
        title: "Team Building Activity",
        description: "Fun team building exercises and activities",
        date: "December 2023",
      },
      {
        src: "/src/assets/images/event5.png",
        alt: "Competition",
        title: "Inter-College Competition",
        description: "Students competing in technical challenges",
        date: "November 2023",
      },
      {
        src: "/src/assets/images/event1.jpeg",
        alt: "Workshop 2023",
        title: "Python Programming Workshop",
        description: "Intensive workshop on Python programming fundamentals",
        date: "October 2023",
      },
      {
        src: "/src/assets/images/event2.jpeg",
        alt: "Seminar 2022",
        title: "AI & Machine Learning Seminar",
        description: "Guest lecture on artificial intelligence trends",
        date: "December 2022",
      },
      {
        src: "/src/assets/images/event3.jpg",
        alt: "Project Expo 2022",
        title: "Annual Project Exhibition",
        description: "Students presenting their innovative projects",
        date: "November 2022",
      },
    ],
  },
  {
    id: "banners",
    title: "Event Banners",
    description: "Professional banners and promotional materials",
    images: [
      {
        src: "/src/assets/images/events/Banner1.png",
        alt: "Event Banner 1",
        title: "Annual Tech Fest 2024",
        description: "Official banner for our biggest technical event",
        date: "2024",
      },
      {
        src: "/src/assets/images/events/Banner2.jpeg",
        alt: "Event Banner 2",
        title: "Workshop Series Banner",
        description: "Banner for our monthly workshop series",
        date: "2024",
      },
      {
        src: "/src/assets/images/events/Banner3.jpg",
        alt: "Event Banner 3",
        title: "Club Recruitment Drive",
        description: "Banner for new member recruitment campaign",
        date: "2024",
      },
      {
        src: "/src/assets/images/events/Banner1.png",
        alt: "Workshop Banner 2023",
        title: "Coding Bootcamp 2023",
        description: "Banner for intensive coding bootcamp",
        date: "2023",
      },
      {
        src: "/src/assets/images/events/Banner2.jpeg",
        alt: "Conference Banner 2022",
        title: "Tech Conference 2022",
        description: "Banner for annual technology conference",
        date: "2022",
      },
    ],
  },
  {
    id: "achievements",
    title: "Achievements & Awards",
    description: "Recognition and achievements of our club members",
    images: [
      {
        src: "/src/assets/images/rmsc-banner.png",
        alt: "RMSC Banner",
        title: "Club Official Banner",
        description: "Official RMSC club banner and identity",
        date: "2024",
      },
      {
        src: "/src/assets/images/event4.jpeg",
        alt: "Award Ceremony 2023",
        title: "Annual Awards Ceremony",
        description: "Recognition ceremony for outstanding members",
        date: "2023",
      },
      {
        src: "/src/assets/images/event5.png",
        alt: "Achievement 2022",
        title: "Best Club Award 2022",
        description: "RMSC received best technical club award",
        date: "2022",
      },
    ],
  },
];

function Gallery() {
  const [activeCategory, setActiveCategory] = useState("events");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedYear, setSelectedYear] = useState("all");
  const [viewMode, setViewMode] = useState("category"); // "category" or "year"

  const activeImages = useMemo(() => {
    const categoryImages =
      galleryCategories.find((cat) => cat.id === activeCategory)?.images || [];

    if (viewMode === "year" && selectedYear !== "all") {
      return categoryImages.filter((img) => img.date.includes(selectedYear));
    }

    return categoryImages;
  }, [activeCategory, selectedYear, viewMode]);

  // Get unique years from all images
  const availableYears = useMemo(() => {
    const allImages = galleryCategories.flatMap((cat) => cat.images);
    const years = [
      ...new Set(
        allImages.map((img) => {
          const year = img.date.match(/\d{4}/);
          return year ? year[0] : "2024";
        })
      ),
    ]
      .sort()
      .reverse();
    return years;
  }, []);

  const openLightbox = (image, index) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setSelectedImage(null);
  };

  const navigateImage = React.useCallback(
    (direction) => {
      const newIndex =
        direction === "next"
          ? (currentImageIndex + 1) % activeImages.length
          : (currentImageIndex - 1 + activeImages.length) % activeImages.length;

      setCurrentImageIndex(newIndex);
      setSelectedImage(activeImages[newIndex]);
    },
    [currentImageIndex, activeImages]
  );

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (isLightboxOpen) {
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowRight") navigateImage("next");
        if (e.key === "ArrowLeft") navigateImage("prev");
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isLightboxOpen, navigateImage]);

  return (
    <div className="gallery-page">
      {/* Hero Section */}
      <motion.section
        className="gallery-hero"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="gallery-hero-content">
          <motion.h1
            className="gallery-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Gallery
          </motion.h1>
          <motion.p
            className="gallery-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Explore our collection of memorable moments, events, and
            achievements
          </motion.p>
        </div>
        <div className="gallery-hero-background"></div>
      </motion.section>

      {/* Category Filter */}
      <motion.section
        className="gallery-categories"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <div className="filter-controls">
          <div className="view-mode-toggle">
            <motion.button
              className={`mode-btn ${viewMode === "category" ? "active" : ""}`}
              onClick={() => setViewMode("category")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              📂 By Category
            </motion.button>
            <motion.button
              className={`mode-btn ${viewMode === "year" ? "active" : ""}`}
              onClick={() => setViewMode("year")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              📅 By Year
            </motion.button>
          </div>

          {viewMode === "category" && (
            <div className="category-filters">
              {galleryCategories.map((category) => (
                <motion.button
                  key={category.id}
                  className={`category-btn ${
                    activeCategory === category.id ? "active" : ""
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="category-title">{category.title}</span>
                  <span className="category-count">
                    ({category.images.length})
                  </span>
                </motion.button>
              ))}
            </div>
          )}

          {viewMode === "year" && (
            <div className="year-filters">
              <motion.button
                className={`year-btn ${selectedYear === "all" ? "active" : ""}`}
                onClick={() => setSelectedYear("all")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🌟 All Years
              </motion.button>
              {availableYears.map((year) => (
                <motion.button
                  key={year}
                  className={`year-btn ${
                    selectedYear === year ? "active" : ""
                  }`}
                  onClick={() => setSelectedYear(year)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  📆 {year}
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </motion.section>

      {/* Gallery Content */}
      <motion.section
        className="gallery-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="gallery-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="gallery-section-header">
              <h2>
                {
                  galleryCategories.find((cat) => cat.id === activeCategory)
                    ?.title
                }
              </h2>
              <p>
                {
                  galleryCategories.find((cat) => cat.id === activeCategory)
                    ?.description
                }
              </p>
            </div>

            <div className="gallery-grid-modern">
              {activeImages.map((image, index) => (
                <motion.div
                  key={`${activeCategory}-${index}`}
                  className="gallery-item"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -10 }}
                  onClick={() => openLightbox(image, index)}
                >
                  <div className="gallery-item-image">
                    <img src={image.src} alt={image.alt} loading="lazy" />
                    <div className="gallery-item-overlay">
                      <div className="gallery-item-content">
                        <h3>{image.title}</h3>
                        <p>{image.description}</p>
                        <span className="gallery-item-date">{image.date}</span>
                      </div>
                      <div className="gallery-item-zoom">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M21 21L16.514 16.506M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M13.5 10.5H7.5M10.5 7.5v6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && selectedImage && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="lightbox-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="lightbox-close" onClick={closeLightbox}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18 6L6 18M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div className="lightbox-image-container">
                <img src={selectedImage.src} alt={selectedImage.alt} />
              </div>

              <div className="lightbox-info">
                <h3>{selectedImage.title}</h3>
                <p>{selectedImage.description}</p>
                <span className="lightbox-date">{selectedImage.date}</span>
              </div>

              <div className="lightbox-navigation">
                <button
                  className="lightbox-nav-btn prev"
                  onClick={() => navigateImage("prev")}
                  disabled={activeImages.length <= 1}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M15 18l-6-6 6-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <span className="lightbox-counter">
                  {currentImageIndex + 1} / {activeImages.length}
                </span>

                <button
                  className="lightbox-nav-btn next"
                  onClick={() => navigateImage("next")}
                  disabled={activeImages.length <= 1}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M9 18l6-6-6-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Statistics Section */}
      <motion.section
        className="gallery-stats"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <div className="stats-container">
          <div className="stat-item">
            <h3>
              {galleryCategories.reduce(
                (total, cat) => total + cat.images.length,
                0
              )}
            </h3>
            <p>Total Images</p>
          </div>
          <div className="stat-item">
            <h3>{galleryCategories.length}</h3>
            <p>Categories</p>
          </div>
          <div className="stat-item">
            <h3>50+</h3>
            <p>Events Covered</p>
          </div>
          <div className="stat-item">
            <h3>2024</h3>
            <p>Current Year</p>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

export default Gallery;
