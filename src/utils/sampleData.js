export const SAMPLE_RESUME_DATA = {
  personal: {
    fullName: 'Alex Morgan',
    email: 'alex.morgan@email.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/alexmorgan-dev',
    github: 'github.com/alexmorgan-dev',
    website: 'alexmorgan.dev',
  },
  summary:
    'Results-driven Senior Full Stack Software Engineer with 5+ years of experience designing and scaling cloud-native web applications. Architected distributed microservices that improved platform throughput by 42% while reducing infrastructure costs by $120k annually. Proven expertise leading Agile teams across React, Node.js, TypeScript, and AWS environments.',
  experience: [
    {
      company: 'Stripe Technologies',
      role: 'Senior Full Stack Engineer',
      startDate: 'Jan 2022',
      endDate: 'Present',
      current: true,
      description:
        'Architected and deployed high-volume checkout microservices processing $15M in daily transactions with 99.99% uptime.\nAccelerated frontend load speeds by 45% through code splitting, caching strategies, and Core Web Vitals optimization.\nLed a team of 6 engineers to standardize automated CI/CD pipelines, decreasing release deployment cycles from 4 hours to 18 minutes.\nSpearheaded migration from legacy monolith to React and TypeScript, eliminating 300+ recurring production bugs.',
    },
    {
      company: 'Apex Cloud Solutions',
      role: 'Full Stack Software Engineer',
      startDate: 'Jun 2019',
      endDate: 'Dec 2021',
      current: false,
      description:
        'Built real-time telemetry analytics dashboard serving 120,000 active enterprise users using React, Node.js, and PostgreSQL.\nStreamlined relational database indexing and query execution, cutting backend API response latency by 35%.\nCollaborated directly with product and UX design teams to revamp onboarding flows, driving a 28% increase in free-to-paid conversions.\nAutomated end-to-end integration test suites with Jest and Playwright, achieving 92% code test coverage.',
    },
  ],
  education: [
    {
      school: 'University of California, Berkeley',
      degree: 'Bachelor of Science in Computer Science',
      startDate: 'Aug 2015',
      endDate: 'May 2019',
      grade: '3.85 / 4.0 GPA (Honors)',
    },
  ],
  skills: [
    'React.js',
    'TypeScript',
    'JavaScript',
    'Node.js',
    'Python',
    'Tailwind CSS',
    'Next.js',
    'PostgreSQL',
    'MongoDB',
    'Docker',
    'Amazon Web Services (AWS)',
    'REST APIs & GraphQL',
    'CI/CD Pipelines',
    'System Architecture',
  ],
  projects: [
    {
      name: 'OpenResume - ATS Resume Optimizer',
      link: 'github.com/alexmorgan-dev/open-resume',
      description:
        'Built a client-side ATS analysis tool with React and Tailwind CSS providing real-time keyword matching against job descriptions.\nEngineered instant vector-based PDF and Microsoft Word DOCX export with 0ms server latency.',
    },
    {
      name: 'CloudPulse - Distributed Performance Monitor',
      link: 'github.com/alexmorgan-dev/cloudpulse',
      description:
        'Engineered serverless telemetry tracking agent handling 10,000 events/sec with AWS Lambda, DynamoDB, and WebSockets.\nVisualized metrics using real-time canvas charting with sub-second data refresh intervals.',
    },
  ],
  certifications: [
    {
      name: 'AWS Certified Solutions Architect – Associate',
      issuer: 'Amazon Web Services',
      year: '2023',
    },
    {
      name: 'Certified Kubernetes Application Developer (CKAD)',
      issuer: 'Cloud Native Computing Foundation',
      year: '2022',
    },
  ],
};
