import {
  LIST_CINEMA_SHOWTIME,
  LIST_LOGO,
  LIST_MOVIE_SHOW_TIME,
  LIST_THEATER_SYSTEM_LOGO,
} from '../../configs/settings';

const stateDefault = {
  listLogoMovie: [],
  listMovie: [],
  listCinema: [],
  listCreateTimeShow: [],
  listTimeShowMovie: {},
};

const ShowTimeMovieReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case LIST_LOGO: {
      state.listLogoMovie = [...action.listLogoMovie];
      return { ...state };
    }
    case LIST_CINEMA_SHOWTIME: {
      state.listCinema = [...action.listCinema];
      return { ...state };
    }
    case LIST_MOVIE_SHOW_TIME: {
      state.listMovie = [...action.listMovie];
      return { ...state };
    }
    case 'LIST_CREATE_TIME_SHOW': {
      state.listCreateTimeShow = [...action.listCreateTimeShow];
      return { ...state };
    }
    case 'LIST_TIME_SHOW_MOVIE': {
      state.listTimeShowMovie = { ...action.listTimeShowMovie };
      return { ...state };
    }
    default: {
      return state;
    }
  }
};
export default ShowTimeMovieReducer;
