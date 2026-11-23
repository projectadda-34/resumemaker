import React from 'react';
import { parseBulletPoints } from '../utils/textUtils';

const ModernTemplate = ({ data }) => {
  const { personal, summary, experience, education, skills, projects, certifications } = data;

  const validExperience = experience?.filter((exp) => exp.company || exp.role) || [];
  const validEducation = education?.filter((edu) => edu.school || edu.degree) || [];
  const validSkills = skills?.filter(Boolean) || [];
  const validProjects = projects?.filter((proj) => proj.name) || [];
  const validCertifications = certifications?.filter((cert) => cert.name) || [];

  const contactItems = [
    personal?.phone,
    personal?.email,
    personal?.location,
    personal?.linkedin,
    personal?.github,
    personal?.website,
  ].filter(Boolean);

  return (
    <div className="bg-white text-black font-sans p-8 sm:p-12 w-full max-w-[210mm] min-h-[297mm] mx-auto text-[13px] leading-relaxed shadow-sm print:shadow-none print:p-0">
      {/* Left-Aligned Header */}
      <div className="pb-4 border-b-2 border-black resume-entry">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight uppercase text-black">
          {personal?.fullName || 'YOUR NAME'}
        </h1>
        {contactItems.length > 0 && (
          <p className="text-xs text-black font-medium mt-1.5 flex flex-wrap gap-x-2 gap-y-0.5">
            {contactItems.map((item, idx) => (
              <span key={idx}>
                {item}
                {idx < contactItems.length - 1 && <span className="ml-2 font-normal">|</span>}
              </span>
            ))}
          </p>
        )}
      </div>

      {/* Summary */}
      {summary?.trim() && (
        <div className="mt-5 resume-entry">
          <h2 className="text-xs font-black uppercase tracking-wider text-black pb-1 mb-1 border-b border-black">
            Summary
          </h2>
          <p className="text-xs leading-normal text-black text-justify">
            {summary.trim()}
          </p>
        </div>
      )}

      {/* Experience */}
      {validExperience.length > 0 && (
        <div className="mt-5">
          <h2 className="text-xs font-black uppercase tracking-wider text-black pb-1 mb-2 border-b border-black">
            Experience
          </h2>
          <div className="space-y-3.5">
            {validExperience.map((exp, idx) => {
              const bullets = parseBulletPoints(exp.description);
              const dateStr = [exp.startDate, exp.current ? 'Present' : exp.endDate].filter(Boolean).join(' – ');

              return (
                <div key={idx} className="resume-entry">
                  <div className="flex justify-between items-baseline text-xs">
                    <span className="font-bold text-black">{exp.role || 'Position Title'}</span>
                    <span className="text-black font-medium text-[11px]">{dateStr}</span>
                  </div>
                  {exp.company && (
                    <div className="text-xs text-black font-semibold mb-1">
                      {exp.company}
                    </div>
                  )}
                  {bullets.length > 0 && (
                    <ul className="list-disc ml-5 space-y-1 text-xs text-black">
                      {bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="pl-0.5 leading-normal">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Education */}
      {validEducation.length > 0 && (
        <div className="mt-5">
          <h2 className="text-xs font-black uppercase tracking-wider text-black pb-1 mb-2 border-b border-black">
            Education
          </h2>
          <div className="space-y-2.5">
            {validEducation.map((edu, idx) => {
              const dateStr = [edu.startDate, edu.endDate].filter(Boolean).join(' – ');

              return (
                <div key={idx} className="resume-entry">
                  <div className="flex justify-between items-baseline text-xs">
                    <span className="font-bold text-black">{edu.degree || 'Degree'}</span>
                    <span className="text-black font-medium text-[11px]">{dateStr}</span>
                  </div>
                  <div className="flex justify-between text-xs text-black">
                    <span>{edu.school}</span>
                    {edu.grade && <span className="font-medium">{edu.grade}</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Skills */}
      {validSkills.length > 0 && (
        <div className="mt-5 resume-entry">
          <h2 className="text-xs font-black uppercase tracking-wider text-black pb-1 mb-1.5 border-b border-black">
            Skills
          </h2>
          <p className="text-xs text-black leading-relaxed">
            {validSkills.join(' • ')}
          </p>
        </div>
      )}

      {/* Projects */}
      {validProjects.length > 0 && (
        <div className="mt-5">
          <h2 className="text-xs font-black uppercase tracking-wider text-black pb-1 mb-2 border-b border-black">
            Projects
          </h2>
          <div className="space-y-3">
            {validProjects.map((proj, idx) => {
              const bullets = parseBulletPoints(proj.description);

              return (
                <div key={idx} className="resume-entry">
                  <div className="flex justify-between items-baseline text-xs">
                    <span className="font-bold text-black">{proj.name}</span>
                    {proj.link && <span className="text-[11px] text-black font-medium">{proj.link}</span>}
                  </div>
                  {bullets.length > 0 && (
                    <ul className="list-disc ml-5 space-y-1 text-xs text-black mt-1">
                      {bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="pl-0.5 leading-normal">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Certifications */}
      {validCertifications.length > 0 && (
        <div className="mt-5 resume-entry">
          <h2 className="text-xs font-black uppercase tracking-wider text-black pb-1 mb-1.5 border-b border-black">
            Certifications
          </h2>
          <ul className="list-disc ml-5 space-y-0.5 text-xs text-black">
            {validCertifications.map((cert, idx) => (
              <li key={idx} className="pl-0.5">
                <span className="font-bold">{cert.name}</span>
                {cert.issuer && ` — ${cert.issuer}`}
                {cert.year && ` (${cert.year})`}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ModernTemplate;
