import { BOOKTICKET_MOVIE } from '../../configs/settings';

const stateDefault = {
  danhSachGheDangDat: [],
  maLichChieuDangDat: '',
};

const MannageBookTicketReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case BOOKTICKET_MOVIE: {
      let { taiKhoan, seat, socket, maLichChieu } = action;
      //Kiểm tra ghế có trong mảng danhSachGheDangDat => có thì xóa, không có thì thêm vào
      let index = state.danhSachGheDangDat.findIndex((gheDD) => gheDD.maGhe === action.seat.maGhe);
      if (index !== -1) {
        state.danhSachGheDangDat.splice(index, 1);
        // Undisable seat
        socket.emit('SEND_BO_CHON_GHE_SELECT', { taiKhoan, seat, maLichChieu });
      } else {
        state.danhSachGheDangDat.push(action.seat);
        // Disable seat
        socket.emit('SEND_CHON_GHE_SELECT', { taiKhoan, seat, maLichChieu });
      }
      //Cập nhật lại state
      state.danhSachGheDangDat = [...state.danhSachGheDangDat];
      return { ...state };
    }
    case 'CAP_NHAT_LICH_CHIEU_DANG_DAT': {
      state.maLichChieuDangDat = action.maLichChieu;
      return { ...state };
    }

    default:
      return { ...state };
  }
};
export default MannageBookTicketReducer;
