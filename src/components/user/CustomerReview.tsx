'use client';
import { useState } from 'react';

interface Review {
  id: number;
  name: string;
  role: string;
  company: string;
  rating: number;
  review: string;
  avatar: string;
  date: string;
}

interface CustomerReviewProps {
  reviews?: Review[];
  title?: string;
  subtitle?: string;
}

export default function CustomerReview({ 
  reviews = [], 
  title = "What Our Users Say",
  subtitle = "Real testimonials from professionals who found their dream jobs"
}: CustomerReviewProps) {
  const [activeReview, setActiveReview] = useState(0);

  // Default reviews if none provided
  const defaultReviews: Review[] = [
    {
      id: 1,
      name: "Priya Sharma",
      role: "Software Engineer",
      company: "TechCorp",
      rating: 5,
      review: "FresherJobCampus helped me land my first job as a Software Engineer. The platform is incredibly user-friendly and the job opportunities are amazing. Highly recommended for all freshers!",
      avatar: "PS",
      date: "2 weeks ago"
    },
    {
      id: 2,
      name: "Rahul Kumar",
      role: "Data Analyst",
      company: "Analytics Inc",
      rating: 5,
      review: "I was struggling to find a job after graduation, but FresherJobCampus made it so easy. Within a month, I got multiple interview calls and landed a great position. Thank you!",
      avatar: "RK",
      date: "1 month ago"
    },
    {
      id: 3,
      name: "Anjali Patel",
      role: "UI/UX Designer",
      company: "DesignStudio",
      rating: 5,
      review: "The job matching algorithm is spot on! I found a perfect role that matches my skills and interests. The application process was smooth and professional.",
      avatar: "AP",
      date: "3 weeks ago"
    },
    {
      id: 4,
      name: "Vikram Singh",
      role: "Product Manager",
      company: "InnovateTech",
      rating: 5,
      review: "As a fresher, I was worried about job hunting, but FresherJobCampus provided excellent guidance and opportunities. The platform is a game-changer for new graduates.",
      avatar: "VS",
      date: "1 week ago"
    },
    {
      id: 5,
      name: "Meera Reddy",
      role: "DevOps Engineer",
      company: "CloudTech",
      rating: 5,
      review: "The quality of job postings is outstanding. I found my dream job with a great company and competitive salary. FresherJobCampus is the best platform for freshers!",
      avatar: "MR",
      date: "2 months ago"
    }
  ];

  const displayReviews = reviews.length > 0 ? reviews : defaultReviews;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  const nextReview = () => {
    setActiveReview((prev) => {
      if (prev >= displayReviews.length - 3) {
        return 0; // Loop back to first review
      }
      return prev + 1;
    });
  };

  const prevReview = () => {
    setActiveReview((prev) => {
      if (prev <= 0) {
        return displayReviews.length - 3; // Loop to last set of reviews
      }
      return prev - 1;
    });
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

                 {/* Reviews Carousel - 3 Cards in a Row */}
         <div className="relative overflow-hidden">
           <div 
             className="flex transition-transform duration-500 ease-in-out"
             style={{ transform: `translateX(-${activeReview * 33.333}%)` }}
           >
             {displayReviews.map((review) => (
               <div key={review.id} className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-3">
                 <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 h-full">
                   <div className="text-center">
                     {/* Avatar */}
                     <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                       <span className="text-white font-bold text-lg">
                         {review.avatar}
                       </span>
                     </div>

                     {/* Review Text */}
                     <blockquote className="text-sm text-gray-700 mb-6 leading-relaxed text-justify">
                       "{review.review}"
                     </blockquote>

                     {/* User Info */}
                     <div className="text-center">
                       <h4 className="text-sm font-semibold text-blue-600 mb-1">
                         {review.name}
                       </h4>
                       <p className="text-xs text-gray-600">
                         {review.role}
                       </p>
                     </div>
                   </div>
                 </div>
               </div>
             ))}
           </div>
         </div>

         {/* Navigation Controls */}
         <div className="flex justify-center space-x-4 mt-2">
           <button
             onClick={prevReview}
             className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-300"
           >
             <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
             </svg>
           </button>
           
           <button
             onClick={nextReview}
             className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-300"
           >
             <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
             </svg>
           </button>
         </div>

        
      </div>
    </div>
  );
}
