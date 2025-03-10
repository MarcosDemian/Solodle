import React, { useState, useEffect } from "react";
import Game from "./components/Game/Game";
import StaticScratches from "./components/styles/staticScratches";
import MD_Logo from "/logo-d.png";
import "./App.css";


const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
    <div className="app_container">
      {isLoading ? (
        <div className="loading-screen">
          <div className="loading-line"></div>
        </div>
      ) : (
        <>
          <div className="loading-line top"><div className="trapezoid t-top"></div></div>
          <div className="loading-line bottom"><div className="trapezoid t-bottom"></div></div>
          <div className="game-container">
            <StaticScratches />
            <Game />
          </div>
        </>
      )}
    </div>
    <a className="dev-logo-link" href="https://marcosdemian.github.io/MarcosPortafolio/" target="blank_" ><img className="dev-logo" src={MD_Logo} alt="Dev-logo" /></a>
    </>
  );
};

export default App;