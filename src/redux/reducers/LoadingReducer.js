import { OPENlOADING, CLOSELOADING } from '../../configs/settings';
const stateDefault = {
  loading: true,
};

const loadingReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case OPENlOADING: {
      state.loading = true;
      return { ...state };
    }
    case CLOSELOADING: {
      state.loading = false;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
export default loadingReducer;
