import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editUserAction, profileUserAction } from '../../redux/actions/UserAction';
import moment from 'moment';
import { taiKhoan } from '../../configs/settings';
import { useFormik } from 'formik';
import { history } from '../../App';
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';

export default function Profile(props) {
  const { thongTinUser } = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const i18Local = localStorage.getItem('i18nextLng');
  let counter = useRef(0);

  useEffect(() => {
    if (!localStorage.getItem(taiKhoan)) {
      history.replace('/login');
    }
    let userLogin = JSON.parse(localStorage.getItem(taiKhoan));
    if (i18Local === '') {
      i18n.changeLanguage('en');
    } else {
      i18n.changeLanguage(i18Local);
    }
    let profileUser = {
      taiKhoan: userLogin.taiKhoan,
    };

    dispatch(profileUserAction(profileUser));
  }, []);

  let updateUser = JSON.parse(localStorage.getItem(taiKhoan));
  const { handleSubmit, handleChange } = useFormik({
    initialValues: {
      soDt: '',
      matKhau: '',
      maLoaiNguoiDung: 'KhachHang',
    },
    onSubmit: (values) => {
      values.hoTen = `${updateUser.hoTen}`;
      values.maNhom = 'GP06';
      values.taiKhoan = `${updateUser.taiKhoan}`;
      values.email = `${updateUser.email}`;
      dispatch(editUserAction(values));
    },
  });
  const incNumber = () => {
    counter.current += 1;
    let number = counter.current;
    return number;
  };
  return (
    <div className="main-height admin-main profile-admin">
      <div className="container">
        <ul className="nav nav-pills mb-3 mt-5" id="pills-tab" role="tablist">
          <li className="nav-item" role="presentation">
            <a
              className="nav-link active"
              id="pills-home-tab"
              data-toggle="pill"
              href="#pills-home"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
            >
              {t('history')}
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a
              className="nav-link"
              id="pills-profile-tab"
              data-toggle="pill"
              href="#pills-profile"
              role="tab"
              aria-controls="pills-profile"
              aria-selected="false"
            >
              {t('profile')}
            </a>
          </li>
        </ul>
        <div className="tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade show active history-tab"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
          >
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>{t('stt')}</th>
                  <th>{t('movieName')}</th>
                  <th>{t('theaterName')}</th>
                  <th>{t('bookingDate')}</th>
                </tr>
              </thead>
              <tbody>
                {thongTinUser.thongTinDatVe?.map((user, index) => {
                  return (
                    <Fragment key={index}>
                      {user.danhSachGhe?.map((ghe, index2) => {
                        return (
                          <tr key={index2}>
                            <td>{incNumber()}</td>
                            <td>{user.tenPhim}</td>
                            <td>
                              {ghe.tenRap} - {ghe.tenGhe}
                            </td>
                            <td>{moment(user.ngayDat).format('DD/MM/YYYY')}</td>
                          </tr>
                        );
                      })}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
            <form className="form-profile" onSubmit={handleSubmit}>
              <div className="row">
                <div className="form-left col-md-6">
                  <div className="form-group">
                    <label className="label">{t('email')}</label>
                    <input
                      type="text"
                      name="email"
                      className="form-control"
                      value={thongTinUser.email}
                      onChange={handleChange}
                      disabled
                    />
                  </div>
                  <div className="form-group">
                    <label className="label">{t('hoTen')}</label>
                    <input
                      type="text"
                      name="hoTen"
                      className="form-control"
                      value={thongTinUser.hoTen}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="label">{t('soDienThoai')}</label>
                    <input
                      type="text"
                      name="soDt"
                      className="form-control"
                      value={thongTinUser.soDT}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-right col-md-6">
                  <div className="form-group">
                    <label className="label">{t('username')}</label>
                    <input
                      type="text"
                      name="taiKhoan"
                      className="form-control"
                      value={thongTinUser.taiKhoan}
                      onChange={handleChange}
                      disabled
                    />
                  </div>
                  <div className="form-group">
                    <label className="label">{t('password')}</label>
                    <input
                      type="password"
                      name="matKhau"
                      className="form-control"
                      value={thongTinUser.matKhau}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
