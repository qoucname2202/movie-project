import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { addUserAction } from '../../redux/actions/UserAction';
import { useTranslation } from 'react-i18next';

const AddUser = (props) => {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.UserReducer);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (localStorage.getItem('i18nextLng') === '') {
      i18n.changeLanguage('en');
    } else {
      i18n.changeLanguage(localStorage.getItem('i18nextLng'));
    }
  }, []);
  const { handleChange, handleSubmit, errors, handleBlur, touched } = useFormik({
    initialValues: {
      maNhom: '',
      taiKhoan: '',
      matKhau: '',
      email: '',
      hoTen: '',
      soDt: '',
      maLoaiNguoiDung: '',
    },
    validationSchema: yup.object().shape({
      maNhom: yup.string().required(t('groupEmpty')),
      taiKhoan: yup.string().required('username.empty'),
      matKhau: yup.string().required('password.empty').min(6, t('password.min')),
      email: yup
        .string()
        .required(t('email.empty'))
        .matches(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          t('email.incorrect'),
        ),
      hoTen: yup.string().required('fullName.empty'),
      soDt: yup
        .string()
        .required(t('phoneNumber.empty'))
        .matches(/^[0-9]+$/, t('phoneNumber.numbCharacter')),
      maLoaiNguoiDung: yup.string().required(t('userType.empty')),
    }),
    onSubmit: (value) => {
      dispatch(addUserAction(value, accessToken));
      console.log(value);
    },
  });

  return (
    <div className="block">
      <div className="modal fade" id="adduser" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {t('add.user')}
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form className="form-add-user" onSubmit={handleSubmit}>
                <div className="row form-group">
                  <label htmlFor="" className="col-md-2">
                    {t('groupCode')}
                  </label>
                  <div className="col-md-10">
                    <input
                      type="text"
                      name="maNhom"
                      className="form-control"
                      placeholder="GP01"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.maNhom && touched.maNhom ? <p className="text-danger">{errors.maNhom}</p> : ''}
                  </div>
                </div>
                <div className="row form-group">
                  <label htmlFor="" className="col-md-2">
                    {t('username.title')}
                  </label>
                  <div className="col-md-10">
                    <input
                      type="text"
                      name="taiKhoan"
                      className="form-control"
                      placeholder={t('username.empty')}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.taiKhoan && touched.taiKhoan ? <p className="text-danger">{errors.taiKhoan}</p> : ''}
                  </div>
                </div>
                <div className="row form-group">
                  <label htmlFor="" className="col-md-2">
                    {t('password.title')}
                  </label>
                  <div className="col-md-10">
                    <input
                      type="password"
                      name="matKhau"
                      className="form-control"
                      placeholder={t('password.empty')}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.matKhau && touched.matKhau ? <p className="text-danger">{errors.matKhau}</p> : ''}
                  </div>
                </div>
                <div className="row form-group">
                  <label htmlFor="" className="col-md-2">
                    {t('email.title')}
                  </label>
                  <div className="col-md-10">
                    <input
                      type="text"
                      name="email"
                      className="form-control"
                      placeholder="lionDuong@gmail.com"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.email && touched.email ? <p className="text-danger">{errors.email}</p> : ''}
                  </div>
                </div>
                <div className="row form-group">
                  <label htmlFor="" className="col-md-2">
                    {t('fullName.title')}
                  </label>
                  <div className="col-md-10">
                    <input
                      type="text"
                      name="hoTen"
                      className="form-control"
                      placeholder={t('fullName.empty')}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.hoTen && touched.hoTen ? <p className="text-danger">{errors.hoTen}</p> : ''}
                  </div>
                </div>
                <div className="row form-group">
                  <label htmlFor="" className="col-md-2">
                    {t('phoneNumber.title')}
                  </label>
                  <div className="col-md-10">
                    <input
                      type="text"
                      name="soDt"
                      className="form-control"
                      placeholder="091xxxx"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.soDt && touched.soDt ? <p className="text-danger">{errors.soDt}</p> : ''}
                  </div>
                </div>
                <div className="row form-group">
                  <label htmlFor="" className="col-md-2">
                    {t('userType.title')}
                  </label>
                  <div className="col-md-10">
                    <select name="maLoaiNguoiDung" className="form-control" onChange={handleChange} onBlur={handleBlur}>
                      <option value="ChonLoaiNguoiDung">{t('userType.selectUserType')}</option>
                      <option value="QuanTri">{t('userType.typeUser')}</option>
                      <option value="KhachHang">{t('userType.typeAdmin')}</option>
                    </select>
                    {errors.maLoaiNguoiDung && errors.maLoaiNguoiDung ? (
                      <p className="text-danger">{errors.maLoaiNguoiDung}</p>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
                <button className="btn btn-submit" type="submit">
                  {t('add.user')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddUser;
