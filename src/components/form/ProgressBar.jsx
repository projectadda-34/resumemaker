import React from 'react';
import { User, FileText, Briefcase, GraduationCap, Code, FolderGit2, Check } from 'lucide-react';

export const STEPS = [
  { id: 1, name: 'Personal', icon: User, desc: 'Contact details' },
  { id: 2, name: 'Summary', icon: FileText, desc: 'Professional bio' },
  { id: 3, name: 'Experience', icon: Briefcase, desc: 'Work history' },
  { id: 4, name: 'Education', icon: GraduationCap, desc: 'Degrees & schools' },
  { id: 5, name: 'Skills', icon: Code, desc: 'Technical skills' },
  { id: 6, name: 'Projects & Certs', icon: FolderGit2, desc: 'Portfolio & awards' },
];

const ProgressBar = ({ currentStep, onStepClick }) => {
  const progressPercent = Math.round(((currentStep - 1) / (STEPS.length - 1)) * 100);

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-xs mb-6">
      {/* Progress percentage & step info */}
      <div className="flex justify-between items-center mb-3">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
            Step {currentStep} of {STEPS.length}
          </span>
          <h2 className="text-base font-bold text-gray-900 mt-1">
            {STEPS[currentStep - 1].name}
          </h2>
        </div>
        <div className="text-right">
          <span className="text-xs font-semibold text-gray-500">Completed</span>
          <p className="text-sm font-extrabold text-indigo-600">{progressPercent}%</p>
        </div>
      </div>

      {/* Progress Bar line */}
      <div className="w-full bg-gray-100 rounded-full h-2 mb-4 overflow-hidden">
        <div
          className="bg-indigo-600 h-2 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Step Pills for Desktop & Tablet */}
      <div className="grid grid-cols-6 gap-2">
        {STEPS.map((step) => {
          const Icon = step.icon;
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => onStepClick(step.id)}
              className={`flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1.5 p-2 rounded-xl text-left transition-all ${
                isCurrent
                  ? 'bg-indigo-600 text-white font-medium shadow-sm'
                  : isCompleted
                  ? 'bg-indigo-50/80 text-indigo-700 hover:bg-indigo-100/70'
                  : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                  isCurrent
                    ? 'bg-white/20 text-white'
                    : isCompleted
                    ? 'bg-indigo-200 text-indigo-800'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Icon className="w-3.5 h-3.5" />}
              </div>
              <span className="text-[11px] sm:text-xs truncate hidden md:inline">
                {step.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;
