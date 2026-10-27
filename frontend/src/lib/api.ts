import axios from 'axios';
import { 
  Service, 
  Project, 
  AIProduct, 
  JobOpening, 
  CompanySettings, 
  DashboardStats, 
  JobApplication, 
  ContactInquiry, 
  ProjectInquiry 
} from '../types';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach Authorization header if token exists
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('jhrst_admin_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Fallback datasets matching the exact seed specification
export const fallbackSettings: CompanySettings = {
  company_name: "JHRST Tech Solutions",
  tagline: "BUILD. INNOVATE. GROW.",
  email: "jhrst9966@gmail.com",
  phone: "+91 99662 84338",
  address: "Bengaluru, Karnataka, India – 560068",
  business_hours: "Monday - Saturday: 9:00 AM - 6:00 PM IST",
  linkedin_url: "https://linkedin.com/company/jhrst-tech-solutions",
  instagram_url: "https://instagram.com/jhrsttech",
  github_url: "https://github.com/jhrst-tech"
};

export const fallbackServices: Service[] = [
  {
    id: 1,
    slug: "ai-and-machine-learning",
    title: "Artificial Intelligence and Machine Learning",
    icon_name: "Brain",
    short_description: "Develop intelligent applications using machine learning, AI models, data processing, and modern AI technologies.",
    full_description: "At JHRST Tech Solutions, we design and deploy tailored artificial intelligence and machine learning architectures that turn raw data into strategic automation and actionable decision-making tools. We specialize in deep learning, natural language processing, predictive modeling, and state-of-the-art LLM orchestration.",
    offerings: [
      "AI-powered applications & intelligent copilots",
      "Machine learning models & predictive analytics",
      "Natural language processing (NLP) & semantic search",
      "Computer vision and visual inspection systems",
      "AI assistants and autonomous agents",
      "Intelligent document understanding (IDP)",
      "AI workflow integration & API connectivity"
    ],
    business_benefits: [
      "Automate high-friction cognitive workflows",
      "Extract immediate insights from unstructured enterprise data",
      "Deliver hyper-personalized user experiences",
      "Scale operations without proportional head-count increases"
    ],
    tech_stack: ["Python", "PyTorch", "TensorFlow", "FastAPI", "OpenAI / Anthropic APIs", "Hugging Face", "Vector DBs"],
    cta_label: "Explore AI Solutions",
    order: 1,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 2,
    slug: "web-application-development",
    title: "Web Application Development",
    icon_name: "Globe",
    short_description: "Build responsive, secure, and scalable web applications that deliver exceptional user experiences.",
    full_description: "We architect robust, scalable, and responsive web platforms built with contemporary frameworks. From enterprise SaaS platforms and operational customer portals to high-converting corporate web presences, our engineering prioritizes speed, responsive design, tight security, and accessibility.",
    offerings: [
      "High-performance corporate websites & web apps",
      "Multi-tenant SaaS platforms & customer portals",
      "Complex administrative dashboards & internal tools",
      "E-commerce platforms & checkout systems",
      "RESTful & GraphQL API integrations",
      "Database-driven enterprise web applications"
    ],
    business_benefits: [
      "Accelerated page speed and strong Core Web Vitals",
      "Seamless performance across mobile, tablet, and ultra-wide displays",
      "Enterprise-grade security and role-based data protection",
      "Clean, maintainable codebase ready for iterative scaling"
    ],
    tech_stack: ["React", "TypeScript", "Vite", "Next.js", "Tailwind CSS", "FastAPI", "Node.js", "PostgreSQL"],
    cta_label: "Build a Web Application",
    order: 2,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 3,
    slug: "mobile-application-development",
    title: "Mobile Application Development",
    icon_name: "Smartphone",
    short_description: "Create modern mobile experiences that help businesses reach users across devices.",
    full_description: "We build fluid, responsive native and cross-platform mobile applications that bring your digital products directly into users' hands. Focusing on Android and modern cross-platform stacks, we ensure offline capability, swift rendering, intuitive touch interactions, and secure back-end synchronization.",
    offerings: [
      "Native Android application development",
      "Cross-platform applications (React Native / Flutter)",
      "Secure mobile back-end & API synchronization",
      "Biometric authentication & token session handling",
      "Push notifications & user engagement flows",
      "Touch-first mobile UI/UX engineering"
    ],
    business_benefits: [
      "Reach customers everywhere with intuitive portable experiences",
      "Boost retention with customized push messaging",
      "Guaranteed responsiveness across diverse hardware specifications"
    ],
    tech_stack: ["React Native", "Android SDK", "Kotlin", "TypeScript", "FastAPI", "Firebase Cloud Messaging"],
    cta_label: "Build a Mobile App",
    order: 3,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 4,
    slug: "custom-software-development",
    title: "Custom Software Development",
    icon_name: "Cpu",
    short_description: "Develop tailored software that supports business workflows, operational needs, and product ideas.",
    full_description: "Off-the-shelf software often fails to meet nuanced business logic. JHRST Tech Solutions engineers custom software tailored specifically to your operational requirements, data flows, and growth trajectory. We design clean domain models, modular microservices or structured monoliths, and resilient databases.",
    offerings: [
      "Custom business systems & ERP/CRM modules",
      "SaaS product engineering from zero to production",
      "High-throughput transactional databases",
      "Resilient backend architectures & microservices",
      "Legacy modernization & tech stack migration",
      "Internal productivity & operational tooling"
    ],
    business_benefits: [
      "Eliminate recurring licensing fees of mismatched commercial tools",
      "Protect proprietary business logic and unique competitive advantages",
      "Complete ownership of intellectual property and code repository"
    ],
    tech_stack: ["Python", "FastAPI", "PostgreSQL", "Docker", "Redis", "SQLAlchemy", "Linux"],
    cta_label: "Discuss Your Software",
    order: 4,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 5,
    slug: "automation-and-ai-agents",
    title: "Automation and AI Agents",
    icon_name: "Bot",
    short_description: "Reduce repetitive work and improve productivity with intelligent automation and AI-powered workflows.",
    full_description: "Eliminate manual friction, minimize human error, and accelerate business cycles with autonomous agent orchestration and intelligent RPA. We configure AI workflows that parse documents, sync systems, conduct structured web research, trigger transactional alerts, and handle multi-step tasks autonomously.",
    offerings: [
      "Business process automation (BPA) & workflow orchestration",
      "Autonomous multi-step AI agents & reasoning pipelines",
      "Automated email sorting, summarization, and triage",
      "High-speed document parsing, PDF extraction, and validation",
      "API-to-API data transformation bridges",
      "Automated scheduled monitoring and reporting agents"
    ],
    business_benefits: [
      "Recover countless staff hours consumed by redundant manual entry",
      "Attain near 100% accuracy in structured data migration and extraction",
      "24/7 continuous process execution without downtime"
    ],
    tech_stack: ["Python", "LangChain", "Celery", "FastAPI", "Playwright", "Docker", "PostgreSQL"],
    cta_label: "Automate Your Workflow",
    order: 5,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 6,
    slug: "ui-ux-and-digital-product-design",
    title: "UI/UX and Digital Product Design",
    icon_name: "Layout",
    short_description: "Design intuitive digital products that combine visual quality, accessibility, and usability.",
    full_description: "Great software begins with empathetic, strategic product design. We create user interfaces that are aesthetically captivating, functionally effortless, and fully accessible. From wireframes and interactive prototypes to design systems in Figma and pixel-perfect implementation, we make every user interaction memorable.",
    offerings: [
      "End-to-end digital product design (Web & Mobile)",
      "Interactive Figma prototypes and user journey wireframes",
      "Scalable design systems, tokens, and component libraries",
      "High-density data dashboards and analytics visualizations",
      "Accessibility audits (WCAG 2.1 AA compliance)",
      "Responsive design across desktop, tablet, and mobile"
    ],
    business_benefits: [
      "Drastically lower user onboarding time and cognitive load",
      "Reinforce brand authority through a polished, futuristic aesthetic",
      "Streamline frontend development via structured reusable design tokens"
    ],
    tech_stack: ["Figma", "Tailwind CSS", "Design Systems", "Framer Motion", "Storybook", "SVG"],
    cta_label: "Design Your Product",
    order: 6,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const fallbackProjects: Project[] = [
  {
    id: 1,
    slug: "ai-resume-tailoring-platform",
    title: "AI Resume Tailoring Platform",
    category: "AI Applications",
    short_description: "An intelligent platform that analyzes professional resumes against target job descriptions and provides actionable structural and keyword improvements.",
    problem_statement: "Job seekers struggle to understand ATS algorithms, often sending generic resumes that fail to highlight their most relevant achievements for specific roles.",
    solution: "Built a semantic parser using LLM embeddings to compare resumes against target job specs, pinpointing missing skills, highlighting impact gaps, and generating tailored draft bullet points without fabricating experience.",
    key_features: [
      "Real-time ATS compatibility scoring",
      "Gap analysis between candidate experience and role requirements",
      "Actionable rewrite suggestions preserving factual veracity",
      "One-click PDF preview and export"
    ],
    tech_stack: ["React", "TypeScript", "Tailwind CSS", "FastAPI", "LangChain", "OpenAI API", "PostgreSQL"],
    status: "In Development",
    is_published: true,
    is_featured: true,
    order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 2,
    slug: "automated-job-discovery-platform",
    title: "Automated Job Discovery Platform",
    category: "Automation",
    short_description: "A scheduled intelligent scraper and aggregator that indexes career portals and matches verified openings to personalized candidate preferences.",
    problem_statement: "Job aggregators are frequently clogged with outdated, expired, or ghost job listings, forcing candidates to waste hours verifying active roles.",
    solution: "Constructed an automated scraping and verification pipeline that checks job status daily, dedupes company openings across platforms, and alerts users via custom filters.",
    key_features: [
      "Live status validation of company career boards",
      "De-duplication engine across multiple boards",
      "Automated email notifications for exact skill matches",
      "Customizable search alerts and application tracking"
    ],
    tech_stack: ["Python", "FastAPI", "Playwright", "Celery", "PostgreSQL", "Redis", "React"],
    status: "In Development",
    is_published: true,
    is_featured: true,
    order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 3,
    slug: "intelligent-stock-market-analysis",
    title: "Intelligent Stock Market Analysis Platform",
    category: "Data and Analytics",
    short_description: "Data exploration and market sentiment dashboard integrating news feeds, SEC disclosures, and historical price volatility metrics.",
    problem_statement: "Retail investors lack unified tooling to correlate qualitative sentiment from press releases with quantitative market indicators.",
    solution: "Created an interactive financial analytics portal that pairs real-time price feeds with NLP sentiment scores derived from financial disclosures and market news.",
    key_features: [
      "Interactive candlestick and volume visualizations",
      "Real-time news sentiment scoring engine",
      "Automated fundamental metrics extraction from 10-K/10-Q filings",
      "Custom technical indicator overlays"
    ],
    tech_stack: ["React", "TypeScript", "FastAPI", "Pandas", "PostgreSQL", "Tailwind CSS"],
    status: "Concept",
    is_published: true,
    is_featured: false,
    order: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 4,
    slug: "ai-research-assistant",
    title: "AI Research Assistant",
    category: "AI Applications",
    short_description: "A researcher workspace for synthesizing academic papers, querying dense technical documentation, and organizing citations.",
    problem_statement: "Researchers spend excessive time manually combing through 40-page papers to locate specific methodologies, experimental setups, and benchmark scores.",
    solution: "Engineered a vector-indexed document workspace enabling researchers to upload collections of PDFs, query across multiple papers simultaneously, and obtain verifiable cited answers.",
    key_features: [
      "Multi-document cross-referencing and synthesis",
      "Direct page and paragraph citations for every claim",
      "Interactive markdown workspace and note exporter",
      "Local vector storage option for data privacy"
    ],
    tech_stack: ["React", "FastAPI", "ChromaDB", "PyMuPDF", "LangChain", "Tailwind CSS"],
    status: "Beta",
    is_published: true,
    is_featured: true,
    order: 4,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 5,
    slug: "enterprise-workflow-automation-hub",
    title: "Business Workflow Automation Hub",
    category: "Automation",
    short_description: "Modular enterprise connector automating invoice reconciliation, client approvals, and inter-system data synchronization.",
    problem_statement: "Operations teams lose an estimated 15 hours per week manually copy-pasting customer records between CRM, accounting software, and fulfillment spreadsheets.",
    solution: "Implemented a dependable event-driven automation framework that monitors webhook triggers, validates data integrity, and synchronizes records across third-party APIs.",
    key_features: [
      "Visual trigger-and-action workflow builder",
      "Automatic retry mechanism with exponential backoff",
      "Detailed transaction audit trail and anomaly alerts",
      "Encrypted credential storage for API integrations"
    ],
    tech_stack: ["Python", "FastAPI", "React", "PostgreSQL", "Docker", "RabbitMQ"],
    status: "In Development",
    is_published: true,
    is_featured: false,
    order: 5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 6,
    slug: "high-performance-saas-portal",
    title: "High-Performance Modern SaaS Portal",
    category: "Web Applications",
    short_description: "A production-grade multi-tenant web application featuring RBAC authentication, subscription billing, and responsive data analytics.",
    problem_statement: "Startups frequently struggle with initial boilerplate setup, slowing down go-to-market timeline by months.",
    solution: "Developed a modular, battle-tested full-stack web application blueprint complete with JWT authentication, role-based permissions, database migrations, and responsive dark/light UI.",
    key_features: [
      "Secure JWT authentication and password hashing",
      "Role-based access control (Admin, Member, Guest)",
      "Responsive dashboard with chart analytics",
      "Production-ready deployment scripts for Docker & Cloud"
    ],
    tech_stack: ["React", "TypeScript", "Tailwind CSS", "FastAPI", "SQLAlchemy", "PostgreSQL"],
    status: "Available",
    is_published: true,
    is_featured: true,
    order: 6,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const fallbackAIProducts: AIProduct[] = [
  {
    id: 1,
    slug: "ai-assistants-and-agents",
    title: "AI Assistants & Autonomous Agents",
    category: "AI Assistants",
    description: "Multi-agent systems configured to perform in-depth research, information synthesis, contextual data retrieval, and automated task execution for businesses.",
    problem_solved: "Employees waste hours toggling across systems, searching manuals, and performing repetitive information extraction.",
    features: [
      "Contextual enterprise knowledge retrieval (RAG)",
      "Multi-step problem decomposition and execution",
      "Tool calling for external APIs, databases, and calculation engines",
      "Role-based permission gating for sensitive data"
    ],
    status: "Beta",
    order: 1,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 2,
    slug: "ai-powered-recruitment-intelligence",
    title: "AI-Powered Recruitment & Resume Intelligence",
    category: "AI Recruitment",
    description: "Intelligent recruitment and talent pipeline tooling that extracts candidate competencies, benchmarks requirements against real job criteria, and assists recruiters with objective matching.",
    problem_solved: "Talent teams drown in hundreds of mismatched resumes while high-potential candidates slip through due to rigid keyword filters.",
    features: [
      "Semantic resume parsing & skills taxonomy mapping",
      "Objective criteria evaluation against job descriptions",
      "Automated interview question suggestion based on candidate profile",
      "Bias-reduction sanitization and structured rating matrices"
    ],
    status: "In Development",
    order: 2,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 3,
    slug: "computer-vision-visual-inspection",
    title: "Computer Vision & Visual Inspection",
    category: "Computer Vision",
    description: "Vision models optimized for edge or cloud inference to detect anomalies, classify imagery, read structural text, and perform real-time video stream analysis.",
    problem_solved: "Manual visual checks are slow, inconsistent, and error-prone in manufacturing, logistics, and document scanning.",
    features: [
      "Object detection, segmentation, and bounding annotation",
      "Optical character recognition (OCR) on degraded scans",
      "Real-time visual anomaly identification",
      "Lightweight model export for edge devices"
    ],
    status: "In Development",
    order: 3,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 4,
    slug: "intelligent-business-automation-hub",
    title: "Intelligent Business Automation Hub",
    category: "Business Automation",
    description: "Integrates cutting-edge AI capabilities directly into CRM, ERP, and communication channels to automate invoices, customer queries, and multi-departmental workflows.",
    problem_solved: "Fragmented business applications requiring manual human glue to keep data synced and customer requests answered.",
    features: [
      "Automated invoice & receipt reconciliation",
      "Context-aware customer communication responses",
      "Scheduled workflow triggers and exception handling alerts",
      "Audit logging and compliance tracking"
    ],
    status: "Beta",
    order: 4,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const fallbackJobs: JobOpening[] = [
  {
    id: 1,
    slug: "full-stack-software-engineer",
    title: "Full-Stack Software Engineer (Python & React)",
    department: "Engineering",
    employment_type: "Full-time",
    location: "Remote",
    experience_level: "Mid-level",
    description: "We are seeking a talented Full-Stack Software Engineer to build and scale web applications, APIs, and client platforms. You will work across modern React/TypeScript frontends and FastAPI backends, shipping real software for startups and enterprise clients.",
    responsibilities: [
      "Design and build responsive, accessible web applications using React and Tailwind CSS",
      "Develop high-performance REST APIs and microservices using FastAPI and SQLAlchemy",
      "Optimize database schemas, indexes, and queries in PostgreSQL",
      "Write clean, maintainable, and well-tested code with automated unit and integration tests",
      "Collaborate with designers and product leads to bring concept prototypes to production"
    ],
    requirements: [
      "3+ years of professional full-stack development experience",
      "Strong proficiency with React, TypeScript, and modern JavaScript (ES6+)",
      "Solid backend experience with Python (FastAPI, Flask, or Django)",
      "Experience with relational databases (PostgreSQL preferred) and ORMs",
      "Understanding of REST API design principles, authentication, and web security"
    ],
    nice_to_have: [
      "Familiarity with Docker and containerized deployment workflows",
      "Experience with Framer Motion or interactive animations",
      "Prior experience with AI API integration (OpenAI, Anthropic)"
    ],
    deadline: "Open until filled",
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 2,
    slug: "ai-machine-learning-engineer",
    title: "AI / Machine Learning Engineer",
    department: "AI & Data",
    employment_type: "Full-time",
    location: "Remote",
    experience_level: "Mid-level",
    description: "Join our AI solutions team to build practical, impactful AI-powered products. You will work on LLM integration, autonomous agent pipelines, computer vision prototypes, and intelligent data automation.",
    responsibilities: [
      "Develop and deploy retrieval-augmented generation (RAG) architectures and AI agent workflows",
      "Fine-tune and evaluate open-source and proprietary models for specific client domains",
      "Build data processing pipelines and vector search indexing for enterprise documents",
      "Collaborate with backend engineers to expose machine learning capabilities via robust APIs"
    ],
    requirements: [
      "Demonstrated experience with Python and ML frameworks (PyTorch, Hugging Face, LangChain)",
      "Hands-on experience with LLM prompting, embeddings, and vector databases",
      "Strong foundation in data structures, algorithms, and applied mathematics",
      "Ability to critically evaluate model outputs for accuracy, hallucination, and bias"
    ],
    nice_to_have: [
      "Experience in Computer Vision (OpenCV, YOLO) or OCR workflows",
      "Experience serving models using FastAPI and Docker"
    ],
    deadline: "Open until filled",
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 3,
    slug: "frontend-developer-react-typescript",
    title: "Frontend Developer (React & TypeScript)",
    department: "Engineering",
    employment_type: "Full-time",
    location: "Remote",
    experience_level: "Mid-level",
    description: "We are looking for a design-sensitive Frontend Developer passionate about crafting fluid, accessible, and high-performance user interfaces. You will translate elegant Figma designs into pixel-perfect React components.",
    responsibilities: [
      "Build modular, accessible, and reusable UI components in React and TypeScript",
      "Implement responsive designs and subtle micro-interactions with Tailwind CSS and Framer Motion",
      "Ensure cross-browser compatibility and optimal performance across all viewport sizes",
      "Integrate RESTful APIs and handle asynchronous states, errors, and form validations"
    ],
    requirements: [
      "Strong expertise in React, TypeScript, HTML5, and CSS3",
      "Proficiency with Tailwind CSS and utility-first styling",
      "Experience with client-side routing, state management, and React Hook Form",
      "Deep appreciation for typography, visual hierarchy, and polished UI design"
    ],
    nice_to_have: [
      "Experience with WebGL, Three.js, or Canvas animations",
      "Knowledge of web accessibility standards (WCAG 2.1 AA)"
    ],
    deadline: "Open until filled",
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 4,
    slug: "ai-software-engineering-intern",
    title: "AI & Software Engineering Intern",
    department: "Engineering",
    employment_type: "Internship",
    location: "Remote",
    experience_level: "Internship",
    description: "An opportunity for motivated students or recent graduates to gain hands-on commercial experience in software development and applied AI. You will be mentored by senior engineers and contribute directly to live products.",
    responsibilities: [
      "Assist in developing web features, bug fixes, and API integrations",
      "Experiment with emerging AI libraries, agent frameworks, and prompt engineering",
      "Write unit tests and technical documentation for internal libraries",
      "Participate in daily standups, code reviews, and architecture discussions"
    ],
    requirements: [
      "Currently enrolled in or recently graduated with a degree in Computer Science or related field",
      "Solid foundational knowledge of Python and JavaScript/TypeScript",
      "Familiarity with Git and version control practices",
      "Eagerness to learn rapidly, ask questions, and take ownership of assigned tasks"
    ],
    nice_to_have: [
      "Personal projects or open-source contributions visible on GitHub",
      "Basic understanding of React or FastAPI"
    ],
    deadline: "Rolling admissions",
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

// High-level API Service layer with seamless network fallback
export const api = {
  // Services
  getServices: async (): Promise<Service[]> => {
    try {
      const res = await apiClient.get<Service[]>('/services');
      return res.data;
    } catch {
      return fallbackServices;
    }
  },

  getServiceBySlug: async (slug: string): Promise<Service | null> => {
    try {
      const res = await apiClient.get<Service>(`/services/${slug}`);
      return res.data;
    } catch {
      return fallbackServices.find((s) => s.slug === slug) || null;
    }
  },

  // Projects
  getProjects: async (category?: string): Promise<Project[]> => {
    try {
      const params = category && category !== 'All' ? { category } : {};
      const res = await apiClient.get<Project[]>('/projects', { params });
      return res.data;
    } catch {
      if (!category || category === 'All') return fallbackProjects;
      return fallbackProjects.filter(p => p.category.toLowerCase().includes(category.toLowerCase()));
    }
  },

  getProjectBySlug: async (slug: string): Promise<Project | null> => {
    try {
      const res = await apiClient.get<Project>(`/projects/${slug}`);
      return res.data;
    } catch {
      return fallbackProjects.find((p) => p.slug === slug) || null;
    }
  },

  // AI Products
  getAIProducts: async (): Promise<AIProduct[]> => {
    try {
      const res = await apiClient.get<AIProduct[]>('/products');
      return res.data;
    } catch {
      return fallbackAIProducts;
    }
  },

  getAIProductBySlug: async (slug: string): Promise<AIProduct | null> => {
    try {
      const res = await apiClient.get<AIProduct>(`/products/${slug}`);
      return res.data;
    } catch {
      return fallbackAIProducts.find((p) => p.slug === slug) || null;
    }
  },

  // Jobs
  getJobs: async (): Promise<JobOpening[]> => {
    try {
      const res = await apiClient.get<JobOpening[]>('/jobs');
      return res.data;
    } catch {
      return fallbackJobs;
    }
  },

  getJobBySlug: async (slug: string): Promise<JobOpening | null> => {
    try {
      const res = await apiClient.get<JobOpening>(`/jobs/${slug}`);
      return res.data;
    } catch {
      return fallbackJobs.find((j) => j.slug === slug) || null;
    }
  },

  // Submissions
  submitContact: async (data: {
    full_name: string;
    email: string;
    phone?: string;
    company_name?: string;
    service_required?: string;
    message: string;
    consent_given?: boolean;
  }) => {
    try {
      const res = await apiClient.post('/contact', data);
      return { success: true, data: res.data };
    } catch (err: any) {
      if (err.response) {
        throw new Error(err.response.data.detail || 'Failed to submit contact inquiry');
      }
      // If server unreachable, simulate fallback success
      return { success: true, fallback: true };
    }
  },

  submitProjectInquiry: async (data: {
    full_name: string;
    email: string;
    phone?: string;
    company_name?: string;
    industry?: string;
    service_required: string;
    estimated_budget?: string;
    expected_timeline?: string;
    project_description: string;
    preferred_contact?: string;
    consent_given: boolean;
  }) => {
    try {
      const res = await apiClient.post('/project-inquiries', data);
      return { success: true, data: res.data };
    } catch (err: any) {
      if (err.response) {
        throw new Error(err.response.data.detail || 'Failed to submit project inquiry');
      }
      return { success: true, fallback: true };
    }
  },

  submitApplication: async (formData: FormData) => {
    try {
      const res = await apiClient.post('/job-applications', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return { success: true, data: res.data };
    } catch (err: any) {
      if (err.response) {
        throw new Error(err.response.data.detail || 'Failed to submit job application');
      }
      return { success: true, fallback: true };
    }
  },

  // Settings
  getSettings: async (): Promise<CompanySettings> => {
    try {
      const res = await apiClient.get<CompanySettings>('/settings/public');
      return res.data;
    } catch {
      return fallbackSettings;
    }
  },

  // Admin APIs
  loginAdmin: async (credentials: { email: string; password: string }) => {
    const res = await apiClient.post('/admin/auth/login', credentials);
    return res.data;
  },

  getAdminDashboard: async (): Promise<DashboardStats> => {
    const res = await apiClient.get<DashboardStats>('/admin/dashboard');
    return res.data;
  },

  getAdminApplications: async (): Promise<JobApplication[]> => {
    const res = await apiClient.get<JobApplication[]>('/job-applications/admin/all');
    return res.data;
  },

  updateApplicationStatus: async (id: number, status: string, notes?: string) => {
    const res = await apiClient.put(`/job-applications/admin/${id}/status`, {
      status,
      admin_notes: notes
    });
    return res.data;
  },

  getAdminInquiries: async (): Promise<ContactInquiry[]> => {
    const res = await apiClient.get<ContactInquiry[]>('/admin/contact-inquiries');
    return res.data;
  },

  updateContactInquiryStatus: async (id: number, status: string) => {
    const res = await apiClient.put(`/admin/contact-inquiries/${id}/status`, { status });
    return res.data;
  },

  getAdminProjectInquiries: async (): Promise<ProjectInquiry[]> => {
    const res = await apiClient.get<ProjectInquiry[]>('/admin/project-inquiries');
    return res.data;
  },

  updateProjectInquiryStatus: async (id: number, status: string, notes?: string) => {
    const res = await apiClient.put(`/admin/project-inquiries/${id}/status`, { status, admin_notes: notes });
    return res.data;
  }
};

