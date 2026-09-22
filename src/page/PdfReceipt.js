import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const PdfReceipt = ({ studentData }) => {
  const receiptRef = useRef();

  const downloadReceipt = () => {
    const input = receiptRef.current;
    
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`admission_receipt_${studentData.rollNumber}.pdf`);
    });
  };

  return (
    <div className="pdf-receipt-container">
      {/* Hidden Receipt Template */}
      <div ref={receiptRef} className="pdf-receipt-template">
        <h2>ADMISSION CONFIRMATION</h2>
        <hr />
        
        <div className="receipt-header">
          <p><strong>Receipt No:</strong> {Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
          <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
        </div>

        <div className="student-details">
          <h4>Student Details</h4>
          <p><strong>Name:</strong> {studentData.candidateName}</p>
          <p><strong>Roll No:</strong> {studentData.rollNumber}</p>
          <p><strong>DOB:</strong> {studentData.dob}</p>
          <p><strong>Father:</strong> {studentData.fatherName}</p>
        </div>

        <div className="marks-details">
          <h4>Marks Obtained</h4>
          <table>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Marks</th>
              </tr>
            </thead>
            <tbody>
              {[
                { subject: 'Tamil', marks: studentData.tamilMarks },
                { subject: 'English', marks: studentData.englishMarks },
                { subject: 'Maths', marks: studentData.mathematicsMarks },
                { subject: 'Science', marks: studentData.scienceMarks },
                { subject: 'Social', marks: studentData.socialScienceMarks },
              ].map((item, index) => (
                <tr key={index}>
                  <td>{item.subject}</td>
                  <td>{item.marks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="receipt-footer">
          <p>**This is an auto-generated receipt**</p>
          <p>College Seal & Signature</p>
        </div>
      </div>

      {/* Download Button */}
      <button 
        onClick={downloadReceipt}
        className="download-receipt-btn"
      >
        Download Admission Receipt (PDF)
      </button>
    </div>
  );
};

export default PdfReceipt;