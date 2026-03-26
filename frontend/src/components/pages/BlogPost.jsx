import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../../styles/BlogPost.css';

const BlogPost = () => {
  const { id, slug } = useParams();

  const createSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
  };

  const cleanText = (text) => text.replace(/\*\*/g, '').replace(/\*/g, '').replace(/\s{2,}\n/g, ' ').trim();

  const renderContent = (content, title, author, date) => {
    const elements = [];
    let unorderedItems = [];
    let orderedItems = [];
    const lines = Array.isArray(content) ? content : String(content || '').split('\n');

    const flushLists = () => {
      if (unorderedItems.length > 0) {
        elements.push(
          <ul className="blog-list" key={`list-${elements.length}`}>
            {unorderedItems.map((item, index) => (
              <li key={`li-${elements.length}-${index}`}>{cleanText(item)}</li>
            ))}
          </ul>
        );
        unorderedItems = [];
      }

      if (orderedItems.length > 0) {
        elements.push(
          <ol className="blog-list ordered" key={`olist-${elements.length}`}>
            {orderedItems.map((item, index) => (
              <li key={`oli-${elements.length}-${index}`}>{cleanText(item)}</li>
            ))}
          </ol>
        );
        orderedItems = [];
      }
    };

    let skippedTitle = false;

    lines.forEach((line, index) => {
      const trimmed = line.trim();
      if (!trimmed) {
        return;
      }

      if (!skippedTitle && title && trimmed === title) {
        skippedTitle = true;
        return;
      }

      // Avoid duplicating metadata already shown in the header.
      const lower = trimmed.toLowerCase();
      const normalizedAuthor = (author || '').toLowerCase();
      if (lower.startsWith('by ') && normalizedAuthor && lower.includes(normalizedAuthor)) {
        return;
      }
      if (lower.startsWith('published:')) {
        return;
      }
      if (lower.includes('founder kap legal llp') || lower.includes('practising advocate, delhi/ncr')) {
        return;
      }

      if (trimmed.startsWith('- ')) {
        unorderedItems.push(trimmed.slice(2));
        return;
      }

      if (/^\d+\.\s/.test(trimmed)) {
        orderedItems.push(trimmed.replace(/^\d+\.\s/, ''));
        return;
      }

      const isRomanHeading = /^(I|II|III|IV|V|VI|VII|VIII|IX|X)\./.test(trimmed);
      const isSectionHeading = /^Key Citations and Sources$/.test(trimmed) || /^Statutory Provisions:?$/.test(trimmed);

      flushLists();

      if (trimmed.startsWith('### ') || isRomanHeading || isSectionHeading) {
        const headingText = trimmed.startsWith('### ') ? trimmed.slice(4) : trimmed;
        elements.push(<h3 key={`h3-${index}`}>{cleanText(headingText)}</h3>);
      } else {
        elements.push(<p key={`p-${index}`}>{cleanText(trimmed)}</p>);
      }
    });

    flushLists();
    return elements;
  };

  const [remotePost, setRemotePost] = useState(null);
  const [isLoadingRemote, setIsLoadingRemote] = useState(Boolean(slug));

  useEffect(() => {
    let mounted = true;

    const fetchBySlug = async () => {
      if (!slug) {
        setIsLoadingRemote(false);
        return;
      }

      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/blogs/slug/${slug}`);
        if (mounted && response?.data) {
          setRemotePost(response.data);
        }
      } catch (error) {
        // no-op: local fallback remains active
      } finally {
        if (mounted) {
          setIsLoadingRemote(false);
        }
      }
    };

    fetchBySlug();

    return () => {
      mounted = false;
    };
  }, [slug]);
  
  // Sample blog posts data - in a real application, this would come from an API or database
  const blogPosts = [
    {
      id: 9,
      title: "Section 85 BNS and the Two-Month Rule: What the Supreme Court's 2025 Landmark Really Means for Families",
      category: 'Criminal Defense',
      date: '15 MAR 2026',
      author: 'Advocate Sonali Karwasra Joon',
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=2070&q=80',
      content: `Section 85 BNS and the Two-Month Rule: What the Supreme Court’s 2025 Landmark Really Means for Families

    By Advocate Sonali Karwasra Joon
    Founder KAP Legal LLP| Practising Advocate, Delhi/NCR
    Published: March 2026
    “Innocent until proven guilty.”
    This is not merely a legal maxim. It is a constitutional guarantee. Yet, for decades, one of India’s most invoked criminal provisions — Section 498A of the Indian Penal Code, now re-enacted as Section 85 of the Bharatiya Nyaya Sanhita, 2023 — has been used to reduce this guarantee to a paper promise.
     I. The Law and Its Purpose: A Brief History
    Section 498A was introduced into the Indian Penal Code in 1983 through the Criminal Law (Second Amendment) Act. Its enactment was an urgent legislative response to an alarming national crisis — the rising incidence of dowry deaths, domestic violence, and cruelty against married women within their matrimonial homes.
    The provision was necessary. It was overdue. And it was, in its original design, a vital shield for women who had no other recourse against systematic abuse behind closed doors.
    Under the Bharatiya Nyaya Sanhita, 2023 — which replaced the IPC with effect from July 1, 2024 — the substance of Section 498A has been retained. Section 85 BNS now provides that whoever, being the husband or the relative of the husband of a woman, subjects such woman to cruelty, shall be punished with imprisonment for a term which may extend to three years and shall also be liable to a fine.
    Section 86 BNS separately defines “cruelty” for the purposes of Section 85 to mean:
    - Any wilful conduct which is of such a nature as is likely to drive the woman to commit suicide, or to cause grave injury or danger to life, limb, or health — whether mental or physical; or
    - Harassment of the woman where such harassment is with a view to coercing her or any person related to her to meet any unlawful demand for any property or valuable security, or is on account of failure by her or any person related to her to meet such demand.
    The offence under Section 85 BNS, like its predecessor, is cognizable, non-bailable, and non-compoundable. These characteristics were deliberately chosen by Parliament to give the provision teeth and immediacy. A cognizable offence allows police to arrest without a warrant. A non-bailable offence places the burden on the accused to seek bail. A non-compoundable offence cannot be withdrawn by the complainant once filed, even if both parties reach a settlement — though the High Court retains inherent jurisdiction under Section 528 of the Bharatiya Nagarik Suraksha Sanhita, 2023 (formerly Section 482 CrPC) to quash proceedings in deserving cases.
    These are formidable powers. Deliberately so. But power, when exercised without responsibility, becomes tyranny — and that is precisely the story of Section 498A/85 BNS over the past four decades.

    II. The Statute That Became a Weapon
    The Supreme Court of India has, in a long line of decisions, been compelled to confront an uncomfortable reality: the very provision enacted to protect women from cruelty has, in a significant number of cases, been weaponised to inflict cruelty upon entire families.
    The numbers are stark and cannot be wished away.
    In its landmark 2014 judgment in Arnesh Kumar v. State of Bihar [(2014) 8 SCC 273], the Supreme Court, speaking through Justice Chandramauli Kumar Prasad, recorded with judicial candour that the “Crime in India 2012 Statistics” published by the National Crime Records Bureau showed 1,97,762 persons arrested all over India in 2012 for offences under Section 498A IPC — 9.4% more than the year 2011. Nearly a quarter of those arrested — 47,951 individuals — were women: mothers, sisters, and sisters-in-law of husbands, many of whom had no role whatsoever in the alleged cruelty.
    It is alarming that in quite a number of cases, bed-ridden grandfathers and grandmothers of the husbands, their sisters living abroad for decades, were arrested.
    The overwhelming majority of persons arrested, charge-sheeted, and dragged through years of criminal litigation under this provision were ultimately not convicted. Many were innocent.

    III. A Decade of Judicial Safeguards: From Arnesh Kumar to Shivangi Bansal

    The judiciary could not wait for the legislature to act. Beginning with Arnesh Kumar in 2014, the Supreme Court progressively built a framework of procedural safeguards designed to prevent arbitrary arrests while preserving the law’s protective intent. The Apex Court issued guidelines emphasising on the necessity of arrest as per the parameters of Section 41 CrPC — now corresponding to Section 35 of the BNSS, 2023. No arrest under Section 498A IPC must be made automatically, mechanically, or as a matter of routine.
    The Court memorably declared: “Arrest is not a must in every case.” Arrest, it held, was a drastic power — a serious infringement of personal liberty under Article 21 of the Constitution — and must be exercised with corresponding seriousness.

    In Social Action Forum for Manav Adhikar v. Union of India (2018), the Supreme Court revisited the question of safeguards and unequivocally reaffirmed the Arnesh Kumar guidelines and directed that judicial restraint in arrests — rather than procedural dilution of the law — was the correct approach. The Arnesh Kumar framework remained fully operative.
    On July 22, 2025, the Supreme Court (Chief Justice B.R. Gavai and Justice Augustine George Masih) delivered a landmark ruling in a matrimonial transfer petition (2025 INSC 883), addressing the rampant weaponization of criminal law in family disputes. In this case—involving an IPS officer wife, her husband, and over 20 cross-litigations across Delhi and Uttar Pradesh, with the husband enduring 109 days and his father 103 days in jail under serious IPC charges like 498A, 307, and 376—the Court invoked Article 142 to nationwide endorse Allahabad High Court guidelines mandating Family Welfare Committees and a two-month cooling-off period before arrests. It dissolved the marriage, quashed all proceedings, ordered the wife to publicly apologize in newspapers and on social media for false allegations and wrongful incarceration, and barred future litigation, lamenting how such misuse erodes marriage’s sanctity.
     IV. The Two-Month Rule: What It Actually Means

    The cornerstone of the Supreme Court’s binding national precedent is the endorsement of a two-month cooling-off period and Family Welfare Committee (FWC) mechanism for FIRs or complaints under Section 498A IPC / Section 85 BNS and allied provisions. No arrest or coercive police action shall occur against named accused for two months from filing (Guideline i). Every such complaint must immediately be referred to a district-level FWC by the Magistrate or police, which shall summon parties and up to four senior elders per side for interaction and dispute resolution within this period (Guideline vii). Post-deliberation and expiry of two months, the FWC submits a detailed report with facts and opinion to the authorities (Guideline viii). This report informs—but does not bind—police or Magistrate decisions on arrest, subject to the Arnesh Kumar checklist (Section 35 BNSS) and independent judicial scrutiny.
    Critically, the cooling period is a procedural bulwark against precipitous arrests, not absolute immunity. It excludes cases of evident physical injury or death; preserves substantive remedies for genuine cruelty victims under Section 85 BNS; and imposes no bar on direct court access or protection orders under the Domestic Violence Act, 2005. The ruling fortifies implementation without diluting the law’s protective core—precision in this distinction is imperative.
    V. The Constitutional Framework: Balancing Article 21 Against Article 21
    There is a profound constitutional irony at the heart of this debate. Both the genuine victim of matrimonial cruelty and the innocent person falsely accused invoke Article 21 of the Constitution — the right to life and personal liberty — in support of their respective positions. While the victim invokes Article 21 to demand swift state action against abuse. The accused invokes Article 21 against arbitrary arrest and detention. The State must serve both.

    It is this tension — not a conflict between the law’s objective and its critics — that the Supreme Court has been navigating for over a decade. The recent landmark judgment in July 2025 represents the Court’s clearest articulation yet of where the balance lies: the criminal process must not itself become an instrument of cruelty.

    When an elderly parent is arrested without investigation, detained for over a hundred days, and ultimately acquitted — the process itself has become the punishment. That is a constitutional wrong, and the Court has said so in terms that cannot be misread.

    VI. What This Means for Families in Delhi/NCR — A Practical Analysis

    For practitioners and families navigating this terrain in Delhi/NCR, the *Shivangi Bansal* judgment and the existing jurisprudential framework translate into the following practical realities:
    For complainants:
    - An FIR under Section 85 BNS will not result in immediate arrest of the accused. The two-month period must be allowed to run.
    - The complaint must be specific, particularised, and supported by evidence. The Supreme Court has consistently held — most recently in Dara Lakshmi Narayana v. State of Telangana (December 2024) — that vague, omnibus allegations implicating the entire family without specific instances of cruelty weaken the prosecution’s case and may result in quashing.
    - The FWC process should be approached as an opportunity for early resolution, not merely a procedural delay.
    - Section 85 BNS remains fully operative. Genuine victims retain the full protection of the law.
    For the accused:

    - Arrest in a Section 85 BNS case is not automatic. Police must follow the Arnesh Kumar checklist under Section 35 BNSS. If they do not, the arrest is liable to be challenged.
    - An application for anticipatory bail — before the Sessions Court or the High Court — remains the most important immediate legal step. File early.
    - If an FIR has been filed immediately after a divorce notice or as a direct response to civil proceedings, courts have consistently recognised this pattern as a factor supporting quashing.
    - If proceedings have been settled between the parties, a joint petition for quashing under Section 528 BNSS before the High Court remains available, notwithstanding the non-compoundable nature of the offence.

    For elderly relatives and extended family members:

    - The Supreme Court has drawn a firm line against the indiscriminate implication of relatives. Mere relationship to the husband is not sufficient. There must be specific, credible allegations against each named accused person.
    - Any parent, sibling, or relative of a husband who has been named in a Section 85 BNS FIR without specific allegations against them should seek immediate legal advice regarding anticipatory bail and quashing proceedings.

    VII. The Road Not Yet Taken: Legislative Reform
    While the judiciary has done commendable work in building procedural safeguards around Section 85 BNS through case law, judicial intervention has inherent limitations. Guidelines can be selectively applied or ignored at the ground level. Police officers, for all the directions issued, continue to make arrests that violate the Arnesh Kumar framework — as evidenced by police officers being held in contempt by the Delhi High Court and the Allahabad High Court for such violations.
    The Supreme Court itself, in *Shivangi Bansal*, noted with evident concern the gap between judicial direction and ground-level compliance. The Court has, in earlier decisions, called upon Parliament to re-examine the provisions — now Sections 85 and 86 BNS — in light of “pragmatic realities.”
    The time has come for legislative action on at least the following fronts:
    1. Codification of the two-month cooling period as a statutory requirement under the BNSS, removing reliance on guidelines that may be unevenly applied.
    2. Mandatory pre-arrest inquiry for all offences under Section 85 BNS, except in cases involving physical injury requiring immediate protection.
    3. Provision for prosecution of false complainants — a strong, enforceable mechanism against the deliberate misuse of criminal law in matrimonial disputes, including appropriate penal consequences for those who file knowingly false FIRs.
    4. Making Section 85 BNS compoundable — with appropriate judicial oversight — to allow genuine settlements to bring proceedings to a close, rather than compelling families through years of litigation even after resolution.
    None of these reforms would weaken the protection afforded to genuine victims. They would strengthen the law’s credibility and its selective, purposive enforcement.

    VIII. Conclusion: A Law Must Protect, Not Prosecute the Innocent
    The Bharatiya Nyaya Sanhita, 2023 came with a stated legislative objective of modernising India’s criminal law — making it more just, more efficient, and more aligned with contemporary constitutional values.
    Section 85 BNS retains the protective intent of the original Section 498A. That intent is noble, necessary, and must not be compromised.
    But the Shivangi Bansal judgment of 2025 is a powerful reminder that a law’s nobility of purpose does not immunise its implementation from abuse. When a provision is used not to seek justice but to exact revenge, not to protect a victim but to destroy a family, not to seek a remedy but to secure a settlement under threat of arrest — it is no longer functioning as law. It is functioning as a weapon.
    The Supreme Court has said, in unmistakable terms, that India’s criminal justice system will no longer be a silent instrument of such weaponisation. The two-month cooling period, the Family Welfare Committee mechanism, the Arnesh Kumar guidelines — these are not technical procedural rules. They are constitutional commitments to the principle that arrest is not a punishment, and due process is not a formality.

    For every family in Delhi/NCR — whether a wife seeking protection from genuine cruelty or parents seeking protection from false imprisonment — this judgment matters. Know your rights. Seek legal advice early. And demand that the law serve its true purpose: justice.

    Key Citations and Sources
    Arnesh Kumar v. State of Bihar             |(2014) 8 SCC 273                    
    Social Action Forum v. Union of India      |(2018) 10 SCC 443
    Shivangi Bansal v. Sahib Bansal            |2025 INSC 883; 2025 LiveLaw (SC) 735
    Dara Lakshmi Narayana v. State of Telangana|(December 2024) 
    Gian Singh v. State of Punjab              |(2012) 10 SCC 303

    Statutory Provisions:

    - Section 85 and 86, Bharatiya Nyaya Sanhita, 2023
    - Section 35, Bharatiya Nagarik Suraksha Sanhita, 2023 (replacing S.41 CrPC)
    - Section 528, Bharatiya Nagarik Suraksha Sanhita, 2023 (replacing S.482 CrPC)
    - Protection of Women from Domestic Violence Act, 2005

    This article is intended for educational and informational purposes only. It does not constitute legal advice and must not be construed as such. Readers dealing with specific legal situations are strongly advised to consult a qualified advocate. — Advocate Sonali, Practising Advocate, Delhi/NCR.

    © Family Matters with Advocate Sonali. All rights reserved. Reproduction with attribution permitted for educational purposes.
    `
    },
    {
      id: 1,
      title: "Navigating Corporate Compliance in 2025",
      category: "Corporate Law",
      date: "15 JUL 2025",
      author: "Alexandra Justice",
      image: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      content: [
        "New regulations are reshaping how businesses approach compliance. Our experts break down what you need to know to stay ahead.",
        "Corporate compliance has become increasingly complex in 2025, with new regulations being introduced at both federal and state levels. Companies of all sizes are finding themselves navigating a maze of requirements that touch on everything from data privacy to environmental impact.",
        "### Key Compliance Challenges in 2025",
        "The most significant shift we're seeing is in data protection regulations. Following the passage of the Federal Data Protection Act last year, businesses now face stricter requirements for how they collect, store, and use consumer data. This includes:",
        "- Mandatory data protection impact assessments",
        "- Enhanced consent requirements for data collection",
        "- Stricter breach notification timelines (now 48 hours)",
        "- Increased penalties for non-compliance (up to 4% of global revenue)",
        "### Industry-Specific Considerations",
        "Different industries face unique challenges. Healthcare organizations must reconcile the new federal regulations with existing HIPAA requirements. Financial institutions are dealing with expanded reporting requirements under the Financial Transparency Act of 2024.",
        "### Practical Steps for Businesses",
        "1. **Conduct a compliance audit**: Assess your current practices against new requirements",
        "2. **Update your data governance framework**: Ensure your policies reflect current regulations",
        "3. **Train your team**: Make sure everyone understands their compliance responsibilities",
        "4. **Implement robust documentation**: Be prepared to demonstrate compliance if audited",
        "5. **Consider compliance technology**: New tools can help automate and streamline compliance tasks",
        "### The Cost of Non-Compliance",
        "Beyond the obvious financial penalties, non-compliance can lead to reputational damage, loss of customer trust, and even personal liability for executives in certain cases. The investment in proper compliance measures is almost always less than the potential cost of violations.",
        "Our corporate law team specializes in helping businesses navigate these complex requirements. Contact us for a consultation to ensure your business is fully prepared for the compliance challenges of 2025 and beyond."
      ]
    },
    {
      id: 2,
      title: "Modern Approaches to Child Custody Arrangements",
      category: "Family Law",
      date: "28 JUN 2025",
      author: "Sophia Martinez",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      content: [
        "Courts are increasingly favoring collaborative parenting plans. Learn how these changes might affect your family situation.",
        "The landscape of child custody arrangements has evolved significantly in recent years. Gone are the days when courts automatically favored one parent over another based on traditional roles. Today's family courts are increasingly focused on arrangements that prioritize the well-being of children through collaborative parenting approaches.",
        "### The Shift Toward Shared Parenting",
        "Recent statistics show that shared custody arrangements have increased by nearly 30% over the past five years. This reflects growing recognition that children generally benefit from maintaining strong relationships with both parents following a separation or divorce.",
        "### Factors Courts Consider in Modern Custody Cases",
        "- The child's relationship with each parent",
        "- Each parent's demonstrated ability to support the child's relationship with the other parent",
        "- The stability of each home environment",
        "- The child's educational, social, and extracurricular needs",
        "- The geographical proximity of the parents' homes",
        "- The child's preferences (depending on age and maturity)",
        "### Types of Modern Custody Arrangements",
        "**1. 50/50 Shared Physical Custody**  \nThis arrangement splits the child's time equally between both parents. Common schedules include alternating weeks, 2-2-3 rotations, or 2-week rotations.",
        "**2. Nesting Arrangements**  \nIn this innovative approach, children remain in the family home while parents alternate moving in and out according to the custody schedule.",
        "**3. Parallel Parenting**  \nFor high-conflict situations, parallel parenting minimizes direct contact between parents while still allowing both to be actively involved in their children's lives.",
        "**4. Customized Schedules**  \nMany families now create highly personalized arrangements that account for work schedules, children's activities, and other unique family circumstances.",
        "### Creating a Successful Parenting Plan",
        "The most successful custody arrangements typically include:",
        "- Clear communication protocols between parents",
        "- Detailed schedules for regular time, holidays, and special occasions",
        "- Specific provisions for decision-making on education, healthcare, and other important matters",
        "- Flexibility to adapt as children's needs change",
        "- Mechanisms for resolving disagreements",
        "Our family law team specializes in helping parents develop custody arrangements that prioritize their children's well-being while respecting the rights and responsibilities of both parents. Contact us to learn how we can help your family navigate this challenging transition."
      ]
    },
    {
      id: 3,
      title: "Digital Assets in Your Estate Plan: What You Need to Know",
      category: "Estate Planning",
      date: "03 AUG 2025",
      author: "Michael Thompson",
      image: "https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      content: [
        "From cryptocurrency to online accounts, digital assets are becoming an important consideration in modern estate planning.",
        "Estate planning has traditionally focused on physical assets like real estate, financial accounts, and personal possessions. However, in today's digital world, a comprehensive estate plan must also address digital assets, which can have both significant financial and sentimental value.",
        "### What Are Digital Assets?",
        "Digital assets encompass a wide range of online accounts and electronic files, including:",
        "- **Financial digital assets**: Cryptocurrency holdings, online banking accounts, investment accounts, and digital payment services",
        "- **Personal digital assets**: Email accounts, social media profiles, digital photos, videos, and documents",
        "- **Business digital assets**: Websites, domain names, online stores, digital intellectual property",
        "- **Loyalty program benefits**: Accumulated airline miles, hotel points, and other rewards programs",
        "### The Unique Challenges of Digital Assets",
        "Digital assets present several unique estate planning challenges:",
        "1. **Access issues**: Many digital platforms have strict terms of service that prohibit account sharing or transfer, even after death",
        "2. **Password protection**: Without proper planning, executors may be unable to access valuable or important digital assets",
        "3. **Rapidly changing landscape**: Laws regarding digital assets are still evolving and vary by jurisdiction",
        "4. **Valuation difficulties**: Some digital assets, particularly cryptocurrency, can be difficult to value for estate tax purposes",
        "### Essential Steps for Including Digital Assets in Your Estate Plan",
        "**1. Create a comprehensive inventory**  \nMaintain a secure, up-to-date list of all your digital assets, including account information and access instructions.",
        "**2. Address digital assets in your will and other estate documents**  \nSpecifically mention digital assets and provide clear instructions for their management and distribution.",
        "**3. Consider a digital asset trust**  \nFor significant digital holdings, especially cryptocurrency, a specialized trust may offer better protection and tax advantages.",
        "**4. Appoint a digital executor**  \nDesignate someone with the technical knowledge to properly handle your digital assets.",
        "**5. Use password managers and digital legacy services**  \nThese tools can help ensure your executor has proper access to your accounts when needed.",
        "**6. Review and update regularly**  \nAs you acquire new digital assets or as laws change, review and update your estate plan accordingly.",
        "Our estate planning attorneys stay current on the evolving laws surrounding digital assets and can help ensure that all your assets—both physical and digital—are properly addressed in your estate plan. Contact us to learn more about protecting your digital legacy."
      ]
    },
    {
      id: 4,
      title: "Digital Evidence in Modern Criminal Cases",
      category: "Criminal Defense",
      date: "05 AUG 2025",
      author: "Jonathan Wilson",
      image: "https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
      content: [
        "The role of digital forensics is transforming criminal defense strategies. Our attorneys discuss key considerations for defendants.",
        "In today's interconnected world, digital evidence has become a cornerstone of modern criminal cases. From smartphones and computers to social media accounts and surveillance systems, digital information can make or break a criminal defense. Understanding how this evidence is collected, analyzed, and presented in court is crucial for anyone facing criminal charges.",
        "### Types of Digital Evidence in Criminal Cases",
        "- **Device data**: Information extracted from computers, smartphones, tablets, GPS devices, and other electronic equipment",
        "- **Communication records**: Emails, text messages, social media posts, voice messages, and video calls",
        "- **Surveillance footage**: Security camera recordings, doorbell cameras, and other video monitoring systems",
        "- **Location data**: GPS records, cell tower pings, and digital check-ins that can establish a person's whereabouts",
        "- **Financial records**: Digital banking transactions, cryptocurrency transfers, and online purchases",
        "- **Metadata**: Hidden information about when files were created, modified, or accessed",
        "### How Prosecutors Use Digital Evidence",
        "Prosecutors increasingly rely on digital evidence to establish elements of criminal cases, including:",
        "1. **Establishing timeline and location**: Using device data to place defendants at specific locations at specific times",
        "2. **Demonstrating intent**: Using search history, messages, or social media posts to suggest premeditation or motive",
        "3. **Connecting co-defendants**: Showing communication patterns between individuals allegedly involved in criminal activity",
        "4. **Contradicting alibis**: Using digital footprints to challenge a defendant's account of events",
        "### Digital Evidence Defense Strategies",
        "Effective criminal defense in the digital age requires a sophisticated approach to challenging electronic evidence:",
        "**1. Questioning authenticity and reliability**  \nDigital evidence can be manipulated, misinterpreted, or incorrectly attributed. Defense attorneys can challenge the chain of custody and reliability of digital evidence.",
        "**2. Challenging search and seizure procedures**  \nThe Fourth Amendment protects against unreasonable searches and seizures, including those of electronic devices. Warrantless searches or overly broad warrants can lead to evidence suppression.",
        "**3. Presenting alternative interpretations**  \nDigital evidence often requires interpretation. The defense can offer alternative explanations for seemingly incriminating data.",
        "**4. Utilizing expert witnesses**  \nDigital forensics experts can testify about proper evidence collection procedures, potential tampering, and alternative explanations for digital findings.",
        "**5. Addressing privacy concerns**  \nAs technology evolves, so do questions about reasonable expectations of privacy. Novel legal arguments can sometimes exclude improperly obtained digital evidence.",
        "Our criminal defense team works with top digital forensics experts to scrutinize prosecution evidence and develop effective defense strategies in cases involving digital evidence. If you're facing charges that involve electronic evidence, contact us for a consultation to discuss how we can help protect your rights."
      ]
    },
    {
      id: 5,
      title: "Understanding Prenuptial Agreements",
      category: "Family Law",
      date: "12 JUL 2025",
      author: "Sophia Martinez",
      image: "https://images.unsplash.com/photo-1565619624098-cf4168a7cd9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      content: [
        "Prenuptial agreements are becoming more common. Learn about their benefits and how they can protect both parties in a marriage.",
        "Once considered taboo or only for the wealthy, prenuptial agreements (commonly called 'prenups') have become increasingly mainstream. As people marry later in life, often bringing established careers, assets, and sometimes children from previous relationships, prenuptial agreements offer a practical way to address financial matters before marriage.",
        "### What Is a Prenuptial Agreement?",
        "A prenuptial agreement is a legally binding contract created by two people before they marry. It typically outlines how assets and debts will be divided in the event of divorce or death, and may address other financial matters such as spousal support.",
        "### Common Misconceptions About Prenups",
        "**Myth 1: Prenups are only for the wealthy**  \nReality: People of all income levels can benefit from the clarity a prenup provides, especially those with business interests, inheritance prospects, or children from previous relationships.",
        "**Myth 2: Asking for a prenup means you expect divorce**  \nReality: A prenup is similar to insurance—you hope never to need it, but having it provides security and peace of mind.",
        "**Myth 3: Prenups are always one-sided**  \nReality: A well-drafted prenup should be fair to both parties and can include provisions that protect the financially vulnerable spouse.",
        "### What Can Be Included in a Prenuptial Agreement?",
        "- Division of property and assets acquired before and during marriage",
        "- Allocation of debts and financial responsibilities",
        "- Spousal support terms",
        "- Protection of business interests",
        "- Protection of estate plans for children from previous relationships",
        "- Management of household expenses during marriage",
        "- Procedures for resolving future disputes",
        "### What Cannot Be Included in a Prenuptial Agreement?",
        "- Child custody arrangements",
        "- Child support determinations",
        "- Personal (non-financial) matters",
        "- Provisions that encourage divorce",
        "- Unconscionable or extremely unfair terms",
        "### Requirements for a Valid Prenuptial Agreement",
        "To be legally enforceable, a prenuptial agreement generally must meet these requirements:",
        "1. **Written document**: Oral prenups are not enforceable",
        "2. **Full financial disclosure**: Both parties must disclose all assets and debts",
        "3. **Voluntary execution**: No coercion or duress",
        "4. **Independent legal representation**: Ideally, each party should have their own attorney",
        "5. **Reasonable timing**: The agreement should be signed well before the wedding (not days before)",
        "6. **Fairness**: The agreement cannot be unconscionable",
        "Our family law attorneys can help you create a prenuptial agreement that protects your interests while being fair to both parties. We approach these sensitive discussions with discretion and respect, helping couples start their marriage with clarity and confidence about their financial future."
      ]
    },
    {
      id: 6,
      title: "Business Succession Planning for Family Businesses",
      category: "Corporate Law",
      date: "20 JUN 2025",
      author: "Alexandra Justice",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
      content: [
        "Family businesses face unique challenges when planning for succession. Our guide helps navigate this complex process.",
        "Family businesses are the backbone of the American economy, representing approximately 90% of all businesses in the United States. However, statistics show that only about 30% of family businesses survive into the second generation, and merely 12% make it to the third. One of the primary reasons for this high failure rate is inadequate succession planning.",
        "### Why Succession Planning Matters for Family Businesses",
        "Succession planning is more than just determining who will take over when the current leader retires. It's a comprehensive strategy that addresses:",
        "- Leadership transition and development",
        "- Ownership transfer",
        "- Tax implications",
        "- Family dynamics and potential conflicts",
        "- Business continuity and growth",
        "- Retirement security for the departing generation",
        "### Common Succession Planning Challenges",
        "**1. Emotional attachments**  \nFounders often struggle to let go of businesses they've built from the ground up, making objective decision-making difficult.",
        "**2. Family dynamics**  \nSibling rivalries, in-law relationships, and varying levels of interest and capability among family members can complicate succession.",
        "**3. Lack of qualified successors**  \nNot all family businesses have family members with the interest or ability to take over leadership roles.",
        "**4. Financial considerations**  \nBalancing fair treatment of all family members with the financial needs of the business can be challenging.",
        "**5. Tax implications**  \nWithout proper planning, estate and gift taxes can create significant financial burdens during ownership transfer.",
        "### Key Components of an Effective Succession Plan",
        "**1. Start early**  \nIdeally, succession planning should begin 5-10 years before the anticipated transition.",
        "**2. Identify and develop potential successors**  \nThis may include family members and/or key non-family employees. Create development plans to prepare them for future leadership roles.",
        "**3. Establish a clear vision**  \nDefine what success looks like for the business and the family after the transition.",
        "**4. Create a formal transition plan**  \nDocument the process, timeline, and responsibilities for the leadership transition.",
        "**5. Address ownership transfer strategically**  \nConsider various mechanisms such as gifting, selling, or using trusts to transfer ownership in a tax-efficient manner.",
        "**6. Communicate openly**  \nHold regular family meetings to discuss the succession plan and address concerns.",
        "**7. Seek professional guidance**  \nWork with attorneys, accountants, and financial advisors who specialize in family business succession.",
        "Our corporate law team has extensive experience helping family businesses navigate the complex process of succession planning. We understand both the legal and emotional aspects involved and can help create a comprehensive plan that protects your business legacy for generations to come."
      ]
    }
  ];

  const postsWithSlugs = blogPosts.map((post) => ({
    ...post,
    slug: createSlug(post.title)
  }));

  // Match by numeric ID or slug route
  const blogPost = postsWithSlugs.find((post) => {
    if (id) {
      return post.id === parseInt(id);
    }
    if (slug) {
      return post.slug === slug;
    }
    return false;
  });

  const resolvedPost = blogPost || (remotePost ? {
    id: remotePost._id || remotePost.id,
    title: remotePost.title,
    category: remotePost.category,
    date: remotePost.publishedAt
      ? new Date(remotePost.publishedAt).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })
      : '',
    author: remotePost.author || 'KAP LEGAL LLP',
    image: remotePost.image,
    content: remotePost.content || remotePost.summary || ''
  } : null);

  if (!resolvedPost && isLoadingRemote) {
    return (
      <div className="container">
        <div className="blog-post-not-found">
          <h2>Loading Article...</h2>
        </div>
      </div>
    );
  }

  if (!resolvedPost) {
    return (
      <div className="container">
        <div className="blog-post-not-found">
          <h2>Blog Post Not Found</h2>
          <p>The article you're looking for doesn't exist or has been removed.</p>
          <Link to="/blogs" className="btn btn-primary">Back to All Articles</Link>
        </div>
      </div>
    );
  }

  return (
    <section className="blog-post-page section">
      <div className="container">
        <div className="blog-post-header">
          <Link to="/blogs" className="back-link">
            <span>&larr;</span> Back to All Articles
          </Link>
          <h1>{resolvedPost.title}</h1>
          <div className="blog-meta">
            <div className="blog-author">
              <span>By {resolvedPost.author}</span>
            </div>
            <div className="blog-date">
              <span>{resolvedPost.date}</span>
            </div>
          </div>
        </div>

        <div className="blog-post-featured-image">
          <img src={resolvedPost.image} alt={resolvedPost.title} />
        </div>

        <div className="blog-post-content">
          {renderContent(resolvedPost.content, resolvedPost.title, resolvedPost.author, resolvedPost.date)}
        </div>

        <div className="cta-container">
          <h3>Need Legal Assistance?</h3>
          <p>Our experienced attorneys are ready to help you with your legal matters.</p>
          <Link to="/#contact" className="btn btn-primary">Contact Us Today</Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPost;
