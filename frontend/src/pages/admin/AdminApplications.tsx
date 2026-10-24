import React, { useState, useEffect } from 'react';
import { Download, Mail, Phone, ExternalLink, Clock, CheckCircle, RefreshCw } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../../components/common/SocialIcons';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';
import { api } from '../../lib/api';
import { JobApplication } from '../../types';

export const AdminApplications: React.FC = () => {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const { success, error } = useToast();

  const loadApplications = () => {
    setLoading(true);
    api.getAdminApplications()
      .then((data) => {
        setApplications(data);
        setLoading(false);
      })
      .catch(() => {
        setApplications([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const handleStatusChange = async (id: number, newStatus: any) => {
    try {
      await api.updateApplicationStatus(id, newStatus);
      success(`Updated candidate status to "${newStatus}"`);
      setApplications((prev) =>
        prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
      );
    } catch {
      error('Failed to update candidate status.');
    }
  };

  const handleDownloadResume = (id: number, filename: string) => {
    const token = localStorage.getItem('jhrst_admin_token');
    const url = `http://localhost:8000/api/v1/job-applications/admin/${id}/resume`;
    
    // Trigger download with auth header using fetch/blob
    fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(async (res) => {
        if (!res.ok) throw new Error('Could not download file');
        const blob = await res.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        success('Resume downloaded successfully.');
      })
      .catch((err) => {
        error('Resume file download unavailable or unauthorized.');
      });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <Badge variant="gold">TALENT RECRUITMENT</Badge>
          <h1 className="text-2xl font-bold font-heading text-white mt-1">
            Candidate Applications ({applications.length})
          </h1>
          <p className="text-xs text-muted">
            Review candidate resumes, skill profiles, and progress hiring stages.
          </p>
        </div>

        <Button variant="secondary" size="sm" onClick={loadApplications} leftIcon={<RefreshCw className="w-3.5 h-3.5" />}>
          Refresh
        </Button>
      </div>

      {loading ? (
        <div className="py-12 flex justify-center">
          <div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : applications.length === 0 ? (
        <div className="p-10 text-center rounded-2xl bg-[#0e0e0e] border border-[#222]">
          <p className="text-sm text-gray-400">No applications submitted yet.</p>
          <p className="text-xs text-muted mt-1">Incoming resumes submitted through /careers will display here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div
              key={app.id}
              className="p-6 rounded-2xl bg-[#0e0e0e] border border-[#242424] shadow-card space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1c1c1c] pb-3">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-base font-bold text-white font-heading">
                      {app.full_name}
                    </h3>
                    <span className="text-xs px-2.5 py-0.5 rounded bg-gold-500/10 text-gold-300 border border-gold-500/20 font-medium">
                      {app.job_title}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 mt-1">
                    <span>Level: {app.experience_level}</span>
                    <span>&bull;</span>
                    <a href={`mailto:${app.email}`} className="text-gold-400 hover:underline">
                      {app.email}
                    </a>
                    {app.phone && (
                      <>
                        <span>&bull;</span>
                        <span>{app.phone}</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted">Hiring Stage:</span>
                  <select
                    value={app.status}
                    onChange={(e) => handleStatusChange(app.id, e.target.value)}
                    className="bg-[#181818] border border-[#2b2b2b] text-xs text-gold-300 rounded-lg px-2.5 py-1 focus:outline-none"
                  >
                    <option value="Received">Received</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Interview">Interview</option>
                    <option value="Selected">Selected</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-muted font-semibold mb-1">
                  Core Skills:
                </p>
                <p className="text-xs text-gray-200 bg-[#141414] p-3 rounded-lg border border-[#202020]">
                  {app.relevant_skills}
                </p>
              </div>

              {app.message && (
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted font-semibold mb-1">
                    Candidate Note:
                  </p>
                  <p className="text-xs text-gray-300 bg-[#141414] p-3 rounded-lg border border-[#202020]">
                    {app.message}
                  </p>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[#1c1c1c]">
                <div className="flex items-center gap-3">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleDownloadResume(app.id, app.resume_filename)}
                    leftIcon={<Download className="w-3.5 h-3.5" />}
                  >
                    Download Resume ({app.resume_filename})
                  </Button>

                  {app.linkedin_url && (
                    <a
                      href={app.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-gray-400 hover:text-gold-300 flex items-center gap-1"
                    >
                      <LinkedinIcon className="w-3.5 h-3.5" />
                      <span>LinkedIn</span>
                    </a>
                  )}

                  {app.github_url && (
                    <a
                      href={app.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-gray-400 hover:text-gold-300 flex items-center gap-1"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>GitHub</span>
                    </a>
                  )}
                </div>

                <span className="text-[11px] text-muted flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Applied: {new Date(app.created_at).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
