import React, { useState } from "react";
import { FaFileUpload, FaCheckCircle, FaDownload, FaPlus } from "react-icons/fa";

const OCRApp = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [admissionId, setAdmissionId] = useState("");
  const [formData, setFormData] = useState({
    candidateName: "",
    rollNumber: "",
    dob: "",
    fatherName: "",
    motherName: "",
    totalMarks: "",
    email: "",
    phone: "",
    address: "",
    school_name: "",
    course: "",
    tamilMarks: "",
    englishMarks: "",
    mathematicsMarks: "",
    scienceMarks: "",
    socialScienceMarks: ""
  });

  const apiUrl = "http://localhost/backend_raju/storeData.php";


//  const apiKey = "K84375048488957";
//  const apiKey = "K81421593988957";

  const apiKey = "K89137670188957";

  const courseOptions = [
    { value: "", label: "Select a course" },
    { value: "bsc_civil", label: "Civil Engineering" },
    { value: "bsc_Mech", label: "Mechanical Engineering" },
    { value: "bsc_computer_science", label: "Computer Science" },
    { value: "bsc_Web_designing", label: "Web Designing" },
    { value: "Plastic_polymer", label: "Plastic Polymer" },
    { value: "EEE", label: "Electrical Engineering" },
  ];

  const generateAdmissionId = () => {
    const timestamp = Date.now().toString().slice(-6);
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `ADM-${timestamp}-${randomNum}`;
  };

  const validateFields = () => {
    const errors = {};
    let isValid = true;

    const requiredFields = [
      'candidateName',
      'rollNumber',
      'dob',
      'fatherName',
      'motherName',
      'email',
      'phone',
      'address',
      'school_name',
      'course',
      'tamilMarks',
      'englishMarks',
      'mathematicsMarks',
      'scienceMarks',
      'socialScienceMarks'
    ];

    requiredFields.forEach(field => {
      if (!formData[field]?.trim()) {
        errors[field] = 'This field is required';
        isValid = false;
      }
    });

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (formData.phone && !/^\d{10,15}$/.test(formData.phone)) {
      errors.phone = 'Please enter a valid phone number (10-15 digits)';
      isValid = false;
    }

    const markFields = ['tamilMarks', 'englishMarks', 'mathematicsMarks', 'scienceMarks', 'socialScienceMarks', 'totalMarks'];
    markFields.forEach(field => {
      if (formData[field] && !/^\d+$/.test(formData[field])) {
        errors[field] = 'Please enter a valid number';
        isValid = false;
      }
    });

    setValidationErrors(errors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateFields()) return;

    try {
      setLoading(true);
      const generatedId = generateAdmissionId();
      setAdmissionId(generatedId);
      
      const submissionData = {
        ...formData,
        admissionId: generatedId
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify(submissionData),
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();
      
      if (result.status === "success") {
        setSubmissionSuccess(true);
      } else {
        alert("Error storing data: " + result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to complete submission.");
    } finally {
      setLoading(false);
      setShowConfirmation(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      processImage(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const processImage = async (file) => {
    setLoading(true);
    const imageData = new FormData();
    imageData.append("apikey", apiKey);
    imageData.append("language", "eng");
    imageData.append("isOverlayRequired", "false");
    imageData.append("file", file);

    try {
      const response = await fetch("https://api.ocr.space/parse/image", {
        method: "POST",
        body: imageData,
      });
      const result = await response.json();
      if (result.ParsedResults) {
        const extractedText = result.ParsedResults[0].ParsedText;
        setFormData(extractData(extractedText));
      } else {
        alert("No text found.");
      }
    } catch (error) {
      console.error("Error processing OCR:", error);
      alert("Error processing image.");
    }
    setLoading(false);
  };

  const extractData = (ocrText) => {
    const lines = ocrText.split("\n").map((line) => line.trim().toUpperCase());
    const data = {
      candidateName: "",
      rollNumber: "",
      dob: "",
      fatherName: "",
      motherName: "",
      totalMarks: "",
      email: "",
      phone: "",
      address: "",
      school_name: "",
      course: "",
      tamilMarks: "",
      englishMarks: "",
      mathematicsMarks: "",
      scienceMarks: "",
      socialScienceMarks: ""
    };

    lines.forEach((line, i) => {
      if (line.includes("NAME OF THE CANDIDATE")) data.candidateName = lines[i + 2]?.trim() || "";
      if (line.includes("DATE OF BIRTH")) data.dob = lines[i + 1]?.trim() || "";
      if (line.includes("GUARDIAN'S NAME")) {
        data.fatherName = lines[i + 1]?.trim() || "";
        data.motherName = lines[i + 2]?.trim() || "";
      }
      if (line.includes("ROLL NO.")) {
        const match = line.match(/ROLL NO\.\s*(\d+)/) || lines[i + 1]?.match(/^(\d+)/);
        data.rollNumber = match ? match[1] : "";
      }
    });

    const marksIndex = lines.findIndex((line) => line.includes("MARKS OBTAINED FOR"));
    if (marksIndex !== -1) {
      const extractedMarks = lines.slice(marksIndex + 1, marksIndex + 7);
      
      const extractNumeric = (mark) => {
        const match = mark.match(/(\d+)/);
        return match ? match[1] : "0";
      };
      
      data.tamilMarks = extractNumeric(extractedMarks[0] || "0");
      data.englishMarks = extractNumeric(extractedMarks[1] || "0");
      data.mathematicsMarks = extractNumeric(extractedMarks[2] || "0");
      data.scienceMarks = extractNumeric(extractedMarks[3] || "0");
      data.socialScienceMarks = extractNumeric(extractedMarks[4] || "0");
      
      data.totalMarks = extractNumeric(extractedMarks[5] || "0");
    }

    return data;
  };

  const handleSubmitClick = () => {
    if (validateFields()) {
      setShowConfirmation(true);
    }
  };

  const handleConfirmSubmit = () => {
    handleSubmit();
  };

  const handleCancelSubmit = () => {
    setShowConfirmation(false);
  };

  const calculatePercentage = (marks) => {
    const numericValue = parseInt(marks);
    return !isNaN(numericValue) ? `${numericValue}%` : "N/A";
  };

  const downloadAdmissionReceipt = () => {
    const receiptContent = `<!DOCTYPE html>
    <html>
    <head>
      <title>Admission Receipt</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .receipt { max-width: 800px; margin: 0 auto; border: 1px solid #ddd; padding: 20px; }
        .header { text-align: center; margin-bottom: 20px; }
        .school-name { font-size: 24px; font-weight: bold; }
        .receipt-title { font-size: 20px; margin: 10px 0; }
        .details { margin: 20px 0; }
        .detail-row { display: flex; margin-bottom: 10px; }
        .detail-label { width: 200px; font-weight: bold; }
        .items { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .items th, .items td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        .items th { background-color: #f2f2f2; }
        .total { text-align: right; font-weight: bold; margin-top: 20px; }
        .footer { margin-top: 30px; text-align: center; font-size: 12px; color: #777; }
        .admission-id {
          background-color: #f8f9fa;
          padding: 10px;
          border-radius: 5px;
          text-align: center;
          margin-bottom: 20px;
          font-weight: bold;
          border: 1px solid #ddd;
        }
      </style>
    </head>
    <body>
      <div class="receipt">
        <div class="header">
          <div class="school-name">Tamil Nadu Polytechnic College</div>
          <div class="receipt-title">Admission Receipt</div>
        </div>

        <div class="admission-id">
          Admission ID: ${admissionId}
        </div>
        
        <div class="details">
          <div class="detail-row">
            <div class="detail-label">Student Name:</div>
            <div>${formData.candidateName}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">Roll Number:</div>
            <div>${formData.rollNumber}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">Date of Birth:</div>
            <div>${formData.dob}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">Father's Name:</div>
            <div>${formData.fatherName}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">Mother's Name:</div>
            <div>${formData.motherName}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">School Name:</div>
            <div>${formData.school_name || "School Name"}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">Course:</div>
            <div>${
              courseOptions.find(c => c.value === formData.course)?.label || "Not specified"
            }</div>
          </div>
        </div>
        
        <table class="items">
          <tr>
            <th>Subject</th>
            <th>Marks</th>
            <th>Percentage</th>
          </tr>
          <tr>
            <td>Tamil</td>
            <td>${formData.tamilMarks}</td>
            <td>${calculatePercentage(formData.tamilMarks)}</td>
          </tr>
          <tr>
            <td>English</td>
            <td>${formData.englishMarks}</td>
            <td>${calculatePercentage(formData.englishMarks)}</td>
          </tr>
          <tr>
            <td>Mathematics</td>
            <td>${formData.mathematicsMarks}</td>
            <td>${calculatePercentage(formData.mathematicsMarks)}</td>
          </tr>
          <tr>
            <td>Science</td>
            <td>${formData.scienceMarks}</td>
            <td>${calculatePercentage(formData.scienceMarks)}</td>
          </tr>
          <tr>
            <td>Social Science</td>
            <td>${formData.socialScienceMarks}</td>
            <td>${calculatePercentage(formData.socialScienceMarks)}</td>
          </tr>
          <tr>
            <td colspan="2" style="text-align: right;"><strong>Total Marks:</strong></td>
            <td><strong>${formData.totalMarks} (${calculatePercentage(formData.totalMarks)})</strong></td>
          </tr>
        </table>
        
        <div class="contact-info">
          <h4>Contact Information</h4>
          <div class="detail-row">
            <div class="detail-label">Email:</div>
            <div>${formData.email}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">Phone:</div>
            <div>${formData.phone}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">Address:</div>
            <div>${formData.address}</div>
          </div>
        </div>
        
        <div class="footer">
          This is an auto-generated receipt. For any queries, please contact the college administration.
        </div>
      </div>
    </body>
    </html>`;

    const blob = new Blob([receiptContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Admission_Receipt_${admissionId || formData.rollNumber || 'new'}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const resetForm = () => {
    setFormData({
      candidateName: "",
      rollNumber: "",
      dob: "",
      fatherName: "",
      motherName: "",
      totalMarks: "",
      email: "",
      phone: "",
      address: "",
      school_name: "",
      course: "",
      tamilMarks: "",
      englishMarks: "",
      mathematicsMarks: "",
      scienceMarks: "",
      socialScienceMarks: ""
    });
    setImage(null);
    setSubmissionSuccess(false);
    setAdmissionId("");
  };

  if (submissionSuccess) {
    return (
      <div style={styles.container}>
        <div style={styles.successCard}>
          <div style={styles.successIcon}>
            <FaCheckCircle size={48} color="#4CAF50" />
          </div>
          <h2 style={styles.successTitle}>Admission Submitted Successfully!</h2>
          <p style={styles.successMessage}>Your admission details have been successfully recorded.</p>

          <div style={styles.admissionIdDisplay}>
            <p><strong>Admission ID:</strong> {admissionId}</p>
          </div>
          
          <div style={styles.successDetails}>
            <h3>Student Information</h3>
            <p><strong>Name:</strong> {formData.candidateName}</p>
            <p><strong>Roll Number:</strong> {formData.rollNumber}</p>
            <p><strong>Date of Birth:</strong> {formData.dob}</p>
            <p><strong>Course:</strong> {courseOptions.find(c => c.value === formData.course)?.label || "Not specified"}</p>
            
            <h3>Academic Performance</h3>
            <p><strong>Total Marks:</strong> {formData.totalMarks} ({calculatePercentage(formData.totalMarks)})</p>
            
            <h3>Contact Information</h3>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Phone:</strong> {formData.phone}</p>
          </div>
          
          <div style={styles.successActions}>
            <button onClick={downloadAdmissionReceipt} style={styles.downloadButton}>
              <FaDownload style={{ marginRight: '8px' }} />
              Download Admission Receipt
            </button>
            <button onClick={resetForm} style={styles.newAdmissionButton}>
              <FaPlus style={{ marginRight: '8px' }} />
              Submit New Admission
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>MarkSheet Scanner</h2>
        <p style={styles.subtitle}>Upload your mark sheet to automatically extract information</p>

        <div style={styles.uploadArea}>
          <label style={styles.uploadLabel}>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange} 
              style={styles.fileInput} 
            />
            <div style={styles.uploadBox}>
              {image ? (
                <p style={styles.fileName}>{image.name}</p>
              ) : (
                <>
                  <FaFileUpload size={48} color="#4CAF50" />
                  <p>Choose an image file</p>
                </>
              )}
            </div>
          </label>
          {loading && (
            <div style={styles.loadingOverlay}>
              <div style={styles.spinner}></div>
              <p>Extracting data from image...</p>
            </div>
          )}
        </div>

        <div style={styles.threeColumnLayout}>
          <div style={styles.column}>
            <h3 style={styles.sectionTitle}>Student Details</h3>
            <div style={styles.formGroup}>
              {[
                { id: 'candidateName', label: 'Candidate Name' },
                { id: 'rollNumber', label: 'Roll Number' },
                { id: 'dob', label: 'Date of Birth' },
                { id: 'fatherName', label: "Father's Name" },
                { id: 'motherName', label: "Mother's Name" },
              ].map((field) => (
                <div key={field.id} style={styles.inputGroup}>
                  <label style={styles.label}>{field.label}</label>
                  <input
                    type="text"
                    name={field.id}
                    value={formData[field.id]}
                    onChange={handleInputChange}
                    style={{
                      ...styles.input,
                      ...(validationErrors[field.id] && styles.inputError)
                    }}
                  />
                  {validationErrors[field.id] && (
                    <p style={styles.errorText}>{validationErrors[field.id]}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div style={styles.column}>
            <h3 style={styles.sectionTitle}>Academic Performance</h3>
            <div style={styles.marksTable}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.tableHeader}>Subject</th>
                    <th style={styles.tableHeader}>Marks</th>
                    <th style={styles.tableHeader}>Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { subject: 'Tamil', marks: formData.tamilMarks },
                    { subject: 'English', marks: formData.englishMarks },
                    { subject: 'Mathematics', marks: formData.mathematicsMarks },
                    { subject: 'Science', marks: formData.scienceMarks },
                    { subject: 'Social Science', marks: formData.socialScienceMarks },
                  ].map((subject, index) => (
                    <tr key={index}>
                      <td style={styles.tableCell}>{subject.subject}</td>
                      <td style={styles.tableCell}>
                        <input
                          type="text"
                          name={`${subject.subject.toLowerCase()}Marks`}
                          value={subject.marks}
                          onChange={handleInputChange}
                          style={styles.smallInput}
                        />
                      </td>
                      <td style={styles.tableCell}>{calculatePercentage(subject.marks)}</td>
                    </tr>
                  ))}
                  <tr>
                    <td style={{ ...styles.tableCell, fontWeight: 'bold' }}>Total Marks</td>
                    <td style={{ ...styles.tableCell, fontWeight: 'bold' }}>
                      <input
                        type="text"
                        name="totalMarks"
                        value={formData.totalMarks}
                        onChange={handleInputChange}
                        style={styles.smallInput}
                      />
                    </td>
                    <td style={{ ...styles.tableCell, fontWeight: 'bold' }}>
                      {calculatePercentage(formData.totalMarks)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div style={styles.column}>
            <h3 style={styles.sectionTitle}>Contact Information</h3>
            <div style={styles.formGroup}>
              {[
                { id: 'email', label: 'Email Address', type: 'email' },
                { id: 'phone', label: 'Phone Number', type: 'tel' },
                { id: 'address', label: 'Address', type: 'text' },
                { id: 'school_name', label: 'School Name', type: 'text' }
              ].map((field) => (
                <div key={field.id} style={styles.inputGroup}>
                  <label style={styles.label}>{field.label}</label>
                  <input
                    type={field.type}
                    name={field.id}
                    value={formData[field.id]}
                    onChange={handleInputChange}
                    style={{
                      ...styles.input,
                      ...(validationErrors[field.id] && styles.inputError)
                    }}
                  />
                  {validationErrors[field.id] && (
                    <p style={styles.errorText}>{validationErrors[field.id]}</p>
                  )}
                </div>
              ))}
              
              <div style={styles.inputGroup}>
                <label style={styles.label}>Course</label>
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleInputChange}
                  style={{
                    ...styles.input,
                    ...(validationErrors.course && styles.inputError)
                  }}
                >
                  {courseOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {validationErrors.course && (
                  <p style={styles.errorText}>{validationErrors.course}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <button 
          onClick={handleSubmitClick} 
          style={styles.submitButton}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Submit Academic Record'}
        </button>
      </div>

      {showConfirmation && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>Confirm Submission</h3>
            </div>
            <div style={styles.modalBody}>
              <p style={styles.modalText}>Please review your information before submitting:</p>
              
              <div style={styles.reviewSection}>
                <h4 style={styles.reviewTitle}>Student Details</h4>
                <p>Name: {formData.candidateName}</p>
                <p>Roll Number: {formData.rollNumber}</p>
                <p>Date of Birth: {formData.dob}</p>
                <p>Father's Name: {formData.fatherName}</p>
                <p>Mother's Name: {formData.motherName}</p>
              </div>
              
              <div style={styles.reviewSection}>
                <h4 style={styles.reviewTitle}>Academic Performance</h4>
                <p>Tamil: {formData.tamilMarks} ({calculatePercentage(formData.tamilMarks)})</p>
                <p>English: {formData.englishMarks} ({calculatePercentage(formData.englishMarks)})</p>
                <p>Mathematics: {formData.mathematicsMarks} ({calculatePercentage(formData.mathematicsMarks)})</p>
                <p>Science: {formData.scienceMarks} ({calculatePercentage(formData.scienceMarks)})</p>
                <p>Social Science: {formData.socialScienceMarks} ({calculatePercentage(formData.socialScienceMarks)})</p>
                <p><strong>Total Marks: {formData.totalMarks} ({calculatePercentage(formData.totalMarks)})</strong></p>
              </div>
              
              <div style={styles.reviewSection}>
                <h4 style={styles.reviewTitle}>Contact Information</h4>
                <p>Email: {formData.email}</p>
                <p>Phone: {formData.phone}</p>
                <p>Address: {formData.address}</p>
                <p>School: {formData.school_name}</p>
                <p>Course: {courseOptions.find(c => c.value === formData.course)?.label || "Not specified"}</p>
              </div>
              
              <p style={styles.modalWarning}>Are you sure all the information is correct?</p>
            </div>
            <div style={styles.modalFooter}>
              <button 
                onClick={handleCancelSubmit}
                style={styles.cancelButton}
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmSubmit}
                style={styles.confirmButton}
              >
                Yes, Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Poppins', sans-serif",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f7fa',
    padding: '2rem'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
    padding: '2rem',
    width: '100%',
    maxWidth: '1200px',
    position: 'relative'
  },
  title: {
    fontSize: '2rem',
    color: '#002244',
    marginBottom: '0.5rem',
    textAlign: 'center'
  },
  subtitle: {
    fontSize: '1rem',
    color: '#666',
    marginBottom: '2rem',
    textAlign: 'center'
  },
  uploadArea: {
    marginBottom: '2rem',
    position: 'relative'
  },
  uploadLabel: {
    display: 'block',
    cursor: 'pointer'
  },
  fileInput: {
    display: 'none'
  },
  uploadBox: {
    border: '2px dashed #4CAF50',
    borderRadius: '8px',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    ':hover': {
      backgroundColor: 'rgba(76, 175, 80, 0.05)'
    }
  },
  fileName: {
    fontWeight: '500',
    color: '#002244'
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '6px'
  },
  spinner: {
    border: '4px solid rgba(0, 0, 0, 0.1)',
    borderLeftColor: '#4CAF50',
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    animation: 'spin 1s linear infinite',
    marginBottom: '1rem'
  },
  threeColumnLayout: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    marginBottom: '2rem'
  },
  column: {
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    padding: '1.5rem'
  },
  sectionTitle: {
    fontSize: '1.25rem',
    color: '#002244',
    marginBottom: '1.5rem',
    paddingBottom: '0.5rem',
    borderBottom: '2px solid #4CAF50'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  inputGroup: {
    marginBottom: '1rem'
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    color: '#555',
    fontWeight: '500'
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    ':focus': {
      outline: 'none',
      borderColor: '#4CAF50',
      boxShadow: '0 0 0 2px rgba(76, 175, 80, 0.2)'
    }
  },
  inputError: {
    borderColor: '#f44336',
    ':focus': {
      borderColor: '#f44336',
      boxShadow: '0 0 0 2px rgba(244, 67, 54, 0.2)'
    }
  },
  errorText: {
    color: '#f44336',
    fontSize: '0.875rem',
    marginTop: '0.25rem'
  },
  marksTable: {
    overflowX: 'auto'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  tableHeader: {
    backgroundColor: '#f2f2f2',
    padding: '0.75rem',
    textAlign: 'left',
    borderBottom: '1px solid #ddd'
  },
  tableCell: {
    padding: '0.75rem',
    borderBottom: '1px solid #ddd'
  },
  smallInput: {
    width: '60px',
    padding: '0.5rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    ':focus': {
      outline: 'none',
      borderColor: '#4CAF50'
    }
  },
  submitButton: {
    width: '100%',
    padding: '1rem',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ':hover': {
      backgroundColor: '#3e8e41'
    },
    ':disabled': {
      backgroundColor: '#cccccc',
      cursor: 'not-allowed'
    }
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
    width: '90%',
    maxWidth: '800px',
    maxHeight: '80vh',
    overflowY: 'auto'
  },
  modalHeader: {
    padding: '1.5rem',
    borderBottom: '1px solid #eee'
  },
  modalTitle: {
    fontSize: '1.5rem',
    color: '#002244',
    margin: 0
  },
  modalBody: {
    padding: '1.5rem'
  },
  modalText: {
    marginBottom: '1.5rem',
    color: '#555'
  },
  reviewSection: {
    marginBottom: '1.5rem'
  },
  reviewTitle: {
    fontSize: '1.1rem',
    color: '#002244',
    marginBottom: '0.5rem',
    paddingBottom: '0.25rem',
    borderBottom: '1px solid #eee'
  },
  modalWarning: {
    fontWeight: '500',
    color: '#002244',
    marginTop: '1.5rem'
  },
  modalFooter: {
    padding: '1.5rem',
    borderTop: '1px solid #eee',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '1rem'
  },
  cancelButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#f5f5f5',
    color: '#333',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    ':hover': {
      backgroundColor: '#e0e0e0'
    }
  },
  confirmButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    ':hover': {
      backgroundColor: '#3e8e41'
    }
  },
  successCard: {
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
    padding: '3rem',
    width: '100%',
    maxWidth: '800px',
    textAlign: 'center'
  },
  successIcon: {
    marginBottom: '1.5rem'
  },
  successTitle: {
    fontSize: '2rem',
    color: '#002244',
    marginBottom: '0.5rem'
  },
  successMessage: {
    fontSize: '1.1rem',
    color: '#666',
    marginBottom: '2rem'
  },
  admissionIdDisplay: {
    backgroundColor: '#f5f5f5',
    padding: '1rem',
    borderRadius: '4px',
    marginBottom: '2rem',
    fontWeight: '500'
  },
  successDetails: {
    textAlign: 'left',
    marginBottom: '2rem',
    padding: '1rem',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px'
  },
  successActions: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center'
  },
  downloadButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '24px',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
  },
  newAdmissionButton:{
    padding: '0.75rem 1.5rem',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '24px',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
  },
}

export default OCRApp;