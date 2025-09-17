'use client';
import Image from 'next/image';
import Link from 'next/link';

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  description: string;
  imageUrl: string;
  type?: 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Work from Home' | 'Walk-in';
  isUrgent?: boolean;
}

export default function JobCard({
  title,
  company,
  description,
  imageUrl,
  type = 'Full-time',
  isUrgent = false
}: JobCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 overflow-hidden group">
      {/* Header with Image and Badge */}
      <div className="relative">
        <div className="h-48 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
          <Image
            src={imageUrl}
            alt={`${company} logo`}
            width={120}
            height={120}
            className="object-contain max-h-24 max-w-24 rounded-lg"
          />
        </div>
        
        {/* Urgent Badge */}
        {isUrgent && (
          <div className="absolute top-3 left-3">
            <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
              URGENT
            </span>
          </div>
        )}
        
        {/* Job Type Badge */}
        <div className="absolute top-3 right-3">
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
            {type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-3">
        {/* Title and Company */}
        <div className="mb-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 font-medium">{company}</p>
        </div>

        {/* Description */}
        <div className="mb-2">
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>

        {/* Apply Button */}
        <div className="flex items-center justify-between">
          <Link
            href="/user/job-details"
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-center hover:bg-blue-700 transition-colors mr-3"
          >
            Apply Now
          </Link>
          
          <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
