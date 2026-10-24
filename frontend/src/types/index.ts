export interface Service {
  id: number;
  slug: string;
  title: string;
  icon_name: string;
  short_description: string;
  full_description: string;
  offerings: string[];
  business_benefits: string[];
  tech_stack: string[];
  cta_label: string;
  order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  category: string;
  short_description: string;
  problem_statement?: string;
  solution?: string;
  key_features: string[];
  tech_stack: string[];
  image_url?: string;
  status: 'Available' | 'Beta' | 'In Development' | 'Concept';
  demo_url?: string;
  source_code_url?: string;
  is_published: boolean;
  is_featured: boolean;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface AIProduct {
  id: number;
  slug: string;
  title: string;
  category: string;
  description: string;
  problem_solved?: string;
  features: string[];
  status: 'Available' | 'Beta' | 'In Development' | 'Concept';
  demo_url?: string;
  docs_url?: string;
  is_published: boolean;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface JobOpening {
  id: number;
  slug: string;
  title: string;
  department: string;
  employment_type: string;
  location: string;
  experience_level: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  nice_to_have: string[];
  deadline?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface JobApplication {
  id: number;
  job_id?: number;
  job_title: string;
  full_name: string;
  email: string;
  phone?: string;
  experience_level: string;
  relevant_skills: string;
  resume_filename: string;
  linkedin_url?: string;
  github_url?: string;
  message?: string;
  consent_given: boolean;
  status: 'Received' | 'Under Review' | 'Shortlisted' | 'Interview' | 'Selected' | 'Rejected';
  admin_notes?: string;
  created_at: string;
}

export interface ContactInquiry {
  id: number;
  full_name: string;
  email: string;
  phone?: string;
  company_name?: string;
  service_required?: string;
  message: string;
  status: string;
  created_at: string;
}

export interface ProjectInquiry {
  id: number;
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
  status: string;
  admin_notes?: string;
  created_at: string;
}

export interface AdminUser {
  id: number;
  email: string;
  full_name: string;
  role: string;
  is_active: boolean;
}

export interface DashboardStats {
  total_services: number;
  published_services: number;
  total_projects: number;
  published_projects: number;
  total_ai_products: number;
  active_jobs: number;
  new_contact_inquiries: number;
  total_contact_inquiries: number;
  new_project_inquiries: number;
  total_project_inquiries: number;
  total_applications: number;
  recent_inquiries: ContactInquiry[];
  recent_project_inquiries: ProjectInquiry[];
}

export interface CompanySettings {
  company_name: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
  business_hours: string;
  linkedin_url: string;
  instagram_url: string;
  github_url: string;
}

