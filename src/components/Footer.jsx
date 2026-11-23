import React from 'react';
import { Heart, FileText, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Brand info */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-sm">ResumeMaker</p>
              <p className="text-xs text-gray-500">100% Client-side ATS Optimized Resume Builder</p>
            </div>
          </div>

          {/* Quick links & badge */}
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <span className="flex items-center gap-1.5 text-emerald-600 text-xs font-semibold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5" />
              100% Private (No data leaves your browser)
            </span>
            <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
            <Link to="/builder" className="hover:text-indigo-600 transition-colors">Builder</Link>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-6 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-400 gap-2">
          <p>© {new Date().getFullYear()} ResumeMaker. Built for high ATS pass rates.</p>
          <p className="flex items-center gap-1">
            Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> for job seekers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
