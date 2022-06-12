import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { UserAction } from '../../redux/actions/UserAction';
import qs from 'qs';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
const Login = () => {
  const dispatch = useDispatch();
  const search = useLocation().search.substring(1);
  const { redirectTo } = qs.parse(search);
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
    },
    validationSchema: yup.object().shape({
      taiKhoan: yup.string().required(t('userEmpty')),
      matKhau: yup.string().required(t('passwordEmpty')).min(6, t('passwordLength')),
    }),
    onSubmit: (values) => {
      dispatch(UserAction(values, redirectTo));
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
        <h1 className="ttl">{t('signin')}</h1>
        <div className="form-group mb-3">
          <label className="form-label">{t('username')}</label>
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
          <label className="form-label">{t('password')}</label>
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
            {t('signin')}
          </button>
        </div>
        <div className="registernow">
          <p>
            {t('unaccount')} <Link to="/register">{t('signup')}</Link>
          </p>
          <Link className="backhome" to="/home">
            {t('backHome')}
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
