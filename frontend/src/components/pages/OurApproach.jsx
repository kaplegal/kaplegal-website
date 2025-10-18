import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/OurApproach.css';

const OurApproach = () => {
  const [activeArea, setActiveArea] = useState('matrimonial');

  // Practice area data
  const practiceAreas = [
    {
      id: 'matrimonial',
      title: 'Matrimonial & Family Law',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
      content: [
        'Our firm provides comprehensive legal services in matrimonial and family law, addressing deeply personal and sensitive matters with empathy and professionalism. We assist clients with divorce petitions (mutual consent and contested), judicial separations, annulments, alimony and maintenance claims, child custody and visitation rights, adoption, and protection against domestic violence under applicable laws.',
        'Recognizing the emotional challenges involved, we strive to minimize conflict through mediation and negotiated settlements while fiercely protecting clients rights when required. Our expertise also extends to property disputes arising from matrimonial relations and guardianship matters.'
      ]
    },
    {
      id: 'corporate',
      title: 'Corporate Law',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        </svg>
      ),
      content: [
        'KJ LAW PARTNERS offers expert guidance in corporate law, assisting businesses of all sizes with formation, regulatory compliance, contracts, DRT and MSME matters, and real estate laws. We specialize in drafting and reviewing commercial agreements, conducting due diligence, and advising on legal risks to ensure your enterprise operates within the framework of Indian corporate statutes.',
        'Our client-centric approach helps companies navigate complex legal landscapes effectively, safeguarding their interests while promoting sustainable growth.'
      ]
    },
    {
      id: 'arbitration',
      title: 'Arbitration',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon>
          <line x1="12" y1="22" x2="12" y2="15.5"></line>
          <polyline points="22 8.5 12 15.5 2 8.5"></polyline>
        </svg>
      ),
      content: [
        'With extensive experience in arbitration proceedings, our team represents clients in both domestic and international arbitration forums. We assist in drafting arbitration agreements, initiating arbitration claims, and defending against arbitration petitions.',
        'Leveraging alternative dispute resolution mechanisms, we aim to provide quicker, cost-effective solutions while safeguarding client rights in commercial, contractual, and corporate disputes.'
      ]
    },
    {
      id: 'mediation',
      title: 'Mediation',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>
      ),
      content: [
        'Our mediation services focus on resolving conflicts amicably outside court through expert facilitation and negotiation. We specialize in matrimonial disputes, commercial disagreements, and workplace conflicts, including prevention of sexual harassment (POSH Act) matters.',
        'Our team works empathetically to foster dialogue, promote understanding, and reach mutually acceptable outcomes, thus saving time, costs, and emotional strain.'
      ]
    },
    {
      id: 'posh',
      title: 'POSH Act Compliance',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
          <line x1="6" y1="1" x2="6" y2="4"></line>
          <line x1="10" y1="1" x2="10" y2="4"></line>
          <line x1="14" y1="1" x2="14" y2="4"></line>
        </svg>
      ),
      content: [
        'We offer specialized advisory and compliance services under the Prevention of Sexual Harassment (POSH) Act. From drafting workplace policies to conducting internal inquiries and training sessions, we help organizations create safe, compliant work environments.',
        'Our approach balances legal requirements with sensitivity towards victims, ensuring fair processes that uphold dignity and respect.'
      ]
    },
    {
      id: 'criminal',
      title: 'Criminal Law',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 1v22"></path>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
      ),
      content: [
        'At KJ LAW PARTNERS, our criminal law practice is founded on decades of experience and a deep understanding of the intricacies of criminal justice. We specialize in defending clients in a wide range of criminal matters, with particular expertise in white collar crimes such as fraud, embezzlement, corporate misappropriation, and financial irregularities. Our rigorous, research-driven approach ensures thorough investigation and strong defense strategies tailored to each case.',
        'Additionally, we offer sensitive, compassionate, and vigilant representation in cases involving false rape allegations and related sexual offense matters. Understanding both the legal complexities and the personal toll of such cases, we aim to protect the rights and reputations of our clients while ensuring justice is served.',
        'The firm also extends its expertise to other criminal matters, including those involving the Protection of Children from Sexual Offenses (POCSO) Act, providing comprehensive representation from investigation stages to trial.'
      ]
    }
  ];

  // Find the currently active practice area
  const activeAreaData = practiceAreas.find(area => area.id === activeArea);

  return (
    <section className="practice-areas-page section">
      <div className="header-spacer"></div>
      
      <div className="container">
        <div className="section-header">
          <h1>Our Practice Areas</h1>
          <p className="subtitle">Experience, Integrity, and Resolution at Every Step</p>
        </div>
        
        <div className="practice-content">
          <div className="practice-intro">
            <p>
              At KJ LAW PARTNERS, we offer comprehensive legal services across multiple practice areas, 
              combining expertise with a client-centered approach to deliver effective legal solutions.
            </p>
          </div>
          
          <div className="practice-container">
            <div className="practice-sidebar">
              {practiceAreas.map(area => (
                <div 
                  key={area.id} 
                  className={`practice-tab ${activeArea === area.id ? 'active' : ''}`}
                  onClick={() => setActiveArea(area.id)}
                >
                  <div className="practice-tab-icon">{area.icon}</div>
                  <span>{area.title}</span>
                </div>
              ))}
            </div>
            
            <div className="practice-details">
              <div className="practice-header">
                <div className="practice-icon">{activeAreaData.icon}</div>
                <h2>{activeAreaData.title}</h2>
              </div>
              
              <div className="practice-description">
                {activeAreaData.content.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
          
          <div className="practice-cta">
            <div className="cta-content">
              <h2>Discuss Your Legal Needs</h2>
              <p>
                We invite you to schedule a consultation with our team to discuss your specific legal needs
                and how our expertise can help you achieve your objectives.
              </p>
              <Link to="/#contact" className="btn btn-primary">Contact Us Today</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurApproach;