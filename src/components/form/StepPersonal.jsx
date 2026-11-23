import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { User, Mail, Phone, MapPin, Globe, AlertCircle } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../SocialIcons';

const StepPersonal = ({ errors = {} }) => {
  const { resumeData, updatePersonal } = useResume();
  const { personal } = resumeData;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900">Personal Information</h3>
        <p className="text-sm text-gray-500">
          Recruiters and ATS look here first. Make sure your contact details are accurate and professional.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              name="fullName"
              placeholder="e.g. Alex Morgan"
              value={personal.fullName}
              onChange={(e) => updatePersonal('fullName', e.target.value)}
              className={`w-full pl-9 pr-3 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                errors.fullName
                  ? 'border-rose-300 bg-rose-50/20 focus:ring-rose-400 text-rose-900'
                  : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-100'
              }`}
            />
          </div>
          {errors.fullName && (
            <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.fullName}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              name="email"
              placeholder="e.g. alex.morgan@email.com"
              value={personal.email}
              onChange={(e) => updatePersonal('email', e.target.value)}
              className={`w-full pl-9 pr-3 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                errors.email
                  ? 'border-rose-300 bg-rose-50/20 focus:ring-rose-400 text-rose-900'
                  : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-100'
              }`}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Phone Number <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Phone className="w-4 h-4" />
            </div>
            <input
              type="tel"
              name="phone"
              placeholder="e.g. +1 (555) 019-2834"
              value={personal.phone}
              onChange={(e) => updatePersonal('phone', e.target.value)}
              className={`w-full pl-9 pr-3 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                errors.phone
                  ? 'border-rose-300 bg-rose-50/20 focus:ring-rose-400 text-rose-900'
                  : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-100'
              }`}
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.phone}
            </p>
          )}
        </div>

        {/* Location */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            City, Country / State
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <MapPin className="w-4 h-4" />
            </div>
            <input
              type="text"
              name="location"
              placeholder="e.g. San Francisco, CA"
              value={personal.location}
              onChange={(e) => updatePersonal('location', e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
            />
          </div>
        </div>

        {/* LinkedIn */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            LinkedIn Profile
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <LinkedinIcon className="w-4 h-4" />
            </div>
            <input
              type="text"
              name="linkedin"
              placeholder="e.g. linkedin.com/in/alexmorgan"
              value={personal.linkedin}
              onChange={(e) => updatePersonal('linkedin', e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
            />
          </div>
        </div>

        {/* GitHub */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            GitHub Profile
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <GithubIcon className="w-4 h-4" />
            </div>
            <input
              type="text"
              name="github"
              placeholder="e.g. github.com/alexmorgan"
              value={personal.github}
              onChange={(e) => updatePersonal('github', e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
            />
          </div>
        </div>

        {/* Website / Portfolio */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Portfolio / Personal Website
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Globe className="w-4 h-4" />
            </div>
            <input
              type="url"
              name="website"
              placeholder="e.g. alexmorgan.dev"
              value={personal.website}
              onChange={(e) => updatePersonal('website', e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepPersonal;
