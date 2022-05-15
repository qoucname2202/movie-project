import qs from 'qs';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { bookTicketsAction } from '../../redux/actions/MannageBookTicketAction';
function Payment() {
  const dispatch = useDispatch();
  const { danhSachGheDangDat, maLichChieuDangDat } = useSelector((state) => state.MannageBookTicketReducer);
  console.log(danhSachGheDangDat, maLichChieuDangDat);
  const search = useLocation().search.substring(1);
  const { vnp_Amount, vnp_PayDate, vnp_OrderInfo, vnp_ResponseCode, vnp_TransactionNo } = qs.parse(search);
  console.log(qs.parse(search));
  useEffect(() => {
    if (vnp_ResponseCode === '00') {
      if (localStorage.getItem('thongTinDatVe')) {
        let thongTinDatVe = JSON.parse(localStorage.getItem('thongTinDatVe'));
        dispatch(bookTicketsAction(thongTinDatVe));
      }
    }
  }, []);

  return <div>Payment</div>;
}

export default Payment;
