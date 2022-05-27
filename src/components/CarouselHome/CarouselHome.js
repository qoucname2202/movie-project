import React from 'react';
import LightLity from 'lity';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

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
      name: 'Photo 1',
      url: './images/banner5.jpg',
      link: 'https://www.youtube.com/watch?v=aWzlQ2N6qqg',
      describe: 'Doctor Strange',
    },
    {
      name: 'Photo 2',
      url: './images/banner6.jpg',
      link: 'https://www.youtube.com/watch?v=IOwvN-aoBpM',
      describe: 'Nghề siêu dễ',
    },
    {
      name: 'Photo 3',
      url: './images/banner3.jpg',
      link: 'https://www.youtube.com/watch?v=KiSnBWXAuFY',
      describe: 'Batman',
    },
    {
      name: 'Photo 4',
      url: './images/banner4.jpg',
      link: 'https://www.youtube.com/watch?v=iVJCALQAOyU',
      describe: 'Xe cấp cứu',
    },
    {
      name: 'Photo 5',
      url: './images/banner7.jpg',
      link: 'https://www.youtube.com/watch?v=XsWx71aokYE',
      describe: 'Doraemon cuộc chiến vũ trụ tí hon',
    },
    {
      name: 'Photo 6',
      url: './images/banner8.jpg',
      link: 'https://www.youtube.com/watch?v=ZR99nOkEolM',
      describe: 'Phi Công Siêu Đẳng',
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
                  <img src={item.url} alt={item.describe} className="img-fluid w-100" />
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
