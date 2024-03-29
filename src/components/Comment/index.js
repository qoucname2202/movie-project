import React, { useState } from 'react';
import { updateLike } from '../../utils/db';
import { useNavigate } from 'react-router-dom';
export default function Comment(props) {
  const { user, comment, rating, idComment, like } = props.cmt;
  const [likeCmt, setLike] = useState(
    localStorage.getItem('taiKhoan') ? like.includes(JSON.parse(localStorage.getItem('taiKhoan')).taiKhoan) : false,
  );
  const history = useNavigate();

  const handleLike = () => {
    if (localStorage.getItem('taiKhoan')) {
      setLike(!likeCmt);
      updateLike(props.idMovie, idComment);
    } else {
      history('/login');
    }
  };
  // Rendering star
  const handelRenderStart = (rating) => {
    return Array.from({ length: rating }).map((_, index) => {
      return <i className="fa fa-star" style={{ fontSize: '13px' }} key={index} />;
    });
  };
  return (
    <div className="myreview">
      <div className="row">
        <div className="col-md-10 col-8">
          <div className="view-user">
            <img src="../images/userCatLovely.png" alt="logo_comment" />
            <span className="user">{user}</span>
          </div>
        </div>
        <div className="col-md-2 col-4 text-center inner-comment">
          <div className="comment">{handelRenderStart(rating)}</div>
        </div>
      </div>
      <span className="txt-think think-view">{comment}</span>
      <div className="like" onClick={handleLike}>
        <i className="far fa-thumbs-up like" style={{ color: like ? 'red' : '#495057' }}></i>
        <span>
          {like.length}
          {likeCmt ? '  Bỏ thích' : ' Thích'}
        </span>
      </div>
    </div>
  );
}
