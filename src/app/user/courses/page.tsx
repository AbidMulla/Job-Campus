'use client';
import { useState } from 'react';
import JobCard from '@/components/user/JobCard';

export default function Courses() {
  const [selectedCategory] = useState('all');
  const [searchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Courses' },
    { id: 'be-btech', name: 'B.E B.Tech Jobs' },
    { id: 'me-mtech', name: 'M.E M.Tech Jobs' },
    { id: 'mba', name: 'MBA Jobs' },
    { id: 'mca', name: 'MCA Jobs' },
    { id: 'bca', name: 'BCA Jobs' }
  ];

  const courseJobs = [
    {
      id: "course-1",
      title: "B.E B.Tech - Software Engineer",
      company: "TCS",
      description: "B.E/B.Tech graduates needed for software development roles. Strong programming skills in Java, Python, or C++ required. Excellent opportunity for engineering graduates.",
      imageUrl: "/next.svg",
      type: "Full-time" as const,
      isUrgent: true
    },
    {
      id: "course-2",
      title: "B.E B.Tech - Data Engineer",
      company: "Infosys",
      description: "B.E/B.Tech graduates with data engineering skills. Knowledge of SQL, Python, and big data technologies preferred. Great learning environment.",
      imageUrl: "/next.svg",
      type: "Full-time" as const,
      isUrgent: false
    },
    {
      id: "course-3",
      title: "M.E M.Tech - Research Engineer",
      company: "Wipro",
      description: "M.E/M.Tech graduates for research and development roles. Specialization in AI/ML, Computer Vision, or Robotics preferred.",
      imageUrl: "/next.svg",
      type: "Full-time" as const,
      isUrgent: true
    },
    {
      id: "course-4",
      title: "M.E M.Tech - System Architect",
      company: "HCL",
      description: "M.E/M.Tech graduates with system design experience. Knowledge of distributed systems and cloud architecture required.",
      imageUrl: "/next.svg",
      type: "Full-time" as const,
      isUrgent: false
    },
    {
      id: "course-5",
      title: "MBA - Business Analyst",
      company: "Tech Mahindra",
      description: "MBA graduates with strong analytical skills. Experience in business process analysis and stakeholder management preferred.",
      imageUrl: "/next.svg",
      type: "Full-time" as const,
      isUrgent: true
    },
    {
      id: "course-6",
      title: "MBA - Product Manager",
      company: "Cognizant",
      description: "MBA graduates for product management roles. Experience in agile methodologies and product lifecycle management.",
      imageUrl: "/next.svg",
      type: "Full-time" as const,
      isUrgent: false
    },
    {
      id: "course-7",
      title: "MCA - Full Stack Developer",
      company: "Accenture",
      description: "MCA graduates with full-stack development skills. Knowledge of React, Node.js, and database technologies required.",
      imageUrl: "/next.svg",
      type: "Full-time" as const,
      isUrgent: true
    },
    {
      id: "course-8",
      title: "MCA - DevOps Engineer",
      company: "Capgemini",
      description: "MCA graduates for DevOps roles. Experience with Docker, Kubernetes, and CI/CD pipelines preferred.",
      imageUrl: "/next.svg",
      type: "Full-time" as const,
      isUrgent: false
    },
    {
      id: "course-9",
      title: "BCA - Frontend Developer",
      company: "L&T Infotech",
      description: "BCA graduates with frontend development skills. Knowledge of HTML, CSS, JavaScript, and React required.",
      imageUrl: "/next.svg",
      type: "Full-time" as const,
      isUrgent: true
    },
    {
      id: "course-10",
      title: "BCA - QA Engineer",
      company: "Mindtree",
      description: "BCA graduates for quality assurance roles. Manual and automated testing experience preferred.",
      imageUrl: "/next.svg",
      type: "Full-time" as const,
      isUrgent: false
    },
    {
      id: "course-11",
      title: "B.E B.Tech - Network Engineer",
      company: "Mphasis",
      description: "B.E/B.Tech graduates with networking knowledge. CCNA certification and network security experience preferred.",
      imageUrl: "/next.svg",
      type: "Full-time" as const,
      isUrgent: true
    },
    {
      id: "course-12",
      title: "M.E M.Tech - AI/ML Engineer",
      company: "Deloitte",
      description: "M.E/M.Tech graduates with AI/ML specialization. Experience with TensorFlow, PyTorch, and machine learning algorithms.",
      imageUrl: "/next.svg",
      type: "Full-time" as const,
      isUrgent: false
    }
  ];

  const filteredJobs = courseJobs.filter(job => {
    const matchesCategory = selectedCategory === 'all' || job.title.toLowerCase().includes(selectedCategory.replace('-', ' '));
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Get dynamic title based on selected category
  const getDynamicTitle = () => {
    if (selectedCategory === 'all') {
      return 'All Course Jobs';
    }
    const category = categories.find(cat => cat.id === selectedCategory);
    return category ? category.name : 'Course Jobs';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="space-y-8 sm:space-y-4">
      {/* Page Header */}
      <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{getDynamicTitle()}</h1>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">Find job opportunities based on your educational qualification.</p>
      </div>

          {/* Job Cards Section */}
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8">Available Course Jobs</h2>
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
                <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
        </div>
      )}
          </div>
        </div>
      </div>
    </div>
  );
}
