// ─────────────────────────────────────────────────────────────
//  Saare links aapke GitHub se liye gaye hain (14 Sept 2026).
//  Aapke paas 5 repositories hain jin ke andar folders hain,
//  isliye har link seedha us project ke folder par jata hai.
// ─────────────────────────────────────────────────────────────

const FS = "https://github.com/NOUREENSIRAJ/Full-Stack-Projects/tree/main"
const FE = "https://github.com/NOUREENSIRAJ/Front-End-Projects/tree/main"
const PY = "https://github.com/NOUREENSIRAJ/Python-Projects/tree/main"
const ML = "https://github.com/NOUREENSIRAJ/AI-ML-Projects/tree/main"
const PAGES = "https://noureensiraj.github.io/Front-End-Projects"

export const profile = {
  name: "Noureen Siraj",
  role: "Web Developer",
  location: "Karachi, Pakistan",
  status: "Open to work",
  tagline: "I build web applications end to end, covering the interface, the server logic, and the data layer beneath it.",
  intro:
    "Computer Science graduate from DHA Suffa University, Karachi. I work across React and " +
    "Node.js, Python and Flask, and both relational and document databases, including secured " +
    "admin panels and dashboards for managing real data.",
  intro2:
    "Projects taken independently through full development and testing cycles: booking and " +
    "reservation systems, e-commerce and productivity tools, an architecture portfolio platform, " +
    "and applied machine learning.",
}

export const disciplines = ["Full-stack", "Front-end", "Python", "Machine learning", "QA"]

export const contact = {
  email: "noureensiraj30@gmail.com",
  phone: "+92 335 2114383",
  github: "https://github.com/NOUREENSIRAJ",
  cv: "/Noureen-Siraj-CV.pdf",
}


function slug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[()&]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export type CaseStudy = {
  image: string
  image2?: string
  problem: string
  approach: string
}

export type Project = {
  name: string
  kind: string
  blurb: string
  points?: string[]
  stack: string[]
  live: string
  
  extraLabel?: string
  extra?: string
  github: string
  caseStudy?: CaseStudy
}

export type Category = {
  id: string
  title: string
  lead: string
  projects: Project[]
}

function caseStudy(name: string, problem: string, approach: string, hasSecondImage = false): CaseStudy {
  const base = slug(name)
  return {
    image: `/case-studies/${base}.png`,
    image2: hasSecondImage ? `/case-studies/${base}-2.png` : undefined,
    problem,
    approach,
  }
}

