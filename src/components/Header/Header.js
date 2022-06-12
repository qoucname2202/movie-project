import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-scroll';
import { LOGOUT } from '../../configs/settings';
import { Select } from 'antd';
import './style.scss';

// Using Hook translation
import { useTranslation } from 'react-i18next';
const { Option } = Select;
const Header = () => {
  const { t, i18n } = useTranslation();
  let dispatch = useDispatch();
  const handleChange = (value) => {
    i18n.changeLanguage(value);
  };

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
                  {t('showtimes')}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" {...setting} to="theater">
                  {t('cinema')}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" {...setting} to="view">
                  {t('news')}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" {...setting} to="application">
                  {t('app')}
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
                        {t('signout')}
                      </button>
                      <div className="profile">
                        <NavLink to={'/profile'}>Profile</NavLink>
                      </div>
                    </div>
                  </div>
                ) : (
                  <NavLink className="nav-link" to="/login">
                    <img src="../images/avatar.png" alt="avatar" className="img-avatar" />
                    {t('signin')}
                  </NavLink>
                )}
              </li>
              <li className="nav-item">
                <Select
                  defaultValue="en"
                  style={{
                    width: 100,
                    marginBottom: '10px',
                  }}
                  onChange={handleChange}
                >
                  <Option value=""></Option>
                  <Option value="chi">
                    <div style={{ display: 'flex', justifyContents: 'center', alignItems: 'center', gap: '10px' }}>
                      <img src="./images/china.png" alt="" style={{ width: '20px', height: '20px' }} />
                      <span>Chi</span>
                    </div>
                  </Option>
                  <Option value="en">
                    <div style={{ display: 'flex', justifyContents: 'center', alignItems: 'center', gap: '10px' }}>
                      <img src="./images/united-states.png" alt="" style={{ width: '20px', height: '20px' }} />
                      <span>Eng</span>
                    </div>
                  </Option>
                  <Option value="vi">
                    <div style={{ display: 'flex', justifyContents: 'center', alignItems: 'center', gap: '10px' }}>
                      <img src="./images/vietnam.png" alt="" style={{ width: '20px', height: '20px' }} />
                      <span>Vi</span>
                    </div>
                  </Option>
                </Select>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
