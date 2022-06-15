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
  INFOR_ALL_USER,
  maNhom,
} from '../../configs/settings';
import { history } from '../../App';
import Swal from 'sweetalert2';
export const UserAction = (nguoiDung, redirectTo) => {
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
      if (redirectTo) {
        history.replace(redirectTo);
      } else {
        history.replace('/home');
      }

      // Dispatch action
      dispatch({
        type: LOGIN,
        taiKhoan: result.data.taiKhoan,
      });
    } catch (errors) {
      console.log(errors);
      Swal.fire({
        icon: 'error',
        title: 'Tài khoản hoặc mật khẩu không đúng',
        showConfirmButton: false,
        timer: 500,
      });
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
        Swal.fire({
          icon: 'success',
          title: 'Đăng ký tài khoản thành công',
          showConfirmButton: false,
          timer: 1500,
        });
      }
      // If login success redirect Honme
      setTimeout(() => {
        history.replace('/login');
      }, 2000);
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
        headers: { Authorization: 'Bearer ' + localStorage.getItem(accessToken) },
      });
      console.log(result);
      dispatch({
        type: EDIT_USER,
        taiKhoan: result.data.taiKhoan,
      });
    } catch (errors) {
      console.log(errors);
    }
  };
};
/**Get all infor user */
export const inforUserAllAction = () => {
  return async (dispatch) => {
    try {
      let result = await axios({
        url: `${domain}/api/QuanLyNguoiDung/LayDanhSachNguoiDung`,
        method: 'GET',
      });
      dispatch({
        type: INFOR_ALL_USER,
        thongTinUserAll: result.data,
      });
    } catch (errors) {
      console.log(errors);
    }
  };
};
/**Add user */
export const addUserAction = (value, token) => {
  return async () => {
    try {
      const result = await axios({
        url: `${domain}/api/QuanLyNguoiDung/ThemNguoiDung`,
        method: 'POST',
        data: value,
        headers: { Authorization: 'Bearer ' + token },
      });
      window.location.reload();
      if (result.status === 200) {
        alert('Tạo Tài Khoản Thành Công');
      }
    } catch (err) {
      alert(err.response?.data);
    }
  };
};

/**Delete user */
export const deleteUserAction = (taiKhoan, token) => {
  return async () => {
    try {
      const result = await axios({
        url: `${domain}/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`,
        method: 'DELETE',
        data: taiKhoan,
        headers: {
          Authorization: 'Bearer  ' + token,
        },
      });

      if (result.status === 200) {
        alert('Xóa thành công');
        window.location.reload();
      }
    } catch (err) {
      alert(err.response?.data);
    }
  };
};
