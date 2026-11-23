import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Briefcase, Plus, Trash2, Calendar, Building2, CheckSquare, Square } from 'lucide-react';

const StepExperience = () => {
  const { resumeData, addExperience, updateExperience, removeExperience } = useResume();
  const { experience } = resumeData;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Work Experience</h3>
          <p className="text-sm text-gray-500">
            List your relevant roles in reverse-chronological order (most recent first).
          </p>
        </div>
        <button
          type="button"
          onClick={addExperience}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-2xs transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Position</span>
        </button>
      </div>

      {experience.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 border border-dashed border-gray-300 rounded-2xl">
          <Briefcase className="w-10 h-10 text-gray-400 mx-auto mb-2" />
          <p className="text-sm font-semibold text-gray-700">No experience added yet</p>
          <p className="text-xs text-gray-400 mt-1 mb-4">Add internships, freelance, or full-time jobs</p>
          <button
            type="button"
            onClick={addExperience}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add First Position</span>
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          {experience.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl p-5 shadow-2xs relative group transition-all hover:border-gray-300"
            >
              <div className="flex justify-between items-center pb-3 mb-4 border-b border-gray-100">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                  Position #{index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeExperience(index)}
                  className="text-gray-400 hover:text-rose-600 p-1 rounded-lg hover:bg-rose-50 transition-colors"
                  title="Remove position"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Role / Title */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Job Title / Role
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Senior Frontend Engineer"
                    value={item.role}
                    onChange={(e) => updateExperience(index, 'role', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
                  />
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Company Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      placeholder="e.g. Google, Stripe, Acme Corp"
                      value={item.company}
                      onChange={(e) => updateExperience(index, 'company', e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
                    />
                  </div>
                </div>

                {/* Start Date */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Start Date
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      placeholder="e.g. Jan 2022"
                      value={item.startDate}
                      onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
                    />
                  </div>
                </div>

                {/* End Date & Currently Working Checkbox */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold text-gray-700">
                      End Date
                    </label>
                    <label className="flex items-center gap-1.5 text-xs text-indigo-700 font-medium cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={item.current || false}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          updateExperience(index, 'current', isChecked);
                          if (isChecked) {
                            updateExperience(index, 'endDate', 'Present');
                          } else {
                            updateExperience(index, 'endDate', '');
                          }
                        }}
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5 cursor-pointer"
                      />
                      <span>Currently working here</span>
                    </label>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      placeholder={item.current ? 'Present' : 'e.g. Dec 2024'}
                      value={item.current ? 'Present' : item.endDate}
                      disabled={item.current}
                      onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                      className={`w-full pl-9 pr-3 py-2 text-sm border rounded-xl focus:outline-none transition-all ${
                        item.current
                          ? 'bg-gray-100 text-gray-500 border-gray-200 cursor-not-allowed'
                          : 'border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
                      }`}
                    />
                  </div>
                </div>

                {/* Description / Bullet points */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Responsibilities & Achievements
                  </label>
                  <textarea
                    rows={4}
                    placeholder="• Built a microservice that processed 10M requests daily, reducing latency by 40%&#10;• Led a team of 4 engineers to launch customer payment portal with 99.9% uptime"
                    value={item.description}
                    onChange={(e) => updateExperience(index, 'description', e.target.value)}
                    className="w-full p-3 text-sm border border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all font-mono text-xs leading-relaxed"
                  />
                  <p className="text-[11px] text-gray-400 mt-1">
                    Tip: Start bullets with action verbs (Built, Spearheaded, Accelerated, Architected). Include numbers and percentages.
                  </p>
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addExperience}
            className="w-full py-2.5 rounded-xl border border-dashed border-indigo-200 bg-indigo-50/40 text-indigo-700 hover:bg-indigo-50 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Another Experience</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default StepExperience;
