import React from 'react';

const Header = () => {
  return (
    <div>
      <header className="header">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#!">
            <img src="./images/logo_1.png" alt="Logo-Movie" className="logo" />
          </a>
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
                <a className="nav-link" href="#!">
                  Lịch chiếu
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#!">
                  Cụm rạp
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#!">
                  Tin tức
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#!">
                  Ứng dụng
                </a>
              </li>
              <li className="nav-item user">
                <div>
                  <span className="nav-link" style={{ display: 'flex' }}>
                    <img
                      src="../images/avatar.png"
                      alt="avatar"
                      className="img-avatar"
                    />
                    Quốc Nam
                  </span>
                  {/* <div className="logout">
                    <button className="btn btn-logout">Đăng xuất</button>
                    <div className="profile">
                      <a href="!#">Profile</a>
                    </div>
                  </div> */}
                </div>
                {/* <a className="nav-link" href="#!">
                  <img
                    src="../images/avatar.png"
                    alt="avatar"
                    className="img-avatar"
                  />
                  Đăng nhập
                </a> */}
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
