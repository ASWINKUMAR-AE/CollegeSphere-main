import React from 'react'

import white_arrow from '../../assets/white-arrow.png'
import { motion } from "framer-motion"


const Campus = () => {
  return 
  <div className="contact-container">
  <h2>Send us a message 📧</h2>
  <p>
    Feel free to reach out through contact form or find our contact information below...
  </p>

  <div className="contact-info">
    <div className="contact-item">
      <span className="contact-icon">✉️</span>
      <span className="contact-text">TamilNadu Government Polytechnic College</span>
    </div>

    <div className="contact-item">
      <span className="contact-icon">📞</span>
      <span className="contact-text">+1 123-456-5662</span>
    </div>

    <div className="contact-item">
      <span className="contact-icon">📍</span>
      <span className="contact-text">Thirupparankundram Road, Madurai 625-022</span>
    </div>
  </div>
</div>

  
}

export default Campus