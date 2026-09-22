import React from "react";

const CollegeDetail = () => {
  const college = {
    name: "ABC Polytechnic College",
    address: "456 Technical Avenue, Innovation City, Tamil Nadu, 600002",
    contact: {
      phone: "+91-8765432109",
      email: "info@abcpolytechnic.edu.in",
      website: "www.abcpolytechnic.edu.in",
    },
    courses: [
      "Diploma in Computer Engineering",
      "Diploma in Mechanical Engineering",
      "Diploma in Electrical Engineering",
      "Diploma in Civil Engineering",
      "Diploma in Electronics and Communication",
      "Diploma in Automobile Engineering",
      "Diploma in Instrumentation Technology",
    ],
    description:
      "ABC Polytechnic College is a premier technical institution offering quality diploma education with state-of-the-art facilities and industry-relevant curriculum to prepare students for successful careers in engineering and technology.",
  };

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        {/* College Header */}
        <div style={styles.headerContainer}>
          <h1 style={styles.collegeName}>{college.name}</h1>
          <p style={styles.description}>{college.description}</p>
        </div>

        {/* Contact and Facilities Section */}
        <div style={styles.infoSection}>
          {/* Contact Information */}
          <div style={styles.infoBox}>
            <h3 style={styles.infoTitle}>Contact Information</h3>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Address:</span>
              <span style={styles.infoValue}>{college.address}</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Phone:</span>
              <span style={styles.infoValue}>{college.contact.phone}</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Email:</span>
              <span style={styles.infoValue}>{college.contact.email}</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Website:</span>
              <a
                href={`https://${college.contact.website}`}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.websiteLink}
              >
                {college.contact.website}
              </a>
            </div>
          </div>

          {/* College Facilities */}
          <div style={styles.infoBox}>
            <h3 style={styles.infoTitle}>College Facilities</h3>
            <ul style={styles.facilitiesList}>
              {[
                "Modern Laboratories",
                "Digital Library",
                "Hostel Facilities",
                "Sports Complex",
                "Placement Cell",
                "Wi-Fi Campus",
              ].map((facility, index) => (
                <li key={index} style={styles.facilityItem}>
                  <span style={styles.bulletPoint}></span>
                  {facility}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Courses Section */}
        <div style={styles.coursesSection}>
          <h2 style={styles.coursesTitle}>Diploma Courses Offered</h2>
          <div style={styles.coursesGrid}>
            {college.courses.map((course, index) => (
              <div 
                key={index} 
                style={styles.courseCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
                }}
              >
                <h3 style={styles.courseName}>{course}</h3>
                <p style={styles.courseDetail}>
                  <strong style={styles.detailLabel}>Duration:</strong> 3 Years
                </p>
                <p style={styles.courseDetail}>
                  <strong style={styles.detailLabel}>Eligibility:</strong> 10th Pass
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#121212",
    color: "#e0e0e0",
    minHeight: "100vh",
    padding: "2rem",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    width: "100%",
    boxSizing: "border-box",
  },
  wrapper: {
    maxWidth: "1400px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "3rem",
  },
  headerContainer: {
    textAlign: "center",
    marginBottom: "1rem",
  },
  collegeName: {
    color: "#bb86fc",
    fontSize: "2.8rem",
    marginBottom: "1.5rem",
    borderBottom: "2px solid #3700b3",
    paddingBottom: "0.8rem",
  },
  description: {
    fontSize: "1.2rem",
    lineHeight: "1.8",
    color: "#b0b0b0",
    maxWidth: "900px",
    margin: "0 auto",
  },
  infoSection: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1.5rem",
    justifyContent: "space-between",
  },
  infoBox: {
    backgroundColor: "#1e1e1e",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0 6px 10px rgba(0, 0, 0, 0.3)",
    flex: "1",
    minWidth: "300px",
  },
  infoTitle: {
    color: "#03dac6",
    fontSize: "1.5rem",
    marginBottom: "1.5rem",
    borderBottom: "1px solid #018786",
    paddingBottom: "0.5rem",
  },
  infoItem: {
    margin: "1rem 0",
    display: "flex",
    alignItems: "flex-start",
  },
  infoLabel: {
    color: "#03dac6",
    width: "80px",
    flexShrink: 0,
  },
  infoValue: {
    marginLeft: "1rem",
  },
  websiteLink: {
    color: "#bb86fc",
    textDecoration: "none",
    borderBottom: "1px dashed #bb86fc",
    transition: "color 0.3s",
    marginLeft: "1rem",
  },
  facilitiesList: {
    listStyleType: "none",
    padding: 0,
    margin: 0,
  },
  facilityItem: {
    margin: "0.8rem 0",
    display: "flex",
    alignItems: "center",
  },
  bulletPoint: {
    display: "inline-block",
    width: "10px",
    height: "10px",
    backgroundColor: "#bb86fc",
    borderRadius: "50%",
    marginRight: "1rem",
  },
  coursesSection: {
    marginTop: "1rem",
  },
  coursesTitle: {
    color: "#bb86fc",
    fontSize: "2.2rem",
    marginBottom: "2rem",
    paddingBottom: "0.8rem",
    borderBottom: "2px solid #3700b3",
    textAlign: "center",
  },
  coursesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "1.5rem",
  },
  courseCard: {
    backgroundColor: "#1e1e1e",
    padding: "1.5rem",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    transition: "all 0.3s ease",
    borderLeft: "4px solid #03dac6",
    cursor: "pointer",
  },
  courseName: {
    color: "#bb86fc",
    fontSize: "1.4rem",
    marginTop: "0",
    marginBottom: "1rem",
  },
  courseDetail: {
    color: "#b0b0b0",
    margin: "0.5rem 0",
    fontSize: "0.9rem",
  },
  detailLabel: {
    color: "#03dac6",
  },
};

export default CollegeDetail;