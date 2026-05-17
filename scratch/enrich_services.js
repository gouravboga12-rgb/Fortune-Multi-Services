const fs = require('fs');
const path = require('path');

// Load the compiled JS
const compiledServices = require('../src/data/temp_out/services.js');
const servicesData = compiledServices.servicesData;

// Let's define the FAQ database for each service based on their slug.
// This database will supply 4 professional, legally accurate B2B FAQs for each service.
const faqDatabase = {
  // === 1. STARTUP SERVICES (Already has FAQs, but let's ensure they are perfectly correct and robust) ===
  'proprietorship': [
    { question: "Is a sole proprietorship considered a separate legal entity?", answer: "No, a sole proprietorship is legally indistinguishable from its owner. All liabilities, personal assets, and tax filings are linked directly to the individual proprietor's PAN." },
    { question: "What is the key disadvantage of a sole proprietorship?", answer: "The primary disadvantage is unlimited liability, meaning the owner's personal properties can be attached by courts or banks to settle any unpaid business dues or legal claims." },
    { question: "Can I convert my proprietorship to a Private Limited Company later?", answer: "Yes, you can seamlessly convert to a Private Limited Company or LLP as your business grows to limit liability and attract external venture funding." },
    { question: "What registrations are required for a sole proprietorship?", answer: "There is no single 'incorporation certificate'. Instead, registrations like GST, MSME Udyam, and Shop & Establishment are used to establish its operational identity." }
  ],
  'partnership': [
    { question: "Is registration of a Partnership Deed mandatory under Indian law?", answer: "Registration of a Partnership Deed is not strictly mandatory under the Indian Partnership Act, 1932, but it is highly recommended to enforce legal rights in court and secure tax registrations." },
    { question: "What is 'joint and several liability' in a partnership?", answer: "It means that each partner is individually and collectively liable for all business debts incurred by any partner on behalf of the firm, exposing personal assets." },
    { question: "How is a Partnership Firm taxed in India?", answer: "A partnership firm is treated as a separate tax entity. It is taxed at a flat rate of 30% plus applicable surcharges and health & education cess on its total taxable profits." },
    { question: "Can a new partner be admitted without unanimous consent?", answer: "No, unless there is a specific clause in the partnership agreement to the contrary, a new partner can only be admitted with the unanimous consent of all existing partners." }
  ],
  'one-person-company': [
    { question: "Can a person incorporate more than one OPC in India?", answer: "No, a single individual is legally allowed to act as a member and nominee director in only one One Person Company (OPC) at any given time." },
    { question: "Is it mandatory for an OPC to convert to a Private Limited Company?", answer: "No, under recent MCA amendments, the mandatory conversion limits based on paid-up capital (exceeding ₹50 Lakhs) or turnover (exceeding ₹2 Crores) have been completely removed." },
    { question: "Who can be a nominee in an OPC?", answer: "The nominee must be a natural person who is an Indian citizen and resident in India. They will take over control of the company in the event of the member's death or incapacity." },
    { question: "What are the compliance requirements for an OPC?", answer: "OPCs enjoy relaxed compliances, such as exemption from holding Annual General Meetings (AGMs) and signing of financial statements by a single director." }
  ],
  'llp': [
    { question: "What is the key benefit of an LLP over a traditional partnership?", answer: "An LLP provides limited liability protection to its partners, meaning their personal assets are fully shielded, and no partner is liable for another's independent or unauthorized acts." },
    { question: "Who is a 'Designated Partner' in an LLP?", answer: "A Designated Partner has the same role as a director in a company. At least two Designated Partners must be appointed, and they are personally responsible for statutory compliances." },
    { question: "Is there a minimum capital requirement for an LLP?", answer: "No, there is no minimum capital requirement to incorporate an LLP. Partners can contribute cash, tangible assets, or intangible rights in any ratio." },
    { question: "What are the annual ROC filings for an LLP?", answer: "LLPs must mandatorily file Form 11 (Annual Return) by May 30th and Form 8 (Statement of Accounts & Solvency) by October 30th every financial year." }
  ],
  'private-limited-company': [
    { question: "What is the minimum number of directors and shareholders required?", answer: "A Private Limited Company requires a minimum of 2 directors and 2 shareholders. One of the directors must be an active Indian resident." },
    { question: "Are my personal assets safe if the Private Limited Company goes into debt?", answer: "Yes, shareholders enjoy limited liability. Your personal liability is strictly capped at the face value of the shares you have subscribed to and remain unpaid." },
    { question: "Is it mandatory to hold an Annual General Meeting (AGM)?", answer: "Yes, every Private Limited Company must hold an AGM within 6 months from the closing of the financial year (typically by September 30th) to approve financial statements." },
    { question: "Can a Private Limited Company raise venture capital or foreign funding?", answer: "Yes, it is the most preferred structure for venture capitalists, angel investors, and foreign direct investment (FDI) due to clear share allocation laws." }
  ],
  'section-8-company': [
    { question: "Can a Section 8 Company pay dividends to its promoters?", answer: "No, a Section 8 company is strictly a non-profit entity. All profits and surpluses must be exclusively reinvested to promote its charitable objectives (art, science, sports, education)." },
    { question: "Is a Section 8 Company eligible for tax exemptions?", answer: "Yes, but incorporation does not grant automatic tax exemptions. The company must separately apply to the Income Tax Department under Section 12A and 80G." },
    { question: "Is there a minimum capital requirement for Section 8?", answer: "No, under the Companies Act, 2013, the requirement for a minimum paid-up share capital has been waived for Section 8 companies." },
    { question: "What happens if a Section 8 Company violates its objectives?", answer: "The Central Government (MCA) can revoke its license, order its amalgamation with another Section 8 company, or initiate winding-up proceedings." }
  ],
  'trust-registration': [
    { question: "What is the difference between a Public Trust and a Private Trust?", answer: "A Public Trust is created for the benefit of the general public or a large section of society, while a Private Trust is created for designated private beneficiaries (family members)." },
    { question: "How many trustees are required to register a Public Trust?", answer: "A minimum of 2 trustees are required to register a Public Trust, although 3 or more are recommended for smoother decision-making." },
    { question: "Can a trust buy or sell immovable property?", answer: "Yes, a registered trust can buy, hold, and sell immovable properties in its own name, provided the transactions align with the registered Trust Deed objectives." },
    { question: "Who regulates public charitable trusts in India?", answer: "Public trusts are regulated under state-specific Public Trust Acts (e.g., Bombay Public Trusts Act) and registered with the local Sub-Registrar or Charity Commissioner." }
  ],
  'public-limited-company': [
    { question: "What are the minimum requirements to form a Public Limited Company?", answer: "It requires a minimum of 7 shareholders, 3 directors, and there is no maximum limit on shareholders. It can raise capital from the general public." },
    { question: "Can a Public Limited Company issue shares to the general public?", answer: "Yes, it can issue a prospectus and invite the general public to subscribe to its equity shares, debt instruments, or debentures." },
    { question: "What is the level of compliance for Public Limited Companies?", answer: "They face the highest level of regulatory compliance under the MCA and SEBI, including quarterly financial releases, secretarial audits, and mandatory committees." },
    { question: "Is it mandatory to list a Public Limited Company on a stock exchange?", answer: "No, a Public Limited Company can remain unlisted. Listing on exchanges like BSE or NSE is optional and depends on funding and liquidity needs." }
  ],
  'producer-company': [
    { question: "Who can incorporate a Producer Company in India?", answer: "Only primary producers (farmers, agriculturists, milkmen) or producer institutions can form a Producer Company. A minimum of 10 individual producers or 2 producer institutions is required." },
    { question: "Can a Producer Company raise funds from the general public?", answer: "No, it cannot invite or accept public deposits or equity subscriptions. All equity and voting rights are restricted to active primary producers." },
    { question: "What are the tax benefits available to a Producer Company?", answer: "Producer companies engaged in agricultural activities enjoy tax exemptions similar to agricultural income (100% tax-free under section 10(1) on farm income)." },
    { question: "How are votes distributed among members of a Producer Company?", answer: "It follows a democratic principle: 'One Member, One Vote', irrespective of the number of shares held by that individual producer." }
  ],
  'indian-subsidiary': [
    { question: "Can a foreign company own 100% of an Indian Subsidiary?", answer: "Yes, in sectors where 100% Foreign Direct Investment (FDI) is permitted under the automatic route, a foreign company can hold 100% equity in the Indian subsidiary." },
    { question: "What is the taxation rate for an Indian Subsidiary company?", answer: "An Indian subsidiary is incorporated as a domestic company and is taxed at standard corporate rates (starting from 15% to 22% plus applicable surcharges)." },
    { question: "Is a physical office address mandatory in India for a subsidiary?", answer: "Yes, a foreign-backed Indian subsidiary must have a registered physical office address in India to receive official and legal communications." },
    { question: "Are foreign directors required to reside in India?", answer: "At least one director on the board of the Indian subsidiary must be an Indian citizen and resident in India (residing for 182 days or more in the previous calendar year)." }
  ],

  // === 2. REGISTRATIONS SERVICES ===
  'startup-india-registration': [
    { question: "Is a traditional retail shop eligible for Startup India?", answer: "No, the startup must demonstrate innovation, technological improvement, or high scalability to qualify." },
    { question: "What is the 3-year tax holiday under Section 80-IAC?", answer: "Eligible startups recognized by DPIIT can apply for a complete 100% tax exemption on profits for any 3 consecutive years out of their first 10 years of operations." },
    { question: "What are the age and turnover limits to qualify?", answer: "The entity must be incorporated for less than 10 years and its annual turnover must not have exceeded ₹100 Crores in any previous financial year." },
    { question: "Can a partnership firm get DPIIT recognition?", answer: "DPIIT recognition is only available to Private Limited Companies, Limited Liability Partnerships (LLPs), or registered Partnership Firms. Sole proprietorships are not eligible." }
  ],
  'trade-license': [
    { question: "Is a Trade License valid across the state?", answer: "No, a Trade License is highly local and issued specifically for a single municipal address." },
    { question: "What happens if I run a business without a Trade License?", answer: "Operating without a Trade License can result in heavy daily penalties, closure notices, or physical sealing of the business premises by municipal authorities." },
    { question: "Does a Trade License transfer to a new owner if I sell the business?", answer: "Yes, you can apply for a transfer of the Trade License to the new owner by submitting the transfer application along with the sale deed and consent letters." },
    { question: "How often do I need to renew my Trade License?", answer: "Trade licenses are generally renewed annually, typically between March and May, depending on the rules of your local municipal corporation." }
  ],
  'import-export-code': [
    { question: "Do I need to update my IEC annually?", answer: "Yes, recent DGFT rules mandate that all IEC holders must verify and update their portal profile annually between April and June." },
    { question: "Are there any tax filing requirements for IEC?", answer: "No, there are no separate annual returns or filings required for IEC. It is strictly an identification code for customs clearance." },
    { question: "Can a sole proprietor get an IEC?", answer: "Yes, a sole proprietor can easily obtain an IEC in their personal name backed by their individual PAN." },
    { question: "Is IEC mandatory for importing personal goods?", answer: "No, IEC is not required for importing or exporting goods for purely personal use that are not connected with commercial trade." }
  ],
  'legal-entity-identifier': [
    { question: "What is the validity of an LEI code?", answer: "An LEI code is valid for exactly 1 year and must be renewed annually to maintain compliant transactional status." },
    { question: "What happens if my LEI expires?", answer: "If your LEI is not renewed on time, banks will freeze your high-value transactions (over ₹50 Crores) and reject your fund transfers." },
    { question: "Who regulates LEI in India?", answer: "The Reserve Bank of India (RBI) mandates LEI, and registrations are processed by Legal Entity Identifier India Limited (LEIL), a subsidiary of CCIL." },
    { question: "Is LEI mandatory for individual taxpayers?", answer: "No, LEI is strictly for non-individual legal entities, such as companies, trusts, partnerships, and sole proprietorships conducting high-value trades." }
  ],
  'legal-entity-identifier-code': [
    { question: "What is the validity of an LEI code?", answer: "An LEI code is valid for exactly 1 year and must be renewed annually to maintain compliant transactional status." },
    { question: "What happens if my LEI expires?", answer: "If your LEI is not renewed on time, banks will freeze your high-value transactions (over ₹50 Crores) and reject your fund transfers." },
    { question: "Who regulates LEI in India?", answer: "The Reserve Bank of India (RBI) mandates LEI, and registrations are processed by Legal Entity Identifier India Limited (LEIL), a subsidiary of CCIL." },
    { question: "Is LEI mandatory for individual taxpayers?", answer: "No, LEI is strictly for non-individual legal entities, such as companies, trusts, partnerships, and sole proprietorships conducting high-value trades." }
  ],
  'iso-registration': [
    { question: "How long is an ISO certificate valid?", answer: "It is valid for 3 years, subject to annual surveillance audits to ensure continued standard compliance." },
    { question: "What is the difference between ISO 9001 and ISO 27001?", answer: "ISO 9001 focuses on Quality Management Systems (QMS) across operations, while ISO 27001 sets standards for Information Security Management Systems (ISMS)." },
    { question: "Can a startup apply for ISO certification?", answer: "Yes, any registered entity, regardless of size or age, can apply for ISO certification to demonstrate standardized business processes." },
    { question: "Is ISO certification mandatory by law?", answer: "ISO is generally voluntary, but it is often made mandatory by corporate clients or government departments to participate in tenders." }
  ],
  'pf-registration': [
    { question: "Can a company register voluntarily under PF?", answer: "Yes, companies with fewer than 20 employees can opt for voluntary PF registration to provide benefits to their employees." },
    { question: "What is the employee and employer PF contribution rate?", answer: "Generally, both the employee and the employer contribute 12% of the employee's basic salary plus dearness allowance monthly." },
    { question: "What is the penalty for not depositing PF contributions?", answer: "Delaying PF deposits attracts interest penalties under Section 7Q (12% per annum) and damages under Section 14B (up to 25% per annum)." },
    { question: "Is PF mandatory for contractual employees?", answer: "Yes, contractual employees working directly for your business are covered under PF regulations and must be included in your monthly returns." }
  ],
  'esi-registration': [
    { question: "Is ESI exit possible if staff strength drops below 10?", answer: "No, once registered under the ESI Act, compliance is mandatory indefinitely regardless of employee count." },
    { question: "What is the current monthly ESI contribution rate?", answer: "The current ESI contribution rate is 4% of the employee's gross salary (3.25% by the employer and 0.75% by the employee)." },
    { question: "What is the maximum salary limit for ESI coverage?", answer: "ESI coverage is mandatory for all employees whose gross monthly salary is ₹21,000 or less (or ₹25,000 for employees with physical disabilities)." },
    { question: "What benefits do employees get under ESI?", answer: "Employees receive full outpatient and inpatient medical care, maternity leaves, sickness cash benefits, and dependent pension benefits in case of occupational injury." }
  ],
  'professional-tax-registration': [
    { question: "Is Professional Tax applicable in all Indian states?", answer: "No, professional tax is state-dependent; states like Delhi, Haryana, and Rajasthan do not levy Professional Tax." },
    { question: "What is the difference between PTEC and PTRC?", answer: "PTEC (Professional Tax Enrollment Certificate) is paid by the company to do business, while PTRC (Professional Tax Registration Certificate) is needed to deduct and deposit tax from employees' salaries." },
    { question: "What is the maximum annual Professional Tax limit?", answer: "Under the Constitution of India, the maximum professional tax that any state can levy on an individual is capped at ₹2,500 per year." },
    { question: "What is the penalty for delaying Professional Tax filing?", answer: "Penalties vary by state but typically include interest on late payments (1.25% to 2% per month) and late filing fees (ranging from ₹100 to ₹1,000)." }
  ],
  'rcmc-registration': [
    { question: "Is RCMC mandatory for all exports?", answer: "No, RCMC is only mandatory if you wish to claim export incentives, rebates, or duty drawbacks from the government." },
    { question: "How long is an RCMC certificate valid?", answer: "It is valid for exactly 5 years, starting from the 1st of April of the registration year, and must be renewed upon expiry." },
    { question: "Which council should I register with for agricultural goods?", answer: "Agricultural exporters must register with APEDA (Agricultural and Processed Food Products Export Development Authority) to get their RCMC." },
    { question: "What is FIEO in RCMC?", answer: "FIEO (Federation of Indian Export Organisations) is the apex export facilitation body. If there is no specific council for your product, you can register with FIEO." }
  ],
  'tn-rera-registration-agents': [
    { question: "Can an agent sell properties without RERA?", answer: "No, advertising, marketing, booking, or selling plots/apartments in RERA registered projects is strictly illegal without a RERA agent license." },
    { question: "What is the validity of a TN RERA Agent license?", answer: "A RERA Agent registration in Tamil Nadu is valid for 5 years and must be renewed at least 60 days before expiry." },
    { question: "Does RERA apply to commercial property brokers?", answer: "Yes, RERA regulations apply to both residential and commercial real estate transactions and brokerages." },
    { question: "What is the penalty for acting as a broker without RERA?", answer: "Under the RERA Act, brokers operating without registration face a daily penalty of ₹10,000, which can accumulate up to 5% of the total cost of the property brokered." }
  ],
  '12a-registration': [
    { question: "Is 12A registration applicable to private family trusts?", answer: "No, 12A is exclusively for public charitable, non-profit trusts and institutions." },
    { question: "How long does a provisional 12A registration remain valid?", answer: "A provisional 12A registration is valid for 3 years. NGOs must apply for a permanent/active registration at least 6 months before provisional expiry." },
    { question: "What is the tax exemption limit for a registered NGO?", answer: "Once registered under 12A, 100% of the NGO's income is exempt from tax, provided it accumulates or utilizes at least 85% of its funds annually for charity." },
    { question: "Can a Section 8 Company run without 12A?", answer: "A Section 8 company can exist, but its income will be taxed at standard corporate rates unless it obtains a 12A registration." }
  ],
  '80g-registration': [
    { question: "Is there a limit on cash donations under 80G?", answer: "Yes, cash donations exceeding ₹2,000 are not eligible for 80G tax benefits. Donors must contribute digitally to claim deductions." },
    { question: "Does 80G registration give a 100% tax exemption to donors?", answer: "No, standard 80G registrations allow a 50% deduction of the donated amount from the donor's taxable income, subject to a limit of 10% of their adjusted gross total income." },
    { question: "What is the penalty for not filing the annual donor statement?", answer: "NGOs must file an annual statement of donations (Form 10BD) by May 31st. Delaying this attracts a late fee of ₹200 per day." },
    { question: "Can a newly formed NGO apply for 80G?", answer: "Yes, a newly formed NGO can apply for a provisional 80G certificate immediately upon incorporation, which is valid for 3 years." }
  ],
  '12a-80g-registration': [
    { question: "Are these registrations permanent?", answer: "No, under recent amendments, provisional registrations are initially granted for 3 years, which must be converted to regular registration within that period." },
    { question: "What is Form 10BD for registered NGOs?", answer: "Form 10BD is an annual statement of donations that must be filed on the income tax portal to transmit tax deduction benefits directly to the donors' profiles." },
    { question: "Is a Darpan ID mandatory for 12A/80G?", answer: "Yes, having a valid NITI Aayog NGO Darpan ID is highly recommended and practically mandatory to get tax approvals and government projects." },
    { question: "What is the key benefit of applying for both together?", answer: "It streamlines administrative workloads, ensures consistent legal files, and makes your NGO immediately operational for tax-free donations and CSR grants." }
  ],
  'barcode-registration': [
    { question: "What is GS1?", answer: "GS1 is the global non-profit organization that manages international standards for retail barcodes." },
    { question: "What is the difference between EAN-13 and UPC barcodes?", answer: "EAN-13 (13 digits) is the standard retail barcode used globally, including in Europe and India, while UPC (12 digits) is predominantly used in the United States and Canada." },
    { question: "How do I choose the right barcode pack?", answer: "GS1 offers barcode ranges in blocks of 100, 1,000, or 10,000, based on your active stock-keeping unit (SKU) count and product variations." },
    { question: "Do virtual products require barcode registration?", answer: "No, barcodes are strictly designed for physical products sold in brick-and-mortar retail stores or physical e-commerce marketplaces." }
  ],
  'bis-registration': [
    { question: "Is BIS mandatory for electronics?", answer: "Yes, under the CRS scheme, key electronics like smartphones, power adapters, and laptops mandatorily require BIS registration." },
    { question: "What is the difference between ISI Mark and CRS under BIS?", answer: "ISI Mark is generally for industrial and household consumer goods (like cylinders, cement, helmet) requiring factory audits, whereas CRS (Compulsory Registration Scheme) is for electronics and IT products tested in NABL labs." },
    { question: "How long is a BIS certificate valid?", answer: "A BIS CRS registration is valid for exactly 2 years and can be renewed by submitting renewal applications and fees before expiry." },
    { question: "Can a foreign manufacturer get a BIS license?", answer: "Yes, foreign manufacturers can get a BIS license under the Foreign Manufacturers Certification Scheme (FMCS) by appointing an Authorized Indian Representative (AIR)." }
  ],
  'certificate-of-incumbency': [
    { question: "Is this document issued by the MCA?", answer: "No, it is drafted and verified by a corporate secretary or notary, backed by active government MCA database filings." },
    { question: "Why do international banks require a Certificate of Incumbency?", answer: "They use it to confirm the legitimate signing authority of the directors and verify that the corporation is in active standing before opening bank accounts." },
    { question: "Does a Certificate of Incumbency expire?", answer: "It does not have a formal expiry but banks and courts generally require a fresh certificate issued within the past 30 to 60 days to ensure details are active." },
    { question: "What is the difference between Incumbency Certificate and COI?", answer: "A COI (Certificate of Incorporation) proves the birth of the company, while an Incumbency Certificate proves the current live board of directors and officers at a specific point in time." }
  ],
  'darpan-registration': [
    { question: "Is NGO Darpan registration free?", answer: "Yes, NGO Darpan portal registration is completely free of cost on NITI Aayog's portal." },
    { question: "Who can register on the NGO Darpan portal?", answer: "Any public charitable trust, registered society, or Section 8 non-profit company is eligible to register on the Darpan portal." },
    { question: "Can a private family trust register on NGO Darpan?", answer: "No, only public charitable organizations that operate for the benefit of the general public are allowed to register." },
    { question: "Is it mandatory to update NGO Darpan details every year?", answer: "Yes, to keep your NGO active and eligible for grants, you must update the financial logs and active trustee list on the portal annually." }
  ],
  'digital-signature': [
    { question: "Can a foreigner obtain an Indian DSC?", answer: "Yes, foreign nationals can obtain an Indian DSC by submitting apostilled identity and address proofs." },
    { question: "What is the validity of a Class-3 DSC?", answer: "Class-3 DSCs are typically issued with a validity of 2 years or 3 years, after which they must be renewed." },
    { question: "What happens if I lose my USB DSC token?", answer: "If lost, you must block the previous token and apply for a fresh Class-3 DSC to ensure electronic security." },
    { question: "Is physical verification required to get a DSC?", answer: "No, verification is done digitally via video recording of the applicant showing their PAN/Aadhaar cards and verifying their details." }
  ],
  'shop-act-registration': [
    { question: "Is this required for a remote IT company?", answer: "Yes, if you operate out of a physical commercial office space in any state, a Shop Act license is mandatory." },
    { question: "What is the penalty for not registering under the Shop Act?", answer: "Failing to register can lead to municipal inspections, fines ranging from ₹2,000 to ₹10,000, and a block on getting local business permits." },
    { question: "Does Shop Act Registration require renewals?", answer: "Yes, renewal terms are state-specific. Some states offer lifetime validity certificates, while others require renewals every 1 to 5 years." },
    { question: "Is Shop Act registration valid as address proof for bank accounts?", answer: "Yes, the Shop Act license is one of the most widely accepted KYC documents for opening business current bank accounts in India." }
  ],
  'udyam-registration': [
    { question: "What is the validity of an Udyam Certificate?", answer: "Udyam Registration is a permanent certificate with lifetime validity; it does not require renewals." },
    { question: "What is the MSME 45-day payment protection rule?", answer: "Under Section 15 of the MSMED Act, buyers must pay MSMEs for goods or services within 45 days. Delayed payments attract compound interest at 3 times the RBI bank rate." },
    { question: "Can a retail or wholesale trader apply for Udyam?", answer: "Yes, the Ministry of MSME recently relaxed rules to allow retail and wholesale traders to get Udyam certificates, primarily for priority sector lending benefits." },
    { question: "Is GSTIN mandatory to obtain Udyam registration?", answer: "Yes, having a valid GSTIN and PAN is mandatory to register under the Udyam MSME scheme, except for certain exempt categories." }
  ],
  'legal-name-change': [
    { question: "Is Gazette publication mandatory for name change?", answer: "Yes, for government employees and standard passport revisions, the official Gazette publication is the only legally accepted proof." },
    { question: "Can I change my name online in the Gazette?", answer: "The application is prepared online, but physical submission of the dossier and CD is often required at the Department of Publication in New Delhi." },
    { question: "How long does it take for the Gazette name change to publish?", answer: "Once submitted, it generally takes 3 to 5 weeks for the Government Press to officially publish the name change in the weekly Gazette." },
    { question: "Can minor child name changes be done via the Gazette?", answer: "Yes, parents or legal guardians can file a Gazette name change application on behalf of their minor children." }
  ],

  // === 3. GOVT LICENSE SERVICES ===
  'fire-license': [
    { question: "How often must a Fire NOC be renewed?", answer: "For commercial buildings, a Fire NOC is typically renewed annually or every 2 years, depending on state regulations." },
    { question: "What are the common equipment requirements for a Fire NOC?", answer: "Typically, buildings must install fire extinguishers, wet risers, hose reels, automatic sprinkler systems, and highly visible fire alarms." },
    { question: "Is a Fire NOC mandatory for small offices?", answer: "A Fire NOC is generally mandatory for commercial properties over a certain height (usually 15 meters) or specific businesses like restaurants, schools, and malls regardless of size." },
    { question: "What is the consequence of operating a public facility without a Fire NOC?", answer: "Operating without a Fire NOC invites immediate sealing of the property by fire marshals, a cancellation of the local trade license, and zero insurance claims coverage in case of a fire accident." }
  ],
  'icegate-registration': [
    { question: "Is a DSC required for ICEGATE?", answer: "Yes, a valid Class-3 Digital Signature Certificate is mandatory to complete ICEGATE registration and sign custom files." },
    { question: "Who needs to register on ICEGATE?", answer: "All importers, exporters, shipping agents, and custom house agents clearing goods through Indian customs must register on ICEGATE." },
    { question: "What is the key benefit of ICEGATE portal registration?", answer: "It allows rapid customs clearance, electronic payment of custom duties, instant checking of document status, and direct filing of Bill of Entry." },
    { question: "Is there any registration fee for ICEGATE?", answer: "No, registration on the ICEGATE portal is completely free of charge, with only standard DSC acquisition costs applying." }
  ],

  // === 4. FOOD SAFETY & TESTING ===
  'fssai-registration': [
    { question: "Who requires a Basic FSSAI Registration?", answer: "Petty food businesses, local retailers, temporary stall holders, or home bakers with an annual turnover under ₹12 Lakhs require a Basic FSSAI Registration." },
    { question: "Is FSSAI mandatory for home bakers?", answer: "Yes, any person preparing, handling, or selling food items from home must have a valid FSSAI license or registration to operate legally." },
    { question: "What is the validity period of an FSSAI Certificate?", answer: "FSSAI registrations are issued with a validity of 1 to 5 years. You must apply for renewal at least 30 days before expiration to avoid daily late penalties." },
    { question: "What is the penalty for operating a food business without FSSAI?", answer: "Operating without an FSSAI certificate can lead to imprisonment for up to 6 months and a cash penalty of up to ₹5 Lakhs." }
  ],
  'fssai-license': [
    { question: "What is the difference between State and Central FSSAI Licenses?", answer: "A State License is for mid-sized businesses with turnovers between ₹12 Lakhs and ₹20 Crores. A Central License is mandatory for businesses with turnover exceeding ₹20 Crores, exporters, importers, or multi-state operators." },
    { question: "Do food e-commerce platforms like Swiggy and Zomato require FSSAI?", answer: "Yes, all e-commerce food operators must obtain a Central FSSAI License to list, sell, or deliver food products." },
    { question: "Can I upgrade my FSSAI Basic Registration to a State License?", answer: "Yes, as your annual turnover grows beyond ₹12 Lakhs, you can apply for an upgrade from Basic Registration to a State FSSAI License on the FoSCoS portal." },
    { question: "Is a food safety plan mandatory for FSSAI licenses?", answer: "Yes, State and Central FSSAI license applications mandatorily require the submission of a FSMS (Food Safety Management System) plan and layout layout blueprints." }
  ],
  'halal-license-certification': [
    { question: "What is a Halal Certificate?", answer: "A Halal Certificate ensures that food, cosmetics, or pharmaceutical products conform to Islamic dietary laws and quality standards, making them eligible for consumption by Muslim consumers." },
    { question: "Is Halal certification mandatory by Indian law?", answer: "No, Halal certification is voluntary in India, but it is highly recommended for exporting to Muslim-majority countries (UAE, Saudi Arabia, Malaysia)." },
    { question: "How long is a Halal Certificate valid?", answer: "A Halal Certificate is typically valid for exactly 1 year and requires an annual audit of the production unit for renewal." },
    { question: "Which industries benefit from Halal certification?", answer: "Meat processors, packaged food manufacturers, cosmetics, pharmaceuticals, and hotels targeting global Islamic tourism benefit immensely." }
  ],
  'food-testing': [
    { question: "Why is professional food testing required?", answer: "It validates the safety, nutritional profile, shelf life, and allergen content of food products, ensuring compliance with strict FSSAI food quality regulations." },
    { question: "How often should food products be tested?", answer: "FSSAI mandates that food manufacturing units test their food products for chemical and microbiological contaminants at least once every 6 months." },
    { question: "What is a shelf-life analysis?", answer: "It determines how long a food product remains safe, nutritious, and appetizing under recommended storage conditions, which is needed to print 'Best Before' dates." },
    { question: "Where are food samples tested?", answer: "Food samples must be tested in FSSAI-notified, NABL-accredited laboratory facilities to be accepted as legally valid test records." }
  ],
  'water-testing': [
    { question: "Is water testing mandatory for food businesses?", answer: "Yes, FSSAI regulations require all food manufacturers and restaurants to test their drinking/operational water annually to ensure it is free from harmful bacteria and heavy metals." },
    { question: "What standards are applied for drinking water testing in India?", answer: "Drinking water is tested against IS 10500:2012 standards, which define maximum permissible limits for physical, chemical, and bacteriological parameters." },
    { question: "What is checked during a microbiological water test?", answer: "It specifically scans for fecal coliforms, E. coli, and other pathogenic bacteria that cause severe waterborne diseases." },
    { question: "How is water testing performed for industrial waste discharge?", answer: "Industrial waste discharge is tested according to CPCB/SPCB guidelines to ensure the chemical oxygen demand (COD) and biological oxygen demand (BOD) meet environmental standards." }
  ],

  // === 5. GST REGISTRATION & COMPLIANCE ===
  'gst-registration': [
    { question: "What is the threshold limit for mandatory GST registration?", answer: "For service providers, GST registration is mandatory when annual turnover exceeds ₹20 Lakhs (₹10 Lakhs for hill states). For goods suppliers, the threshold is ₹40 Lakhs (₹20 Lakhs for hill states)." },
    { question: "Can I register for GST voluntarily?", answer: "Yes, businesses can opt for voluntary GST registration even if their turnover is below the threshold, enabling them to claim Input Tax Credit (ITC) and trade inter-state." },
    { question: "Is physical verification of office required for GST?", answer: "In some cases, GST officers can conduct a physical verification of the registered address to prevent fake invoices, especially for newly registered entities." },
    { question: "What is the penalty for not registering under GST when mandatory?", answer: "Failing to register under GST when legally required can result in a penalty of 100% of the tax due or ₹10,000, whichever is higher." }
  ],
  'gst-filing': [
    { question: "What are GSTR-1 and GSTR-3B filings?", answer: "GSTR-1 is a monthly/quarterly return showing details of all outward sales supplies. GSTR-3B is a monthly self-declaration return used to summarize and pay net GST liability." },
    { question: "What is the QRMP scheme under GST?", answer: "The Quarterly Return Monthly Payment (QRMP) scheme allows small taxpayers (turnover under ₹5 Crores) to file GST returns quarterly while paying taxes monthly." },
    { question: "What happens if I delay filing my GST returns?", answer: "Delaying GST filing attracts late fees (up to ₹50 per day of delay) and interest at 18% per annum on the net unpaid tax liability." },
    { question: "Can a GST registration be cancelled for non-filing?", answer: "Yes, if a regular taxpayer fails to file GST returns for a continuous period of 6 months, the GST Officer can cancel their registration." }
  ],
  'gst-lut-filing': [
    { question: "What is an LUT under GST?", answer: "A Letter of Undertaking (LUT) allows registered exporters to export goods or services without paying Integrated GST (IGST), saving cash flow." },
    { question: "Who is eligible to file a GST LUT?", answer: "All registered exporters who have not been prosecuted for tax evasion exceeding ₹250 Lakhs are eligible to file an LUT." },
    { question: "How long is a GST LUT valid?", answer: "An LUT is valid for exactly 1 financial year (e.g., from April 1 to March 31) and must be refiled online at the start of every financial year." },
    { question: "What happens if I don't file an LUT and export?", answer: "If you export without filing an LUT, you must pay IGST at the time of export and subsequently apply for a tax refund from the department." }
  ],
  'gst-composition-scheme': [
    { question: "What is the GST Composition Scheme?", answer: "It is a simplified scheme for small taxpayers (turnover up to ₹1.5 Crores) allowing them to pay GST at a low, flat rate (1% to 6%) with minimal return filings." },
    { question: "Can a Composition Dealer collect tax from customers?", answer: "No, composition dealers are strictly prohibited from collecting GST from their customers and cannot issue tax invoices." },
    { question: "Is Input Tax Credit (ITC) available under the Composition Scheme?", answer: "No, composition dealers cannot claim any Input Tax Credit (ITC) on their business purchases." },
    { question: "How often do Composition taxpayers file returns?", answer: "They pay tax quarterly using Form CMP-08 and file a simplified annual return using Form GSTR-4." }
  ],
  'gst-annual-return': [
    { question: "What is GSTR-9 under GST?", answer: "GSTR-9 is the comprehensive annual return that must be filed by all regular registered GST taxpayers, summarizing sales, purchases, and tax paid." },
    { question: "Is GSTR-9 mandatory for all taxpayers?", answer: "Currently, GSTR-9 is optional for taxpayers whose aggregate annual turnover is up to ₹2 Crores, but highly recommended to reconcile accounts." },
    { question: "What is GSTR-9C and who must file it?", answer: "GSTR-9C is a reconciliation statement between audited annual financial statements and the filed GSTR-9, mandatory for taxpayers with turnover exceeding ₹5 Crores." },
    { question: "What is the penalty for late filing of GST Annual Returns?", answer: "The late fee for delaying GSTR-9 is ₹200 per day (subject to a maximum of 0.25% to 0.50% of the taxpayer's state turnover)." }
  ],
  'gst-einvoice': [
    { question: "What is e-Invoicing under GST?", answer: "It is a system where B2B invoices are uploaded and authenticated by the government's Invoice Registration Portal (IRP), generating a unique Invoice Reference Number (IRN) and QR Code." },
    { question: "What is the current turnover limit for mandatory e-Invoicing?", answer: "e-Invoicing is mandatory for all businesses whose aggregate annual turnover in any preceding financial year (from 2017-18 onwards) exceeds ₹5 Crores." },
    { question: "Are B2C invoices covered under e-Invoicing?", answer: "No, e-invoicing is strictly applicable to B2B invoices, export invoices, and credit/debit notes. B2C invoices are currently exempt." },
    { question: "What happens if a mandatory business fails to generate an e-invoice?", answer: "The physical invoice is considered legally invalid. It attracts a penalty of 100% of the tax due or ₹10,000 per invoice, and the buyer cannot claim ITC." }
  ],
  'gst-eway-bill': [
    { question: "When is a GST e-Way Bill mandatory?", answer: "An e-Way Bill is mandatory for transporting goods worth more than ₹50,000 (inter-state) or state-specific limits (intra-state) in a motorized vehicle." },
    { question: "What is the validity of an e-Way Bill?", answer: "For regular cargo, the validity is 1 day for every 200 km of distance. For over-dimensional cargo, it is 1 day for every 20 km." },
    { question: "Can an e-Way Bill validity be extended?", answer: "Yes, the transporter can extend the validity of an e-way bill online within 8 hours before or 8 hours after the expiration time." },
    { question: "What is the penalty for transporting goods without an e-Way Bill?", answer: "Transporting goods without a valid e-way bill can lead to a penalty of ₹10,000 or the tax amount due, along with the seizure of the vehicle." }
  ],
  'gst-refund-claim': [
    { question: "Who can claim a GST refund?", answer: "Exporters (with or without tax payment), businesses with inverted duty structure (inputs have higher tax rate than outputs), and embassies can claim refunds." },
    { question: "What is the time limit to file a GST refund claim?", answer: "A refund claim must be filed online within 2 years from the 'relevant date' (e.g., date of export or date of payment of tax)." },
    { question: "What is the interest on delayed GST refunds?", answer: "If a refund is not sanctioned within 60 days from the receipt of the application, interest at 6% per annum is payable by the department." },
    { question: "What is an inverted duty structure refund?", answer: "It occurs when the GST rate on inputs purchased is higher than the GST rate on outward finished products sold, leading to accumulated cash blocks." }
  ],
  'gst-audit-assessment': [
    { question: "What is a GST Audit by tax authorities?", answer: "It is an examination of the business's records, filings, and books of accounts conducted by GST department officers to verify tax compliance." },
    { question: "How are businesses selected for a GST audit?", answer: "Tax authorities select businesses using risk-based parameters, discrepancy logs in GSTR-2B vs 3B, or high-value Input Tax Credit claims." },
    { question: "What documents must be kept ready for a GST audit?", answer: "Audited financial statements, purchase bills, sales registers, stock ledgers, e-way bills, and IT returns must be maintained for inspection." },
    { question: "What happens if tax evasion is detected during an audit?", answer: "The department issues a show-cause notice demanding unpaid taxes, interest at 18% per annum, and penalties under Section 73 or 74 (ranging from 10% to 100%)." }
  ],
  'gst-amendment-cancellation': [
    { question: "Can I modify my registered GST details?", answer: "Yes, you can file a GST Amendment application to update core fields (legal name, address, promoters) or non-core fields (mobile number, bank account)." },
    { question: "What is a GST cancellation?", answer: "It is the formal surrender of the GST registration because the business is closed, sold, or no longer meets threshold limits." },
    { question: "Can a cancelled GST registration be restored?", answer: "Yes, you can file a 'Revocation of Cancellation' application within 90 days from the date of the cancellation order." },
    { question: "Do I need to file return after surrendering GST?", answer: "Yes, you must file a final return using Form GSTR-10 within 3 months from the date of the cancellation order." }
  ],

  // === 6. TRADEMARK & IP ===
  'trademark-registration': [
    { question: "What is a trademark search and why is it vital?", answer: "A trademark search checks if your brand name or logo is similar to an already registered brand, preventing legal disputes and rejection." },
    { question: "How long does a trademark registration last in India?", answer: "A registered trademark is valid for exactly 10 years from the date of filing and can be renewed indefinitely every 10 years." },
    { question: "What is the difference between TM and ® symbols?", answer: "The TM symbol is used once the application is filed with the registry. The ® symbol can only be used after the registration certificate is issued." },
    { question: "Can I trademark a generic word?", answer: "No, generic or purely descriptive words (e.g., 'Cold' for ice cream) cannot be registered. The mark must be highly distinctive." }
  ],
  'trademark-objection': [
    { question: "Why is a Trademark Objection raised?", answer: "Objections are raised under Section 9 (lacks distinctiveness or is descriptive) or Section 11 (similar to an existing registered mark) of the Trade Marks Act." },
    { question: "What is the time limit to reply to a Trademark Objection?", answer: "You must submit a professional legal reply within exactly 30 days from the date of receipt of the examination report." },
    { question: "What happens if I don't reply to an objection on time?", answer: "If you fail to file a reply within 30 days, the Trademark Registry will change the application status to 'Abandoned'." },
    { question: "Is a hearing mandatory after replying to an objection?", answer: "No, if the examiner is satisfied with your written legal reply, they will accept the mark. Otherwise, they will schedule a virtual hearing." }
  ],
  'trademark-certificate': [
    { question: "When is the Trademark Certificate issued?", answer: "It is issued after the trademark passes examination, is published in the Trademark Journal, and remains unopposed for exactly 4 months." },
    { question: "Can a trademark certificate be cancelled?", answer: "Yes, any aggrieved person can file a rectification application to cancel or remove a trademark if it was registered without cause or not used for 5 years." },
    { question: "Is a digital trademark certificate legally valid?", answer: "Yes, the Trademark Registry issues fully digital certificates which are legally valid and accepted across all courts." },
    { question: "What rights does a Trademark Certificate grant?", answer: "It grants exclusive nationwide ownership rights, prevents competitor lookalikes, and allows you to initiate criminal/civil actions for infringement." }
  ],
  'trademark-opposition': [
    { question: "What is a Trademark Opposition?", answer: "It is a legal proceeding where a third party opposes the registration of your trademark within 4 months of its publication in the Journal." },
    { question: "Who can file a Trademark Opposition?", answer: "Any individual or business who believes your mark will confuse consumers or damage their brand reputation can file an opposition." },
    { question: "What is the timeline of an opposition case?", answer: "It involves filing a Notice of Opposition (TM-O), a Counter-Statement within 2 months, followed by evidence submissions and a final hearing." },
    { question: "What happens if I don't file a Counter-Statement?", answer: "If you fail to file a Counter-Statement within 2 months of receiving the opposition notice, your application is permanently abandoned." }
  ],
  'trademark-hearing': [
    { question: "What is a Trademark Hearing?", answer: "It is a formal virtual or physical meeting scheduled by the Trademark Officer when they are not satisfied with your written objection reply." },
    { question: "Is a physical presence required for a trademark hearing?", answer: "No, almost all trademark hearings are now conducted virtually via secure online video conferencing tools." },
    { question: "Who can represent me in a trademark hearing?", answer: "Only the applicant, a registered trademark agent, or a qualified advocate with a valid power of attorney can attend and argue the case." },
    { question: "What happens if I miss my scheduled hearing?", answer: "If you miss the hearing without a prior adjournment request, the examiner can dismiss or abandon your application immediately." }
  ],
  'trademark-rectification': [
    { question: "What is Trademark Rectification?", answer: "It is a legal process to remove or edit an already registered trademark from the registry, usually due to non-use for over 5 years." },
    { question: "Where is a rectification application filed?", answer: "It is filed online directly with the Registrar of Trademarks or the High Court having competent jurisdiction." },
    { question: "Who can file for trademark rectification?", answer: "Any aggrieved person who is directly affected by the presence of the wrong or conflicting mark on the registry can file." },
    { question: "What is the key grounds for trademark removal?", answer: "The primary ground is that the trademark was registered without genuine intent to use and has not been used for a continuous period of 5 years." }
  ],
  'tm-infringement-notice': [
    { question: "What is a Trademark Infringement Notice?", answer: "It is a formal legal cease-and-desist letter sent to an unauthorized user demanding they stop using a similar or identical brand name." },
    { question: "What if the infringer ignores the legal notice?", answer: "If ignored, we can file a commercial suit for trademark infringement in the District Court to secure an immediate injunction and damages." },
    { question: "Can I send an infringement notice for an unregistered trademark?", answer: "Yes, but you must sue under the common law remedy of 'passing off' rather than statutory trademark infringement." },
    { question: "What details should be included in the notice?", answer: "It must detail your trademark registration numbers, evidence of the infringer's bad faith, and specify a deadline (usually 7-15 days) to comply." }
  ],
  'trademark-renewal': [
    { question: "When should I apply for trademark renewal?", answer: "You can apply for renewal within 6 months before the 10-year expiry date. A late filing is also possible within 6 months after expiry with a late fee." },
    { question: "What happens if I forget to renew my trademark?", answer: "If not renewed within the grace period (6 months post-expiry), the Registrar will remove your trademark from the register, making it available to competitors." },
    { question: "Can a removed trademark be restored?", answer: "Yes, you can apply for restoration (Form TM-R) within 1 year from the expiry date, subject to heavy government penalty fees." },
    { question: "Do I get a new certificate upon trademark renewal?", answer: "No, a fresh renewal certificate is not issued; instead, the registry updates the online database and issues a renewal receipt." }
  ],
  'trademark-transfer': [
    { question: "Can a pending trademark be transferred?", answer: "Yes, you can legally transfer pending trademark applications using the same assignment procedure." },
    { question: "What is a Trademark Assignment Deed?", answer: "It is a written legal agreement executed on stamp paper detailing the terms, consideration, and rights transferred from assignor to assignee." },
    { question: "What is the difference between Assignment and Licensing?", answer: "Assignment transfers complete ownership of the trademark permanently, while licensing grants temporary permission to use the mark under agreed conditions." },
    { question: "Is stamp duty payable on trademark transfers?", answer: "Yes, the assignment deed must be executed on a stamp paper of appropriate value as per regional state stamp acts." }
  ],
  'expedited-tm-registration': [
    { question: "Does expedited filing guarantee approval?", answer: "No, it only speeds up the examination queue. Any objection or opposition will still follow standard legal procedures." },
    { question: "What is the benefit of expedited trademark filing?", answer: "The examination report is issued within 30 days of filing instead of several months, dramatically shortening the path to registration." },
    { question: "Is the government fee higher for expedited trademarks?", answer: "Yes, the government filing fee for an expedited trademark application (Form TM-M) is significantly higher than standard filings." },
    { question: "Who should opt for expedited registration?", answer: "Startups looking for rapid funding, businesses facing immediate copycats, or those launching urgent global marketing campaigns." }
  ],
  'logo-designing': [
    { question: "Why is a trademark search important for logo design?", answer: "It ensures the custom shape or visual style doesn't match an existing corporate logo, saving you from trademark objections later." },
    { question: "What formats will the final logo be delivered in?", answer: "We deliver vector source files (.AI, .EPS, .SVG, .PDF) and high-resolution web formats (.PNG, .JPEG) for complete versatility." },
    { question: "Who owns the copyright of the designed logo?", answer: "Upon final payment, complete copyright ownership and all intellectual property rights of the custom logo design are transferred to the client." },
    { question: "How many revisions are allowed during design?", answer: "We typically offer unlimited revisions within the selected design path to ensure the logo perfectly represents your brand vision." }
  ],
  'design-registration': [
    { question: "What is the validity of a design registration?", answer: "It is registered for 10 years, and can be extended for an additional 5 years (maximum 15 years total)." },
    { question: "Can a physical mechanism be protected under Design?", answer: "No, design registration only protects the external aesthetic looks (shape, visual patterns). Mechanical functions must be patented." },
    { question: "What makes a design eligible for registration?", answer: "The design must be absolutely new, original, not published anywhere in the world, and significantly different from existing designs." },
    { question: "What is the difference between a Design and a Patent?", answer: "A design protects only the outward appearance or ornamental value of a product, while a patent protects the underlying technical invention and how it works." }
  ],
  'design-objection': [
    { question: "How much time is allowed to reply to a design objection?", answer: "You must file a written reply within exactly 6 months from the date of the application filing or objection report, as specified." },
    { question: "What are the common grounds for design objections?", answer: "Lack of novelty, prior publication in catalog scans, or failure to clearly show product shape views (top, side, front)." },
    { question: "Is a hearing scheduled for design objections?", answer: "Yes, if the written reply is not accepted, the patent office schedules a hearing where a registered agent can defend the design's novelty." },
    { question: "What happens if I miss the reply deadline?", answer: "The application is permanently abandoned and cannot be restored, making the design public domain." }
  ],
  'copyright-registration': [
    { question: "How long does copyright protection last?", answer: "For literary, dramatic, musical, and artistic works, copyright lasts for the lifetime of the author plus 60 years after their death." },
    { question: "Can software source code be copyrighted?", answer: "Yes, software source code and object code can be registered under the 'Literary Works' category of the Copyright Act." },
    { question: "Is registration mandatory to enforce a copyright?", answer: "Copyright exists automatically upon creation, but registration provides prima facie legal proof of ownership in a court of law during piracy trials." },
    { question: "What is a Diary Number in copyright?", answer: "A Diary Number is a unique receipt number issued immediately upon online filing, starting the mandatory 30-day waiting period for public objections." }
  ],
  'copyright-objection': [
    { question: "What is a 'discrepancy letter' in copyright?", answer: "It is an official letter pointing out issues like mismatched signatures, missing NOCs, or similar copyrighted works in the registry." },
    { question: "What is the timeline to reply to a copyright objection?", answer: "The applicant must file a detailed explanation or resolve the discrepancy within 30 days of receiving the discrepancy letter." },
    { question: "What is a copyright hearing?", answer: "If the registrar is not satisfied with your reply to the discrepancy letter, they schedule a hearing to make a final determination on registrability." },
    { question: "Can a third party object to a copyright application?", answer: "Yes, during the mandatory 30-day waiting period after filing, any person can file an objection claiming ownership of the work." }
  ],
  'patent-registration': [
    { question: "What is a provisional patent?", answer: "A provisional patent is a quick, low-cost application filed early to secure a 'Priority Date' for your invention before writing the full complete specification within 12 months." },
    { question: "How long does a patent protect an invention?", answer: "A patent in India grants exclusive monopoly rights for exactly 20 years from the international/local filing date, subject to annual maintenance fees." },
    { question: "Can software or mathematical formulas be patented?", answer: "Under Section 3(k) of the Patents Act, computer programs per se, business methods, or mathematical algorithms are not patentable in India." },
    { question: "What makes an invention patentable?", answer: "The invention must be completely new (novel), possess an inventive step (non-obvious to a skilled person), and be capable of industrial application." }
  ],
  'trademark-protection': [
    { question: "Why is a trademark watch service important?", answer: "If you don't actively monitor the journal, a copycat's application might get registered, forcing you to go through a slow, expensive court rectification to remove it later." },
    { question: "How does brand monitoring protect my IP?", answer: "It actively scans trademark journals and new filings to notify you of conflicting marks, allowing us to file oppositions before they are registered." },
    { question: "Can you stop domain name copycats?", answer: "Yes, our trademark watch includes scanning domain registrations, and we can file complaints under UDRP to reclaim infringing domain names." },
    { question: "Is trademark protection valid internationally?", answer: "Trademarks are territorial. To protect your brand globally, you must file individual applications in foreign countries or use the Madrid Protocol." }
  ],

  // === 7. TAX COMPLIANCE ===
  'income-tax-efiling': [
    { question: "Who is mandatorily required to file an Income Tax Return?", answer: "Any individual whose gross total income exceeds the basic exemption limit (₹2.5L / ₹3L / ₹7L depending on the tax regime) must file an ITR." },
    { question: "What are the common ITR forms?", answer: "ITR-1 is for salaried individuals with one house property. ITR-2 is for capital gains and foreign income. ITR-3 is for business/professionals, and ITR-4 is for presumptive taxation." },
    { question: "What is the penalty for filing ITR after the deadline?", answer: "Filing after the July 31st deadline attracts a late fee under Section 234F of up to ₹5,000, and interest on unpaid tax at 1% per month." },
    { question: "What is Form 26AS?", answer: "Form 26AS is a consolidated annual tax statement displaying tax credit records, TDS, TCS, and high-value financial transaction logs linked to your PAN." }
  ],
  'tds-return-filing': [
    { question: "What is TDS and who must deduct it?", answer: "Tax Deducted at Source (TDS) is a system where a person making specified payments (rent, salary, professional fees) deducts tax at source and deposits it with the government." },
    { question: "What is the due date for filing quarterly TDS returns?", answer: "TDS returns must be filed quarterly: Q1 by July 31, Q2 by Oct 31, Q3 by Jan 31, and Q4 by May 31." },
    { question: "What is the penalty for delaying TDS return filing?", answer: "Delaying TDS return filing attracts a mandatory late fee of ₹200 per day under Section 234E, capped at the total TDS amount." },
    { question: "What is the difference between Form 16 and Form 16A?", answer: "Form 16 is the TDS certificate for salary income, while Form 16A is the TDS certificate for non-salary payments (professional fees, interest)." }
  ],
  'tax-compliance': [
    { question: "What is corporate tax compliance?", answer: "It refers to the legal obligations of a registered corporate entity to file ITR, pay advance tax, deduct TDS, and maintain proper accounts." },
    { question: "How often do companies need to file compliance documents?", answer: "Companies must file monthly/quarterly TDS and GST returns, make quarterly advance tax payments, and file annual ITR and ROC returns." },
    { question: "What is the corporate tax rate for new manufacturing companies?", answer: "New manufacturing companies incorporated after October 2019 can opt for a highly concessional tax rate of 15% under Section 115BAB." },
    { question: "What happens if a company fails to comply with tax laws?", answer: "Non-compliance results in heavy penalty interests, disqualification of directors, suspension of GSTIN, and prosecution of promoters." }
  ],

  // === 8. GLOBAL BUSINESS FORMATIONS ===
  'uae-company-registration': [
    { question: "Can a foreigner own 100% of a UAE company?", answer: "Yes, under recent UAE commercial laws, foreigners can own 100% of companies incorporated in UAE Free Zones and Mainland sectors." },
    { question: "What is the difference between UAE Mainland and Free Zone?", answer: "Mainland companies can trade freely anywhere within the UAE and globally, while Free Zone companies are restricted to trading within their specific zone and globally." },
    { question: "Is corporate tax levied in the UAE?", answer: "Yes, the UAE introduced a standard corporate tax of 9% on business net profits exceeding AED 375,000 starting from June 2023." },
    { question: "Is a physical office address mandatory in Dubai?", answer: "Yes, mainland companies require a physical office lease (Ejari), while Free Zone companies can use shared desks or virtual offices." }
  ],
  'usa-company-registration': [
    { question: "Can a non-US resident register an LLC in the USA?", answer: "Yes, any individual or entity can easily register a US LLC from anywhere in the world without visiting the USA." },
    { question: "Which US state is best for foreign founders?", answer: "Delaware, Wyoming, and New Mexico are highly preferred due to low maintenance fees, excellent corporate privacy, and investor-friendly laws." },
    { question: "What is an EIN and why is it needed?", answer: "An Employer Identification Number (EIN) is a tax ID issued by the IRS, mandatory for opening a US business bank account." },
    { question: "Do I have to pay US taxes if I am a non-resident?", answer: "If your US LLC has no US-sourced income and is not 'Effectively Connected with a US Trade or Business' (ETBUS), you may owe 0% US income tax." }
  ],
  'singapore-company-registration': [
    { question: "Why is Singapore highly preferred for holding companies?", answer: "Singapore offers an elite corporate structure, a flat 17% corporate tax rate, extensive double tax treaties, and 100% foreign ownership." },
    { question: "Do I need a local director to register in Singapore?", answer: "Yes, Singapore law mandates that every company must appoint at least one local resident director (a citizen, PR, or EntrePass holder)." },
    { question: "What is the minimum paid-up capital in Singapore?", answer: "The minimum paid-up capital is just SGD 1, allowing for highly flexible startup funding." },
    { question: "What are the annual compliance requirements in Singapore?", answer: "Every Singapore company must hold an AGM and file an Annual Return with ACRA, and submit tax returns to IRAS annually." }
  ],
  'uk-company-registration': [
    { question: "Can a foreigner incorporate a UK Private Limited Company?", answer: "Yes, anyone can register a UK Ltd company online within 24 hours without any local resident director requirements." },
    { question: "What is Companies House?", answer: "Companies House is the UK's official registrar of companies, responsible for incorporating companies and maintaining corporate filings." },
    { question: "What is the UK corporate tax rate?", answer: "The UK corporate tax rate starts at a flat 19% for small companies with profits up to £50,000, and scales up to 25%." },
    { question: "Do I need a UK bank account for a UK company?", answer: "Yes, to conduct business, you must open a UK business bank account, which can be easily set up online using modern fintech platforms." }
  ],
  'usa-trademark-registration': [
    { question: "Can a foreign brand apply for a US trademark?", answer: "Yes, foreign brands can register trademarks with the USPTO (US Patent and Trademark Office) to secure exclusive rights in the US market." },
    { question: "Is a US trademark search mandatory?", answer: "Yes, conducting a federal trademark search is highly critical to ensure your brand doesn't conflict with existing US registrations." },
    { question: "What is the validity of a US trademark?", answer: "A US trademark is valid for exactly 10 years and can be renewed indefinitely, provided you file a Declaration of Use between years 5 and 6." },
    { question: "Do I need a US attorney to file a US trademark?", answer: "Yes, USPTO rules mandate that all foreign-domiciled trademark applicants must be represented by a licensed US attorney." }
  ]
};

