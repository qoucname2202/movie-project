import React, { Fragment } from 'react';
const Page404 = () => {
  return (
    <Fragment>
      <div className="wrapper">
        <div className="text">
          <p>404</p>
        </div>
        <div className="containers">
          {/* caveman left */}
          <div className="caveman">
            <div className="leg">
              <div className="foot">
                <div className="fingers" />
              </div>
            </div>
            <div className="leg">
              <div className="foot">
                <div className="fingers" />
              </div>
            </div>
            <div className="shape">
              <div className="circle" />
              <div className="circle" />
            </div>
            <div className="head">
              <div className="eye">
                <div className="nose" />
              </div>
              <div className="mouth" />
            </div>
            <div className="arm-right">
              <div className="club" />
            </div>
          </div>
          {/* caveman right */}
          <div className="caveman">
            <div className="leg">
              <div className="foot">
                <div className="fingers" />
              </div>
            </div>
            <div className="leg">
              <div className="foot">
                <div className="fingers" />
              </div>
            </div>
            <div className="shape">
              <div className="circle" />
              <div className="circle" />
            </div>
            <div className="head">
              <div className="eye">
                <div className="nose" />
              </div>
              <div className="mouth" />
            </div>
            <div className="arm-right">
              <div className="club" />
            </div>
          </div>
        </div>
        <a
          href="https://codepen.io/SofiaSergio/"
          target="_blank"
          rel="noreferrer"
        >
          <div id="link">
            <i className="fab fa-codepen" />
          </div>
        </a>
      </div>
    </Fragment>
  );
};

export default Page404;
