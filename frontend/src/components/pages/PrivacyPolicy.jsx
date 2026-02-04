import React from 'react';
import '../../styles/PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <section className="privacy-policy-page section">
      <div className="header-spacer"></div>
      
      <div className="container">
        <div className="section-header">
          <h1>Privacy Policy & Terms</h1>
          <p className="subtitle">Legal Information for Website Users</p>
        </div>
        
        <div className="policy-content">
          <div className="policy-section">
            <h2>Terms of Use</h2>
            <p>By accessing and using this website, you agree to comply with the following terms:</p>
            <ul>
              <li>The information provided on this website is for general informational purposes only and may not be up to date or applicable to your particular legal situation.</li>
              <li>Use of this website does not create a lawyer-client relationship. Any communication through this platform should not be considered confidential.</li>
              <li>KAP LEGAL LLP reserves the right to modify or update the website content and terms of use at any time without prior notice.</li>
              <li>Unauthorized use of the website's content, including reproduction or distribution, is prohibited.</li>
            </ul>
          </div>
          
          <div className="policy-section">
            <h2>Confidentiality Disclaimer</h2>
            <p>
              While KAP LEGAL LLP values your privacy and maintains strict confidentiality in client matters, any information you voluntarily submit through this website (e.g., contact forms, emails) will not be treated as confidential until a formal lawyer-client relationship is established. We advise users not to disclose sensitive or confidential information unless explicitly requested to do so by authorized firm representatives through secure channels.
            </p>
          </div>
          
          <div className="policy-section">
            <h2>Data Privacy Policy</h2>
            <p>KAP LEGAL LLP is committed to protecting your personal data in accordance with applicable privacy laws. This policy outlines how we collect, use, and safeguard your information:</p>
            <ul>
              <li>We collect only the minimum personal information necessary for communication and service provision, such as your name, contact details, and inquiry details.</li>
              <li>Personal data submitted via the website will be used strictly for responding to inquiries and providing legal services if engaged.</li>
              <li>We do not sell, trade, or share personal information with third parties except as required by law or with your consent.</li>
              <li>We implement reasonable security measures to protect your data from unauthorized access, alteration, or disclosure.</li>
              <li>By using our website, you consent to the collection and use of your information as described in this policy.</li>
              <li>You may request access to, correction, or deletion of your personal data by contacting us through official channels.</li>
            </ul>
          </div>
          
          <div className="policy-section">
            <h2>Contact Us</h2>
            <p>
              If you have any questions or concerns about our privacy policy or terms of use, please contact us at:
            </p>
            <div className="contact-info">
              <p><strong>Email:</strong> info@kjlawpartners.com</p>
              <p><strong>Phone:</strong> (555) 123-4567</p>
              <p><strong>Address:</strong> 123 Legal Avenue, Suite 500</p>
            </div>
          </div>
          
          <div className="policy-footer">
            <p>Last Updated: September 2025</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