// Also let's prepare default category level FAQs if they don't have enough
const defaultCategoryFaqs = {
  'startup': [
    { question: "Which legal structure is best for my startup?", answer: "Private Limited is generally preferred for startups looking to raise funding, while LLP is better for professional firms." },
    { question: "How long does it take to register a company?", answer: "Usually 7-15 working days depending on document availability and government approvals." },
    { question: "What is a DIN and DSC?", answer: "A Director Identification Number (DIN) is a unique ID for directors, and a Digital Signature Certificate (DSC) is used to sign online incorporation documents." },
    { question: "Is a physical office required to incorporate?", answer: "Yes, you must declare a physical address as your registered office. Utility bills and an NOC from the property owner are required." }
  ],
  'registrations': [
    { question: "Why are B2B business registrations critical?", answer: "Registrations establish your legal presence, protect you from heavy government penalties, and build institutional trust." },
    { question: "What is MSME Udyam Registration?", answer: "It is a government registration for micro, small, and medium enterprises to avail benefits under the MSMED Act." },
    { question: "Do I need a Trade License?", answer: "Yes, if you are operating a commercial business within municipal limits." },
    { question: "How long is a GST registration valid?", answer: "Once granted, GST registration is valid for lifetime unless cancelled or surrendered." }
  ],
  'govt-license': [
    { question: "What are regulatory licenses?", answer: "These are mandatory approvals issued by specific government bodies authorizing you to conduct specialized commercial operations." },
    { question: "Do I need a Fire NOC for an office?", answer: "Yes, if your office is located in a high-rise commercial complex, fire safety clearance is mandatory." },
    { question: "What is the penalty for operating without a license?", answer: "Operating without mandatory licenses can lead to severe fines, closure notices, or criminal prosecution." },
    { question: "How long does it take to get a license?", answer: "Usually between 10 to 45 working days, depending on inspections and department processing speeds." }
  ],
  'food-license': [
    { question: "Who needs an FSSAI License?", answer: "Every food business operator, from manufacturers and packagers to local grocery stores and online sellers, mandatorily requires an FSSAI registration/license." },
    { question: "What is FoSCoS?", answer: "FoSCoS is the official online portal of FSSAI used to apply, renew, modify, and track food licenses in India." },
    { question: "Can a home kitchen run without FSSAI?", answer: "No, even small home-scale food delivery or baking services must obtain a basic FSSAI registration to comply with safety laws." },
    { question: "What is the penalty for FSSAI non-compliance?", answer: "Fines can range from ₹10,000 to ₹10 Lakhs, alongside potential seizure of products and temporary closure." }
  ],
  'gst': [
    { question: "Is GST mandatory for online selling?", answer: "Yes, any business selling products through e-commerce portals (like Amazon or Flipkart) must register for GST irrespective of turnover." },
    { question: "What is Input Tax Credit (ITC)?", answer: "ITC is the tax paid on business purchases that you can deduct from the tax liability on outward sales, preventing double taxation." },
    { question: "How many GST returns must I file annually?", answer: "A regular taxpayer files 2 monthly returns (GSTR-1 and 3B) making 24 returns, plus 1 annual return (GSTR-9), totaling 25 returns." },
    { question: "What is a composition scheme?", answer: "A scheme for small businesses with turnover under ₹1.5 Crore to pay flat rate tax with minimal returns." }
  ],
  'trademark': [
    { question: "Can I use TM symbol after filing?", answer: "Yes, you can use the TM symbol immediately after filing. The ® symbol can only be used after registration is complete." },
    { question: "What is a Trademark Objection?", answer: "It is when the registrar finds issues with your application based on similarity or descriptive nature." },
    { question: "How long is a trademark valid?", answer: "A trademark is valid for 10 years and can be renewed indefinitely every 10 years." },
    { question: "Can a logo design be protected?", answer: "Yes, the unique visual look of a logo can be registered and protected under the Trade Marks Act." }
  ],
  'tax-compliance': [
    { question: "What are corporate ROC compliances?", answer: "ROC compliances are mandatory annual filings (like MGT-7 and AOC-4) that companies must file with the Registrar of Companies." },
    { question: "What is the penalty for delayed annual filings?", answer: "Delaying ROC filings attracts a penalty of ₹100 per day per form, with no maximum ceiling." },
    { question: "Is tax audit mandatory for all businesses?", answer: "Tax audit is mandatory if the annual business turnover exceeds ₹1 Crore (or ₹10 Crores if cash transactions are under 5%)." },
    { question: "What is Advance Tax?", answer: "Tax paid in installments during the financial year instead of a lump sum at the end, mandatory if tax liability exceeds ₹10,000." }
  ],
  'global': [
    { question: "Is it difficult for an Indian citizen to register a company abroad?", answer: "No, countries like the USA, UK, and UAE have highly streamlined, online registration paths for foreign founders." },
    { question: "Do I need to travel abroad to incorporate?", answer: "No, the entire process of global incorporation can be executed 100% remotely from India." },
    { question: "What is double taxation?", answer: "It refers to being taxed on the same income in two different countries. Double Tax Avoidance Agreements (DTAA) mitigate this." },
    { question: "Can a foreign company open an Indian office?", answer: "Yes, foreign companies can open Liaison Offices, Branch Offices, or Project Offices in India with RBI approvals." }
  ]
};

