import React from 'react';
import { useResume } from '../context/ResumeContext';
import { User, Briefcase, GraduationCap, Code, FolderGit2, Award, FileText, RotateCcw } from 'lucide-react';

const Builder = () => {
  const {
    resumeData,
    updatePersonal,
    updateSummary,
    addExperience,
    addEducation,
    addSkill,
    addProject,
    addCertification,
    resetResume,
  } = useResume();

  return (
    <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Resume Builder</h1>
          <p className="text-sm text-gray-500">
            Fill in your details below. Changes sync automatically in real-time.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={resetResume}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-gray-600 hover:text-gray-900 border border-gray-200 hover:bg-gray-100 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Data</span>
          </button>
        </div>
      </div>

      {/* Main Builder Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Form Sections Placeholder */}
        <div className="space-y-6">
          {/* Personal Info Box */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 mb-4 text-indigo-600 font-semibold">
              <User className="w-5 h-5" />
              <h2 className="text-lg text-gray-900">Personal Information</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  value={resumeData.personal.fullName}
                  onChange={(e) => updatePersonal('fullName', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="e.g. john@example.com"
                  value={resumeData.personal.email}
                  onChange={(e) => updatePersonal('email', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  placeholder="e.g. +1 555-019-2834"
                  value={resumeData.personal.phone}
                  onChange={(e) => updatePersonal('phone', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  placeholder="e.g. New York, NY"
                  value={resumeData.personal.location}
                  onChange={(e) => updatePersonal('location', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">LinkedIn</label>
                <input
                  type="text"
                  placeholder="e.g. linkedin.com/in/johndoe"
                  value={resumeData.personal.linkedin}
                  onChange={(e) => updatePersonal('linkedin', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">GitHub</label>
                <input
                  type="text"
                  placeholder="e.g. github.com/johndoe"
                  value={resumeData.personal.github}
                  onChange={(e) => updatePersonal('github', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 mb-4 text-indigo-600 font-semibold">
              <FileText className="w-5 h-5" />
              <h2 className="text-lg text-gray-900">Professional Summary</h2>
            </div>
            <textarea
              rows={3}
              placeholder="Write a concise 2-3 sentence overview of your professional background, core expertise, and key accomplishments..."
              value={resumeData.summary}
              onChange={(e) => updateSummary(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Section Placeholders Guide */}
          <div className="bg-indigo-50/60 border border-indigo-100 rounded-2xl p-6">
            <h3 className="font-semibold text-indigo-900 mb-2">Sections Configured in Central State:</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-indigo-700">
              <div className="flex items-center gap-1.5 bg-white p-2.5 rounded-lg border border-indigo-100">
                <Briefcase className="w-4 h-4 text-indigo-500" />
                <span>Experience ({resumeData.experience.length})</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white p-2.5 rounded-lg border border-indigo-100">
                <GraduationCap className="w-4 h-4 text-indigo-500" />
                <span>Education ({resumeData.education.length})</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white p-2.5 rounded-lg border border-indigo-100">
                <Code className="w-4 h-4 text-indigo-500" />
                <span>Skills ({resumeData.skills.length})</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white p-2.5 rounded-lg border border-indigo-100">
                <FolderGit2 className="w-4 h-4 text-indigo-500" />
                <span>Projects ({resumeData.projects.length})</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white p-2.5 rounded-lg border border-indigo-100">
                <Award className="w-4 h-4 text-indigo-500" />
                <span>Certs ({resumeData.certifications.length})</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Resume Preview Placeholder */}
        <div className="lg:sticky lg:top-24 h-fit">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
            <div className="border-b border-gray-200 pb-4 mb-6 text-center">
              <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">
                {resumeData.personal.fullName || 'YOUR NAME HERE'}
              </h2>
              <div className="text-xs text-gray-600 mt-2 flex flex-wrap justify-center gap-3">
                {resumeData.personal.email && <span>{resumeData.personal.email}</span>}
                {resumeData.personal.phone && <span>• {resumeData.personal.phone}</span>}
                {resumeData.personal.location && <span>• {resumeData.personal.location}</span>}
                {resumeData.personal.linkedin && <span>• {resumeData.personal.linkedin}</span>}
                {resumeData.personal.github && <span>• {resumeData.personal.github}</span>}
              </div>
            </div>

            {/* Summary Preview */}
            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-800 border-b border-gray-300 pb-1 mb-2">
                Professional Summary
              </h3>
              <p className="text-xs text-gray-700 leading-relaxed">
                {resumeData.summary || 'Summary statement will appear here as you type in the editor...'}
              </p>
            </div>

            {/* Template placeholder indicator */}
            <div className="mt-8 p-4 rounded-xl border border-dashed border-gray-300 bg-gray-50 text-center">
              <p className="text-xs font-medium text-gray-500">
                Template Preview Area (ATS Formatted)
              </p>
              <p className="text-[11px] text-gray-400 mt-1">
                Connected to central ResumeContext state. Ready for template modularization.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Builder;
