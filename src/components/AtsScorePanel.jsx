import React, { useState, useMemo } from 'react';
import { useResume } from '../context/ResumeContext';
import { calculateAtsScore, matchJobDescription } from '../utils/atsScorer';
import {
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  Search,
  ChevronDown,
  ChevronUp,
  X,
  Plus
} from 'lucide-react';

const AtsScorePanel = ({ isOpen, onClose }) => {
  const { resumeData, addSkill } = useResume();
  const [activeTab, setActiveTab] = useState('checklist'); // 'checklist' | 'jd_match'
  const [jobDescription, setJobDescription] = useState('');

  // Real-time calculation of ATS score
  const { totalScore, checks, stats } = useMemo(() => {
    return calculateAtsScore(resumeData);
  }, [resumeData]);

  // Real-time calculation of JD keyword matches
  const { matchPercentage, matchedKeywords, missingKeywords } = useMemo(() => {
    return matchJobDescription(jobDescription, resumeData);
  }, [jobDescription, resumeData]);

  // SVG Circular progress constants
  const radius = 40;
  const stroke = 7;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (totalScore / 100) * circumference;

  // Grade and color
  let scoreColor = 'text-emerald-600';
  let strokeColor = '#10b981'; // emerald-500
  let badgeBg = 'bg-emerald-50 text-emerald-700 border-emerald-200';
  let scoreGrade = 'Great ATS Pass Rate';

  if (totalScore < 50) {
    scoreColor = 'text-rose-600';
    strokeColor = '#f43f5e'; // rose-500
    badgeBg = 'bg-rose-50 text-rose-700 border-rose-200';
    scoreGrade = 'Needs Improvement';
  } else if (totalScore < 75) {
    scoreColor = 'text-amber-600';
    strokeColor = '#f59e0b'; // amber-500
    badgeBg = 'bg-amber-50 text-amber-700 border-amber-200';
    scoreGrade = 'Good, but can improve';
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden transition-all">
      {/* Header bar */}
      <div className="flex justify-between items-center px-4 sm:px-6 py-4 border-b border-gray-100 bg-gray-50/70">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900 leading-tight">
              ATS Resume Scanner & Score
            </h3>
            <p className="text-[11px] text-gray-500">
              Evaluates parsing criteria used by Workday, Greenhouse & Taleo
            </p>
          </div>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 p-1.5 rounded-lg hover:bg-gray-200/60 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="p-4 sm:p-6">
        {/* Score Overview & Circular Meter */}
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-gray-100">
          {/* Circular Progress Meter */}
          <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
            <svg height="112" width="112" className="rotate-[-90deg]">
              <circle
                stroke="#e5e7eb"
                fill="transparent"
                strokeWidth={stroke}
                r={normalizedRadius}
                cx="56"
                cy="56"
              />
              <circle
                stroke={strokeColor}
                fill="transparent"
                strokeWidth={stroke}
                strokeDasharray={`${circumference} ${circumference}`}
                style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.5s ease-out' }}
                strokeLinecap="round"
                r={normalizedRadius}
                cx="56"
                cy="56"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className={`text-2xl font-black ${scoreColor} tracking-tight`}>
                {totalScore}
              </span>
              <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                out of 100
              </span>
            </div>
          </div>

          {/* Score breakdown & Quick Stats */}
          <div className="flex-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border mb-2 uppercase tracking-wide">
              <span className={badgeBg}>{scoreGrade}</span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed mb-3">
              Recruiters filter resumes through ATS screening before humans review them. Resumes scoring 80+ have an 85% higher interview callback rate.
            </p>

            {/* Quick Metrics Chips */}
            <div className="flex flex-wrap gap-2 text-[11px] justify-center sm:justify-start">
              <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-lg font-medium">
                Words: <strong>{stats.totalWords}</strong>
              </span>
              <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-lg font-medium">
                Action Verbs: <strong>{stats.actionVerbCount}</strong>
              </span>
              <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-lg font-medium">
                Metrics & Numbers: <strong>{stats.bulletsWithMetrics}</strong>
              </span>
              <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-lg font-medium">
                Skills: <strong>{stats.skillsCount}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Tab selection: Checklist vs Job Description Matcher */}
        <div className="flex border-b border-gray-200 mt-4 mb-5">
          <button
            type="button"
            onClick={() => setActiveTab('checklist')}
            className={`py-2 px-4 text-xs font-bold border-b-2 transition-colors ${
              activeTab === 'checklist'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            ATS Rule Checklist ({checks.filter((c) => c.passed).length}/{checks.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('jd_match')}
            className={`flex items-center gap-1.5 py-2 px-4 text-xs font-bold border-b-2 transition-colors ${
              activeTab === 'jd_match'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Job Description Matcher</span>
          </button>
        </div>

        {/* Tab 1: Checklist */}
        {activeTab === 'checklist' && (
          <div className="space-y-3">
            {checks.map((check) => (
              <div
                key={check.id}
                className={`p-3.5 rounded-xl border transition-all ${
                  check.passed
                    ? 'bg-emerald-50/30 border-emerald-100'
                    : 'bg-amber-50/40 border-amber-200/80'
                }`}
              >
                <div className="flex justify-between items-start gap-2">
                  <div className="flex items-start gap-2.5">
                    {check.passed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 leading-tight">
                        {check.title}
                      </h4>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        {check.desc}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-md shrink-0 ${
                      check.passed
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {check.score} / {check.maxScore} pts
                  </span>
                </div>

                {check.suggestion && (
                  <div className="mt-2 text-[11px] text-amber-900 bg-amber-100/70 p-2 rounded-lg font-medium leading-relaxed">
                    💡 <strong>Tip to score {check.maxScore} pts:</strong> {check.suggestion}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Job Description Matcher */}
        {activeTab === 'jd_match' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Paste the Job Description (JD) below:
              </label>
              <textarea
                rows={4}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the requirements, qualifications, and responsibilities from LinkedIn, Indeed, or company career page..."
                className="w-full p-3 text-xs border border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all leading-relaxed"
              />
            </div>

            {jobDescription.trim() ? (
              <div className="space-y-4">
                {/* Match percentage meter */}
                <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-indigo-950">
                      Keyword Match Rate
                    </span>
                    <p className="text-[11px] text-indigo-700 mt-0.5">
                      {matchedKeywords.length} of {matchedKeywords.length + missingKeywords.length} key terms found in your resume
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-extrabold text-indigo-600">
                      {matchPercentage}%
                    </span>
                  </div>
                </div>

                {/* Missing Keywords */}
                {missingKeywords.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-rose-700 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        Missing Keywords from Job Description ({missingKeywords.length})
                      </span>
                      <span className="text-[10px] text-gray-400">Click (+) to add to skills</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 p-3 bg-rose-50/40 border border-rose-200/70 rounded-xl">
                      {missingKeywords.map((kw) => (
                        <button
                          key={kw}
                          type="button"
                          onClick={() => addSkill(kw)}
                          className="inline-flex items-center gap-1 text-[11px] bg-white hover:bg-rose-100 border border-rose-200 text-rose-800 px-2.5 py-1 rounded-lg transition-colors font-medium"
                          title="Add to skills"
                        >
                          <Plus className="w-3 h-3 text-rose-500" />
                          <span>{kw}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Matched Keywords */}
                {matchedKeywords.length > 0 && (
                  <div>
                    <span className="block text-xs font-bold text-emerald-700 mb-2 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Matched Keywords ({matchedKeywords.length})
                    </span>
                    <div className="flex flex-wrap gap-1.5 p-3 bg-emerald-50/40 border border-emerald-200/70 rounded-xl">
                      {matchedKeywords.map((kw) => (
                        <span
                          key={kw}
                          className="text-[11px] bg-white border border-emerald-200 text-emerald-800 px-2.5 py-1 rounded-lg font-medium"
                        >
                          ✓ {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-6 text-center border border-dashed border-gray-300 rounded-xl bg-gray-50 text-xs text-gray-500">
                Paste any job posting above to instantly compare your resume's keyword density against applicant tracking system requirements.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AtsScorePanel;
