import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { GraduationCap, Plus, Trash2, Calendar, Award } from 'lucide-react';

const StepEducation = () => {
  const { resumeData, addEducation, updateEducation, removeEducation } = useResume();
  const { education } = resumeData;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Education</h3>
          <p className="text-sm text-gray-500">
            Add degrees, certifications, or high school qualifications.
          </p>
        </div>
        <button
          type="button"
          onClick={addEducation}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-2xs transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Education</span>
        </button>
      </div>

      {education.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 border border-dashed border-gray-300 rounded-2xl">
          <GraduationCap className="w-10 h-10 text-gray-400 mx-auto mb-2" />
          <p className="text-sm font-semibold text-gray-700">No education entries added</p>
          <p className="text-xs text-gray-400 mt-1 mb-4">Add your university or college degree</p>
          <button
            type="button"
            onClick={addEducation}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Education</span>
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          {education.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl p-5 shadow-2xs relative group transition-all hover:border-gray-300"
            >
              <div className="flex justify-between items-center pb-3 mb-4 border-b border-gray-100">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                  Degree #{index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeEducation(index)}
                  className="text-gray-400 hover:text-rose-600 p-1 rounded-lg hover:bg-rose-50 transition-colors"
                  title="Remove education"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* School / Institution */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    School / College / University
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Stanford University or University of California, Berkeley"
                    value={item.school}
                    onChange={(e) => updateEducation(index, 'school', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
                  />
                </div>

                {/* Degree / Field of Study */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Degree & Major
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Bachelor of Science in Computer Science"
                    value={item.degree}
                    onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
                  />
                </div>

                {/* Start Date */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Start Date / Year
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      placeholder="e.g. Aug 2019"
                      value={item.startDate}
                      onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
                    />
                  </div>
                </div>

                {/* End Date */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Graduation Date / Expected
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      placeholder="e.g. May 2023"
                      value={item.endDate}
                      onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
                    />
                  </div>
                </div>

                {/* Grade / GPA */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Grade / GPA / Honors (Optional)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <Award className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      placeholder="e.g. 3.8 / 4.0 GPA or Magna Cum Laude"
                      value={item.grade}
                      onChange={(e) => updateEducation(index, 'grade', e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addEducation}
            className="w-full py-2.5 rounded-xl border border-dashed border-indigo-200 bg-indigo-50/40 text-indigo-700 hover:bg-indigo-50 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Another Degree</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default StepEducation;
