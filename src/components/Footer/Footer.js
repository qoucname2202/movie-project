import React from 'react';
import { useTranslation } from 'react-i18next';
const Footer = () => {
  const { t } = useTranslation();
  return (
    <div>
      <footer className="footer">
        <div className="footer-infor">
          <div className="container">
            <div className="row">
              <div className="col-md-4 block-footer">
                <h4 className="ttl-4">{t('introduce')}</h4>
                <p>
                  <a href="!#">{t('aboutus')}</a>
                  <span>
                    <a href="!#">{t('term')}</a>
                  </span>
                </p>
                <p>
                  <a href="!#">{t('operating')}</a>
                  <span>
                    <a href="!#">{t('privacy')}</a>
                  </span>
                </p>
              </div>
              <div className="col-md-4 block-footer logo-brand">
                <h4 className="ttl-4">{t('bussiness')}</h4>
                <div className="row">
                  <div className="col">
                    <a href="#!">
                      <img src="../images/cgv.png" alt="logo-cgv" className="img-fluid" />
                    </a>
                  </div>
                  <div className="col">
                    <a href="#!">
                      <img src="../images/bhd.png" alt="logo-bhd" className="img-fluid" />
                    </a>
                  </div>
                  <div className="col">
                    <a href="#!">
                      <img src="../images/galaxycine.png" alt="log0-galaxycine" className="img-fluid" />
                    </a>
                  </div>
                  <div className="col">
                    <a href="#!">
                      <img src="../images/cinestar.png" alt="logo-cinestar" className="img-fluid" />
                    </a>
                  </div>
                  <div className="col">
                    <a href="#!">
                      <img src="../images/megags.png" alt="logo-megags" className="img-fluid" />
                    </a>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <a href="#!">
                      <img src="../images/bt.jpg" alt="logo-beta" className="img-fluid" />
                    </a>
                  </div>
                  <div className="col">
                    <a href="#!">
                      <img src="../images/dongdacinema.png" alt="logo-dongdacinema" className="img-fluid" />
                    </a>
                  </div>
                  <div className="col">
                    <a href="#!">
                      <img src="../images/TOUCH.png" alt="logo-touch" className="img-fluid" />
                    </a>
                  </div>
                  <div className="col">
                    <a href="#!">
                      <img src="../images/cnx.jpg" alt="logo-cnx" className="img-fluid" />
                    </a>
                  </div>
                  <div className="col">
                    <a href="#!">
                      <img src="../images/STARLIGHT.png" alt="logo-starlight" className="img-fluid" />
                    </a>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <a href="#!">
                      <img src="../images/dcine.png" alt="logo-dcine" className="img-fluid" />
                    </a>
                  </div>
                  <div className="col">
                    <a href="#!">
                      <img src="../images/lotte.png" alt="logo-lotte" className="img-fluid" />
                    </a>
                  </div>
                  <div className="col">
                    <a href="#!">
                      <img src="../images/payoo.jpg" alt="logo-payoo" className="img-fluid" />
                    </a>
                  </div>
                  <div className="col">
                    <a href="#!">
                      <img src="../images/zalopay_icon.png" alt="logo-zalopay" className="img-fluid" />
                    </a>
                  </div>
                  <div className="col">
                    <a href="#!">
                      <img src="../images/AGRIBANK.png" alt="logo-agribank" className="img-fluid" />
                    </a>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <a href="#!">
                      <img src="../images/VCB.png" alt="logo-vcb" className="img-fluid" />
                    </a>
                  </div>
                  <div className="col">
                    <a href="#!">
                      <img src="../images/VIETTINBANK.png" alt="logo-viettinbank" className="img-fluid" />
                    </a>
                  </div>
                  <div className="col">
                    <a href="#!">
                      <img src="../images/IVB.png" alt="logo-IVB" className="img-fluid" />
                    </a>
                  </div>
                  <div className="col">
                    <a href="#!">
                      <img src="../images/123go.png" alt="logo-go" className="img-fluid" />
                    </a>
                  </div>
                  <div className="col">
                    <a href="#!">
                      <img src="../images/laban.png" alt="logo-laban" className="img-fluid" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-4 block-footer">
                <div className="row">
                  <div className="col-md-6 social">
                    <h4 className="ttl-4">{t('mobile')}</h4>
                    <a href="#!">
                      <img src="../images/apple-logo.png" alt="logo-apple" className="img-fluid" />
                    </a>
                    <a href="#!">
                      <img src="../images/android-logo.png" alt="logo-android" className="img-fluid" />
                    </a>
                  </div>
                  <div className="col-md-6 social">
                    <h4 className="ttl-4">{t('social')}</h4>
                    <a href="#!">
                      <img src="../images/facebook-logo.png" alt="logo-facebook" className="img-fluid" />
                    </a>
                    <a href="#!">
                      <img src="../images/zalo-logo.png" alt="logo-zalo" className="img-fluid" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="f-infor-bottom">
              <div className="row">
                <div className="col-md-8">
                  <h4 className="ttl-4">BOOK MY FILM - {t('project')}</h4>
                  <p>{t('address')}</p>
                  <p>{t('phone')}: 0779382202</p>
                  <p>
                    Email:
                    <a href="mailto:duongquocnam224400@gmail.com" style={{ color: '#FB4226' }}>
                      duongquocnam224400@gmail.com
                    </a>
                  </p>
                  <p>
                    Github:
                    <a href="https://github.com/qoucname2202" style={{ color: '#FB4226' }}>
                      qoucname2202
                    </a>
                  </p>
                </div>
                <div className="col-md-4 text-center mt-5">
                  <a href="!#" className="img-fluid" rel="noreferrer">
                    <img src="../images/logo_1.png" alt="logo" className="img-fluid" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
