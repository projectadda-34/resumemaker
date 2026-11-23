import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Code, Plus, X, Sparkles, Check } from 'lucide-react';

const SUGGESTED_SKILLS = [
  'JavaScript', 'TypeScript', 'React.js', 'Next.js', 'Node.js',
  'Python', 'Tailwind CSS', 'HTML5 & CSS3', 'Git & GitHub', 'REST APIs',
  'GraphQL', 'PostgreSQL', 'MongoDB', 'Docker', 'AWS', 'CI/CD',
  'Redux', 'Jest', 'Agile / Scrum', 'System Design'
];

const StepSkills = () => {
  const { resumeData, addSkill, removeSkill, setSkills } = useResume();
  const { skills } = resumeData;
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAdd();
    }
  };

  const handleAdd = () => {
    const trimmed = inputValue.trim().replace(/^,+|,+$/g, '');
    if (trimmed && !skills.includes(trimmed)) {
      addSkill(trimmed);
      setInputValue('');
    }
  };

  const toggleSuggestedSkill = (skill) => {
    if (skills.includes(skill)) {
      const idx = skills.indexOf(skill);
      removeSkill(idx);
    } else {
      addSkill(skill);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900">Skills & Competencies</h3>
        <p className="text-sm text-gray-500">
          ATS scans for exact keyword matches from job descriptions. Type a skill and press <kbd className="px-1.5 py-0.5 text-xs bg-gray-100 border border-gray-300 rounded font-mono">Enter</kbd>.
        </p>
      </div>

      {/* Input bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <Code className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a skill (e.g. React.js, Python, Docker) and press Enter"
            className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
          />
        </div>
        <button
          type="button"
          onClick={handleAdd}
          disabled={!inputValue.trim()}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white rounded-xl text-sm font-semibold transition-all inline-flex items-center gap-1 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add</span>
        </button>
      </div>

      {/* Current Added Skills (Tag Cloud) */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
            Your Skills ({skills.length})
          </label>
          {skills.length > 0 && (
            <button
              type="button"
              onClick={() => setSkills([])}
              className="text-xs text-rose-500 hover:underline"
            >
              Clear all
            </button>
          )}
        </div>

        {skills.length === 0 ? (
          <div className="p-6 text-center border border-dashed border-gray-300 rounded-xl bg-gray-50 text-gray-400 text-xs">
            No skills added yet. Type in the box above or click any recommendation below.
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 p-3 bg-white border border-gray-200 rounded-xl min-h-[56px]">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200 group transition-all"
              >
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => removeSkill(index)}
                  className="text-indigo-400 hover:text-indigo-900 focus:outline-none"
                  title="Remove skill"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Suggested Skills */}
      <div className="bg-gray-50 border border-gray-200/80 rounded-2xl p-4">
        <div className="flex items-center gap-1.5 text-xs font-bold text-gray-700 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>Popular Tech & ATS Keywords (Click to toggle)</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {SUGGESTED_SKILLS.map((item) => {
            const isSelected = skills.includes(item);
            return (
              <button
                key={item}
                type="button"
                onClick={() => toggleSuggestedSkill(item)}
                className={`text-xs px-2.5 py-1.5 rounded-lg border font-medium flex items-center gap-1 transition-all ${
                  isSelected
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-2xs'
                    : 'bg-white border-gray-300 text-gray-700 hover:border-indigo-400 hover:text-indigo-600'
                }`}
              >
                {isSelected ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3 text-gray-400" />}
                <span>{item}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StepSkills;
