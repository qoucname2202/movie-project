import React from 'react';
import axios from 'axios';
import {
  domain,
  LIST_MOVIE_NOW_SHOW,
  maNhom,
  LIST_MOVIE_COMING_SOON,
  OPENlOADING,
  CLOSELOADING,
  DETAIL_MOVIES,
  BOOK_TICKET,
} from '../../configs/settings';
import { history } from '../../App';
export const listMovieShowAction = () => {
  return async (dispatch) => {
    dispatch({
      type: OPENlOADING,
    });
    setTimeout(async () => {
      try {
        const result = await axios({
          url: `${domain}/api/QuanLyPhim/LayDanhSachPhim?maNhom=${maNhom}`,
          method: 'GET',
        });
        console.log(result);
        dispatch({
          type: LIST_MOVIE_NOW_SHOW,
          listMovieShow: result.data,
        });
      } catch (errors) {
        console.log(errors);
      }
      dispatch({
        type: CLOSELOADING,
      });
    }, 700);
  };
};
export const listMovieComingSoonAction = () => {
  return async (dispatch) => {
    try {
      const result = await axios({
        url: `${domain}/api/QuanLyPhim/LayDanhSachPhim?maNhom=${maNhom}`,
        method: 'GET',
      });
      dispatch({
        type: LIST_MOVIE_COMING_SOON,
        listMovieComingSoon: result.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const deleteMovieAction = (maPhim, token) => {
  return async (dispatch) => {
    try {
      let result = await axios({
        url: `${domain}/api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`,
        method: 'DELETE',
        data: maPhim,
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      if (result.status === 200) {
        alert('Xóa phim thành công');
        window.location.reload();
      }
    } catch (errors) {
      alert(errors.response?.data);
    }
  };
};

/**Add Movie */
export const addMovieAction = (film) => {
  return async (dispatch) => {
    dispatch({
      type: OPENlOADING,
    });
    setTimeout(async () => {
      let result = await axios({
        url: `${domain}/api/quanlyphim/ThemPhimUploadHinh`,
        method: 'POST',
        data: film,
      }).catch((errors) => {
        console.log(errors.response.data);
      });
      if (result.status === 200) {
        alert('Thêm phim thành công');
      }
      dispatch({
        type: CLOSELOADING,
      });
    }, 700);
  };
};

export const detailsMoviesAction = (maPhim) => {
  return async (dispatch) => {
    dispatch({
      type: OPENlOADING,
    });
    setTimeout(async () => {
      try {
        const result = await axios({
          url: `${domain}/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`,
          method: 'GET',
        });
        dispatch({
          type: DETAIL_MOVIES,
          detailsMovies: result.data,
        });
      } catch (error) {
        console.log(error);
      }
      dispatch({
        type: CLOSELOADING,
      });
    }, 700);
  };
};
export const bookTicketAction = (maLichChieu) => {
  if (!localStorage.getItem('taiKhoan') && !localStorage.getItem('accessToken')) {
    history.replace('/login');
  }
  return async (dispatch) => {
    dispatch({
      type: OPENlOADING,
    });
    setTimeout(async () => {
      try {
        const result = await axios({
          url: `${domain}/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`,
          method: 'GET',
        });
        dispatch({
          type: BOOK_TICKET,
          bookTicket: result.data,
        });
      } catch (error) {
        console.log(error);
      }
      dispatch({
        type: CLOSELOADING,
      });
    }, 700);
  };
};
