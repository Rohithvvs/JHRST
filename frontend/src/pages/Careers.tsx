import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Upload, 
  CheckCircle, 
  AlertCircle, 
  ArrowRight, 
  X, 
  FileText,
  Sparkles
} from 'lucide-react';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { SectionHeading } from '../components/common/SectionHeading';
import { useToast } from '../context/ToastContext';
import { api, fallbackJobs } from '../lib/api';
import { JobOpening } from '../types';

// Validation schema for application
const applicationSchema = z.object({
  full_name: z.string().min(2, 'Full name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  experience_level: z.string().min(1, 'Please select your experience level'),
  relevant_skills: z.string().min(3, 'Please list your key technical skills'),
  linkedin_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  github_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  message: z.string().optional(),
  consent_given: z.boolean().refine((val) => val === true, {
    message: 'You must consent to privacy terms to submit your application',
  }),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

export const Careers: React.FC = () => {
  const [jobs, setJobs] = useState<JobOpening[]>(fallbackJobs);
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState<boolean>(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState<boolean>(false);

  const { success, error } = useToast();

  useEffect(() => {
    api.getJobs().then(setJobs).catch(() => {});
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      experience_level: 'Mid-level',
      consent_given: false,
    },
  });

  const handleOpenApply = (job: JobOpening) => {
    setSelectedJob(job);
    setIsSubmittedSuccess(false);
    setResumeFile(null);
    setFileError(null);
    setIsApplyModalOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      setFileError('Only PDF files (.pdf) are accepted.');
      setResumeFile(null);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setFileError('File size exceeds the 5MB maximum limit.');
      setResumeFile(null);
      return;
    }

    setFileError(null);
    setResumeFile(file);
  };

  const onSubmit = async (data: ApplicationFormData) => {
    if (!resumeFile) {
      setFileError('Please attach your resume in PDF format.');
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('full_name', data.full_name);
      formData.append('email', data.email);
      if (data.phone) formData.append('phone', data.phone);
      if (selectedJob?.id) formData.append('job_id', String(selectedJob.id));
      formData.append('job_title', selectedJob?.title || 'General Talent Community');
      formData.append('experience_level', data.experience_level);
      formData.append('relevant_skills', data.relevant_skills);
      if (data.linkedin_url) formData.append('linkedin_url', data.linkedin_url);
      if (data.github_url) formData.append('github_url', data.github_url);
      if (data.message) formData.append('message', data.message);
      formData.append('consent_given', 'true');
      formData.append('resume', resumeFile);

      await api.submitApplication(formData);
      setIsSubmittedSuccess(true);
      success('Your application has been received successfully!');
      reset();
    } catch (err: any) {
      error(err.message || 'Failed to submit application. Please verify all details.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-28 pb-20">
      {/* Header */}
      <section className="relative py-16 md:py-24 border-b border-[#1c1c1c] overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-gold-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Badge variant="gold" className="mb-4">
            CAREERS AT JHRST
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight font-heading mb-6">
            Build the Future{' '}
            <span className="text-gold-gradient">with Us.</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto font-normal">
            We welcome people who enjoy solving problems, learning new technologies, and building meaningful digital products. Explore active openings or join our talent community.
          </p>
        </div>
      </section>

      {/* Openings Grid */}
      <section className="py-20 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white font-heading">
                Current Opportunities ({jobs.length})
              </h2>
              <p className="text-xs text-muted mt-1">
                Verified active positions across software engineering, AI, and design.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {jobs.map((job) => (
              <div
                key={job.slug}
                className="p-8 rounded-2xl bg-[#0f0f0f] border border-[#242424] hover:border-gold-500/40 transition-all duration-300 shadow-card flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
              >
                <div className="space-y-3 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-gold-500/10 text-gold-400 border border-gold-500/20 uppercase tracking-wider">
                      {job.department}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-muted" />
                      {job.employment_type}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-muted" />
                      {job.location}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white font-heading">
                    {job.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {job.requirements.slice(0, 3).map((req, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] px-2 py-0.5 rounded bg-[#161616] border border-[#292929] text-gray-300"
                      >
                        {req}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="shrink-0 flex sm:flex-col items-center gap-3 w-full sm:w-auto">
                  <Button
                    variant="primary"
                    size="md"
                    className="w-full sm:w-auto"
                    onClick={() => handleOpenApply(job)}
                  >
                    Apply for Position
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* General Talent Community Box */}
          <div className="mt-16 p-8 rounded-2xl bg-[#101010] border border-[#262626] flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-bold text-white font-heading">
                No exact match right now?
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Stay connected with us for future openings across engineering, research, and product design.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedJob({
                  id: 0,
                  slug: 'talent-community',
                  title: 'General Talent Community',
                  department: 'Talent Network',
                  employment_type: 'Flexible',
                  location: 'Remote',
                  experience_level: 'All Levels',
                  description: 'General candidate pool for upcoming software development and AI positions.',
                  responsibilities: [],
                  requirements: [],
                  nice_to_have: [],
                  is_active: true,
                  created_at: '',
                  updated_at: '',
                });
                setIsApplyModalOpen(true);
              }}
            >
              Submit General Application
            </Button>
          </div>
        </div>
      </section>

      {/* Application Modal */}
      {isApplyModalOpen && selectedJob && (
        <Modal
          isOpen={isApplyModalOpen}
          onClose={() => setIsApplyModalOpen(false)}
          title={`Apply: ${selectedJob.title}`}
          maxWidth="2xl"
        >
          {isSubmittedSuccess ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white font-heading">
                Application Received!
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
                Thank you for applying to JHRST Tech Solutions. Our technical recruitment team will review your qualifications and contact you if there is a match.
              </p>
              <div className="pt-4">
                <Button variant="outline" size="sm" onClick={() => setIsApplyModalOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
              <p className="text-xs text-muted mb-2">
                All resume uploads are verified and stored in a private directory. Only PDF format is accepted.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    {...register('full_name')}
                    placeholder="Alex Mercer"
                    className="w-full bg-[#161616] border border-[#2b2b2b] rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-gold-500/50"
                  />
                  {errors.full_name && (
                    <p className="text-[11px] text-red-400 mt-1">{errors.full_name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="alex@domain.com"
                    className="w-full bg-[#161616] border border-[#2b2b2b] rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-gold-500/50"
                  />
                  {errors.email && (
                    <p className="text-[11px] text-red-400 mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    Phone Number (Optional)
                  </label>
                  <input
                    {...register('phone')}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-[#161616] border border-[#2b2b2b] rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-gold-500/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    Experience Level <span className="text-red-400">*</span>
                  </label>
                  <select
                    {...register('experience_level')}
                    className="w-full bg-[#161616] border border-[#2b2b2b] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-gold-500/50"
                  >
                    <option value="Internship">Internship / Student</option>
                    <option value="Entry-level">Entry-level (0-2 years)</option>
                    <option value="Mid-level">Mid-level (3-5 years)</option>
                    <option value="Senior">Senior (5+ years)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Relevant Technical Skills <span className="text-red-400">*</span>
                </label>
                <input
                  {...register('relevant_skills')}
                  placeholder="e.g. Python, FastAPI, React, TypeScript, PyTorch, Docker"
                  className="w-full bg-[#161616] border border-[#2b2b2b] rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-gold-500/50"
                />
                {errors.relevant_skills && (
                  <p className="text-[11px] text-red-400 mt-1">{errors.relevant_skills.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    LinkedIn Profile (Optional)
                  </label>
                  <input
                    {...register('linkedin_url')}
                    placeholder="https://linkedin.com/in/username"
                    className="w-full bg-[#161616] border border-[#2b2b2b] rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-gold-500/50"
                  />
                  {errors.linkedin_url && (
                    <p className="text-[11px] text-red-400 mt-1">{errors.linkedin_url.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    GitHub / Portfolio (Optional)
                  </label>
                  <input
                    {...register('github_url')}
                    placeholder="https://github.com/username"
                    className="w-full bg-[#161616] border border-[#2b2b2b] rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-gold-500/50"
                  />
                  {errors.github_url && (
                    <p className="text-[11px] text-red-400 mt-1">{errors.github_url.message}</p>
                  )}
                </div>
              </div>

              {/* PDF File Upload */}
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Resume (PDF only, max 5MB) <span className="text-red-400">*</span>
                </label>
                <div className="border border-dashed border-[#333] hover:border-gold-500/50 rounded-xl p-4 text-center cursor-pointer bg-[#141414]">
                  <input
                    type="file"
                    accept=".pdf,application/pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    id="resume-file-input"
                  />
                  <label htmlFor="resume-file-input" className="cursor-pointer flex flex-col items-center">
                    <FileText className="w-6 h-6 text-gold-400 mb-1" />
                    <span className="text-xs text-gray-300">
                      {resumeFile ? resumeFile.name : 'Click to select PDF document'}
                    </span>
                    <span className="text-[10px] text-muted mt-0.5">PDF up to 5MB</span>
                  </label>
                </div>
                {fileError && <p className="text-[11px] text-red-400 mt-1">{fileError}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Cover Note / Additional Information
                </label>
                <textarea
                  {...register('message')}
                  rows={3}
                  placeholder="Tell us briefly why you'd like to work with JHRST..."
                  className="w-full bg-[#161616] border border-[#2b2b2b] rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-gold-500/50"
                />
              </div>

              {/* Consent checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register('consent_given')}
                    className="mt-0.5 rounded border-[#333] bg-[#161616] text-gold-500 focus:ring-gold-500"
                  />
                  <span className="text-[11px] text-gray-400 leading-relaxed">
                    I consent to JHRST Tech Solutions reviewing and storing my application and resume for candidate evaluation according to the Privacy Policy.
                  </span>
                </label>
                {errors.consent_given && (
                  <p className="text-[11px] text-red-400 mt-1">{errors.consent_given.message}</p>
                )}
              </div>

              <div className="pt-4 border-t border-[#222] flex items-center justify-end gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsApplyModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  isLoading={isSubmitting}
                >
                  Submit Application
                </Button>
              </div>
            </form>
          )}
        </Modal>
      )}
    </div>
  );
};

