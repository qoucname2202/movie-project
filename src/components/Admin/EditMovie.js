import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';
import { maNhom } from '../../configs/settings';
import { useDispatch } from 'react-redux';
import { editMovieAction } from '../../redux/actions/ListMovieAction';
import { useTranslation } from 'react-i18next';
export default function EditMovie(props) {
  const { movie } = props;
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (localStorage.getItem('i18nextLng') !== '') {
      i18n.changeLanguage(localStorage.getItem('i18nextLng'));
    } else {
      i18n.changeLanguage('en');
    }
  }, []);

  useEffect(() => {
    // console.log(movie);
    reset(movie);
  }, [movie]);

  const onSubmit = (data) => {
    console.log(data);
    var form_data = new FormData();
    for (var key in data) {
      if (key === 'hinhAnh') {
        form_data.append(key, data[key][0]);
      } else {
        form_data.append(key, data[key]);
      }
    }
    dispatch(editMovieAction(form_data));
  };

  return (
    <div className="block">
      {movie ? (
        <div className="modal fade" id="editmovie" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  {t('updatedFilm')}
                </h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group row">
                    <label htmlFor="maPhim" className="col-md-2">
                      {t('movieCode')}
                    </label>
                    <div className="col-md-10">
                      <input
                        value="maPhim"
                        type="text"
                        placeholder={t('input.numb')}
                        {...register('maPhim', {})}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="tenPhim" className="col-md-2">
                      {t('movieName')}
                    </label>
                    <div className="col-md-10">
                      <input
                        placeholder={t('input.filmName')}
                        type="text"
                        {...register('tenPhim', {
                          required: true,
                        })}
                        className="form-control"
                      />
                      {errors?.tenPhim?.type === 'required' && <p className="text-danger">{t('inputEmpty')}</p>}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="biDanh" className="col-md-2">
                      {t('aliases')}
                    </label>
                    <div className="col-md-10">
                      <input
                        type="text"
                        placeholder={t('input.filmAlia')}
                        {...register('biDanh', {
                          required: true,
                        })}
                        className="form-control"
                      />
                      {errors?.biDanh?.type === 'required' && <p className="text-danger">{t('inputEmpty')}</p>}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="trailer" className="col-md-2">
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
                      {errors?.trailer?.type === 'required' && <p className="text-danger">{t('inputEmpty')}</p>}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="trailer" className="col-md-2">
                      {t('movieThumb')}
                    </label>
                    <div className="col-md-10">
                      <img
                        src={movie.hinhAnh}
                        alt=""
                        style={{ width: '200px', height: '250px', marginBottom: '10px' }}
                      />
                      <input type="file" {...register('hinhAnh')} className="form-control" />
                      {errors?.hinhAnh?.type === 'required' && <p className="text-danger">{t('inputEmpty')}</p>}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="maNhom" className="col-md-2">
                      {t('groupCode')}
                    </label>
                    <div className="col-md-10">
                      <input
                        type="text"
                        value={maNhom}
                        {...register('maNhom', {
                          required: true,
                        })}
                        className="form-control"
                      />
                      {errors?.maNhom?.type === 'required' && <p className="text-danger">{t('inputEmpty')}</p>}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="ngayKhoiChieu" className="col-md-2">
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
                      {errors?.ngayKhoiChieu?.type === 'required' && <p className="text-danger">{t('inputEmpty')}</p>}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="moTa" className="col-md-2">
                      {t('descript')}
                    </label>
                    <div className="col-md-10">
                      <textarea
                        type="text"
                        placeholder={t('input.filmDesc')}
                        {...register('moTa', {
                          required: true,
                        })}
                        className="form-control"
                      />
                      {errors?.moTa?.type === 'required' && <p className="text-danger">{t('inputEmpty')}</p>}
                    </div>
                  </div>
                  <div className="form-group add-movie text-center">
                    <button type="submit" className="btn btn-add">
                      {t('updatedFilm')}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
