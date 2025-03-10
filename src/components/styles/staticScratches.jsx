import React from "react";
import "./staticScratches.css";

const StaticScratches = () => {

  const generateScratches = () => {
    const scratches = [];
    for (let i = 0; i < 150; i++) { 
      const top = Math.random() * 100; 
      const left = Math.random() * 100; 
      const width = Math.random() * 1 ; 
      const height = Math.random() * 20 + 5; 
      const rotate = Math.random() * 180 - 90; 
      const opacity = Math.random() * 0.5 + 0.2; 

      scratches.push(
        <div
          key={i}
          className="scratch"
          style={{
            top: `${top}%`,
            left: `${left}%`,
            width: `${width}px`,
            height: `${height}px`,
            transform: `rotate(${rotate}deg)`,
            opacity: opacity,
          }}
        ></div>
      );
    }
    return scratches;
  };

  return <div className="background-scratches">{generateScratches()}</div>;
};

export default StaticScratches;