export const categories: Category[] = [
  {
    id: "fullstack",
    title: "Full-stack",
    lead: "Applications where I designed the database, wrote the server logic, and built the interface on top of it.",
    projects: [
      {
        name: "ArchStudio",
        kind: "Architecture portfolio platform",
        blurb:
          "A public-facing portfolio site for an architecture studio, with a secured admin panel for managing projects, image galleries, and client inquiries.",
        points: [
          "JWT authentication protecting admin routes, with dashboard controls for creating, editing, and categorising residential, commercial, interior, and landscape work.",
          "Interactive 3D and motion built with Three.js, React Three Fiber, GSAP, and Framer Motion.",
          "MongoDB schema designed with Mongoose; REST endpoints for projects, contact submissions, auth, and Multer image uploads.",
        ],
        stack: ["React", "Vite", "Tailwind", "Node.js", "Express", "MongoDB", "JWT", "Three.js"],
        live: "https://archstudio-frontend.vercel.app",
        extraLabel: "Admin panel",
        extra: "https://archstudio-frontend.vercel.app/admin/login",
        github: `${FS}/archstudio`,
      },
      {
        name: "Luna & Spice",
        kind: "Restaurant table reservations",
        blurb:
          "A reservation system that tracks capacity per seating area per sitting, so bookings stop once that area's covers are full for the requested time.",
        points: [
          "Three seating areas with distinct capacities and party-size limits, plus an availability view showing covers remaining across every lunch and dinner sitting.",
          "Capacity re-checked at submission time, so two guests cannot claim the same covers after the page was first loaded.",
          "Unique per-day booking references, an admin booking list, and a cancellation flow that releases covers back immediately.",
        ],
        stack: ["Python", "Flask", "SQLite", "Jinja2"],
        live: "https://noureens.pythonanywhere.com/",
        github: `${FS}/Luna%20%26%20Spice`,
      },
      {
        name: "Gloss",
        kind: "Salon chair booking system",
        blurb:
          "Duration-aware scheduling: each treatment consumes only the half-hour slots it actually needs, so a three-hour service blocks that stylist's chair for three hours and nothing double-books.",
        points: [
          "An availability engine calculating open start times per stylist, per day, per treatment length, hiding slots that would run past closing.",
          "Server-side validation, flash messaging, cancellation flow, and per-month booking references.",
        ],
        stack: ["Python", "Flask", "SQLite", "Jinja2"],
        live: "",
        github: `${FS}/gloss-salon-booking`,
        caseStudy: caseStudy(
          "Gloss",
          "A salon can't book appointments the way a restaurant books tables: a fifteen-minute trim and a three-hour balayage occupy a stylist's chair completely differently, so fixed time slots either waste chair time or double-book it.",
          "Built with Flask and SQLite, with an availability engine that calculates open start times per stylist, per day, per treatment length, and automatically hides any slot that would run past closing. The layout follows a classic server-rendered MVC structure, with Jinja2 templates for the booking grid and admin views, routes handling validation and flash messaging, and a per-month reference-number generator, so the booking grid always reflects real, honest availability and no two clients can ever land in the same chair at the same time.",
          true,
        ),
      },
      {
        name: "WellCrest",
        kind: "Outpatient appointment system",
        blurb:
          "OPD booking across five departments, with morning and evening clinic sessions on a twenty-minute slot grid and live counts of remaining slots per doctor.",
        points: [
          "One-appointment-per-slot enforced at the database level with a composite unique constraint, with the integrity error handled in the booking route so racing patients never double-book.",
          "Per-doctor, per-day appointment tokens such as CARD-0831-01, and a cancellation flow that returns the slot to the schedule.",
        ],
        stack: ["Python", "Flask", "SQLite", "Jinja2"],
        live: "",
        github: `${FS}/WellCrest`,
        caseStudy: caseStudy(
          "WellCrest",
          "Hospital outpatient scheduling has a hard requirement most side projects skip: two patients must never be handed the same slot, even if they submit within the same second.",
          "Built with Flask, Jinja2, and SQLite, with the guarantee enforced at the database level via a composite unique constraint across doctor, day, and slot, so the database itself rejects a collision rather than relying on application logic to catch it in time. Five departments run their own morning and evening sessions on a twenty-minute grid, with live remaining-slot counts per doctor computed on each page load, and a clean per-day token like CARD-0831-01 generated for every confirmed booking.",
          true,
        ),
      },
    ],
  },
  {
    id: "frontend",
    title: "Front-end",
    lead: "All seven are live, so open any of them and click around.",
    projects: [
      {
        name: "DevHire",
        kind: "Developer job board",
        blurb:
          "Job listings with live search, filters by type, experience, and location, and an apply-now modal.",
        stack: ["JavaScript", "HTML", "CSS"],
        live: `${PAGES}/devhire`,
        github: `${FE}/devhire`,
      },
      {
        name: "ShopCart",
        kind: "E-commerce store",
        blurb:
          "Product catalog with category browsing, add and remove cart items, quantity control, and a live cart total through checkout.",
        stack: ["JavaScript", "HTML", "CSS"],
        live: `${PAGES}/shopcart`,
        github: `${FE}/shopcart`,
      },
      {
        name: "TaskFlow",
        kind: "Team task manager",
        blurb:
          "A Kanban board with drag-and-drop cards across columns, an add-task modal, priority tags, and due dates.",
        stack: ["JavaScript", "HTML", "CSS"],
        live: `${PAGES}/taskflow`,
        github: `${FE}/taskflow`,
      },
      {
        name: "Gloss (static build)",
        kind: "Same system, no backend",
        blurb:
          "The Gloss booking system rebuilt with no dependencies and no server: the same duration-aware scheduling logic recreated entirely in JavaScript, using browser storage in place of a database.",
        stack: ["JavaScript", "HTML", "CSS"],
        live: `${PAGES}/gloss-salon-static`,
        github: `${FE}/gloss-salon-static`,
      },
      {
        name: "MediBook",
        kind: "Doctor appointment system",
        blurb: "A healthcare booking interface for scheduling appointments with doctors.",
        stack: ["JavaScript", "HTML", "CSS"],
        live: `${PAGES}/medibook`,
        github: `${FE}/medibook`,
      },
      {
        name: "BudgetBuddy",
        kind: "Personal finance tracker",
        blurb:
          "Income and expense tracking with progress-bar budgets, category indicators, and live-updating spending charts.",
        stack: ["JavaScript", "HTML", "CSS"],
        live: `${PAGES}/budgetbuddy`,
        github: `${FE}/budgetbuddy`,
      },
      {
        name: "QuickBlog",
        kind: "Content management system",
        blurb: "A blogging interface for creating, publishing, and browsing posts by category.",
        stack: ["JavaScript", "HTML", "CSS"],
        live: `${PAGES}/quickblog`,
        github: `${FE}/quickblog`,
      },
    ],
  },
  {
    id: "python",
    title: "Python",
    lead: "Command-line and desktop tools, mostly around encryption and everyday utility.",
    projects: [
      {
        name: "AES File Encryption Tool",
        kind: "Command-line utility",
        blurb:
          "Symmetric AES encryption and decryption for files at rest, with secure key derivation and handling for corrupted files and incorrect keys.",
        stack: ["Python", "cryptography"],
        live: "",
        github: `${PY}/aes-file-encryption-tool`,
      },
      {
        name: "Password Generator",
        kind: "Security utility",
        blurb:
          "Generates strong passwords with configurable length and character sets, with validation and fault-tolerant handling throughout.",
        stack: ["Python"],
        live: "",
        github: `${PY}/password-generator`,
      },
      {
        name: "QR Code Generator",
        kind: "Utility",
        blurb:
          "Generates QR codes from text, URLs, and contact details as image files, structured for extension into batch processing and branding overlays.",
        stack: ["Python", "qrcode"],
        live: "",
        github: `${PY}/qr-code-generator`,
      },
    ],
  },
  {
    id: "ml",
    title: "Machine learning",
    lead: "Extending the development work into trained models served through a live interface.",
    projects: [
      {
        name: "Sentiment Analysis Web App",
        kind: "Three-class text classifier",
        blurb:
          "A positive / neutral / negative classifier using TF-IDF over unigrams and bigrams with logistic regression, served through a Streamlit interface that returns a live label and confidence score for any sentence you type.",
        points: [
          "Evaluated with accuracy, a classification report, and a confusion matrix.",
          "A text-cleaning pipeline (lowercasing, URL and mention stripping, punctuation removal) applied identically at training and inference time.",
          "Model and vectorizer persisted with joblib so the app loads instantly.",
        ],
        stack: ["Python", "scikit-learn", "Streamlit", "joblib", "pandas"],
        live: "",
        github: `${ML}/sentiment_project`,
        caseStudy: caseStudy(
          "Sentiment Analysis Web App",
          "A sentiment model is only as trustworthy as its evaluation. A single accuracy number can hide a model that's simply guessing the majority class, and inconsistent text cleaning between training and live use quietly degrades real-world predictions.",
          "TF-IDF over unigrams and bigrams feeding a logistic regression model, with a three-class (positive / neutral / negative) split evaluated properly using accuracy, a full classification report, and a confusion matrix. The same text-cleaning pipeline (lowercasing, URL and mention stripping, punctuation removal) runs at both training and inference time, and the trained model plus vectorizer are persisted with joblib so the Streamlit interface loads instantly and returns a live label with a confidence score for anything typed in.",
          true,
        ),
      },
    ],
  },
]

