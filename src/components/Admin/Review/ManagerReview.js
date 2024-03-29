import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Table, Image } from 'antd';
import 'antd/dist/antd.min.css';
// import { useTranslation } from 'react-i18next';
import { getAppReview, deleteAppReview } from '../../../utils/db';
import AddReview from './AddReview';
import EditReview from './EditReview';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';

const ManagerMovie24h = () => {
  const [table, setTable] = useState([]);
  const [filterTable, setFilterTable] = useState([]);
  const [movieNews, setMovieNews] = useState(null);
  const { t, i18n } = useTranslation();
  useEffect(() => {
    (async () => {
      let data = await getAppReview();
      data = data.map((item) => {
        return {
          ...item,
          key: item.id,
        };
      });
      setTable(data);
      setFilterTable(data);
    })();
  }, []);

  useEffect(() => {
    if (localStorage.getItem('i18nextLng') !== '') {
      i18n.changeLanguage(localStorage.getItem('i18nextLng'));
    } else {
      i18n.changeLanguage('en');
    }
  }, [i18n]);

  // reload page
  const reload = async () => {
    let data = await getAppReview();
    data = data.map((item) => {
      return {
        ...item,
        key: item.id,
      };
    });
    setTable(data);
    setFilterTable(data);
  };

  const xoa_dau = (str) => {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
    str = str.replace(/Đ/g, 'D');
    return str;
  };
  const handleChangeSearch = (e) => {
    const filter = table.filter((item) => {
      return xoa_dau(item.title.toLowerCase())?.includes(xoa_dau(e.target.value.toLowerCase()));
    });
    setFilterTable(filter);
  };

  const columns = [
    {
      title: t('reviews.title'),
      dataIndex: 'title',
      width: '20%',
    },
    {
      title: t('reviews.poster'),
      dataIndex: 'thumb',
      render: (item) => {
        return <Image key={item} width={100} src={item} />;
      },
      width: '20%',
    },

    {
      title: t('reviews.content'),
      dataIndex: 'content',
      width: '30%',
    },
    {
      title: t('reviews.timer'),
      dataIndex: 'release',
      render: (release) => {
        return <div>{moment(release.toDate()).format('DD-MM-YYYY HH:mm:ss')}</div>;
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
              className="btn btn-edit"
              type="button"
              data-toggle="modal"
              data-target="#editreview"
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
              await deleteAppReview(record.id);
              let data = await getAppReview();
              data = data.map((item) => {
                return {
                  ...item,
                  key: item.id,
                };
              });
              Swal.fire({
                icon: 'success',
                title: t('reviews.delete'),
                showConfirmButton: false,
                timer: 1200,
              });
              setTable(data);
              setFilterTable(data);
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
          <button className="btn btn-add" type="button" data-toggle="modal" data-target="#addreview">
            {t('reviews.addTitle')}
          </button>
        </div>
        <div className="col-md-6">
          <div className="form-group search-form d-flex">
            <input
              className="form-control"
              type="text"
              placeholder={t('reviews.search')}
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
        <AddReview reload={reload} />
      </div>
      <Table className="table table-manageruser" dataSource={filterTable}>
        {columns.map((col, index) => {
          return (
            <Table.Column
              key={index}
              width={col.width}
              title={col.title}
              dataIndex={col.dataIndex}
              render={col.render}
            />
          );
        })}
      </Table>
      <EditReview movieNews={movieNews} reload={reload} />
    </div>
  );
};

export default ManagerMovie24h;
