'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import Header from '@/components/user/Header';
import Sidebar from '@/components/user/Sidebar';
import JobCard from '@/components/user/JobCard';
import MovingLogos from '@/components/user/MovingLogos';
import CustomerReview from '@/components/user/CustomerReview';
import Footer from '@/components/user/Footer';


export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('it');


  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  const handleShare = (platform: 'whatsapp' | 'telegram') => {
    const url = window.location.href;
    const title = 'FresherJobCampus - Latest Job Updates';
    const text = 'Get latest job updates from FresherJobCampus!';
    
    if (platform === 'whatsapp') {
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${text} ${title} - ${url}`)}`;
      window.open(whatsappUrl, '_blank');
    } else if (platform === 'telegram') {
      const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(`${text} ${title}`)}`;
      window.open(telegramUrl, '_blank');
    }
  };

  const handleEmailNotification = () => {
    const subject = 'FresherJobCampus - Job Updates Subscription';
    const body = 'I would like to receive email notifications for new job opportunities from FresherJobCampus.';
    const mailtoUrl = `mailto:careers@fresherjobcampus.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl, '_blank');
  };

  const jobTabs = [
    { id: 'it', label: 'IT jobs', icon: 'mdi:laptop' },
    { id: 'non-it', label: 'non-IT', icon: 'mdi:briefcase' },
    { id: 'walk-in', label: 'walk-in drive', icon: 'mdi:walk' },
    { id: 'work-from-home', label: 'work from home', icon: 'mdi:home' }
  ];

  // Job data for each category
  const jobData = {
    it: [
      { id: "job-1", title: "Senior React Developer", company: "TechCorp", description: "We are looking for an experienced React developer to join our dynamic team. You will work on cutting-edge web applications and collaborate with talented engineers.", imageUrl: "/next.svg", type: "Full-time" as const, isUrgent: true },
      { id: "job-2", title: "Frontend Developer", company: "WebSolutions", description: "Join our remote team as a Frontend Developer. Build responsive web applications using modern technologies like React and TypeScript.", imageUrl: "/next.svg", type: "Contract" as const },
      { id: "job-3", title: "Data Scientist", company: "Analytics Inc", description: "Help us build intelligent solutions using machine learning and data analysis. Work with large datasets and develop predictive models.", imageUrl: "/next.svg", type: "Full-time" as const },
      { id: "job-4", title: "DevOps Engineer", company: "CloudTech", description: "Manage our cloud infrastructure and implement CI/CD pipelines. Ensure high availability and performance of our systems.", imageUrl: "/next.svg", type: "Full-time" as const },
      { id: "job-5", title: "Software Engineer", company: "SoftwareCorp", description: "Develop high-quality software solutions using modern technologies.", imageUrl: "/next.svg", type: "Full-time" as const, isUrgent: true },
      { id: "job-6", title: "Full Stack Developer", company: "InnovateTech", description: "Lead product development initiatives and work closely with engineering teams to deliver exceptional user experiences.", imageUrl: "/next.svg", type: "Full-time" as const }
    ],
    "non-it": [
      { id: "non-it-1", title: "Marketing Manager", company: "MarketPro", description: "Lead marketing campaigns and strategies to increase brand awareness and customer engagement.", imageUrl: "/next.svg", type: "Full-time" as const, isUrgent: true },
      { id: "non-it-2", title: "HR Specialist", company: "HRSolutions", description: "Manage recruitment processes and employee relations in a dynamic work environment.", imageUrl: "/next.svg", type: "Full-time" as const },
      { id: "non-it-3", title: "Sales Executive", company: "SalesForce", description: "Drive sales growth and build relationships with clients across various industries.", imageUrl: "/next.svg", type: "Full-time" as const },
      { id: "non-it-4", title: "Financial Analyst", company: "FinanceHub", description: "Analyze financial data and provide insights for business decision-making.", imageUrl: "/next.svg", type: "Full-time" as const, isUrgent: true },
      { id: "non-it-5", title: "Content Writer", company: "ContentCorp", description: "Create engaging content for websites, blogs, and marketing materials.", imageUrl: "/next.svg", type: "Contract" as const },
      { id: "non-it-6", title: "Customer Service Representative", company: "ServicePro", description: "Provide excellent customer support and resolve customer inquiries.", imageUrl: "/next.svg", type: "Full-time" as const }
    ],
    "walk-in": [
      { id: "walk-in-1", title: "Junior Developer - Walk-in", company: "TechStart", description: "Walk-in interview for junior developers. Immediate joining for the right candidates.", imageUrl: "/next.svg", type: "Walk-in" as const, isUrgent: true },
      { id: "walk-in-2", title: "Sales Associate - Walk-in", company: "RetailMax", description: "Walk-in interviews for sales positions. No prior experience required, training provided.", imageUrl: "/next.svg", type: "Walk-in" as const, isUrgent: true },
      { id: "walk-in-3", title: "Customer Support - Walk-in", company: "SupportDesk", description: "Immediate openings for customer support roles. Walk-in interviews daily.", imageUrl: "/next.svg", type: "Walk-in" as const },
      { id: "walk-in-4", title: "Data Entry Operator - Walk-in", company: "DataCorp", description: "Walk-in interviews for data entry positions. Flexible timing available.", imageUrl: "/next.svg", type: "Walk-in" as const },
      { id: "walk-in-5", title: "Marketing Executive - Walk-in", company: "MarketingPlus", description: "Walk-in drive for marketing executives. Fresh graduates welcome.", imageUrl: "/next.svg", type: "Walk-in" as const, isUrgent: true },
      { id: "walk-in-6", title: "HR Assistant - Walk-in", company: "HRTeam", description: "Immediate hiring for HR assistant roles through walk-in interviews.", imageUrl: "/next.svg", type: "Walk-in" as const }
    ],
    "work-from-home": [
      { id: "wfh-1", title: "Remote Software Developer", company: "RemoteTech", description: "Work from home as a software developer. Build applications using modern technologies and collaborate with distributed teams.", imageUrl: "/next.svg", type: "Work from Home" as const, isUrgent: true },
      { id: "wfh-2", title: "Virtual Customer Support", company: "SupportRemote", description: "Provide customer support from the comfort of your home. Handle inquiries and resolve issues through phone, email, and chat.", imageUrl: "/next.svg", type: "Work from Home" as const },
      { id: "wfh-3", title: "Online Content Writer", company: "ContentRemote", description: "Create engaging content for websites, blogs, and social media. Work flexible hours from anywhere with internet connection.", imageUrl: "/next.svg", type: "Work from Home" as const },
      { id: "wfh-4", title: "Remote Data Entry Specialist", company: "DataRemote", description: "Handle data entry tasks remotely. Input and maintain accurate records in various databases and systems.", imageUrl: "/next.svg", type: "Work from Home" as const },
      { id: "wfh-5", title: "Virtual Assistant", company: "VirtualAssist", description: "Provide administrative support to businesses remotely. Manage schedules, emails, and various administrative tasks.", imageUrl: "/next.svg", type: "Work from Home" as const },
      { id: "wfh-6", title: "Remote Graphic Designer", company: "DesignRemote", description: "Create visual designs and graphics for clients from home. Work with design software and collaborate with teams online.", imageUrl: "/next.svg", type: "Work from Home" as const, isUrgent: true }
    ]
  };

  // Get current jobs based on active tab
  const currentJobs = jobData[activeTab as keyof typeof jobData] || jobData.it;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar - Only visible on mobile */}
      <div className="lg:hidden">
        <Sidebar isMobileMenuOpen={isMobileMenuOpen} onMenuClose={handleMenuClose} />
      </div>

      {/* Header */}
      <Header onMenuToggle={handleMenuToggle} />

      {/* Scrolling Text - Full Width */}
      {/* <ScrollingText /> */}


      <div className="w-full relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-2 lg:px-4 py-4 sm:py-8">
          <div className="space-y-8 sm:space-y-12">

          {/* Hero Section */}
          <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-2xl p-6 sm:p-8 lg:p-12 text-white relative">
            {/* Resume Link - Top Left */}

            
            <div className="max-w-4xl mx-auto text-center mt-3">
              {/* Quick Access Links */}
              <div className="grid grid-cols-2 gap-2 sm:hidden mb-6 sm:mb-8">
                <Link
                  href="/user/courses?category=it"
                  className="bg-white/20 backdrop-blur-sm text-white px-2 py-2 rounded-lg font-medium hover:bg-white/30 transition-all duration-300 border border-white/30 flex items-center justify-center gap-2 text-center min-h-[50px] group"
                >
                  <Icon icon="mdi:laptop" className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-xs">IT jobs</span>
                </Link>
                <Link
                  href="/user/courses?category=non-it"
                  className="bg-white/20 backdrop-blur-sm text-white px-2 py-2 rounded-lg font-medium hover:bg-white/30 transition-all duration-300 border border-white/30 flex items-center justify-center gap-2 text-center min-h-[50px] group"
                >
                  <Icon icon="mdi:briefcase" className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-xs">non-IT</span>
                </Link>
                <Link
                  href="/user/courses?category=walk-in"
                  className="bg-white/20 backdrop-blur-sm text-white px-2 py-2 rounded-lg font-medium hover:bg-white/30 transition-all duration-300 border border-white/30 flex items-center justify-center gap-2 text-center min-h-[50px] group"
                >
                  <Icon icon="mdi:walk" className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-xs">walk-in drive</span>
                </Link>
                <Link
                  href="/user/courses?category=work-from-home"
                  className="bg-white/20 backdrop-blur-sm text-white px-2 py-2 rounded-lg font-medium hover:bg-white/30 transition-all duration-300 border border-white/30 flex items-center justify-center gap-2 text-center min-h-[50px] group"
                >
                  <Icon icon="mdi:home" className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-xs">work from home</span>
                </Link>
              </div>

              {/* Desktop Quick Access Links */}
              <div className="hidden sm:flex flex-wrap justify-center gap-3 mb-6 sm:mb-8">
                <Link
                  href="/user/courses?category=it"
                  className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-medium hover:bg-white/30 transition-all duration-300 border border-white/30 flex items-center gap-2"
                >
                  <Icon icon="mdi:laptop" className="w-5 h-5" />
                  IT jobs
                </Link>
                <Link
                  href="/user/courses?category=non-it"
                  className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-medium hover:bg-white/30 transition-all duration-300 border border-white/30 flex items-center gap-2"
                >
                  <Icon icon="mdi:briefcase" className="w-5 h-5" />
                  non-IT
                </Link>
                <Link
                  href="/user/courses?category=walk-in"
                  className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-medium hover:bg-white/30 transition-all duration-300 border border-white/30 flex items-center gap-2"
                >
                  <Icon icon="mdi:walk" className="w-5 h-5" />
                  walk-in drive
                </Link>
                <Link
                  href="/user/courses?category=work-from-home"
                  className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-medium hover:bg-white/30 transition-all duration-300 border border-white/30 flex items-center gap-2"
                >
                  <Icon icon="mdi:home" className="w-5 h-5" />
                  work from home
                </Link>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                Welcome to Your FresherJobCampus
              </h1>
              <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
                You will get all the latest jobs updates, career opportunities, and professional growth resources to kickstart your career journey.
              </p>

              {/* Social Media Icons Below Job Title */}
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 mb-6 justify-center items-center">
                {/* WhatsApp Button */}
                <button
                  onClick={() => handleShare('whatsapp')}
                  className="w-full sm:w-auto group bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-3 animate-heartbeat transform-gpu"
                >
                  <Icon icon="mdi:whatsapp" className="w-6 h-6 sm:w-7 sm:h-7" />
                  <span className="font-medium">Join on WhatsApp</span>
                </button>

                {/* Telegram Button */}
                <button
                  onClick={() => handleShare('telegram')}
                  className="w-full sm:w-auto group bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-3 animate-heartbeat transform-gpu"
                >
                  <Icon icon="mdi:telegram" className="w-6 h-6 sm:w-7 sm:h-7" />
                  <span className="font-medium">Join on Telegram</span>
                </button>

                {/* Email Button */}
                <button
                  onClick={handleEmailNotification}
                  className="w-full sm:w-auto group bg-gradient-to-br from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-6 py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-3 animate-heartbeat transform-gpu"
                >
                  <Icon icon="mdi:email" className="w-6 h-6 sm:w-7 sm:h-7" />
                  <span className="font-medium">Get Email Updates</span>
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/auth/login"
                  className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center"
                >
                  Login
                </Link>
                <Link
                  href="/ContactUs"
                  className="border-2 border-white text-white px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors text-center"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>






          {/* Job Cards Section with Tabs */}
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8">Latest Job Opportunities</h2>

            {/* Job Category Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {jobTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  <Icon icon={tab.icon} className="w-4 h-4" />
                  <span className="text-sm sm:text-base">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Job Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentJobs.map((job) => (
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
          </div>

          {/* Stats Section */}
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8">Platform Statistics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">500+</div>
                <div className="text-gray-600 text-sm sm:text-base">Courses Available</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-green-600 mb-2">10K+</div>
                <div className="text-gray-600 text-sm sm:text-base">Active Learners</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-purple-600 mb-2">50K+</div>
                <div className="text-gray-600 text-sm sm:text-base">Certificates Issued</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-yellow-600 mb-2">98%</div>
                <div className="text-gray-600 text-sm sm:text-base">Satisfaction Rate</div>
              </div>
            </div>
          </div>

          {/* Moving Logos Section */}
          <MovingLogos />


          {/* Customer Reviews Section */}
          <CustomerReview />



          {/* Call to Action */}
          <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-2xl p-8 sm:p-12 lg:p-16 text-white text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 animate-pulse">
              Ready to Get Latest Jobs?
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Stay ahead of the competition with instant job notifications and updates
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              {/* Email Button */}
              <button
                onClick={() => {
                  const subject = 'FresherJobCampus - Job Updates Subscription';
                  const body = 'I would like to receive email notifications for new job opportunities from FresherJobCampus.';
                  const mailtoUrl = `mailto:careers@fresherjobcampus.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                  window.open(mailtoUrl, '_blank');
                }}
                className="group bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all duration-500 transform hover:scale-110 hover:shadow-2xl shadow-lg animate-bounce"
              >
                <div className="flex items-center gap-3">
                  <Icon icon="mdi:email" className="w-8 h-8 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Get Email Updates</span>
                </div>
              </button>

              {/* WhatsApp Button */}
              <button
                onClick={() => {
                  const url = window.location.href;
                  const title = 'FresherJobCampus - Latest Job Updates';
                  const text = 'Get latest job updates from FresherJobCampus!';
                  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${text} ${title} - ${url}`)}`;
                  window.open(whatsappUrl, '_blank');
                }}
                className="group bg-green-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-600 transition-all duration-500 transform hover:scale-110 hover:shadow-2xl shadow-lg animate-bounce"
                style={{ animationDelay: '0.1s' }}
              >
                <div className="flex items-center gap-3">
                  <Icon icon="mdi:whatsapp" className="w-8 h-8 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Join WhatsApp Group</span>
                </div>
              </button>

              {/* Telegram Button */}
              <button
                onClick={() => {
                  const url = window.location.href;
                  const title = 'FresherJobCampus - Latest Job Updates';
                  const text = 'Get latest job updates from FresherJobCampus!';
                  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(`${text} ${title}`)}`;
                  window.open(telegramUrl, '_blank');
                }}
                className="group bg-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-600 transition-all duration-500 transform hover:scale-110 hover:shadow-2xl shadow-lg animate-bounce"
                style={{ animationDelay: '0.3s' }}
              >
                <div className="flex items-center gap-3">
                  <Icon icon="mdi:telegram" className="w-8 h-8 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Join Telegram Channel</span>
                </div>
              </button>
            </div>

            <div className="mt-8 text-blue-100">
              <p className="text-sm">✨ Get instant notifications • 📱 Mobile friendly • 🔔 Real-time updates</p>
            </div>
          </div>
        </div>
      </div>
      
      </div>



      {/* Footer */}
      <Footer />
    </div>
  );
}
