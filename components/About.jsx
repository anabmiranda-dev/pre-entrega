import React, { useState, useEffect } from 'react';
import about from "../src/assets/about.jpg";
import '../src/App.css';

function About() {

    const [visible, setVisible] = useState(false);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="container" style={{ textAlign: "center", marginTop: "50px" }}>
            <div className={`fade-in ${visible ? "visible" : ""}`}>

                <h2 style={{ color: "#F87C63" }}>About us</h2>

                <img
                    src="/src/assets/shopping-cart.png"
                    alt="Shopping Cart"
                    className="cart-header-img"
                />

                <div className={`about-text`} style={{ marginTop: "30px", textAlign: "center", lineHeight: "1.6", fontSize: "16px" }}>
                    <p>
                        Welcome to <span className="highlight">Metal Relics</span>, your online store dedicated to the world of heavy metal.
                    </p>

                    <p>
                        Here you'll find a carefully curated selection of
                        <strong> official merchandise</strong>,
                        <strong> collectibles</strong>, and
                        <strong> rare items</strong> you won't see anywhere else.
                    </p>

                    <p>
                        We're passionate about <span className="highlight">metal in all its forms</span> and work hard to bring you
                        <strong> authentic</strong>, <strong> high-quality</strong>, and
                        <strong> hard-to-find</strong> products — vinyls, t-shirts, posters, figures, accessories, and more.
                    </p>

                    <p>
                        Whether you're into <strong> classic metal</strong>, <strong> black</strong>,
                        <strong> thrash</strong>, or <strong> power</strong>, Metal Relics has something
                        that reflects your style and passion.
                    </p>

                    <p className="final-line">Step in, explore, and bring a piece of metal home.</p>
                </div>

            </div>

        </div>
    );

}

export default About;
