import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';
import { storage } from '../../../utils/db';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import firseabse from '../../../utils/db';
import { collection, doc, setDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
const AddMovie24h = (props) => {
  const { reload } = props;
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

  const handleUpload = (value) => {
    if (singleImage === null) return;
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
          await setDoc(doc(collection(db, 'movie')), {
            title: value.title,
            thumb: downloadURL,
            content: value.content,
            release: new Date(),
          });
          Swal.fire({
            icon: 'success',
            title: 'Thêm tin tức phim thành công',
            showConfirmButton: false,
            timer: 1200,
          });
          reload();
          reset({
            title: '',
            content: '',
            thumb: '',
          });
        });
      },
    );
  };

  return (
    <div>
      <div className="modal fade" id="addmovie24h" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Thêm tin tức phim 24h
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
                      placeholder="Nhập tiêu đề tin tức"
                      {...register('title', {
                        required: true,
                      })}
                      className="form-control"
                    />
                    {errors?.title?.type === 'required' && <p className="text-danger">Vui lòng nhập tên tiêu đề</p>}
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="poster" className="col-md-2">
                    Poster
                  </label>
                  <div className="col-md-10">
                    <img
                      src={
                        poster
                          ? poster.image
                          : 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=859&q=80'
                      }
                      alt=""
                      style={{ width: '200px', height: '250px', marginBottom: '10px' }}
                    />
                    <input type="file" className="form-control" onChange={onImageChange} />
                    {errors?.thumb?.type === 'required' && <p className="text-danger">Vui lòng chọn hình</p>}
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
                    {errors?.content?.type === 'required' && <p className="text-danger">Vui lòng nhập nội dung</p>}
                  </div>
                </div>
                <div className="form-group add-movie text-center">
                  <button type="submit" className="btn btn-add">
                    Thêm tin tức
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddMovie24h;
