import axios from 'axios';
import { LOGIN, accessToken, domain } from '../../configs/settings';
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
