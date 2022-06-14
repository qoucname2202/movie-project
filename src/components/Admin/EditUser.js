import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { editUserAction } from '../../redux/actions/UserAction';
// import { maNhom } from '../../configs/settings';

export default function EditUser(props) {
  const { taiKhoan } = props;
  const { thongTinUserAll } = useSelector((state) => state.UserReducer);
  const [user, setUser] = useState({});
  // const [dsUser, setDSUser] = useState(null);
  const dispatch = useDispatch();
  // const { accessToken } = useSelector((state) => state.UserReducer);
  useEffect(() => {
    if (thongTinUserAll.length > 0 && taiKhoan !== '') {
      let index = thongTinUserAll.findIndex((item) => item.taiKhoan === taiKhoan);
      if (index !== -1) {
        formik.setValues(thongTinUserAll[index]);
        setUser(thongTinUserAll[index]);
      }
    }
  }, [taiKhoan]);
  const formik = useFormik({
    validationSchema: yup.object().shape({
      taiKhoan: yup.string().required('Tài khoản không được bỏ trống!'),
      matKhau: yup.string().required('Mật khẩu không được bỏ trống!').min(6, 'Tài khoản tối thiểu phải 6 ký tự'),
      email: yup
        .string()
        .required('Email không được bỏ trống!')
        .matches(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          'Email không hợp lệ',
        ),
      hoTen: yup
        .string()
        .required('Họ tên không được bỏ trống!')
        .matches(
          /^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +"ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +"ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$/,
          'Họ tên phải nhập chữ',
        ),
      soDt: yup
        .string()
        .required('Số điện thoại không được bỏ trống!')
        .matches(/^[0-9]+$/, 'Số điện thoại bắt buộc phải là số '),
      maLoaiNguoiDung: yup.string().required('Mã loại người dùng không được bỏ trống!'),
    }),
    onSubmit: (value) => {
      console.log(value);
      dispatch(editUserAction(value));
    },
  });

  return (
    <div className="block">
      <div className="modal fade" id="edituser" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Sửa người dùng
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form className="form-add-user" onSubmit={formik.handleSubmit}>
                <div className="row form-group">
                  <label htmlFor="" className="col-md-2">
                    Tài Khoản
                  </label>
                  <div className="col-md-10">
                    <input
                      type="text"
                      name="taiKhoan"
                      className="form-control"
                      placeholder="Nhập tài khoản"
                      {...formik.getFieldProps('taiKhoan')}
                    />
                    {formik.errors.taiKhoan && formik.touched.taiKhoan ? (
                      <p className="text-danger">{formik.errors.taiKhoan}</p>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
                <div className="row form-group">
                  <label htmlFor="" className="col-md-2">
                    Mật Khẩu
                  </label>
                  <div className="col-md-10">
                    <input
                      type="password"
                      name="matKhau"
                      className="form-control"
                      placeholder="Nhập mật khẩu"
                      {...formik.getFieldProps('matKhau')}
                    />
                    {formik.errors.matKhau && formik.touched.matKhau ? (
                      <p className="text-danger">{formik.errors.matKhau}</p>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
                <div className="row form-group">
                  <label htmlFor="" className="col-md-2">
                    Email
                  </label>
                  <div className="col-md-10">
                    <input
                      type="text"
                      name="email"
                      className="form-control"
                      placeholder="Nhập email"
                      {...formik.getFieldProps('email')}
                    />
                    {formik.errors.email && formik.touched.email ? (
                      <p className="text-danger">{formik.errors.email}</p>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
                <div className="row form-group">
                  <label htmlFor="" className="col-md-2">
                    Họ tên
                  </label>
                  <div className="col-md-10">
                    <input
                      type="text"
                      name="hoTen"
                      className="form-control"
                      placeholder="Nhập họ tên"
                      {...formik.getFieldProps('hoTen')}
                    />
                    {formik.errors.hoTen && formik.touched.hoTen ? (
                      <p className="text-danger">{formik.errors.hoTen}</p>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
                <div className="row form-group">
                  <label htmlFor="" className="col-md-2">
                    Số điện thoại
                  </label>
                  <div className="col-md-10">
                    <input
                      type="text"
                      name="soDt"
                      className="form-control"
                      placeholder="Nhập số điện thoại"
                      {...formik.getFieldProps('soDt')}
                    />
                    {formik.errors.soDt && formik.touched.soDt ? (
                      <p className="text-danger">{formik.errors.soDt}</p>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
                <div className="row form-group">
                  <label htmlFor="" className="col-md-2">
                    Mã loại người dùng
                  </label>
                  <div className="col-md-10">
                    <select
                      name="maLoaiNguoiDung"
                      className="form-control"
                      {...formik.getFieldProps('maLoaiNguoiDung')}
                    >
                      <option value="ChonLoaiNguoiDung">Chọn loại người dùng</option>
                      <option value="QuanTri">Quản Trị</option>
                      <option value="KhachHang">Khách Hàng</option>
                    </select>
                    {formik.errors.maLoaiNguoiDung && formik.errors.maLoaiNguoiDung ? (
                      <p className="text-danger">{formik.errors.maLoaiNguoiDung}</p>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
                <button className="btn btn-submit" type="submit">
                  Cập nhật Người Dùng
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
