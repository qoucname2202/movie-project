import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getAppMovie, getAppReview, getAppDiscount } from '../../utils/db';
import moment from 'moment';
const News = ({ reful }) => {
  const { t } = useTranslation();
  const [movieNews, setMovieNews] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  useEffect(() => {
    (async () => {
      let data = await getAppMovie();
      data = data.map((item) => {
        return {
          ...item,
          key: item.id,
        };
      });
      setMovieNews(data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let data = await getAppReview();
      data = data.map((item) => {
        return {
          ...item,
          key: item.id,
        };
      });
      setReviews(data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let data = await getAppDiscount();
      data = data.map((item) => {
        return {
          ...item,
          key: item.id,
        };
      });
      setDiscounts(data);
    })();
  }, []);

  return (
    <section className="block-news" id="view" ref={reful}>
      <div className="container">
        <ul className="nav nav-pills" id="pills-tab" role="tablist">
          <li className="nav-item" role="presentation">
            <a
              className="nav-link active btn-all"
              id="cinema-24h"
              data-toggle="tab"
              href="#cinema-24h-show"
              role="tab"
              aria-controls="cinema-24h-show"
            >
              {t('movienews')}
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a
              className="nav-link btn-all"
              id="revies-tab"
              data-toggle="tab"
              href="#revies-tab-show"
              role="tab"
              aria-controls="revies-tab-show"
            >
              {t('review')}
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a
              className="nav-link btn-all"
              id="sales-tab"
              data-toggle="tab"
              href="#sales-tab-show"
              role="tab"
              aria-controls="sales-tab-show"
            >
              {t('promotion')}
            </a>
          </li>
        </ul>
        <div className="tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="cinema-24h-show"
            role="tabpanel"
            aria-labelledby="cinema-24h-show"
          >
            <div className="row">
              {movieNews.length > 0 &&
                movieNews.map((item, index) => {
                  return (
                    <div className="col-md-6 block-news-img" key={item.key}>
                      <img src={item.thumb} alt="" className="img-fluid" />
                      <a href="#!" className="ttl">
                        {item.title}
                      </a>
                      <p className="txt">{item.content}</p>
                      <p className="icon-comment">
                        <i class="fa fa-calendar-alt">
                          <span className="ml-2">{moment(item.release.toDate()).format('DD-MM-YYYY')}</span>
                        </i>
                        <i class="fa fa-clock">
                          <span className="ml-2">{moment(item.release.toDate()).format('HH:mm:ss')}</span>
                        </i>
                      </p>
                    </div>
                  );
                })}
            </div>
            <div className="read-more text-center">
              <button className="btn btn-read-more">{t('viewmore')}</button>
            </div>
          </div>
          <div className="tab-pane fade" id="revies-tab-show" role="tabpanel" aria-labelledby="revies-tab-show">
            <div className="row">
              {reviews.length > 0 &&
                reviews.map((item, index) => {
                  return (
                    <div className="col-md-6 block-news-img" key={item.key}>
                      <img src={item.thumb} alt="" className="img-fluid" />
                      <a href="#!" className="ttl">
                        {item.title}
                      </a>
                      <p className="txt">{item.content}</p>
                      <p className="icon-comment">
                        <i class="fa fa-calendar-alt">
                          <span className="ml-2">{moment(item.release.toDate()).format('DD-MM-YYYY')}</span>
                        </i>
                        <i class="fa fa-clock">
                          <span className="ml-2">{moment(item.release.toDate()).format('HH:mm:ss')}</span>
                        </i>
                      </p>
                    </div>
                  );
                })}
            </div>

            <div className="read-more text-center">
              <button className="btn btn-read-more">{t('viewmore')}</button>
            </div>
          </div>
          <div className="tab-pane fade" id="sales-tab-show" role="tabpanel" aria-labelledby="sales-tab-show">
            <div className="row">
              {discounts.length > 0 &&
                discounts.map((item, index) => {
                  return (
                    <div className="col-md-6 block-news-img" key={item.key}>
                      <img src={item.thumb} alt="" className="img-fluid" />
                      <a href="#!" className="ttl">
                        {item.title}
                      </a>
                      <p className="txt">{item.content}</p>
                      <p className="icon-comment">
                        <i class="fa fa-calendar-alt">
                          <span className="ml-2">{moment(item.release.toDate()).format('DD-MM-YYYY')}</span>
                        </i>
                        <i class="fa fa-clock">
                          <span className="ml-2">{moment(item.release.toDate()).format('HH:mm:ss')}</span>
                        </i>
                      </p>
                    </div>
                  );
                })}
            </div>

            <div className="read-more text-center">
              <button className="btn btn-read-more">{t('viewmore')}</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default News;
