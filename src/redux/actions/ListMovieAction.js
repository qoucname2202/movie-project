import React from 'react';
import axios from 'axios';
import { domain, LIST_MOVIE_NOW_SHOW, maNhom, LIST_MOVIE_COMING_SOON } from '../../configs/settings';
export const listMovieShowAction = () => {
  return async (dispatch) => {
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
