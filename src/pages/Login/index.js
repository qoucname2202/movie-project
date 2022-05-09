import React from 'react';

const Login = () => {
  return (
    <div className="inner-bg-user">
      <nav className="navbar navbar-light">
        <a className="navbar-brand" href="#!">
          <img src="../images/logo_1.png" alt="logo" />
        </a>
      </nav>
      <form className="form-user">
        <h1 className="ttl">Đăng nhập</h1>
        <div className="form-group mb-3">
          <label className="form-label">Username</label>
          <i className="far fa-user user"></i>
          <input type="text" className="form-control" name="username" autoComplete="off" />
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <i className="fas fa-lock user"></i>
          <input type="password" className="form-control" name="password" autoComplete="off" />
        </div>
        <div className="form-group mb-3">
          <button type="submit" className="btn btnsubmit">
            Login
          </button>
        </div>
        <div className="registernow">
          <p>
            Bạn chưa có tài khoản? <a href="!#">Đăng ký</a>
          </p>
          <a className="backhome" href="!#">
            Back Home
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
