import React from "react";

const Profile = () => {
  return (
    <div className="main-height admin-main profile-admin">
      <div className="container">
        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
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
              Lịch Sử Đặt Vé
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
              Thông Tin Cá Nhân
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
                <th>STT</th>
                <th>Tên Phim</th>
                <th>Tên Cụm Rạp</th>
                <th>Ngày Đặt</th>
                {/* <th>Tổng Tiền</th> */}
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td>Người Kiến</td>
                  <td>C12-VIP</td>
                  <td>22/02/2022</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            className="tab-pane fade"
            id="pills-profile"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
          >
            <form className="form-profile">
              <div className="row">
                <div className="form-left col-md-6">
                  <div className="form-group">
                    <label className="label">Email</label>
                    <input
                      type="text"
                      name="email"
                      className="form-control"
                      disabled
                    />
                  </div>
                  <div className="form-group">
                    <label className="label">Họ Tên</label>
                    <input type="text" name="hoTen" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label className="label">Số Điện Thoại</label>
                    <input type="text" name="soDt" className="form-control" />
                  </div>
                </div>
                <div className="form-right col-md-6">
                  <div className="form-group">
                    <label className="label">Tài Khoản</label>
                    <input
                      type="text"
                      name="taiKhoan"
                      className="form-control"
                      disabled
                    />
                  </div>
                  <div className="form-group">
                    <label className="label">Mật Khẩu</label>
                    <input
                      type="password"
                      name="matKhau"
                      className="form-control"
                    />
                  </div>
                </div>
                {/* <div className="form-group inner-btn">
                         <button type="submit" className="btn btn-submit btn-all-form">Cập Nhật</button>
                     </div> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
