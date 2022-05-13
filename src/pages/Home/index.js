import React, { Fragment, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import Application from '../../components/Application';
import CarouselHome from '../../components/CarouselHome/CarouselHome';
import ListMovie from '../../components/ListMovie';
import News from '../../components/News/';
import SearchHome from '../../components/SearchHome/SearchHome';
import ShowTimeMovie from '../../components/ShowTimeMovie/ShowTimeMovie';
import { LOGOUT } from '../../configs/settings';
const Home = () => {
  let dispatch = useDispatch();
  // Scroll
  const [state, setState] = useState({
    lichChieu: useRef(null),
    cumRap: useRef(null),
    tinTuc: useRef(null),
    ungDung: useRef(null),
  });
  const { taiKhoan } = useSelector((state) => state.UserReducer);
  const executeScroll = (name) => {
    state[name].current.scrollIntoView();
  };
  return (
    <Fragment>
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
                  <span
                    className="nav-link"
                    onClick={() => {
                      executeScroll('lichChieu');
                    }}
                  >
                    Lịch chiếu
                  </span>
                </li>
                <li className="nav-item">
                  <span
                    className="nav-link"
                    onClick={() => {
                      executeScroll('cumRap');
                    }}
                  >
                    Cụm rạp
                  </span>
                </li>
                <li className="nav-item">
                  <span
                    className="nav-link"
                    onClick={() => {
                      executeScroll('tinTuc');
                    }}
                  >
                    Tin tức
                  </span>
                </li>
                <li className="nav-item">
                  <span
                    className="nav-link"
                    onClick={() => {
                      executeScroll('ungDung');
                    }}
                  >
                    Ứng dụng
                  </span>
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
      <main className="main">
        <CarouselHome />
        <SearchHome />
        <ListMovie reful={state.lichChieu} />
        <ShowTimeMovie reful={state.cumRap} />
        <News reful={state.tinTuc} />
        <Application reful={state.ungDung} />
      </main>
    </Fragment>
  );
};

export default Home;
