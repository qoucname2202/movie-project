import React from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';
// import { addMovieAction } from '../../redux/actions/ListMovieAction';
import axios from 'axios';
import { domain, maNhom } from '../../configs/settings';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

export default function AddMovie(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { t, i18n } = useTranslation();
  const i18Local = localStorage.getItem('i18nextLng');

  useEffect(() => {
    if (i18Local === '') {
      i18n.changeLanguage('en');
    } else {
      i18n.changeLanguage(i18Local);
    }
  }, []);

  const onSubmit = (data) => {
    var form_data = new FormData();
    for (var key in data) {
      if (key === 'hinhAnh') {
        form_data.append(key, data[key][0]);
      } else {
        form_data.append(key, data[key]);
      }
    }
    axios({
      url: `${domain}/api/quanlyphim/ThemPhimUploadHinh`,
      method: 'POST',
      data: form_data,
    })
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Thêm phim thành công',
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        console.log(err.response.data);
        Swal.fire({
          icon: 'error',
          title: 'Thêm phim thất bại',
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  return (
    <div>
      {/* Modal */}
      <div className="modal fade" id="addmovie" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {t('addFilm')}
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group row">
                  <label for="maPhim" className="col-md-2">
                    {t('movieCode')}
                  </label>
                  <div className="col-md-10">
                    <input type="text" placeholder="Nhập số" {...register('maPhim', {})} className="form-control" />
                  </div>
                </div>
                <div className="form-group row">
                  <label for="tenPhim" className="col-md-2">
                    {t('movieName')}
                  </label>
                  <div className="col-md-10">
                    <input
                      placeholder="Nhập Tên Phim"
                      type="text"
                      {...register('tenPhim', {
                        required: true,
                      })}
                      className="form-control"
                    />
                    {errors?.tenPhim?.type === 'required' && <p className="text-danger">Không được để trống</p>}
                  </div>
                </div>
                <div className="form-group row">
                  <label for="biDanh" className="col-md-2">
                    {t('aliases')}
                  </label>
                  <div className="col-md-10">
                    <input
                      type="text"
                      placeholder="nhap-bi-danh"
                      {...register('biDanh', {
                        required: true,
                      })}
                      className="form-control"
                    />
                    {errors?.biDanh?.type === 'required' && <p className="text-danger">Không được để trống</p>}
                  </div>
                </div>
                <div className="form-group row">
                  <label for="trailer" className="col-md-2">
                    {t('trailer')}
                  </label>
                  <div className="col-md-10">
                    <input
                      placeholder="https://youtube.com/"
                      type="text"
                      {...register('trailer', {
                        required: true,
                      })}
                      className="form-control"
                    />
                    {errors?.trailer?.type === 'required' && <p className="text-danger">Không được để trống</p>}
                  </div>
                </div>
                <div className="form-group row">
                  <label for="trailer" className="col-md-2">
                    {t('movieThumb')}
                  </label>
                  <div className="col-md-10">
                    <input
                      type="file"
                      {...register('hinhAnh', {
                        required: true,
                      })}
                      className="form-control"
                    />
                    {errors?.hinhAnh?.type === 'required' && <p className="text-danger">Không được để trống</p>}
                  </div>
                </div>
                <div className="form-group row">
                  <label for="maNhom" className="col-md-2">
                    Mã nhóm
                  </label>
                  <div className="col-md-10">
                    <input
                      type="text"
                      // Mã nhóm để add vào
                      value={maNhom}
                      {...register('maNhom', {
                        required: true,
                      })}
                      className="form-control"
                    />
                    {errors?.maNhom?.type === 'required' && <p className="text-danger">Không được để trống</p>}
                  </div>
                </div>
                <div className="form-group row">
                  <label for="ngayKhoiChieu" className="col-md-2">
                    {t('release')}
                  </label>
                  <div className="col-md-10">
                    <input
                      type="text"
                      placeholder="dd-mm-yyyy"
                      {...register('ngayKhoiChieu', {
                        required: true,
                      })}
                      className="form-control"
                    />
                    {errors?.ngayKhoiChieu?.type === 'required' && <p className="text-danger">Không được để trống</p>}
                  </div>
                </div>
                <div className="form-group row">
                  <label for="moTa" className="col-md-2">
                    Mô tả
                  </label>
                  <div className="col-md-10">
                    <textarea
                      type="text"
                      {...register('moTa', {
                        required: true,
                      })}
                      className="form-control"
                    />
                    {errors?.moTa?.type === 'required' && <p className="text-danger">Không được để trống</p>}
                  </div>
                </div>
                <div className="form-group add-movie text-center">
                  <button type="submit" className="btn btn-add">
                    {t('addFilm')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
