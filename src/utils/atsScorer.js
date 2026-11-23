import { parseBulletPoints } from './textUtils';

export const ACTION_VERBS = [
  'accelerated', 'achieved', 'administered', 'analyzed', 'architected', 'automated',
  'built', 'calculated', 'centralized', 'championed', 'collaborated', 'configured',
  'constructed', 'created', 'customized', 'decreased', 'delivered', 'deployed',
  'designed', 'developed', 'devised', 'doubled', 'eliminated', 'engineered',
  'established', 'executed', 'expanded', 'expedited', 'formulated', 'generated',
  'guided', 'implemented', 'improved', 'increased', 'initiated', 'integrated',
  'launched', 'led', 'managed', 'maximized', 'mentored', 'minimized',
  'modernized', 'optimized', 'orchestrated', 'overhauled', 'pioneered', 'reduced',
  'refactored', 'resolved', 'restructured', 'revamped', 'scaled', 'simplified',
  'spearheaded', 'standardized', 'streamlined', 'strengthened', 'transformed', 'upgraded'
];

// Common stop words to exclude during JD keyword matching
const STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'has', 'he',
  'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the', 'to', 'was', 'were',
  'will', 'with', 'you', 'your', 'we', 'our', 'this', 'their', 'or', 'if',
  'into', 'about', 'more', 'can', 'all', 'such', 'than', 'over', 'must', 'have',
  'also', 'within', 'work', 'working', 'ability', 'looking', 'role', 'team',
  'join', 'candidate', 'responsible', 'skills', 'experience', 'years', 'plus',
  'etc', 'including', 'knowledge', 'understanding', 'using'
]);

/**
 * Calculates a 100-point ATS compliance score based on 8 rules.
 */
