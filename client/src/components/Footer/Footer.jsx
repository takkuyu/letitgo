import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="footer_content">
              <div className="footer_logo">Letitgo.</div>
              <div className="copyright">
                © 2021 - Developed by Takaya Hirose
              </div>
              <div className="footer_social">
                <ul>
                  <li>
                    <i className="fab fa-pinterest" aria-hidden="true" />
                  </li>
                  <li>
                    <i className="fab fa-instagram" aria-hidden="true" />
                  </li>
                  <li>
                    <i className="fab fa-facebook" aria-hidden="true" />
                  </li>
                  <li>
                    <i className="fab fa-twitter" aria-hidden="true" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
