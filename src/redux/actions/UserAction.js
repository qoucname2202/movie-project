import axios from 'axios';
import {
  LOGIN,
  accessToken,
  domain,
  REGISTER,
  OPENlOADING,
  CLOSELOADING,
  PROFILE_USER,
  EDIT_USER,
} from '../../configs/settings';
import { history } from '../../App';
export const UserAction = (nguoiDung) => {
  return async (dispatch) => {
    try {
      const result = await axios({
        url: `${domain}/api/QuanLyNguoiDung/DangNhap`,
        method: 'POST',
        data: nguoiDung,
      });
      console.log(result.data);
      // Save localStoreage
      localStorage.setItem('accessToken', result.data.accessToken);
      localStorage.setItem('taiKhoan', JSON.stringify(result.data));
      // If login success redirect Honme
      history.replace('/home');
      // Dispatch action
      dispatch({
        type: LOGIN,
        taiKhoan: result.data.taiKhoan,
      });
    } catch (errors) {
      console.log(errors);
    }
  };
};

export const RegisterAction = (user) => {
  return async (dispatch) => {
    try {
      const result = await axios({
        url: `${domain}/api/QuanLyNguoiDung/DangKy`,
        method: 'POST',
        data: user,
      });
      if (result.status === 200) {
        alert('Đăng ký thành công');
      }
      // If login success redirect Honme
      history.replace('/login');
      // Dispatch action
      dispatch({
        type: REGISTER,
        taiKhoan: result.data.taiKhoan,
      });
    } catch (errors) {
      console.log(errors);
    }
  };
};

export const profileUserAction = (user) => {
  return async (dispatch) => {
    dispatch({
      type: OPENlOADING,
    });
    setTimeout(async () => {
      try {
        let result = await axios({
          url: `${domain}/api/QuanLyNguoiDung/ThongTinTaiKhoan`,
          method: 'POST',
          data: user,
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem(accessToken),
          },
        });

        dispatch({
          type: PROFILE_USER,
          thongTinUser: result.data,
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

export const editUserAction = (user) => {
  return async (dispatch) => {
    try {
      let result = await axios({
        url: `${domain}/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
        method: 'PUT',
        data: user,
      });
      dispatch({
        type: EDIT_USER,
        taiKhoan: result.data.taiKhoan,
      });
    } catch (errors) {
      console.log(errors);
    }
  };
};
