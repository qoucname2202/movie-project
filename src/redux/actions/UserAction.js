import axios from 'axios';
import { LOGIN, accessToken, domain, REGISTER } from '../../configs/settings';
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
