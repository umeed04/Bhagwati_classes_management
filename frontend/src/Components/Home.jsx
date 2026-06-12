import React, { useEffect, useState } from "react";
import logo5 from "../Components/logo5.jpeg";
import logo4 from "../Components/logo4.jpeg";
import logo3 from "../Components/logo3.jpeg";

const Home = () => {

  const images = [
    logo3,
    logo4,
    logo5,
    
  ];

  const [current, setCurrent] = useState(0);

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 2000); // 

    return () => clearInterval(interval);
  }, []);

  // 
  const prevSlide = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent((current + 1) % images.length);
  };

  return (
    <div style={{ position: "relative", backgroundColor: "black" }}>

      {/* IMAGE */}
      <img
        src={images[current]}
        alt="slider"
        style={{
          width: "100%",
          height: "100vh",
          objectFit: "contain",  
          transition: "0.5s"
        }}
      />

      {/* LEFT BUTTON */}
      <button
        onClick={prevSlide}
        style={{
          position: "absolute",
          top: "50%",
          left: "20px",
          transform: "translateY(-50%)",
          fontSize: "30px",
          background: "rgba(0,0,0,0.5)",
          color: "#fff",
          border: "none",
          padding: "10px",
          cursor: "pointer"
        }}
      >
        ❮
      </button>

      {/* RIGHT BUTTON */}
      <button
        onClick={nextSlide}
        style={{
          position: "absolute",
          top: "50%",
          right: "20px",
          transform: "translateY(-50%)",
          fontSize: "30px",
          background: "rgba(0,0,0,0.5)",
          color: "#fff",
          border: "none",
          padding: "10px",
          cursor: "pointer"
        }}
      >
        ❯
      </button>

      
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          width: "100%",
          textAlign: "center"
        }}
      >
        {images.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrent(index)}
            style={{
              display: "inline-block",
              width: "12px",
              height: "12px",
              margin: "0 5px",
              borderRadius: "50%",
              background: current === index ? "white" : "gray",
              cursor: "pointer"
            }}
          ></span>
        ))}
      </div>

    </div>
  );
};

export default Home;