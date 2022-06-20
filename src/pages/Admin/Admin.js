import React, { useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import ManagerFilm from '../../components/Admin/ManagerFilm';
import ManagerUser from '../../components/Admin/ManagerUser';
import Swal from 'sweetalert2';
import { useSelector, useDispatch } from 'react-redux';
import { CLOSELOADING, LOGOUT } from '../../configs/settings';
import { useTranslation } from 'react-i18next';
import './style.scss';
import ManagerMovie24h from '../../components/Admin/Movie/ManagerMovie24h';
import ManagerReview from '../../components/Admin/Review/ManagerReview';
import ManagerPromotion from '../../components/Admin/Promotion/ManagerPromotion';

export default function Admin() {
  let dispatch = useDispatch();
  const navigate = useNavigate();
  const { taiKhoan } = useSelector((state) => state.UserReducer);
  const i18Local = localStorage.getItem('i18nextLng');
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (i18Local === '') {
      i18n.changeLanguage('en');
    } else {
      i18n.changeLanguage(i18Local);
    }
    if (!localStorage.getItem('taiKhoan')) {
      navigate('/login');
    }
    dispatch({ type: CLOSELOADING });
  }, []);

  let tokenLocal = JSON.parse(localStorage.getItem('taiKhoan'));
  if (tokenLocal.maLoaiNguoiDung === 'QuanTri') {
    return (
      <div className="d-flex wrapper inner-admin">
        {/* Sidebar*/}
        <div className="border-end sidebar-wrapper">
          <div className="sidebar-heading">
            <Link className="logo-admin" to="/">
              <img src="/images/logo_1.png" alt="Movie" />
            </Link>
          </div>
          <div
            className="list-group list-group-flush nav flex-column nav-pills"
            id="v-pills-tab"
            role="tablist"
            aria-orientation="vertical"
          >
            <a
              className="nav-link active"
              id="v-pills-admin"
              data-toggle="pill"
              href="#v-pill-admin"
              role="tab"
              aria-controls="v-pills-home"
              aria-selected="true"
            >
              {t('managerFilm')}
            </a>
            <a
              className="nav-link"
              id="v-pills-user"
              data-toggle="pill"
              href="#v-pill-user"
              role="tab"
              aria-controls="v-pill-user"
              aria-selected="false"
            >
              {t('managerUser')}
            </a>
            <a
              className="nav-link"
              id="v-pills-movie"
              data-toggle="pill"
              href="#v-pill-movie"
              role="tab"
              aria-controls="v-pill-movie"
              aria-selected="false"
            >
              {t('movieNews.manager')}
            </a>
            <a
              className="nav-link"
              id="v-pills-review"
              data-toggle="pill"
              href="#v-pill-review"
              role="tab"
              aria-controls="v-pill-review"
              aria-selected="false"
            >
              {t('reviews.manager')}
            </a>
            <a
              className="nav-link"
              id="v-pills-promotion"
              data-toggle="pill"
              href="#v-pill-promotion"
              role="tab"
              aria-controls="v-pill-promotion"
              aria-selected="false"
            >
              {t('discount.manager')}
            </a>
          </div>
        </div>
        {/* Page content wrapper*/}
        <div className="page-content-wrapper">
          {/* Top navigation*/}
          <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
            <div className="container-fluid">
              <button className="btn btn-toggle" id="sidebarToggle">
                <i className="fas fa-bars"></i>
              </button>
              <div className="header  navbar-collapse">
                <ul className="navbar-nav ms-auto mt-2 mt-lg-0 navbar-collapse">
                  <li className="nav-item user">
                    {taiKhoan !== '' ? (
                      <div>
                        <span className="nav-link">
                          {' '}
                          <img src="../images/avatar.png" alt="avatar" className="img-avatar" />
                          {taiKhoan}
                        </span>
                        <div className="logout">
                          <button
                            className="btn btn-logout"
                            onClick={() => {
                              dispatch({ type: LOGOUT });
                              navigate('/home');
                            }}
                          >
                            {t('signout')}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <NavLink className="nav-link" to="/login">
                        <img src="../images/avatar.png" alt="avatar" className="img-avatar" />
                        {t('signin')}
                      </NavLink>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          {/* Page content*/}
          <div className="container-fluid tab-content" id="v-pills-tabContent">
            <div
              className="tab-pane fade show active v-pill-admin"
              id="v-pill-admin"
              role="tabpanel"
              aria-labelledby="v-pills-admin"
            >
              <ManagerFilm />
            </div>
            <div className="tab-pane fade v-pill-admin" id="v-pill-user" role="tabpanel" aria-labelledby="v-pills-user">
              <ManagerUser />
            </div>
            <div
              className="tab-pane fade v-pill-admin"
              id="v-pill-movie"
              role="tabpanel"
              aria-labelledby="v-pills-movie"
            >
              <ManagerMovie24h />
            </div>
            <div
              className="tab-pane fade v-pill-admin"
              id="v-pill-review"
              role="tabpanel"
              aria-labelledby="v-pills-review"
            >
              <ManagerReview />
            </div>
            <div
              className="tab-pane fade v-pill-admin"
              id="v-pill-promotion"
              role="tabpanel"
              aria-labelledby="v-pills-promotion"
            >
              <ManagerPromotion />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    Swal.fire({
      title: t('titleWarningAdmin'),
      text: t('pageNotUser'),
      icon: 'warning',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: t('backHome'),
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/home');
      }
    });
    return '';
  }
}
