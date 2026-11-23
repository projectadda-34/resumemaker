import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { FileText, Sparkles, Lightbulb } from 'lucide-react';

const SUMMARY_EXAMPLES = [
  {
    role: 'Full Stack Developer',
    text: 'Results-driven Full Stack Developer with 4+ years of experience designing and deploying scalable web applications using React, Node.js, and TypeScript. Proven track record of improving system performance by 35% and collaborating with cross-functional teams to deliver enterprise SaaS products.',
  },
  {
    role: 'Frontend Engineer',
    text: 'Detail-oriented Frontend Engineer passionate about crafting intuitive, high-performance user interfaces with React, Next.js, and Tailwind CSS. Experienced in building responsive designs, optimizing Core Web Vitals, and maintaining comprehensive component design systems.',
  },
  {
    role: 'Software Engineer',
    text: 'Software Engineer with a strong foundation in data structures, algorithms, and microservices architecture. Skilled in building resilient backend APIs, automated CI/CD pipelines, and writing maintainable unit and integration tests.',
  },
];

const StepSummary = () => {
  const { resumeData, updateSummary } = useResume();
  const charCount = resumeData.summary ? resumeData.summary.length : 0;
  const wordCount = resumeData.summary ? resumeData.summary.trim().split(/\s+/).filter(Boolean).length : 0;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900">Professional Summary</h3>
        <p className="text-sm text-gray-500">
          A compelling 2–4 sentence summary highlighting your core expertise, achievements, and career focus.
        </p>
      </div>

      {/* Textarea */}
      <div className="relative">
        <label className="block text-xs font-semibold text-gray-700 mb-1">
          Summary Statement
        </label>
        <textarea
          rows={6}
          value={resumeData.summary}
          onChange={(e) => updateSummary(e.target.value)}
          placeholder="e.g. Enthusiastic and results-oriented Software Engineer with experience in building high-scale web apps..."
          className="w-full p-3.5 text-sm border border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all leading-relaxed"
        />
        <div className="flex justify-between items-center text-xs text-gray-400 mt-1 px-1">
          <span>Target: 40–80 words (ATS standard)</span>
          <span className={`${wordCount > 100 ? 'text-amber-600 font-medium' : ''}`}>
            {wordCount} words ({charCount} characters)
          </span>
        </div>
      </div>

      {/* Quick Suggestions / Sample Prompts */}
      <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-4">
        <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-900 mb-2">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span>Quick Inspiration (Click to apply)</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {SUMMARY_EXAMPLES.map((example) => (
            <button
              key={example.role}
              type="button"
              onClick={() => updateSummary(example.text)}
              className="text-xs bg-white hover:bg-indigo-600 hover:text-white text-indigo-700 border border-indigo-200 px-3 py-1.5 rounded-lg transition-colors shadow-2xs font-medium text-left"
            >
              + {example.role}
            </button>
          ))}
        </div>
      </div>

      {/* ATS Tip Banner */}
      <div className="flex items-start gap-3 bg-amber-50 border border-amber-200/80 rounded-xl p-3.5 text-xs text-amber-800">
        <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold">ATS Tip:</span> Avoid generic buzzwords like "hardworking team player". Instead, lead with your job title, years of experience, and 2-3 tangible skill keywords matching your target role.
        </div>
      </div>
    </div>
  );
};

export default StepSummary;
