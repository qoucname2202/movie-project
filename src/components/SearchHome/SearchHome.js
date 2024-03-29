import axios from 'axios';
import moment from 'moment';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { domain } from '../../configs/settings';
import { history } from '../../App';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
const SearchHome = () => {
  const { listMovieShow } = useSelector((state) => state.ListMovieReducer);
  const [lichChieu, setlichChieu] = useState(null);
  const [timeShowMovie, setTimeShowMovie] = useState([]);
  const [timeMovie, setTimeMovie] = useState([]);
  const [maLichChieu, setMaLichChieu] = useState('');

  const [heThongRap, setHeThongRap] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    let index = !lichChieu ? -1 : lichChieu.findIndex((item) => item.maHeThongRap === heThongRap);
    if (index !== -1) {
      const listCumRap = lichChieu[index].cumRapChieu;

      let dsThoiGianChieu = listCumRap.reduce((current, next, index) => {
        return [
          ...current,
          ...next.lichChieuPhim.map((item) => {
            return {
              maLichChieu: item.maLichChieu,
              ngayChieuGioChieu: item.ngayChieuGioChieu,
            };
          }),
        ];
      }, []);
      let listTime = dsThoiGianChieu
        ?.sort((current, next) => (moment(next.ngayChieuGioChieu).isBefore(moment(current.ngayChieuGioChieu)) ? 1 : -1))
        .reduce((current, next) => {
          let index = current.findIndex(
            (item) =>
              moment(item.ngayChieu).format('YYYY-MM-DD') === moment(next.ngayChieuGioChieu).format('YYYY-MM-DD'),
          );
          if (index === -1) {
            let obj = {
              ngayChieu: next.ngayChieuGioChieu,
              thoiGianChieu: [
                {
                  maLichChieu: next.maLichChieu,
                  ngayChieuGioChieu: next.ngayChieuGioChieu,
                },
              ],
            };
            current.push(obj);
            return [...current];
          } else {
            current[index].thoiGianChieu.push({
              maLichChieu: next.maLichChieu,
              ngayChieuGioChieu: next.ngayChieuGioChieu,
            });
            return [...current];
          }
        }, []);
      listTime = listTime.filter((item, index) => {
        if (moment() >= moment(item.ngayChieu)) {
          return false;
        } else {
          return true;
        }
      });
      setTimeShowMovie(listTime);
      if (listTime.length > 0) {
        console.log(listTime);
        let timeShowMovies = listTime.filter((item) => moment(item.ngayChieu).isAfter(moment()));
        setTimeMovie(timeShowMovies[0].thoiGianChieu);
        setMaLichChieu(timeShowMovies[0].thoiGianChieu[0].maLichChieu);
      }
    }
  }, [heThongRap, lichChieu]);

  const handleChangePhim = async (e) => {
    let maPhim = e.target.value;
    try {
      const result = await axios({
        url: `${domain}/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`,
        method: 'GET',
      });
      setlichChieu(result.data.heThongRapChieu);
      setHeThongRap(result.data.heThongRapChieu[0].maHeThongRap);
    } catch (error) {
      console.log(error);
    }
  };
  // let mergedMovieList;
  const handelChangeMaHeThongRap = (e) => {
    setHeThongRap(e.target.value);
  };
  const handeChangeNgayChieu = (e) => {
    const ngayChieu = e.target.value;
    const listTime = timeShowMovie.filter(
      (item) => moment(item.ngayChieu).format('YYYY-MM-DD') === moment(ngayChieu).format('YYYY-MM-DD'),
    );
    setTimeMovie(listTime[0].thoiGianChieu);
    setMaLichChieu(listTime[0].thoiGianChieu[0].maLichChieu);
  };
  const handelChangeChonGio = (e) => {
    const maLichChieu = e.target.value;
    setMaLichChieu(maLichChieu);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    history.replace('/checkout/' + maLichChieu);
  };
  return (
    <section className="search-home">
      <div className="container">
        <form className="form-search" onSubmit={handleSubmit}>
          <div className="select-item movieItem">
            <select name="movie-select" onChange={handleChangePhim}>
              {listMovieShow?.map((item) => (
                <option key={item.maPhim} value={item.maPhim}>
                  {item.tenPhim}
                </option>
              ))}
            </select>
          </div>
          <div className="select-item">
            <select name="cinema-select" onChange={handelChangeMaHeThongRap}>
              {lichChieu?.map((item) => (
                <option key={item.maHeThongRap} value={item.maHeThongRap}>
                  {item.tenHeThongRap}
                </option>
              ))}
            </select>
          </div>
          <div className="select-item">
            {timeShowMovie && timeShowMovie.length > 0 && (
              <select name="date-select" defaultValue={timeShowMovie[0].ngayChieu} onChange={handeChangeNgayChieu}>
                {timeShowMovie.map((item, index) => {
                  return (
                    <option key={item.ngayChieu} value={item.ngayChieu}>
                      {moment(item.ngayChieu).format('DD/MM/YYYY')}
                    </option>
                  );
                })}
              </select>
            )}
          </div>
          <div className="select-item">
            {timeMovie && timeMovie.length > 0 && (
              <select name="date-select" defaultValue={timeMovie[0].maLichChieu} onChange={handelChangeChonGio}>
                {timeMovie.map((item, index) => {
                  return (
                    <option key={item.ngayChieuGioChieu} value={item.maLichChieu}>
                      {moment(item.ngayChieuGioChieu).format('HH:mm')}
                    </option>
                  );
                })}
              </select>
            )}
          </div>
          <div className="select-item item-booking">
            <button type="submit" className="btn-booking">
              {t('buyticketnow')}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SearchHome;
