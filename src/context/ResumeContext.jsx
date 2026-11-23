import React, { createContext, useContext, useState, useEffect } from 'react';
import { SAMPLE_RESUME_DATA } from '../utils/sampleData';

const STORAGE_KEY_DATA = 'resumemaker_data_v1';
const STORAGE_KEY_TEMPLATE = 'resumemaker_template_v1';

export const initialResumeState = {
  personal: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    website: '',
  },
  summary: '',
  experience: [
    {
      company: '',
      role: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    },
  ],
  education: [
    {
      school: '',
      degree: '',
      startDate: '',
      endDate: '',
      grade: '',
    },
  ],
  skills: [],
  projects: [
    {
      name: '',
      link: '',
      description: '',
    },
  ],
  certifications: [
    {
      name: '',
      issuer: '',
      year: '',
    },
  ],
};

const ResumeContext = createContext(null);

export const ResumeProvider = ({ children }) => {
  // Load initial data from localStorage if available
  const [resumeData, setResumeData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_DATA);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to parse resume data from localStorage', e);
    }
    return initialResumeState;
  });

  // Load selected template from localStorage if available
  const [selectedTemplate, setSelectedTemplate] = useState(() => {
    try {
      const savedTmpl = localStorage.getItem(STORAGE_KEY_TEMPLATE);
      if (savedTmpl) {
        return savedTmpl;
      }
    } catch (e) {
      console.warn('Failed to parse template from localStorage', e);
    }
    return 'classic';
  });

  // Persist resumeData to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(resumeData));
    } catch (e) {
      console.error('Failed to save resumeData to localStorage', e);
    }
  }, [resumeData]);

  // Persist selectedTemplate to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_TEMPLATE, selectedTemplate);
    } catch (e) {
      console.error('Failed to save selectedTemplate to localStorage', e);
    }
  }, [selectedTemplate]);

  // Personal handlers
  const updatePersonal = (field, value) => {
    setResumeData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        [field]: value,
      },
    }));
  };

  // Summary handlers
  const updateSummary = (summary) => {
    setResumeData((prev) => ({
      ...prev,
      summary,
    }));
  };

  // Experience handlers
  const addExperience = () => {
    setResumeData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          company: '',
          role: '',
          startDate: '',
          endDate: '',
          current: false,
          description: '',
        },
      ],
    }));
  };

  const updateExperience = (index, field, value) => {
    setResumeData((prev) => {
      const updated = [...prev.experience];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, experience: updated };
    });
  };

  const removeExperience = (index) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  // Education handlers
  const addEducation = () => {
    setResumeData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          school: '',
          degree: '',
          startDate: '',
          endDate: '',
          grade: '',
        },
      ],
    }));
  };

  const updateEducation = (index, field, value) => {
    setResumeData((prev) => {
      const updated = [...prev.education];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, education: updated };
    });
  };

  const removeEducation = (index) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  // Skills handlers
  const setSkills = (skills) => {
    setResumeData((prev) => ({
      ...prev,
      skills,
    }));
  };

  const addSkill = (skill) => {
    if (!skill.trim()) return;
    setResumeData((prev) => {
      if (prev.skills.includes(skill.trim())) return prev;
      return {
        ...prev,
        skills: [...prev.skills, skill.trim()],
      };
    });
  };

  const removeSkill = (index) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  // Projects handlers
  const addProject = () => {
    setResumeData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          name: '',
          link: '',
          description: '',
        },
      ],
    }));
  };

  const updateProject = (index, field, value) => {
    setResumeData((prev) => {
      const updated = [...prev.projects];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, projects: updated };
    });
  };

  const removeProject = (index) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };

  // Certifications handlers
  const addCertification = () => {
    setResumeData((prev) => ({
      ...prev,
      certifications: [
        ...prev.certifications,
        {
          name: '',
          issuer: '',
          year: '',
        },
      ],
    }));
  };

  const updateCertification = (index, field, value) => {
    setResumeData((prev) => {
      const updated = [...prev.certifications];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, certifications: updated };
    });
  };

  const removeCertification = (index) => {
    setResumeData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }));
  };

  // Load pre-configured sample data for demo
  const loadSampleData = () => {
    setResumeData(SAMPLE_RESUME_DATA);
  };

  // Clear all data
  const resetResume = () => {
    setResumeData(initialResumeState);
    try {
      localStorage.removeItem(STORAGE_KEY_DATA);
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        setResumeData,
        selectedTemplate,
        setSelectedTemplate,
        updatePersonal,
        updateSummary,
        addExperience,
        updateExperience,
        removeExperience,
        addEducation,
        updateEducation,
        removeEducation,
        skills: resumeData.skills,
        setSkills,
        addSkill,
        removeSkill,
        addProject,
        updateProject,
        removeProject,
        addCertification,
        updateCertification,
        removeCertification,
        loadSampleData,
        resetResume,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
