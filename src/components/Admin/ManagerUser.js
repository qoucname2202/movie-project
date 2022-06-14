import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUserAction, inforUserAllAction } from '../../redux/actions/UserAction';
import AddUser from './AddUser';
import { Switch, Table } from 'antd';
import 'antd/dist/antd.min.css';
import { useTranslation } from 'react-i18next';
// import EditUser from './EditUser';

export default function ManagerUser(props) {
  const dispatch = useDispatch();
  const { thongTinUserAll } = useSelector((state) => state.UserReducer);
  const { t, i18n } = useTranslation();
  const { accessToken } = useSelector((state) => state.UserReducer);
  const [dsUser, setDSUser] = useState(null);
  const [taiKhoanSelected, setTaiKhoanSelected] = useState('');

  useEffect(() => {
    // Lấy all user
    dispatch(inforUserAllAction());
  }, []);

  const handleChangeSwitch = (checked) => {
    if (checked) {
      let user1 = thongTinUserAll?.filter((item) => {
        return item.maLoaiNguoiDung === 'KhachHang';
      });
      setDSUser(user1);
      console.log(user1);
    } else {
      let admin1 = thongTinUserAll?.filter((item) => {
        return item.maLoaiNguoiDung === 'QuanTri';
      });
      setDSUser(admin1);
    }
  };
  const handelChangeTaiKhoan = (taiKhoan) => {
    setTaiKhoanSelected(taiKhoan);
  };
  const handleChangeSearch = (e) => {
    e.preventDefault();
    const filter = [...thongTinUserAll].filter((item) => {
      return (
        item.hoTen?.includes(e.target.value) ||
        item.taiKhoan?.includes(e.target.value) ||
        item.email?.includes(e.target.value) ||
        item.soDt?.includes(e.target.value)
      );
    });
    setDSUser(filter);
  };
  useEffect(() => {
    if (localStorage.getItem('i18nextLng') !== '') {
      i18n.changeLanguage(localStorage.getItem('i18nextLng'));
    } else {
      i18n.changeLanguage('en');
    }
  }, [i18n]);
  const columns = [
    {
      title: 'username.title',
      dataIndex: 'taiKhoan',
    },
    {
      title: 'fullName.title',
      dataIndex: 'hoTen',
    },
    {
      title: 'email.title',
      dataIndex: 'email',
    },
    {
      title: 'phoneNumber.title',
      dataIndex: 'soDt',
    },
    {
      title: 'password.title',
      dataIndex: 'matKhau',
    },
    {
      title: 'userType.title',
      dataIndex: 'maLoaiNguoiDung',
    },
    {
      title: '',
      dataIndex: 'taiKhoan',
      render: (taiKhoan) => (
        <div className="inner-button">
          <div className="block">
            {/* <button
              onClick={() => {
                handelChangeTaiKhoan(taiKhoan);
              }}
              className="btn btn-edit"
              type="button"
              data-toggle="modal"
              data-target="#edituser"
            >
              <i class="far fa-edit"></i>
            </button> */}
          </div>
          <button
            className="btn-delete btn"
            type="button"
            onClick={() => {
              dispatch(deleteUserAction(taiKhoan, accessToken));
            }}
          >
            <i className="far fa-trash-alt"></i>
          </button>
        </div>
      ),
    },
  ];
  return (
    <div>
      <div className="user-header inner-button">
        <div className="inner-add row">
          <div className="col-md-6 col-6">
            <button className="btn btn-add" type="button" data-toggle="modal" data-target="#adduser">
              {t('add.user')}
            </button>
          </div>
          <div className="col-md-6 col-6 text-right">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group search-form d-flex">
                  <input
                    className="form-control"
                    type="text"
                    placeholder={t('search.user')}
                    aria-label="Search"
                    aria-describedby="basic-addon2"
                    onChange={handleChangeSearch}
                  />
                  <div className="input-group-append">
                    <button className="btn btn-primary" type="button">
                      <i className="fas fa-search" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-6">
                <Switch checkedChildren="User" unCheckedChildren="Admin" defaultChecked onChange={handleChangeSwitch} />
              </div>
            </div>
          </div>
        </div>
        <AddUser />
      </div>
      <div className="manageruser">
        <Table className="table table-manageruser" dataSource={dsUser ? dsUser : thongTinUserAll}>
          {columns.map((col, index) => {
            return <Table.Column key={index} title={t(col.title)} dataIndex={col.dataIndex} render={col.render} />;
          })}
        </Table>
      </div>
      {/* <EditUser taiKhoan={taiKhoanSelected} /> */}
    </div>
  );
}
