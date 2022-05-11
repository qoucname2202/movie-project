import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { ListCenemaShowAction, ListMovieShowTimeAction } from '../../redux/actions/ShowTimeMovieAction';
import ShowLogoMovie from './ShowLogoMovie';
import { NavLink } from 'react-router-dom';

export default function ShowTimeMovie(props) {
  const { listCinema, maHeThongRap, listMovie, maCumRap } = useSelector((state) => state.ShowTimeMovieReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ListMovieShowTimeAction());
  }, []);

  return (
    <section className="cinema-block" id="theater">
      <div className="container">
        <div className="cinema-inner">
          <div className="row">
            <div className="col-lg-1">
              <div className="show-logo">
                <ul className="nav nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                  <ShowLogoMovie />
                </ul>
              </div>
            </div>
            <div className="col-11">
              <div className="tab-content" id="v-pills-tabContent">
                {listMovie.map((cinemaSystem, index) => {
                  let classActive = index === 0 ? 'active' : '';
                  return (
                    <div
                      key={index}
                      className={`tab-pane fade show ${classActive}`}
                      id={`${cinemaSystem.maHeThongRap}`}
                      role="tabpanel"
                      aria-labelledby="v-pills-home-tab"
                    >
                      <div className="row">
                        <div className="col-lg-4 sroll-tab">
                          <div
                            className="nav flex-column nav-pills listmovie-content"
                            id="v-pills-tab"
                            role="tablist"
                            aria-orientation="vertical"
                          >
                            {cinemaSystem.lstCumRap?.map((inforTheater, index) => {
                              let classActive = index === 0 ? 'active' : '';
                              return (
                                <a
                                  key={index}
                                  className={`nav-link theater-item ${classActive}`}
                                  id={`${cinemaSystem.maHeThongRap}`}
                                  data-toggle="pill"
                                  href={`#${inforTheater.maCumRap}`}
                                  role="tab"
                                  aria-controls="v-pills-messages"
                                  aria-selected="false"
                                >
                                  <div className="row">
                                    <div className="col-3 theater-img">
                                      <img src="./images/rap-bhd.jpg" alt="!#s" width="100%" />
                                    </div>
                                    <div className="col-9 theater-text">
                                      <p>{inforTheater.tenCumRap}</p>
                                      <span>{inforTheater.diaChi}</span>
                                      <br />
                                      <a href="#!">[ Chi tiết ]</a>
                                    </div>
                                  </div>
                                </a>
                              );
                            })}
                          </div>
                        </div>
                        <div className="col-lg-8 tab-content-bl scroll-tab">
                          <div className="tab-content" id="v-pills-tabContent">
                            {cinemaSystem.lstCumRap?.map((inforTheater, index) => {
                              let classActive = index === 0 ? 'active' : '';
                              return (
                                <div
                                  key={index}
                                  className={`showtime-movie tab-pane fade show ${classActive}`}
                                  id={inforTheater.maCumRap}
                                  role="tabpanel"
                                  aria-labelledby="v-pills-messages-tab"
                                >
                                  {inforTheater.danhSachPhim?.map((movie, index) => {
                                    return (
                                      <div key={index} className="showtime-movie-it">
                                        <div className="row">
                                          <div className="movie-img col-2-img">
                                            <img
                                              src={movie.hinhAnh}
                                              alt={movie.tenPhim}
                                              className="img-fluid"
                                              width="60px"
                                            />
                                          </div>
                                          <div className="wrap-infor pl-0 col-10-infor">
                                            <p>
                                              <span className="age">P</span>
                                              {movie.tenPhim}
                                            </p>
                                            <span>120 phút -FOX 9.4 -IMDb 8.7</span>
                                          </div>
                                        </div>
                                        <h5 className="ttl">2D Digital</h5>
                                        <div className="row">
                                          {movie.lstLichChieuTheoPhim?.slice(0, 8).map((timeShow, index) => {
                                            if (moment() <= moment(timeShow.ngayChieuGioChieu)) {
                                              return (
                                                <div key={index} className="block-time">
                                                  <NavLink
                                                    to={`checkout/${timeShow.maLichChieu}`}
                                                    className="time-movie"
                                                  >
                                                    <p>
                                                      <span>
                                                        {moment(timeShow.ngayChieuGioChieu).format('hh:mm A')}
                                                      </span>{' '}
                                                      ~ 12:10
                                                    </p>
                                                  </NavLink>
                                                </div>
                                              );
                                            } else {
                                              return '';
                                            }
                                          })}
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
