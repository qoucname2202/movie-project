import React from "react";

const SearchHome = () => {
  return (
    <section className="search-home">
      <div className="container">
        <form className="form-search">
          <div className="select-item movieItem">
            <select name="movie-select">
              <option value="option1">Phim</option>
            </select>
          </div>
          <div className="select-item">
            <select name="cinema-select">
              <option value>Rạp</option>
            </select>
          </div>
          <div className="select-item">
            <select name="date-select">
              <option value>Ngày chiếu</option>
            </select>
          </div>
          <div className="select-item">
            <select name="time-select">
              <option value>Giờ chiếu</option>
            </select>
          </div>
          <div className="select-item item-booking">
            <button type="submit" className="btn-booking">
              Mua Vé Ngay
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SearchHome;
