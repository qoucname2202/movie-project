import axios from 'axios';
import { domain } from '../../configs/settings';
import { history } from '../../App';
import { bookTicketAction } from './ListMovieAction';
import Swal from 'sweetalert2';

export const bookTicketsAction = (thongTinDatVe) => {
  return async (dispatch) => {
    try {
      const result = await axios({
        url: `${domain}/api/QuanLyDatVe/DatVe`,
        method: 'POST',
        data: thongTinDatVe,
        headers: { Authorization: 'Bearer ' + localStorage.getItem('accessToken') },
      });

      if (result.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Đặt vé thành công',
          showConfirmButton: false,
          timer: 1500,
        });
        //load về trang đầu đặt vé - Load về tại trang
        history.push(`/checkout/${thongTinDatVe.maLichChieu}`);
        //Gọi lại action lấy thông tin phòng vé (đã xây dựng sẵn)
        dispatch(bookTicketAction(thongTinDatVe.maLichChieu));
      }
      console.log('result', result);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Đặt vé không thành công',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
};
