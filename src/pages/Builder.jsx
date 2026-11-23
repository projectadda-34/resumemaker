import React, { useState } from 'react';
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
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  RotateCcw,
  Eye,
  Edit3,
  Printer,
  Sparkles
} from 'lucide-react';

const Builder = () => {
  const { resumeData, resetResume } = useResume();
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [mobileTab, setMobileTab] = useState('form'); // 'form' | 'preview'
  const [selectedTemplate, setSelectedTemplate] = useState('classic'); // 'classic' | 'modern' | 'compact'

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

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Header & Mobile Tab Switcher */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-gray-200 no-print">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            ATS Resume Builder
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Real-time synchronization. Single-column ATS templates.
          </p>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end">
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
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-2xs transition-all"
            title="Print or export as PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / PDF</span>
          </button>

          <button
            type="button"
            onClick={resetResume}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-gray-600 hover:text-gray-900 border border-gray-200 hover:bg-gray-100 transition-colors"
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
          className={`lg:col-span-6 xl:col-span-6 space-y-6 no-print ${
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
                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm transition-all"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Download / Print PDF</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Template Selector & Live Resume Preview */}
        <div
          className={`lg:col-span-6 xl:col-span-6 lg:sticky lg:top-20 space-y-4 ${
            mobileTab === 'form' ? 'hidden lg:block' : 'block'
          }`}
        >
          {/* Template Selector Card (hidden on print) */}
          <div className="no-print">
            <TemplateSelector
              selectedTemplate={selectedTemplate}
              onSelectTemplate={setSelectedTemplate}
            />
          </div>

          {/* Paper A4 Representation */}
          <div className="w-full flex justify-center overflow-x-auto pb-4">
            <div
              id="resume-preview-container"
              className="bg-white border border-gray-200 shadow-md rounded-xl overflow-hidden w-full transition-all"
            >
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
