import React from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Download,
  Search,
  Lock,
  Layers,
  Award,
  Zap,
  Star
} from 'lucide-react';

const Home = () => {
  return (
    <div className="flex-1 bg-white">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-28 bg-gradient-to-b from-indigo-50/60 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            {/* Pill Banner */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-indigo-100/70 text-indigo-800 border border-indigo-200 mb-6 shadow-2xs">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Free Forever • 100% In-Browser • No Signup Required</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-950 tracking-tight leading-[1.15]">
              Land More Interviews with an <span className="text-indigo-600">ATS-Optimized</span> Resume
            </h1>

            {/* Subheading */}
            <p className="mt-6 text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              75% of resumes are discarded by Applicant Tracking Systems before a human recruiter ever sees them. Build single-column, scan-ready resumes that pass Workday, Taleo, and Greenhouse filters with flying colors.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Link
                to="/builder"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-sm sm:text-base font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Build My Resume Now</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="#how-it-works"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl text-sm sm:text-base font-bold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-all cursor-pointer shadow-2xs"
              >
                How It Works
              </a>
            </div>

            {/* Trust Badges */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-500 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Text-Based Selectable PDF</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Editable Microsoft Word .DOCX</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Zero Data Uploaded (100% Private)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Key Features Grid */}
      <section className="py-16 sm:py-24 bg-gray-50/70 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-2">
              Why ProjectAdda ResumeMaker?
            </h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Engineered specifically to defeat ATS parsing bugs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-gray-200 shadow-2xs hover:shadow-sm transition-all">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">100% ATS-Friendly</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Single-column hierarchy, standard section headers, and semantic bullets that automated parsers understand without dropping crucial details.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-gray-200 shadow-2xs hover:shadow-sm transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">100% Private (No Signup)</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Zero backend databases. Everything runs locally in your browser and automatically persists to your browser's private local storage.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-gray-200 shadow-2xs hover:shadow-sm transition-all">
              <div className="w-12 h-12 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center mb-5">
                <Download className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">Multiple Export Formats</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Export crisp text-based PDFs with unclipped 15mm margins, or native Microsoft Word (.docx) files matching the exact same layout.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-gray-200 shadow-2xs hover:shadow-sm transition-all">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-5">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">Built-in ATS Scorer & JD Match</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Real-time 100-point compliance checks (action verbs, metrics, word counts) and paste-any-job-description keyword matcher.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. How It Works (3 Steps) */}
      <section id="how-it-works" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-2">
              Simple 3-Step Process
            </h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              From blank page to interview-ready in 5 minutes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50/60 border border-gray-200">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white font-black text-lg flex items-center justify-center mb-5 shadow-sm">
                1
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">Enter Your Career Details</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Fill in your contact details, work history, education, skills, and projects using the guided multi-step form or 1-click sample data.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50/60 border border-gray-200">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white font-black text-lg flex items-center justify-center mb-5 shadow-sm">
                2
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">Check Real-Time ATS Score</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Watch your score calculate live out of 100. Follow actionable tips on action verbs and paste job postings to fix missing keywords.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50/60 border border-gray-200">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white font-black text-lg flex items-center justify-center mb-5 shadow-sm">
                3
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">Export Vector PDF or DOCX</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Choose between Classic, Modern, or Compact templates and download your resume instantly as a text-based PDF or editable Word file.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Bottom CTA Section */}
      <section className="py-16 bg-indigo-900 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-800/80 text-indigo-200 text-xs font-semibold mb-6">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Start Building in 10 Seconds</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 text-white">
            Ready to stand out in recruiter inboxes?
          </h2>

          <p className="text-indigo-200 text-sm sm:text-base max-w-2xl mx-auto mb-8">
            No credit card, no email registration, and no watermark on your downloads. Build and customize your ATS resume right now.
          </p>

          <Link
            to="/builder"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm sm:text-base font-bold text-indigo-950 bg-white hover:bg-gray-100 shadow-xl transition-all hover:scale-105 cursor-pointer"
          >
            <span>Start Building for Free</span>
            <ArrowRight className="w-4 h-4 text-indigo-900" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
