'use client';
import { useState } from 'react';
import JobCard from '@/components/user/JobCard';

export default function Location() {
  const [selectedCity] = useState('all');
  const [searchTerm] = useState('');

  const cities = [
    { id: 'all', name: 'All Cities' },
    { id: 'bangalore', name: 'Bangalore Jobs' },
    { id: 'mumbai', name: 'Mumbai Jobs' },
    { id: 'delhi', name: 'Delhi Jobs' },
    { id: 'chennai', name: 'Chennai Jobs' },
    { id: 'hyderabad', name: 'Hyderabad Jobs' },
    { id: 'pune', name: 'Pune Jobs' }
  ];

  const locationJobs = [
    {
      id: "location-1",
      title: "Bangalore - Software Engineer",
      company: "TCS",
      description: "Join our Bangalore office as a Software Engineer. Work on cutting-edge technologies and be part of a dynamic team in India's tech hub.",
      imageUrl: "/next.svg",
      type: "Full-time" as const,
      isUrgent: true
    },
    {
      id: "location-2",
      title: "Bangalore - Data Scientist",
      company: "Infosys",
      description: "Data Scientist role in Bangalore. Work with big data technologies and machine learning algorithms in a collaborative environment.",
      imageUrl: "/next.svg",
      type: "Full-time" as const,
      isUrgent: false
    },
    {
      id: "location-3",
      title: "Mumbai - Frontend Developer",
      company: "Wipro",
      description: "Frontend Developer position in Mumbai. Create responsive web applications using React, Angular, and modern web technologies.",
      imageUrl: "/next.svg",
      type: "Full-time" as const,
      isUrgent: true
    },
    {
      id: "location-4",
      title: "Mumbai - Business Analyst",
      company: "HCL",
      description: "Business Analyst role in Mumbai. Analyze business requirements and work closely with stakeholders to deliver solutions.",
      imageUrl: "/next.svg",
      type: "Full-time" as const,
      isUrgent: false
    },
    {
      id: "location-5",
      title: "Delhi - Product Manager",
      company: "Tech Mahindra",
      description: "Product Manager position in Delhi. Lead product development initiatives and work with cross-functional teams.",
      imageUrl: "/next.svg",
      type: "Full-time" as const,
      isUrgent: true
    },
    {
      id: "location-6",
      title: "Delhi - UI/UX Designer",
      company: "Cognizant",
      description: "UI/UX Designer role in Delhi. Create beautiful and intuitive user experiences for digital products.",
      imageUrl: "/next.svg",
      type: "Full-time" as const,
      isUrgent: false
    },
    {
      id: "location-7",
      title: "Chennai - Backend Developer",
      company: "Accenture",
      description: "Backend Developer position in Chennai. Build scalable backend services and APIs using Node.js, Python, and Java.",
      imageUrl: "/next.svg",
      type: "Full-time" as const,
      isUrgent: true
    },
    {
      id: "location-8",
      title: "Chennai - DevOps Engineer",
      company: "Capgemini",
      description: "DevOps Engineer role in Chennai. Manage cloud infrastructure and implement CI/CD pipelines for efficient deployment.",
      imageUrl: "/next.svg",
      type: "Full-time" as const,
      isUrgent: false
    },
    {
      id: "location-9",
      title: "Hyderabad - Mobile Developer",
      company: "L&T Infotech",
      description: "Mobile Developer position in Hyderabad. Develop native and cross-platform mobile applications for iOS and Android.",
      imageUrl: "/next.svg",
      type: "Full-time" as const,
      isUrgent: true
    },
    {
      id: "location-10",
      title: "Hyderabad - QA Engineer",
      company: "Mindtree",
      description: "QA Engineer role in Hyderabad. Ensure software quality through comprehensive testing and automation.",
      imageUrl: "/next.svg",
      type: "Full-time" as const,
      isUrgent: false
    },
    {
      id: "location-11",
      title: "Pune - Cloud Engineer",
      company: "Mphasis",
      description: "Cloud Engineer position in Pune. Design and implement cloud infrastructure solutions using AWS, Azure, and GCP.",
      imageUrl: "/next.svg",
      type: "Full-time" as const,
      isUrgent: true
    },
    {
      id: "location-12",
      title: "Pune - Security Analyst",
      company: "Deloitte",
      description: "Security Analyst role in Pune. Focus on cybersecurity, network security, and threat analysis.",
      imageUrl: "/next.svg",
      type: "Full-time" as const,
      isUrgent: false
    }
  ];

  const filteredJobs = locationJobs.filter(job => {
    const matchesCity = selectedCity === 'all' || job.title.toLowerCase().includes(selectedCity);
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCity && matchesSearch;
  });

  // Get dynamic title based on selected city
  const getDynamicTitle = () => {
    if (selectedCity === 'all') {
      return 'All Location Jobs';
    }
    const city = cities.find(c => c.id === selectedCity);
    return city ? city.name : 'Location Jobs';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="space-y-8 sm:space-y-4">
      {/* Page Header */}
      <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{getDynamicTitle()}</h1>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">Find job opportunities in your preferred location.</p>
      </div>

          {/* Job Cards Section */}
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8">Available Location Jobs</h2>
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
