import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { detailsMoviesAction } from '../../redux/actions/ListMovieAction';
import LightLity from 'lity';
import { Fragment } from 'react';
import moment from 'moment';
import { NavLink, useParams } from 'react-router-dom';
import DateOfYear from '../../components/DateOfYear';
import { COMMENT_MOVIE } from '../../configs/settings';
import Comment from '../../components/Comment';
import { Link } from 'react-scroll';
import MomentTZ from 'moment-timezone';

export default function Details(props) {
  const { detailsMovies } = useSelector((state) => state.ListMovieReducer);
  const [date, setDate] = useState(Date.now());
  const { listComment } = useSelector((state) => state.ListMovieReducer);

  const dispatch = useDispatch();

  const [comment, setComment] = useState('');

  const { id } = useParams();
  useEffect(() => {
    dispatch(detailsMoviesAction(id));
  }, []);

  //Set date
  let dayTime = [];
  const findDate = () => {
    for (let i = 0; i < 7; i++) {
      let day = MomentTZ().tz('Asia/Ho_Chi_Minh');
      let nextDay = day.add(i, 'days');
      // Lấy ngày
      let d = nextDay.format('DD');
      // Lấy thứ
      let n = nextDay.isoWeekday();
      dayTime.push({ thu: n + 1, ngay: d, day: nextDay });
    }
  };

  findDate();
  const renderDate = () => {
    if (dayTime && dayTime.length > 0) {
      return dayTime.map((item, index) => {
        return (
          <DateOfYear handelDateChange={handelDateChange} key={item.ngay} Item={item} active={false} index={index} />
        );
      });
    }
  };

  const handelDateChange = (day) => {
    setDate(day);
  };

  //Comment
  const handleChangeComment = (event) => {
    setComment(event.target.value);
  };
  const handleSubmitRating = () => {
    dispatch({
      type: COMMENT_MOVIE,
      listComment,
    });
  };

  const renderComment = () => {
    return listComment.map((item, index) => {
      return <Comment key={index} cmt={item} />;
    });
  };

  let setting = {
    activeClass: 'active',
    spy: true,
    smooth: true,
    offset: -90,
    duration: 400,
  };
  return (
    <div>
      <section className="detail-mv">
        <div className="inner-detail-mv-banner">
          <div className="detail-mv-banner" style={{ backgroundImage: `url(${detailsMovies.hinhAnh})` }}></div>
          <div className="overlay-banner"></div>
          <div className="container details-inner">
            <div className="row">
              <div className="col-md-3">
                <div className="detail-img">
                  <img src={detailsMovies.hinhAnh} alt={detailsMovies.hinhAnh} className="img-fluid w-100" />
                  <div className="icon-play">
                    <a data-lity className="video" href={detailsMovies.trailer}>
                      <i className="fa fa-play" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-7 details-infor my-auto">
                <p className="ttl">
                  <span className="agetype">P</span>
                  {detailsMovies.tenPhim}
                </p>
                <p className="date">{moment(detailsMovies.ngayKhoiChieu).format('DD/MM/YYYY')}</p>
                <p className="time-ttl">120 phút - 2D/Digital</p>
                <Link {...setting} to="schedule" className="btn btn-buy">
                  Mua vé
                </Link>
              </div>
              <div className="col-md-2 circle-custom my-auto">
                <div className="percent">
                  <svg>
                    <circle cx={60} cy={60} r={40} />
                    <circle cx={60} cy={60} r={40} />
                  </svg>
                  <div className="number">
                    <h2>8.8</h2>
                  </div>
                </div>
                <div className="icon-start">
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="movie-dt-showtime" id="schedule">
        <div className="container">
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <a
                className="nav-link active"
                id="showtime-tab"
                data-toggle="tab"
                href="#showtime"
                role="tab"
                aria-controls="home"
              >
                Lịch chiếu
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a
                className="nav-link"
                id="infomation-tab"
                data-toggle="tab"
                href="#infomation"
                role="tab"
                aria-controls="infomation"
              >
                Thông tin
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a
                className="nav-link"
                id="review-tab"
                data-toggle="tab"
                href="#review"
                role="tab"
                aria-controls="review"
              >
                Đánh giá
              </a>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div className="tab-pane fade active show" id="showtime" role="tabpanel" aria-labelledby="showtime-tab">
              <div className="cinema-block">
                <div className="cinema-inner">
                  <div className="row">
                    <div className="col-lg-4">
                      <div className="show-logo">
                        <ul className="nav nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                          {detailsMovies.heThongRapChieu?.map((details, index) => {
                            let classActive = index === 0 ? 'active' : '';
                            return (
                              <li className="nav-item">
                                <a
                                  className={`nav-link ${classActive}`}
                                  id="v-pills-home-tab"
                                  data-toggle="pill"
                                  href={`#${details.maHeThongRap}`}
                                  role="tab"
                                  aria-controls="v-pills-home"
                                >
                                  <img src={details.logo} alt={details.logo} width="50px" />
                                  <span className="cinema-name">{details.tenHeThongRap}</span>
                                </a>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                    <div className="col-lg-8 tab-content-bl">
                      <div className="tab-content" id="v-pills-tabContent">
                        <div className="dayofweek">{renderDate()}</div>
                        {detailsMovies.heThongRapChieu?.map((details, index) => {
                          let classActive = 0 === index ? 'active' : '';
                          return (
                            <div
                              key={index}
                              className={`showtime-movie tab-pane fade show  ${classActive}`}
                              id={details.maHeThongRap}
                              role="tabpanel"
                              aria-labelledby="v-pills-home"
                            >
                              <div className="showtime-movie-it">
                                {details.cumRapChieu?.map((theater, index) => {
                                  if (
                                    // Check xem có phải ngày hôm nay có lịch chiếu hay không
                                    theater.lichChieuPhim.some((timeShow) => {
                                      return !moment(date).isSame(moment(timeShow.ngayChieuGioChieu), 'day');
                                    })
                                  ) {
                                    return '';
                                  }
                                  return (
                                    <Fragment key={index}>
                                      <div className="row">
                                        <div className="movie-img col-2-img">
                                          <img src={detailsMovies.hinhAnh} class="img-fluid" width="50px" alt="img" />
                                        </div>
                                        <div className="wrap-infor pl-0 col-10-infor">
                                          <p>
                                            <span className="age">P</span>
                                            {theater.tenCumRap}
                                          </p>
                                          <span>120 phút -FOX 9.4 -IMDb 8.7</span>
                                        </div>
                                      </div>
                                      <h5 className="ttl">2D Digital</h5>
                                      <div className="row">
                                        {theater.lichChieuPhim?.slice(0, 8).map((time, index) => {
                                          if (
                                            moment() <= moment(time.ngayChieuGioChieu) &&
                                            moment(date).isSame(moment(time.ngayChieuGioChieu), 'day')
                                          ) {
                                            return (
                                              <div className="block-time" key={index}>
                                                <NavLink to={`/checkout/${time.maLichChieu}`} className="time-movie">
                                                  <p>
                                                    <span>{moment(time.ngayChieuGioChieu).format('hh:mm A')}</span>
                                                  </p>
                                                </NavLink>
                                              </div>
                                            );
                                          } else {
                                            return '';
                                          }
                                        })}
                                      </div>
                                    </Fragment>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tab-pane fade infomation" id="infomation" role="tabpanel" aria-labelledby="infomation-tab">
              <div className="row">
                <div className="col-md-6 movie-left">
                  <div className="inforleft">
                    <p className="title">Ngày công chiếu</p>
                    <p className="txt">{moment(detailsMovies.ngayKhoiChieu).format('DD/MM/YYYY')}</p>
                  </div>
                  <div className="inforleft">
                    <p className="title">Đạo diễn</p>
                    <p className="txt">Alexs Stadermann</p>
                  </div>
                  <div className="inforleft">
                    <p className="title">Diễn viên</p>
                    <p className="txt">Benedict Cumberbatch</p>
                  </div>
                  <div className="inforleft">
                    <p className="title">Thể Loại</p>
                    <p className="txt">Hành Động, Phiêu Lưu</p>
                  </div>
                  <div className="inforleft">
                    <p className="title">Định dạng</p>
                    <p className="txt">2D/Digital</p>
                  </div>
                  <div className="inforleft">
                    <p className="title">Thời lượng</p>
                    <p className="txt">120 phút</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <h4 className="ttl-4">Nội dung</h4>
                  <p className="description">{detailsMovies.moTa}</p>
                </div>
              </div>
            </div>
            {/* review */}
            <div className="tab-pane fade review" id="review" role="tabpanel" aria-labelledby="review">
              <div className="myreview" data-toggle="modal" data-target="#reviewModal">
                <div className="row">
                  <div className="col-1">
                    <i className="fa fa-user user"></i>
                  </div>
                  <div className="col-md-8">
                    <span className="txt-think">Bạn nghĩ gì về phim này?</span>
                  </div>
                  <div className="col-md-3 comment">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                  </div>
                </div>
              </div>
              {renderComment()}
              <div className="modal fade reviewmodal" id="reviewModal">
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">
                        <div className="box-root">4.0</div>
                        <div className="muirating-root">
                          <div className="comment">
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                          </div>
                        </div>
                      </h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <textarea
                        value={comment}
                        placeholder="Nói cho mọi người biết bạn nghĩ gì về phim này..."
                        className="w-100"
                        style={{ height: '100px' }}
                        onChange={handleChangeComment}
                      />
                    </div>
                    <div className="modal-footer">
                      <label className="upload">
                        <input type="file" className="file" />
                        <img src="../images/buttonmedia.png" alt="" />
                        Ảnh/Video
                      </label>
                      <button
                        className="btn btn-submit"
                        type="button"
                        data-dismiss="modal"
                        onClick={handleSubmitRating}
                      >
                        Đăng
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
