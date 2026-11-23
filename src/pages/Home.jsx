import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Shield, Zap, Award } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100 mb-6">
              <Zap className="w-3.5 h-3.5" />
              <span>Engineered to pass ATS algorithms with flying colors</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Create an <span className="text-indigo-600">ATS-Friendly</span> Resume in Minutes
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-gray-600 leading-relaxed">
              No backend, no accounts, 100% private in your browser. Clean standard layouts that recruiters and hiring systems actually parse correctly.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/builder"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5"
              >
                <span>Build My Resume</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="#features"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-base font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-all"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section id="features" className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-indigo-100 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">ATS-Optimized Formatting</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Clean single-column layouts, standard headings, and bullet points designed specifically for Workday, Greenhouse, Taleo, and Lever.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-indigo-100 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">100% In-Browser Privacy</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Zero backend databases. Your personal data, contact information, and career history never leave your device.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-indigo-100 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Instant Live Preview</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Type details on the left, watch your formatted resume update live in real-time on the right, and export crisp PDFs.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
