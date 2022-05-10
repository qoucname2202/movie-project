import React from 'react';
import LightLity from 'lity';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
const ListMovie = ({ reful }) => {
  const listMovie = {
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    rows: 2,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };
  return (
    <section className="listmovie container" id="showdate" ref={reful}>
      <ul className="nav nav-pills" id="pills-tab" role="tablist">
        <li className="nav-item" role="presentation">
          <a
            className="nav-link active btn-all"
            id="pills-nowshow-tab"
            data-toggle="tab"
            href="#pills-nowshow"
            role="tab"
            aria-controls="pills-nowshow"
          >
            Phim đang chiếu
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a
            className="nav-link btn-all"
            id="pills-comming-tab"
            data-toggle="tab"
            href="#pills-comming"
            role="tab"
            aria-controls="pills-comming"
          >
            Phim sắp chiếu
          </a>
        </li>
      </ul>
      <div className="tab-content listmovie-content" id="pills-tabcontent">
        <div className="tab-pane fade content-item active show" id="pills-nowshow" role="tabpanel">
          <div className="content-show">
            <Slider {...listMovie}>
              <div className="movie-item" id="movieitem">
                <a className="video" data-lity href="https://www.youtube.com/embed/1HpZevFifuo">
                  <div className="movie-img">
                    <img
                      src="http://movie0706.cybersoft.edu.vn/hinhanh/antman.jpg"
                      alt="http://movie0706.cybersoft.edu.vn/hinhanh/antman.jpg"
                      className="img-fluid"
                    />
                    <div className="icon-play">
                      <i className="fa fa-play" />
                    </div>
                    <div className="review">
                      5<span>/10</span>
                      <i className="fa fa-star icon-start" />
                    </div>
                    <div className="dateshow" style={{ display: 'none' }}>
                      2019-07-29T00:00:00
                    </div>
                    <div className="overlay" />
                  </div>
                </a>
                <div className="movie-info">
                  <p className="namemovie">Người Kiến</p>
                  <span className="timeshow">120 phút</span>
                  <a href="!#">
                    <div className="btn-buyticket">
                      Mua vé
                      <i className="fa fa-arrow-circle-down icon-down" />
                    </div>
                  </a>
                </div>
              </div>
              <div className="movie-item" id="movieitem">
                <a className="video" data-lity href="https://www.youtube.com/embed/1HpZevFifuo">
                  <div className="movie-img">
                    <img
                      src="http://movie0706.cybersoft.edu.vn/hinhanh/antman.jpg"
                      alt="http://movie0706.cybersoft.edu.vn/hinhanh/antman.jpg"
                      className="img-fluid"
                    />
                    <div className="icon-play">
                      <i className="fa fa-play" />
                    </div>
                    <div className="review">
                      5<span>/10</span>
                      <i className="fa fa-star icon-start" />
                    </div>
                    <div className="dateshow" style={{ display: 'none' }}>
                      2019-07-29T00:00:00
                    </div>
                    <div className="overlay" />
                  </div>
                </a>
                <div className="movie-info">
                  <p className="namemovie">Người Kiến</p>
                  <span className="timeshow">120 phút</span>
                  <a href="!#">
                    <div className="btn-buyticket">
                      Mua vé
                      <i className="fa fa-arrow-circle-down icon-down" />
                    </div>
                  </a>
                </div>
              </div>
              <div className="movie-item" id="movieitem">
                <a className="video" data-lity href="https://www.youtube.com/embed/1HpZevFifuo">
                  <div className="movie-img">
                    <img
                      src="http://movie0706.cybersoft.edu.vn/hinhanh/antman.jpg"
                      alt="http://movie0706.cybersoft.edu.vn/hinhanh/antman.jpg"
                      className="img-fluid"
                    />
                    <div className="icon-play">
                      <i className="fa fa-play" />
                    </div>
                    <div className="review">
                      5<span>/10</span>
                      <i className="fa fa-star icon-start" />
                    </div>
                    <div className="dateshow" style={{ display: 'none' }}>
                      2019-07-29T00:00:00
                    </div>
                    <div className="overlay" />
                  </div>
                </a>
                <div className="movie-info">
                  <p className="namemovie">Người Kiến</p>
                  <span className="timeshow">120 phút</span>
                  <a href="!#">
                    <div className="btn-buyticket">
                      Mua vé
                      <i className="fa fa-arrow-circle-down icon-down" />
                    </div>
                  </a>
                </div>
              </div>
              <div className="movie-item" id="movieitem">
                <a className="video" data-lity href="https://www.youtube.com/embed/1HpZevFifuo">
                  <div className="movie-img">
                    <img
                      src="http://movie0706.cybersoft.edu.vn/hinhanh/antman.jpg"
                      alt="http://movie0706.cybersoft.edu.vn/hinhanh/antman.jpg"
                      className="img-fluid"
                    />
                    <div className="icon-play">
                      <i className="fa fa-play" />
                    </div>
                    <div className="review">
                      5<span>/10</span>
                      <i className="fa fa-star icon-start" />
                    </div>
                    <div className="dateshow" style={{ display: 'none' }}>
                      2019-07-29T00:00:00
                    </div>
                    <div className="overlay" />
                  </div>
                </a>
                <div className="movie-info">
                  <p className="namemovie">Người Kiến</p>
                  <span className="timeshow">120 phút</span>
                  <a href="!#">
                    <div className="btn-buyticket">
                      Mua vé
                      <i className="fa fa-arrow-circle-down icon-down" />
                    </div>
                  </a>
                </div>
              </div>
              <div className="movie-item" id="movieitem">
                <a className="video" data-lity href="https://www.youtube.com/embed/1HpZevFifuo">
                  <div className="movie-img">
                    <img
                      src="http://movie0706.cybersoft.edu.vn/hinhanh/antman.jpg"
                      alt="http://movie0706.cybersoft.edu.vn/hinhanh/antman.jpg"
                      className="img-fluid"
                    />
                    <div className="icon-play">
                      <i className="fa fa-play" />
                    </div>
                    <div className="review">
                      5<span>/10</span>
                      <i className="fa fa-star icon-start" />
                    </div>
                    <div className="dateshow" style={{ display: 'none' }}>
                      2019-07-29T00:00:00
                    </div>
                    <div className="overlay" />
                  </div>
                </a>
                <div className="movie-info">
                  <p className="namemovie">Người Kiến</p>
                  <span className="timeshow">120 phút</span>
                  <a href="!#">
                    <div className="btn-buyticket">
                      Mua vé
                      <i className="fa fa-arrow-circle-down icon-down" />
                    </div>
                  </a>
                </div>
              </div>
              <div className="movie-item" id="movieitem">
                <a className="video" data-lity href="https://www.youtube.com/embed/1HpZevFifuo">
                  <div className="movie-img">
                    <img
                      src="http://movie0706.cybersoft.edu.vn/hinhanh/antman.jpg"
                      alt="http://movie0706.cybersoft.edu.vn/hinhanh/antman.jpg"
                      className="img-fluid"
                    />
                    <div className="icon-play">
                      <i className="fa fa-play" />
                    </div>
                    <div className="review">
                      5<span>/10</span>
                      <i className="fa fa-star icon-start" />
                    </div>
                    <div className="dateshow" style={{ display: 'none' }}>
                      2019-07-29T00:00:00
                    </div>
                    <div className="overlay" />
                  </div>
                </a>
                <div className="movie-info">
                  <p className="namemovie">Người Kiến</p>
                  <span className="timeshow">120 phút</span>
                  <a href="!#">
                    <div className="btn-buyticket">
                      Mua vé
                      <i className="fa fa-arrow-circle-down icon-down" />
                    </div>
                  </a>
                </div>
              </div>
              <div className="movie-item" id="movieitem">
                <a className="video" data-lity href="https://www.youtube.com/embed/1HpZevFifuo">
                  <div className="movie-img">
                    <img
                      src="http://movie0706.cybersoft.edu.vn/hinhanh/antman.jpg"
                      alt="http://movie0706.cybersoft.edu.vn/hinhanh/antman.jpg"
                      className="img-fluid"
                    />
                    <div className="icon-play">
                      <i className="fa fa-play" />
                    </div>
                    <div className="review">
                      5<span>/10</span>
                      <i className="fa fa-star icon-start" />
                    </div>
                    <div className="dateshow" style={{ display: 'none' }}>
                      2019-07-29T00:00:00
                    </div>
                    <div className="overlay" />
                  </div>
                </a>
                <div className="movie-info">
                  <p className="namemovie">Người Kiến</p>
                  <span className="timeshow">120 phút</span>
                  <a href="!#">
                    <div className="btn-buyticket">
                      Mua vé
                      <i className="fa fa-arrow-circle-down icon-down" />
                    </div>
                  </a>
                </div>
              </div>
              <div className="movie-item" id="movieitem">
                <a className="video" data-lity href="https://www.youtube.com/embed/1HpZevFifuo">
                  <div className="movie-img">
                    <img
                      src="http://movie0706.cybersoft.edu.vn/hinhanh/antman.jpg"
                      alt="http://movie0706.cybersoft.edu.vn/hinhanh/antman.jpg"
                      className="img-fluid"
                    />
                    <div className="icon-play">
                      <i className="fa fa-play" />
                    </div>
                    <div className="review">
                      5<span>/10</span>
                      <i className="fa fa-star icon-start" />
                    </div>
                    <div className="dateshow" style={{ display: 'none' }}>
                      2019-07-29T00:00:00
                    </div>
                    <div className="overlay" />
                  </div>
                </a>
                <div className="movie-info">
                  <p className="namemovie">Người Kiến</p>
                  <span className="timeshow">120 phút</span>
                  <a href="!#">
                    <div className="btn-buyticket">
                      Mua vé
                      <i className="fa fa-arrow-circle-down icon-down" />
                    </div>
                  </a>
                </div>
              </div>
              <div className="movie-item" id="movieitem">
                <a className="video" data-lity href="https://www.youtube.com/embed/1HpZevFifuo">
                  <div className="movie-img">
                    <img
                      src="http://movie0706.cybersoft.edu.vn/hinhanh/antman.jpg"
                      alt="http://movie0706.cybersoft.edu.vn/hinhanh/antman.jpg"
                      className="img-fluid"
                    />
                    <div className="icon-play">
                      <i className="fa fa-play" />
                    </div>
                    <div className="review">
                      5<span>/10</span>
                      <i className="fa fa-star icon-start" />
                    </div>
                    <div className="dateshow" style={{ display: 'none' }}>
                      2019-07-29T00:00:00
                    </div>
                    <div className="overlay" />
                  </div>
                </a>
                <div className="movie-info">
                  <p className="namemovie">Người Kiến</p>
                  <span className="timeshow">120 phút</span>
                  <a href="!#">
                    <div className="btn-buyticket">
                      Mua vé
                      <i className="fa fa-arrow-circle-down icon-down" />
                    </div>
                  </a>
                </div>
              </div>
              <div className="movie-item" id="movieitem">
                <a className="video" data-lity href="https://www.youtube.com/embed/1HpZevFifuo">
                  <div className="movie-img">
                    <img
                      src="http://movie0706.cybersoft.edu.vn/hinhanh/antman.jpg"
                      alt="http://movie0706.cybersoft.edu.vn/hinhanh/antman.jpg"
                      className="img-fluid"
                    />
                    <div className="icon-play">
                      <i className="fa fa-play" />
                    </div>
                    <div className="review">
                      5<span>/10</span>
                      <i className="fa fa-star icon-start" />
                    </div>
                    <div className="dateshow" style={{ display: 'none' }}>
                      2019-07-29T00:00:00
                    </div>
                    <div className="overlay" />
                  </div>
                </a>
                <div className="movie-info">
                  <p className="namemovie">Người Kiến</p>
                  <span className="timeshow">120 phút</span>
                  <a href="!#">
                    <div className="btn-buyticket">
                      Mua vé
                      <i className="fa fa-arrow-circle-down icon-down" />
                    </div>
                  </a>
                </div>
              </div>
              <div className="movie-item" id="movieitem">
                <a className="video" data-lity href="https://www.youtube.com/embed/1HpZevFifuo">
                  <div className="movie-img">
                    <img
                      src="http://movie0706.cybersoft.edu.vn/hinhanh/antman.jpg"
                      alt="http://movie0706.cybersoft.edu.vn/hinhanh/antman.jpg"
                      className="img-fluid"
                    />
                    <div className="icon-play">
                      <i className="fa fa-play" />
                    </div>
                    <div className="review">
                      5<span>/10</span>
                      <i className="fa fa-star icon-start" />
                    </div>
                    <div className="dateshow" style={{ display: 'none' }}>
                      2019-07-29T00:00:00
                    </div>
                    <div className="overlay" />
                  </div>
                </a>
                <div className="movie-info">
                  <p className="namemovie">Người Kiến</p>
                  <span className="timeshow">120 phút</span>
                  <a href="!#">
                    <div className="btn-buyticket">
                      Mua vé
                      <i className="fa fa-arrow-circle-down icon-down" />
                    </div>
                  </a>
                </div>
              </div>
              <div className="movie-item" id="movieitem">
                <a className="video" data-lity href="https://www.youtube.com/embed/1HpZevFifuo">
                  <div className="movie-img">
                    <img
                      src="http://movie0706.cybersoft.edu.vn/hinhanh/antman.jpg"
                      alt="http://movie0706.cybersoft.edu.vn/hinhanh/antman.jpg"
                      className="img-fluid"
                    />
                    <div className="icon-play">
                      <i className="fa fa-play" />
                    </div>
                    <div className="review">
                      5<span>/10</span>
                      <i className="fa fa-star icon-start" />
                    </div>
                    <div className="dateshow" style={{ display: 'none' }}>
                      2019-07-29T00:00:00
                    </div>
                    <div className="overlay" />
                  </div>
                </a>
                <div className="movie-info">
                  <p className="namemovie">Người Kiến</p>
                  <span className="timeshow">120 phút</span>
                  <a href="!#">
                    <div className="btn-buyticket">
                      Mua vé
                      <i className="fa fa-arrow-circle-down icon-down" />
                    </div>
                  </a>
                </div>
              </div>
            </Slider>
          </div>
        </div>
        {/*star show*/}
        <div className="tab-pane fade content-item" id="pills-comming" role="tabpanel">
          <div className="content-show">
            <Slider {...listMovie}></Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListMovie;
