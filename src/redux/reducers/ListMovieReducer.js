import React from 'react';
import { LIST_MOVIE_COMING_SOON, LIST_MOVIE_NOW_SHOW } from '../../configs/settings';
import DataComment from '../../pages/Details/dataComment.json';
const stateDefault = {
  listMovieShow: [],
  listMovieComingSoon: [],
  detailMovies: {},
  bookTickets: {},
  rating: 0,
  listComment: DataComment,
};

const ListMovieReducer = (state = stateDefault, actions) => {
  switch (actions.type) {
    case LIST_MOVIE_NOW_SHOW: {
      state.listMovieShow = [...actions.listMovieShow];
      return { ...state };
    }
    case LIST_MOVIE_COMING_SOON: {
      state.listMovieComingSoon = [...actions.listMovieComingSoon];
      return { ...state };
    }
    default: {
      return { ...state };
    }
  }
};

export default ListMovieReducer;
