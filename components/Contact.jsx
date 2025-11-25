import React, { useState, useEffect } from "react";
import '../src/App.css';

function Contact() {

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(true);
        }, 200);
        return () => clearTimeout(timer);
    }, []);


    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const [sent, setSent] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.message) {
            alert("Please fill in all the fields");
            return;
        }

        console.log("Data submitted:", formData);
        setSent(true);

        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <div className={`contact-us container fade-in ${visible ? "visible" : ""}`}>
            {/*<img
                src="/src/assets/contact-us.png"
                alt="Contact us"
                className="contact-us-header"
            />*/}
            <h2 style={{ color:"#F87C63" }}>Contact us</h2>
            <p>Do you have any questions or inquiries? Write to us!</p>

            {sent ? (
                <p>Your message was sent successfully!!</p>
            ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                    />

                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="yourname@email.com"
                    />

                    <label>Message</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Write your message..."
                        rows="5"
                    />

                    <button type="submit">Send message</button>
                </form>
            )}
        </div>

    );
}

export default Contact;