export const qa = {
  lead: "Every project above went through a full test cycle before I called it finished.",
  blocks: [
    {
      title: "Functional and black-box testing",
      points: [
        "Test matrices covering authentication, CRUD operations, form validation, and edge cases.",
        "Boundary-value and negative-assertion testing across every module in all six web projects.",
        "All six certified at sign-off with zero unresolved critical bugs.",
      ],
    },
    {
      title: "API testing and automation",
      points: [
        "Postman collections validating HTTP responses, payloads, and status codes across REST endpoints.",
        "Scripted assertions for JWT auth headers and token lifecycle checks.",
        "Structured JIRA bug reports with severity ratings and clear reproduction steps.",
      ],
    },
  ],
}

export const skills = [
  { group: "Languages", items: "Python, JavaScript (ES6+), SQL, HTML5, CSS3" },
  { group: "Front-end", items: "React, Vite, Tailwind CSS, responsive design, state management" },
  { group: "Back-end", items: "Node.js, Express, Flask, Jinja2, REST APIs, JWT, server-side validation" },
  { group: "Databases", items: "MongoDB (Mongoose), SQLite, MySQL for schema design, CRUD, joins" },
  { group: "Testing", items: "Test case design, manual execution, Postman, JIRA, regression testing" },
  { group: "Machine learning", items: "scikit-learn, TF-IDF, logistic regression, Streamlit, joblib" },
  { group: "Tools", items: "Git, GitHub, Netlify, Vercel, PythonAnywhere, Tkinter" },
]

export const education = [
  { period: "2022 — 2026", title: "BS Computer Science", org: "DHA Suffa University, Karachi" },
]
export const certifications = [
  { period: "2025", title: "Python for Data Science, AI & Development", org: "Coursera / IBM" },
  { period: "2025", title: "Introduction to Front-End Development", org: "Coursera" },
]
