// Infinite Slider Tutorial
import React from 'react';
import Slider from 'infinite-react-carousel';
import "./Slide.css"

type SlideProps = {
  children: React.ReactNode;
  slidesToShow: number;
  arrowScroll: number;
}

const Slide = ({ children, slidesToShow, arrowScroll }: SlideProps) => {
  return (
    <div className='slide'>
      <div className='container'>
        <Slider slidesToShow={slidesToShow} arrowScroll={arrowScroll}>
          {children}
        </Slider>
      </div>
    </div>
  )
}

export default Slide;
