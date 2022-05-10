import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { UserAction } from '../../redux/actions/UserAction';
const Login = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      taiKhoan: '',
      matKhau: '',
    },
    validationSchema: yup.object().shape({
      taiKhoan: yup.string().required('Tài khoản không được bỏ trống!'),
      matKhau: yup.string().required('Mật khẩu không được bỏ trống!').min(6, 'Mật khẩu tối đa 6 ký tự'),
    }),
    onSubmit: (values) => {
      dispatch(UserAction(values));
    },
  });

  return (
    <div className="inner-bg-user">
      <nav className="navbar navbar-light">
        <Link className="navbar-brand" to="/home">
          <img src="../images/logo_1.png" alt="logo" />
        </Link>
      </nav>
      <form className="form-user" onSubmit={formik.handleSubmit}>
        <h1 className="ttl">Đăng nhập</h1>
        <div className="form-group mb-3">
          <label className="form-label">Tài khoản</label>
          <i className="far fa-user user"></i>
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
        <div className="form-group">
          <label className="form-label">Mật khẩu</label>
          <i className="fas fa-lock user"></i>
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
          <button type="submit" className="btn btnsubmit" disabled={!formik.isValid}>
            Login
          </button>
        </div>
        <div className="registernow">
          <p>
            Bạn chưa có tài khoản? <Link to="/register">Đăng ký</Link>
          </p>
          <Link className="backhome" to="/home">
            Back Home
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
