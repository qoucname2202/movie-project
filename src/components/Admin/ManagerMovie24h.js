import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Table, Image } from 'antd';
import 'antd/dist/antd.min.css';
// import { useTranslation } from 'react-i18next';
import { getAppMovie, deleteAppMovie } from '../../utils/db';
import AddMovie24h from './AddMovie24h';
import EditMovie24h from './EditMovie24h';

const ManagerMovie24h = () => {
  const [table, setTable] = useState([]);
  const [movieNews, setMovieNews] = useState(null);
  useEffect(() => {
    (async () => {
      let data = await getAppMovie();
      data = data.map((item) => {
        return {
          ...item,
          key: item.id,
        };
      });
      setTable(data);
    })();
  }, [table]);

  const columns = [
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      width: '20%',
    },
    {
      title: 'Poster',
      dataIndex: 'thumb',
      render: (item) => {
        return <Image key={item} width={50} src={item} />;
      },
      width: '20%',
    },
    {
      title: 'Nội dung',
      dataIndex: 'content',
      width: '30%',
    },
    {
      title: '',
      dataIndex: 'action1',
      render: (item, record) => (
        <div className="inner-button">
          <div className="block">
            <button
              className="btn btn-edit"
              type="button"
              data-toggle="modal"
              data-target="#editmovie24h"
              onClick={() => {
                setMovieNews(record);
              }}
            >
              <i className="far fa-edit"></i>
            </button>
          </div>
          <button
            className="btn-delete btn"
            type="submit"
            onClick={async () => {
              // console.log(record);
              await deleteAppMovie(record.id);
              let data = await getAppMovie();
              data = data.map((item) => {
                return {
                  ...item,
                  key: item.id,
                };
              });
              setTable(data);
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
          <button className="btn btn-add" type="button" data-toggle="modal" data-target="#addmovie24h">
            Thêm tin tức phim 24h
          </button>
        </div>
        <div className="col-md-6">
          <div className="form-group search-form d-flex">
            <input
              className="form-control"
              type="text"
              placeholder="Tìm kiếm tiêu đề phim 24h...."
              aria-label="Search"
              aria-describedby="basic-addon2"
              // onChange={handleChangeSearch}
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
        <AddMovie24h />
      </div>
      <Table className="table table-manageruser" dataSource={table}>
        {columns.map((col, index) => {
          return <Table.Column key={index} title={col.title} dataIndex={col.dataIndex} render={col.render} />;
        })}
      </Table>
      <EditMovie24h movieNews={movieNews} />
    </div>
  );
};

export default ManagerMovie24h;
