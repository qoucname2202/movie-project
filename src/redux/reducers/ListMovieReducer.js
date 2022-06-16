import React from 'react';
import {
  BOOK_TICKET,
  COMMENT_MOVIE,
  DETAIL_MOVIES,
  LIST_MOVIE_COMING_SOON,
  LIST_MOVIE_NOW_SHOW,
} from '../../configs/settings';
const stateDefault = {
  listMovieShow: [],
  listMovieComingSoon: [],
  detailsMovies: {},
  bookTicket: {},
  rating: 0,
  listComment: [],
};

const ListMovieReducer = (state = stateDefault, actions) => {
  switch (actions.type) {
    case LIST_MOVIE_NOW_SHOW: {
      actions.listMovieShow.map((item, index) => {
        return {
          ...item,
          key: index,
        };
      });
      state.listMovieShow = [...actions.listMovieShow];
      return { ...state };
    }

    // case 'EDIT_MOVIE': {
    //   const index = state.listMovieShow.findIndex((item) => item.maPhim === actions.movie.maPhim);
    //   let newListMovieShow = [...state.listMovieShow];
    //   if (index !== -1) {
    //     newListMovieShow[index] = { ...actions.movie };
    //   }
    //   state.listMovieShow = [...newListMovieShow];

    //   return { ...state };
    // }

    case LIST_MOVIE_COMING_SOON: {
      state.listMovieComingSoon = [...actions.listMovieComingSoon];
      return { ...state };
    }
    case DETAIL_MOVIES: {
      state.detailsMovies = actions.detailsMovies;
      return { ...state };
    }

    case BOOK_TICKET: {
      state.bookTicket = actions.bookTicket;
      return { ...state };
    }
    case COMMENT_MOVIE: {
      if (localStorage.getItem('userHome')) {
        let info = JSON.parse(localStorage.getItem('userHome'));
        state.listComment = [{ user: info.hoTen, comment: actions.cmt, rating: state.rating }, ...state.listComment];
      }
      return { ...state };
    }
    default: {
      return { ...state };
    }
  }
};

export default ListMovieReducer;
