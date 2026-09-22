import React, { useState } from "react";
import "./Admission.css"; // Import CSS file

function AdmissionForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted successfully!");
    console.log(formData);
  };

  return (
    <div className="admission-form-container">
      <h2>Admission Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter your full name"
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="Enter your phone number"
          />
        </div>

        <div className="form-group">
          <label>Course</label>
          <select name="course" value={formData.course} onChange={handleChange} required>
            <option value="">Select a course</option>
            <option value="B.Tech">WEB DESIGNING</option>
            <option value="BBA">MECH</option>
            <option value="MBA">CIVIL</option>
            <option value="M.Tech">CSE</option>
          </select>
        </div>

        

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}


export default AdmissionForm;
