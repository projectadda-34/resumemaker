import React from 'react';
import { Layout, Check, Sparkles } from 'lucide-react';

export const TEMPLATES = [
  {
    id: 'classic',
    name: 'Classic',
    subtitle: 'Harvard / Ivy style',
    font: 'Serif',
    desc: 'Centered name, traditional serif typography, horizontal section dividers.',
  },
  {
    id: 'modern',
    name: 'Modern',
    subtitle: 'Tech / Clean style',
    font: 'Sans-serif',
    desc: 'Left-aligned, bold headings with underlines, modern clean hierarchy.',
  },
  {
    id: 'compact',
    name: 'Compact',
    subtitle: '1-Page fit style',
    font: 'Compact',
    desc: 'Tight spacing and margins designed to fit maximum content onto a single page.',
  },
];

const TemplateSelector = ({ selectedTemplate, onSelectTemplate }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-3 sm:p-4 shadow-xs">
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-1.5 text-xs font-bold text-gray-800 uppercase tracking-wider">
          <Layout className="w-4 h-4 text-indigo-600" />
          <span>ATS Template</span>
        </div>
        <span className="text-[11px] text-gray-500 font-medium hidden sm:inline">
          100% ATS Compliant (Single Column)
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {TEMPLATES.map((tmpl) => {
          const isSelected = selectedTemplate === tmpl.id;

          return (
            <button
              key={tmpl.id}
              type="button"
              onClick={() => onSelectTemplate(tmpl.id)}
              className={`relative text-left p-2.5 sm:p-3 rounded-xl border transition-all ${
                isSelected
                  ? 'border-indigo-600 bg-indigo-50/60 ring-2 ring-indigo-500/20 shadow-2xs'
                  : 'border-gray-200 bg-gray-50/50 hover:bg-gray-100 hover:border-gray-300'
              }`}
            >
              {isSelected && (
                <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
              )}
              <div className="font-bold text-xs text-gray-900 leading-tight">
                {tmpl.name}
              </div>
              <div className="text-[10px] text-indigo-700 font-medium mt-0.5">
                {tmpl.font}
              </div>
              <div className="text-[10px] text-gray-500 line-clamp-1 mt-1 hidden sm:block">
                {tmpl.subtitle}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TemplateSelector;
