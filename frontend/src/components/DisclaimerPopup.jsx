import React from 'react';
import '../styles/DisclaimerPopup.css';

const DisclaimerPopup = ({ onAccept }) => {
  return (
    <div className="disclaimer-overlay">
      <div className="disclaimer-popup">
        <div className="disclaimer-content">
          <h2>Disclaimer Regarding Advertising</h2>
          <p>
            In accordance with the Bar Council of India Rules, this website is intended for informational 
            purposes only and does not constitute an advertisement or solicitation of work. The content 
            provided here is not to be construed as legal advice and does not establish a lawyer-client 
            relationship.
          </p>
          <p>
            KJ LAW PARTNERS strictly adheres to the ethical standards laid down by the Bar Council of India 
            and does not engage in any form of unethical solicitation or advertising. Visitors are encouraged 
            to seek professional legal advice tailored to their specific circumstances.
          </p>
          <div className="disclaimer-actions">
            <button className="btn btn-primary" onClick={onAccept}>
              I Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerPopup;
