import axios from 'axios';
import {
  domain,
  LIST_CINEMA_SHOWTIME,
  LIST_LOGO,
  LIST_MOVIE_SHOW_TIME,
  LIST_THEATER_SYSTEM_LOGO,
} from '../../configs/settings';
import Swal from 'sweetalert2';

export const ListLogoAction = () => {
  return async (dispatch) => {
    try {
      const result = await axios({
        url: `${domain}/api/QuanLyRap/LayThongTinHeThongRap`,
        method: 'GET',
      });
      dispatch({
        type: LIST_LOGO,
        listLogoMovie: result.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const ListCenemaShowAction = (maHeThongRap) => {
  return async (dispatch) => {
    try {
      const result = await axios({
        url: `${domain}/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`,
        method: 'GET',
      });
      dispatch({
        type: LIST_CINEMA_SHOWTIME,
        listCinema: result.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const GetTimeShowMovieAction = (maPhim) => {
  return async (dispatch) => {
    try {
      console.log(maPhim);
      const result = await axios({
        url: `${domain}/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`,
        method: 'GET',
      });
      console.log(result);
      dispatch({
        type: 'LIST_TIME_SHOW_MOVIE',
        listTimeShowMovie: result.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const ListMovieShowTimeAction = () => {
  return async (dispatch) => {
    try {
      const result = await axios({
        url: `${domain}/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP04`,
        method: 'GET',
      });
      dispatch({
        type: LIST_MOVIE_SHOW_TIME,
        listMovie: result.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const CreateMovieShowTimeAction = (movieTime) => {
  return async (dispatch) => {
    try {
      const result = await axios({
        url: `${domain}/api/QuanLyDatVe/TaoLichChieu`,
        method: 'POST',
        data: movieTime,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        },
      });
      console.log(result);
      dispatch({
        type: 'LIST_CREATE_TIME_SHOW',
        listCreateTimeShow: result.data,
      });
      Swal.fire({
        icon: 'success',
        title: 'Thêm lịch chiếu thành công',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Thêm lịch chiếu thất bại',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
};
