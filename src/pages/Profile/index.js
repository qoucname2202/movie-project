import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editUserAction, profileUserAction } from '../../redux/actions/UserAction';
import moment from 'moment';
import { taiKhoan } from '../../configs/settings';
import { useFormik } from 'formik';
import { history } from '../../App';
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';
import 'antd/dist/antd.min.css';
import './style.scss';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { storage } from '../../utils/db';
import { collection, doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import firseabse from '../../utils/db';
import { useForm } from 'react-hook-form';

export default function Profile(props) {
  const db = firseabse;
  const { thongTinUser } = useSelector((state) => state.UserReducer);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const i18Local = localStorage.getItem('i18nextLng');
  let counter = useRef(0);
  const [poster, setPoster] = useState({});
  const [singleImage, setSingleImage] = useState('');

  useEffect(() => {
    if (!localStorage.getItem(taiKhoan)) {
      history.replace('/login');
    }
    let userLogin = JSON.parse(localStorage.getItem(taiKhoan));
    if (i18Local === '') {
      i18n.changeLanguage('en');
    } else {
      i18n.changeLanguage(i18Local);
    }
    let profileUser = {
      taiKhoan: userLogin.taiKhoan,
    };

    dispatch(profileUserAction(profileUser));
  }, []);

  let updateUser = JSON.parse(localStorage.getItem(taiKhoan));
  const { handleChange } = useFormik({
    initialValues: {
      soDt: '',
      matKhau: '',
      maLoaiNguoiDung: 'KhachHang',
    },
    onSubmit: (values) => {
      values.hoTen = `${updateUser.hoTen}`;
      values.maNhom = 'GP06';
      values.taiKhoan = `${updateUser.taiKhoan}`;
      values.email = `${updateUser.email}`;
      dispatch(editUserAction(values));
    },
  });
  const incNumber = () => {
    counter.current += 1;
    let number = counter.current;
    return number;
  };
  const onImageChange = (e) => {
    e.preventDefault();
    let pickedFile;
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      pickedFile = e.target.files[0];
      setSingleImage(pickedFile);
      reader.onload = (e) => {
        setPoster({ image: e.target.result });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const metadata = {
    contentType: 'image/jpeg',
  };

  const handleUpload = (value) => {
    if (singleImage === null) return;
    const storageRef = ref(storage, 'images/' + uuidv4());
    const uploadTask = uploadBytesResumable(storageRef, singleImage, metadata);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        console.log(error);
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await setDoc(doc(collection(db, 'profile')), {
            taiKhoan: thongTinUser.taiKhoan,
            hoTen: thongTinUser.hoTen,
            email: thongTinUser.email,
            avatar: downloadURL,
          });
          Swal.fire({
            icon: 'success',
            title: 'Cập nhật avatar thành công',
            showConfirmButton: false,
            timer: 1200,
          });
        });
      },
    );
  };

  console.log(thongTinUser);
  return (
    <div className="main-height admin-main profile-admin">
      <div className="container">
        <ul className="nav nav-pills mb-3 mt-5" id="pills-tab" role="tablist">
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
              {t('history')}
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
              {t('profile')}
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a
              className="nav-link"
              id="pills-avatar-tab"
              data-toggle="pill"
              href="#pills-avatar"
              role="tab"
              aria-controls="pills-avatar"
              aria-selected="false"
            >
              Avatar
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
                <tr>
                  <th>{t('stt')}</th>
                  <th>{t('movieName')}</th>
                  <th>{t('theaterName')}</th>
                  <th>{t('bookingDate')}</th>
                </tr>
              </thead>
              <tbody>
                {thongTinUser.thongTinDatVe?.map((user, index) => {
                  return (
                    <Fragment key={index}>
                      {user.danhSachGhe?.map((ghe, index2) => {
                        return (
                          <tr key={index2}>
                            <td>{incNumber()}</td>
                            <td>{user.tenPhim}</td>
                            <td>
                              {ghe.tenRap} - {ghe.tenGhe}
                            </td>
                            <td>{moment(user.ngayDat).format('DD/MM/YYYY')}</td>
                          </tr>
                        );
                      })}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
            <form className="form-profile" onSubmit={handleSubmit}>
              <div className="row">
                <div className="form-left col-md-6">
                  <div className="form-group">
                    <label className="label">{t('email.title')}</label>
                    <input
                      type="text"
                      name="email"
                      className="form-control"
                      value={thongTinUser.email}
                      onChange={handleChange}
                      disabled
                    />
                  </div>
                  <div className="form-group">
                    <label className="label">{t('fullName.title')}</label>
                    <input
                      type="text"
                      name="hoTen"
                      className="form-control"
                      value={thongTinUser.hoTen}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="label">{t('phoneNumber.title')}</label>
                    <input
                      type="text"
                      name="soDt"
                      className="form-control"
                      value={thongTinUser.soDT}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-right col-md-6">
                  <div className="form-group">
                    <label className="label">{t('username.title')}</label>
                    <input
                      type="text"
                      name="taiKhoan"
                      className="form-control"
                      value={thongTinUser.taiKhoan}
                      onChange={handleChange}
                      disabled
                    />
                  </div>
                  <div className="form-group">
                    <label className="label">{t('password.title')}</label>
                    <input
                      type="password"
                      name="matKhau"
                      className="form-control"
                      value={thongTinUser.matKhau}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="tab-pane fade" id="pills-avatar" role="tabpanel" aria-labelledby="pills-avatar-tab">
            <form onSubmit={handleSubmit(handleUpload)}>
              <div className="form-group row" style={{ position: 'relative' }}>
                <div className="col-md-12 d-flex justify-content-center">
                  <img
                    src={
                      poster
                        ? poster.image
                        : 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=859&q=80'
                    }
                    alt=""
                    style={{ width: '200px', height: '200px', borderRadius: '50%' }}
                  />
                </div>
                <input
                  type="file"
                  className="form-control"
                  onChange={onImageChange}
                  style={{
                    width: '40px',
                    borderRadius: '100%',
                    background: '#ec7532',
                    position: 'absolute',
                    top: '140px',
                    left: '630px',
                  }}
                />
                {errors?.thumb?.type === 'required' && <p className="text-danger">Vui lòng chọn hình</p>}
              </div>
              <div className="form-group add-movie text-center">
                <button type="submit" className="btn btn-add">
                  Cập nhật avatar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
