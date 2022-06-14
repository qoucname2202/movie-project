import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { RegisterAction } from '../../redux/actions/UserAction';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
const Register = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const i18Local = localStorage.getItem('i18nextLng');
  useEffect(() => {
    if (i18Local === '') {
      i18n.changeLanguage('en');
    } else {
      i18n.changeLanguage(i18Local);
    }
  }, []);
  const formik = useFormik({
    initialValues: {
      taiKhoan: '',
      matKhau: '',
      hoTen: '',
      soDt: '',
      email: '',
    },
    validationSchema: yup.object().shape({
      taiKhoan: yup.string().required(t('username.empty')),
      matKhau: yup.string().required(t('password.empty')).min(6, t('password.min')),
      hoTen: yup
        .string()
        .required(t('fullName.empty'))
        .matches(/^[aA-zZ\s]+$/, t('fullName.specialCharacter')),
      soDt: yup
        .string()
        .required(t('phoneNumber.empty'))
        .min(10, t('phoneNumber.leastLength'))
        .max(10, 'phoneNumber.maxLength'),
      email: yup.string().required(t('email.empty')).email(t('email.incorrect')),
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
        <Link className="navbar-brand" to="/home">
          <img src="../images/logo_1.png" alt="logo" />
        </Link>
      </nav>
      <form className="form-user" onSubmit={formik.handleSubmit}>
        <h1 className="ttl">{t('signup')}</h1>
        <div className="form-group mb-3">
          <label className="form-label">{t('username.title')}</label>
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
          <label className="form-label">{t('password.title')}</label>
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
          <label className="form-label">{t('fullName.title')}</label>
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
          <label className="form-label">{t('phoneNumber.title')}</label>
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
          <label className="form-label">{t('email.title')}</label>
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
            {t('signup')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
