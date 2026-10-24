import React, { useState, useEffect } from 'react';
import { Mail, Phone, Clock, Building, MessageSquare, CheckCircle, RefreshCw } from 'lucide-react';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';
import { api } from '../../lib/api';
import { ProjectInquiry, ContactInquiry } from '../../types';

export const AdminInquiries: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'project' | 'contact'>('project');
  const [projectInquiries, setProjectInquiries] = useState<ProjectInquiry[]>([]);
  const [contactInquiries, setContactInquiries] = useState<ContactInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const { success, error } = useToast();

  const loadData = () => {
    setLoading(true);
    Promise.all([
      api.getAdminProjectInquiries().catch(() => []),
      api.getAdminInquiries().catch(() => [])
    ]).then(([pInq, cInq]) => {
      setProjectInquiries(pInq);
      setContactInquiries(cInq);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUpdateProjectStatus = async (id: number, newStatus: string) => {
    try {
      await api.updateProjectInquiryStatus(id, newStatus);
      success(`Updated status to "${newStatus}"`);
      setProjectInquiries((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
      );
    } catch (err: any) {
      error('Failed to update status.');
    }
  };

  const handleUpdateContactStatus = async (id: number, newStatus: string) => {
    try {
      await api.updateContactInquiryStatus(id, newStatus);
      success(`Updated status to "${newStatus}"`);
      setContactInquiries((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
      );
    } catch (err: any) {
      error('Failed to update status.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <Badge variant="gold">COMMUNICATION PIPELINE</Badge>
          <h1 className="text-2xl font-bold font-heading text-white mt-1">
            Client Inquiries Review
          </h1>
          <p className="text-xs text-muted">
            Manage project scopes, budget inquiries, and contact requests.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={loadData} leftIcon={<RefreshCw className="w-3.5 h-3.5" />}>
            Refresh
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#222]">
        <button
          onClick={() => setActiveTab('project')}
          className={`pb-3 px-4 text-xs font-semibold tracking-wider transition-colors border-b-2 ${
            activeTab === 'project'
              ? 'border-gold-400 text-gold-300'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          Project Inquiries ({projectInquiries.length})
        </button>
        <button
          onClick={() => setActiveTab('contact')}
          className={`pb-3 px-4 text-xs font-semibold tracking-wider transition-colors border-b-2 ${
            activeTab === 'contact'
              ? 'border-gold-400 text-gold-300'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          General Contact ({contactInquiries.length})
        </button>
      </div>

      {loading ? (
        <div className="py-12 flex justify-center">
          <div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : activeTab === 'project' ? (
        <div className="space-y-4">
          {projectInquiries.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-[#0f0f0f] border border-[#222]">
              <p className="text-xs text-gray-400">No project inquiries recorded yet.</p>
            </div>
          ) : (
            projectInquiries.map((inq) => (
              <div
                key={inq.id}
                className="p-6 rounded-2xl bg-[#0e0e0e] border border-[#242424] shadow-card space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1c1c1c] pb-3">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-base font-bold text-white font-heading">
                        {inq.full_name}
                      </h3>
                      {inq.company_name && (
                        <span className="text-xs text-muted flex items-center gap-1">
                          <Building className="w-3 h-3" />
                          {inq.company_name}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 mt-1">
                      <span className="text-gold-400 font-medium">{inq.service_required}</span>
                      <span>&bull;</span>
                      <span>Budget: {inq.estimated_budget || 'Flexible'}</span>
                      <span>&bull;</span>
                      <span>Timeline: {inq.expected_timeline || 'Flexible'}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted">Status:</span>
                    <select
                      value={inq.status}
                      onChange={(e) => handleUpdateProjectStatus(inq.id, e.target.value)}
                      className="bg-[#181818] border border-[#2b2b2b] text-xs text-gold-300 rounded-lg px-2.5 py-1 focus:outline-none"
                    >
                      <option value="New">New</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Discussion Scheduled">Discussion Scheduled</option>
                      <option value="Proposal Sent">Proposal Sent</option>
                      <option value="Archived">Archived</option>
                    </select>
                  </div>
                </div>

                <div className="text-xs text-gray-300 bg-[#121212] p-4 rounded-xl border border-[#1f1f1f] leading-relaxed">
                  <p className="font-semibold text-white mb-1">Project Requirements:</p>
                  <p className="whitespace-pre-wrap">{inq.project_description}</p>
                </div>

                <div className="flex flex-wrap items-center justify-between text-[11px] text-muted pt-1">
                  <div className="flex items-center gap-4">
                    <a href={`mailto:${inq.email}`} className="text-gold-400 hover:underline flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5" />
                      {inq.email}
                    </a>
                    {inq.phone && (
                      <span className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5" />
                        {inq.phone}
                      </span>
                    )}
                  </div>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(inq.created_at).toLocaleString()}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {contactInquiries.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-[#0f0f0f] border border-[#222]">
              <p className="text-xs text-gray-400">No contact inquiries recorded yet.</p>
            </div>
          ) : (
            contactInquiries.map((inq) => (
              <div
                key={inq.id}
                className="p-6 rounded-2xl bg-[#0e0e0e] border border-[#242424] shadow-card space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1c1c1c] pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-white font-heading">
                      {inq.full_name}
                    </h3>
                    <p className="text-[11px] text-muted">{inq.email}</p>
                  </div>

                  <select
                    value={inq.status}
                    onChange={(e) => handleUpdateContactStatus(inq.id, e.target.value)}
                    className="bg-[#181818] border border-[#2b2b2b] text-xs text-gold-300 rounded-lg px-2.5 py-1 focus:outline-none"
                  >
                    <option value="New">New</option>
                    <option value="Reviewed">Reviewed</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>

                <p className="text-xs text-gray-300 leading-relaxed bg-[#121212] p-3 rounded-lg border border-[#1f1f1f]">
                  {inq.message}
                </p>

                <div className="flex items-center justify-between text-[11px] text-muted pt-1">
                  <a href={`mailto:${inq.email}`} className="text-gold-400 hover:underline">
                    Reply via Email
                  </a>
                  <span>{new Date(inq.created_at).toLocaleString()}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

