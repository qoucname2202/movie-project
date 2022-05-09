import { LOGIN, taiKhoan, accessToken, REGISTER } from '../../configs/settings';

let taiKhoanNguoiDung = '';
let tokenlocal = '';

// Kiểm tra tài khoản có trong localStorage hay không ?
if (localStorage.getItem(taiKhoan)) {
  let userNameStorage = localStorage.getItem('taiKhoan');
  taiKhoanNguoiDung = JSON.parse(userNameStorage).taiKhoan;
  tokenlocal = JSON.parse(taiKhoanNguoiDung).accessToken;
}

// State
const stateDefault = {
  taiKhoan: taiKhoanNguoiDung,
  accessToken: tokenlocal,
  thongTinUser: {},
  thongTinUserAll: [],
  listUser: null,
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
    default: {
      return state;
    }
  }
};
export default UserReducer;
