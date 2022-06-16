import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';
import { storage, updateAppDiscount } from '../../../utils/db';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import firseabse from '../../../utils/db';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';

const EditPromotion = (props) => {
  const { movieNews, reload } = props;
  const db = firseabse;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [poster, setPoster] = useState({});
  const [singleImage, setSingleImage] = useState('');

  // const { t, i18n } = useTranslation();

  // useEffect(() => {
  //   if (localStorage.getItem('i18nextLng') !== '') {
  //     i18n.changeLanguage(localStorage.getItem('i18nextLng'));
  //   } else {
  //     i18n.changeLanguage('en');
  //   }
  // }, []);

  useEffect(() => {
    reset(movieNews);
  }, [movieNews]);

  const onImageChange = (e) => {
    e.preventDefault();
    let pickedFile;
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      pickedFile = e.target.files[0];
      setSingleImage(pickedFile);
      reader.onload = (e) => {
        setPoster({ image: e.target.result });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  // Upload images
  const metadata = {
    contentType: 'image/jpeg',
  };

  const handleUpload = async (value) => {
    if (singleImage === '') {
      delete value.key;
      await updateAppDiscount({
        ...value,
        release: new Date(),
      });
      Swal.fire({
        icon: 'success',
        title: 'Cập nhật thông tin khuyễn mãi thành công',
        showConfirmButton: false,
        timer: 1200,
      });
      reload();
      return;
    } else {
      const storageRef = ref(storage, 'images/' + uuidv4());
      const uploadTask = uploadBytesResumable(storageRef, singleImage, metadata);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          console.log(error);
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            delete value.key;
            await updateAppDiscount({
              ...value,
              thumb: downloadURL,
              release: new Date(),
            });
            Swal.fire({
              icon: 'success',
              title: 'Cập nhật tin khuyến mãi thành công',
              showConfirmButton: false,
              timer: 1200,
            });
            reload();
          });
        },
      );
    }
  };

  return (
    <div className="block">
      {movieNews ? (
        <div className="modal fade" id="editpromotion" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Cập nhật thông tin khuyến mãi
                </h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit(handleUpload)}>
                  <div className="form-group row">
                    <label htmlFor="title" className="col-md-2">
                      Tiêu đề
                    </label>
                    <div className="col-md-10">
                      <input
                        type="text"
                        placeholder="Nhập tiêu đề"
                        {...register('title', {
                          required: true,
                        })}
                        className="form-control"
                      />
                      {errors?.biDanh?.type === 'required' && <p className="text-danger">Vui lòng nhập tên tiêu đề</p>}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="poster" className="col-md-2">
                      Poster
                    </label>
                    <div className="col-md-10">
                      <img
                        src={poster.image || movieNews.thumb}
                        alt=""
                        style={{ width: '200px', height: '250px', marginBottom: '10px' }}
                      />
                      <input type="file" className="form-control" onChange={onImageChange} />
                      {/* {errors?.hinhAnh?.type === 'required' && <p className="text-danger">Vui lòng chọn</p>} */}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="content" className="col-md-2">
                      Nội dung
                    </label>
                    <div className="col-md-10">
                      <textarea
                        type="text"
                        placeholder="Nội dung"
                        {...register('content', {
                          required: true,
                        })}
                        className="form-control"
                      />
                      {errors?.moTa?.type === 'required' && <p className="text-danger">Vui lòng nhập nội dung</p>}
                    </div>
                  </div>
                  <div className="form-group add-movie text-center">
                    <button type="submit" className="btn btn-add">
                      Cập nhật
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
};
export default EditPromotion;
