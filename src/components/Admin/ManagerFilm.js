import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteMovieAction, listMovieShowAction } from '../../redux/actions/ListMovieAction';
import moment from 'moment';
import ModalShowCalendar from './ModalShowCalendar';
import AddMovie from './AddMovie';
import { Image, Table } from 'antd';
import 'antd/dist/antd.min.css';
import EditMovie from './EditMovie';
import { useTranslation } from 'react-i18next';

const ManagerFilm = (props) => {
  const { listMovieShow } = useSelector((state) => state.ListMovieReducer);
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.UserReducer);
  const { t, i18n } = useTranslation();
  const [dsFilm, setDSFilm] = useState([]);
  const [keyWord, setKeyWord] = useState(null);
  const [temp, setTemp] = useState(-1);
  const [maPhimSelected, setMaPhimSelected] = useState('');
  const [movie, setMovie] = useState(null);
  // View movie list
  useEffect(() => {
    if (listMovieShow?.length > 0) {
      if (temp > 0) {
        setDSFilm(dsFilm);
      } else setDSFilm(listMovieShow);
    }
  }, [listMovieShow]);

  // Search movie by key word
  useEffect(() => {
    if (keyWord) {
      if (keyWord.length > 0) {
        let dsPhim = listMovieShow?.filter((item) => {
          return item.tenPhim.toLowerCase().includes(keyWord.toLowerCase());
        });
        setDSFilm(dsPhim);
        setTemp(temp + 1);
      }
    } else {
      setDSFilm(listMovieShow);
    }
  }, [keyWord]);

  useEffect(() => {
    dispatch(listMovieShowAction());
  }, []);

  useEffect(() => {
    if (localStorage.getItem('i18nextLng') !== '') {
      i18n.changeLanguage(localStorage.getItem('i18nextLng'));
    } else {
      i18n.changeLanguage('en');
    }
  }, [i18n]);

  const handleMaPhimChange = (maPhim) => {
    setMaPhimSelected(maPhim);
  };

  const handleChangeSearch = (e) => {
    setKeyWord(e.target.value);
  };

  const columns = [
    {
      title: 'movieCode',
      dataIndex: 'maPhim',
      width: '10%',
    },
    {
      title: 'movieName',
      dataIndex: 'tenPhim',
      width: '30%',
    },
    {
      title: 'movieThumb',
      dataIndex: 'hinhAnh',
      render: (item) => {
        return <Image key={item} width={50} src={item} />;
      },
      width: '20%',
    },
    {
      title: 'rating',
      dataIndex: 'danhGia',
      width: '10%',
    },
    {
      title: 'release',
      dataIndex: 'ngayKhoiChieu',
      render: (ngayKhoiChieu) => {
        return <div>{moment(ngayKhoiChieu).format('DD-MM-YYYY')}</div>;
      },
      width: '20%',
    },
    {
      title: '',
      dataIndex: 'action1',
      render: (item, record) => (
        <div className="inner-button">
          <div className="block">
            <button
              onClick={() => {
                handleMaPhimChange(record.maPhim);
              }}
              className="btn"
              type="button"
              data-toggle="modal"
              data-target="#showcalendar"
            >
              <i className="far fa-plus-square"></i>
            </button>
          </div>
          <div className="block">
            <button
              className="btn btn-edit"
              type="button"
              data-toggle="modal"
              data-target="#editmovie"
              onClick={() => {
                setMovie(record);
              }}
            >
              <i className="far fa-edit"></i>
            </button>
          </div>
          <button
            className="btn-delete btn"
            type="submit"
            onClick={() => {
              dispatch(deleteMovieAction(record.maPhim, accessToken));
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
      <div className="inner-add row">
        <div className="col-md-6">
          <button className="btn btn-add" type="button" data-toggle="modal" data-target="#addmovie">
            {t('add.movie')}
          </button>
        </div>
        <div className="col-md-6">
          <div className="form-group search-form d-flex">
            <input
              className="form-control"
              type="text"
              placeholder={t('search.movie')}
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
      </div>
      <div className="user-header inner-button ad-movie">
        <AddMovie />
      </div>

      <Table className="table table-manageruser" dataSource={dsFilm}>
        {columns.map((col, index) => {
          return <Table.Column key={index} title={t(col.title)} dataIndex={col.dataIndex} render={col.render} />;
        })}
      </Table>
      <ModalShowCalendar maPhim={maPhimSelected} />
      <EditMovie movie={movie} />
    </div>
  );
};
export default ManagerFilm;
