import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import MomentTZ from 'moment-timezone';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import {
  ListLogoAction,
  ListCenemaShowAction,
  CreateMovieShowTimeAction,
  GetTimeShowMovieAction,
} from '../../redux/actions/ShowTimeMovieAction';

// Yup validateion schema

export default function ModalShowCalendar(props) {
  let { maPhim } = props;
  const { listLogoMovie, listCinema, listTimeShowMovie } = useSelector((state) => state.ShowTimeMovieReducer);
  const [listRap, setListRap] = useState([]);
  const { t, i18n } = useTranslation();
  const schema = yup
    .object({
      heThongRap: yup.string().required(t('theaterSystem.empty')),
      cumRap: yup.string().required(t('theaterCluster.empty')),
      rap: yup.string().required(t('cinemaEmpty')),
      thoiGianChieu: yup.number().required(t('showTimesEmpty')),
      giaVe: yup.number().required(t('fareEmpty')),
    })
    .required();
  const dispatch = useDispatch();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    dispatch(ListLogoAction());
    dispatch(ListCenemaShowAction('BHDStar'));
    dispatch(GetTimeShowMovieAction(maPhim));
    // dispatch(detailsMoviesAction())
  }, [maPhim]);

  useEffect(() => {
    if (listCinema && listCinema.length > 0) {
      setListRap([...listCinema[0].danhSachRap]);
    }
  }, [listCinema]);

  useEffect(() => {
    if (localStorage.getItem('i18nextLng') !== '') {
      i18n.changeLanguage(localStorage.getItem('i18nextLng'));
    } else {
      i18n.changeLanguage('en');
    }
  }, []);

  // Lấy tên hệ thống rạp
  const renderHeThongRap = () => {
    return listLogoMovie?.map((item, index) => {
      return (
        <option key={index} value={item.maHeThongRap}>
          {item.tenHeThongRap}
        </option>
      );
    });
  };
  //Lấy cụm rạp
  const renderCumRap = () => {
    return listCinema?.map((item, index) => {
      return (
        <option key={index} value={item.maCumRap}>
          {item.tenCumRap}
        </option>
      );
    });
  };

  const renderRap = () => {
    return listRap?.map((item, index) => {
      return (
        <option key={index} value={item.maRap}>
          {item.tenRap}
        </option>
      );
    });
  };

  const handleChangeHeThong = (e) => {
    let maHeThongRap = e.target.value;
    setListRap([]);
    dispatch(ListCenemaShowAction(maHeThongRap));
  };
  const handleChangeCumRap = (e) => {
    let maCumRap = e.target.value;
    let index = listCinema?.findIndex((item1, index) => item1.maCumRap === maCumRap);
    if (index !== -1) {
      setListRap([...listCinema[index].danhSachRap]);
    }
  };

  // Validate form
  const heThongRapVal = register('heThongRap', {
    onChange: (e) => {
      handleChangeHeThong(e);
    },
  });
  const cumRapVal = register('cumRap', {
    onChange: (e) => {
      handleChangeCumRap(e);
    },
  });
  const rapVal = register('rap');
  const thoiGianChieuVal = register('thoiGianChieu');
  const giaVeVal = register('giaVe');

  // Submit form
  const onSubmit = (data) => {
    let formarDate = moment(data['date-input']).format('DD/MM/YYYY HH:mm:ss');
    let newTimeShow = {
      maPhim: parseInt(maPhim),
      ngayChieuGioChieu: formarDate.toString(),
      maRap: parseInt(data.rap),
      giaVe: data.giaVe,
    };
    dispatch(CreateMovieShowTimeAction(newTimeShow));
  };

  const handleOnShow = () => {
    console.log(listTimeShowMovie);
  };
  // console.log(listTimeShowMovie);
  return (
    <div
      onClick={handleOnShow}
      className="modal fade modal-calendar"
      id="showcalendar"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {t('showtimes')}
            </h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            {listLogoMovie && listCinema && listTimeShowMovie && listLogoMovie.length > 0 && listCinema.length > 0 && (
              <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="row form-group">
                      <div className="item-label col-md-3">
                        <label htmlFor="">{t('theaterSystem.title')}</label>
                      </div>
                      <div className="select-setion col-md-9">
                        <select
                          onChange={handleChangeHeThong}
                          className="form-control"
                          {...heThongRapVal}
                          placeholder={t('theaterSystem.choosen')}
                        >
                          {renderHeThongRap()}
                        </select>
                      </div>
                    </div>
                    <div className="row form-group">
                      <div className="item-label col-md-3">
                        <label htmlFor="">{t('theaterCluster.title')}</label>
                      </div>
                      <div className="select-setion col-md-9">
                        <select
                          onChange={handleChangeCumRap}
                          className="form-control"
                          {...cumRapVal}
                          placeholder={t('theaterCluster.choosen')}
                        >
                          {renderCumRap()}
                        </select>
                      </div>
                    </div>
                    <div className="row form-group">
                      <div className="item-label col-md-3">
                        <label htmlFor="">{t('cinema')}</label>
                      </div>
                      <div className="select-setion col-md-9">
                        <select className="form-control" {...rapVal} placeholder={t('cinemaEmpty')}>
                          {renderRap()}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="row form-group">
                      <div className="item-label col-md-3">
                        <label htmlFor="ngayChieuGioChieu">{t('release')}</label>
                      </div>
                      <div className="select-setion col-md-9">
                        <Controller
                          control={control}
                          name="date-input"
                          render={({ field }) => (
                            <DatePicker
                              placeholderText={t('showTimesEmpty')}
                              onChange={(date) => {
                                field.onChange(date);
                              }}
                              showTimeSelect
                              timeFormat="HH:mm"
                              timeIntervals={15}
                              selected={field.value}
                              dateFormat="dd/MM/yyyy"
                            />
                          )}
                        />
                      </div>
                    </div>
                    <div className="row form-group">
                      <div className="item-label col-md-3">
                        <label htmlFor="">{t('runtime')}</label>
                      </div>
                      <div className="select-setion col-md-9">
                        <select className="form-control" {...thoiGianChieuVal} placeholder={t('timeEmpty')}>
                          <option value={75}>75 {t('minutes')}</option>
                          <option value={120}>120 {t('minutes')}</option>
                          <option value={136}>136 {t('minutes')}</option>
                        </select>
                      </div>
                    </div>

                    <div className="row form-group">
                      <div className="item-label col-md-3">
                        <label htmlFor="">{t('fare')}</label>
                      </div>
                      <div className="select-setion col-md-9">
                        <select className="form-control" placeholder={t('fareEmpty')} {...giaVeVal}>
                          <option value={75000}>75000</option>
                          <option value={90000}>90000</option>
                          <option value={120000}>120000</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="btn-item">
                    <button type="submit" className="btn btn-add text-white">
                      {t('createShowTime')}
                    </button>
                  </div>
                </div>
                {/* show infor calendar */}
                <div className="select-infor">
                  <h2 className="ttl-2">{t('showtimerMovieMess')}</h2>
                  <table className="table table-show-infor">
                    <thead>
                      <tr>
                        <th>{t('showtimerCode')}</th>
                        <th>{t('showtimeDate')}</th>
                        <th>{t('fare')}</th>
                        <th>{t('runtime')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listTimeShowMovie &&
                        listTimeShowMovie.heThongRapChieu &&
                        listTimeShowMovie.heThongRapChieu.length > 0 &&
                        listTimeShowMovie.heThongRapChieu[0].cumRapChieu[0].lichChieuPhim.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td>{item.maLichChieu}</td>
                              <td>
                                {MomentTZ(item.ngayChieuGioChieu).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY HH:mm')}
                              </td>
                              <td>
                                {item.giaVe.toLocaleString('vi-VN', {
                                  style: 'currency',
                                  currency: 'VND',
                                })}
                              </td>
                              <td>
                                {item.thoiLuong} {t('minutes')}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
                {/* end show infor calendar */}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
