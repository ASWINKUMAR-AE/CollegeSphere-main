import React from 'react';
import './Hero.css';
import { FaGraduationCap, FaChalkboardTeacher, FaFlask, FaAward } from 'react-icons/fa';

const Hero = () => {
  return (
    <div className="hero-wrapper">
      {/* Hero Banner */}
      <div className="hero-container">
        <div className="overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Welcome to <span>Tamilnadu Government Polytechnic College</span></h1>
          <p className="hero-subtitle">ADMISSION OPEN</p>
          <a href="/admission" className="hero-button">Explore Admission ⇨</a>
        </div>
      </div>

      {/* Home Content Sections */}
      <div style={styles.container}>
        {/* About Section */}
        <section style={styles.section}>
          <div style={styles.sectionContent}>
            <h2 style={styles.sectionTitle}>About Our Institution</h2>
            <p style={styles.sectionText}>
              Established in 1958, TamilNadu Government Polytechnic College Madurai has been a pioneer in technical education,
              offering diploma programs that combine theoretical knowledge with practical skills. Our institution is recognized
              by AICTE and affiliated with the Directorate of Technical Education, Tamil Nadu.
            </p>
            <button style={styles.learnMoreButton}>Learn More About Us</button>
          </div>
          <div style={styles.imageContainer}>
            <img 
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
              alt="College Campus"
              style={styles.image}
            />
          </div>
        </section>

        {/* Programs Section */}
        <section style={{...styles.section, backgroundColor: "#f8f9fa"}}>
          <h2 style={styles.sectionTitle}>Our Programs</h2>
          <div style={styles.programsGrid}>
            {programs.map((program, index) => (
              <div key={index} style={styles.programCard}>
                <div style={styles.programIcon}>{program.icon}</div>
                <h3 style={styles.programTitle}>{program.title}</h3>
                <p style={styles.programDesc}>{program.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Highlights Section */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Why Choose Us?</h2>
          <div style={styles.highlightsContainer}>
            {highlights.map((highlight, index) => (
              <div key={index} style={styles.highlightCard}>
                <h3 style={styles.highlightTitle}>{highlight.title}</h3>
                <p style={styles.highlightText}>{highlight.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* News Section */}
        <section style={{...styles.section, backgroundColor: "#f8f9fa"}}>
          <h2 style={styles.sectionTitle}>Latest News & Events</h2>
          <div style={styles.newsGrid}>
            {newsItems.map((item, index) => (
              <div key={index} style={styles.newsCard}>
                <img src={item.image} alt={item.title} style={styles.newsImage} />
                <div style={styles.newsContent}>
                  <h3 style={styles.newsTitle}>{item.title}</h3>
                  <p style={styles.newsDate}>{item.date}</p>
                  <p style={styles.newsExcerpt}>{item.excerpt}</p>
                  <a href="#" style={styles.readMoreLink}>Read More →</a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

const programs = [
  {
    icon: <FaFlask size={40} color="#e63946" />,
    title: "Diploma in Mechanical Engineering",
    description: "3-year program focusing on manufacturing, design, and maintenance of mechanical systems."
  },
  {
    icon: <FaGraduationCap size={40} color="#e63946" />,
    title: "Diploma in Electrical Engineering",
    description: "Comprehensive training in electrical systems, power generation, and distribution."
  },
  {
    icon: <FaChalkboardTeacher size={40} color="#e63946" />,
    title: "Diploma in Computer Engineering",
    description: "Hands-on training in software development, networking, and hardware maintenance."
  },
  {
    icon: <FaAward size={40} color="#e63946" />,
    title: "Diploma in Civil Engineering",
    description: "Learn construction technology, surveying, and structural design fundamentals."
  }
];

const highlights = [
  {
    title: "Industry-Ready Curriculum",
    text: "Our programs are designed with input from industry experts to ensure graduates are job-ready."
  },
  {
    title: "State-of-the-Art Labs",
    text: "Well-equipped laboratories with modern equipment for practical learning."
  },
  {
    title: "Experienced Faculty",
    text: "Learn from highly qualified teachers with both academic and industry experience."
  },
  {
    title: "Excellent Placement Record",
    text: "Strong industry connections leading to excellent placement opportunities."
  }
];

const newsItems = [
  {
    image: "https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3&auto=format&fit=crop&w=1472&q=80",
    title: "Annual Technical Symposium 2023",
    date: "October 15, 2023",
    excerpt: "Join us for our flagship event featuring workshops, competitions, and guest lectures from industry leaders."
  },
  {
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80",
    title: "Campus Recruitment Drive",
    date: "November 5, 2023",
    excerpt: "Leading companies will be visiting our campus for recruitment of final year students."
  },
  {
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    title: "New Computer Lab Inauguration",
    date: "September 20, 2023",
    excerpt: "Our newly upgraded computer lab with latest hardware and software was inaugurated by the Director of Technical Education."
  }
];

// Paste the same 'styles' object from your original `HomeContent` here
// OR export it from a `styles.js` file if needed.

export default Hero;
