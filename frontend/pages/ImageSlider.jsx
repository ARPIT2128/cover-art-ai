import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ImageSlider = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 15000); // Change slide every 15 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + images.length) % images.length
    );
  };

  return (
    <div className="container-fluid">
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-ride="carousel"
        style={{
          // Inline CSS for carousel animation
          animation: "carousel-slide 5s infinite forwards ease-in-out",
        }}
      >
        <div className="carousel-inner">
          {images.map((image, index) => (
            <div
              key={index}
              className={`carousel-item ${
                index === currentSlide ? "active" : ""
              }`}
            >
              <img
                className="d-block w-100"
                src={image.src}
                alt={image.altText}
                style={{
                  maxHeight: "400px",
                  objectFit: "cover",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
            </div>
          ))}
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleControls"
          role="button"
          data-slide="prev"
          onClick={handlePrevSlide}
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleControls"
          role="button"
          data-slide="next"
          onClick={handleNextSlide}
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    </div>
  );
};

export default ImageSlider;
