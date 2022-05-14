import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { domain } from '../../configs/settings';
const SearchHome = () => {
  const { listMovieShow } = useSelector((state) => state.ListMovieReducer);
  const [lichChieu, setlichChieu] = useState(null);
  const [timeShowMovie, setTimeShowMovie] = useState(null);

  const handleChangePhim = async (e) => {
    let maPhim = e.target.value;
    try {
      const result = await axios({
        url: `${domain}/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`,
        method: 'GET',
      });
      setlichChieu(result.data.heThongRapChieu);
    } catch (error) {
      console.log(error);
    }
  };
  let dsLichChieu = [];
  let mergedMovieList;
  const handelChangeMaHeThongRap = (e) => {
    const maHeThongRap = e.target.value;
    let index = lichChieu.findIndex((item) => item.maHeThongRap === maHeThongRap);
    const listCumRap = lichChieu[index].cumRapChieu;
    for (let i = 0; i < listCumRap.length; i++) {
      const element = listCumRap[i];

      // console.log(element.lichChieuPhim);
      dsLichChieu.push(element.lichChieuPhim);
      mergedMovieList = [].concat.apply([], dsLichChieu);
    }
    console.log(mergedMovieList);
  };
  return (
    <section className="search-home">
      <div className="container">
        <form className="form-search">
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
            <select name="date-select">
              <option value>Ngày chiếu</option>
            </select>
          </div>
          <div className="select-item">
            <select name="time-select">
              <option value>Giờ chiếu</option>
            </select>
          </div>
          <div className="select-item item-booking">
            <button type="submit" className="btn-booking">
              Mua Vé Ngay
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SearchHome;