export const calculateAtsScore = (resumeData) => {
  const { personal, summary, experience, education, skills, projects } = resumeData;

  const validExperience = experience?.filter((e) => e.company || e.role) || [];
  const validEducation = education?.filter((e) => e.school || e.degree) || [];
  const validSkills = skills?.filter(Boolean) || [];

  // Extract all bullet points from experience and projects
  const allBullets = [
    ...validExperience.flatMap((e) => parseBulletPoints(e.description)),
    ...(projects?.flatMap((p) => parseBulletPoints(p.description)) || []),
  ];

  // Calculate total resume word count
  const resumeFullText = [
    personal?.fullName,
    personal?.email,
    personal?.location,
    summary,
    ...validExperience.map((e) => `${e.role} ${e.company} ${e.description}`),
    ...validEducation.map((e) => `${e.degree} ${e.school}`),
    ...validSkills,
    ...(projects?.map((p) => `${p.name} ${p.description}`) || []),
  ].filter(Boolean).join(' ');

  const totalWords = resumeFullText.trim() ? resumeFullText.trim().split(/\s+/).length : 0;
  const summaryWords = summary?.trim() ? summary.trim().split(/\s+/).length : 0;

  // 1. Contact info complete (email, phone, location) -> 10 pts
  const hasEmail = Boolean(personal?.email?.trim());
  const hasPhone = Boolean(personal?.phone?.trim());
  const hasLocation = Boolean(personal?.location?.trim());
  const contactPassed = hasEmail && hasPhone && hasLocation;
  const contactScore = contactPassed ? 10 : (hasEmail ? 4 : 0) + (hasPhone ? 3 : 0) + (hasLocation ? 3 : 0);

  // 2. Summary present and 40-80 words -> 15 pts
  const summaryPassed = summaryWords >= 40 && summaryWords <= 80;
  let summaryScore = 0;
  if (summaryPassed) {
    summaryScore = 15;
  } else if (summaryWords >= 20 && summaryWords <= 120) {
    summaryScore = 10;
  } else if (summaryWords > 0) {
    summaryScore = 5;
  }

  // 3. At least 2 experience entries with bullet points -> 15 pts
  const entriesWithBullets = validExperience.filter((e) => parseBulletPoints(e.description).length > 0);
  const expPassed = validExperience.length >= 2 && entriesWithBullets.length >= 2;
  const expScore = expPassed ? 15 : validExperience.length >= 1 && entriesWithBullets.length >= 1 ? 8 : 0;

  // 4. Bullets start with action verbs -> 15 pts
  let actionVerbCount = 0;
  allBullets.forEach((bullet) => {
    const firstWord = bullet.trim().split(/\s+/)[0]?.toLowerCase().replace(/[^a-z]/g, '');
    if (firstWord && ACTION_VERBS.includes(firstWord)) {
      actionVerbCount++;
    }
  });
  const actionVerbRatio = allBullets.length > 0 ? actionVerbCount / allBullets.length : 0;
  const actionVerbPassed = allBullets.length >= 3 && actionVerbRatio >= 0.5; // at least 50% start with action verbs
  let actionVerbScore = 0;
  if (actionVerbPassed) {
    actionVerbScore = 15;
  } else if (actionVerbCount >= 2) {
    actionVerbScore = 8;
  } else if (actionVerbCount >= 1) {
    actionVerbScore = 4;
  }

  // 5. Bullets contain numbers/metrics (%, $, numbers, k, M) -> 15 pts
  // Regex looks for digits, percentages, dollar amounts, or metric multipliers (e.g. 10M, 40%, $500k)
  const metricRegex = /(\d+[\.,]?\d*|\$\d+|\d+[%kKmMbB]|\b(one|two|three|four|five|six|seven|eight|nine|ten)\b)/;
  const bulletsWithMetrics = allBullets.filter((b) => metricRegex.test(b)).length;
  const metricsPassed = allBullets.length >= 2 && bulletsWithMetrics >= 2;
  let metricsScore = 0;
  if (metricsPassed && bulletsWithMetrics >= 3) {
    metricsScore = 15;
  } else if (bulletsWithMetrics >= 1) {
    metricsScore = 8;
  }

  // 6. Skills section has at least 6 skills -> 15 pts
  const skillsPassed = validSkills.length >= 6;
  const skillsScore = skillsPassed ? 15 : Math.round((Math.min(validSkills.length, 5) / 6) * 15);

  // 7. Education present -> 10 pts
  const educationPassed = validEducation.length >= 1;
  const educationScore = educationPassed ? 10 : 0;

  // 8. Resume length reasonable (150 - 650 words ideal for 1 page ATS) -> 5 pts
  const lengthPassed = totalWords >= 150 && totalWords <= 700;
  const lengthScore = lengthPassed ? 5 : totalWords > 70 ? 2 : 0;

  const totalScore = Math.min(
    100,
    contactScore + summaryScore + expScore + actionVerbScore + metricsScore + skillsScore + educationScore + lengthScore
  );

  const checks = [
    {
      id: 'contact',
      title: 'Contact Information Complete',
      desc: 'Email, phone number, and location specified.',
      passed: contactPassed,
      score: contactScore,
      maxScore: 10,
      suggestion: !contactPassed ? 'Add your email, phone number, and city/state so recruiters can contact you.' : null,
    },
    {
      id: 'summary',
      title: 'Professional Summary Length',
      desc: `Target is 40–80 words (Current: ${summaryWords} words).`,
      passed: summaryPassed,
      score: summaryScore,
      maxScore: 15,
      suggestion:
        summaryWords < 40
          ? 'Expand your summary to 40–80 words to give ATS clear context on your level and domain.'
          : summaryWords > 80
          ? 'Shorten your summary to under 80 words. ATS favors concise, punchy opening statements.'
          : null,
    },
    {
      id: 'experience',
      title: 'Work Experience Entries',
      desc: `At least 2 positions with bullet points (Current: ${validExperience.length} added).`,
      passed: expPassed,
      score: expScore,
      maxScore: 15,
      suggestion: !expPassed ? 'Add at least 2 roles or projects with specific bullet point descriptions.' : null,
    },
    {
      id: 'action_verbs',
      title: 'Strong Action Verbs in Bullets',
      desc: `${actionVerbCount} of ${allBullets.length} bullets start with power action verbs.`,
      passed: actionVerbPassed,
      score: actionVerbScore,
      maxScore: 15,
      suggestion: !actionVerbPassed
        ? 'Begin bullets with action verbs like "Architected", "Accelerated", "Streamlined", or "Engineered".'
        : null,
    },
    {
      id: 'metrics',
      title: 'Measurable Metrics & Numbers',
      desc: `${bulletsWithMetrics} bullet(s) contain quantifiable outcomes (%, $, counts).`,
      passed: metricsPassed,
      score: metricsScore,
      maxScore: 15,
      suggestion: !metricsPassed
        ? 'Quantify your impact: mention percentages (e.g. "improved by 35%"), user counts, or dollars saved.'
        : null,
    },
    {
      id: 'skills',
      title: 'Skills Breadth',
      desc: `At least 6 core competencies (Current: ${validSkills.length} skills).`,
      passed: skillsPassed,
      score: skillsScore,
      maxScore: 15,
      suggestion: !skillsPassed ? 'Add at least 6 relevant technical skills to match ATS keyword scanners.' : null,
    },
    {
      id: 'education',
      title: 'Education Section',
      desc: 'At least one degree or institution listed.',
      passed: educationPassed,
      score: educationScore,
      maxScore: 10,
      suggestion: !educationPassed ? 'Add your university degree, college, or certificate program.' : null,
    },
    {
      id: 'length',
      title: 'Ideal 1-Page Word Count',
      desc: `Total resume length: ${totalWords} words (Target: 150–700 words).`,
      passed: lengthPassed,
      score: lengthScore,
      maxScore: 5,
      suggestion:
        totalWords < 150
          ? 'Resume is currently too sparse. Add more details about your achievements.'
          : totalWords > 700
          ? 'Resume is getting long. Tighten bullet points to ensure it fits onto 1 page.'
          : null,
    },
  ];

  return {
    totalScore,
    checks,
    stats: {
      totalWords,
      summaryWords,
      actionVerbCount,
      bulletsWithMetrics,
      totalBullets: allBullets.length,
      skillsCount: validSkills.length,
    },
  };
};