// Fallback FAQs generator if a service has no custom FAQs or needs general ones
function getGeneralFaqsForService(serviceName) {
  return [
    { question: `What is the eligibility for ${serviceName}?`, answer: `Any individual, proprietorship, partnership, or corporate entity engaged in commercial operations is eligible for ${serviceName}.` },
    { question: `What documents are required for ${serviceName}?`, answer: `Standard requirements include business incorporation certificates, promoter PAN, Aadhaar cards, and registered office address proofs.` },
    { question: `What is the penalty for non-compliance with ${serviceName}?`, answer: `Operating without active credentials or delaying statutory filings can attract penalty fees, interest rates, or suspension of trade permits.` },
    { question: `How can Fortune Multi Services assist with ${serviceName}?`, answer: `We provide end-to-end professional support, from file compiling and application filings to regulatory responses and certificate downloads.` }
  ];
}

// Map and enrich the servicesData
servicesData.forEach((category) => {
  // Update category-level FAQs
  if (defaultCategoryFaqs[category.slug]) {
    category.faqs = defaultCategoryFaqs[category.slug];
  }

  // Update service-level FAQs
  category.services.forEach((service) => {
    const slug = service.slug;
    
    // Ensure details object exists
    if (!service.details) {
      service.details = {
        benefits: [],
        documents: [],
        process: [],
        timeline: "7-15 Working Days"
      };
    }

    // Assign 4 comprehensive FAQs
    if (faqDatabase[slug]) {
      service.details.faqs = faqDatabase[slug];
    } else {
      // Check if we can build them from equivalent slugs or fall back
      service.details.faqs = getGeneralFaqsForService(service.name);
    }
  });
});

