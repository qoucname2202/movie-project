import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { RegisterAction } from '../../redux/actions/UserAction';
const Register = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      taiKhoan: '',
      matKhau: '',
      hoTen: '',
      soDt: '',
      email: '',
    },
    validationSchema: yup.object().shape({
      taiKhoan: yup.string().required('Tài khoản không được bỏ trống!'),
      matKhau: yup.string().required('Mật khẩu không được bỏ trống!').min(6, 'Tài khoản tối thiểu phải 6 ký tự'),
      hoTen: yup
        .string()
        .required('Họ tên không được bỏ trống!')
        .matches(/^[aA-zZ\s]+$/, 'Họ và tên không được nhập ký tự đặc biệt'),
      soDt: yup
        .string()
        .required('Số điện thoại không được bỏ trống!')
        .min(10, 'Số điện thoại tối thiểu phải 10 số')
        .max(10, 'Số điện thoại tối đa phải 10 số'),
      email: yup.string().required('Email không được bỏ trống!').email('Email không đúng định dạng'),
    }),
    onSubmit: (values) => {
      values.maNhom = 'GP01';
      values.maLoaiNguoiDung = 'KhachHang';
      dispatch(RegisterAction(values));
    },
  });
  return (
    <div className="inner-bg-user">
      <nav className="navbar navbar-light">
        <a className="navbar-brand" href="#!">
          <img src="../images/logo_1.png" alt="logo" />
        </a>
      </nav>
      <form className="form-user" onSubmit={formik.handleSubmit}>
        <h1 className="ttl">Sign up</h1>
        <div className="form-group mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            name="taiKhoan"
            autoComplete="off"
            {...formik.getFieldProps('taiKhoan')}
          />
          {formik.errors.taiKhoan && formik.touched.taiKhoan ? (
            <p className="text-danger">{formik.errors.taiKhoan}</p>
          ) : (
            ''
          )}
        </div>
        <div className="form-group mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="matKhau"
            autoComplete="off"
            {...formik.getFieldProps('matKhau')}
          />
          {formik.errors.matKhau && formik.touched.matKhau ? (
            <p className="text-danger">{formik.errors.matKhau}</p>
          ) : (
            ''
          )}
        </div>
        <div className="form-group mb-3">
          <label className="form-label">Fullname</label>
          <input
            type="text"
            className="form-control"
            name="hoTen"
            autoComplete="off"
            {...formik.getFieldProps('hoTen')}
          />
          {formik.errors.hoTen && formik.touched.hoTen ? <p className="text-danger">{formik.errors.hoTen}</p> : ''}
        </div>
        <div className="form-group mb-3">
          <label className="form-label">Phone number</label>
          <input
            type="text"
            className="form-control"
            name="soDt"
            autoComplete="off"
            {...formik.getFieldProps('soDt')}
          />
          {formik.errors.soDt && formik.touched.soDt ? <p className="text-danger">{formik.errors.soDt}</p> : ''}
        </div>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            autoComplete="off"
            {...formik.getFieldProps('email')}
          />
          {formik.errors.email && formik.touched.email ? <p className="text-danger">{formik.errors.email}</p> : ''}
        </div>
        <div className="form-group">
          <button type="submit" className="btn btnsubmit">
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
