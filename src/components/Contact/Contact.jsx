import React from 'react';
import './Contact.css';
import msg_icon from '../../assets/msg-icon.png';
import mail_icon from '../../assets/mail-icon.png';
import phone_icon from '../../assets/phone-icon.png';
import location_icon from '../../assets/location-icon.png';
import { motion } from 'framer-motion';

const Contact = () => {
    const [result, setResult] = React.useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        setResult("Sending....");
        const formData = new FormData(event.target);
        formData.append("access_key", "YOUR_ACCESS_KEY_HERE");

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            setResult("Form Submitted Successfully");
            event.target.reset();
        } else {
            console.log("Error", data);
            setResult(data.message);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -200 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="contact">
            <div className="contact-col">
                <h3>
                    Send us a message <img src={msg_icon} alt="message icon" />
                </h3>
                <p>
                    Feel free to reach out through contact form or find our contact information below. Your feedback, questions, and suggestions are important to us as we strive to provide exceptional service to our university community.
                </p>
                <div className="contact-info">
                    <div className="contact-item">
                        <img src={mail_icon} alt="mail" className="contact-icon" />
                        <span>TamilNadu Government Polytechnic College</span>
                    </div>
                    <div className="contact-item">
                        <img src={phone_icon} alt="phone" className="contact-icon" />
                        <span>+1 123-456-5662</span>
                    </div>
                    <div className="contact-item">
                        <img src={location_icon} alt="location" className="contact-icon" />
                        <span>Thiruparankunram Road<br />Madurai 625-022</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Contact;