/**
 * Extracts key keywords from a job description and checks for matches in the resume.
 */
export const matchJobDescription = (jobDescription, resumeData) => {
  if (!jobDescription || !jobDescription.trim()) {
    return {
      matchPercentage: 0,
      matchedKeywords: [],
      missingKeywords: [],
    };
  }

  // Build searchable text from resume
  const resumeText = [
    resumeData.personal?.fullName,
    resumeData.summary,
    ...(resumeData.experience?.map((e) => `${e.role} ${e.company} ${e.description}`) || []),
    ...(resumeData.skills || []),
    ...(resumeData.projects?.map((p) => `${p.name} ${p.description}`) || []),
    ...(resumeData.education?.map((e) => `${e.degree} ${e.school}`) || []),
    ...(resumeData.certifications?.map((c) => `${c.name} ${c.issuer}`) || []),
  ]
    .join(' ')
    .toLowerCase();

  // Extract candidate keywords from JD (words of length >= 3, removing punctuation)
  const words = jobDescription
    .toLowerCase()
    .replace(/[^a-z0-9+#\.\s-]/g, ' ')
    .split(/\s+/)
    .map((w) => w.trim().replace(/^[-.]+|[-.]+$/g, ''))
    .filter((w) => w.length >= 3 && !STOP_WORDS.has(w) && !/^\d+$/.test(w));

  // Count word frequencies to identify the most significant keywords
  const frequencyMap = {};
  words.forEach((w) => {
    frequencyMap[w] = (frequencyMap[w] || 0) + 1;
  });

  // Sort by frequency and take top unique keywords
  const topKeywords = Object.entries(frequencyMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 30)
    .map(([word]) => word);

  if (topKeywords.length === 0) {
    return {
      matchPercentage: 0,
      matchedKeywords: [],
      missingKeywords: [],
    };
  }

  const matchedKeywords = [];
  const missingKeywords = [];

  topKeywords.forEach((kw) => {
    // Check whole word or substring match in resume
    const regex = new RegExp(`\\b${kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    if (regex.test(resumeText) || resumeText.includes(kw)) {
      matchedKeywords.push(kw);
    } else {
      missingKeywords.push(kw);
    }
  });

  const matchPercentage = Math.round((matchedKeywords.length / topKeywords.length) * 100);

  return {
    matchPercentage,
    matchedKeywords,
    missingKeywords,
  };
};
