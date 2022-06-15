import React from 'react';
import { useNavigate } from 'react-router-dom';
const Page404 = () => {
  const history = useNavigate();
  const handleBackHome = () => {
    history('/home');
  };
  return (
    <div className="main-404">
      <div className="wrapper-404">
        <h2 className="">Oops! Page not found.</h2>
        <div className="images">
          <img src="/images/404.svg" alt="logo_404" />
        </div>
        <h4 className="">We can't find the page you're looking for</h4>
        <button type="button" className="btn-backHome" onClick={handleBackHome}>
          GO BACK HOME
        </button>
      </div>
    </div>
  );
};

export default Page404;
