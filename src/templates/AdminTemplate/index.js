import React, { Fragment } from 'react';

const AdminTemplated = ({ children }) => {
  return (
    <Fragment>
      <Fragment>{children}</Fragment>
    </Fragment>
  );
};

export default AdminTemplated;
