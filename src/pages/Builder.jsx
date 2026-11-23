import React, { useState, useMemo, useEffect } from 'react';
import { useResume } from '../context/ResumeContext';
import ProgressBar, { STEPS } from '../components/form/ProgressBar';
import StepPersonal from '../components/form/StepPersonal';
import StepSummary from '../components/form/StepSummary';
import StepExperience from '../components/form/StepExperience';
import StepEducation from '../components/form/StepEducation';
import StepSkills from '../components/form/StepSkills';
import StepProjectsAndCertifications from '../components/form/StepProjectsAndCertifications';
import TemplateSelector from '../components/TemplateSelector';
import ClassicTemplate from '../templates/ClassicTemplate';
import ModernTemplate from '../templates/ModernTemplate';
import CompactTemplate from '../templates/CompactTemplate';
import AtsScorePanel from '../components/AtsScorePanel';
import { exportToDocx } from '../utils/docxExport';
import { getResumeFileName, hasContactInfo } from '../utils/textUtils';
import { calculateAtsScore } from '../utils/atsScorer';
import {
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Eye,
  Edit3,
  FileDown,
  FileType,
  Loader2,
  Sparkles,
  ChevronDown,
  ChevronUp,
  FileSpreadsheet,
  AlertTriangle,
  X
} from 'lucide-react';

