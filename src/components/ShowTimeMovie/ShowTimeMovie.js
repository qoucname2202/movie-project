import React from "react";
import ShowLogoMovie from "./ShowLogoMovie";
import moment from "moment";
import { Link } from "react-router-dom";
const ShowTimeMovie = () => {
  return (
    <section className="cinema-block" id="theater">
      <div className="container">
        <div className="cinema-inner">
          <div className="row">
            <div className="col-lg-1">
              <div className="show-logo">
                <ul
                  className="nav nav-pills"
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <ShowLogoMovie />
                </ul>
              </div>
            </div>
            <div className="col-11">
              <div className="tab-content" id="v-pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="!#"
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
                        <a
                          className="nav-link theater-item active"
                          id="@BHDStar"
                          data-toggle="pill"
                          href="CP01"
                          role="tab"
                          aria-controls="v-pills-messages"
                          aria-selected="false"
                        >
                          <div className="row">
                            <div className="col-3 theater-img">
                              <img
                                src="./images/rap-bhd.jpg"
                                alt=""
                                width="100%"
                              />
                            </div>
                            <div className="col-9 theater-text">
                              <p>CGV - Vạn Hạnh Mall</p>
                              <span>132 Ông Ích Khiêm, P15, Q11</span>
                              <br />
                              <a href="#!">[ Chi tiết ]</a>
                            </div>
                          </div>
                        </a>
                      </div>
                      <div
                        className="nav flex-column nav-pills listmovie-content"
                        id="v-pills-tab"
                        role="tablist"
                        aria-orientation="vertical"
                      >
                        <a
                          className="nav-link theater-item"
                          id="@BHDStar"
                          data-toggle="pill"
                          href="CP01"
                          role="tab"
                          aria-controls="v-pills-messages"
                          aria-selected="false"
                        >
                          <div className="row">
                            <div className="col-3 theater-img">
                              <img
                                src="./images/rap-bhd.jpg"
                                alt=""
                                width="100%"
                              />
                            </div>
                            <div className="col-9 theater-text">
                              <p>CGV - Vạn Hạnh Mall</p>
                              <span>132 Ông Ích Khiêm, P15, Q11</span>
                              <br />
                              <a href="#!">[ Chi tiết ]</a>
                            </div>
                          </div>
                        </a>
                      </div>
                      <div
                        className="nav flex-column nav-pills listmovie-content"
                        id="v-pills-tab"
                        role="tablist"
                        aria-orientation="vertical"
                      >
                        <a
                          className="nav-link theater-item"
                          id="@BHDStar"
                          data-toggle="pill"
                          href="CP01"
                          role="tab"
                          aria-controls="v-pills-messages"
                          aria-selected="false"
                        >
                          <div className="row">
                            <div className="col-3 theater-img">
                              <img
                                src="./images/rap-bhd.jpg"
                                alt=""
                                width="100%"
                              />
                            </div>
                            <div className="col-9 theater-text">
                              <p>CGV - Vạn Hạnh Mall</p>
                              <span>132 Ông Ích Khiêm, P15, Q11</span>
                              <br />
                              <a href="#!">[ Chi tiết ]</a>
                            </div>
                          </div>
                        </a>
                      </div>
                      <div
                        className="nav flex-column nav-pills listmovie-content"
                        id="v-pills-tab"
                        role="tablist"
                        aria-orientation="vertical"
                      >
                        <a
                          className="nav-link theater-item"
                          id="@BHDStar"
                          data-toggle="pill"
                          href="CP01"
                          role="tab"
                          aria-controls="v-pills-messages"
                          aria-selected="false"
                        >
                          <div className="row">
                            <div className="col-3 theater-img">
                              <img
                                src="./images/rap-bhd.jpg"
                                alt=""
                                width="100%"
                              />
                            </div>
                            <div className="col-9 theater-text">
                              <p>CGV - Vạn Hạnh Mall</p>
                              <span>132 Ông Ích Khiêm, P15, Q11</span>
                              <br />
                              <a href="#!">[ Chi tiết ]</a>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div className="col-lg-8 tab-content-bl scroll-tab">
                      <div className="tab-content" id="v-pills-tabContent">
                        <div
                          className="showtime-movie tab-pane fade show active"
                          id="!#"
                          role="tabpanel"
                          aria-labelledby="v-pills-messages-tab"
                        >
                          <div className="showtime-movie-it">
                            <div className="row">
                              <div className="movie-img col-2-img">
                                <img
                                  src="https://movie0706.cybersoft.edu.vn/hinhanh/ant-man_gp03.jpg"
                                  alt=""
                                  className="img-fluid"
                                  width="50px"
                                />
                              </div>
                              <div className="wrap-infor pl-0 col-10-infor">
                                <p>
                                  <span className="age">P</span>
                                  Batman and Superman
                                </p>
                                <span>120 phút -FOX 9.4 -IMDb 8.7</span>
                              </div>
                            </div>
                            <h5 className="ttl">2D Digital</h5>
                            <div className="row">
                              <div className="block-time">
                                <a href="!" className="time-movie">
                                  <p>
                                    <span>08:00 AM</span> ~ 12:10
                                  </p>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowTimeMovie;
