require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const Blog = require('../models/Blog');

const sampleBlogs = [
  {
    title: 'Understanding Corporate Law in India',
    slug: 'understanding-corporate-law-in-india',
    category: 'Corporate Law',
    content: `Corporate law in India is governed by the Companies Act, 2013, which replaced the Companies Act, 1956. This comprehensive legislation regulates the incorporation, functioning, and winding up of companies in India.

Key aspects of corporate law include:

1. Company Formation and Registration
The process of incorporating a company involves several steps including obtaining a Digital Signature Certificate (DSC), Director Identification Number (DIN), name approval, and filing incorporation documents with the Registrar of Companies (ROC).

2. Corporate Governance
Companies must adhere to strict governance norms including board meetings, annual general meetings, maintenance of statutory registers, and compliance with various reporting requirements.

3. Mergers and Acquisitions
The Companies Act provides detailed provisions for mergers, amalgamations, and acquisitions, ensuring fair treatment of shareholders and creditors.

4. Compliance Requirements
Companies must file various returns and documents with ROC, maintain proper books of accounts, and undergo statutory audits.

Understanding these aspects is crucial for businesses operating in India to ensure legal compliance and smooth operations.`,
    summary: 'A comprehensive guide to corporate law in India, covering company formation, governance, M&A, and compliance requirements under the Companies Act, 2013.',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
    author: 'KAP LEGAL LLP',
    isPublished: true,
    publishedAt: new Date('2024-10-15')
  },
  {
    title: 'Intellectual Property Rights: A Complete Guide',
    slug: 'intellectual-property-rights-complete-guide',
    category: 'Intellectual Property',
    content: `Intellectual Property Rights (IPR) are crucial for protecting innovations, creative works, and brand identity. In India, IPR is governed by various statutes including the Patents Act, Trade Marks Act, Copyright Act, and Designs Act.

Types of Intellectual Property:

1. Patents
Patents protect inventions and grant exclusive rights to the inventor for 20 years. The Patents Act, 1970 governs patent law in India.

2. Trademarks
Trademarks protect brand names, logos, and other distinctive signs. Registration provides exclusive rights for 10 years, renewable indefinitely.

3. Copyrights
Copyrights protect original literary, dramatic, musical, and artistic works. Protection lasts for the lifetime of the author plus 60 years.

4. Designs
Industrial designs protect the aesthetic appearance of products. Registration provides protection for 15 years.

5. Trade Secrets
Confidential business information that provides competitive advantage can be protected through non-disclosure agreements and employment contracts.

Importance of IPR:
- Encourages innovation and creativity
- Provides competitive advantage
- Enables monetization of intellectual assets
- Protects against infringement

Businesses should develop comprehensive IP strategies to protect their innovations and creative works effectively.`,
    summary: 'Everything you need to know about Intellectual Property Rights in India, including patents, trademarks, copyrights, and designs.',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80',
    author: 'KAP LEGAL LLP',
    isPublished: true,
    publishedAt: new Date('2024-10-20')
  },
  {
    title: 'Employment Law Essentials for Businesses',
    slug: 'employment-law-essentials-for-businesses',
    category: 'Employment Law',
    content: `Employment law in India is complex, with multiple central and state legislations governing the employer-employee relationship. Understanding these laws is essential for businesses to ensure compliance and maintain harmonious workplace relations.

Key Employment Laws:

1. Industrial Disputes Act, 1947
Governs resolution of industrial disputes, layoffs, retrenchment, and closure of establishments.

2. Employees' Provident Funds Act, 1952
Mandates provident fund contributions for employees' retirement benefits.

3. Employees' State Insurance Act, 1948
Provides medical and cash benefits to employees in case of sickness, maternity, and employment injury.

4. Payment of Gratuity Act, 1972
Ensures payment of gratuity to employees who have completed five years of service.

5. Minimum Wages Act, 1948
Fixes minimum wages for different categories of workers.

6. Payment of Bonus Act, 1965
Mandates payment of annual bonus to employees.

Recent Developments:
The government has introduced four Labour Codes to consolidate and simplify existing labour laws:
- Code on Wages, 2019
- Industrial Relations Code, 2020
- Code on Social Security, 2020
- Occupational Safety, Health and Working Conditions Code, 2020

Compliance Tips:
- Maintain proper employment records
- Ensure timely statutory payments
- Draft clear employment contracts
- Implement workplace policies
- Conduct regular compliance audits

Businesses must stay updated with employment law changes to avoid legal disputes and penalties.`,
    summary: 'A practical guide to employment law in India, covering key legislations, recent labour code reforms, and compliance requirements for businesses.',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80',
    author: 'KAP LEGAL LLP',
    isPublished: true,
    publishedAt: new Date('2024-10-25')
  },
  {
    title: 'Real Estate Law: Rights and Regulations',
    slug: 'real-estate-law-rights-and-regulations',
    category: 'Real Estate Law',
    content: `Real estate transactions in India involve complex legal procedures and regulations. The Real Estate (Regulation and Development) Act, 2016 (RERA) has brought significant reforms to protect homebuyers and ensure transparency.

Key Aspects of Real Estate Law:

1. RERA Compliance
All real estate projects must be registered with RERA. Developers must:
- Disclose project details on RERA website
- Maintain 70% of funds in separate escrow account
- Complete projects within specified timelines
- Provide possession as per agreement

2. Property Documentation
Essential documents include:
- Title deeds
- Sale agreement
- Encumbrance certificate
- Property tax receipts
- Occupancy certificate
- Completion certificate

3. Due Diligence
Before purchasing property, verify:
- Clear title
- Approved building plans
- No pending litigations
- Proper land use permissions
- Tax clearances

4. Registration and Stamp Duty
Property transactions must be registered with the Sub-Registrar. Stamp duty rates vary by state.

5. Property Disputes
Common disputes include:
- Title disputes
- Boundary disputes
- Construction defects
- Delayed possession
- Breach of contract

Legal Remedies:
- Consumer forums for RERA complaints
- Civil courts for title disputes
- Arbitration as per agreement
- Mediation and settlement

Buyers and sellers should engage legal experts to ensure smooth and legally compliant real estate transactions.`,
    summary: 'Understanding real estate law in India, including RERA regulations, property documentation, due diligence, and dispute resolution mechanisms.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
    author: 'KAP LEGAL LLP',
    isPublished: true,
    publishedAt: new Date('2024-10-28')
  }
];

const seedBlogs = async () => {
  try {
    // Check if MONGODB_URI is defined
    if (!process.env.MONGODB_URI) {
      console.error('ERROR: MONGODB_URI is not defined in .env file');
      console.log('Current working directory:', process.cwd());
      console.log('Script directory:', __dirname);
      console.log('Available env vars:', Object.keys(process.env).filter(key => key.includes('MONGO')));
      process.exit(1);
    }

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing blogs (optional - comment out if you want to keep existing blogs)
    await Blog.deleteMany({});
    console.log('Cleared existing blogs');

    // Insert sample blogs
    const result = await Blog.insertMany(sampleBlogs);
    console.log(`Successfully inserted ${result.length} blogs`);

    // Display inserted blogs
    result.forEach(blog => {
      console.log(`- ${blog.title} (${blog.category})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error seeding blogs:', error);
    process.exit(1);
  }
};

seedBlogs();
