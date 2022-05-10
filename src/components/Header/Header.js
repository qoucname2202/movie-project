import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { LOGOUT } from '../../configs/settings';
const Header = () => {
  let dispatch = useDispatch();

  const { taiKhoan } = useSelector((state) => state.UserReducer);
  return (
    <div>
      <header className="header">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">
            <img src="./images/logo_1.png" alt="Logo-Movie" className="logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="showdate">
                  Lịch chiếu
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="theater">
                  Cụm rạp
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="view">
                  Tin tức
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="application">
                  Ứng dụng
                </Link>
              </li>
              <li className="nav-item user">
                {taiKhoan !== '' ? (
                  <div>
                    <span
                      className="nav-link"
                      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                      {' '}
                      <img src="../images/avatar.png" alt="avatar" className="img-avatar" />
                      {taiKhoan}
                    </span>
                    <div className="logout">
                      <button
                        className="btn btn-logout"
                        onClick={() => {
                          dispatch({ type: LOGOUT });
                        }}
                      >
                        Đăng xuất
                      </button>
                      <div className="profile">
                        <NavLink to={'/profile'}>Profile</NavLink>
                      </div>
                    </div>
                  </div>
                ) : (
                  <NavLink
                    className="nav-link"
                    to="/login"
                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                  >
                    <img src="../images/avatar.png" alt="avatar" className="img-avatar" />
                    Đăng nhập
                  </NavLink>
                )}
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
