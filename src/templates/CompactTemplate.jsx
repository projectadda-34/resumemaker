import React from 'react';
import { parseBulletPoints } from '../utils/textUtils';

const CompactTemplate = ({ data }) => {
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
    <div className="bg-white text-black font-sans p-6 sm:p-8 w-full max-w-[210mm] min-h-[297mm] mx-auto text-[11.5px] leading-snug shadow-sm print:shadow-none print:p-0">
      {/* Header */}
      <div className="text-center pb-2 border-b border-black">
        <h1 className="text-xl font-bold tracking-tight uppercase text-black">
          {personal?.fullName || 'YOUR NAME'}
        </h1>
        {contactItems.length > 0 && (
          <p className="text-[10.5px] text-black mt-0.5">
            {contactItems.join(' | ')}
          </p>
        )}
      </div>

      {/* Summary */}
      {summary?.trim() && (
        <div className="mt-2.5">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1">
            Summary
          </h2>
          <p className="text-[11px] leading-tight text-black text-justify">
            {summary.trim()}
          </p>
        </div>
      )}

      {/* Experience */}
      {validExperience.length > 0 && (
        <div className="mt-2.5">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1.5">
            Experience
          </h2>
          <div className="space-y-2">
            {validExperience.map((exp, idx) => {
              const bullets = parseBulletPoints(exp.description);
              const dateStr = [exp.startDate, exp.current ? 'Present' : exp.endDate].filter(Boolean).join(' – ');

              return (
                <div key={idx}>
                  <div className="flex justify-between items-baseline text-[11.5px] font-bold">
                    <span>
                      {exp.role || 'Position Title'}
                      {exp.company && <span className="font-normal italic"> — {exp.company}</span>}
                    </span>
                    <span className="font-normal text-[10.5px] shrink-0">{dateStr}</span>
                  </div>
                  {bullets.length > 0 && (
                    <ul className="list-disc ml-4 space-y-0.5 text-[11px] text-black mt-0.5">
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
        <div className="mt-2.5">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1">
            Education
          </h2>
          <div className="space-y-1">
            {validEducation.map((edu, idx) => {
              const dateStr = [edu.startDate, edu.endDate].filter(Boolean).join(' – ');

              return (
                <div key={idx} className="flex justify-between items-baseline text-[11px]">
                  <span>
                    <strong className="font-semibold">{edu.degree || 'Degree'}</strong>
                    {edu.school && ` — ${edu.school}`}
                    {edu.grade && <span className="italic"> ({edu.grade})</span>}
                  </span>
                  <span className="text-[10.5px] shrink-0">{dateStr}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Skills */}
      {validSkills.length > 0 && (
        <div className="mt-2.5">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1">
            Skills
          </h2>
          <p className="text-[11px] text-black leading-tight">
            {validSkills.join(' • ')}
          </p>
        </div>
      )}

      {/* Projects */}
      {validProjects.length > 0 && (
        <div className="mt-2.5">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1">
            Projects
          </h2>
          <div className="space-y-1.5">
            {validProjects.map((proj, idx) => {
              const bullets = parseBulletPoints(proj.description);

              return (
                <div key={idx}>
                  <div className="flex justify-between items-baseline text-[11px] font-semibold">
                    <span>{proj.name}</span>
                    {proj.link && <span className="font-normal text-[10px] text-black">{proj.link}</span>}
                  </div>
                  {bullets.length > 0 && (
                    <ul className="list-disc ml-4 space-y-0.5 text-[10.5px] text-black">
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
        <div className="mt-2.5">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1">
            Certifications
          </h2>
          <ul className="list-disc ml-4 space-y-0.5 text-[11px] text-black">
            {validCertifications.map((cert, idx) => (
              <li key={idx} className="pl-0.5">
                <span className="font-semibold">{cert.name}</span>
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

export default CompactTemplate;
