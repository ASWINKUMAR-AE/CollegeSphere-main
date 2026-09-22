import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserGraduate, FaChalkboardTeacher, FaSearch, FaPlus, FaSignOutAlt, FaIdCard, FaClock, FaBuilding, FaCheckCircle } from "react-icons/fa";

const Dashboard = () => {
  const [staff, setStaff] = useState(null);
  const [students, setStudents] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [showStudents, setShowStudents] = useState(false);
  const [showStaff, setShowStaff] = useState(false);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [loadingStaff, setLoadingStaff] = useState(false);
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);
  const [newStaff, setNewStaff] = useState({
    id: "",
    name: "",
    dept: ""
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [studentSearchTerm, setStudentSearchTerm] = useState("");
  const [staffSearchTerm, setStaffSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedStaff = localStorage.getItem("staff");
    if (storedStaff) {
      setStaff(JSON.parse(storedStaff));
    } else {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("staff");
    navigate("/");
  };

  const fetchStudents = async () => {
    setLoadingStudents(true);
    try {
      const response = await fetch("http://localhost/backend_raju/getStudents.php");
      const data = await response.json();
      setStudents(data);
      setShowStudents(true);
      setShowStaff(false);
    } catch (error) {
      console.error("Error fetching students:", error);
      alert("Failed to fetch student data");
    } finally {
      setLoadingStudents(false);
    }
  };

  const fetchStaff = async () => {
    setLoadingStaff(true);
    try {
      const response = await fetch("http://localhost/backend_raju/getStaff.php");
      const data = await response.json();
      setStaffList(data);
      setShowStaff(true);
      setShowStudents(false);
    } catch (error) {
      console.error("Error fetching staff:", error);
      alert("Failed to fetch staff data");
    } finally {
      setLoadingStaff(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStaff(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitStaff = async (e) => {
    e.preventDefault();
    
    // Validate form
    const errors = {};
    if (!newStaff.id) errors.id = "ID is required";
    if (!newStaff.name) errors.name = "Name is required";
    if (!newStaff.dept) errors.dept = "Department is required";
    
    setFormErrors(errors);
    
    if (Object.keys(errors).length > 0) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch("http://localhost/backend_raju/addStaff.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStaff),
      });
      
      const data = await response.json();
      
      if (data.status === "success") {
        alert("Staff added successfully!");
        setShowAddStaffModal(false);
        setNewStaff({ id: "", name: "", dept: "" });
        fetchStaff(); // Refresh staff list
      } else {
        alert(data.message || "Failed to add staff");
      }
    } catch (error) {
      console.error("Error adding staff:", error);
      alert("Failed to add staff");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter students based on search term
  const filteredStudents = students.filter(student => {
    const searchLower = studentSearchTerm.toLowerCase();
    return (
      student.id.toLowerCase().includes(searchLower) ||
      student.candidate_name.toLowerCase().includes(searchLower) ||
      student.roll_number.toLowerCase().includes(searchLower) ||
      student.school_name.toLowerCase().includes(searchLower) ||
      student.total_marks.toString().includes(studentSearchTerm)
    );
  });

  // Filter staff based on search term
  const filteredStaff = staffList.filter(staff => {
    const searchLower = staffSearchTerm.toLowerCase();
    return (
      staff.id.toLowerCase().includes(searchLower) ||
      staff.name.toLowerCase().includes(searchLower) ||
      staff.dept.toLowerCase().includes(searchLower)
    );
  });

  if (!staff) return <div style={styles.loading}>Loading...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.dashboard}>
        {/* Header Section */}
        <div style={styles.header}>
          <div>
            <h1 style={styles.welcome}>
              <FaChalkboardTeacher style={styles.icon} /> Welcome, {staff.name}!
            </h1>
            <p style={styles.subtitle}>Tamil Nadu Govt Polytechnic College - Admin Dashboard</p>
          </div>
          <div style={styles.buttonGroup}>
            <button 
              onClick={() => setShowAddStaffModal(true)} 
              style={{ ...styles.button, ...styles.addButton }}
            >
              <FaPlus style={styles.buttonIcon} /> Add Staff
            </button>
            <button 
              onClick={fetchStudents} 
              disabled={loadingStudents}
              style={{ ...styles.button, ...styles.viewButton }}
            >
              {loadingStudents ? "Loading..." : (
                <>
                  <FaUserGraduate style={styles.buttonIcon} /> View Students
                </>
              )}
            </button>
            <button 
              onClick={fetchStaff} 
              disabled={loadingStaff}
              style={{ ...styles.button, ...styles.viewButton }}
            >
              {loadingStaff ? "Loading..." : (
                <>
                  <FaChalkboardTeacher style={styles.buttonIcon} /> View Staff
                </>
              )}
            </button>
            <button 
              onClick={handleLogout} 
              style={{ ...styles.button, ...styles.logoutButton }}
            >
              <FaSignOutAlt style={styles.buttonIcon} /> Logout
            </button>
          </div>
        </div>
        
        {/* Info Cards */}
        <div style={styles.infoGrid}>
          <div style={styles.infoCard}>
            <div style={styles.infoItem}>
              <div style={styles.infoIcon}>
                <FaIdCard />
              </div>
              <div>
                <div style={styles.infoLabel}>Staff ID</div>
                <div style={styles.infoValue}>{staff.id}</div>
              </div>
            </div>
          </div>
          
          <div style={styles.infoCard}>
            <div style={styles.infoItem}>
              <div style={styles.infoIcon}>
                <FaBuilding />
              </div>
              <div>
                <div style={styles.infoLabel}>Department</div>
                <div style={styles.infoValue}>{staff.dept}</div>
              </div>
            </div>
          </div>
          
          <div style={styles.infoCard}>
            <div style={styles.infoItem}>
              <div style={styles.infoIcon}>
                <FaClock />
              </div>
              <div>
                <div style={styles.infoLabel}>Last Login</div>
                <div style={styles.infoValue}>{staff.time || "Today"}</div>
              </div>
            </div>
          </div>
          
          <div style={styles.infoCard}>
            <div style={styles.infoItem}>
              <div style={styles.infoIcon}>
                <FaCheckCircle />
              </div>
              <div>
                <div style={styles.infoLabel}>Status</div>
                <div style={styles.infoValue}>Active</div>
              </div>
            </div>
          </div>
        </div>

        {/* Students Table */}
        {showStudents && (
          <div style={styles.tableContainer}>
            <div style={styles.searchContainer}>
              <h2 style={styles.tableTitle}>
                <FaUserGraduate style={styles.tableIcon} /> Students Data
              </h2>
              <div style={styles.searchWrapper}>
                <FaSearch style={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={studentSearchTerm}
                  onChange={(e) => setStudentSearchTerm(e.target.value)}
                  style={styles.searchInput}
                />
              </div>
            </div>
            
            <div style={styles.tableWrapper}>
              <table style={styles.dataTable}>
                <thead>
                  <tr>
                    <th style={styles.tableHeader}>ID</th>
                    <th style={styles.tableHeader}>Name</th>
                    <th style={styles.tableHeader}>Roll Number</th>
                    <th style={styles.tableHeader}>Department</th>
                    <th style={styles.tableHeader}>Marks</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                      <tr key={student.id} style={styles.tableRow}>
                        <td style={styles.tableCell}>{student.id}</td>
                        <td style={styles.tableCell}>{student.candidate_name}</td>
                        <td style={styles.tableCell}>{student.roll_number}</td>
                        <td style={styles.tableCell}>{student.school_name}</td>
                        <td style={styles.tableCell}>{student.total_marks}</td>
                      </tr>
                    ))
                  ) : (
                    <tr style={styles.tableRow}>
                      <td colSpan="5" style={styles.tableCell}>
                        {students.length === 0 ? "No student data found" : "No matching students found"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Staff Table */}
        {showStaff && (
          <div style={styles.tableContainer}>
            <div style={styles.searchContainer}>
              <h2 style={styles.tableTitle}>
                <FaChalkboardTeacher style={styles.tableIcon} /> Staff Data
              </h2>
              <div style={styles.searchWrapper}>
                <FaSearch style={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search staff..."
                  value={staffSearchTerm}
                  onChange={(e) => setStaffSearchTerm(e.target.value)}
                  style={styles.searchInput}
                />
              </div>
            </div>
            
            <div style={styles.tableWrapper}>
              <table style={styles.dataTable}>
                <thead>
                  <tr>
                    <th style={styles.tableHeader}>ID</th>
                    <th style={styles.tableHeader}>Name</th>
                    <th style={styles.tableHeader}>Department</th>
                    <th style={styles.tableHeader}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStaff.length > 0 ? (
                    filteredStaff.map((staffMember) => (
                      <tr key={staffMember.id} style={styles.tableRow}>
                        <td style={styles.tableCell}>{staffMember.id}</td>
                        <td style={styles.tableCell}>{staffMember.name}</td>
                        <td style={styles.tableCell}>{staffMember.dept}</td>
                        <td style={styles.tableCell}>
                          <span style={styles.statusBadge}>Active</span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr style={styles.tableRow}>
                      <td colSpan="4" style={styles.tableCell}>
                        {staffList.length === 0 ? "No staff data found" : "No matching staff found"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Add Staff Modal */}
      {showAddStaffModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2 style={styles.modalTitle}>
              <FaChalkboardTeacher style={styles.modalIcon} /> Add New Staff
            </h2>
            <form onSubmit={handleSubmitStaff}>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Staff ID</label>
                <input
                  type="text"
                  name="id"
                  value={newStaff.id}
                  onChange={handleInputChange}
                  style={styles.formInput}
                  placeholder="Enter staff ID"
                />
                {formErrors.id && <span style={styles.errorText}>{formErrors.id}</span>}
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={newStaff.name}
                  onChange={handleInputChange}
                  style={styles.formInput}
                  placeholder="Enter staff name"
                />
                {formErrors.name && <span style={styles.errorText}>{formErrors.name}</span>}
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Department</label>
                <input
                  type="text"
                  name="dept"
                  value={newStaff.dept}
                  onChange={handleInputChange}
                  style={styles.formInput}
                  placeholder="Enter department"
                />
                {formErrors.dept && <span style={styles.errorText}>{formErrors.dept}</span>}
              </div>
              
              <div style={styles.modalButtons}>
                <button 
                  type="button" 
                  onClick={() => setShowAddStaffModal(false)}
                  style={styles.cancelButton}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  style={styles.submitButton}
                >
                  {isSubmitting ? "Submitting..." : "Add Staff"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles
const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f5f7fa",
    fontFamily: "'Poppins', sans-serif",
  },
  dashboard: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "20px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "20px",
    marginBottom: "30px",
    paddingBottom: "20px",
    borderBottom: "1px solid #e0e0e0",
  },
  welcome: {
    color: "#002244",
    fontSize: "28px",
    fontWeight: "600",
    margin: 0,
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  subtitle: {
    color: "#666",
    fontSize: "14px",
    margin: "5px 0 0 0",
  },
  icon: {
    color: "#4CAF50",
  },
  buttonGroup: {
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
  },
  button: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontSize: "14px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  buttonIcon: {
    fontSize: "14px",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    ":hover": {
      backgroundColor: "#3d8b40",
      transform: "translateY(-2px)",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    },
  },
  viewButton: {
    backgroundColor: "#002244",
    color: "white",
    ":hover": {
      backgroundColor: "#001a33",
      transform: "translateY(-2px)",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    },
  },
  logoutButton: {
    backgroundColor: "#d32f2f",
    color: "white",
    ":hover": {
      backgroundColor: "#b71c1c",
      transform: "translateY(-2px)",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    },
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  },
  infoCard: {
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
    borderLeft: "4px solid #4CAF50",
  },
  infoItem: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  infoIcon: {
    backgroundColor: "rgba(76, 175, 80, 0.1)",
    color: "#4CAF50",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
  },
  infoLabel: {
    color: "#666",
    fontSize: "14px",
    marginBottom: "5px",
  },
  infoValue: {
    color: "#002244",
    fontWeight: "600",
    fontSize: "18px",
  },
  tableContainer: {
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
    padding: "25px",
    marginBottom: "30px",
  },
  searchContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    flexWrap: "wrap",
    gap: "15px",
  },
  tableTitle: {
    color: "#002244",
    fontSize: "20px",
    fontWeight: "600",
    margin: 0,
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  tableIcon: {
    color: "#4CAF50",
    fontSize: "18px",
  },
  searchWrapper: {
    position: "relative",
    width: "300px",
    maxWidth: "100%",
  },
  searchIcon: {
    position: "absolute",
    left: "15px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#666",
    fontSize: "14px",
  },
  searchInput: {
    padding: "10px 15px 10px 40px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    fontSize: "14px",
    width: "100%",
    ":focus": {
      outline: "none",
      borderColor: "#4CAF50",
      boxShadow: "0 0 0 2px rgba(76, 175, 80, 0.2)",
    },
  },
  tableWrapper: {
    overflowX: "auto",
  },
  dataTable: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableHeader: {
    backgroundColor: "#002244",
    color: "white",
    padding: "12px 15px",
    textAlign: "left",
    fontWeight: "500",
    fontSize: "14px",
  },
  tableRow: {
    borderBottom: "1px solid #eee",
    ":hover": {
      backgroundColor: "#f9f9f9",
    },
  },
  tableCell: {
    padding: "12px 15px",
    color: "#333",
    fontSize: "14px",
  },
  statusBadge: {
    backgroundColor: "rgba(76, 175, 80, 0.1)",
    color: "#4CAF50",
    padding: "5px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "500",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    width: "100%",
    maxWidth: "500px",
    padding: "30px",
  },
  modalTitle: {
    color: "#002244",
    fontSize: "22px",
    fontWeight: "600",
    marginBottom: "25px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  modalIcon: {
    color: "#4CAF50",
  },
  formGroup: {
    marginBottom: "20px",
  },
  formLabel: {
    display: "block",
    color: "#002244",
    marginBottom: "8px",
    fontWeight: "500",
    fontSize: "14px",
  },
  formInput: {
    width: "100%",
    padding: "10px 15px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    fontSize: "14px",
    ":focus": {
      outline: "none",
      borderColor: "#4CAF50",
      boxShadow: "0 0 0 2px rgba(76, 175, 80, 0.2)",
    },
  },
  errorText: {
    color: "#d32f2f",
    fontSize: "13px",
    marginTop: "5px",
  },
  modalButtons: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "15px",
    marginTop: "30px",
  },
  cancelButton: {
    padding: "10px 20px",
    backgroundColor: "#f0f0f0",
    color: "#333",
    border: "none",
    borderRadius: "5px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    ":hover": {
      backgroundColor: "#e0e0e0",
    },
  },
  submitButton: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    ":hover": {
      backgroundColor: "#3d8b40",
    },
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    color: "#002244",
    fontWeight: "500",
    fontSize: "18px",
  },
};

export default Dashboard;