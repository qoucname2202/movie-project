import React, { Fragment } from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

const HomeTemplated = ({ children }) => {
  return (
    <Fragment>
      <Header />
      <Fragment>{children}</Fragment>
      <Footer />
    </Fragment>
  );
};

export default HomeTemplated;
