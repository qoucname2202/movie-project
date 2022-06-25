import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { detailsMoviesAction } from '../../redux/actions/ListMovieAction';
import LightLity from 'lity';
import { Fragment } from 'react';
import moment from 'moment';
import { NavLink, useParams } from 'react-router-dom';
import DateOfYear from '../../components/DateOfYear';
import Comment from '../../components/Comment';
import { Link } from 'react-scroll';
import MomentTZ from 'moment-timezone';
import { history } from '../../App';
import { addNewComment, getComment, getMovie, addMovie } from '../../utils/db';
import { Progress, Rate } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../utils/db';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

export default function Details(props) {
  // const API_KEY = 'k_0a2a2lmq';
  // const API_KEY = 'k_lsttjwzi';
  // const API_KEY = 'k_geqj8l6b';
  const API_KEY = 'k_0t05o5eh';
  const { detailsMovies } = useSelector((state) => state.ListMovieReducer);
  const [date, setDate] = useState(Date.now());
  const [detailFilm, setDetailFilm] = useState({});
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');
  const [listComment, setListComment] = useState([]);
  const { t, i18n } = useTranslation();
  const i18Local = i18n.language;
  const { id } = useParams();
  // star
  const [rating, setRating] = useState(5);

  const getDetailFilm = async () => {
    try {
      let data = await axios.get(`https://imdb-api.com/en/API/SearchMovie/${API_KEY}/${detailsMovies.tenPhim}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  //! Convert time get data from IMDB-API
  // function timeConvert(minute) {
  //   var num = parseInt(minute);
  //   var hours = num / 60;
  //   var rhours = Math.floor(hours);
  //   var minutes = (hours - rhours) * 60;
  //   var rminutes = Math.round(minutes);
  //   return `${rhours} giờ ${rminutes} phút`;
  // }

  const handleChange = (value) => {
    setRating(value);
  };
  useEffect(() => {
    if (i18Local === '') {
      i18n.changeLanguage('en');
    } else {
      i18n.changeLanguage(i18Local);
    }
    let document = doc(db, 'comment', id);
    onSnapshot(document, (snapshot) => {
      if (snapshot.exists) {
        setListComment(snapshot.data() ? snapshot.data().comment : []);
      }
    });
    dispatch(detailsMoviesAction(id));
  }, []);

  useEffect(() => {
    (async () => {
      let movie = await getMovie(id);
      if (movie) {
        setDetailFilm(movie);
      } else {
        getDetailFilm()
          .then((res) => {
            const listMovie = res.data.results;
            console.log(listMovie);
            const idFilm = listMovie[0].id;
            (async () => {
              try {
                let response = await axios.get(`https://imdb-api.com/en/API/Title/${API_KEY}/${idFilm}`);
                const listFilm = response.data;
                const { directors, genres, releaseDate, runtimeMins, stars, companies, imDbRating } = listFilm;
                const data = {
                  actor: stars,
                  directors: directors,
                  genres: genres,
                  releaseDate: releaseDate,
                  runtimeMins: runtimeMins,
                  companies: companies,
                  imDbRating: imDbRating,
                };
                setDetailFilm(data);
                await addMovie(id, data);
              } catch (error) {
                console.log(error);
              }
            })();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })();
  }, [id]);

  const handelLogin = () => {
    history.replace('/login?redirectTo=/details/' + id);
  };
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

  // Handel Date change
  const handelDateChange = (day) => {
    setDate(day);
  };

  //Comment
  const handleChangeComment = (event) => {
    setComment(event.target.value);
  };

  // Handel Submit Rating
  const handleSubmitRating = () => {
    if (comment.length > 0) {
      let idComment = uuidv4();
      addNewComment(id, JSON.parse(localStorage.getItem('taiKhoan')).taiKhoan, comment, rating, idComment);
      setComment('');
    }
  };

  const renderComment = () => {
    return (
      listComment.length > 0 &&
      listComment
        .sort((a, b) => (a.timestamp > b.timestamp ? -1 : 1))
        .map((item, index) => {
          return <Comment cmt={item} key={index} idMovie={id} />;
        })
    );
  };

  const renderTotalRating = () => {
    let totalRating = 0;
    [...listComment].map((item) => {
      return (totalRating += item.rating);
    });
    return listComment.length > 0 ? (totalRating / listComment.length).toFixed(1) : '4.0';
  };

  let setting = {
    activeClass: 'active',
    spy: true,
    smooth: true,
    offset: -90,
    duration: 400,
  };
  const caculatorPercent = () => {
    return (+renderTotalRating() * 100) / 5;
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
                <p className="time-ttl">
                  {detailFilm.runtimeMins} {t('minutes')} - {detailFilm.imDbRating} IMDB
                </p>
                <Link {...setting} to="schedule" className="btn btn-buy">
                  {t('buyticket')}
                </Link>
              </div>
              <div className="col-md-2 circle-custom my-auto">
                <div className="percent">
                  <Progress
                    type="dashboard"
                    percent={caculatorPercent()}
                    gapDegree={30}
                    status="normal"
                    width="100%"
                    strokeColor={'orange'}
                  ></Progress>
                  <div className="number">
                    <h2>{renderTotalRating()}</h2>
                  </div>
                </div>
                <div className="icon-start">
                  <Rate onChange={handleChange} value={renderTotalRating()} allowHalf={true} />
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
                {t('showtimes')}
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
                {t('detail')}
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
                {t('rating')}
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
                                    theater.lichChieuPhim.every((timeShow) => {
                                      return !moment(date).isSame(moment(timeShow.ngayChieuGioChieu), 'day');
                                    })
                                  ) {
                                    return '';
                                  }
                                  return (
                                    <Fragment key={index}>
                                      <div className="row">
                                        <div className="movie-img col-2-img">
                                          <img
                                            src={detailsMovies.hinhAnh}
                                            className="img-fluid"
                                            width="50px"
                                            alt="img"
                                          />
                                        </div>
                                        <div className="wrap-infor pl-0 col-10-infor">
                                          <p>
                                            <span className="age">P</span>
                                            {theater.tenCumRap}
                                          </p>
                                          <span>120 {t('minutes')} -FOX 9.4 -IMDb 8.7</span>
                                        </div>
                                      </div>
                                      <h5 className="ttl">2D Digital</h5>
                                      <div className="row">
                                        {theater.lichChieuPhim
                                          ?.sort((current, next) =>
                                            moment(next.ngayChieuGioChieu).isBefore(moment(current.ngayChieuGioChieu))
                                              ? 1
                                              : -1,
                                          )
                                          .map((time, index) => {
                                            if (
                                              moment().isBefore(moment(time.ngayChieuGioChieu)) &&
                                              moment(date).isSame(moment(time.ngayChieuGioChieu), 'day')
                                            ) {
                                              return (
                                                <div className="block-time" key={index}>
                                                  <NavLink to={`/checkout/${time.maLichChieu}`} className="time-movie">
                                                    <p>
                                                      <span>{moment(time.ngayChieuGioChieu).format('hh:mm A')}</span> ~{' '}
                                                      {moment(time.ngayChieuGioChieu)
                                                        .add(time.thoiLuong, 'minutes')
                                                        .format('hh:mm A')}
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
                <div className="col-md-5 movie-left">
                  <div className="inforleft">
                    <p className="title">{t('release')}:</p>
                    <p className="txt">{moment(detailFilm.releaseDate).format('DD/MM/YYYY')}</p>
                  </div>
                  <div className="inforleft">
                    <p className="title">{t('director')}:</p>
                    <p className="txt">{detailFilm.directors}</p>
                  </div>
                  <div className="inforleft">
                    <p className="title">{t('cast')}:</p>
                    <p className="txt">{detailFilm.actor}</p>
                  </div>
                  <div className="inforleft">
                    <p className="title">{t('genre')}:</p>
                    <p className="txt">{detailFilm.genres}</p>
                  </div>
                  <div className="inforleft">
                    <p className="title">{t('product')}:</p>
                    <p className="txt">{detailFilm.companies}</p>
                  </div>
                  <div className="inforleft">
                    <p className="title">{t('runtime')}:</p>
                    <p className="txt">
                      {detailFilm.runtimeMins} {t('minutes')}
                    </p>
                  </div>
                </div>
                <div className="col-md-7 movie-right">
                  <h4 className="titleDesc">{t('descript')}</h4>
                  <p className="description" style={{ textAlign: 'justify' }}>
                    {detailsMovies.moTa}
                  </p>
                </div>
              </div>
            </div>
            {/* review */}
            <div className="tab-pane fade review" id="review" role="tabpanel" aria-labelledby="review">
              {localStorage.getItem('taiKhoan') ? (
                <div className="myreview" data-toggle="modal" data-target="#reviewModal">
                  <div className="row">
                    <div className="col-1">
                      <i className="fa fa-user user"></i>
                    </div>
                    <div className="col-md-8">
                      <span className="txt-think">{t('think')}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="btn btn-success text-center btn-block" onClick={handelLogin}>
                  {t('pleaseLogin')}
                </div>
              )}
              {listComment && renderComment()}
              <div className="modal fade reviewmodal" id="reviewModal">
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">
                        <div className="box-root">{`${rating}.0`}</div>
                        <div className="muirating-root">
                          <div className="comment">
                            <span>
                              <Rate tooltips={desc} onChange={handleChange} value={rating} />
                            </span>
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
                        placeholder={t('placeholder')}
                        className="w-100"
                        style={{ height: '100px' }}
                        onChange={handleChangeComment}
                      />
                    </div>
                    <div className="modal-footer">
                      <button
                        className="btn btn-submit btn-block"
                        type="button"
                        data-dismiss="modal"
                        onClick={handleSubmitRating}
                      >
                        {t('post')}
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
