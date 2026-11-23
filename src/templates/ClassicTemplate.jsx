import React from 'react';
import { parseBulletPoints } from '../utils/textUtils';

const ClassicTemplate = ({ data }) => {
  const { personal, summary, experience, education, skills, projects, certifications } = data;

  // Filter non-empty items
  const validExperience = experience?.filter((exp) => exp.company || exp.role) || [];
  const validEducation = education?.filter((edu) => edu.school || edu.degree) || [];
  const validSkills = skills?.filter(Boolean) || [];
  const validProjects = projects?.filter((proj) => proj.name) || [];
  const validCertifications = certifications?.filter((cert) => cert.name) || [];

  // Contact items for centered header
  const contactItems = [
    personal?.phone,
    personal?.email,
    personal?.location,
    personal?.linkedin,
    personal?.github,
    personal?.website,
  ].filter(Boolean);

  return (
    <div className="bg-white text-black font-serif p-8 sm:p-12 w-full max-w-[210mm] min-h-[297mm] mx-auto text-[13px] leading-relaxed shadow-sm print:shadow-none print:p-0">
      {/* Centered Name and Contact Information */}
      <div className="text-center pb-3">
        <h1 className="text-2xl font-bold tracking-wide uppercase text-black mb-1">
          {personal?.fullName || 'YOUR NAME'}
        </h1>
        {contactItems.length > 0 && (
          <p className="text-xs text-black">
            {contactItems.join(' | ')}
          </p>
        )}
      </div>

      {/* Summary */}
      {summary?.trim() && (
        <div className="mt-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1.5">
            Summary
          </h2>
          <p className="text-xs leading-normal text-justify text-black">
            {summary.trim()}
          </p>
        </div>
      )}

      {/* Experience */}
      {validExperience.length > 0 && (
        <div className="mt-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-2">
            Experience
          </h2>
          <div className="space-y-3">
            {validExperience.map((exp, idx) => {
              const bullets = parseBulletPoints(exp.description);
              const dateStr = [exp.startDate, exp.current ? 'Present' : exp.endDate].filter(Boolean).join(' – ');

              return (
                <div key={idx}>
                  <div className="flex justify-between items-baseline font-bold text-xs">
                    <span>{exp.role || 'Position Title'}</span>
                    <span className="font-normal">{dateStr}</span>
                  </div>
                  {exp.company && (
                    <div className="italic text-xs mb-1">
                      {exp.company}
                    </div>
                  )}
                  {bullets.length > 0 && (
                    <ul className="list-disc ml-5 space-y-0.5 text-xs text-black">
                      {bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="pl-0.5">
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
        <div className="mt-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-2">
            Education
          </h2>
          <div className="space-y-2">
            {validEducation.map((edu, idx) => {
              const dateStr = [edu.startDate, edu.endDate].filter(Boolean).join(' – ');

              return (
                <div key={idx}>
                  <div className="flex justify-between items-baseline font-bold text-xs">
                    <span>{edu.degree || 'Degree'}</span>
                    <span className="font-normal">{dateStr}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="italic">{edu.school}</span>
                    {edu.grade && <span>{edu.grade}</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Skills */}
      {validSkills.length > 0 && (
        <div className="mt-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1.5">
            Skills
          </h2>
          <p className="text-xs text-black">
            {validSkills.join(' • ')}
          </p>
        </div>
      )}

      {/* Projects */}
      {validProjects.length > 0 && (
        <div className="mt-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-2">
            Projects
          </h2>
          <div className="space-y-2.5">
            {validProjects.map((proj, idx) => {
              const bullets = parseBulletPoints(proj.description);

              return (
                <div key={idx}>
                  <div className="flex justify-between items-baseline font-bold text-xs">
                    <span>{proj.name}</span>
                    {proj.link && (
                      <span className="font-normal text-xs">{proj.link}</span>
                    )}
                  </div>
                  {bullets.length > 0 && (
                    <ul className="list-disc ml-5 space-y-0.5 text-xs text-black mt-0.5">
                      {bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="pl-0.5">
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
        <div className="mt-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1.5">
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

export default ClassicTemplate;
