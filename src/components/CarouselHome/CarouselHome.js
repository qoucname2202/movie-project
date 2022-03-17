import React from "react";
import LightLity from "lity";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const CarouselHome = () => {
  var settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 300,
    slidesToShow: 1,
    arrows: true,
    slidesToScroll: 1,
  };
  const bannerData = [
    {
      name: "Photo 1",
      url: "./images/banner1.jpg",
      link: "https://www.youtube.com/watch?v=mGLL_ylu8IU",
    },
    {
      name: "Photo 2",
      url: "./images/banner2.jpg",
      link: "https://www.youtube.com/watch?v=jO2hbtq-l_g",
    },
    {
      name: "Photo 3",
      url: "./images/banner3.jpg",
      link: "https://www.youtube.com/watch?v=KiSnBWXAuFY",
    },
    {
      name: "Photo 4",
      url: "./images/banner4.jpg",
      link: "https://www.youtube.com/watch?v=iVJCALQAOyU",
    },
  ];
  return (
    <div className="slider-home">
      <Slider {...settings}>
        {bannerData.map((item, index) => {
          return (
            <div key={index} className="inner-slider">
              <div className="carousel-item-ow">
                <a href={item.link} data-lity>
                  <img
                    src={item.url}
                    alt="anh_carousel"
                    className="img-fluid w-100"
                  />
                  <div className="playfilm">
                    <i className="fa fa-play video-play-slider" />
                  </div>
                </a>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default CarouselHome;
