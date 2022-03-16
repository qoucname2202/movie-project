import React from 'react';

const Register = () => {
  return (
    <div className="inner-bg-user">
      <nav className="navbar navbar-light">
        <a className="navbar-brand" href="#!">
          <img src="../images/logo_1.png" alt="logo" />
        </a>
      </nav>
      <form className="form-user">
        <h1 className="ttl">Đăng ký</h1>
        <div className="form-group mb-3">
          <label className="form-label">Username</label>
          <input type="text" className="form-control" name="username" />
        </div>
        <div className="form-group mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" name="password" />
        </div>
        <div className="form-group mb-3">
          <label className="form-label">Fullname</label>
          <input type="text" className="form-control" name="fullname" />
        </div>
        <div className="form-group mb-3">
          <label className="form-label">Phone number</label>
          <input type="text" className="form-control" name="phone" />
        </div>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" name="email" />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btnsubmit">
            Đăng ký
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
