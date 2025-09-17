'use client';
import { useState } from 'react';
import JobCard from '@/components/user/JobCard';

export default function Internship() {
  const [selectedDuration] = useState('all');
  const [searchTerm] = useState('');

  const durations = [
    { id: 'all', name: 'All Durations' },
    { id: '3-months', name: '3 Months' },
    { id: '6-months', name: '6 Months' },
    { id: 'summer', name: 'Summer Internship' },
    { id: 'winter', name: 'Winter Internship' }
  ];

  const internshipJobs = [
    {
      id: "internship-1",
      title: "3 Months - Software Development Intern",
      company: "TCS",
      description: "3-month internship program for software development. Work on real projects using Java, Python, and web technologies. Great learning opportunity for students.",
      imageUrl: "/next.svg",
      type: "Internship" as const,
      isUrgent: true
    },
    {
      id: "internship-2",
      title: "6 Months - Data Science Intern",
      company: "Infosys",
      description: "6-month internship in data science. Work with big data technologies, machine learning algorithms, and data visualization tools.",
      imageUrl: "/next.svg",
      type: "Internship" as const,
      isUrgent: false
    },
    {
      id: "internship-3",
      title: "Summer - Frontend Development Intern",
      company: "Wipro",
      description: "Summer internship for frontend development. Learn React, Angular, and modern web technologies while working on live projects.",
      imageUrl: "/next.svg",
      type: "Internship" as const,
      isUrgent: true
    },
    {
      id: "internship-4",
      title: "3 Months - UI/UX Design Intern",
      company: "HCL",
      description: "3-month UI/UX design internship. Create user interfaces, conduct user research, and learn design tools like Figma and Adobe XD.",
      imageUrl: "/next.svg",
      type: "Internship" as const,
      isUrgent: false
    },
    {
      id: "internship-5",
      title: "6 Months - Product Management Intern",
      company: "Tech Mahindra",
      description: "6-month product management internship. Learn agile methodologies, stakeholder management, and product lifecycle processes.",
      imageUrl: "/next.svg",
      type: "Internship" as const,
      isUrgent: true
    },
    {
      id: "internship-6",
      title: "Summer - Mobile Development Intern",
      company: "Cognizant",
      description: "Summer internship for mobile app development. Work with React Native, Flutter, and native iOS/Android development.",
      imageUrl: "/next.svg",
      type: "Internship" as const,
      isUrgent: false
    },
    {
      id: "internship-7",
      title: "3 Months - Backend Development Intern",
      company: "Accenture",
      description: "3-month backend development internship. Learn Node.js, Python, databases, and API development with real-world projects.",
      imageUrl: "/next.svg",
      type: "Internship" as const,
      isUrgent: true
    },
    {
      id: "internship-8",
      title: "6 Months - DevOps Intern",
      company: "Capgemini",
      description: "6-month DevOps internship. Learn Docker, Kubernetes, CI/CD pipelines, and cloud infrastructure management.",
      imageUrl: "/next.svg",
      type: "Internship" as const,
      isUrgent: false
    },
    {
      id: "internship-9",
      title: "Winter - AI/ML Intern",
      company: "L&T Infotech",
      description: "Winter internship in AI/ML. Work on machine learning projects using TensorFlow, PyTorch, and data analysis tools.",
      imageUrl: "/next.svg",
      type: "Internship" as const,
      isUrgent: true
    },
    {
      id: "internship-10",
      title: "3 Months - Business Analyst Intern",
      company: "Mindtree",
      description: "3-month business analyst internship. Learn requirements gathering, process analysis, and stakeholder communication.",
      imageUrl: "/next.svg",
      type: "Internship" as const,
      isUrgent: false
    },
    {
      id: "internship-11",
      title: "Summer - Cloud Computing Intern",
      company: "Mphasis",
      description: "Summer internship in cloud computing. Work with AWS, Azure, and GCP while learning cloud architecture and deployment.",
      imageUrl: "/next.svg",
      type: "Internship" as const,
      isUrgent: true
    },
    {
      id: "internship-12",
      title: "6 Months - Cybersecurity Intern",
      company: "Deloitte",
      description: "6-month cybersecurity internship. Learn network security, vulnerability assessment, and threat analysis techniques.",
      imageUrl: "/next.svg",
      type: "Internship" as const,
      isUrgent: false
    }
  ];

  const filteredJobs = internshipJobs.filter(job => {
    const matchesDuration = selectedDuration === 'all' || job.title.toLowerCase().includes(selectedDuration.replace('-', ' '));
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDuration && matchesSearch;
  });

  // Get dynamic title based on selected duration
  const getDynamicTitle = () => {
    if (selectedDuration === 'all') {
      return 'All Internship Opportunities';
    }
    const duration = durations.find(d => d.id === selectedDuration);
    return duration ? `${duration.name} Internships` : 'Internship Opportunities';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="space-y-8 sm:space-y-4">
      {/* Page Header */}
      <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{getDynamicTitle()}</h1>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">Find internship opportunities to gain valuable work experience.</p>
      </div>

          {/* Job Cards Section */}
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8">Available Internship Opportunities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  id={job.id}
                  title={job.title}
                  company={job.company}
                  description={job.description}
                  imageUrl={job.imageUrl}
                  type={job.type}
                  isUrgent={job.isUrgent}
                />
        ))}
      </div>

      {/* Empty State */}
            {filteredJobs.length === 0 && (
              <div className="text-center py-12">
          <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No internships found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
        </div>
      )}
          </div>
        </div>
      </div>
    </div>
  );
}
