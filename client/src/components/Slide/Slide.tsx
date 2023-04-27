// Infinite div Tutorial
import React from "react";
import "../../assets/styles/Slide.css";

type SlideProps = {
  children: React.ReactNode;
  slidesToShow: number;
  arrowScroll: number;
};

const Slide = ({ children, slidesToShow, arrowScroll }: SlideProps) => {
  return (
    <div className="slide">
      <div className="container"></div>
    </div>
  );
};

export default Slide;
