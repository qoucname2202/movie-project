import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';
import { maNhom } from '../../configs/settings';
import { useDispatch } from 'react-redux';
import { editMovieAction } from '../../redux/actions/ListMovieAction';

export default function EditMovie(props) {
  const { movie } = props;
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

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
                  Cập nhật Phim
                </h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group row">
                    <label for="maPhim" className="col-md-2">
                      Mã phim
                    </label>
                    <div className="col-md-10">
                      <input
                        value="maPhim"
                        type="text"
                        placeholder="Nhập số"
                        {...register('maPhim', {})}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label for="tenPhim" className="col-md-2">
                      Tên phim
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
                      Bí danh
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
                      Trailer
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
                      Hình ảnh
                    </label>
                    <div className="col-md-10">
                      <img
                        src={movie.hinhAnh}
                        alt=""
                        style={{ width: '200px', height: '250px', marginBottom: '10px' }}
                      />
                      <input type="file" {...register('hinhAnh')} className="form-control" />
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
                      Ngày khởi chiếu
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
                      Cập nhật phim
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
