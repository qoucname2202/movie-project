import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { useTranslation } from 'react-i18next';
const Application = ({ reful }) => {
  const slickitem = {
    arrows: false,
    autoplay: true,
    infinite: true,
    autoplaySpeed: 2000,
    next: false,
  };
  const { t } = useTranslation();
  return (
    <div className="footer-inner" id="application" ref={reful}>
      <div className="container">
        <div className="row">
          <div className="footer-left col-md-6">
            <h2 className="ttl-2">{t('title')}</h2>
            <p className="txt">{t('discripe')}</p>
            <button className="btn btn-dowload btn-all-one">{t('download')}</button>
            <p className="txt-update">
              BOOK MY FILM {t('version')}
              <a href="https://apps.apple.com/vn/app/galaxy-cinema/id593312549?l=vi"> iOS</a> &amp;{' '}
              <a href="https://play.google.com/store/apps/details?id=com.galaxy.cinema&hl=vi">Android</a>
            </p>
          </div>
          <div className="footer-right col-md-6">
            <img src="./images/mobile.png" alt="" className="img-wrap" />
            <div className="app-img">
              <Slider {...slickitem}>
                <img src="./images/slide1.jpg" alt="" className="img-fluid" />
                <img src="./images/slide3.jpg" alt="" className="img-fluid" />
                <img src="./images/slide4.jpg" alt="" className="img-fluid" />
                <img src="./images/slide5.jpg" alt="" className="img-fluid" />
                <img src="./images/slide6.jpg" alt="" className="img-fluid" />
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Application;
