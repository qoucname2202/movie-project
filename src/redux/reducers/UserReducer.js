import { LOGIN } from '../../configs/settings';
let taiKhoanNguoiDung = '';
let tokenlocal = '';

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
    default: {
      return state;
    }
  }
};
export default UserReducer;
