import react, { useState, useEffect } from 'react';
import '../src/App.css';

function About() {

    const [visible, setVisible] = useState(false);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(true);
        }, 200);
        return () => clearTimeout(timer);
    }, []);

    return (

        <div className={`about-us contact-us contact-container fade-in ${visible ? "visible" : ""}`}>
            <img src="/src/assets/about-us.png" alt="About Us Title"
                onLoad={() => setLoaded(true)}
                style={{ height: "auto" }} />

            <img src="/src/assets/about.jpg" alt="About Metal Relics"
                onLoad={() => setLoaded(true)}
                style={{ width: "70%", borderRadius: "8px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)" }} />

            <div className="about-text">
                <p>Welcome to <span className="highlight">Metal Relics</span>, your online store dedicated to the world of heavy metal.</p>

                <p>Here you'll find a carefully curated selection of <strong>official merchandise</strong>, <strong>collectibles</strong>, and <strong>rare items</strong> you won't see anywhere else.</p>

                <p>We're passionate about <span className="highlight">metal in all its forms</span> and work hard to bring you <strong>authentic</strong>, <strong>high-quality</strong>, and <strong>hard-to-find</strong> products — vinyls, t-shirts, posters, figures, accessories, and more.</p>

                <p>Whether you're into <strong>classic metal</strong>, <strong>black</strong>, <strong>thrash</strong>, or <strong>power</strong>, Metal Relics has something that reflects your style and passion.</p>

                <p className="final-line">Step in, explore, and bring a piece of metal home.</p>
            </div>
        </div>

    );
}
export default About;