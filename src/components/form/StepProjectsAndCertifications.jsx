import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { FolderGit2, Award, Plus, Trash2, ExternalLink, Calendar, Building } from 'lucide-react';

const StepProjectsAndCertifications = () => {
  const {
    resumeData,
    addProject,
    updateProject,
    removeProject,
    addCertification,
    updateCertification,
    removeCertification,
  } = useResume();

  const { projects, certifications } = resumeData;
  const [activeTab, setActiveTab] = useState('projects'); // 'projects' | 'certifications'

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900">Projects & Certifications</h3>
        <p className="text-sm text-gray-500">
          Showcase standout portfolio projects and verified credentials that distinguish you from other applicants.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          type="button"
          onClick={() => setActiveTab('projects')}
          className={`flex items-center gap-2 py-2.5 px-4 text-xs sm:text-sm font-semibold border-b-2 transition-colors ${
            activeTab === 'projects'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <FolderGit2 className="w-4 h-4" />
          <span>Projects ({projects.length})</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('certifications')}
          className={`flex items-center gap-2 py-2.5 px-4 text-xs sm:text-sm font-semibold border-b-2 transition-colors ${
            activeTab === 'certifications'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Certifications ({certifications.length})</span>
        </button>
      </div>

      {/* Projects Section */}
      {activeTab === 'projects' && (
        <div className="space-y-5">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">Featured projects demonstrating practical skills</span>
            <button
              type="button"
              onClick={addProject}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Project</span>
            </button>
          </div>

          {projects.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 border border-dashed border-gray-300 rounded-2xl">
              <FolderGit2 className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-xs font-semibold text-gray-700">No projects added yet</p>
              <button
                type="button"
                onClick={addProject}
                className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:underline"
              >
                + Add your first project
              </button>
            </div>
          ) : (
            projects.map((proj, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-2xl p-5 shadow-2xs relative group"
              >
                <div className="flex justify-between items-center pb-2 mb-3 border-b border-gray-100">
                  <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-md">
                    Project #{idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeProject(idx)}
                    className="text-gray-400 hover:text-rose-600 p-1 rounded-lg hover:bg-rose-50 transition-colors"
                    title="Remove project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Project Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. AI Content Generator or E-Commerce App"
                      value={proj.name}
                      onChange={(e) => updateProject(idx, 'name', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Project / GitHub / Demo Link
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </div>
                      <input
                        type="url"
                        placeholder="e.g. https://github.com/username/project"
                        value={proj.link}
                        onChange={(e) => updateProject(idx, 'link', e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Project Description & Technologies Used
                    </label>
                    <textarea
                      rows={3}
                      placeholder="• Built a full-stack dashboard utilizing Next.js, Tailwind CSS, and Supabase&#10;• Implemented JWT authentication and Stripe webhook integration"
                      value={proj.description}
                      onChange={(e) => updateProject(idx, 'description', e.target.value)}
                      className="w-full p-2.5 text-xs font-mono border border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 leading-relaxed"
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Certifications Section */}
      {activeTab === 'certifications' && (
        <div className="space-y-5">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">Industry licenses, courses, and credentials</span>
            <button
              type="button"
              onClick={addCertification}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Certification</span>
            </button>
          </div>

          {certifications.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 border border-dashed border-gray-300 rounded-2xl">
              <Award className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-xs font-semibold text-gray-700">No certifications added yet</p>
              <button
                type="button"
                onClick={addCertification}
                className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:underline"
              >
                + Add your first certificate
              </button>
            </div>
          ) : (
            certifications.map((cert, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-2xl p-5 shadow-2xs relative group"
              >
                <div className="flex justify-between items-center pb-2 mb-3 border-b border-gray-100">
                  <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-md">
                    Certification #{idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeCertification(idx)}
                    className="text-gray-400 hover:text-rose-600 p-1 rounded-lg hover:bg-rose-50 transition-colors"
                    title="Remove certification"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Certificate Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. AWS Certified Solutions Architect - Associate"
                      value={cert.name}
                      onChange={(e) => updateCertification(idx, 'name', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Issuing Organization
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <Building className="w-3.5 h-3.5" />
                      </div>
                      <input
                        type="text"
                        placeholder="e.g. Amazon Web Services, Google, Coursera"
                        value={cert.issuer}
                        onChange={(e) => updateCertification(idx, 'issuer', e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Year / Date Issued
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <Calendar className="w-3.5 h-3.5" />
                      </div>
                      <input
                        type="text"
                        placeholder="e.g. 2024"
                        value={cert.year}
                        onChange={(e) => updateCertification(idx, 'year', e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default StepProjectsAndCertifications;
