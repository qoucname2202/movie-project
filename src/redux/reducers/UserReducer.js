import {
  LOGIN,
  taiKhoan,
  accessToken,
  REGISTER,
  LOGOUT,
  PROFILE_USER,
  EDIT_USER,
  INFOR_ALL_USER,
  DELETE_USER,
} from '../../configs/settings';

let taiKhoanNguoiDung = '';
let tokenlocal = '';

// Kiểm tra tài khoản có trong localStorage hay không ?
if (localStorage.getItem(taiKhoan)) {
  let userNameStorage = localStorage.getItem('taiKhoan');
  taiKhoanNguoiDung = JSON.parse(userNameStorage).taiKhoan;
  tokenlocal = JSON.parse(userNameStorage).accessToken;
}

// State
const stateDefault = {
  taiKhoan: taiKhoanNguoiDung,
  accessToken: tokenlocal,
  thongTinUser: {},
  thongTinUserAll: [],
  listUser: [],
};

const UserReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case LOGIN: {
      state.taiKhoan = action.taiKhoan;
      return { ...state };
    }
    case REGISTER: {
      state.taiKhoan = action.taiKhoan;
      return { ...state };
    }
    case LOGOUT: {
      localStorage.clear();
      return { ...state, taiKhoan: '' };
    }
    case PROFILE_USER: {
      state.thongTinUser = { ...action.thongTinUser };
      return { ...state };
    }
    case EDIT_USER: {
      state.taiKhoan = action.taiKhoan;
      return { ...state };
    }
    case INFOR_ALL_USER: {
      state.thongTinUserAll = [...action.thongTinUserAll];
      return { ...state };
    }
    case DELETE_USER: {
      let index = state.thongTinUserAll.findIndex((user) => user.taiKhoan === action.item.taiKhoan);
      console.log(index);
      if (index !== -1) {
        state.thongTinUserAll.splice(index, 1);
      } else {
        state.thongTinUserAll.push(action.item);
      }
      state.thongTinUserAll = [...state.thongTinUserAll];
      return { ...state };
    }
    default: {
      return state;
    }
  }
};
export default UserReducer;
