import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const MovieItems = (props) => {
  const { movie, showTimes } = props;
  const { t } = useTranslation();
  return (
    <div className={showTimes === 'beforeShow' ? 'movie-item' : 'movieComing'} id="movieitem">
      <a className="video" data-lity href={movie.trailer}>
        <div className="movie-img">
          <img src={movie.hinhAnh} alt={movie.hinhAnh} className="img-fluid" />
          <div className="icon-play">
            <i className="fa fa-play" />
          </div>
          <div className="review">
            {movie.danhGia}
            <span>/10</span>
            <i className="fa fa-star icon-start" />
          </div>
          <div className="dateshow" style={{ display: 'none' }}>
            {movie.ngayKhoiChieu}
          </div>
          <div className="overlay" />
        </div>
      </a>
      <div className="movie-info">
        <p className="namemovie">{movie.tenPhim}</p>
        <span className="timeshow">120 {t('minutes')}</span>
        <NavLink to={`/details/${movie.maPhim}`}>
          <div className="btn-buyticket">
            {t('buyticket')}
            <i className="fa fa-arrow-circle-down icon-down" />
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default MovieItems;
