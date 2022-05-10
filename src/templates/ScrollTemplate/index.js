import React, { Fragment } from 'react';
import Footer from '../../components/Footer/Footer';
const ScroollTemplate = ({ children }) => {
  return (
    <Fragment>
      <Fragment>{children}</Fragment>
      <Footer />
    </Fragment>
  );
};

export default ScroollTemplate;
