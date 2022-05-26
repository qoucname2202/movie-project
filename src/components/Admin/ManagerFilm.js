import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteMovieAction, listMovieShowAction } from '../../redux/actions/ListMovieAction';
import moment from 'moment';
import ModalShowCalendar from './ModalShowCalendar';
import AddMovie from './AddMovie';
import { Image, Table } from 'antd';
import 'antd/dist/antd.css';
import EditMovie from './EditMovie';

export default function ManagerFilm(props) {
  const { listMovieShow } = useSelector((state) => state.ListMovieReducer);
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.UserReducer);

  /**seach movie */
  // const [keyWord, setKeyWord] = useState('');
  const [dsFilm, setDSFilm] = useState([]);
  const [keyWord, setKeyWord] = useState(null);
  const [temp, setTemp] = useState(-1);
  const [maPhimSelected, setMaPhimSelected] = useState('');
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    if (listMovieShow?.length > 0) {
      if (temp > 0) {
        setDSFilm(dsFilm);
      } else setDSFilm(listMovieShow);
    }
  });
  useEffect(() => {
    if (keyWord) {
      if (keyWord.length > 0) {
        let dsPhim = listMovieShow?.filter((item) => {
          return item.tenPhim.toLowerCase().indexOf(keyWord.toLowerCase()) >= 0;
        });

        setDSFilm(dsPhim);
        setTemp(temp + 1);
      }
    }
    // console.log(keyWord);
  }, [keyWord]);

  useEffect(() => {
    dispatch(listMovieShowAction());
  }, []);

  const handleMaPhimChange = (maPhim) => {
    setMaPhimSelected(maPhim);
  };

  const handleChangeSearch = (e) => {
    setKeyWord(e.target.value);
  };

  const columns = [
    {
      title: 'Mã phim',
      dataIndex: 'maPhim',
    },
    {
      title: 'Tên phim',
      dataIndex: 'tenPhim',
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'hinhAnh',
      render: (item) => {
        return <Image key={item} width={35} src={item} />;
      },
    },
    {
      title: 'Đánh giá',
      dataIndex: 'danhGia',
    },
    {
      title: 'Ngày khởi chiếu',
      dataIndex: 'ngayKhoiChieu',
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
              <i class="far fa-plus-square"></i>
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
              <i class="far fa-edit"></i>
            </button>
          </div>
          <button
            className="btn-delete btn"
            type="submit"
            onClick={() => {
              dispatch(deleteMovieAction(record.maPhim, accessToken));
            }}
          >
            <i class="far fa-trash-alt"></i>
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
            Thêm phim
          </button>
        </div>
        <div className="col-md-6">
          <div className="form-group search-form d-flex">
            <input
              className="form-control"
              type="text"
              placeholder="Search for name film ..."
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
      <Table className="table table-manageruser" columns={columns} dataSource={dsFilm}></Table>
      <ModalShowCalendar maPhim={maPhimSelected} />
      <EditMovie movie={movie} />
    </div>
  );
}
