import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import ProgressBar, { STEPS } from '../components/form/ProgressBar';
import StepPersonal from '../components/form/StepPersonal';
import StepSummary from '../components/form/StepSummary';
import StepExperience from '../components/form/StepExperience';
import StepEducation from '../components/form/StepEducation';
import StepSkills from '../components/form/StepSkills';
import StepProjectsAndCertifications from '../components/form/StepProjectsAndCertifications';
import { LinkedinIcon, GithubIcon } from '../components/SocialIcons';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  RotateCcw,
  Eye,
  Edit3,
  Mail,
  Phone,
  MapPin,
  Globe
} from 'lucide-react';

const Builder = () => {
  const { resumeData, resetResume } = useResume();
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [mobileTab, setMobileTab] = useState('form'); // 'form' | 'preview'

  // Validation function
  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      const { fullName, email, phone } = resumeData.personal;

      if (!fullName || !fullName.trim()) {
        newErrors.fullName = 'Full name is required';
      }

      if (!email || !email.trim()) {
        newErrors.email = 'Email address is required';
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
          newErrors.email = 'Please enter a valid email format (e.g. name@domain.com)';
        }
      }

      if (!phone || !phone.trim()) {
        newErrors.phone = 'Phone number is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < STEPS.length) {
        setCurrentStep((prev) => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleStepClick = (stepId) => {
    // If trying to move ahead from step 1, validate first
    if (currentStep === 1 && stepId > 1) {
      if (!validateStep(1)) return;
    }
    setCurrentStep(stepId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Header & Mobile Tab Switcher */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            ATS Resume Builder
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Real-time synchronization. ATS-optimized structure.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          {/* Mobile view switcher */}
          <div className="flex lg:hidden bg-gray-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setMobileTab('form')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                mobileTab === 'form'
                  ? 'bg-white text-indigo-600 shadow-2xs'
                  : 'text-gray-600'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Editor</span>
            </button>
            <button
              type="button"
              onClick={() => setMobileTab('preview')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                mobileTab === 'preview'
                  ? 'bg-white text-indigo-600 shadow-2xs'
                  : 'text-gray-600'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview</span>
            </button>
          </div>

          <button
            type="button"
            onClick={resetResume}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-gray-600 hover:text-gray-900 border border-gray-200 hover:bg-gray-100 transition-colors ml-auto sm:ml-0"
            title="Clear all fields"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Multi-Step Form */}
        <div
          className={`lg:col-span-7 space-y-6 ${
            mobileTab === 'preview' ? 'hidden lg:block' : 'block'
          }`}
        >
          {/* Progress Bar */}
          <ProgressBar
            currentStep={currentStep}
            onStepClick={handleStepClick}
          />

          {/* Form Step Body */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-7 shadow-xs">
            {currentStep === 1 && <StepPersonal errors={errors} />}
            {currentStep === 2 && <StepSummary />}
            {currentStep === 3 && <StepExperience />}
            {currentStep === 4 && <StepEducation />}
            {currentStep === 5 && <StepSkills />}
            {currentStep === 6 && <StepProjectsAndCertifications />}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-6 mt-8 border-t border-gray-100">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentStep === 1}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  currentStep === 1
                    ? 'text-gray-300 border border-gray-200 bg-gray-50 cursor-not-allowed'
                    : 'text-gray-700 border border-gray-300 hover:bg-gray-100'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              {currentStep < STEPS.length ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-all hover:translate-x-0.5"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200">
                  <CheckCircle className="w-4 h-4" />
                  <span>All Sections Completed!</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Live ATS Resume Preview */}
        <div
          className={`lg:col-span-5 lg:sticky lg:top-20 space-y-4 ${
            mobileTab === 'form' ? 'hidden lg:block' : 'block'
          }`}
        >
          <div className="flex justify-between items-center px-1">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-indigo-600" />
              Live ATS Preview
            </span>
            <span className="text-[11px] text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Auto-updating
            </span>
          </div>

          {/* Paper representation */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-7 text-gray-900 transition-all font-sans">
            {/* Header / Personal Details */}
            <div className="text-center pb-4 border-b border-gray-300">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 uppercase">
                {resumeData.personal.fullName || 'YOUR FULL NAME'}
              </h2>

              <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 text-[11px] sm:text-xs text-gray-600 mt-2">
                {resumeData.personal.email && (
                  <span className="flex items-center gap-1">
                    <Mail className="w-3 h-3 text-gray-400" />
                    {resumeData.personal.email}
                  </span>
                )}
                {resumeData.personal.phone && (
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3 text-gray-400" />
                    {resumeData.personal.phone}
                  </span>
                )}
                {resumeData.personal.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-gray-400" />
                    {resumeData.personal.location}
                  </span>
                )}
              </div>

              {/* Links line */}
              {(resumeData.personal.linkedin || resumeData.personal.github || resumeData.personal.website) && (
                <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 text-[11px] text-indigo-700 mt-1 font-medium">
                  {resumeData.personal.linkedin && (
                    <span className="flex items-center gap-1">
                      <LinkedinIcon className="w-3 h-3" />
                      {resumeData.personal.linkedin}
                    </span>
                  )}
                  {resumeData.personal.github && (
                    <span className="flex items-center gap-1">
                      <GithubIcon className="w-3 h-3" />
                      {resumeData.personal.github}
                    </span>
                  )}
                  {resumeData.personal.website && (
                    <span className="flex items-center gap-1">
                      <Globe className="w-3 h-3 text-gray-400" />
                      {resumeData.personal.website}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Summary */}
            {resumeData.summary && (
              <div className="mt-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-0.5 mb-1.5">
                  Professional Summary
                </h3>
                <p className="text-xs text-gray-700 leading-relaxed text-justify">
                  {resumeData.summary}
                </p>
              </div>
            )}

            {/* Experience */}
            {resumeData.experience && resumeData.experience.some((e) => e.company || e.role) && (
              <div className="mt-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-0.5 mb-2">
                  Work Experience
                </h3>
                <div className="space-y-3">
                  {resumeData.experience.map((exp, idx) => {
                    if (!exp.company && !exp.role) return null;
                    return (
                      <div key={idx} className="text-xs">
                        <div className="flex justify-between items-baseline font-bold text-gray-900">
                          <span>{exp.role || 'Job Role'}</span>
                          <span className="text-[11px] font-normal text-gray-500 shrink-0">
                            {exp.startDate} {exp.startDate && (exp.endDate || exp.current) ? '–' : ''}{' '}
                            {exp.current ? 'Present' : exp.endDate}
                          </span>
                        </div>
                        <div className="text-gray-700 italic text-[11px] mb-1">
                          {exp.company}
                        </div>
                        {exp.description && (
                          <div className="text-gray-700 text-[11px] leading-relaxed whitespace-pre-line pl-1">
                            {exp.description}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Education */}
            {resumeData.education && resumeData.education.some((e) => e.school || e.degree) && (
              <div className="mt-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-0.5 mb-2">
                  Education
                </h3>
                <div className="space-y-2">
                  {resumeData.education.map((edu, idx) => {
                    if (!edu.school && !edu.degree) return null;
                    return (
                      <div key={idx} className="text-xs">
                        <div className="flex justify-between items-baseline font-bold text-gray-900">
                          <span>{edu.degree || 'Degree'}</span>
                          <span className="text-[11px] font-normal text-gray-500 shrink-0">
                            {edu.startDate} {edu.startDate && edu.endDate ? '–' : ''} {edu.endDate}
                          </span>
                        </div>
                        <div className="flex justify-between text-[11px] text-gray-700">
                          <span>{edu.school}</span>
                          {edu.grade && <span className="italic">{edu.grade}</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Skills */}
            {resumeData.skills && resumeData.skills.length > 0 && (
              <div className="mt-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-0.5 mb-1.5">
                  Skills
                </h3>
                <p className="text-xs text-gray-800 leading-relaxed">
                  {resumeData.skills.join(' • ')}
                </p>
              </div>
            )}

            {/* Projects */}
            {resumeData.projects && resumeData.projects.some((p) => p.name) && (
              <div className="mt-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-0.5 mb-2">
                  Key Projects
                </h3>
                <div className="space-y-2">
                  {resumeData.projects.map((proj, idx) => {
                    if (!proj.name) return null;
                    return (
                      <div key={idx} className="text-xs">
                        <div className="flex justify-between items-center font-bold text-gray-900">
                          <span>{proj.name}</span>
                          {proj.link && (
                            <span className="text-[10px] text-indigo-600 font-normal truncate max-w-[140px]">
                              {proj.link.replace(/^https?:\/\//, '')}
                            </span>
                          )}
                        </div>
                        {proj.description && (
                          <div className="text-[11px] text-gray-700 whitespace-pre-line leading-relaxed pl-1">
                            {proj.description}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Certifications */}
            {resumeData.certifications && resumeData.certifications.some((c) => c.name) && (
              <div className="mt-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-0.5 mb-1.5">
                  Certifications
                </h3>
                <div className="space-y-1">
                  {resumeData.certifications.map((cert, idx) => {
                    if (!cert.name) return null;
                    return (
                      <div key={idx} className="flex justify-between text-xs text-gray-800">
                        <span>
                          <strong className="font-semibold">{cert.name}</strong>
                          {cert.issuer && ` — ${cert.issuer}`}
                        </span>
                        {cert.year && <span className="text-[11px] text-gray-500">{cert.year}</span>}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Builder;
