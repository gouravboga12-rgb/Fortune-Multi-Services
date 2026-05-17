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
        name: "Company Registrations", 
        tag: "#CompanyRegistrations", 
        slug: "company-registrations",
        description: "Official incorporation services for standard corporate companies in India.",
        details: {
          overview: "Company Registration is the official process of incorporating a business as a recognized legal entity with the Ministry of Corporate Affairs (MCA). This establishes your business as a separate corporate entity, providing credibility, protecting personal assets, and allowing you to legally hire staff and sign contracts.",
          targetAudience: "Entrepreneurs and business partners who want to formally register their corporate brand.",
          benefits: ["Limited Liability", "Separate Legal Entity", "Tax Benefits", "Capital Raising Ease"],
          documents: ["PAN & Aadhaar of all Directors", "Passport Photos", "Utility Bill of Office Proof", "NOC from Property Owner"],
          process: ["Consultation & Structuring", "DSC and DIN Acquisition", "Name Approval Reservation", "Filing SPICe+ Forms", "Incorporation Certificate Grant"],
          timeline: "7-15 Working Days",
          characteristics: [
            "Legal Recognition: Fully registered under the Companies Act, 2013.",
            "Separate Bank Account: Allows opening dedicated corporate current accounts.",
            "Trustworthiness: Highly favored by corporate clients and banking institutions."
          ],
          pros: [
            "Complete legal compliance and protection under corporate law.",
            "Enables corporate lending, tax exemptions, and access to capital markets.",
            "Safeguards personal property against general business bankruptcies."
          ],
          cons: [
            "High recurring annual auditing and compliance expenses.",
            "Complex regulatory oversight by government ministries."
          ],
          commonMistakes: [
            "Failing to file annual returns on time, leading to disqualification of directors.",
            "Not maintaining proper board meeting registers and statutory corporate logs."
          ],
          postCompliances: [
            "Statutory Annual Financial Audits.",
            "Filing ROC Forms AOC-4 and MGT-7.",
            "Filing annual Income Tax Return (ITR-6)."
          ],
          faqs: [
            { question: "Can I register a company alone?", answer: "Yes, you can register as a One Person Company (OPC)." },
            { question: "Is stamp duty applicable during registration?", answer: "Yes, stamp duty depends on the state where the registered office is located and the authorized capital." }
          ]
        }
      },
      { 
        name: "Proprietorship Firm", 
        tag: "#ProprietorshipFirm", 
        slug: "proprietorship-firm",
        description: "Register a Sole Proprietorship Firm quickly with minimal legal hurdles.",
        details: {
          overview: "Registering a Sole Proprietorship Firm involves obtaining basic business registrations (like MSME/Udyam, GST, and Shop & Establishment License) under a chosen trade name. This formally registers the trade name and allows opening a business current bank account.",
          targetAudience: "Small business owners, local retailers, freelancers, and independent professionals.",
          benefits: ["Low cost registration", "Fast Setup", "Minimal recurring compliances", "Sole operational control"],
          documents: ["PAN Card", "Aadhaar Card", "Utility Bill of business address", "Bank statement of owner"],
          process: ["Applying for MSME Udyam Registration", "Applying for GST Registration (if required)", "Obtaining Shop & Establishment License", "Opening Current Bank Account"],
          timeline: "3-5 Working Days",
          characteristics: [
            "Quick Activation: Set up and running in less than a week.",
            "No Complex Filings: No mandatory annual ROC filings or board meetings.",
            "Flexible Income Taxation: Tax calculated based on individual tax slabs."
          ],
          pros: [
            "Minimal setup cost and no expensive statutory auditor requirements.",
            "Direct access to all profits by the sole proprietor.",
            "Easiest structure to operate and shut down if necessary."
          ],
          cons: [
            "Personal liability is completely exposed to business risks.",
            "Limited growth potential due to lack of corporate funding tools."
          ],
          commonMistakes: [
            "Using a registered trademarked name without permission.",
            "Mixing personal and business funds, complicating tax calculations."
          ],
          postCompliances: [
            "Filing annual individual ITR (ITR-3/4).",
            "Filing GST returns (if GST registered)."
          ],
          faqs: [
            { question: "Do I need a separate corporate PAN?", answer: "No, a sole proprietorship uses the personal PAN of the owner." },
            { question: "Is a trade license mandatory?", answer: "Yes, in most municipal areas, a local Trade License or Shop & Establishment registration is mandatory." }
          ]
        }
      },
      { 
        name: "Partnership Firm Registration", 
        tag: "#PartnershipFirm", 
        slug: "partnership-firm",
        description: "Officially register a traditional Partnership Firm under the Indian Partnership Act.",
        details: {
          overview: "Partnership Firm Registration involves formalizing a business agreement between two or more partners. While registration with the Registrar of Firms is optional nationally, it is highly recommended to protect legal interests, execute commercial contracts, and claim legal dues from third parties.",
          targetAudience: "Medium co-owned trading units, local distributors, and family-owned establishments.",
          benefits: ["Legal status under Indian Partnership Act", "Easier pool of resources", "Minimal compliance compared to LLPs", "Quick setup"],
          documents: ["Partnership Deed signed & stamped", "PAN of all partners", "Aadhaar of all partners", "Address proof of business", "NOC from property owner"],
          process: ["Drafting the Partnership Deed", "Paying Stamp Duty & Notarization", "Filing application with local Registrar of Firms (RoF)", "Applying for firm PAN & TAN", "Opening Current Bank Account"],
          timeline: "5-10 Working Days",
          characteristics: [
            "Indian Partnership Act, 1932: Governed by standard historical legislation.",
            "RoF Certificate: Formally registered under the local state Registrar.",
            "Flexible Allocation: Profit/Loss sharing customized entirely via the Deed."
          ],
          pros: [
            "Provides legal standing to sue third-parties for contract violations.",
            "Low maintenance cost relative to corporate entities."
          ],
          cons: [
            "Unlimited joint and personal liability for all partners."
          ],
          commonMistakes: [
            "Registering with insufficient stamp duty values on the Deed, making it legally invalid."
          ],
          postCompliances: [
            "Filing annual firm Income Tax Returns (ITR-5).",
            "GST filing (if GSTIN is active)."
          ],
          faqs: [
            { question: "What is the consequence of an unregistered partnership?", answer: "An unregistered firm cannot file a lawsuit in court against any partner or third party to enforce rights arising from a business contract." }
          ]
        }
      },
      { 
        name: "LLP Company Registration", 
        tag: "#LLPRegistration", 
        slug: "llp-company-registration",
        description: "Secure corporate registration for your LLP with limited liability.",
        details: {
          overview: "LLP Company Registration formally establishes a Limited Liability Partnership as a recognized corporate body under the Ministry of Corporate Affairs (MCA). This protects individual partners' personal assets and allows for dynamic corporate branding while keeping overhead costs low.",
          targetAudience: "Professional consultants, CA firms, developers, and bootstrapped entrepreneurs.",
          benefits: ["Limited Liability Shield", "Separate Corporate Entity", "No mandatory audit up to 40L turnover", "Fewer operational rules than Pvt Ltd"],
          documents: ["PAN & Aadhaar of all partners", "Utility bill of Registered Office", "NOC from property owner", "Bank Statements of partners"],
          process: ["Obtaining DSC & DIN for partners", "Name Approval Reservation", "Filing FiLLiP Incorporation Form", "Filing LLP Agreement within 30 days"],
          timeline: "10-15 Working Days",
          characteristics: [
            "MCA Incorporation: Governed by the LLP Act, 2008.",
            "LLPIN Number: Receives a permanent unique corporate ID.",
            "Insulated Liability: Promoters are not responsible for other partners' misconduct."
          ],
          pros: [
            "Highly professional corporate format with complete liability protection.",
            "No minimum capital limits."
          ],
          cons: [
            "Heavy daily late fees for compliance delays."
          ],
          commonMistakes: [
            "Missing the mandatory 30-day deadline to file the LLP Agreement."
          ],
          postCompliances: [
            "Filing Annual Return (Form 11).",
            "Filing Accounts & Solvency Statement (Form 8)."
          ],
          faqs: [
            { question: "Can a foreigner be a partner in an LLP?", answer: "Yes, foreign nationals and foreign corporate bodies can become partners, provided at least one designated partner is a resident of India." }
          ]
        }
      },
      { 
        name: "Pvt Ltd Company Registration", 
        tag: "#PvtLtdRegistration", 
        slug: "pvt-ltd-company-registration",
        description: "Incorporation services for high-growth Private Limited companies.",
        details: {
          overview: "Private Limited Company Registration incorporates a premier, elite business structure under the Ministry of Corporate Affairs (MCA). This provides the highest level of investor trust, limits personal liability completely, and allows for venture capital and angel funding.",
          targetAudience: "Tech startups, scalable products, manufacturing businesses, and venture-funded projects.",
          benefits: ["Maximum investor trust", "Limitless scale", "ESOP eligibility", "Insulated liabilities"],
          documents: ["ID & Address Proof of Directors (Min 2)", "Passport photos", "Office address proof (rent/utility)", "NOC from Owner"],
          process: ["Acquiring DSC", "Name Reservation (SPICe+ Part A)", "Filing SPICe+ Part B Forms", "Obtaining COI, PAN, and TAN"],
          timeline: "10-15 Working Days",
          characteristics: [
            "Separate Legal Existence: Fully independent corporate status.",
            "Equity funding tools: Capability to issue shares.",
            "Minimum 2 promoters: Requires at least 2 directors."
          ],
          pros: [
            "The only choice for serious venture capital and angel investments.",
            "Fosters high trust among elite global corporate partners."
          ],
          cons: [
            "Compulsory annual audit and high regulatory compliance workload."
          ],
          commonMistakes: [
            "Selecting a name that overlaps with a registered trademark, leading to rejection."
          ],
          postCompliances: [
            "Filing Form INC-20A (Commencement of Business).",
            "Filing AOC-4 and MGT-7 annually."
          ],
          faqs: [
            { question: "Is a physical office necessary?", answer: "Yes, you must declare a registered office address in India. A residential address can be used provided proper NOC is obtained." }
          ]
        }
      },
      { 
        name: "OPC Company Registration", 
        tag: "#OPCRegistration", 
        slug: "opc-company-registration",
        description: "Official registration for solo-promoted One Person Companies.",
        details: {
          overview: "OPC Company Registration incorporates a corporate entity for a single promoter. It offers the sole manager complete operational control while safeguarding their personal wealth through a corporate limited liability shield.",
          targetAudience: "Solo entrepreneurs, specialized professionals, and consultants.",
          benefits: ["Complete control", "Limited liability protection", "Corporate status", "Easy bank lending"],
          documents: ["PAN & Aadhaar of Director & Nominee", "Passport photos", "Office utility proof", "NOC from Owner"],
          process: ["DSC & DIN Acquisition", "Name Approval Reservation", "Drafting MOA & AOA with Nominee Consent", "Filing SPICe+ Incorporation Forms"],
          timeline: "10-15 Working Days",
          characteristics: [
            "Single Shareholder: Only one promoter holds all shares.",
            "Director Nominee: Mandatory successor in case of unforeseen incidents.",
            "Perpetual Succession: Corporate existence outlives the single founder."
          ],
          pros: [
            "Insulates personal assets from all corporate obligations.",
            "Complete decision confidentiality and business autonomy."
          ],
          cons: [
            "Cannot distribute shares or bring in co-founders without converting the entity."
          ],
          commonMistakes: [
            "Choosing an inactive or unverified nominee director."
          ],
          postCompliances: [
            "Mandatory statutory audit.",
            "Filing annual returns AOC-4 and MGT-7A."
          ],
          faqs: [
            { question: "Can a person register more than one OPC?", answer: "No, a natural citizen can only incorporate one OPC and act as a nominee in only one OPC at a time." }
          ]
        }
      },
      { 
        name: "Society (NGO) Registration", 
        tag: "#SocietyRegistration", 
        slug: "society-registration",
        description: "Register a non-profit Society for charitable or welfare purposes.",
        details: {
          overview: "A Society is a non-governmental organization (NGO) registered under the Societies Registration Act, 1860. It is formed by a group of seven or more individuals who associate for any literary, scientific, or charitable purpose, or for the promotion of art, science, philosophy, or social welfare.",
          targetAudience: "Charitable institutions, sports clubs, cultural associations, and social welfare groups.",
          benefits: ["Democratic governance", "Separate legal identity", "Tax exemptions under 12A/80G", "Eligible for government grants"],
          documents: ["Memorandum of Association (MoA)", "Rules and Regulations document", "Address proof of the Society", "Identity and address proofs of 7+ governing body members", "NOC from property owner"],
          process: ["Selecting a unique name", "Drafting MoA & Rules & Regulations", "Getting signatures of members", "Filing application with local Registrar of Societies", "Filing follow-ups & certificate grant"],
          timeline: "20-30 Working Days",
          characteristics: [
            "Democratic structure: governed by a committee elected by general members.",
            "Minimum 7 members: requires at least seven members to register nationally.",
            "No private profit: all funds must be used for charitable objectives."
          ],
          pros: [
            "Low registration costs compared to Section 8 companies.",
            "Easy internal governance based on custom rules.",
            "Access to state-level grants and donations."
          ],
          cons: [
            "Subject to state-level bureaucracy and disputes among members.",
            "Difficult to get foreign funds without FCRA registration.",
            "Higher risk of committee deadlocks."
          ],
          commonMistakes: [
            "Vague charitable objectives in the MoA, leading to rejection.",
            "Not conducting mandatory annual general meetings."
          ],
          postCompliances: [
            "Annual filing of list of governing body members.",
            "Filing annual Income Tax Return (ITR-7).",
            "Regular renewals of local state licenses."
          ],
          faqs: [
            { question: "How many members are needed to form a national society?", answer: "At least 8 members from different states are required to register a national-level society." }
          ]
        }
      },
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
        name: "Brand Registration", 
        tag: "#BrandRegistration", 
        slug: "brand-registration",
        description: "Official registration services for protecting your corporate brand name.",
        details: {
          overview: "Brand Registration involves securing legal ownership of your business brand name, giving you exclusive rights to use it in your sector and preventing competitors from stealing your market presence.",
          targetAudience: "E-commerce brands, corporate groups, and startups.",
          benefits: ["Corporate identity protection", "Brand value creation", "Legal security", "Consumer trust"],
          documents: ["Logo files", "PAN and Aadhaar of owner", "Authorization letter", "User Affidavit"],
          process: ["Brand Search Report", "Class Mapping", "Filing Online Application", "Obtaining 'TM' number"],
          timeline: "6-12 Months",
          characteristics: [
            "Exclusive ownership: Legal lock on the trade name.",
            "Market Credibility: Confirms authentic brand origin."
          ],
          pros: [
            "Protects market value from brand dilution."
          ],
          cons: [
            "Can face third-party oppositions."
          ],
          commonMistakes: [
            "Choosing highly descriptive names."
          ],
          postCompliances: [
            "Renewals."
          ],
          faqs: [
            { question: "Can I register a brand name without a logo?", answer: "Yes, you can register a 'Wordmark' to protect the name itself, or a 'Devicemark' to protect the logo design." }
          ]
        }
      },
      { 
        name: "Trademark (TM) Registration", 
        tag: "#TMRegistration", 
        slug: "tm-registration",
        description: "Register your business logo, slogan, or name to secure exclusive intellectual property rights.",
        details: {
          overview: "Trademark Registration gives you exclusive, legal ownership of your business brand name, logo, or tagline under the Trade Marks Act, 1999. This prevents unauthorized competitors from copying your branding, protects your market reputation, and creates a valuable corporate asset.",
          targetAudience: "Startups, brands, e-commerce sellers, and businesses looking to safeguard their brand identity.",
          benefits: ["Brand Protection", "Legal Ownership", "Asset Creation", "Consumer Trust"],
          documents: ["Logo/Name mockups", "Identity Proof of Promoter", "Authorization/Power of Attorney Letter", "User Affidavit (if trademark is already in use)"],
          process: ["Comprehensive Trademark Search Report", "Class Selection (out of 45 classes)", "Filing online Application with Registrar", "Obtaining 'TM' application number", "Government Examination & Publication in Journal", "Issuance of ® Certificate"],
          timeline: "6-12 Months",
          characteristics: [
            "Use of TM Symbol: Allowed to append 'TM' next to the brand immediately after filing.",
            "Use of R Symbol: Allowed to use '®' only after final registration certificate is granted.",
            "10-Year Validity: Fully valid for 10 years and renewable indefinitely."
          ],
          pros: [
            "Total legal authority to file lawsuits and sue imitators.",
            "Establishes a powerful, protectable brand value that can be franchised or sold."
          ],
          cons: [
            "Extremely slow government approval timeline (usually takes up to a year).",
            "Subject to third-party objections and government opposition hearings."
          ],
          commonMistakes: [
            "Selecting a highly descriptive, generic, or common name that cannot be trademarked.",
            "Failing to conduct a thorough search before filing, leading to immediate rejection."
          ],
          postCompliances: [
            "Renewing the trademark every 10 years."
          ],
          faqs: [
            { question: "What is the difference between TM and R symbols?", answer: "The TM symbol means the trademark application is filed and pending. The ® symbol can only be used once the registration certificate is officially issued." },
            { question: "Can a trademark be rejected?", answer: "Yes, if it is identical/similar to an existing mark, or if it is generic, offensive, or descriptive of the service." }
          ]
        }
      },
      { 
        name: "Trademark (TM) Objection", 
        tag: "#TMObjection", 
        slug: "tm-objection",
        description: "Professional drafting and legal filing services to resolve trademark objections.",
        details: {
          overview: "A Trademark Objection is an early hurdle where the Trademark Registrar highlights issues with your application under Section 9 (absolute grounds) or Section 11 (relative grounds, similarity to existing marks). Professional legal drafting is required to file a counter-reply and defend your mark.",
          targetAudience: "Trademark applicants who have received an 'Objected' status in their examination report.",
          benefits: ["Rescues trademark from abandonment", "Legal defense by IP experts", "Higher approval chance", "Avoids loss of filing fee"],
          documents: ["Trademark Examination Report copy", "Brand usage proof (invoices, website traffic, news mentions)", "Detailed user affidavit"],
          process: ["Reviewing the Objection report", "Drafting a professional legal reply citing relevant case laws", "Uploading reply on portal within 30 days", "Attending hearings (if further requested by officer)"],
          timeline: "15-30 Working Days",
          characteristics: [
            "30-day Limit: The legal reply must be filed within exactly 30 days of the report generation to prevent cancellation.",
            "Legal Drafting: Must cite previous judicial decisions to counter registrar arguments."
          ],
          pros: [
            "Defends your branding from being declared abandoned."
          ],
          cons: [
            "Requires payment of additional drafting and attorney fees."
          ],
          commonMistakes: [
            "Filing a generic, non-legal reply without providing concrete proof of brand usage."
          ],
          postCompliances: [
            "Regular status monitoring of application."
          ],
          faqs: [
            { question: "What happens if I miss the 30-day deadline?", answer: "If you fail to file a reply within 30 days of receiving the examination report, the application is marked as 'Abandoned' and cancelled." }
          ]
        }
      },
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
];
