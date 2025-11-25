import React, { useState, useEffect } from "react";
import { Zap } from "lucide-react";
import Boton from "./Boton";
import '../src/App.css';
import homeWelcome from "../src/assets/welcome.png";

function Home() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`home home-container fade-in ${visible ? "visible" : ""}`}>
      <img src={homeWelcome} alt="Welcome" className="home-welcome" />
      <img src="/src/assets/icon-lg.png" alt="Company logo" className="home-logo" />
      <h1>Welcome to our store</h1>
      <p>Explore our products and find what you need.</p>
      <Boton to="/products" texto="Shop now" className="home-button" icon={Zap} />
    </div>
  );
}

export default Home;
