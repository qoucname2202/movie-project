import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-scroll';
import { LOGOUT } from '../../configs/settings';
const Header = () => {
  let dispatch = useDispatch();
  const { taiKhoan } = useSelector((state) => state.UserReducer);
  let setting = {
    activeClass: 'active',
    spy: true,
    smooth: true,
    offset: -90,
    duration: 500,
  };
  return (
    <div>
      <header className="header">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <NavLink className="navbar-brand" to="/">
            <img src="/images/logo_1.png" alt="Movie" />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link " {...setting} to="showdate">
                  Lịch chiếu{' '}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" {...setting} to="theater">
                  Cụm rạp
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" {...setting} to="view">
                  Tin tức
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" {...setting} to="application">
                  Ứng dụng
                </Link>
              </li>
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
                  <NavLink className="nav-link" to="/login">
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
    // <div>
    //   <header className="header">
    //     <nav className="navbar navbar-expand-lg navbar-light bg-light">
    //       <Link className="navbar-brand" to="/">
    //         <img src="./images/logo_1.png" alt="Logo-Movie" className="logo" />
    //       </Link>
    //       <button
    //         className="navbar-toggler"
    //         type="button"
    //         data-bs-toggle="collapse"
    //         data-bs-target="#navbarSupportedContent"
    //         aria-controls="navbarSupportedContent"
    //         aria-expanded="false"
    //         aria-label="Toggle navigation"
    //       >
    //         <span className="navbar-toggler-icon" />
    //       </button>
    //       <div className="collapse navbar-collapse" id="navbarSupportedContent">
    //         <ul className="navbar-nav">
    //           <li className="nav-item">
    //             <Link className="nav-link" to="showdate">
    //               Lịch chiếu
    //             </Link>
    //           </li>
    //           <li className="nav-item">
    //             <Link className="nav-link" to="theater">
    //               Cụm rạp
    //             </Link>
    //           </li>
    //           <li className="nav-item">
    //             <Link className="nav-link" to="view">
    //               Tin tức
    //             </Link>
    //           </li>
    //           <li className="nav-item">
    //             <Link className="nav-link" to="application">
    //               Ứng dụng
    //             </Link>
    //           </li>
    //           <li className="nav-item user">
    //             {taiKhoan !== '' ? (
    //               <div>
    //                 <span className="nav-link">
    //                   {' '}
    //                   <img src="../images/avatar.png" alt="avatar" className="img-avatar" />
    //                   {taiKhoan}
    //                 </span>
    //                 <div className="logout">
    //                   <button
    //                     className="btn btn-logout"
    //                     onClick={() => {
    //                       dispatch({ type: LOGOUT });
    //                     }}
    //                   >
    //                     Đăng xuất
    //                   </button>
    //                   <div className="profile">
    //                     <NavLink to={'/profile'}>Profile</NavLink>
    //                   </div>
    //                 </div>
    //               </div>
    //             ) : (
    //               <NavLink className="nav-link" to="/login">
    //                 <img src="../images/avatar.png" alt="avatar" className="img-avatar" />
    //                 Đăng nhập
    //               </NavLink>
    //             )}
    //           </li>
    //         </ul>
    //       </div>
    //     </nav>
    //   </header>
    // </div>
  );
};

export default Header;
