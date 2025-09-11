'use client';
import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import JobCard from '@/components/user/JobCard';

export default function Batch() {
  const [selectedYear, setSelectedYear] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

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

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      // Reset to first slide when screen size changes
      setCurrentSlide(0);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const getCardsPerView = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) return 1; // Mobile: 1 card
      if (window.innerWidth < 1024) return 2; // Tablet: 2 cards
      return 3; // Desktop: 3 cards
    }
    return 3; // Default to 3 cards
  };

  const nextSlide = () => {
    const cardsPerView = getCardsPerView();
    const maxSlides = Math.max(0, batchJobs.length - cardsPerView);
    setCurrentSlide((prev) => (prev + 1) % (maxSlides + 1));
  };

  const prevSlide = () => {
    const cardsPerView = getCardsPerView();
    const maxSlides = Math.max(0, batchJobs.length - cardsPerView);
    setCurrentSlide((prev) => (prev - 1 + (maxSlides + 1)) % (maxSlides + 1));
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

          {/* Filters and Search */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex flex-wrap items-center gap-3">
              {/* Job Search */}
              <div className="relative w-48">
                <Icon icon="fluent:briefcase-24-regular" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by job..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full pl-9 pr-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
                />
              </div>

              {/* Batch Year Filter */}
              <div className="relative">
                <select
                  value={selectedYear}
                  onChange={handleYearChange}
                  className="w-40 pl-3 pr-8 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer"
                >
                  {years.map((year) => (
                    <option key={year.id} value={year.id}>
                      {year.name}
                    </option>
                  ))}
                </select>
                <Icon icon="fluent:chevron-down-24-regular" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>

              {/* Job Type Filter */}
              <div className="relative">
                <select
                  className="w-40 pl-3 pr-8 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer"
                >
                  <option value="all">All Job Types</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
                <Icon icon="fluent:chevron-down-24-regular" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>

              {/* Company Filter */}
              <div className="relative">
                <select
                  className="w-40 pl-3 pr-8 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer"
                >
                  <option value="all">All Companies</option>
                  <option value="TCS">TCS</option>
                  <option value="Infosys">Infosys</option>
                  <option value="Wipro">Wipro</option>
                  <option value="HCL">HCL</option>
                  <option value="Tech Mahindra">Tech Mahindra</option>
                  <option value="Cognizant">Cognizant</option>
                  <option value="Accenture">Accenture</option>
                  <option value="Capgemini">Capgemini</option>
                </select>
                <Icon icon="fluent:chevron-down-24-regular" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>

              {/* Urgency Filter */}
              <div className="relative">
                <select
                  className="w-32 pl-3 pr-8 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer"
                >
                  <option value="all">All Status</option>
                  <option value="urgent">Urgent</option>
                  <option value="normal">Normal</option>
                </select>
                <Icon icon="fluent:chevron-down-24-regular" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Advertisement Banner */}



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



          {/* Similar Jobs Section */}
          <div className="bg-white p-6 sm:p-8 rounded-xl  border-gray-200">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-left mb-8">Similar Jobs You Might Like</h2>
            
            {/* Similar Jobs Slider */}
            <div className="relative">
              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors border border-gray-200"
              >
                <Icon icon="fluent:chevron-left-24-regular" className="w-6 h-6 text-gray-600" />
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors border border-gray-200"
              >
                <Icon icon="fluent:chevron-right-24-regular" className="w-6 h-6 text-gray-600" />
              </button>

              {/* Similar Jobs Container */}
              <div className="overflow-hidden px-4 sm:px-8 lg:px-12">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ 
                    transform: `translateX(-${currentSlide * (100 / getCardsPerView())}%)` 
                  }}
                >
                  {batchJobs.map((job) => (
                    <div key={job.id} className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-2 sm:px-3">
                      <div className="bg-gray-50 rounded-xl p-4 sm:p-6 hover:shadow-lg transition-all duration-300 border border-gray-100 h-full">
                        {/* Company Logo */}
                        <div className="flex items-center mb-3 sm:mb-4">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-2 sm:mr-3">
                            <Icon icon="fluent:building-24-regular" className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 text-xs sm:text-sm truncate">{job.company}</h3>
                            <p className="text-xs text-gray-500 truncate">{job.type}</p>
                          </div>
                          {job.isUrgent && (
                            <span className="ml-2 bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium flex-shrink-0">
                              Urgent
                            </span>
                          )}
                        </div>

                        {/* Job Title */}
                        <h4 className="font-bold text-gray-900 mb-2 text-sm sm:text-base line-clamp-2">
                          {job.title}
                        </h4>

                        {/* Job Description */}
                        <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3">
                          {job.description}
                        </p>

                        {/* Action Button */}
                        <button className="w-full bg-blue-600 text-white py-2 px-3 sm:px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors text-xs sm:text-sm">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center mt-4 sm:mt-6 space-x-1 sm:space-x-2">
              {Array.from({ length: Math.max(0, batchJobs.length - getCardsPerView()) + 1 }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
                    currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
