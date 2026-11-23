import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
} from 'docx';
import { parseBulletPoints } from './textUtils';

/**
 * Generates and triggers download of an ATS-compliant .docx resume.
 */
export const exportToDocx = async (data, fileName = 'Resume.docx') => {
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

  const children = [];

  // 1. Header (Full Name & Contact Info)
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 80 },
      children: [
        new TextRun({
          text: (personal?.fullName || 'YOUR NAME').toUpperCase(),
          bold: true,
          size: 32, // 16pt
          font: 'Calibri',
          color: '000000',
        }),
      ],
    })
  );

  if (contactItems.length > 0) {
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
        children: [
          new TextRun({
            text: contactItems.join(' | '),
            size: 20, // 10pt
            font: 'Calibri',
            color: '333333',
          }),
        ],
      })
    );
  }

  // Helper for Section Headings
  const createSectionHeading = (title) => {
    return new Paragraph({
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 240, after: 120 },
      border: {
        bottom: {
          color: '000000',
          space: 1,
          style: BorderStyle.SINGLE,
          size: 6,
        },
      },
      children: [
        new TextRun({
          text: title.toUpperCase(),
          bold: true,
          size: 22, // 11pt
          font: 'Calibri',
          color: '000000',
        }),
      ],
    });
  };

  // 2. Summary
  if (summary?.trim()) {
    children.push(createSectionHeading('Summary'));
    children.push(
      new Paragraph({
        spacing: { after: 140 },
        children: [
          new TextRun({
            text: summary.trim(),
            size: 21, // 10.5pt
            font: 'Calibri',
            color: '000000',
          }),
        ],
      })
    );
  }

  // 3. Experience
  if (validExperience.length > 0) {
    children.push(createSectionHeading('Experience'));

    validExperience.forEach((exp) => {
      const dateStr = [exp.startDate, exp.current ? 'Present' : exp.endDate].filter(Boolean).join(' – ');
      const bullets = parseBulletPoints(exp.description);

      // Title & Date line
      children.push(
        new Paragraph({
          spacing: { before: 120, after: 40 },
          children: [
            new TextRun({
              text: exp.role || 'Position Title',
              bold: true,
              size: 21,
              font: 'Calibri',
              color: '000000',
            }),
            new TextRun({
              text: exp.company ? ` — ${exp.company}` : '',
              italics: true,
              size: 21,
              font: 'Calibri',
              color: '000000',
            }),
            new TextRun({
              text: dateStr ? `   (${dateStr})` : '',
              size: 20,
              font: 'Calibri',
              color: '555555',
            }),
          ],
        })
      );

      // Bullet points
      bullets.forEach((bullet) => {
        children.push(
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 40 },
            children: [
              new TextRun({
                text: bullet,
                size: 20,
                font: 'Calibri',
                color: '000000',
              }),
            ],
          })
        );
      });
    });
  }

  // 4. Education
  if (validEducation.length > 0) {
    children.push(createSectionHeading('Education'));

    validEducation.forEach((edu) => {
      const dateStr = [edu.startDate, edu.endDate].filter(Boolean).join(' – ');

      children.push(
        new Paragraph({
          spacing: { before: 80, after: 40 },
          children: [
            new TextRun({
              text: edu.degree || 'Degree',
              bold: true,
              size: 21,
              font: 'Calibri',
              color: '000000',
            }),
            new TextRun({
              text: edu.school ? ` — ${edu.school}` : '',
              italics: true,
              size: 21,
              font: 'Calibri',
              color: '000000',
            }),
            new TextRun({
              text: dateStr ? `   (${dateStr})` : '',
              size: 20,
              font: 'Calibri',
              color: '555555',
            }),
          ],
        })
      );

      if (edu.grade) {
        children.push(
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 40 },
            children: [
              new TextRun({
                text: `Grade / GPA: ${edu.grade}`,
                size: 20,
                font: 'Calibri',
                color: '333333',
              }),
            ],
          })
        );
      }
    });
  }

  // 5. Skills
  if (validSkills.length > 0) {
    children.push(createSectionHeading('Skills'));
    children.push(
      new Paragraph({
        spacing: { after: 120 },
        children: [
          new TextRun({
            text: validSkills.join(' • '),
            size: 21,
            font: 'Calibri',
            color: '000000',
          }),
        ],
      })
    );
  }

  // 6. Projects
  if (validProjects.length > 0) {
    children.push(createSectionHeading('Projects'));

    validProjects.forEach((proj) => {
      const bullets = parseBulletPoints(proj.description);

      children.push(
        new Paragraph({
          spacing: { before: 100, after: 40 },
          children: [
            new TextRun({
              text: proj.name,
              bold: true,
              size: 21,
              font: 'Calibri',
              color: '000000',
            }),
            new TextRun({
              text: proj.link ? ` (${proj.link})` : '',
              size: 19,
              font: 'Calibri',
              color: '333333',
            }),
          ],
        })
      );

      bullets.forEach((bullet) => {
        children.push(
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 40 },
            children: [
              new TextRun({
                text: bullet,
                size: 20,
                font: 'Calibri',
                color: '000000',
              }),
            ],
          })
        );
      });
    });
  }

  // 7. Certifications
  if (validCertifications.length > 0) {
    children.push(createSectionHeading('Certifications'));

    validCertifications.forEach((cert) => {
      const certDesc = [cert.name, cert.issuer, cert.year].filter(Boolean).join(' — ');

      children.push(
        new Paragraph({
          bullet: { level: 0 },
          spacing: { after: 40 },
          children: [
            new TextRun({
              text: certDesc,
              size: 21,
              font: 'Calibri',
              color: '000000',
            }),
          ],
        })
      );
    });
  }

  // Create document with standard 15mm (850 twips) margins
  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 850,    // ~15mm
              right: 850,
              bottom: 850,
              left: 850,
            },
          },
        },
        children,
      },
    ],
  });

  // Pack and trigger download
  const blob = await Packer.toBlob(doc);
  const blobUrl = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = blobUrl;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(blobUrl);
};