// Now we generate the new services.ts content beautifully!
const tsHeader = `export interface ServiceItem {
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

export const servicesData: ServiceCategory[] = `;

// Formatting function to output beautiful TS objects rather than plain JSON
function formatTSObject(obj, indent = 0) {
  const spaces = ' '.repeat(indent);
  if (obj === null) return 'null';
  if (obj === undefined) return 'undefined';
  if (typeof obj === 'string') {
    return JSON.stringify(obj); // Will properly escape strings
  }
  if (typeof obj === 'number' || typeof obj === 'boolean') {
    return obj.toString();
  }
  if (Array.isArray(obj)) {
    if (obj.length === 0) return '[]';
    // If it's a simple string array, keep it single line if small
    const isSimple = obj.every(x => typeof x === 'string' && x.length < 50);
    if (isSimple && obj.length <= 4) {
      return `[${obj.map(x => JSON.stringify(x)).join(', ')}]`;
    }
    const arrayItems = obj.map(item => `${spaces}  ${formatTSObject(item, indent + 2)}`).join(',\n');
    return `[\n${arrayItems}\n${spaces}]`;
  }
  if (typeof obj === 'object') {
    const keys = Object.keys(obj);
    if (keys.length === 0) return '{}';
    const objectBody = keys.map(key => {
      // Check if key is a valid JS identifier
      const formattedKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `"${key}"`;
      return `${spaces}  ${formattedKey}: ${formatTSObject(obj[key], indent + 2)}`;
    }).join(',\n');
    return `{\n${objectBody}\n${spaces}}`;
  }
  return '';
}

const finalTSCode = tsHeader + formatTSObject(servicesData, 0) + ';\n';

// Write back to src/data/services.ts
fs.writeFileSync(path.join(__dirname, '../src/data/services.ts'), finalTSCode, 'utf8');

console.log("Successfully enriched services.ts database with 4 robust B2B FAQs for all services!");
