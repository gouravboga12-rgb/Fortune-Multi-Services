export interface ServiceItem {
  name: string;
  tag: string;
  slug?: string;
  description?: string;
  details?: ServiceDetail;
}

export interface ServiceDetail {
  overview?: string;
  benefits: string[];
  documents: string[];
  process: string[];
  timeline: string;
  characteristics?: string[];
  pros?: string[];
  cons?: string[];
  commonMistakes?: string[];
  postCompliances?: string[];
  targetAudience?: string;
  faqs?: FAQItem[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ServiceCategory {
  title: string;
  description: string;
  slug: string;
  services: ServiceItem[];
  details: ServiceDetail;
  faqs: FAQItem[];
}

export const servicesData: ServiceCategory[] = [
  {
    title: "Startup",
    slug: "startup",
    description: "Launch your venture with the right legal structure and compliance.",
    services: [
      { 
        name: "Proprietorship", 
        tag: "#Proprietorship",
        slug: "proprietorship",
        description: "A sole proprietorship is a business that is owned and managed by a single person, ideal for small businesses.",
        details: {
          overview: "A Sole Proprietorship is the simplest and most common structure chosen to start a business in India. It is an unincorporated business owned, managed, and controlled by a single individual (the sole proprietor) who is personally entitled to all profits and personally responsible for all business debts.",
          targetAudience: "Solo entrepreneurs, local shops, freelancers, and small businesses with low risk.",
          benefits: ["Complete Control", "Minimal Compliance", "Easy to Start & Close", "Tax Benefits for small income"],
          documents: ["PAN Card", "Aadhaar Card", "Bank Account Statement", "Registered Office Proof (Rent/Utility Bill)"],
          process: ["Initial Consultation & Strategy", "Document Collection & Verification", "MSME/Udyam Registration", "Applying for GST & Local Licenses", "Bank Current Account Opening"],
          timeline: "3-5 Working Days",
          characteristics: [
            "Single Owner Control: Absolute decision-making authority sits with a single owner.",
            "No Separate Legal Entity: The owner and the business are treated as one under the law.",
            "Unlimited Liability: Personal assets of the owner can be used to recover business liabilities.",
            "Easy Setup & Termination: Requires minimal legal formalities to start or close."
          ],
          pros: [
            "Extremely easy and low-cost to establish and maintain.",
            "Complete decision-making control and confidentiality.",
            "Simplified tax filing integrated directly into the owner's personal ITR."
          ],
          cons: [
            "Unlimited personal liability for all business debts and obligations.",
            "Difficult to raise external investment, equity funding, or secure corporate loans.",
            "Business terminates immediately upon the death or disability of the owner."
          ],
          commonMistakes: [
            "Failing to register for municipal/local business licenses (like Trade License).",
            "Mixing personal and business funds in a single bank account.",
            "Ignoring timely registration for GST once annual turnover exceeds statutory thresholds."
          ],
          postCompliances: [
            "Annual Income Tax Returns (ITR-3 or ITR-4).",
            "Monthly/Quarterly GST filings (if GST registered).",
            "Renewal of local Shop & Establishment license (annually)."
          ],
          faqs: [
            { question: "Is a sole proprietorship registered under any central act?", answer: "No, there is no single central registration. Instead, it is established through local registrations like MSME, GST, or Shop & Establishment." },
            { question: "Can a proprietorship be converted to a Private Limited Company?", answer: "Yes, a sole proprietorship can be converted into a Pvt Ltd or LLP as the business grows." }
          ]
        }
      },
      { 
        name: "Partnership", 
        tag: "#Partnership",
        slug: "partnership",
        description: "A business structure where two or more individuals manage and operate a business in accordance with the terms of a Partnership Deed.",
        details: {
          overview: "A Partnership Firm is a popular structure where two or more individuals join hands to carry out business activities. The relationships, capital contribution, and profit-sharing ratio are governed by a legally binding agreement known as a Partnership Deed, draft according to the Indian Partnership Act, 1932.",
          targetAudience: "Small to medium co-owned businesses, family ventures, and trade-based firms.",
          benefits: ["Shared Responsibility", "More Capital", "Minimal Compliance compared to companies", "Easy Decision Making"],
          documents: ["Drafted Partnership Deed", "PAN Card of all Partners", "Aadhaar Card of all Partners", "Address Proof of the Firm", "NOC from Landlord"],
          process: ["Drafting & Finalizing Partnership Deed", "Notarization & Stamp Duty Payment", "Applying for Firm PAN & TAN", "Optional Registration with Registrar of Firms (RoF)", "Opening Current Bank Account"],
          timeline: "5-10 Working Days",
          characteristics: [
            "Co-ownership: Formed by at least two people (maximum limit is 50).",
            "Mutual Agency: Each partner acts as both principal and agent for other partners.",
            "Shared Profit/Loss: Profit and losses are distributed according to the Partnership Deed.",
            "Unlimited Liability: Partners are jointly and severally liable for all firm obligations."
          ],
          pros: [
            "Simple pool of shared capital and diverse skills.",
            "Fewer regulatory compliance requirements than LLPs or Companies.",
            "Flexible profit-sharing and operational arrangements."
          ],
          cons: [
            "Unlimited personal liability shared among all partners.",
            "High risk of business disruption due to internal disputes or death of a partner.",
            "Lack of corporate status makes raising venture capital difficult."
          ],
          commonMistakes: [
            "Failing to draft a detailed Partnership Deed, leading to legal conflicts later.",
            "Using incorrect stamp duty value for the deed, making it legally inadmissible.",
            "Not registering the firm when dealing with national contracts or court litigation."
          ],
          postCompliances: [
            "Filing annual Partnership ITR (ITR-5).",
            "Regular GST filings (if registered).",
            "TDS compliance and local professional tax (where applicable)."
          ],
          faqs: [
            { question: "Is registration of a partnership firm compulsory?", answer: "No, registration is optional under the Indian Partnership Act, 1932, but it is highly recommended to protect legal rights against third parties." },
            { question: "Can a partner exit easily?", answer: "Exits are governed by the clauses written in the Partnership Deed. Usually, a notice of dissolution or reconstitution is required." }
          ]
        }
      },
      { 
        name: "One Person Company", 
        tag: "#OPC",
        slug: "one-person-company",
        description: "An OPC gives a single promoter full control over the company with limited liability protection.",
        details: {
          overview: "A One Person Company (OPC) is a revolutionary business structure introduced under the Companies Act, 2013. It allows a single individual to incorporate a separate corporate entity, combining the absolute operational control of a sole proprietorship with the crucial limited liability protection of a corporate form.",
          targetAudience: "Solo founders, consultants, e-commerce sellers, and specialized professionals looking for a premium corporate brand.",
          benefits: ["Limited Liability", "Separate Legal Entity", "Single Owner", "Corporate Status"],
          documents: ["PAN & Aadhaar of Director & Nominee", "Passport Size Photo", "Bank Statement (under 2 months old)", "Registered Office Proof (Rent Agreement/Utility Bill)", "NOC from Property Owner"],
          process: ["Name Reservation (SPICe+ Part A)", "Obtaining Digital Signature Certificate (DSC)", "Drafting MOA & AOA with Nominee Consent", "Filing Incorporation Form (SPICe+ Part B)", "Obtaining COI, PAN, and TAN"],
          timeline: "10-15 Working Days",
          characteristics: [
            "Single Shareholder & Director: Only one natural citizen can form the company.",
            "Mandatory Nominee: A nominee director must be appointed to take over in case of death/incapacity.",
            "Separate Legal Entity: The company can own property and sue/be sued in its own name.",
            "Perpetual Succession: The company has an uninterrupted life irrespective of the status of the founder."
          ],
          pros: [
            "Total control in the hands of a single owner without sharing equity.",
            "Personal assets are fully insulated from business losses and liabilities.",
            "High trust and credibility among banks, large corporate clients, and suppliers."
          ],
          cons: [
            "Higher compliance costs (audits, ROC filings) compared to proprietorships.",
            "The owner cannot easily raise venture capital or distribute shares to multiple investors.",
            "Requires a mandatory Nominee Director, which might feel restrictive to some solo founders."
          ],
          commonMistakes: [
            "Choosing a nominee without their consent or proper identity verification.",
            "Failing to open a separate current account and mixing personal expenses with corporate funds.",
            "Missing the mandatory 180-day Commencement of Business certificate filing."
          ],
          postCompliances: [
            "Mandatory statutory audit by a Chartered Accountant.",
            "Filing Annual Return (Form MGT-7A) and Financial Statements (Form AOC-4).",
            "Filing Form INC-20A (Commencement of Business) within 180 days."
          ],
          faqs: [
            { question: "What is the role of a nominee in an OPC?", answer: "The nominee is a designated person who becomes the shareholder of the OPC in the event of the sole shareholder's death or mental incapacity." },
            { question: "Is there a limit on OPC turnover?", answer: "No, as per recent budget updates, the limits on paid-up capital and turnover have been relaxed, allowing OPCs to grow indefinitely." }
          ]
        }
      },
      { 
        name: "Limited Liability Partnership", 
        tag: "#LLP",
        slug: "limited-liability-partnership",
        description: "LLP gives the benefits of limited liability of a company and the flexibility of a partnership.",
        details: {
          overview: "A Limited Liability Partnership (LLP) is a modern corporate vehicle governed by the LLP Act, 2008. It is highly favored by professional firms and medium enterprises as it combines the limited liability protections of a Private Limited company with the internal flexibility and lower compliance costs of a traditional partnership.",
          targetAudience: "Service providers, consultants, real estate developers, professional partnerships (CA, CS, Law firms), and bootstrapped startups.",
          benefits: ["No Minimum Capital", "Limited Liability", "Lower Registration Cost", "No Requirement for Compulsory Audit"],
          documents: ["PAN & Aadhaar of all Partners", "Passport Photos", "Utility Bill of Registered Office", "NOC from Property Owner", "Bank Statements of Partners"],
          process: ["Obtaining DSC & DIN for Designated Partners", "Name Reservation (RUN-LLP)", "Filing Incorporation Form (FiLLiP)", "Drafting & Filing the LLP Agreement (Form 3)"],
          timeline: "10-15 Working Days",
          characteristics: [
            "Separate Legal Entity: Exists independently of its partners.",
            "No Mutual Liability: Partners are not liable for the independent or unauthorized actions of other partners.",
            "Flexible Agreement: Internal structure is fully customizable via the LLP Agreement.",
            "Perpetual Succession: Changes in partners do not affect the existence of the LLP."
          ],
          pros: [
            "Protects personal assets from joint liabilities and malpractice of other partners.",
            "No mandatory audit requirement until turnover exceeds ₹40 Lakhs or capital exceeds ₹25 Lakhs.",
            "Much lower compliance workload and cost than a Private Limited Company."
          ],
          cons: [
            "Cannot issue shares, make public offerings, or set up ESOP schemes for employees.",
            "Requires at least two partners (cannot be run as a solo venture).",
            "Heavy penalties apply for late compliance filing (daily late fees)."
          ],
          commonMistakes: [
            "Failing to file the LLP Agreement within 30 days of incorporation, incurring heavy penalties.",
            "Delaying statutory annual filings (Form 8 & Form 11), which carry permanent non-compliance status."
          ],
          postCompliances: [
            "Filing Form 11 (Annual Return) by May 30th each year.",
            "Filing Form 8 (Statement of Accounts & Solvency) by October 30th.",
            "Filing Income Tax Return (ITR-5) annually."
          ],
          faqs: [
            { question: "Can a company be a partner in an LLP?", answer: "Yes, bodies corporate (Indian or foreign companies) can become partners in an LLP through designated representatives." },
            { question: "Is there a minimum capital requirement?", answer: "No, partners can introduce capital in any form (cash, tangible asset, or intangible asset) with no statutory minimum limit." }
          ]
        }
      },
      { 
        name: "Private Limited Company", 
        tag: "#PvtLtd",
        slug: "private-limited-company",
        description: "The most popular business structure in India, offering limited liability and easy fund raising.",
        details: {
          overview: "A Private Limited Company (Pvt Ltd) is the premier business structure in India, governed by the Companies Act, 2013. It is universally trusted by investors, banks, and corporate entities, offering powerful benefits like complete limited liability protection, high fundraising capability, perpetual existence, and the ability to issue equity to raise capital.",
          targetAudience: "High-growth startups, tech ventures, manufacturing businesses, and firms looking to raise Venture Capital (VC) or Private Equity (PE) funding.",
          benefits: ["Limited Liability", "Separate Legal Entity", "Ease of Funding", "Employee Stock Options (ESOPs)"],
          documents: ["PAN, Aadhaar & Photo of Directors (Min 2)", "Bank Statement/Utility Bill of Directors", "Office Proof (Rent agreement + utility bill)", "NOC from Property Owner"],
          process: ["Obtaining Digital Signatures (DSC)", "Name Reservation (SPICe+ Part A)", "Filing Incorporation & DIN (SPICe+ Part B)", "Obtaining COI, PAN, TAN, and EPFO/ESIC registrations"],
          timeline: "10-15 Working Days",
          characteristics: [
            "Strict Liability Shield: Personal assets of promoters are completely safe.",
            "Equity Structuring: Can issue shares to raise capital or reward employees (ESOPs).",
            "Minimum 2 Directors: Requires at least two directors and a maximum of 200 shareholders.",
            "Separate Ownership: Shareholders own the capital, while directors manage the operations."
          ],
          pros: [
            "The only viable structure for raising major external investments (VC, Angel, PE).",
            "High credibility, elite branding, and ease of doing business globally.",
            "Shares are easily transferable, allowing smooth exit strategies for investors."
          ],
          cons: [
            "High setup cost and complex annual compliance checklist.",
            "Must undergo compulsory statutory audits by a Chartered Accountant, regardless of turnover.",
            "Profits cannot be withdrawn casually without paying dividend taxes or payroll taxes."
          ],
          commonMistakes: [
            "Not verifying unique and non-conflicting names before filing, leading to rejection.",
            "Missing the 180-day INC-20A Commencement of Business deadline, resulting in cancellation.",
            "Inaccurate capital structure (authorized vs. paid-up capital) during incorporation."
          ],
          postCompliances: [
            "Commencement of Business Certificate (INC-20A) within 180 days.",
            "Appointment of First Auditor (ADT-1) within 30 days.",
            "Annual filing of AOC-4 (Financials) and MGT-7 (Annual Return) to ROC."
          ],
          faqs: [
            { question: "Can a Private Limited Company be registered at a residential address?", answer: "Yes, the registered office can be a residential, commercial, or home-office address, provided proper NOC and utility proof are available." },
            { question: "What is the difference between Authorized and Paid-up capital?", answer: "Authorized capital is the maximum limit of shares a company can issue, whereas Paid-up capital is the actual money deposited by shareholders to purchase shares." }
          ]
        }
      },
      { 
        name: "Section 8 Company", 
        tag: "#Section8",
        slug: "section-8-company",
        description: "A company registered for charitable or not-for-profit purposes.",
        details: {
          overview: "A Section 8 Company is incorporated under the Companies Act, 2013, specifically for promoting art, science, commerce, education, charity, social welfare, environment, or other non-profit objectives. All profits/income generated must be re-invested back into promoting these non-profit objectives, and no dividends can be paid to members.",
          targetAudience: "NGOs, charitable foundations, educational societies, social welfare organizations, and CSR arms of corporate groups.",
          benefits: ["No Minimum Capital", "Tax Exemption (Under 80G & 12A)", "Credibility", "Limited Liability"],
          documents: ["ID & Address Proof of Directors (Min 2)", "Passport Photos", "Registered Office Proof", "3-Year Estimated Income & Expenditure Plan", "NOC from Property Owner"],
          process: ["DSC & DIN Acquisition", "Name Approval Reservation", "Applying for Section 8 License", "Filing for Incorporation with MCA", "Applying for 12A & 80G tax benefits"],
          timeline: "15-20 Working Days",
          characteristics: [
            "Non-Profit Motive: No dividend or distribution of profits is allowed to members.",
            "Exemption from 'Limited': Does not need to append 'Limited' or 'Private Limited' to its name.",
            "Eligible for FCRA: Highly favored for obtaining international charitable funding."
          ],
          pros: [
            "Higher credibility and trust compared to public Trusts or Societies.",
            "Eligible for tax exemptions under sections 12A, 12AA, and 80G of the Income Tax Act.",
            "Access to domestic and international corporate social responsibility (CSR) grants."
          ],
          cons: [
            "High compliance and registration costs.",
            "Strict government monitoring; license can be revoked for non-compliance or commercial usage.",
            "Converting Section 8 company back into a profit-making entity is extremely complex."
          ],
          commonMistakes: [
            "Starting activities before the Section 8 License is granted by the Central Government.",
            "Failing to set up a clean, non-profit financial accounting structure, causing audits to fail."
          ],
          postCompliances: [
            "Compulsory annual audit of accounts.",
            "Filing Form AOC-4 and MGT-7 annually with the Registrar of Companies (ROC).",
            "Renewal of 80G & 12A tax exemption statuses."
          ],
          faqs: [
            { question: "Can a Section 8 Company pay salaries to its directors?", answer: "No salary can be paid to members/directors unless they are actively employed in a non-member/executive capacity, and it must be approved as per the MOA." },
            { question: "Is 80G registration automatic with incorporation?", answer: "No, 80G and 12A registrations are separate post-incorporation applications made to the Income Tax Department." }
          ]
        }
      },
      { 
        name: "Trust Registration", 
        tag: "#Trust",
        slug: "trust-registration",
        description: "A legal entity created by a party (the trustor) through which a second party (the trustee) holds the right to manage the trust's assets.",
        details: {
          overview: "A Trust is one of the oldest structures in India for charitable or private asset management, registered under the Indian Trusts Act, 1882 (for private trusts) or state-specific Public Trust Acts. In a trust, the settlor transfers assets to a board of trustees, who hold and manage them for the benefit of a third party (the beneficiaries) or the general public.",
          targetAudience: "Families managing ancestral estates, educational schools/colleges, medical institutions, and religious organizations.",
          benefits: ["Charitable Activities", "Tax Exemptions", "Asset Protection", "Perpetual Succession"],
          documents: ["Trust Deed on Stamp Paper", "ID & Address Proof of Settlor and Trustees", "Passport Photos", "Utility Bill of Registered Office", "NOC from Property Owner"],
          process: ["Drafting detailed Trust Deed", "Procuring Stamp Paper & Pay Stamp Duty", "Getting Appointment at Sub-Registrar Office", "Physical Registration in presence of Settlor & Trustees", "Applying for PAN & TAN"],
          timeline: "7-12 Working Days",
          characteristics: [
            "Fiduciary Control: Trustees are legally bound to act solely in the interest of beneficiaries.",
            "Three Core Parties: Settlor (creator), Trustees (managers), and Beneficiaries (recipients).",
            "Irreversible Setup: Once public charitable trusts are formed, assets cannot be reclaimed by the settlor."
          ],
          pros: [
            "Highly protected asset management structure, secure from private creditors.",
            "Strongest structure for long-term charitable, religious, and institutional management.",
            "Simple operational rules relative to Corporate Companies."
          ],
          cons: [
            "Highly localized and subject to regional Sub-Registrar regulations.",
            "Difficult to transfer ownership or alter the core clauses of the original trust deed.",
            "May require physical presence for registration at local government sub-registrar offices."
          ],
          commonMistakes: [
            "Drafting trust clauses vaguely, which makes it difficult to secure 80G/12A tax exemptions later.",
            "Not updating the trustee list or passing resolutions, causing administrative deadlock."
          ],
          postCompliances: [
            "Annual Audit by a CA (if turnover exceeds statutory thresholds).",
            "Filing annual Income Tax Return (ITR-7).",
            "Maintaining proper Minutes of Meetings of the board of trustees."
          ],
          faqs: [
            { question: "What is the difference between a Public and a Private Trust?", answer: "A Public Trust is created for the benefit of the general public (charitable/religious), whereas a Private Trust is for a designated group of individuals (e.g., family members)." },
            { question: "How many trustees are required to register a trust?", answer: "A minimum of two trustees are required, but there is no maximum limit." }
          ]
        }
      },
      { 
        name: "Public Limited Company", 
        tag: "#PublicLtd",
        slug: "public-limited-company",
        description: "A voluntary association of members which is incorporated under company law, suitable for large scale business.",
        details: {
          overview: "A Public Limited Company is a corporate entity registered under the Companies Act, 2013, designed for large-scale operations. It has the right to invite capital investments from the public, issue shares, and list its shares on major stock exchanges. It requires a minimum of 7 shareholders and 3 directors.",
          targetAudience: "Large businesses, enterprises intending to raise public capital, and mature firms preparing for an Initial Public Offering (IPO).",
          benefits: ["Raise Capital from Public", "Limited Liability", "Transferability of Shares", "High Credibility"],
          documents: ["PAN, Aadhaar & Photo of all 3+ Directors", "Identity proof of 7+ Shareholders", "Utility bill for Registered Office Proof", "NOC from Property Owner", "Bank Statements of Directors"],
          process: ["DSC & DIN Acquisition for all Directors", "Name Reservation (SPICe+ Part A)", "Filing Incorporation Documents (SPICe+ Part B)", "Drafting Detailed Prospectus & IPO Compliances (if listing)"],
          timeline: "20-25 Working Days",
          characteristics: [
            "Public Trading: Shares are publicly traded on stock exchanges (if listed).",
            "Unlimited Shareholders: No limit on the maximum number of shareholders.",
            "Strict Compliances: Heavily monitored by ROC and SEBI (if listed).",
            "Minimum 3 Directors: Mandatory to have at least three directors."
          ],
          pros: [
            "Unlimited capacity to raise capital via public stock offerings, debentures, and equity.",
            "Extremely high status, credit rating, and institutional credibility.",
            "Shares are highly liquid, allowing instant wealth creation and trade."
          ],
          cons: [
            "Extremely high incorporation and statutory compliance workload and costs.",
            "High vulnerability to public scrutiny, market movements, and hostile takeovers.",
            "Complete loss of business confidentiality due to mandatory public filings."
          ],
          commonMistakes: [
            "Inadequate drafting of the Articles of Association (AOA) regarding public share transfers.",
            "Underestimating the heavy recurring compliance costs, leading to legal defaults."
          ],
          postCompliances: [
            "Commencement of Business Certificate (INC-20A).",
            "Conducting Statutory Annual General Meetings (AGM).",
            "Filing AOC-4, MGT-7, and regular board meeting disclosures to ROC."
          ],
          faqs: [
            { question: "Is it mandatory for a Public Company to list on stock exchanges?", answer: "No, a public company can remain unlisted. It is only required to follow public listing compliances if it chooses to do an IPO." },
            { question: "Can a public company start with just two directors?", answer: "No, it must have a minimum of 3 directors and 7 shareholders." }
          ]
        }
      },
      { 
        name: "Producer Company", 
        tag: "#Producer",
        slug: "producer-company",
        description: "A legally recognized body of farmers/agriculturists with the aim to improve their standard of living.",
        details: {
          overview: "A Producer Company is incorporated under Chapter XXIA of the Companies Act, 2013, by a group of primary producers (farmers, agriculturists, artisans, etc.). It blends the cooperative system with the corporate model to give rural primary producers a formal business platform to improve their standard of living, secure agricultural credit, and export products.",
          targetAudience: "Farmer producer groups, rural cooperatives, agro-allied entrepreneurs, and organic farming clusters.",
          benefits: ["Limited Liability", "Tax Benefits for Agricultural Income", "Government Grants", "Separate Legal Entity"],
          documents: ["PAN & Aadhaar of all Directors (Min 5)", "Identity proof of 10+ Producer Members", "Land ownership proof or farming certificate", "Utility bill for Registered Office Proof", "NOC from Property Owner"],
          process: ["DSC & DIN Acquisition for Directors", "Name Reservation (SPICe+ Part A)", "Filing Incorporation SPICe+ Forms", "Drafting specialized agricultural MOA & AOA"],
          timeline: "20-30 Working Days",
          characteristics: [
            "Producer-Only Membership: Members must be primary producers (farmers, artisans, etc.).",
            "Minimum 10 Members: Formed by at least 10 primary producers or 2+ producer institutions.",
            "Cooperative Structure: Governed by the 'one member, one vote' cooperative rule."
          ],
          pros: [
            "Full corporate status and limited liability protection for small farmers.",
            "Access to heavy government funding, low-interest agricultural loans, and organic crop grants.",
            "Favorable corporate income tax exemptions on agricultural production activities."
          ],
          cons: [
            "Requires coordinating a minimum of 10 members, which is administratively complex.",
            "Strict MCA audits and regulations relative to simple cooperative societies.",
            "Strict limitations on share transfers; shares can only be traded among primary producers."
          ],
          commonMistakes: [
            "Including non-farmers as members or directors during incorporation, which is strictly illegal.",
            "Inadequate documentation of primary producer status (farming certificates) of the members."
          ],
          postCompliances: [
            "Appointment of Statutory Auditor within 30 days.",
            "Annual filing of financials (AOC-4) and Annual Return (MGT-7).",
            "Filing GST returns and keeping active agriculture production logs."
          ],
          faqs: [
            { question: "Who is a primary producer?", answer: "Any individual engaged in activities connected with green farming, animal husbandry, forest products, handloom, or handcrafts." },
            { question: "Is income tax applicable on Producer Companies?", answer: "Income from agricultural production is fully exempt. However, any income from processed products, packaging, or external trade is taxed at standard corporate rates." }
          ]
        }
      },
      { 
        name: "Indian Subsidiary", 
        tag: "#IndianSubsidiary",
        slug: "indian-subsidiary",
        description: "A company whose interests are controlled or owned by a foreign corporate body.",
        details: {
          overview: "An Indian Subsidiary is an entity incorporated in India under the Companies Act, 2013, where the majority of shares (or 100%) are held by a foreign parent company. It is the most popular route for multinational corporations (MNCs) to establish a formal corporate presence, hire employees, and conduct commercial business transactions in India.",
          targetAudience: "Foreign companies, multinational enterprises, tech MNCs, and global manufacturers entering the Indian market.",
          benefits: ["Limited Liability", "FDI Permitted", "Market Expansion", "Global Credibility"],
          documents: ["Apostilled/Consularized Board Resolution from foreign parent company", "Apostilled Identity & Address proofs of Foreign Directors", "Registered Office Proof in India (utility bill + rent agreement)", "NOC from property owner", "MOA & AOA of parent company"],
          process: ["Procuring Digital Signatures (DSC)", "Name Reservation (using unique foreign brand suffix)", "Apostilling & Legalizing foreign documents", "Filing SPICe+ Incorporation Forms", "Filing RBI FDI compliance reports (FC-GPR)"],
          timeline: "25-35 Working Days",
          characteristics: [
            "Foreign Control: Majority equity is owned by an overseas corporate body.",
            "Indian Director Requirement: Must have at least one resident director who stays in India for 182+ days.",
            "Separate Indian Legal Entity: Insulates the foreign parent company from local legal liabilities.",
            "FDI Compliance: Heavily governed by FEMA and RBI foreign investment regulations."
          ],
          pros: [
            "100% Foreign Direct Investment (FDI) allowed under the automatic route for most sectors.",
            "Full operational freedom to sign contracts, purchase property, and trade directly in India.",
            "Favorable tax structures, special economic zone (SEZ) benefits, and access to local tech talent."
          ],
          cons: [
            "Extremely high setup and compliance costs.",
            "Complex documentation requiring legal verification, translation, and apostilling.",
            "Strict compliance monitoring by RBI, FEMA, and Registrar of Companies."
          ],
          commonMistakes: [
            "Failing to appoint a resident Indian director, resulting in immediate incorporation rejection.",
            "Delaying the mandatory RBI filing (FC-GPR) for inward FDI remittance, which attracts severe penalties."
          ],
          postCompliances: [
            "Commencement of Business certificate filing (INC-20A).",
            "Filing RBI Form FC-GPR within 30 days of share allotment.",
            "Filing Annual Return (MGT-7) and financial audits with ROC."
          ],
          faqs: [
            { question: "Is 100% foreign ownership allowed?", answer: "Yes, 100% foreign ownership is allowed in most sectors like IT, e-commerce, consulting, and manufacturing under the automatic route." },
            { question: "What is 'Apostilling' of documents?", answer: "Apostilling is a form of international legalization that makes a document from one country valid in another country under the Hague Convention." }
          ]
        }
      },
    ],
    details: {
      benefits: ["Strategic Legal Structure", "Investor Readiness", "Global Scalability", "Asset Protection"],
      documents: ["Identity Proof", "Address Proof", "PAN Card", "Photograph"],
      process: ["Consultation", "Name Reservation", "Documentation", "Filing & Approval"],
      timeline: "10-20 Working Days",
    },
    faqs: [
      { question: "Which startup structure is best for funding?", answer: "Private Limited Company is the most preferred structure for venture capital and angel investment." },
      { question: "Can an NRI start a company in India?", answer: "Yes, NRIs can be directors and shareholders in Indian companies, including Indian Subsidiaries." }
    ]
  },
  {
    title: "Registrations",
    slug: "registrations",
    description: "Complete business registration and incorporation services.",
    services: [
      { 
        name: "Startup India", 
        tag: "#StartupIndia", 
        slug: "startup-india",
        description: "Obtain DPIIT Recognition to unlock tax holidays, funding, and government patent rebates.",
        details: {
          overview: "Startup India Recognition (DPIIT) is a flagship government initiative to foster innovation, unlock massive tax tax benefits, collateral-free credit, fast-track intellectual property processing, and exclusive public procurement advantages.",
          targetAudience: "Innovative tech startups, product-based companies, and high-growth ventures under 10 years old.",
          benefits: ["3-Year Income Tax Holiday", "80% Patent & Trademark Fee Rebate", "Easy Self-Compliance portal access", "Collateral-free credit opportunities"],
          documents: ["MCA Certificate of Incorporation", "Detailed innovative pitch deck", "Website or mobile app link"],
          process: ["Portal profile setup", "Drafting innovation write-up", "Filing DPIIT application", "DPIIT review and certificate grant"],
          timeline: "7-10 Working Days",
          faqs: [
            { question: "Is a traditional retail shop eligible for Startup India?", answer: "No, the startup must demonstrate innovation, technological improvement, or high scalability to qualify." }
          ]
        }
      },
      { 
        name: "Trade License", 
        tag: "#TradeLicense", 
        slug: "trade-license",
        description: "Municipal certificate mandatory to legally operate commercial trade within local civic limits.",
        details: {
          overview: "A Trade License is a mandatory municipal certificate authorizing you to carry out specific commercial trade or business activities at a declared physical site, ensuring the business respects zoning and local safety regulations.",
          targetAudience: "Retail shops, restaurants, commercial offices, and distributors.",
          benefits: ["Legal commercial operations", "Protects against municipal fines", "Access to current bank accounts"],
          documents: ["Electricity bill or property tax receipt", "Rent agreement / NOC", "PAN and Aadhaar of promoter", "Layout blueprints"],
          process: ["Zoning compliance check", "Filing municipal application", "Inspections (where required)", "Fee payment and certificate download"],
          timeline: "10-15 Working Days",
          faqs: [
            { question: "Is a Trade License valid across the state?", answer: "No, a Trade License is highly local and issued specifically for a single municipal address." }
          ]
        }
      },
      { 
        name: "FSSAI Registration", 
        tag: "#FSSAIRegistration", 
        slug: "fssai-registration",
        description: "Food safety registration compulsory for small food operators and home kitchens (turnover under 12L).",
        details: {
          overview: "Basic FSSAI Registration is a mandatory food safety certification issued by the Food Safety and Standards Authority of India (FSSAI) for small-scale food operators, home bakers, street vendors, and retailers with annual turnovers under ₹12 Lakhs.",
          targetAudience: "Home kitchens, street stalls, small bakeries, and local grocery stores.",
          benefits: ["Complete legal safety compliance", "Aggregator onboarding (Swiggy/Zomato)", "Trust and hygiene assurance"],
          documents: ["PAN and Aadhaar of owner", "Passport size photo", "Proof of business address", "NOC from property owner"],
          process: ["FoSCoS portal application", "Uploading identity and address proof", "Government fee payment", "Instant digital certificate grant"],
          timeline: "3-5 Working Days",
          faqs: [
            { question: "Can I operate a home kitchen without FSSAI?", answer: "No, safety laws mandate that every business dealing with food must be registered, regardless of size." }
          ]
        }
      },
      { 
        name: "FSSAI License", 
        tag: "#FSSAILicense", 
        slug: "fssai-license",
        description: "State & Central FSSAI licensing for medium/large scale food manufacturing, processing, and restaurants.",
        details: {
          overview: "An FSSAI License (State or Central) is a mandatory food safety approval for medium and large-scale food business operators, restaurants, packaging units, and importers handling commercial food operations exceeding ₹12 Lakhs.",
          targetAudience: "Standard restaurants, cloud kitchens, multi-state operators, food manufacturers, and importers.",
          benefits: ["Brand credibility", "SWIFT Swiggy & Zomato integration", "Director protection", "Enables global food trade"],
          documents: ["Microbiological water test report", "Layout plan showing dimensions", "List of equipment and machinery", "Occupier details"],
          process: ["Determining license category (State vs Central)", "Filing FoSCoS portal forms", "Officer physical audit (if required)", "License issuance"],
          timeline: "15-30 Working Days",
          faqs: [
            { question: "What is the threshold for a Central FSSAI License?", answer: "If your food business turnover exceeds ₹20 Crores, or if you import food items into India, a Central License is mandatory." }
          ]
        }
      },
      { 
        name: "Halal License & Certification", 
        tag: "#HalalCertification", 
        slug: "halal-certification",
        description: "Obtain certified Halal credentials to guarantee product compliance with international Halal standards.",
        details: {
          overview: "Halal Certification is an international standard certificate validating that cosmetic, chemical, food, or pharmaceutical products adhere strictly to islamic dietary and manufacturing laws, making them eligible for global export to Muslim-majority countries.",
          targetAudience: "Food exporters, cosmetics brands, pharmaceutical companies, and slaughterhouse operators.",
          benefits: ["Access to Middle-East and global Halal markets", "Premium brand value", "Consumer trust and food safety assurance"],
          documents: ["Business registration", "Ingredient detail sheets", "ISO & FSSAI certificates", "Process flowchart"],
          process: ["Application to certifying council", "Document audit of ingredients", "On-site inspector audit", "Council approval and certificate issuance"],
          timeline: "15-20 Working Days",
          faqs: [
            { question: "Is Halal certification recognized internationally?", answer: "Yes, our certified partners issue internationally recognized Halal credentials valid for GCC and Southeast Asian markets." }
          ]
        }
      },
      { 
        name: "ICEGATE Registration", 
        tag: "#ICEGATERegistration", 
        slug: "icegate-registration",
        description: "Official electronic data interchange portal setup for Indian Customs clearing, tracking, and duty filing.",
        details: {
          overview: "ICEGATE Registration establishes your electronic data interchange dashboard on the Indian Customs portal, enabling importers, exporters, and cargo agents to clear customs, pay duties, file shipping bills, and track consignments online.",
          targetAudience: "Importers, exporters, customs house agents, and shipping companies.",
          benefits: ["Fast customs clearance", "Online duty payment", "Live consignment tracking", "Access to export incentive disbursements"],
          documents: ["Import Export Code (IEC)", "Aadhaar and PAN of authorized signatory", "Digital Signature Certificate (DSC)", "Email and mobile linked to GST"],
          process: ["Accessing ICEGATE portal", "Entering IEC details", "Uploading DSC and identity verifications", "Portal activation"],
          timeline: "3-5 Working Days",
          faqs: [
            { question: "Is a DSC required for ICEGATE?", answer: "Yes, a valid Class-3 Digital Signature Certificate is mandatory to complete ICEGATE registration and sign custom files." }
          ]
        }
      },
      { 
        name: "Import Export Code", 
        tag: "#ImportExportCode", 
        slug: "import-export-code",
        description: "Mandatory 10-digit DGFT registration needed to legally import or export commodities globally from India.",
        details: {
          overview: "The Import Export Code (IEC) is a 10-digit identification code issued by the Directorate General of Foreign Trade (DGFT). It is mandatory for any individual or corporate entity looking to import or export goods/services from India legally.",
          targetAudience: "Exporters, global e-commerce brands, cargo companies, and wholesale importers.",
          benefits: ["Lifetime validity", "No recurring filing requirements", "Access to national export promotional subsidies"],
          documents: ["PAN Card of business/promoter", "Cancelled cheque of the current account", "Aadhaar Card", "Office address proof"],
          process: ["Registering on DGFT portal", "Form ANF-2A compilation", "Uploading cheque copy", "Paying fees & instant download"],
          timeline: "1-2 Working Days",
          faqs: [
            { question: "Do I need to update my IEC annually?", answer: "Yes, recent DGFT rules mandate that all IEC holders must verify and update their portal profile annually between April and June." }
          ]
        }
      },
      { 
        name: "Legal Entity Identifier Code", 
        tag: "#LegalEntityIdentifier", 
        slug: "legal-entity-identifier",
        description: "Unique 20-character global reference code mandatory for large-scale corporate financial transactions.",
        details: {
          overview: "The Legal Entity Identifier (LEI) is a unique 20-character global reference code designed to identify corporate entities conducting large-value financial transactions (exceeding ₹50 Crores, as per RBI directives) in financial markets.",
          targetAudience: "Large corporate borrowers, institutional investors, public companies, and global exporters.",
          benefits: ["RBI financial compliance", "Risk mitigation", "Global institutional credibility", "Facilitates high-value transactions"],
          documents: ["Certificate of Incorporation", "PAN of the firm", "Board resolution authorizing applicant", "Aadhaar and PAN of authorized directors"],
          process: ["Submitting data to Local Operating Unit (LOU)", "Validating corporate records", "Fee payment", "LEI code generation"],
          timeline: "2-4 Working Days",
          faqs: [
            { question: "What is the validity of an LEI code?", answer: "An LEI code is valid for exactly 1 year and must be renewed annually to maintain compliant transactional status." }
          ]
        }
      },
      { 
        name: "ISO Registration", 
        tag: "#ISORegistration", 
        slug: "iso-registration",
        description: "Secure international ISO standards certifications (9001, 14001, 27001) to confirm global quality benchmarks.",
        details: {
          overview: "ISO Certification validates that your organization adheres to international standards of safety, quality, and operational efficiency (such as ISO 9001 for Quality Management or ISO 27001 for Information Security).",
          targetAudience: "Manufacturers, software agencies, healthcare clinics, and bidders for corporate or global tenders.",
          benefits: ["Elite international branding", "Enhanced trust with clients", "Required for global bidding and government tenders"],
          documents: ["Business registration proof", "PAN Card of the firm", "Brief product/service flow profile"],
          process: ["Standard selection & audit preparation", "Gap analysis", "Certification agency audit", "Certificate issuance"],
          timeline: "5-7 Working Days",
          faqs: [
            { question: "How long is an ISO certificate valid?", answer: "It is valid for 3 years, subject to annual surveillance audits to ensure continued standard compliance." }
          ]
        }
      },
      { 
        name: "PF Registration", 
        tag: "#PFRegistration", 
        slug: "pf-registration",
        description: "Mandatory Provident Fund pension and retirement savings system registration for companies with 20+ staff.",
        details: {
          overview: "PF Registration covers your corporate firm under the Employees' Provident Funds and Miscellaneous Provisions Act, 1952. This is mandatory for any firm employing 20 or more staff members, enabling employee retirement savings.",
          targetAudience: "Factories, commercial offices, IT firms, and retail organizations with 20+ staff.",
          benefits: ["Legal social security compliance", "Enhanced corporate reputation", "Retirement pension for employees"],
          documents: ["Business incorporation certificate", "PAN of the firm", "Employee salary sheets & Aadhaar cards", "Digital signature of director"],
          process: ["Portal registration on EPFO Shram Suvidha", "Employer details entry", "Digital signature registration", "Permanent PF code allocation"],
          timeline: "3-5 Working Days",
          faqs: [
            { question: "Can a company register voluntarily under PF?", answer: "Yes, companies with fewer than 20 employees can opt for voluntary PF registration to provide benefits to their employees." }
          ]
        }
      },
      { 
        name: "ESI Registration", 
        tag: "#ESIRegistration", 
        slug: "esi-registration",
        description: "Mandatory Employee State Insurance medical cover social security registration for firms with 10+ employees.",
        details: {
          overview: "ESI Registration provides a comprehensive medical insurance shield and cash allowances to employees earning under ₹21,000 per month, mandatory for all commercial establishments employing 10 or more workers.",
          targetAudience: "Offices, restaurants, manufacturing plants, and logistics firms with 10+ employees.",
          benefits: ["Free medical cover for employees & family", "Protects employers from workplace injury liability", "Sickness & maternity cash allowances"],
          documents: ["Incorporation proof", "PAN of the business", "List of employees with salary sheets & details"],
          process: ["Online application on ESIC portal", "Entering employer and employee details", "ESI numbers allocation", "ESI code grant"],
          timeline: "3-5 Working Days",
          faqs: [
            { question: "Is ESI exit possible if staff strength drops below 10?", answer: "No, once registered under the ESI Act, compliance is mandatory indefinitely regardless of employee count." }
          ]
        }
      },
      { 
        name: "Professional Tax Registration", 
        tag: "#PTRegistration", 
        slug: "professional-tax-registration",
        description: "Official PTEC & PTRC regional state-level professional tax registrations for employers and specialists.",
        details: {
          overview: "Professional Tax is a state-level tax levied on salaried employees, professionals (Doctors, CAs, Lawyers), and commercial traders. Registration under PTEC (entity) and PTRC (employee) is essential in active states.",
          targetAudience: "Employers, specialists, traders, and service providers operating in PT-applicable states.",
          benefits: ["Complies with regional state labor laws", "Prevents financial state penalties", "Enables trade permit renewals"],
          documents: ["Company incorporation proof", "Firm PAN and bank statement", "Employee salary details"],
          process: ["Filing application on the State Tax portal", "Verifying company details", "Obtaining PTEC & PTRC certificates"],
          timeline: "3-5 Working Days",
          faqs: [
            { question: "Is Professional Tax applicable in all Indian states?", answer: "No, professional tax is state-dependent; states like Delhi, Haryana, and Rajasthan do not levy Professional Tax." }
          ]
        }
      },
      { 
        name: "RCMC Registration", 
        tag: "#RCMC", 
        slug: "rcmc-registration",
        description: "Obtain Registration Cum Membership Certificate from export councils to unlock major export benefits.",
        details: {
          overview: "RCMC Registration (Registration Cum Membership Certificate) is issued by Export Promotion Councils (like APEDA, FIEO, EEPC). It is mandatory for exporters wanting to claim duty drawbacks, tax rebates, and concessions under the Foreign Trade Policy.",
          targetAudience: "Agricultural exporters, chemical manufacturers, textile exporters, and global traders.",
          benefits: ["Unlocks duty drawback schemes", "Required for DGFT export concessions", "Export networking and trade fair access"],
          documents: ["Import Export Code (IEC)", "PAN and Aadhaar of promoter", "Manufacturing proof / FSSAI (for agricultural products)"],
          process: ["Identifying the relevant Export Promotion Council", "Filing RCMC portal form", "Fee payment and certificate allotment"],
          timeline: "7-12 Working Days",
          faqs: [
            { question: "Is RCMC mandatory for all exports?", answer: "No, RCMC is only mandatory if you wish to claim export incentives, rebates, or duty drawbacks from the government." }
          ]
        }
      },
      { 
        name: "TN RERA Registration for Agents", 
        tag: "#TNRERA", 
        slug: "tn-rera-registration-agents",
        description: "Mandatory Tamil Nadu Real Estate Regulatory Authority registration for real estate agents and brokers.",
        details: {
          overview: "TN RERA Registration is a mandatory legal registration for real estate agents, brokers, and consultants operating in Tamil Nadu, ensuring all property sales, commissions, and ads are transparent and legally authorized.",
          targetAudience: "Property consultants, real estate brokers, and marketing agents in Tamil Nadu.",
          benefits: ["Legal authority to broker RERA properties", "High consumer trust and elite branding", "Prevents heavy RERA fines (up to ₹10,000/day)"],
          documents: ["PAN and Aadhaar of the agent", "Business address proof", "Photograph", "Income tax returns of past 3 years", "Enterprise structure details (if firm)"],
          process: ["Filing application on the TN RERA portal", "Filing details of previous real estate experience", "Paying agent fee", "RERA registration certificate grant"],
          timeline: "15-20 Working Days",
          faqs: [
            { question: "Can an agent sell properties without RERA?", answer: "No, advertising, marketing, booking, or selling plots/apartments in RERA registered projects is strictly illegal without a RERA agent license." }
          ]
        }
      },
      { 
        name: "12A and 80G Registration", 
        tag: "#12A80G", 
        slug: "12a-80g-registration",
        description: "Combined tax-exemption NGO registration enabling donor tax deductions and corporate CSR funding.",
        details: {
          overview: "12A and 80G Registration is a combined application filed with the Income Tax Department to secure complete income tax exemptions for your NGO (12A) and enable donors to claim 50% tax deductions on their donations (80G).",
          targetAudience: "NGOs, Section 8 companies, public charitable trusts, and societies.",
          benefits: ["NGO income is 100% tax-free", "Attracts high-value corporate donations", "Prerequisite for corporate CSR grants"],
          documents: ["NGO incorporation certificate", "Trust Deed / MOA & AOA", "Detailed 3-year operations activity reports", "NGO Darpan ID"],
          process: ["Filing Form 10A (12A) and Form 10G (80G)", "Submitting financial books and balance sheets", "Responding to Income Tax Commissioner queries", "Obtaining final certificates"],
          timeline: "45-60 Working Days",
          faqs: [
            { question: "Are these registrations permanent?", answer: "No, under recent amendments, provisional registrations are initially granted for 3 years, which must be converted to regular registration within that period." }
          ]
        }
      },
      { 
        name: "12A Registration", 
        tag: "#12ARegistration", 
        slug: "12a-registration",
        description: "Income Tax exemption status certification for non-profits, NGOs, societies, and trusts.",
        details: {
          overview: "12A Registration is a one-time exemption status granted by the Income Tax Department. Once obtained, the entire income generated by the NGO is fully exempt from income tax, provided the funds are used for charitable objectives.",
          targetAudience: "Charitable trusts, Section 8 companies, and societies.",
          benefits: ["Exempts entire NGO income from tax", "Strong proof of legitimate non-profit status"],
          documents: ["Trust Deed / Registration Certificate", "Activity reports of past 3 years", "PAN of the NGO"],
          process: ["Filing Form 10A online", "Verifying operations and bank statements", "Receiving 12A exemption certificate"],
          timeline: "30-45 Working Days",
          faqs: [
            { question: "Is 12A registration applicable to private family trusts?", answer: "No, 12A is exclusively for public charitable, non-profit trusts and institutions." }
          ]
        }
      },
      { 
        name: "80G Registration", 
        tag: "#80GRegistration", 
        slug: "80g-registration",
        description: "Legal certification enabling donors to claim 50% income tax deductions on their charitable contributions.",
        details: {
          overview: "An 80G Certificate is the ultimate donor-attraction tool for any NGO. It allows individuals and corporate groups who donate to your NGO to deduct up to 50% of the donated amount from their taxable income under Section 80G.",
          targetAudience: "Public charitable NGOs, Section 8 companies, and educational trusts.",
          benefits: ["Encourages donors to contribute", "Access to CSR funds", "High institutional credibility"],
          documents: ["12A certificate copy", "Trust Deed / MOA & AOA", "Detailed list of trustees & PANs"],
          process: ["Filing Form 10G online", "Verifying donation receipts", "Obtaining 80G deduction status"],
          timeline: "30-45 Working Days",
          faqs: [
            { question: "Is there a limit on cash donations under 80G?", answer: "Yes, cash donations exceeding ₹2,000 are not eligible for 80G tax benefits. Donors must contribute digitally to claim deductions." }
          ]
        }
      },
      { 
        name: "Barcode Registration", 
        tag: "#Barcode", 
        slug: "barcode-registration",
        description: "Acquire international GS1 barcode numbers for your retail products to sell on global retail and e-commerce platforms.",
        details: {
          overview: "Barcode Registration provides internationally recognized GS1 barcode numbers (EAN/UPC) for your retail products. This is a mandatory requirement to sell your products on major retail shelves and online platforms (like Amazon, Flipkart, Reliance Retail).",
          targetAudience: "FMCG brands, cosmetic manufacturers, electronics brands, and retail packagers.",
          benefits: ["Sell globally on Amazon, Flipkart, etc.", "Flawless inventory scanning", "Eliminates duplicate SKU risks"],
          documents: ["PAN and Aadhaar of promoter", "MSME/Incorporation certificate", "Product description details & SKU counts"],
          process: ["Registering with GS1 India", "Selecting product category and SKU volume (100, 1000, 10000)", "Fee payment", "Acquiring GS1 barcode ranges"],
          timeline: "3-5 Working Days",
          faqs: [
            { question: "What is GS1?", answer: "GS1 is the global non-profit organization that manages international standards for retail barcodes." }
          ]
        }
      },
      { 
        name: "BIS Registration", 
        tag: "#BIS", 
        slug: "bis-registration",
        description: "Bureau of Indian Standards product quality and safety mark registrations (ISI mark / CRS schemes).",
        details: {
          overview: "BIS Registration ensures that products (electronics, household appliances, steel, toy items) meet safety and quality specifications under the Bureau of Indian Standards (BIS) ISI Mark or Compulsory Registration Scheme (CRS).",
          targetAudience: "Hardware manufacturers, electronics brands, toy makers, and chemical producers.",
          benefits: ["Permits commercial sale under ISI mark safety laws", "High quality branding", "Collateral for government supply tenders"],
          documents: ["NABL lab test report of product sample", "Factory layout blueprints", "List of manufacturing machinery", "PAN & Aadhaar of director"],
          process: ["Sample testing in NABL certified lab", "Filing online BIS application", "Factory physical audit (for ISI mark)", "BIS certification grant"],
          timeline: "30-45 Working Days",
          faqs: [
            { question: "Is BIS mandatory for electronics?", answer: "Yes, under the CRS scheme, key electronics like smartphones, power adapters, and laptops mandatorily require BIS registration." }
          ]
        }
      },
      { 
        name: "Certificate of Incumbency", 
        tag: "#IncumbencyCertificate", 
        slug: "certificate-of-incumbency",
        description: "Official corporate document confirming the current directors, officers, and financial standing of a company.",
        details: {
          overview: "A Certificate of Incumbency is an official corporate document certifying the identities, active status, roles, and signing authorities of a company's current directors, shareholders, and officers, typically used for opening foreign bank accounts or legal transactions.",
          targetAudience: "Exporters, multinational subsidiaries, and companies setting up global bank accounts.",
          benefits: ["Legally validates signing authorities", "Mandatory for international business transactions", "Fosters trust with global banks"],
          documents: ["Active MCA company incorporation certificate", "Latest list of directors filed with ROC", "Board Resolution", "Director identity proofs"],
          process: ["Compiling company records from MCA registry", "Drafting incumbency details", "Corporate signature & notary authentication"],
          timeline: "2-4 Working Days",
          faqs: [
            { question: "Is this document issued by the MCA?", answer: "No, it is drafted and verified by a corporate secretary or notary, backed by active government MCA database filings." }
          ]
        }
      },
      { 
        name: "Darpan Registration", 
        tag: "#NGODarpan", 
        slug: "darpan-registration",
        description: "Mandatory NITI Aayog portal enrollment for NGOs to qualify for government grants and welfare schemes.",
        details: {
          overview: "Darpan Registration enrolls your NGO on the NITI Aayog NGO Darpan portal. It allocates a unique ID that is mandatory to qualify for any central/state government grants, welfare projects, or CSR schemes in India.",
          targetAudience: "Public charitable trusts, societies, and Section 8 companies.",
          benefits: ["Access to central/state government grants", "Mandatory for 12A/80G filings", "Elite transparency ranking"],
          documents: ["NGO PAN Card", "Trust Deed / MOA & AOA", "Aadhaar and PAN details of all trustees / board members"],
          process: ["NGO Darpan portal registration", "Entering trustee PAN details", "Detailed description of charitable sectors", "Unique ID generation"],
          timeline: "3-5 Working Days",
          faqs: [
            { question: "Is NGO Darpan registration free?", answer: "Yes, NGO Darpan portal registration is completely free of cost on NITI Aayog's portal." }
          ]
        }
      },
      { 
        name: "Digital Signature", 
        tag: "#DSC", 
        slug: "digital-signature",
        description: "Class-3 USB crypto-token digital signatures needed for MCA, Income Tax, GST, and e-tender portal filings.",
        details: {
          overview: "A Digital Signature Certificate (DSC) Class-3 provides the highest level of electronic signature security. Encrypted in a FIPS-compliant USB Crypto-token, it is mandatory to sign digital filings for MCA, GST, ITR, and e-tenders.",
          targetAudience: "Company directors, partners, CAs, lawyers, and bidding contractors.",
          benefits: ["Enables all corporate online portal filings", "Tamper-proof digital security", "Legally recognized under the IT Act, 2000"],
          documents: ["PAN and Aadhaar card of applicant", "Passport size photo", "Mobile number & email ID"],
          process: ["Online portal setup", "E-KYC XML verification", "Filing video check", "Crypto-token download"],
          timeline: "1-2 Hours",
          faqs: [
            { question: "Can a foreigner obtain an Indian DSC?", answer: "Yes, foreign nationals can obtain an Indian DSC by submitting apostilled identity and address proofs." }
          ]
        }
      },
      { 
        name: "Shop Act Registration", 
        tag: "#ShopAct", 
        slug: "shop-act-registration",
        description: "Mandatory labor certificate for shops and commercial offices operating inside municipal boundaries.",
        details: {
          overview: "Shop Act Registration (also known as Shop & Establishment License) is a mandatory labor registration for every physical shop, commercial office, hotel, or warehouse, regulating working hours and basic wage rules.",
          targetAudience: "Retail shops, restaurants, commercial offices, and clinics.",
          benefits: ["Mandatory address proof for business bank accounts", "Complies with state labor guidelines", "Eligibility for local trade permits"],
          documents: ["Proprietor Aadhaar and PAN", "Electricity bill of shop/office", "NOC / Rent Agreement", "Photo of shop with sign board"],
          process: ["Online application on State Labour portal", "Uploading business photographs and details", "Paying fees & instant download"],
          timeline: "3-5 Working Days",
          faqs: [
            { question: "Is this required for a remote IT company?", answer: "Yes, if you operate out of a physical commercial office space in any state, a Shop Act license is mandatory." }
          ]
        }
      },
      { 
        name: "Udyam Registration", 
        tag: "#Udyam", 
        slug: "udyam-registration",
        description: "Obtain MSME Udyam status to access bank loan schemes, collateral-free credit, and delayed payment protections.",
        details: {
          overview: "Udyam Registration is a permanent MSME government registration, giving small businesses access to collateral-free bank loans, subsidized interest rates, delayed payment protection (45-day rule), and concessions on patent fees.",
          targetAudience: "Small scale manufacturers, traders, and service providers.",
          benefits: ["Collateral-free loans", "Subsidized interest rates", "Protects against buyers who delay payments (45-day terms)", "Electricity bill concessions"],
          documents: ["Aadhaar and PAN of applicant", "Bank account details & IFSC", "Primary business classification details"],
          process: ["Udyam portal registration", "Verifying Aadhaar and PAN", " turnover inputs", "Udyam Certificate download"],
          timeline: "1-2 Working Days",
          faqs: [
            { question: "What is the validity of an Udyam Certificate?", answer: "Udyam Registration is a permanent certificate with lifetime validity; it does not require renewals." }
          ]
        }
      },
      { 
        name: "Fire License", 
        tag: "#FireLicense", 
        slug: "fire-license",
        description: "Official fire safety clearance certificate (NOC) issued by regional Fire and Emergency Services departments.",
        details: {
          overview: "A Fire License (Fire NOC) is an official safety certificate issued by the state's Fire and Emergency Services, confirming that a physical commercial facility has adequate fire extinguishing systems and is safe for occupancy.",
          targetAudience: "Hotels, restaurants, multiplexes, manufacturing plants, schools, and high-rise commercial structures.",
          benefits: ["Ensures complete occupier safety compliance", "Prerequisite for Trade & FSSAI licenses", "Protects against municipal shutdowns"],
          documents: ["Building layout plans approved by local authority", "Details of fire fighting equipment installed", "PAN & Aadhaar of promoter", "Zoning certificates"],
          process: ["Submitting building blueprints", "Department review and site safety audit by Fire Officer", "Resolving safety queries", "Fire NOC Certificate grant"],
          timeline: "20-30 Working Days",
          faqs: [
            { question: "How often must a Fire NOC be renewed?", answer: "For commercial buildings, a Fire NOC is typically renewed annually or every 2 years, depending on state regulations." }
          ]
        }
      },
      { 
        name: "Legal Name Change", 
        tag: "#NameChange", 
        slug: "legal-name-change",
        description: "Complete legal publication and Gazetted notification services for official individual or corporate name changes.",
        details: {
          overview: "Legal Name Change facilitates the complete, legally recognized procedure for modifying your name due to marriage, divorce, or preference, culminating in an official Gazette of India publication.",
          targetAudience: "Individuals wanting to correct passport/Aadhaar names, and corporate entities rebranding.",
          benefits: ["Updates names across all passports, bank accounts, and properties", "100% legal document verification", "Eliminates duplicate name mismatch errors"],
          documents: ["Original notarized Name Affidavit", "Newspaper clippings (two papers)", "Identity proofs", "Passport photo"],
          process: ["Drafting and notarizing affidavit", "Publishing name ads in two local papers", "Filing application with Department of Publication", "Gazette notification download"],
          timeline: "20-30 Working Days",
          faqs: [
            { question: "Is Gazette publication mandatory for name change?", answer: "Yes, for government employees and standard passport revisions, the official Gazette publication is the only legally accepted proof." }
          ]
        }
      },
      { 
        name: "Water Testing", 
        tag: "#WaterTesting", 
        slug: "water-testing",
        description: "Certified NABL microbiological and chemical water test reports to confirm potability and secure FSSAI/industrial permits.",
        details: {
          overview: "Water Testing provides comprehensive chemical and microbiological analysis of drinking and industrial water in certified NABL laboratories, mandatory to secure FSSAI food licensing, trade permits, and industrial clearances.",
          targetAudience: "Restaurants, cloud kitchens, food processors, schools, and manufacturing plants.",
          benefits: ["NABL accredited test reports", "Prerequisite for FSSAI licenses", "Ensures complete safe drinking water"],
          documents: ["Water sample details", "Source location parameters"],
          process: ["Sample collection in sterilized lab-provided bottles", "NABL laboratory analysis (PH, dissolved solids, bacteria)", "Generating certified test report"],
          timeline: "3-5 Working Days",
          faqs: [
            { question: "What parameters are tested for FSSAI?", answer: "Microbiological safety (absence of E. coli) and basic chemical parameters (PH, hardness, TDS) are mandatorily tested under IS 10500 standards." }
          ]
        }
      },
      { 
        name: "Food Testing", 
        tag: "#FoodTesting", 
        slug: "food-testing",
        description: "NABL lab analysis of nutritional values, shelf life, contaminants, and ingredients for retail compliance.",
        details: {
          overview: "Food Testing provides accredited laboratory testing of retail food products to compile accurate nutritional facts tables, determine product shelf-life parameters, confirm absence of toxins, and satisfy FSSAI packaging guidelines.",
          targetAudience: "Food packaging brands, organic food processors, and FMCG manufacturers.",
          benefits: ["Accurate nutritional facts labels", "Verified shelf-life certifications", "FSSAI retail compliant packaging"],
          documents: ["Product sample details", "Ingredient declaration sheets"],
          process: ["Submitting product samples to NABL lab", "Chemical and shelf-life stress testing", "Nutritional profiling & report generation"],
          timeline: "7-12 Working Days",
          faqs: [
            { question: "Why is nutritional facts testing important?", answer: "FSSAI rules mandate that every packaged retail food item must print a verified nutritional facts table (calories, proteins, fats, sugars) on its back panel." }
          ]
        }
      }
    ],
    details: {
      benefits: ["Limited Liability", "Separate Legal Entity", "Tax Benefits", "Capital Raising Ease"],
      documents: ["PAN Card", "Aadhaar Card", "Address Proof", "Photo"],
      process: ["Name Reservation", "DSC/DIN Application", "Document Drafting", "ROC Submission", "Certification"],
      timeline: "7-15 Working Days",
    },
    faqs: [
      { question: "Which legal structure is best for my startup?", answer: "Private Limited is generally preferred for startups looking to raise funding, while LLP is better for professional firms." },
      { question: "How long does it take to register a company?", answer: "Usually 7-15 working days depending on document availability and government approvals." }
    ]
  },
  {
    title: "Govt License",
    slug: "govt-license",
    description: "Essential government licenses and registrations for business operations.",
    services: [
      { 
        name: "Govt registrations", 
        tag: "#GovtRegistrations", 
        slug: "govt-registrations",
        description: "Acquire basic government licensing needed for regional corporate existence.",
        details: {
          overview: "Government Registrations cover a wide array of mandatory municipal and state licensing procedures needed to establish business operations in local jurisdictions. This includes registering with Municipalities, Fire departments, Environmental divisions, and Labor offices.",
          targetAudience: "All retail, commercial, food, and industrial business operations.",
          benefits: ["Legal compliance", "Credibility", "Prevents municipal shutdowns", "Access to state subsidies"],
          documents: ["PAN & Aadhaar of Applicant", "Business premises proof (utility bill/rent agreement)", "NOC from Property Owner", "Incorporation documents"],
          process: ["Strategic Consultation & Category Mapping", "Preparing Applications for relevant departments", "Online Submission on state single-window portals", "Handling Inspector audits (where applicable)", "Certification Grant"],
          timeline: "10-20 Working Days",
          characteristics: [
            "Strict Regulatory Oversight: Ensures adherence to public safety guidelines.",
            "Localized Norms: Complies fully with municipal laws and state regulations."
          ],
          pros: [
            "Insulates the brand from sudden government fines and closure notices.",
            "Enables smooth legal operations within the state."
          ],
          cons: [
            "Requires dealing with multiple bureaucratic departments."
          ],
          commonMistakes: [
            "Failing to renew municipal certifications within strict deadlines."
          ],
          postCompliances: [
            "Timely renewals and annual status reporting."
          ],
          faqs: [
            { question: "What is a single-window clearance?", answer: "It is an online system implemented by state governments allowing promoters to apply for multiple department licenses on a single dashboard." }
          ]
        }
      },
      { 
        name: "Labour License (S&E)", 
        tag: "#LabourLicense", 
        slug: "labour-license",
        description: "Mandatory Shop & Establishment registration for all commercial offices and retail stores.",
        details: {
          overview: "The Shop and Establishment Act license (also known as Gumasta or Trade License in some regions) is a mandatory registration for every commercial establishment, shop, hotel, or warehouse operating within municipal limits. It regulates working conditions, employee wages, leaves, and operating hours.",
          targetAudience: "Local retail shops, commercial offices, restaurants, warehouses, and service businesses.",
          benefits: ["Proof of commercial business address", "Mandatory for opening current bank accounts", "Legal compliance for hiring employees", "Eligibility for state-level business schemes"],
          documents: ["PAN Card of the owner/business", "Aadhaar Card of the applicant", "Utility bill of the office/shop", "Rent agreement or NOC", "Photo of the establishment showing the name board"],
          process: ["Online portal application on the State Labour Department website", "Uploading business and proprietor details", "Paying standard government fees", "Instant or verified approval & certificate download"],
          timeline: "3-5 Working Days",
          characteristics: [
            "State-specific rules: governed by individual state labour laws.",
            "Employee safety: regulates working hours, mandatory weekly offs, and basic amenities.",
            "Registration requirement: must be obtained within 30 days of starting business."
          ],
          pros: [
            "Cheap and extremely quick registration.",
            "Acts as legal proof of business presence."
          ],
          cons: [
            "Must be renewed periodically depending on the state.",
            "Subject to inspection by local labour commissioners."
          ],
          commonMistakes: [
            "Delaying application beyond 30 days of commencing operations.",
            "Uploading poor quality photographs of the shop facade."
          ],
          postCompliances: [
            "Displaying the certificate prominently at the business premises.",
            "Timely filing of renewals.",
            "Maintaining employee attendance and wage registers."
          ],
          faqs: [
            { question: "Do I need a Labour License if I have no employees?", answer: "Yes, even sole-operated offices and stores must register under the Shop & Establishment Act as it represents registration of the premises." }
          ]
        }
      },
      { 
        name: "Trade License Certificate", 
        tag: "#TradeLicense", 
        slug: "trade-license",
        description: "Municipal authorization needed to legally operate business at a specific site.",
        details: {
          overview: "A Trade License is a certificate issued by local municipal corporations authorizing an applicant to carry out a specific trade or business at a particular commercial location. It ensures that the trade does not cause any public nuisance, environmental hazard, or health risk.",
          targetAudience: "Retailers, hotels, restaurants, factories, food stalls, and manufacturing businesses.",
          benefits: ["Municipal compliance", "Prevents closure by local authorities", "Consumer safety assurance", "Legal credibility"],
          documents: ["PAN and Aadhaar of the applicant", "Electricity bill or Property tax receipt of premises", "Rent agreement or NOC", "Layout plan of the business facility", "Fire NOC (if applicable)"],
          process: ["Filing application on the local Municipal Corporation portal", "Selecting the trade category and calculating fee", "Officer inspection (for hazardous/food trades)", "Fee payment and license grant"],
          timeline: "10-15 Working Days",
          characteristics: [
            "Local regulation: issued by local civic bodies (MCD, BMC, etc.).",
            "Specific category: granted only for the specific trade selected.",
            "Annual renewal: mandatory renewal between March and April."
          ],
          pros: [
            "Prevents legal sealing or shutting down of shop by municipality.",
            "Assures customers of basic safety and hygiene compliance."
          ],
          cons: [
            "High municipal fees in premium commercial zones.",
            "Can be cancelled for public nuisance or violation of space rules."
          ],
          commonMistakes: [
            "Operating in a residential zone without commercial authorization.",
            "Not checking zoning laws before applying."
          ],
          postCompliances: [
            "Annual renewal within municipal timelines.",
            "Displaying the trade license number at the entrance."
          ],
          faqs: [
            { question: "Is a trade license the same as shop registration?", answer: "No, a Shop Act license regulates labor and employment parameters, whereas a Trade License specifically authorizes the commercial trade activity within the municipal area." }
          ]
        }
      },
      { 
        name: "MSME Udyam Registration", 
        tag: "#MSME", 
        slug: "msme-udyam-registration",
        description: "Get government MSME registration to avail tax benefits, subsidies, and easy bank loans.",
        details: {
          overview: "MSME Udyam Registration is a free government portal registration under the Ministry of Micro, Small, and Medium Enterprises. It awards a permanent identification number and e-certificate to help small businesses leverage diverse national incentives, collateral-free credit, subsidies, and fast-track dispute resolutions.",
          targetAudience: "Small manufacturers, service providers, wholesalers, and startup enterprises.",
          benefits: ["Collateral-free loans", "Subsidized interest rates", "Fast-track payment protection", "Electricity and patent fee concessions"],
          documents: ["Aadhaar Card of Applicant", "PAN Card of Business", "Bank Account Number & IFSC", "Primary business category details"],
          process: ["Online portal application", "Verification of Aadhaar and PAN", "Details entry of investment and turnover", "Udyam Certificate download"],
          timeline: "1-2 Working Days",
          characteristics: [
            "Completely Paperless: Instant generation based on database synchronization.",
            "Lifetime Validity: Registration does not require periodic renewals.",
            "Mandatory for government tenders: Opens doors to exclusive public supply contracts."
          ],
          pros: [
            "Extremely fast and completely free government registration.",
            "Powerful legal safety against large corporate buyers who delay payments (mandates 45-day payment terms)."
          ],
          cons: [
            "Only available for Micro, Small, and Medium enterprises within statutory capital and turnover limits."
          ],
          commonMistakes: [
            "Incorrect classification of industrial activity (NIC Code).",
            "Mismatched turnover figures with the Income Tax portal, resulting in classification issues."
          ],
          postCompliances: [
            "Keeping business parameters updated in the Udyam Portal annually."
          ],
          faqs: [
            { question: "Is there any registration fee?", answer: "No, MSME Udyam registration is completely free of cost on the government portal." },
            { question: "What are the turnover limits for a Micro enterprise?", answer: "Micro enterprises must have investments under ₹1 Crore and annual turnovers under ₹5 Crores." }
          ]
        }
      },
      { 
        name: "ISO Certificate Registration", 
        tag: "#ISO", 
        slug: "iso-certificate-registration",
        description: "Obtain international ISO certifications to prove brand safety and quality quality standards.",
        details: {
          overview: "ISO Certification (e.g., ISO 9001:2015 for Quality Management) is an international standard certification that proves your business meets global quality, safety, and efficiency benchmarks. It enhances brand value, operational efficiency, and eligibility for international contracts.",
          targetAudience: "Manufacturers, software firms, healthcare clinics, and service companies bidding for corporate or global contracts.",
          benefits: ["Elite global branding", "Enhanced customer trust", "Eligibility for global government tenders", "Improved internal efficiency"],
          documents: ["Business registration proof", "PAN Card of the firm", "Brief company profile", "Organizational chart", "List of products/services offered"],
          process: ["Selecting the ISO standard & certification body", "Conducting gap analysis and system implementation", "First-stage audit by ISO auditor", "Final audit and certification grant"],
          timeline: "5-10 Working Days",
          characteristics: [
            "International credibility: globally recognized quality marks.",
            "Continuous improvement: requires systematic process monitoring.",
            "Surveillance audits: periodic checks to maintain certification."
          ],
          pros: [
            "Increases win rate for large corporate bids.",
            "Reduces operational errors and product defects."
          ],
          cons: [
            "Requires strict documentation and adherence to standard procedures.",
            "Certification expires every 3 years."
          ],
          commonMistakes: [
            "Treating it as a mere paper certificate without implementing actual quality processes."
          ],
          postCompliances: [
            "Annual surveillance audits.",
            "Conducting periodic internal quality reviews."
          ],
          faqs: [
            { question: "What is ISO 9001?", answer: "ISO 9001 is the international standard that specifies requirements for a Quality Management System (QMS)." }
          ]
        }
      },
      { 
        name: "IE Code Registration", 
        tag: "#IECode", 
        slug: "ie-code-registration",
        description: "Mandatory 10-digit Import Export Code issued by the DGFT.",
        details: {
          overview: "The Import Export Code (IEC) is a 10-digit identification number issued by the Directorate General of Foreign Trade (DGFT), Ministry of Commerce. It is mandatory for any individual or business looking to import or export goods and services from India.",
          targetAudience: "E-commerce exporters, global traders, logistics firms, and wholesale importers.",
          benefits: ["Legal import/export capability", "Lifetime validity", "No recurring compliance filings", "Access to export promotion schemes"],
          documents: ["PAN Card of the business/individual", "Aadhaar Card", "Cancelled cheque or bank certificate of the current account", "Address proof of business"],
          process: ["Registering on the DGFT online portal", "Filing Form ANF-2A", "Uploading bank details and address proof", "Paying government fee", "Instant electronic generation of IEC"],
          timeline: "1-2 Working Days",
          characteristics: [
            "Unique 10-digit code: linked directly to the business PAN.",
            "No annual compliance: does not require filing separate import/export returns.",
            "Mandatory for customs clearance: customs will not release shipments without IEC."
          ],
          pros: [
            "Extremely fast and cheap to obtain.",
            "Opens up global e-commerce and international markets."
          ],
          cons: [
            "Mandatory to update the IEC details once a year on the DGFT portal, even if no changes occurred."
          ],
          commonMistakes: [
            "Delaying the annual IEC update, which results in the code being deactivated."
          ],
          postCompliances: [
            "Mandatory annual profile update on the DGFT portal (between April and June)."
          ],
          faqs: [
            { question: "Is IEC required for exporting services?", answer: "Generally, IEC is only required for goods. However, to avail export incentive benefits for services, you must have an IEC." }
          ]
        }
      },
      { 
        name: "Factory License Certificate", 
        tag: "#FactoryLicense", 
        slug: "factory-license",
        description: "Official safety and labor license needed to operate a manufacturing unit.",
        details: {
          overview: "A Factory License is a mandatory approval issued by the state's Factories Inspectorate under the Factories Act, 1948. It regulates the safety, health, welfare, working hours, and conditions of workers in manufacturing units employing 10 or more workers (with power) or 20 or more workers (without power).",
          targetAudience: "Manufacturing units, engineering workshops, printing presses, and chemical plants.",
          benefits: ["Worker safety compliance", "Prevents legal penalties and closure", "Protection of management against accident liabilities", "Enhanced credibility with large corporate buyers"],
          documents: ["Flowchart of manufacturing process", "Detailed building plan approved by local authority", "PAN and Aadhaar of Director/Occupier", "List of machinery with power ratings", "Fire NOC and Pollution Control Board NOC"],
          process: ["Submitting building plans for approval", "Online factory registration application", "Inspector site visit and safety audit", "Payment of license fee and certificate grant"],
          timeline: "20-30 Working Days",
          characteristics: [
            "Strict safety oversight: monitors hazardous chemicals, machinery guards, and fire exits.",
            "Worker welfare: mandates canteen, rest rooms, and first-aid kits.",
            "Varying fee: based on maximum number of workers and horsepower installed."
          ],
          pros: [
            "Crucial for legal operations of any manufacturing plant.",
            "Protects directors from personal criminal liabilities during workplace accidents."
          ],
          cons: [
            "Extremely high compliance and infrastructure requirements.",
            "Subject to frequent labor inspections."
          ],
          commonMistakes: [
            "Commencing factory production before getting final license approval.",
            "Exceeding the worker or horsepower limits specified in the license."
          ],
          postCompliances: [
            "Displaying safety norms and worker shift timings prominently.",
            "Submitting annual factory reports to the department."
          ],
          faqs: [
            { question: "Who is an Occupier under the Factories Act?", answer: "An Occupier is the designated director or partner who has ultimate control over the affairs of the factory." }
          ]
        }
      },
      { 
        name: "Startup India Registration", 
        tag: "#StartupIndia", 
        slug: "startup-india-registration",
        description: "Obtain DPIIT Recognition to unlock tax holidays and government patent rebates.",
        details: {
          overview: "The Startup India Recognition (DPIIT) is a flagship initiative of the Government of India designed to foster innovation, generate employment, and build a strong startup ecosystem. Recognized startups gain access to high-value intellectual property fast-tracking, major tax holidays, and simplified government bidding rules.",
          targetAudience: "Innovative tech startups, product-based companies, and high-growth ventures under 10 years old.",
          benefits: ["Income tax holiday (3 out of 10 years)", "80% rebate on trademark and patent fees", "Easy self-compliance for labor and environment laws", "Access to Government e-Marketplace (GeM) with no prior turnover rules"],
          documents: ["Certificate of Incorporation (Pvt Ltd or LLP)", "Brief pitch deck or write-up about the innovation", "Patent or prototype details (if available)", "Website or mobile app link"],
          process: ["Registering on the Startup India portal", "Submitting application for DPIIT Recognition", "Writing a detailed description of the innovation, scalability, and job creation potential", "DPIIT review and certificate issuance"],
          timeline: "7-10 Working Days",
          characteristics: [
            "Innovation focus: must prove the business is developing or improving a product/service.",
            "Limited tenure: valid up to 10 years from the date of incorporation.",
            "Turnover limit: annual turnover must not exceed ₹100 Crores in any financial year."
          ],
          pros: [
            "Access to the ₹10,000 Crore Fund of Funds and venture capital networks.",
            "Massive cost savings on trademark and patent filing fees."
          ],
          cons: [
            "Only applies to Private Limited companies or LLPs (Proprietorships are ineligible).",
            "Rejection is common if the pitch deck lacks clear innovative or technological differentiation."
          ],
          commonMistakes: [
            "Applying with a traditional service business without highlighting any innovation.",
            "Not having a professional pitch deck ready."
          ],
          postCompliances: [
            "Submitting annual reports of operations and funding."
          ],
          faqs: [
            { question: "Is tax exemption automatic after getting recognized?", answer: "No, after getting DPIIT recognition, you must apply separately for tax exemptions under Section 80-IAC to the Inter-Ministerial Board." }
          ]
        }
      },
      { 
        name: "ESI Registration Certificate", 
        tag: "#ESI", 
        slug: "esi-registration",
        description: "Mandatory Employee State Insurance social security registration for firms with 10+ staff.",
        details: {
          overview: "Employee State Insurance (ESI) is a self-financing social security scheme managed by the ESIC. It is mandatory for establishments employing 10 or more employees (or 20 in some states) earning under ₹21,000 per month, providing full medical cover and cash benefits during sickness, maternity, and disablement.",
          targetAudience: "Commercial offices, restaurants, retail businesses, and factories with 10+ employees.",
          benefits: ["Complete medical security for employees", "Protects employers from employee medical expense liabilities", "Cash benefits during maternity and medical leaves"],
          documents: ["Business registration proof", "PAN Card of the firm", "Employee salary sheets and date of joining", "Director/Partner details", "List of employees with Aadhaar and family details"],
          process: ["Registering on the Shram Suvidha portal", "Submitting company and employer details", "Entering employee registrations and allocating ESI numbers", "Generating active employer registration code"],
          timeline: "3-5 Working Days",
          characteristics: [
            "Mandatory contribution: employers contribute 3.25% and employees contribute 0.75% of wages.",
            "Medical card: employees receive an ESIC Pehchan Card for free hospital care.",
            "No exit once registered: once registered, compliance is mandatory even if employee count drops."
          ],
          pros: [
            "Increases employee loyalty and retention by providing healthcare.",
            "Maintains strict compliance with Indian labor laws."
          ],
          cons: [
            "Requires monthly contribution calculations and filing deadlines."
          ],
          commonMistakes: [
            "Not registering employees within 10 days of hiring, resulting in penalties."
          ],
          postCompliances: [
            "Monthly ESI contribution payments (by 15th of next month).",
            "Half-yearly filing of ESI returns."
          ],
          faqs: [
            { question: "What is the ceiling limit for ESI coverage?", answer: "Employees earning up to ₹21,000 per month are mandatorily covered. For disabled persons, the limit is ₹25,000." }
          ]
        }
      },
      { 
        name: "PF Registration Certificate", 
        tag: "#PF", 
        slug: "pf-registration",
        description: "Mandatory Provident Fund retirement savings registration for firms with 20+ staff.",
        details: {
          overview: "Provident Fund (PF) is a mandatory social security saving scheme managed by the EPFO. It is compulsory for any establishment employing 20 or more employees. It ensures that employees save a portion of their salary for retirement, supplemented by an equal contribution from the employer.",
          targetAudience: "Firms, factories, and corporate offices with 20 or more staff members.",
          benefits: ["Long term retirement savings for employees", "Pension benefits after retirement", "Easy emergency loan withdrawals"],
          documents: ["Business incorporation certificate", "PAN of the firm", "Salary details of all employees", "List of partners/directors", "Digital signature of the authorized signatory"],
          process: ["Registering on the unified EPFO portal", "Entering business classification details", "Uploading director details and digital signature", "EPF code allotment"],
          timeline: "3-5 Working Days",
          characteristics: [
            "Mandatory 12% deduction: 12% of employee salary is deducted and matched with 12% by the employer.",
            "UAN number: every employee receives a permanent Universal Account Number.",
            "Voluntary registration: businesses with under 20 employees can opt for voluntary registration."
          ],
          pros: [
            "Fosters strong employer reputation.",
            "Major tax savings for both employer and employee on contributions."
          ],
          cons: [
            "Adds to the monthly salary budget of the firm (additional 12% employer cost)."
          ],
          commonMistakes: [
            "Delaying the monthly deposit, which carries heavy daily interest (damages) and penalty rates."
          ],
          postCompliances: [
            "Monthly deposit of PF contributions (by 15th of next month).",
            "Monthly ECR return filings."
          ],
          faqs: [
            { question: "Can a business opt out of PF once registered?", answer: "No, once an establishment is registered under the EPF Act, it remains covered indefinitely even if the employee count drops below 20." }
          ]
        }
      },
    ],
    details: {
      benefits: ["Legal Compliance", "Business Credibility", "Access to Govt Schemes", "Ease of Operation"],
      documents: ["Business Proof", "ID Proof", "Property Documents", "Electricity Bill"],
      process: ["Application Preparation", "Online Submission", "Fee Payment", "Department Verification", "License Issuance"],
      timeline: "10-20 Working Days",
    },
    faqs: [
      { question: "What is MSME Udyam Registration?", answer: "It is a government registration for micro, small, and medium enterprises to avail benefits under the MSMED Act." },
      { question: "Do I need a Trade License?", answer: "Yes, if you are operating a commercial business within municipal limits." }
    ]
  },
  {
    title: "Food License",
    slug: "food-license",
    description: "FSSAI registration and licensing services for food businesses.",
    services: [
      { 
        name: "Food (FSSAI) License", 
        tag: "#FSSAI", 
        slug: "fssai-license",
        description: "Standard FSSAI registration mandatory for all food business operators.",
        details: {
          overview: "An FSSAI License is a mandatory food safety certificate issued by the Food Safety and Standards Authority of India (FSSAI). It regulates the manufacturing, storage, distribution, sale, and import of food products to ensure they meet standard hygiene and safety norms.",
          targetAudience: "Restaurants, cloud kitchens, food manufacturers, grocery stores, and packaging units.",
          benefits: ["Consumer Trust", "Legal Security", "Standardization", "Business Expansion"],
          documents: ["Identity Proof of Promoter", "Business Address Proof", "Food Category List", "Layout Plan of Food Premises (for State/Central Licenses)", "Water Test Report"],
          process: ["Category Identification (Basic/State/Central)", "Form Preparation and Document Compilation", "Filing Online Application on FoSCoS portal", "Inspection by Food Safety Officer (if applicable)", "Issuance of FSSAI Certificate"],
          timeline: "5-30 Working Days",
          characteristics: [
            "Compulsory Registration: Mandatory for all food handling businesses.",
            "Display of FSSAI Logo: Requires printing the 14-digit registration number on food packaging.",
            "Flexible Validity: Licenses can be selected for a period of 1 to 5 years."
          ],
          pros: [
            "Fosters high trust among online customers and aggregators (like Zomato, Swiggy).",
            "Protects the brand from heavy regulatory penalties and sealing of business operations."
          ],
          cons: [
            "Requires compliance with strict sanitary and hygiene guidelines.",
            "Subject to sudden inspections by local safety commissioners."
          ],
          commonMistakes: [
            "Applying for the wrong license category, leading to rejection and loss of fee.",
            "Failing to list all relevant food categories handled in the facility."
          ],
          postCompliances: [
            "Filing Annual Food Returns (FoSCoS).",
            "Mandatory compliance with safety audit certificates.",
            "Timely renewal of the license (before expiry date)."
          ],
          faqs: [
            { question: "Is FSSAI mandatory for small home bakers?", answer: "Yes, even small home bakers must acquire a Basic FSSAI registration if their turnover is under ₹12 Lakhs." },
            { question: "What happens if I delay FSSAI renewal?", answer: "Late renewal carries standard daily penalties. If not renewed before the expiry, the license is cancelled, and you must apply for a new one." }
          ]
        }
      },
      { 
        name: "Food (FSSAI) License Basic", 
        tag: "#FSSAIBasic", 
        slug: "fssai-basic",
        description: "Basic FSSAI registration for small food businesses with turnover under 12L.",
        details: {
          overview: "The Basic FSSAI Registration is designed specifically for micro food business operators, home-bakers, small retailers, and mobile food vendors. It acts as a basic certification of hygienic food practices.",
          targetAudience: "Small home kitchens, street vendors, local tea stalls, and micro retail units.",
          benefits: ["Legal compliance", "Access to food platforms", "Cheap registration fees", "Hygiene certification"],
          documents: ["PAN and Aadhaar of Promoter", "Passport photo", "Address proof of business premises", "NOC from property owner"],
          process: ["Portal registration on FoSCoS", "Uploading details and identity proof", "Fee payment of ₹100/year", "Instant or auto-generated certificate grant"],
          timeline: "3-5 Working Days",
          characteristics: [
            "Turnover limit: Applicable only if annual turnover is strictly under ₹12 Lakhs.",
            "Fast generation: Generated instantly in most states without safety officer visits."
          ],
          pros: [
            "Extremely low cost and fast registration.",
            "Allows legal registration on Zomato and Swiggy for home kitchens."
          ],
          cons: [
            "Must be upgraded to State License immediately if turnover exceeds ₹12 Lakhs."
          ],
          commonMistakes: [
            "Providing blurry photos of address proofs."
          ],
          postCompliances: [
            "Keeping basic hygiene logs."
          ],
          faqs: [
            { question: "Can a home kitchen operate without FSSAI?", answer: "No, under safety laws, no food business, regardless of size or home-office structure, can operate without FSSAI." }
          ]
        }
      },
      { 
        name: "State Food (FSSAI) License", 
        tag: "#FSSAIState", 
        slug: "fssai-state",
        description: "State level FSSAI license for medium food businesses (12L to 20Cr turnover).",
        details: {
          overview: "A State FSSAI License is a mandatory food safety certification issued by the State Food Safety Commissioner for medium-scale food businesses, restaurants, hotels, and packaging units operating within the state limits.",
          targetAudience: "Standard restaurants, large caterers, state-level distributors, and medium manufacturing plants.",
          benefits: ["Permits state-wide operations", "Consumer safety assurance", "Protects directors from liabilities", "Allows multiple kitchen branches"],
          documents: ["Layout plan of premises showing dimensions", "List of equipment and machinery installed", "PAN & Aadhaar of occupier", "Water test report from certified lab", "Rent/Utility proof"],
          process: ["Checking state category criteria", "Filing details on FoSCoS state portal", "Submitting blueprint and food safety plan", "Site inspection by Safety Officer", "Certificate grant"],
          timeline: "15-25 Working Days",
          characteristics: [
            "Turnover limit: Valid for businesses with annual turnovers between ₹12 Lakhs and ₹20 Crores.",
            "Facility Inspection: Compulsory audit of layout, pest-control, and fire safety."
          ],
          pros: [
            "Enables scale and state-wide operations under a single corporate brand.",
            "High brand value for secure commercial operations."
          ],
          cons: [
            "Requires heavy physical setup compliance (clean water, drainage, steel tables)."
          ],
          commonMistakes: [
            "Applying with poor water test certification, leading to instant suspension."
          ],
          postCompliances: [
            "Conducting annual food quality audits.",
            "Timely renewals."
          ],
          faqs: [
            { question: "Is water analysis mandatory for a State FSSAI License?", answer: "Yes, a clean water analysis report from an NABL accredited lab is mandatory to prove the water used is potable and safe." }
          ]
        }
      },
      { 
        name: "Central Food (FSSAI) License", 
        tag: "#FSSAICentral", 
        slug: "fssai-central",
        description: "Central level FSSAI license for large manufacturers, importers, and multi-state operators.",
        details: {
          overview: "A Central FSSAI License is the highest category of food safety approval issued by the Central FSSAI Commissioner. It is mandatory for large-scale manufacturers, importers, central government premises (airports, railways), and multi-state food operators.",
          targetAudience: "Food importers, large manufacturers, multi-state restaurant chains (with head offices), and export-oriented food units.",
          benefits: ["Allows nationwide import/export", "Centralized corporate compliance", "Maximum consumer trust", "High financial credit eligibility"],
          documents: ["Import Export Code (IEC) (for importers)", "Layout design and structural blueprints", "Aadhaar and PAN of Directors", "NABL water test report", "Trademark copy or logo registration proof"],
          process: ["Checking central criteria list", "Filing detailed application on Central FoSCoS portal", "Strict audit of manufacturing logs", "Physical inspection by Central Food Safety Officers", "License grant"],
          timeline: "20-30 Working Days",
          characteristics: [
            "High Limit: Mandatory if annual turnover exceeds ₹20 Crores.",
            "Foreign Import Authority: The only license that allows importing food items into India.",
            "Multi-State Head Office: Required if a brand operates kitchens across multiple states."
          ],
          pros: [
            "The premier food safety certificate in the country.",
            "Allows full import/export trade of food commodities."
          ],
          cons: [
            "Extremely high regulatory oversight and physical facility requirements."
          ],
          commonMistakes: [
            "Not having a valid IEC code when applying under the import category."
          ],
          postCompliances: [
            "Filing monthly/quarterly food safety audit logs.",
            "Annual filing of returns (Form D-1)."
          ],
          faqs: [
            { question: "Does a 100% export-oriented food unit require a Central FSSAI License?", answer: "Yes, all export-oriented food manufacturing and processing units must obtain a Central FSSAI License." }
          ]
        }
      },
    ],
    details: {
      benefits: ["Consumer Trust", "Legal Security", "Standardization", "Business Expansion"],
      documents: ["Identity Proof", "Business Address Proof", "Food Category List", "Water Test Report"],
      process: ["Form Selection", "Document Upload", "Application Fee", "Authority Review", "License Grant"],
      timeline: "5-30 Working Days",
    },
    faqs: [
      { question: "Difference between Basic, State, and Central FSSAI?", answer: "Classification depends on annual turnover and scale of operation (Basic < 12L, State 12L-20Cr, Central > 20Cr)." },
      { question: "Is FSSAI mandatory for cloud kitchens?", answer: "Yes, every food business operator must have an FSSAI license/registration." }
    ]
  },
  {
    title: "Goods & Service Tax",
    slug: "gst",
    description: "End-to-end GST registration and compliance solutions.",
    services: [
      { 
        name: "GST Registrations", 
        tag: "#GSTRegistration", 
        slug: "gst-registrations",
        description: "Register for Goods and Services Tax (GST) to legally invoice clients and claim input credit.",
        details: {
          overview: "GST Registration is the process by which a business registers under the GST Act to obtain a unique 15-digit GST Identification Number (GSTIN). This enables the business to collect tax from customers, pass on input tax credits, and carry out inter-state and e-commerce trade.",
          targetAudience: "Businesses with turnover above ₹20L/₹40L, e-commerce sellers, and contractors dealing with corporate clients.",
          benefits: ["Input Tax Credit", "Inter-state Business", "E-commerce Eligibility", "Tax Transparency"],
          documents: ["PAN Card of Promoter/Business", "Aadhaar Card", "Registered Office Address Proof (Rent/Utility)", "Bank current account statement or cancelled cheque"],
          process: ["TRN (Temporary Reference Number) Generation", "Uploading Business Details & Promoters Identity", "Verifying via Mobile/Email OTP", "Officer examination & physical verification (if required)", "GSTIN Certificate download"],
          timeline: "3-7 Working Days",
          characteristics: [
            "One Nation, One Tax: Replaces multiple indirect taxes like VAT, Service Tax, and Excise.",
            "15-digit Identification: Identifies State Code, PAN, and entity number.",
            "Mandatory for online supply: Mandatory for selling goods via online aggregators."
          ],
          pros: [
            "Enables seamless business across state lines.",
            "Allows claiming input credits on all business purchases, reducing tax expenses."
          ],
          cons: [
            "Heavy monthly and quarterly return filing compliances.",
            "Strict tax fines and interest rates for delayed payments."
          ],
          commonMistakes: [
            "Delaying registration once the turnover exceeds the statutory limits.",
            "Providing incomplete or blurry office address proofs, resulting in immediate show-cause notices."
          ],
          postCompliances: [
            "Filing GST Returns (GSTR-1 & GSTR-3B) monthly or quarterly.",
            "Mandatory tax payment on or before the due dates."
          ],
          faqs: [
            { question: "Is GST registration mandatory for services?", answer: "Yes, for service providers, GST is mandatory if the annual turnover exceeds ₹20 Lakhs." },
            { question: "Can I apply for voluntary GST registration?", answer: "Yes, businesses can opt for voluntary GST registration to claim input credits, even if their turnover is below the limits." }
          ]
        }
      },
      { 
        name: "GST Registration Number", 
        tag: "#GSTIN", 
        slug: "gst-registration-number",
        description: "Official acquisition and activation of active 15-digit GSTIN details.",
        details: {
          overview: "GST Registration Number services facilitate the active generation, verification, and rectification of the unique 15-digit GST Identification Number (GSTIN) issued by the GST Council of India.",
          targetAudience: "Firms looking to activate or correct their corporate tax ID parameters.",
          benefits: ["Active GSTIN", "Valid billing code", "Input tax eligibility", "Corporate verification"],
          documents: ["Firm PAN", "Aadhaar of Promoter", "Rent Agreement", "NOC"],
          process: ["Verifying portal parameters", "Filing details on GST portal", "Officer verification & physical check (if required)", "GSTIN Activation"],
          timeline: "3-7 Working Days",
          characteristics: [
            "Legal Verification: Instant verification on national tax portals.",
            "Corporate Identity: Validates your tax status globally."
          ],
          pros: [
            "Essential for legal invoicing."
          ],
          cons: [
            "Requires immediate monthly return reporting once activated."
          ],
          commonMistakes: [
            "Uploading outdated rent agreements."
          ],
          postCompliances: [
            "Displaying the GSTIN clearly at the business billing counter."
          ],
          faqs: [
            { question: "How is the GSTIN structured?", answer: "The first 2 digits represent the state code, the next 10 are the PAN, followed by entity code, default Z character, and check digit." }
          ]
        }
      },
      { 
        name: "GST Tax Filing", 
        tag: "#GSTFiling", 
        slug: "gst-tax-filing",
        description: "Professional GSTR return filing services to ensure 100% compliant bookkeeping.",
        details: {
          overview: "GST Tax Filing involves preparing and submitting periodic tax returns (GSTR-1, GSTR-3B, GSTR-9) containing details of sales, purchases, input tax credit claimed, and tax liability.",
          targetAudience: "GST registered proprietorships, companies, and traders.",
          benefits: ["Avoid heavy daily late fees", "Zero mismatch audit reports", "Maintains active GST status", "Maintains strong supplier relations"],
          documents: ["Sales invoices log", "Purchase bills and ITC logs", "Bank statements", "Previous return receipts"],
          process: ["Data aggregation and validation", "Reconciliation of GSTR-2B (ITC matching)", "Drafting returns and tax computation", "Filing on GST Portal & E-verification"],
          timeline: "2-3 Working Days",
          characteristics: [
            "Frequent deadlines: GSTR-1 by 11th and GSTR-3B by 20th of each month.",
            "QRMP Scheme: Option to file quarterly for small taxpayers under 5Cr."
          ],
          pros: [
            "Ensures flawless credit transmission to your clients, preventing commercial disputes."
          ],
          cons: [
            "High late fee penalties for delay (₹50/day)."
          ],
          commonMistakes: [
            "Failing to reconcile purchase bills with GSTR-2B, leading to incorrect ITC claims."
          ],
          postCompliances: [
            "Paying GST liability by the due date."
          ],
          faqs: [
            { question: "What is GSTR-1?", answer: "GSTR-1 is the monthly or quarterly return that contains details of all outward supplies (sales) made by a taxpayer." }
          ]
        }
      },
      { 
        name: "E-way Bill Creation", 
        tag: "#EWayBill", 
        slug: "eway-bill",
        description: "Fast generation of mandatory electronic transit documents for logistics.",
        details: {
          overview: "An E-Way Bill (Electronic Way Bill) is a mandatory document generated electronically on the GST portal for the movement of goods worth more than ₹50,000, as required by GST safety rules.",
          targetAudience: "Logistics companies, manufacturers, traders, and wholesalers.",
          benefits: ["Ensures smooth transport with no seizure risk", "Digital tracking of transit", "Fast verification at checkpoints", "Legal shipping proof"],
          documents: ["Invoice copy of goods", "Transporter ID", "Vehicle Number", "Product HSN Codes and weights"],
          process: ["Entering invoice details on the E-way bill portal", "Adding transporter credentials and vehicle parameters", "Generating E-way bill with unique EWB number", "Printing the barcode document for the driver"],
          timeline: "1-2 Hours",
          characteristics: [
            "Validity: Valid for 1 day per 200 km of distance.",
            "Mandatory limit: Mandatory for inter-state consignment values exceeding ₹50,000."
          ],
          pros: [
            "Completely digital, avoiding physical transit delay."
          ],
          cons: [
            "Heavy penalties (up to 100% value of goods) if the vehicle is caught without an active EWB."
          ],
          commonMistakes: [
            "Inaccurate distance calculations or incorrect vehicle numbers."
          ],
          postCompliances: [
            "Ensuring EWB is active before dispatch."
          ],
          faqs: [
            { question: "Who is responsible for generating the E-way Bill?", answer: "The registered sender (consignor) or recipient (consignee) is responsible. If they fail, the transporter must generate it." }
          ]
        }
      },
    ],
    details: {
      benefits: ["Input Tax Credit", "Inter-state Business", "E-commerce Eligibility", "Tax Transparency"],
      documents: ["PAN Card", "Aadhaar", "Business Proof", "Bank Statement"],
      process: ["TRN Generation", "Application Submission", "OTP Verification", "Approval by Officer", "GSTIN Issuance"],
      timeline: "3-7 Working Days",
    },
    faqs: [
      { question: "Who needs mandatory GST registration?", answer: "Businesses with turnover above 20L/40L or those involved in inter-state supply/e-commerce." },
      { question: "What is an E-way bill?", answer: "A document required for movement of goods worth more than ₹50,000." }
    ]
  },
  {
    title: "Trademark",
    slug: "trademark",
    description: "Protect your brand identity and intellectual property.",
    services: [
      { 
        name: "Trademark Registration", 
        tag: "#TrademarkRegistration", 
        slug: "trademark-registration",
        description: "Official legal registration to secure exclusive ownership of your brand name, logo, or tagline.",
        details: {
          overview: "Trademark Registration gives you exclusive, legal ownership of your business brand name, logo, or tagline under the Trade Marks Act, 1999. This prevents competitors from copying your branding, protects your reputation, and creates a valuable corporate asset.",
          targetAudience: "Startups, brands, e-commerce sellers, and businesses looking to safeguard their brand identity.",
          benefits: ["Brand Protection", "Legal Ownership", "Asset Creation", "Consumer Trust"],
          documents: ["Logo/Name mockups", "Identity Proof of Promoter", "Authorization/Power of Attorney Letter", "User Affidavit (if in use)"],
          process: ["IP Search Report", "Class Selection (out of 45 classes)", "Filing online Application", "Obtaining 'TM' application number", "Government Journal Publication", "Issuance of ® Certificate"],
          timeline: "6-12 Months",
          characteristics: [
            "Use of TM Symbol: Immediately after filing.",
            "Use of R Symbol: Only after registration grant.",
            "10-Year Validity: Indefinitely renewable."
          ],
          pros: ["Exclusive statutory rights", "Nationwide brand control"],
          cons: ["Long government timeline"],
          commonMistakes: ["Using generic names", "Failing to search"],
          postCompliances: ["Renewal every 10 years"],
          faqs: [
            { question: "What is the difference between TM and R symbols?", answer: "The TM symbol means the application is pending. The ® symbol can only be used once officially registered." },
            { question: "Can a trademark be rejected?", answer: "Yes, if it is identical to an existing mark, or descriptive of the service." }
          ]
        }
      },
      { 
        name: "Trademark Objection", 
        tag: "#TrademarkObjection", 
        slug: "trademark-objection",
        description: "Legal drafting and filing of counter-replies to defend your objected trademark application.",
        details: {
          overview: "A Trademark Objection is an early hurdle where the Trademark Registrar highlights issues with your application under Section 9 (absolute grounds) or Section 11 (relative grounds, similarity to existing marks). Professional legal replies are required to defend the mark.",
          targetAudience: "Trademark applicants who have received an 'Objected' status in their examination report.",
          benefits: ["Rescues trademark from abandonment", "Legal defense by IP experts", "Higher approval chance"],
          documents: ["Examination Report copy", "Brand usage proof (invoices, website traffic)", "User affidavit"],
          process: ["Reviewing Objection report", "Drafting legal reply with case laws", "Uploading reply within 30 days"],
          timeline: "15-30 Working Days",
          faqs: [
            { question: "What happens if I miss the 30-day deadline?", answer: "If you fail to file a reply within 30 days, the application is marked as 'Abandoned' and cancelled." }
          ]
        }
      },
      { 
        name: "Trademark Certificate", 
        tag: "#TrademarkCertificate", 
        slug: "trademark-certificate",
        description: "Procurement of your official registered trademark certificate and legal ® authorization.",
        details: {
          overview: "The Trademark Certificate is the ultimate proof of ownership issued by the IP India office once your mark passes all examination, publication, and opposition phases without issues.",
          targetAudience: "Applicants whose marks have been successfully advertised in the TM journal for 4 months.",
          benefits: ["Final statutory proof", "Enables ® symbol usage", "Cross-border IP enforcement"],
          documents: ["TM Application Number", "Journal publication copy", "Power of Attorney"],
          process: ["Journal status monitoring", "Resolving pending fee checks", "Downloading digital registration certificate"],
          timeline: "5-10 Working Days",
          faqs: [
            { question: "How long is the certificate valid?", answer: "It is valid for 10 years from the original date of application." }
          ]
        }
      },
      { 
        name: "Trademark Opposition", 
        tag: "#TrademarkOpposition", 
        slug: "trademark-opposition",
        description: "Drafting and filing opposition replies to defend your mark against third-party challenges.",
        details: {
          overview: "Trademark Opposition occurs when a third party files an objection in the Journal within 4 months of advertisement. Resolving this requires drafting a Notice of Opposition or a counter-statement to protect your brand.",
          targetAudience: "Applicants facing competitor challenges, or owners wanting to oppose copycats.",
          benefits: ["Blocks copycats early", "Defends against hostile opposition", "Protects brand exclusivity"],
          documents: ["Opposition notice copy", "Evidence of prior brand usage", "Authorized power of attorney"],
          process: ["Analyzing opponent grounds", "Drafting Counter-Statement (Form TM-O)", "Filing within 2 months of notice receipt", "Submitting evidence logs"],
          timeline: "3-6 Months",
          faqs: [
            { question: "What is the timeline to reply to an opposition?", answer: "A counter-reply must be filed strictly within 2 months of receiving the opposition notice, with no extensions allowed." }
          ]
        }
      },
      { 
        name: "Trademark Hearing", 
        tag: "#TrademarkHearing", 
        slug: "trademark-hearing",
        description: "Professional representation by specialized IP attorneys in TM Registrar hearings.",
        details: {
          overview: "A Trademark Hearing is scheduled when the registrar is not fully satisfied with your written objection reply. A physical or virtual hearing is conducted where an IP attorney presents arguments and case laws directly to the officer.",
          targetAudience: "Applicants whose marks remain pending with status 'Ready for Hearing' or 'Show Cause Hearing'.",
          benefits: ["Direct representation by IP counsel", "Real-time query resolutions", "Maximum approval chance"],
          documents: ["Hearing notice", "Copy of filed reply", "Power of attorney", "Supporting brand usage logs"],
          process: ["Scheduling & case analysis", "Drafting written submissions", "Representing the applicant in front of the Registrar", "Securing order sheets"],
          timeline: "15-45 Working Days",
          faqs: [
            { question: "Is my physical presence required at the hearing?", answer: "No, our certified IP attorneys represent you completely, so you do not need to attend." }
          ]
        }
      },
      { 
        name: "Trademark Rectification", 
        tag: "#TrademarkRectification", 
        slug: "trademark-rectification",
        description: "Filing rectifications to correct or update registered trademark details in the government registry.",
        details: {
          overview: "Trademark Rectification involves correcting errors, updating classification codes, modifying address details, or removing a registered trademark from the registry if it was registered incorrectly or is not being used.",
          targetAudience: "Trademark owners wanting to clean registry records, or applicants seeking to cancel inactive competitor marks.",
          benefits: ["Maintains registry accuracy", "Updates owner address details", "Removes defunct competitor entries"],
          documents: ["Registration certificate", "Details of changes needed", "Supporting legal proofs"],
          process: ["Drafting Rectification form (TM-M or TM-O)", "Submitting change proofs", "Review and update by Registrar"],
          timeline: "2-4 Months",
          faqs: [
            { question: "Can I change the core brand logo via rectification?", answer: "No, substantial changes to the brand name or logo are not allowed. You must file a new application for major modifications." }
          ]
        }
      },
      { 
        name: "TM Infringement Notice", 
        tag: "#TMInfringementNotice", 
        slug: "tm-infringement-notice",
        description: "Drafting and issuing formal legal Cease & Desist notices to parties infringing your trademark.",
        details: {
          overview: "A Cease & Desist Infringement Notice is a formal legal warning sent to individuals or competitors who are using an identical or deceptively similar name, logo, or tagline, threatening civil and criminal lawsuit if they don't stop.",
          targetAudience: "Registered trademark owners who discover copycats or counterfeit sellers in the market.",
          benefits: ["Stops copycats without court battles", "Establishes a strong legal paper trail", "Secures damages and undertakings"],
          documents: ["Trademark registration certificate", "Proof of infringer's activity (screenshots, products)"],
          process: ["Investigating infringer actions", "Drafting custom Cease & Desist notice", "Sending via Registered AD & Email", "Negotiating settlements"],
          timeline: "3-7 Working Days",
          faqs: [
            { question: "What if the infringer ignores the legal notice?", answer: "If ignored, we can file a commercial suit for trademark infringement in the District Court to secure an immediate injunction and damages." }
          ]
        }
      },
      { 
        name: "Trademark Renewal", 
        tag: "#TrademarkRenewal", 
        slug: "trademark-renewal",
        description: "Renew your registered trademark every 10 years to maintain exclusive brand lock indefinitely.",
        details: {
          overview: "A trademark is valid for 10 years. Trademark Renewal ensures that your exclusive brand rights are extended for another 10 years, preserving your brand assets and avoiding cancellation.",
          targetAudience: "Trademark owners whose marks are approaching the 10-year expiration threshold.",
          benefits: ["Uninterrupted brand protection", "Retains ® symbol right", "Maintains active asset value"],
          documents: ["Trademark Registration number", "Power of Attorney", "Identity proof of owner"],
          process: ["Status checks and eligibility verification", "Filing Form TM-R with government fees", "Registry update verification"],
          timeline: "10-20 Working Days",
          faqs: [
            { question: "When should I apply for trademark renewal?", answer: "You can apply for renewal within 6 months before the 10-year expiry date. A late filing is also possible within 6 months after expiry with a late fee." }
          ]
        }
      },
      { 
        name: "Trademark Transfer", 
        tag: "#TrademarkTransfer", 
        slug: "trademark-transfer",
        description: "Officially assign, transfer, or license your trademark ownership to another entity legally.",
        details: {
          overview: "Trademark Assignment/Transfer is the formal process of transferring the ownership, rights, and title of a trademark (whether registered or pending) from one company or individual to another via a written assignment deed.",
          targetAudience: "Business sellers, corporate restructurings, brand licensors, and acquirers.",
          benefits: ["Monetizes brand assets", "Enables brand franchising", "Legal transfer of asset value"],
          documents: ["Assignment Deed on Stamp Paper", "Registration certificate copy", "Identities of both parties"],
          process: ["Drafting Assignment Agreement", "Executing with signatures and stamp duty", "Filing Form TM-P with Registrar", "Registry ownership updates"],
          timeline: "2-4 Months",
          faqs: [
            { question: "Can a pending trademark be transferred?", answer: "Yes, you can legally transfer pending trademark applications using the same assignment procedure." }
          ]
        }
      },
      { 
        name: "Expedited TM Registration", 
        tag: "#ExpeditedTMRegistration", 
        slug: "expedited-tm-registration",
        description: "Accelerated trademark examination and processing path for rapid brand approvals.",
        details: {
          overview: "Expedited Trademark Registration bypasses the standard queue, accelerating the examination process. The application is reviewed within days of filing, helping you secure approvals much faster.",
          targetAudience: "Startups, urgent product launches, and businesses facing immediate infringement risks.",
          benefits: ["Super fast examination report", "Bypasses years of queues", "Rapid commercial security"],
          documents: ["Logo mockups", "Statutory declaration/user affidavit", "Expedited request form details"],
          process: ["Filing standard application", "Filing Request for Expedited Examination (Form TM-M)", "Rapid examination review by Officer"],
          timeline: "1-3 Months",
          faqs: [
            { question: "Does expedited filing guarantee approval?", answer: "No, it only speeds up the examination queue. Any objection or opposition will still follow standard legal procedures." }
          ]
        }
      },
      { 
        name: "Logo Designing", 
        tag: "#LogoDesigning", 
        slug: "logo-designing",
        description: "Get premium, unique, and legally compliant brand logo designs tailored for trademarking.",
        details: {
          overview: "Logo Designing goes beyond aesthetics; we design elite, highly distinctive, and brand-aligned logos designed specifically to pass trademark searches and avoid conflict rejections.",
          targetAudience: "New startups, rebranding companies, and product developers.",
          benefits: ["Highly distinctive design", "100% trademark-ready", "Vector source files delivered", "Professional branding"],
          documents: ["Brand concept ideas", "Preferred color palettes", "Target industry sector details"],
          process: ["Design brief consultation", "Distinctiveness & trademark search pre-check", "Drafting multiple design concepts", "Revisions and final vector handoff"],
          timeline: "5-10 Working Days",
          faqs: [
            { question: "Why is a trademark search important for logo design?", answer: "It ensures the custom shape or visual style doesn't match an existing corporate logo, saving you from trademark objections later." }
          ]
        }
      },
      { 
        name: "Design Registration", 
        tag: "#DesignRegistration", 
        slug: "design-registration",
        description: "Register the unique aesthetic appearance, shape, or pattern of your physical products.",
        details: {
          overview: "Design Registration protects the unique visual design, shape, configuration, pattern, or ornamentation applied to a functional product under the Designs Act, 2000. It prevents competitors from copying your product looks.",
          targetAudience: "Industrial manufacturers, jewelry designers, electronics brands, and apparel designers.",
          benefits: ["10-year exclusive look protection", "Monopolizes product aesthetics", "Stops visual lookalikes"],
          documents: ["Four-view photographic shots of the product", "Brief description of design novelty", "Identity proof of developer"],
          process: ["Design novelty check", "Class determination (out of 32 classes)", "Filing application with Patent Office", "Resolving examiner checks", "Certification Grant"],
          timeline: "3-6 Months",
          faqs: [
            { question: "What is the validity of a design registration?", answer: "It is registered for 10 years, and can be extended for an additional 5 years (maximum 15 years total)." }
          ]
        }
      },
      { 
        name: "Design Objection", 
        tag: "#DesignObjection", 
        slug: "design-objection",
        description: "Respond legally to design examination reports and objections to secure product design rights.",
        details: {
          overview: "A Design Objection is issued when the examiner finds that your product design lacks novelty, matches an existing registered design, or is purely functional rather than aesthetic. A professional legal reply is mandatory to save your registration.",
          targetAudience: "Design applicants who have received a statement of objections from the Controller of Designs.",
          benefits: ["Defends product design investments", "Legal replies by patent/design experts", "Avoids abandonment status"],
          documents: ["Objection report copy", "Novelty proofs and prior-art logs"],
          process: ["Analyzing objection grounds", "Drafting legal reply highlighting design novelty", "Filing reply with Controller", "Attending hearings if required"],
          timeline: "15-45 Working Days",
          faqs: [
            { question: "How much time is allowed to reply to a design objection?", answer: "You must file a written reply within exactly 6 months from the date of the application filing or objection report, as specified." }
          ]
        }
      },
      { 
        name: "Copyright Registration", 
        tag: "#CopyrightRegistration", 
        slug: "copyright-registration",
        description: "Secure legal copyright protection for your software code, literary works, art, music, or videos.",
        details: {
          overview: "Copyright Registration grants exclusive legal ownership and reproduction rights for original creative expressions—literary works, software code, website content, music, films, and artistic designs—under the Copyright Act, 1957.",
          targetAudience: "Software developers, writers, artists, musicians, filmmakers, and content creators.",
          benefits: ["Global copyright protection", "Stops software/content piracy", "Creates licensing royalty streams", "Public record of ownership"],
          documents: ["Three copies of the creative work", "Identity proofs of author & applicant", "No-Objection Certificate (NOC) from publisher/employers"],
          process: ["Filing application online (Form XIV)", "Government Diary Number generation", "Mandatory 30-day waiting period for objections", "Examination and Certificate issuance"],
          timeline: "4-8 Months",
          faqs: [
            { question: "How long does copyright protection last?", answer: "For literary, dramatic, musical, and artistic works, copyright lasts for the lifetime of the author plus 60 years after their death." }
          ]
        }
      },
      { 
        name: "Copyright Objection", 
        tag: "#CopyrightObjection", 
        slug: "copyright-objection",
        description: "Resolve copyright examination discrepancies and replies to secure artistic and literary ownership.",
        details: {
          overview: "A Copyright Objection is raised during the examination phase, either by the registrar (for technical errors or lack of originality) or via a third-party claim. Resolving it requires a detailed legal reply to justify the work's originality.",
          targetAudience: "Applicants who have received an objection or discrepancy letter from the Copyright Office.",
          benefits: ["Clears application status", "Defends artistic originality", "Ensures certificate approval"],
          documents: ["Copyright discrepancy letter", "Clarification proofs", "Original work drafts"],
          process: ["Analyzing discrepancies", "Drafting and uploading legal explanation", "Attending virtual hearing if called by Registrar"],
          timeline: "20-45 Working Days",
          faqs: [
            { question: "What is a 'discrepancy letter' in copyright?", answer: "It is an official letter pointing out issues like mismatched signatures, missing NOCs, or similar copyrighted works in the registry." }
          ]
        }
      },
      { 
        name: "Patent Registration", 
        tag: "#PatentRegistration", 
        slug: "patent-registration",
        description: "File provisional and complete patent applications to protect your unique technical inventions.",
        details: {
          overview: "Patent Registration grants exclusive, monopolistic rights to a patentee for a unique invention (whether a product or process) that is novel, non-obvious, and has industrial utility, under the Patents Act, 1970.",
          targetAudience: "Tech inventors, R&D labs, software engineers, and industrial product developers.",
          benefits: ["20-year absolute market monopoly", "Strong shield against tech theft", "High valuations for licensing/sale"],
          documents: ["Invention specification sheet", "Structural/technical blueprints", "Aadhaar and PAN of inventor"],
          process: ["Patent search for prior art", "Drafting Patent Specifications (Form 1 & 2)", "Filing Provisional/Complete Application", "Publication in patent journal", "Examination & Final Grant"],
          timeline: "1-3 Years (Expedited routes available)",
          faqs: [
            { question: "What is a provisional patent?", answer: "A provisional patent is a quick, low-cost application filed early to secure a 'Priority Date' for your invention before writing the full complete specification within 12 months." }
          ]
        }
      },
      { 
        name: "Trademark Protection", 
        tag: "#TrademarkProtection", 
        slug: "trademark-protection",
        description: "Comprehensive brand monitoring, IP enforcement, and watch services to block copycats early.",
        details: {
          overview: "Trademark Protection is an active brand-monitoring service where our IP experts scan weekly journal advertisements, registry databases, and online portals to detect and block competitor applications that copy or infringe your brand.",
          targetAudience: "Established brands and corporate groups wanting to keep their brand locks unique.",
          benefits: ["Blocks copycats early", "Protects brand reputation", "Avoids market confusion"],
          documents: ["Registered trademark details", "Authorization Letter"],
          process: ["Weekly monitoring of TM journals", "Generating alert reports", "Filing timely Oppositions against infringers"],
          timeline: "Ongoing/Annual",
          faqs: [
            { question: "Why is a trademark watch service important?", answer: "If you don't actively monitor the journal, a copycat's application might get registered, forcing you to go through a slow, expensive court rectification to remove it later." }
          ]
        }
      }
    ],
    details: {
      benefits: ["Brand Protection", "Legal Ownership", "Asset Creation", "Consumer Trust"],
      documents: ["Logo/Name", "Identity Proof", "Authorization Letter", "User Affidavit"],
      process: ["Search Report", "Application Filing", "Examination Report", "Journal Publication", "Registration Certificate"],
      timeline: "6-12 Months",
    },
    faqs: [
      { question: "Can I use TM symbol after filing?", answer: "Yes, you can use TM immediately after filing. The ® symbol can only be used after registration is complete." },
      { question: "What is a Trademark Objection?", answer: "It is when the registrar finds issues with your application based on similarity or descriptive nature." }
    ]
  },
  {
    title: "Tax Compliances",
    slug: "tax-compliance",
    description: "Annual tax filings and statutory compliance services.",
    services: [
      { 
        name: "Income Tax Returns", 
        tag: "#ITR", 
        slug: "itr",
        description: "File your annual Income Tax Returns (ITR) to stay tax compliant and secure financial credibility.",
        details: {
          overview: "Income Tax Return (ITR) filing is a mandatory declaration of your annual income, expenditures, investments, and tax liabilities filed with the Income Tax Department. Keeping your ITR filed on time is essential for getting bank loans, purchasing assets, visa processing, and avoiding heavy penalty notices.",
          targetAudience: "Salaried individuals, business owners, professionals, and corporate companies.",
          benefits: ["Avoid Penalties", "Financial Health", "Loan Approval", "Legal Safety"],
          documents: ["Form 16 (for salaried individuals)", "Bank Statements of all active accounts", "Investment Proofs (under 80C, 80D, etc.)", "PAN and Aadhaar Cards", "Profit & Loss statement (for businesses)"],
          process: ["Document collection & investment categorization", "Calculation of taxable income & liabilities", "Tax payment (if applicable)", "Drafting & Online submission of ITR Form", "ITR-V Verification via Aadhaar OTP"],
          timeline: "2-5 Working Days",
          characteristics: [
            "Different ITR Forms: Uses ITR-1 to ITR-7 based on source of income.",
            "Mandatory Verification: Must be verified within 30 days of filing to be valid.",
            "Builds financial trail: Essential for tracking net-worth and credit scores."
          ],
          pros: [
            "Ensures complete legal compliance with zero tax fines.",
            "Enables smooth credit approval for home loans, car loans, and business financing."
          ],
          cons: [
            "Requires detailed bookkeeping and documentation of all earnings."
          ],
          commonMistakes: [
            "Underreporting bank interest or capital gains income.",
            "Missing the annual filing deadlines, leading to standard late fees and lost carry-forward losses."
          ],
          postCompliances: [
            "Responding to any tax portal queries or notices within designated timelines."
          ],
          faqs: [
            { question: "Is it mandatory to file ITR if my income is under the basic exemption limit?", answer: "Usually no, but filing a zero ITR is highly recommended to build a strong financial history for future loans and visas." },
            { question: "What happens if I make a mistake in my ITR?", answer: "You can file a Revised Return under Section 139(5) to correct any errors before the end of the relevant assessment year." }
          ]
        }
      },
      { 
        name: "TDS Filing", 
        tag: "#TDS", 
        slug: "tds",
        description: "File Tax Deducted at Source (TDS) returns to avoid heavy government fines.",
        details: {
          overview: "TDS (Tax Deducted at Source) Filing requires businesses that pay specific types of expenses (like salaries, rent, professional fees, contractor bills) to deduct tax before paying and deposit it with the Income Tax Department quarterly.",
          targetAudience: "Firms, corporate employers, and individuals paying high rent or contracting fees.",
          benefits: ["Government compliance", "Avoids heavy daily fines", "Ensures correct tax credit to suppliers/staff", "Improves corporate reputation"],
          documents: ["Deduction list with PAN of deductees", "Challan deposit details", "Form 16A/26AS reconciliations"],
          process: ["Calculating quarterly TDS liabilities", "Depositing tax via Challan 281", "Drafting TDS return form (Form 24Q, 26Q)", "Validating return using NSDL utility & filing"],
          timeline: "2-4 Working Days",
          characteristics: [
            "Quarterly Deadlines: Returns must be filed by 31st of the month following the quarter.",
            "Severe late fees: Late fees are ₹200 per day under Section 234E."
          ],
          pros: [
            "Crucial for businesses to prevent tax audits and expense disallowance."
          ],
          cons: [
            "Requires strict monthly deposit dates (by 7th of next month)."
          ],
          commonMistakes: [
            "Entering incorrect PAN numbers of employees, resulting in incorrect credit allocations."
          ],
          postCompliances: [
            "Issuing TDS Certificates (Form 16/16A) within 15 days of filing."
          ],
          faqs: [
            { question: "What is the consequence of late TDS filing?", answer: "In addition to a ₹200/day late fee, interest at 1.5% per month is charged on the unpaid TDS amount, and the underlying expense may be disallowed for tax deductions." }
          ]
        }
      },
      { 
        name: "Professional Tax", 
        tag: "#PT", 
        slug: "pt",
        description: "Register and file state-specific Professional Tax for your employees.",
        details: {
          overview: "Professional Tax is a state-level tax levied on salaried individuals, traders, and professionals (like CAs, Doctors, Lawyers) in India, governed by the respective State Governments.",
          targetAudience: "Employers with staff, independent professionals, and commercial traders.",
          benefits: ["Ensures local state labor compliance", "Prevents legal penalties from State Treasury", "Smooth business permit renewals"],
          documents: ["Company incorporation proof", "Employee salary statements", "PAN and Aadhaar of the firm", "Bank current account statement"],
          process: ["Applying for PT Enrollment (PTEC) & PT Registration (PTRC)", "Filing details on State Tax portal", "Paying monthly/annual professional tax dues", "Filing periodic PT returns"],
          timeline: "3-5 Working Days",
          characteristics: [
            "PTEC vs. PTRC: PTEC is paid by the business entity itself, whereas PTRC is deducted from employees' salary.",
            "Varying rate: Tax rate is determined by individual state slabs, up to a maximum of ₹2,500 per year."
          ],
          pros: [
            "Low-cost, essential compliance for carrying out business in the state."
          ],
          cons: [
            "Only active in certain states (e.g., Maharashtra, Karnataka, Telangana, West Bengal, Tamil Nadu)."
          ],
          commonMistakes: [
            "Not deducting PTRC for new employees, resulting in employer liabilities."
          ],
          postCompliances: [
            "Monthly or annual return filing according to state-specific due dates."
          ],
          faqs: [
            { question: "Is Professional Tax applicable in all Indian states?", answer: "No, many states (like Delhi, Rajasthan, and Haryana) do not levy Professional Tax." }
          ]
        }
      },
      { 
        name: "Digital Signature Certificate", 
        tag: "#dsc", 
        slug: "dsc",
        description: "Get Class-3 Digital Signature Certificates (DSC) needed for secure online filings.",
        details: {
          overview: "A Digital Signature Certificate (DSC) is a secure digital key issued by certifying authorities (like eMudhra, Capricorn) that validates the identity of the holder, mandatory for all electronic filings with MCA, Income Tax, GST, and e-tenders.",
          targetAudience: "Company directors, partners, professionals, and bidders in government tenders.",
          benefits: ["Enables all corporate online filings", "Tamper-proof digital security", "Legally recognized under IT Act, 2000", "Mandatory for government e-tenders"],
          documents: ["PAN Card", "Aadhaar Card", "Mobile number & Email", "Passport size photo"],
          process: ["Online portal application", "Uploading Aadhaar XML/e-KYC", "Conducting a brief video verification and OTP check", "Downloading DSC into a secure USB Crypto-token"],
          timeline: "1-2 Hours",
          characteristics: [
            "Class 3 Security: Offers the highest encryption level for maximum safety.",
            "Physical Crypto-token: Stored in secure FIPS-compliant USB tokens.",
            "Flexible Validity: Available with a validity of 1, 2, or 3 years."
          ],
          pros: [
            "Extremely quick to obtain.",
            "Protects document signature integrity digitally."
          ],
          cons: [
            "Requires physical USB token to sign files."
          ],
          commonMistakes: [
            "Delaying video verification, causing the application to expire."
          ],
          postCompliances: [
            "Renewing the certificate before its active validity expires."
          ],
          faqs: [
            { question: "Can a person have more than one DSC?", answer: "Yes, a person can have separate DSCs for personal use, company directorship, and professional filings." }
          ]
        }
      },
    ],
    details: {
      benefits: ["Avoid Penalties", "Financial Health", "Loan Approval", "Legal Safety"],
      documents: ["Bank Statements", "Investment Proofs", "Expense Details", "PAN"],
      process: ["Data Collection", "Computation", "Filing on Portal", "Verification"],
      timeline: "2-5 Working Days",
    },
    faqs: [
      { question: "What is a Digital Signature (DSC)?", answer: "An electronic version of a physical signature, mandatory for various government filings." },
      { question: "When is the deadline for ITR filing?", answer: "Usually July 31st for individuals and October 31st for audited businesses." }
    ]
  },
  {
    title: "Global",
    slug: "global",
    description: "International company incorporation and global trademark registration services.",
    services: [
      { 
        name: "UAE Company Registration", 
        tag: "#UAECompany", 
        slug: "uae-company-registration",
        description: "Incorporate your company in Dubai Mainland or Free Zones with 100% foreign ownership and zero tax.",
        details: {
          overview: "UAE Company Registration allows global promoters to incorporate corporate entities in Dubai Mainland or prominent Free Zones (such as IFZA, Meydan, or DMCC). This offers 100% foreign ownership, zero corporate & personal income taxes, and complete capital repatriation rights.",
          targetAudience: "Global e-commerce brands, consulting firms, wealth managers, and international traders.",
          benefits: ["0% Corporate & Personal Income Tax", "100% Foreign Ownership allowed", "Golden Visa eligibility for founders", "Global banking access"],
          documents: ["Passport copy of all shareholders", "Proof of residential address (utility bill)", "Suggested trade names (three)", "Brief business profile"],
          process: ["Zone selection (Mainland vs Free Zone)", "Trade name reservation & activity approval", "Drafting Memorandum of Association (MOA)", "Government fee payment and License issuance", "Establishment card and corporate bank opening"],
          timeline: "5-7 Working Days",
          faqs: [
            { question: "Do I need a local UAE sponsor to own a company?", answer: "No, under recent legal reforms, foreigners can enjoy 100% full ownership of mainland trading and service companies without a local Emirati sponsor." }
          ]
        }
      },
      { 
        name: "USA Company Registration", 
        tag: "#USACompany", 
        slug: "usa-company-registration",
        description: "Form a US LLC or C-Corp in premium tax-friendly states like Delaware or Wyoming with EIN & banking.",
        details: {
          overview: "USA Company Registration sets up your corporate presence (LLC or C-Corp) in tax-haven states like Delaware, Wyoming, or Florida. This includes obtaining a Federal Employer Identification Number (EIN) and configuring payment systems.",
          targetAudience: "SaaS startups, Amazon FBA sellers, international agencies, and startup founders raising US venture capital.",
          benefits: ["No US state taxes in Wyoming/Delaware for non-residents", "Access to Stripe, PayPal, and US bank accounts", "Maximum global credibility"],
          documents: ["Passport copy of all founders", "Suggested business name", "Declared physical or virtual address (we assist)"],
          process: ["Selecting state and structure (LLC vs C-Corp)", "Filing Articles of Organization/Incorporation", "Applying for EIN from the IRS", "Drafting Operating Agreement", "Setting up digital business banking"],
          timeline: "7-14 Working Days",
          faqs: [
            { question: "What is the difference between an LLC and a C-Corp for non-residents?", answer: "An LLC is a pass-through entity with fewer filing rules, ideal for bootstrapped founders. A C-Corp is required if you plan to issue stock and raise funding from US venture capital firms." }
          ]
        }
      },
      { 
        name: "Singapore Company Registration", 
        tag: "#SingaporeCompany", 
        slug: "singapore-company-registration",
        description: "Establish a Private Limited company in Singapore, the leading financial hub of Southeast Asia.",
        details: {
          overview: "Singapore Company Registration incorporates a Private Limited (Pte. Ltd.) entity in the world's most business-friendly tax regime. It offers excellent intellectual property protections, low corporate tax rates, and a portal to Southeast Asian markets.",
          targetAudience: "Tech developers, fintech platforms, venture capitalists, and global trading companies.",
          benefits: ["17% Corporate Tax with initial startup exemptions", "World-class IP safety and regulatory systems", "No dividend or capital gains taxes"],
          documents: ["Passport copy", "Proof of residential address", "Suggested company name", "Nominee Director details (mandatory, we provide)"],
          process: ["Reserving company name on ACRA", "Drafting constitution and board resolutions", "Appointing corporate secretary & resident nominee director", "Filing ACRA incorporation", "Corporate banking setup"],
          timeline: "3-5 Working Days",
          faqs: [
            { question: "Is a local resident director mandatory in Singapore?", answer: "Yes, Singapore law mandates that every company must have at least one director who is an ordinary resident of Singapore. We provide professional Nominee Director services to satisfy this." }
          ]
        }
      },
      { 
        name: "UK Company Registration", 
        tag: "#UKCompany", 
        slug: "uk-company-registration",
        description: "Incorporate a UK Private Limited Company (LTD) with Companies House and register for VAT.",
        details: {
          overview: "UK Company Registration registers a Private Limited Company (LTD) directly with the UK Companies House. This is one of the fastest and most cost-effective ways to establish a European corporate footprint.",
          targetAudience: "Freelancers, international consulting firms, e-commerce dropshippers, and retail exporters.",
          benefits: ["Extremely low setup and yearly overhead costs", "Vibrant European market access", "Easy integration with Stripe, Wise, and UK banks"],
          documents: ["Passport or ID proof", "Registered office address (virtual address supported)", "Suggested LTD name"],
          process: ["Checking name availability at Companies House", "Filing incorporation application (Form IN01)", "Acquiring Certificate of Incorporation", "Registering for Corporation Tax and VAT (if required)"],
          timeline: "1-2 Working Days",
          faqs: [
            { question: "Do I need to live in the UK to open a UK LTD?", answer: "No, anyone of any nationality can incorporate a UK company from anywhere in the world without any travel requirements." }
          ]
        }
      },
      { 
        name: "USA Trademark Registration", 
        tag: "#USATrademark", 
        slug: "usa-trademark-registration",
        description: "Protect your brand globally by registering your trademark with the USPTO.",
        details: {
          overview: "USA Trademark Registration registers your brand name, logo, or slogan with the United States Patent and Trademark Office (USPTO), securing federal brand rights, Amazon Brand Registry access, and legal protections.",
          targetAudience: "Amazon sellers, SaaS companies, product manufacturers, and international exporters selling in the US.",
          benefits: ["Federal brand protection across all 50 states", "Mandatory for Amazon Brand Registry", "Legal authority to sue copycats in US Federal courts"],
          documents: ["Logo image or plain text name", "Specimen of use (proof of selling the product in the US)", "Identity proof of the applicant"],
          process: ["Conducting USPTO database clearance search", "Determining international goods/services classes", "Filing federal application with USPTO", "Responding to USPTO Office Actions", "Trademark publication & registration grant"],
          timeline: "8-12 Months",
          faqs: [
            { question: "What is a 'Specimen of Use' in US trademark law?", answer: "Unlike other countries, the US requires active proof that you are already selling your goods or services in commerce within the United States (e.g., product packaging photos, active e-commerce store screenshots with US pricing) to grant registration." }
          ]
        }
      }
    ],
    details: {
      benefits: ["Tax Efficiency", "Global Credibility", "Asset Security", "Venture Capital Access"],
      documents: ["Passport Copy", "Address Proof", "Suggested Business Name", "Business Activity Profile"],
      process: ["Strategic Jurisdiction Mapping", "Name Approval Reservation", "Document Drafting & Notarization", "Government Registry Submission", "Corporate Banking Setup"],
      timeline: "2-14 Working Days",
    },
    faqs: [
      { question: "Do I need to travel to register a foreign company?", answer: "No, all international company formations (UAE, USA, Singapore, UK) are completed 100% remotely without any travel requirements." },
      { question: "What is an EIN?", answer: "An Employer Identification Number (EIN) is a federal tax ID issued by the US IRS, mandatory for corporate banking and filing US taxes." }
    ]
  },
];