const Builder = () => {
  const {
    resumeData,
    selectedTemplate,
    setSelectedTemplate,
    loadSampleData,
    resetResume
  } = useResume();

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [mobileTab, setMobileTab] = useState('form'); // 'form' | 'preview' | 'score'
  const [isExportingDocx, setIsExportingDocx] = useState(false);
  const [showAtsPanel, setShowAtsPanel] = useState(true);
  const [showResetModal, setShowResetModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Page title for SEO & UX
  useEffect(() => {
    document.title = 'ATS Resume Builder | ResumeMaker';
  }, []);

  // Quick helper to show temporary toast
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Live ATS Score for top bar
  const atsScore = useMemo(() => {
    return calculateAtsScore(resumeData).totalScore;
  }, [resumeData]);

  const scoreBadgeColor =
    atsScore >= 80
      ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
      : atsScore >= 55
      ? 'bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100'
      : 'bg-rose-50 text-rose-700 border-rose-300 hover:bg-rose-100';

  // Check if resume is currently empty
  const isResumeEmpty = !resumeData.personal.fullName && !resumeData.summary && resumeData.skills.length === 0;

  // Basic validation check for step 1
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
    if (currentStep === 1 && stepId > 1) {
      if (!validateStep(1)) return;
    }
    setCurrentStep(stepId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Text-based PDF download
  const handleDownloadPdf = () => {
    const originalTitle = document.title;
    const fileName = getResumeFileName(resumeData.personal.fullName, 'pdf');
    document.title = fileName.replace('.pdf', '');

    window.print();

    setTimeout(() => {
      document.title = originalTitle;
    }, 1500);
  };

  // ATS-friendly .docx download
  const handleDownloadDocx = async () => {
    try {
      setIsExportingDocx(true);
      const fileName = getResumeFileName(resumeData.personal.fullName, 'docx');
      await exportToDocx(resumeData, fileName);
      showToast('Word (.docx) downloaded successfully!');
    } catch (err) {
      console.error('Failed to export DOCX:', err);
      alert('Failed to generate DOCX file. Please check console for details.');
    } finally {
      setIsExportingDocx(false);
    }
  };

  // Load sample demo profile
  const handleLoadSample = () => {
    loadSampleData();
    showToast('Loaded demo resume data!');
  };

  // Confirm and reset resume
  const handleConfirmReset = () => {
    resetResume();
    setShowResetModal(false);
    setCurrentStep(1);
    showToast('Resume cleared to default.');
  };

  return (
    <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-gray-900 text-white px-4 py-2.5 rounded-xl text-xs font-semibold shadow-xl flex items-center gap-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Confirmation Modal for Reset */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/40 backdrop-blur-xs no-print">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-gray-100">
            <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              Reset All Resume Data?
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed mb-6">
              This will permanently delete all personal details, experience, education, and skills stored in your browser. This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowResetModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-700 border border-gray-300 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmReset}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 transition-colors shadow-2xs"
              >
                Yes, Clear All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Header & Action Buttons */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-4 border-b border-gray-200 no-print">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            ATS Resume Builder
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Real-time synchronization. Single-column ATS templates with live ATS scoring.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-between md:justify-end">
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
            <button
              type="button"
              onClick={() => setMobileTab('score')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                mobileTab === 'score'
                  ? 'bg-white text-indigo-600 shadow-2xs'
                  : 'text-gray-600'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Score ({atsScore})</span>
            </button>
          </div>

          {/* Load Sample Data Demo Button */}
          <button
            type="button"
            onClick={handleLoadSample}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 transition-colors shadow-2xs"
            title="Populate complete sample data for demo"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-indigo-600" />
            <span>Load Sample Data</span>
          </button>

          {/* ATS Score quick pill */}
          <button
            type="button"
            onClick={() => setShowAtsPanel((prev) => !prev)}
            className={`hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${scoreBadgeColor}`}
            title="Click to toggle ATS Score & Scanner"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>ATS Score: {atsScore}/100</span>
            {showAtsPanel ? <ChevronUp className="w-3.5 h-3.5 ml-0.5" /> : <ChevronDown className="w-3.5 h-3.5 ml-0.5" />}
          </button>

          {/* Download PDF Button */}
          <button
            type="button"
            onClick={handleDownloadPdf}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
            title="Download text-based selectable PDF"
          >
            <FileDown className="w-4 h-4" />
            <span>Download PDF</span>
          </button>

          {/* Download DOCX Button */}
          <button
            type="button"
            onClick={handleDownloadDocx}
            disabled={isExportingDocx}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-gray-800 bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400 shadow-2xs transition-all cursor-pointer disabled:opacity-60"
            title="Download editable Microsoft Word document"
          >
            {isExportingDocx ? (
              <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
            ) : (
              <FileType className="w-4 h-4 text-indigo-600" />
            )}
            <span>{isExportingDocx ? 'Generating...' : 'Download DOCX'}</span>
          </button>

          {/* Reset / Clear All Button */}
          <button
            type="button"
            onClick={() => setShowResetModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:text-rose-700 border border-rose-200 hover:bg-rose-50 transition-colors"
            title="Clear all fields with confirmation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear All</span>
          </button>
        </div>
      </div>

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Multi-Step Form */}
        <div
          className={`lg:col-span-6 xl:col-span-6 space-y-6 no-print ${
            mobileTab !== 'form' ? 'hidden lg:block' : 'block'
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
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleDownloadPdf}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-all"
                  >
                    <FileDown className="w-4 h-4" />
                    <span>Download PDF</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleDownloadDocx}
                    disabled={isExportingDocx}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-gray-800 bg-white border border-gray-300 hover:bg-gray-50 shadow-sm transition-all"
                  >
                    <FileType className="w-4 h-4 text-indigo-600" />
                    <span>DOCX</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: ATS Score Panel, Template Selector & Live Resume Preview */}
        <div
          className={`lg:col-span-6 xl:col-span-6 lg:sticky lg:top-20 space-y-4 ${
            mobileTab === 'form' ? 'hidden lg:block' : 'block'
          }`}
        >
          {/* ATS Score Panel */}
          <div className={`no-print ${showAtsPanel || mobileTab === 'score' ? 'block' : 'hidden'}`}>
            <AtsScorePanel onClose={() => setShowAtsPanel(false)} />
          </div>

          {/* Template Selector Card (hidden on print) */}
          <div className={`no-print ${mobileTab === 'score' ? 'hidden sm:block' : 'block'}`}>
            <TemplateSelector
              selectedTemplate={selectedTemplate}
              onSelectTemplate={setSelectedTemplate}
            />
          </div>

          {/* Paper A4 Representation */}
          <div className={`w-full flex justify-center overflow-x-auto pb-4 ${mobileTab === 'score' ? 'hidden sm:flex' : 'flex'}`}>
            <div
              id="resume-preview-container"
              className="bg-white border border-gray-200 shadow-md rounded-xl overflow-hidden w-full transition-all relative"
            >
              {/* Empty state hint */}
              {isResumeEmpty && (
                <div className="p-10 text-center bg-gray-50/80 border-b border-gray-200 no-print">
                  <p className="text-xs font-semibold text-gray-700 mb-1">
                    Your resume is currently empty
                  </p>
                  <p className="text-[11px] text-gray-500 mb-3">
                    Start by filling your information on the left, or load our complete demo resume in one click.
                  </p>
                  <button
                    type="button"
                    onClick={handleLoadSample}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-indigo-600 bg-white border border-indigo-200 hover:bg-indigo-50 shadow-2xs"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Load Demo Profile</span>
                  </button>
                </div>
              )}

              {selectedTemplate === 'classic' && <ClassicTemplate data={resumeData} />}
              {selectedTemplate === 'modern' && <ModernTemplate data={resumeData} />}
              {selectedTemplate === 'compact' && <CompactTemplate data={resumeData} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Builder;
