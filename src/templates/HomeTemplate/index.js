import React, { Fragment } from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

const HomeTemplated = ({ children }) => {
  return (
    <div>
      <Header />
      <Fragment>{children}</Fragment>
      <Footer />
    </div>
  );
};

export default HomeTemplated;
