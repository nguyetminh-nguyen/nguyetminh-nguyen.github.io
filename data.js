/* =============================================================
   DATA.JS - ALL WEBSITE CONTENT LIVES HERE
   -------------------------------------------------------------
   This is the only file you need to edit.
   Rule: edit the text between the "quotes". Keep the commas
   at the end of each line and the file will keep working.
   ============================================================= */

const siteData = {

  /* ---------------------------------------------------------
     1. BASIC PROFILE
     --------------------------------------------------------- */
  profile: {
    name: "Nguyen Nguyet Minh",
    initials: "NM",                      // shown in the logo, top left
    role: "Master's Student in Finance at Erasmus University Rotterdam", // small line above your name
    headline: "",                        // leave "" to hide the line under your name
    intro: "I work across financial analysis and commercial decision-making - understanding performance, identifying the drivers behind revenue, margins and costs, and translating quantitative insights into clear recommendations for the business.",
    location: "",                        // leave "" to hide
    email: "nguyennguyetminh18012004@gmail.com",   // used by the Contact section only
    phone: "",                           // leave "" to hide
    photo: "",                           // e.g. "assets/photo.jpg" - leave "" to show initials instead
    cvFile: "assets/Minh-Nguyen-CV.pdf", // temporary CV download file
    availability: "Open to analyst roles & internships - 2026",
  },

  /* ---------------------------------------------------------
     2. SOCIAL LINKS  (delete any line you don't use)
     --------------------------------------------------------- */
  socials: [
    { label: "LinkedIn", url: "https://linkedin.com/in/your-handle" },
    { label: "GitHub",   url: "https://github.com/your-handle" },
    { label: "Email",    url: "mailto:nguyennguyetminh18012004@gmail.com" },
  ],

  /* ---------------------------------------------------------
     3. TURN SECTIONS ON / OFF
     Set enabled to false and the section disappears from the
     page and the menu. Change "label" to rename the menu item.
     --------------------------------------------------------- */
  sections: {
    about:      { enabled: false, label: "About" },      // off - the hero lines say enough
    projects:   { enabled: true,  label: "Projects",
                  intro: "Financial models and analytics dashboards, each built end to end from raw data to the decision it supports. Click any card for the full case study.",
                  // The filter buttons, in order. To add a project to one of
                  // these, give it the same wording in its "category" field.
                  filters: ["All", "Accounting", "Financial Analysis", "Dashboard", "Machine Learning"],
                  // true = hide buttons that have no projects behind them yet
                  hideEmptyFilters: false,
                  emptyText: "No projects in this category yet." },
    skills:     { enabled: false, label: "Skills" },     // off - covered in the CV
    experience: { enabled: false, label: "Experience" }, // off - covered in the CV
    research:   { enabled: false, label: "Research" },   // switch on when you need it
    writing:    { enabled: false, label: "Writing" },    // switch on when you need it
    contact:    { enabled: true,  label: "Contact" },
  },

  /* ---------------------------------------------------------
     4. ABOUT - currently switched off in section 3.
     The two lines under your name in the hero (headline + intro
     in section 1) do this job instead. Set about.enabled to true
     if you ever want a longer version back.
     --------------------------------------------------------- */
  about: {
    heading: "About",
    paragraphs: [
      "",
    ],
    highlights: [],
  },

  /* ---------------------------------------------------------
     5. PROJECTS  ⭐ THE MOST IMPORTANT SECTION
     Each project is one { ... } block. Copy a whole block and
     edit it to add a new project.
     - id      : lowercase, no spaces (used in the page link)
     - featured: true shows a "Featured" badge
     - cover   : "assets/your-image.png", or "" for an auto background
     - detail  : the case-study page shown when the card is clicked

     LIVE DASHBOARD (detail.embed)
     Put a Publish-to-web link in detail.embed.url and the case-study page
     shows the real, clickable report at the top - filters, slicers, page
     tabs and all - instead of a screenshot. The card also switches its
     label to "View live dashboard" and gets a green "Live" flag.

       embed: {
         url:     "https://app.powerbi.com/view?r=PASTE_YOUR_LINK",
         heading: "Dashboard preview",                    // optional
         note:    "Use the arrows at the bottom ...",      // optional
         ratio:   "16 / 9",                                // optional
       }

     Where the link comes from (Power BI Desktop -> Service):
       1. Publish the .pbix to the Power BI Service (app.powerbi.com).
       2. Open the report there -> File -> Embed report -> Publish to web
          (public).
       3. Copy the "link you can send in email" - it looks like
          https://app.powerbi.com/view?r=eyJrIjoi...
       4. Paste it as url below. That is all; do not paste the whole
          <iframe> tag, only the URL inside it.
     Note: Publish to web makes the report public to anyone with the link,
     and it needs a work/school account with the feature enabled. Leave url
     as "" and the page falls back to the cover image as a static preview.
     --------------------------------------------------------- */
  projects: [

    /* ===== 1. FINANCIAL ANALYSIS - EXCEL ===== */
    {
      id: "saas-fpa-model",
      title: "Financial Planning & Analysis Model",
      category: "Financial Analysis",
      period: "2026",
      featured: true,
      summary: "A 26-sheet Excel planning model where every P&L line traces back to an operating driver. It shows a quarter in which revenue beat budget by EUR 1.6m and EBITDA still missed by EUR 1.6m - and names the cost lines that absorbed the difference.",
      tags: ["Excel", "Driver-based modelling", "Rolling forecast", "Variance bridge", "Scenario analysis", "Multi-currency"],
      cover: "assets/fpa-model.png",
      links: [
        { label: "Download the model (.xlsx)", url: "assets/files/FPA-Model.xlsx" },
      ],
      detail: {
        role: "Solo project. I built the synthetic dataset, the driver logic, the reporting layer, and the validation suite.",
        // Excel Online embed: OneDrive/SharePoint -> open the file -> File ->
        // Share -> Embed -> copy only the src="..." URL from the iframe code.
        embed: {
          url: "",
          heading: "Model preview",
          note: "The live workbook: switch sheets with the tabs at the bottom of the frame.",
          ratio: "600 / 373.5",
          fallbackNote: "Static preview of the P&L sheet - download the workbook below to open the working model.",
        },
        // A SECOND live report on this page. The FP&A dashboard is built on
        // this same model, so it is shown here too. Same fields as embed above.
        extraEmbed: {
          url: "https://app.powerbi.com/view?r=eyJrIjoiMDM4ZDM1ZjItMzVmYS00NzExLWI1OTgtOGJkZTM0ZDZkZjE0IiwidCI6ImMwZTEzYmVjLTA0MjUtNGJjMy04ODY1LTEwMGI5NmVjOTI3NCJ9",
          pageName: "",
          title: "FP&A Dashboard",
          heading: "The dashboard built on this model",
          note: "The same numbers read through Power BI. Click the slicers to filter, and use the arrows at the bottom of the frame to move between the three pages.",
          ratio: "600 / 373.5",
        },
        context: "A software company selling across four European regions wants to know how the year is actually going, and what the rest of it will look like. This Excel model answers both. Every line of the profit and loss is calculated from something you can point at in the business - how many customers, how many seats, what price, how many staff - so when a number moves, you can see exactly what moved it. Budget, latest forecast and real results all sit side by side, together with a best case and a worst case.",
        results: [
          "In the first quarter of 2026, revenue beat budget by EUR 1.6m - and profit still missed by EUR 1.6m. The entire gain was absorbed by overspending on payroll (EUR 1.8m) and other operating costs (EUR 0.9m).",
          "Margins were close to plan (85.7% against 87.2%), which shows the problem is cost control, not pricing or delivery.",
          "The updated forecast cuts full-year 2026 revenue from EUR 71.5m to EUR 65.7m, and in the downside scenario losses widen by a further EUR 3.5m.",
        ],
        stack: ["Excel", "Driver-based P&L modelling", "Star schema (6 dimensions + fact table)", "Rolling forecast versioning", "EBITDA bridge", "FX translation (EUR / GBP / SEK)", "Scenario engine", "Data-quality validation suite"],
      },
    },

    /* ===== 2. DASHBOARD - FP&A ===== */
    {
      id: "fpa-dashboard",
      title: "FP&A Performance Dashboard",
      category: "Dashboard",
      period: "2026",
      featured: true,
      summary: "A three-page Power BI report built on the FP&A model. 149 DAX measures take a reader from the headline EBITDA gap, through the driver that caused it, to the action and the person who owns it.",
      tags: ["Power BI", "DAX", "Waterfall bridge", "Scenario analysis", "Executive reporting"],
      cover: "assets/fpa-dashboard.png",
      links: [
        { label: "Download the report (.pbix)", url: "assets/files/FPA-Dashboard.pbix" },
      ],
      detail: {
        role: "Solo project. Data model, DAX, page design and interaction logic.",
        // Power BI "Publish to web" link. The ratio is the width/height pair
        // Microsoft gives in the embed code (600 x 373.5), so the report and
        // its page bar are never cut off.
        embed: {
          url: "https://app.powerbi.com/view?r=eyJrIjoiMDM4ZDM1ZjItMzVmYS00NzExLWI1OTgtOGJkZTM0ZDZkZjE0IiwidCI6ImMwZTEzYmVjLTA0MjUtNGJjMy04ODY1LTEwMGI5NmVjOTI3NCJ9",
          // See the note on pageName in the Procurement project below.
          pageName: "",
          title: "FP&A Dashboard",
          heading: "Dashboard preview",
          note: "Live report - click the slicers to filter, and use the arrows at the bottom of the frame to move between the three pages.",
          ratio: "600 / 373.5",
          fallbackNote: "Static preview - download the .pbix below to open the working report.",
        },
        context: "The Excel model above has the answers, but you need to know where to look. This turns the same data into a Power BI report for someone with two minutes: page one gives the headline, page two explains why the numbers moved, page three shows what happens if the year goes better or worse than planned. Chart titles rewrite themselves based on what you filter, so even a screenshot of a page still explains itself.",
        results: [
          "The March 2026 story reads in a single screen: revenue ahead of plan, profit behind it, payroll the reason.",
          "A waterfall chart breaks the profit gap down cost line by cost line, turning a 17-line P&L into a short list of items worth a conversation - each one tagged with an action and an owner.",
          "The scenario page reports the full-year revenue outlook as a range (EUR 62.0m to EUR 70.5m) rather than one number, ranked by which driver moves it most.",
        ],
        stack: ["Power BI", "DAX (149 measures)", "Star schema (21 tables)", "Waterfall / bridge visual", "Dynamic titles and conditional formatting", "Scenario and tornado analysis"],
      },
    },

    /* ===== 3. DASHBOARD - CUSTOMER PROFITABILITY ===== */
    {
      id: "customer-profitability",
      title: "Customer Profitability Dashboard",
      category: "Dashboard",
      period: "2026",
      featured: false,
      summary: "A Power BI report on 420 SaaS customers, 26,110 revenue lines and 19,593 support tickets. The top fifth of customers produce 88.6% of gross profit, and a quarter of the book never repays its own acquisition cost.",
      tags: ["Power BI", "DAX", "Unit economics", "CAC payback", "Cohort analysis", "Cost to serve"],
      cover: "assets/customer-profitability.png",
      links: [
        { label: "Download the report (.pbix)", url: "assets/files/Customer-Profitability.pbix" },
      ],
      detail: {
        role: "Solo project. Data model, DAX, and both report pages.",
        // Power BI "Publish to web" link.
        embed: {
          url: "https://app.powerbi.com/view?r=eyJrIjoiZDI2NmEwZWEtYWMzNC00MTIxLWI5ZjQtMTg2NTk3MGFiYjgwIiwidCI6ImMwZTEzYmVjLTA0MjUtNGJjMy04ODY1LTEwMGI5NmVjOTI3NCJ9",
          // See the note on pageName in the Procurement project below.
          pageName: "",
          title: "Customer Profitability",
          heading: "Dashboard preview",
          note: "Live report - use the arrows at the bottom of the frame to move between the two pages.",
          ratio: "600 / 373.5",
          fallbackNote: "Static preview - download the .pbix below to open the working report.",
        },
        context: "A software company with 420 business customers wants to know which of them actually make money - once you subtract what it costs to serve them and what it cost to win them in the first place. I combined three years of revenue, support tickets and sales-and-marketing spend into one Power BI report that ranks every customer by real profit instead of by revenue.",
        results: [
          "The top 20% of customers produce 88.6% of all gross profit, so the company's healthy-looking 73% average margin describes almost none of its customer base.",
          "103 customers (24.5%) lose money once acquisition cost is counted, and they cluster in one place: 37.1% of small-business accounts fail this test, against 4.1% of enterprise accounts.",
          "Paid Search is the worst acquisition channel on both counts - $5 of profit per $1 spent and 52% of those customers leave, against $31 and 17.5% for referrals - yet it brings in the second-largest number of customers.",
        ],
        stack: ["Power BI", "DAX (86 measures)", "Star schema (9 tables)", "Cohort and as-of-date logic", "Profit bridge", "Peer benchmarking"],
      },
    },

    /* ===== 4. DASHBOARD - PROCUREMENT ===== */
    {
      id: "procurement-analytics",
      title: "Procurement Analysis Dashboard",
      category: "Dashboard",
      period: "2026",
      featured: false,
      summary: "A four-page Power BI report over 5,203 purchase-order lines and 79 suppliers. Savings delivery reads at 92% of target, but a quarter of spend runs outside contract and 16% sits with single-source suppliers.",
      tags: ["Power BI", "DAX", "Procurement analytics", "Maverick spend", "Supplier risk", "Price variance"],
      cover: "assets/procurement-analytics.png",
      links: [
        { label: "Download the report (.pbix)", url: "assets/files/NordVale-Procurement-Analytics.pbix" },
      ],
      detail: {
        role: "Solo project. Data model, DAX, and all four report pages.",
        // Power BI "Publish to web" link.
        embed: {
          url: "https://app.powerbi.com/view?r=eyJrIjoiYjcyZTdhYjAtOGM2Ny00YjA4LThlMTEtOTBjYmRiZDk0NzJmIiwidCI6ImMwZTEzYmVjLTA0MjUtNGJjMy04ODY1LTEwMGI5NmVjOTI3NCJ9",
          // ⬇ Which page the report opens on. Leave "" and Power BI picks
          // whichever page was active when the .pbix was last saved.
          // To fill it: open the report on app.powerbi.com, click page 1, and
          // copy the LAST part of the address bar (after the report id).
          pageName: "",
          title: "Procurement Dashboard",
          heading: "Dashboard preview",
          note: "Live report - use the arrows at the bottom of the frame to move between the four pages.",
          ratio: "600 / 373.5",
          fallbackNote: "Static preview - download the .pbix below to open the working report.",
        },
        context: "A food manufacturer spends EUR 329m buying raw materials, packaging and services. Its procurement team reports how much it saved; this report checks whether that saving actually reaches the business. It covers three years of purchase orders across 79 suppliers and 27 categories, and puts savings, contract compliance and supplier risk on the same screen.",
        results: [
          "Procurement delivered 92% of its savings target (EUR 10.3m of EUR 11.2m) - the number that normally gets reported upward.",
          "But a quarter of all spend, EUR 85.4m, is bought outside any contract, including EUR 20.7m of emergency purchases, which quietly gives back much of that saving.",
          "16.4% of spend sits with suppliers that have no alternative source - an exposure the supplier scorecards (91% on-time delivery, 0.19% defects) look far too healthy to reveal.",
        ],
        stack: ["Power BI", "DAX (95 measures)", "Star schema (13 tables)", "Price variance bridge", "Supplier risk scoring", "Contract compliance analysis"],
      },
    },

    /* ===== 5. ACCOUNTING - MONTH-END CLOSE ===== */
    {
      id: "accounting-close-model",
      title: "Accounting Close & Financial Statement Model",
      category: "Accounting",
      period: "FY2025 · WIP",
      featured: false,
      summary: "A simulated IFRS accounting close for a Dutch consumer-goods business. It brings month-end journals, a post-close trial balance, P&L and balance sheet together, with the live table below allowing a reader to explore the model output.",
      tags: ["Excel", "Month-end close", "General ledger", "Trial balance", "Financial statements", "IFRS"],
      cover: "",
      links: [
        { label: "Download the model (.xlsx)", url: "assets/files/Accounting-Close-Model-WIP.xlsx" },
      ],
      detail: {
        role: "Solo project, in progress. I built the close-journal layer and transformed the post-close trial balance into financial-statement outputs.",
        context: "Steepwell B.V. is a simulated Rotterdam-based consumer-goods business with seasonal inventory demand, marketplace settlements, leases and a revolving-credit facility. This model follows the trail from month-end adjustments to a post-close trial balance, then into the P&L and balance sheet. It is deliberately presented as work in progress: the purpose is to show the accounting logic and the audit trail, not to present an audited set of accounts.",
        results: [
          "The close layer contains 240 journal lines across four recurring areas: depreciation, inventory write-offs, holiday-pay accruals and lease interest.",
          "The FY2025 P&L output shows EUR 14.4m of gross product revenue and EUR 1.0m of cumulative P&L result in the current WIP version. Use the interactive table to inspect the monthly movement and underlying line items.",
          "The post-close balance sheet brings cash, inventory, receivables, debt, lease balances and accrued liabilities into one reconciled presentation layer for further review.",
        ],
        analysis: {
          heading: "Explore the accounting model",
          note: "Numbers below are taken from the current WIP model. Choose an output, switch the period where available, search line items, or click a column heading to sort. All amounts are EUR.",
          periods: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "FY2025"],
          pnlRows: [
            { line: "Gross product revenue", amounts: [882005.39, 802995.71, 997613.31, 1037861.90, 1132319.80, 1050961.56, 987929.30, 1062326.06, 1300212.19, 1481389.60, 1962916.25, 1699780.89, 14398311.96] },
            { line: "Returns and refunds", amounts: [-56797.48, -54290.68, -65549.33, -68310.93, -72636.16, -73776.47, -67091.75, -68079.89, -76396.97, -99389.62, -121081.99, -106473.05, -929874.32] },
            { line: "Discounts and promotions", amounts: [-38092.54, -30227.79, -38819.64, -40300.78, -45660.72, -41583.41, -43403.46, -39532.86, -45405.58, -55782.46, -77819.16, -74008.03, -570636.43] },
            { line: "Cost of goods sold", amounts: [-347181.94, -319481.48, -397173.61, -411649.00, -444574.52, -410417.49, -387036.68, -429687.22, -530712.64, -588000.68, -761009.28, -646779.15, -5673703.69] },
            { line: "Fulfilment and logistics", amounts: [-103365.74, -72363.70, -81326.69, -84311.83, -99211.21, -82220.24, -83327.75, -92219.26, -106039.54, -121838.83, -144894.15, -126278.97, -1197397.91] },
            { line: "Payment and marketplace fees", amounts: [-50889.37, -46566.42, -57715.56, -59175.36, -66149.22, -62740.50, -58981.46, -60928.04, -73270.96, -85245.17, -118483.68, -103560.63, -843706.37] },
            { line: "Marketing", amounts: [-127336.51, -88299.86, -106883.67, -116356.11, -117225.85, -115997.63, -114895.24, -113842.55, -136503.02, -147958.07, -199987.12, -171653.76, -1556939.39] },
            { line: "Personnel expenses", amounts: [-128518.08, -134388.56, -132154.18, -139867.37, -135939.60, -139173.57, -139636.89, -141497.73, -150505.76, -151513.98, -148760.26, -151244.99, -1693200.97] },
            { line: "Technology", amounts: [-14032.44, -14145.25, -13438.71, -12905.09, -13567.95, -14356.64, -14618.52, -13947.75, -14149.74, -14374.21, -15125.88, -15294.72, -169956.90] },
            { line: "General and administrative", amounts: [-33843.11, -21598.16, -20557.61, -27418.60, -22325.87, -21491.26, -27110.57, -21870.02, -20489.96, -26893.20, -27499.59, -15424.06, -286522.01] },
            { line: "Depreciation and amortisation", amounts: [-17394.06, -17394.06, -20060.73, -21116.29, -22349.62, -22349.62, -23087.72, -23087.72, -24698.83, -25073.83, -25073.83, -25073.83, -266760.14] },
            { line: "Finance costs", amounts: [-9816.67, -13253.55, -13069.23, -12884.58, -12699.58, -13666.30, -13480.60, -14446.63, -14260.21, -16706.76, -16519.63, -16332.13, -167135.87] },
            { line: "Finance income", amounts: [262.50, 262.96, 263.42, 263.88, 264.34, 264.80, 265.27, 265.73, 266.20, 266.66, 267.13, 267.60, 3180.49] },
            { line: "Foreign exchange result", amounts: [0, 0, 0, 2517.16, 4485.45, -1463.60, -9234.79, -3882.92, 2083.01, 13360.63, 989.83, -13070.31, -4215.54] },
            { line: "P&L result", total: true, amounts: [-45000.05, -8750.84, 51127.77, 46347.00, 84729.29, 51989.63, 6289.14, 39569.20, 110128.19, 162240.08, 307918.64, 234854.86, 1041442.91] },
          ],
          balanceSheetRows: [
            { line: "Cash and cash equivalents", amount: 725777.65 },
            { line: "Trade and other receivables", amount: 535898.11 },
            { line: "Inventories", amount: 1721377.72 },
            { line: "Prepayments and other current assets", amount: 651150.04 },
            { line: "Property, plant and equipment", amount: 1654263.97 },
            { line: "Intangible assets", amount: 406000.00 },
            { line: "Right-of-use assets", amount: 1273999.94 },
            { line: "Other non-current assets", amount: 48000.00 },
            { line: "Trade and other payables", amount: 1237890.52 },
            { line: "Accrued liabilities", amount: 60000.00 },
            { line: "Employee benefit liabilities", amount: 162471.41 },
            { line: "Tax liabilities", amount: 293289.56 },
            { line: "Contract liabilities", amount: 135417.28 },
            { line: "Current lease liabilities", amount: 6931.70 },
            { line: "Non-current borrowings", amount: 720000.00 },
            { line: "Non-current lease liabilities", amount: 510000.00 },
            { line: "Share capital", amount: 100000.00 },
            { line: "Share premium", amount: 640000.00 },
            { line: "Retained earnings", amount: -109503.77 },
          ],
          adjustmentRows: [
            { line: "Depreciation", amount: 266760.14 },
            { line: "Inventory write-off", amount: 72358.98 },
            { line: "Holiday-pay accrual", amount: 89964.79 },
            { line: "Lease interest", amount: 167135.87 },
          ],
        },
      },
    },

    {
      id: "reviews-box-office",
      title: "Movie Review Sentiment Analysis",
      category: "Machine Learning",
      period: "2024",
      featured: true,
      hideFromAll: true,                 // an khoi tab All, chi hien khi bam nut loc Machine Learning
      summary: "Classified 10,000 movie reviews by topic and sentiment, then tested whether either predicts opening-week revenue. Sentiment does not. Volume does - roughly $44,000 of box office per additional review.",
      tags: ["Naive Bayes", "LDA", "Word2Vec", "OLS", "Text mining"],
      cover: "",
      links: [],
      detail: {
        role: "Solo project.",
        context: "Do good reviews sell cinema tickets, or does it simply matter that people are talking about a film at all? I took 10,000 reviews of 17 films, used machine learning to sort them by what they discussed and by whether they were positive or negative, then tested which of those predicts opening-week box office. To keep the test honest, I used only reviews posted before the film opened.",
        results: [
          "How positive the reviews were had no statistically significant effect on box office in any version of the test.",
          "How many reviews there were did: each additional review was worth roughly $44,000 of opening-week revenue.",
          "So attention sells tickets and approval does not - though the topic classifier was only 52.5% accurate, which is why the topic results are reported as suggestive rather than settled.",
        ],
        stack: ["R", "Naive Bayes classifier", "LDA topic modelling", "Word2Vec embeddings", "OLS with controls"],
      },
    },

    {
      id: "bandit-click-through",
      title: "Recommendation Algorithm Comparison",
      category: "Machine Learning",
      period: "2024",
      featured: true,
      hideFromAll: true,                 // an khoi tab All, chi hien khi bam nut loc Machine Learning
      summary: "Ran Thompson Sampling over 130,000 rounds of e-commerce impression data to learn which items and slots earn clicks, then benchmarked it against UCB and epsilon-greedy under varying batch sizes, priors, and user segments.",
      tags: ["Thompson Sampling", "Multi-armed bandits", "UCB", "A/B testing", "R"],
      cover: "",
      links: [],
      detail: {
        role: "Group project, four students.",
        context: "When a shop's website decides which product to show you, it faces a trade-off: show the item it currently believes is best, or show something else to find out whether that might be better. I tested the three standard algorithms for this problem on 130,000 rounds of real e-commerce data, and checked how much the answer depends on the algorithm itself versus the conditions it runs under.",
        results: [
          "No algorithm won outright - the best performer flipped depending on how long it ran and what it assumed at the start.",
          "Update frequency mattered far more than algorithm choice: performance collapsed by roughly 30x when updates were applied in batches of 50 instead of immediately.",
          "Four customer groups barely shared a single item in their top three, so one global recommendation policy leaves measurable value unclaimed.",
        ],
        stack: ["R (contextual package)", "Thompson Sampling", "Upper Confidence Bound", "Epsilon-greedy", "Beta-Bernoulli priors"],
      },
    },

  ],

  /* ---------------------------------------------------------
     6. SKILLS - grouped competencies
     --------------------------------------------------------- */
  skills: {
    heading: "Skills & Tools",
    groups: [
      { name: "Programming & Analysis", items: ["Python (pandas, NumPy, scikit-learn, statsmodels)", "SQL", "R", "Stata"] },
      { name: "Finance",                items: ["Financial modelling", "Valuation (DCF, comps)", "Credit risk", "Portfolio analytics"] },
      { name: "Data & Visualisation",   items: ["Power BI", "Tableau", "Excel (advanced)", "Matplotlib / ggplot2"] },
      { name: "Methods",                items: ["Econometrics", "Causal inference", "A/B testing", "Time series"] },
      { name: "Languages",              items: ["Vietnamese (native)", "English (professional)"] },
    ],
  },

  /* ---------------------------------------------------------
     7. EXPERIENCE & EDUCATION - timeline
     type: "work" or "education"
     --------------------------------------------------------- */
  experience: {
    heading: "Experience & Education",
    items: [
      {
        type: "work",
        role: "Data Analyst Intern",
        org: "Company Name",
        period: "2025 - 2026",
        location: "Hanoi",
        points: [
          "Automated a recurring reporting process, cutting preparation time from 6 hours to under 20 minutes per cycle.",
          "Built SQL models feeding three dashboards used by the commercial team.",
        ],
      },
      {
        type: "work",
        role: "Research Assistant",
        org: "University / Research Centre",
        period: "2024 - 2025",
        location: "Hanoi",
        points: [
          "Assembled and cleaned firm-level panel datasets for applied econometrics projects.",
          "Replicated published results and ran robustness checks for a working paper.",
        ],
      },
      {
        type: "education",
        role: "BSc in Economics",
        org: "University Name",
        period: "2022 - 2026",
        location: "Hanoi",
        points: [
          "Thesis: productivity spillovers from FDI, using an instrumental-variable design.",
          "Coursework: econometrics, corporate finance, financial markets, statistical computing.",
        ],
      },
    ],
  },

  /* ---------------------------------------------------------
     8. RESEARCH  (only shows when sections.research.enabled = true)
     --------------------------------------------------------- */
  research: {
    heading: "Research",
    intro: "Working papers and academic work in progress.",
    items: [
      {
        title: "Foreign Direct Investment and Domestic Firm Productivity: Evidence from a Shift-Share Design",
        status: "Undergraduate thesis, 2026",
        abstract: "Estimates horizontal and vertical productivity spillovers from FDI using a shift-share instrument, and shows that vertical effects dominate while horizontal effects are statistically indistinguishable from zero.",
        links: [
          // { label: "Draft (PDF)", url: "assets/thesis-draft.pdf" },
        ],
      },
    ],
  },

  /* ---------------------------------------------------------
     9. WRITING  (only shows when sections.writing.enabled = true)
     --------------------------------------------------------- */
  writing: {
    heading: "Writing",
    intro: "Short analytical notes on data, markets, and method.",
    items: [
      {
        title: "Why your churn number is probably two problems",
        date: "March 2026",
        excerpt: "Aggregate metrics hide compositional shifts. A short note on splitting voluntary from involuntary churn before drawing any conclusions.",
        url: "#",
      },
    ],
  },

  /* ---------------------------------------------------------
     10. CONTACT
     --------------------------------------------------------- */
  contact: {
    heading: "Get in touch",
    text: "I am open to analyst roles, research collaborations, and freelance analytics work. The fastest way to reach me is email - I reply within a day or two.",
    ctaLabel: "Send an email",
  },

  /* ---------------------------------------------------------
     11. FOOTER
     --------------------------------------------------------- */
  footer: {
    note: "Designed and built by Nguyen Nguyet Minh.",
  },

};
