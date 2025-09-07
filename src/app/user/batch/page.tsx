'use client';
import { useState, useEffect } from 'react';
import JobCard from '@/components/user/JobCard';

export default function Batch() {
  const [selectedYear, setSelectedYear] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const years = [
    { id: 'all', name: 'All Years' },
    { id: '2025', name: '2025 Batch' },
    { id: '2024', name: '2024 Batch' },
    { id: '2023', name: '2023 Batch' },
    { id: '2022', name: '2022 Batch' }
  ];

  const batchJobs = [
    {
      id: "batch-1",
      title: "2025 Batch - Software Engineer",
      company: "TCS",
      description: "Looking for 2025 batch graduates with strong programming skills in Java, Python, or JavaScript. Excellent opportunity for freshers to start their career in IT.",
      imageUrl: "/next.svg",
      type: "Full-time" as const,
      isUrgent: true
    },
    {
      id: "batch-2",
      title: "2025 Batch - Data Analyst",
      company: "Infosys",
      description: "2025 batch graduates needed for data analysis roles. Knowledge of SQL, Python, and data visualization tools required. Great learning opportunity.",
      imageUrl: "/next.svg",
      type: "Full-time" as const,
      isUrgent: false
    },
    {
      id: "batch-3",
      title: "2024 Batch - Frontend Developer",
      company: "Wipro",
      description: "2024 batch graduates with React, Angular, or Vue.js experience. Join our dynamic team and work on cutting-edge web applications.",
      imageUrl: "/next.svg",
      type: "Full-time" as const,
      isUrgent: true
    },
    {
      id: "batch-4",
      title: "2024 Batch - DevOps Engineer",
      company: "HCL",
      description: "2024 batch freshers with knowledge of Docker, Kubernetes, and cloud platforms. Learn infrastructure automation and deployment.",
      imageUrl: "/next.svg",
      type: "Full-time" as const,
      isUrgent: false
    },
    {
      id: "batch-5",
      title: "2023 Batch - Backend Developer",
      company: "Tech Mahindra",
      description: "2023 batch graduates with Node.js, Python, or Java experience. Build scalable backend services and APIs for our applications.",
      imageUrl: "/next.svg",
      type: "Full-time" as const,
      isUrgent: true
    },
    {
      id: "batch-6",
      title: "2023 Batch - UI/UX Designer",
      company: "Cognizant",
      description: "2023 batch graduates with design skills. Create beautiful and intuitive user interfaces for web and mobile applications.",
      imageUrl: "/next.svg",
      type: "Full-time" as const,
      isUrgent: false
    },
    {
      id: "batch-7",
      title: "2022 Batch - Mobile Developer",
      company: "Accenture",
      description: "2022 batch graduates with React Native or Flutter experience. Develop cross-platform mobile applications.",
      imageUrl: "/next.svg",
      type: "Full-time" as const,
      isUrgent: true
    },
    {
      id: "batch-8",
      title: "2022 Batch - QA Engineer",
      company: "Capgemini",
      description: "2022 batch graduates for quality assurance roles. Manual and automated testing experience preferred.",
      imageUrl: "/next.svg",
      type: "Full-time" as const,
      isUrgent: false
    },
    {
      id: "batch-9",
      title: "2025 Batch - Cloud Engineer",
      company: "L&T Infotech",
      description: "2025 batch graduates with AWS, Azure, or GCP knowledge. Work on cloud infrastructure and deployment.",
      imageUrl: "/next.svg",
      type: "Full-time" as const,
      isUrgent: true
    },
    {
      id: "batch-10",
      title: "2024 Batch - AI/ML Engineer",
      company: "Mindtree",
      description: "2024 batch graduates with machine learning knowledge. Work on AI projects and data analysis.",
      imageUrl: "/next.svg",
      type: "Full-time" as const,
      isUrgent: false
    },
    {
      id: "batch-11",
      title: "2023 Batch - Business Analyst",
      company: "Mphasis",
      description: "2023 batch graduates with analytical skills. Analyze business requirements and work with stakeholders.",
      imageUrl: "/next.svg",
      type: "Full-time" as const,
      isUrgent: true
    },
    {
      id: "batch-12",
      title: "2022 Batch - Network Engineer",
      company: "Deloitte",
      description: "2022 batch graduates with networking knowledge. CCNA certification and network security experience preferred.",
      imageUrl: "/next.svg",
      type: "Full-time" as const,
      isUrgent: false
    }
  ];

  const filteredJobs = batchJobs.filter(job => {
    const matchesYear = selectedYear === 'all' || job.title.includes(selectedYear);
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesYear && matchesSearch;
  });

  // Debug logging
  useEffect(() => {
    console.log('Selected Year:', selectedYear);
    console.log('Search Term:', searchTerm);
    console.log('Filtered Jobs Count:', filteredJobs.length);
  }, [selectedYear, searchTerm, filteredJobs.length]);

  // Get dynamic title based on selected year
  const getDynamicTitle = () => {
    if (selectedYear === 'all') {
      return 'All Batch Jobs';
    }
    const year = years.find(y => y.id === selectedYear);
    return year ? year.name + ' Jobs' : 'Batch Jobs';
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log('Year changed to:', e.target.value);
    setSelectedYear(e.target.value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Search changed to:', e.target.value);
    setSearchTerm(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="space-y-8 sm:space-y-4">
          {/* Page Header */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{getDynamicTitle()}</h1>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">Find job opportunities specifically for your batch year.</p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              {/* Search */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search Jobs</label>
                <input
                  type="text"
                  placeholder="Search by job title, company, or description..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Year Filter */}
              <div className="sm:w-48">
                <label className="block text-sm font-medium text-gray-700 mb-2">Batch Year</label>
                <select
                  value={selectedYear}
                  onChange={handleYearChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {years.map(year => (
                    <option key={year.id} value={year.id}>{year.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Job Cards Section */}
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8">
              Available Batch Jobs ({filteredJobs.length} jobs found)
            </h2>
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
