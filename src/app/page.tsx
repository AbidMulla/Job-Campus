'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import Header from '@/components/user/Header';
import Sidebar from '@/components/user/Sidebar';
import JobCard from '@/components/user/JobCard';
import CustomerReview from '@/components/user/CustomerReview';
import Footer from '@/components/user/Footer';

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

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
    { id: 'all', label: 'Start All IT Job', icon: 'mdi:laptop' },
    { id: 'banking', label: 'Banking Job', icon: 'mdi:bank' },
    { id: 'healthcare', label: 'Healthcare Job', icon: 'mdi:medical-bag' },
    { id: 'manufacturing', label: 'Manufacturing Job', icon: 'mdi:factory' },
    { id: 'education', label: 'Education Job', icon: 'mdi:school' },
    { id: 'retail', label: 'Retail Job', icon: 'mdi:shopping' },
    { id: 'marketing', label: 'Marketing Job', icon: 'mdi:bullhorn' },
    { id: 'design', label: 'Design Job', icon: 'mdi:palette' },
    { id: 'engineering', label: 'Engineering Job', icon: 'mdi:cog' },
    { id: 'consulting', label: 'Consulting Job', icon: 'mdi:account-group' }
  ];

  // Job data for each category
  const jobData = {
    all: [
      { id: "job-1", title: "Senior React Developer", company: "TechCorp", description: "We are looking for an experienced React developer to join our dynamic team. You will work on cutting-edge web applications and collaborate with talented engineers.", imageUrl: "/next.svg", type: "Full-time" as const, isUrgent: true },
      { id: "job-2", title: "UI/UX Designer", company: "DesignStudio", description: "Join our creative team as a UI/UX Designer. Create beautiful and intuitive user experiences for our digital products and platforms.", imageUrl: "/next.svg", type: "Full-time" as const },
      { id: "job-3", title: "Data Scientist", company: "Analytics Inc", description: "Help us build intelligent solutions using machine learning and data analysis. Work with large datasets and develop predictive models.", imageUrl: "/next.svg", type: "Full-time" as const },
      { id: "job-4", title: "Frontend Developer", company: "WebSolutions", description: "Join our remote team as a Frontend Developer. Build responsive web applications using modern technologies like React and TypeScript.", imageUrl: "/next.svg", type: "Contract" as const },
      { id: "job-5", title: "Product Manager", company: "InnovateTech", description: "Lead product development initiatives and work closely with engineering teams to deliver exceptional user experiences.", imageUrl: "/next.svg", type: "Full-time" as const, isUrgent: true },
      { id: "job-6", title: "DevOps Engineer", company: "CloudTech", description: "Manage our cloud infrastructure and implement CI/CD pipelines. Ensure high availability and performance of our systems.", imageUrl: "/next.svg", type: "Full-time" as const }
    ],
    banking: [
      { id: "bank-1", title: "Banking Analyst", company: "GlobalBank", description: "Analyze financial data and market trends to support strategic decision-making in our banking operations.", imageUrl: "/next.svg", type: "Full-time" as const, isUrgent: true },
      { id: "bank-2", title: "Credit Risk Manager", company: "SecureBank", description: "Manage credit risk assessment and develop strategies to minimize financial losses.", imageUrl: "/next.svg", type: "Full-time" as const },
      { id: "bank-3", title: "Investment Advisor", company: "WealthBank", description: "Provide investment advice and portfolio management services to high-net-worth clients.", imageUrl: "/next.svg", type: "Full-time" as const },
      { id: "bank-4", title: "Compliance Officer", company: "RegBank", description: "Ensure banking operations comply with regulatory requirements and industry standards.", imageUrl: "/next.svg", type: "Full-time" as const }
    ],
    healthcare: [
      { id: "health-1", title: "Medical Data Analyst", company: "HealthTech", description: "Analyze healthcare data to improve patient outcomes and operational efficiency.", imageUrl: "/next.svg", type: "Full-time" as const, isUrgent: true },
      { id: "health-2", title: "Healthcare IT Specialist", company: "MedSystems", description: "Implement and maintain healthcare information systems and electronic health records.", imageUrl: "/next.svg", type: "Full-time" as const },
      { id: "health-3", title: "Clinical Research Coordinator", company: "ResearchMed", description: "Coordinate clinical trials and research studies in healthcare settings.", imageUrl: "/next.svg", type: "Full-time" as const },
      { id: "health-4", title: "Healthcare Administrator", company: "HealthAdmin", description: "Manage healthcare facility operations and administrative processes.", imageUrl: "/next.svg", type: "Full-time" as const }
    ],
    manufacturing: [
      { id: "mfg-1", title: "Production Engineer", company: "ManufactureCorp", description: "Optimize manufacturing processes and improve production efficiency.", imageUrl: "/next.svg", type: "Full-time" as const, isUrgent: true },
      { id: "mfg-2", title: "Quality Control Specialist", company: "QualityMfg", description: "Ensure product quality through testing and quality control procedures.", imageUrl: "/next.svg", type: "Full-time" as const },
      { id: "mfg-3", title: "Supply Chain Analyst", company: "SupplyChain", description: "Analyze and optimize supply chain operations and logistics.", imageUrl: "/next.svg", type: "Full-time" as const },
      { id: "mfg-4", title: "Industrial Designer", company: "DesignMfg", description: "Design innovative manufacturing processes and industrial products.", imageUrl: "/next.svg", type: "Full-time" as const }
    ],
    education: [
      { id: "edu-1", title: "Educational Technology Specialist", company: "EduTech", description: "Implement and support educational technology solutions in learning environments.", imageUrl: "/next.svg", type: "Full-time" as const, isUrgent: true },
      { id: "edu-2", title: "Curriculum Developer", company: "CurriculumCorp", description: "Develop engaging and effective educational curricula for various subjects.", imageUrl: "/next.svg", type: "Full-time" as const },
      { id: "edu-3", title: "Online Learning Coordinator", company: "OnlineEdu", description: "Coordinate and manage online learning programs and virtual classrooms.", imageUrl: "/next.svg", type: "Full-time" as const },
      { id: "edu-4", title: "Educational Content Creator", company: "ContentEdu", description: "Create engaging educational content for digital learning platforms.", imageUrl: "/next.svg", type: "Full-time" as const }
    ],
    retail: [
      { id: "retail-1", title: "Retail Analytics Manager", company: "RetailAnalytics", description: "Analyze retail data to optimize store performance and customer experience.", imageUrl: "/next.svg", type: "Full-time" as const, isUrgent: true },
      { id: "retail-2", title: "E-commerce Specialist", company: "EcommerceRetail", description: "Manage online retail operations and digital customer experience.", imageUrl: "/next.svg", type: "Full-time" as const },
      { id: "retail-3", title: "Inventory Manager", company: "InventoryRetail", description: "Optimize inventory levels and manage supply chain for retail operations.", imageUrl: "/next.svg", type: "Full-time" as const },
      { id: "retail-4", title: "Customer Experience Manager", company: "CXRetail", description: "Enhance customer experience and satisfaction in retail environments.", imageUrl: "/next.svg", type: "Full-time" as const }
    ],
    marketing: [
      { id: "mkt-1", title: "Digital Marketing Manager", company: "DigitalMkt", description: "Lead digital marketing campaigns and strategies across multiple channels.", imageUrl: "/next.svg", type: "Full-time" as const, isUrgent: true },
      { id: "mkt-2", title: "SEO Specialist", company: "SEOSpecialist", description: "Optimize website content and improve search engine rankings.", imageUrl: "/next.svg", type: "Full-time" as const },
      { id: "mkt-3", title: "Social Media Manager", company: "SocialMkt", description: "Manage social media presence and engage with online communities.", imageUrl: "/next.svg", type: "Full-time" as const },
      { id: "mkt-4", title: "Content Marketing Strategist", company: "ContentMkt", description: "Develop and execute content marketing strategies to drive engagement.", imageUrl: "/next.svg", type: "Full-time" as const }
    ],
    design: [
      { id: "design-1", title: "UI/UX Designer", company: "DesignStudio", description: "Create beautiful and intuitive user experiences for digital products.", imageUrl: "/next.svg", type: "Full-time" as const, isUrgent: true },
      { id: "design-2", title: "Graphic Designer", company: "GraphicDesign", description: "Design compelling visual content for marketing and branding materials.", imageUrl: "/next.svg", type: "Full-time" as const },
      { id: "design-3", title: "Product Designer", company: "ProductDesign", description: "Design innovative product solutions and user interfaces.", imageUrl: "/next.svg", type: "Full-time" as const },
      { id: "design-4", title: "Brand Designer", company: "BrandDesign", description: "Develop and maintain brand identity and visual guidelines.", imageUrl: "/next.svg", type: "Full-time" as const }
    ],
    engineering: [
      { id: "eng-1", title: "Software Engineer", company: "SoftwareCorp", description: "Develop high-quality software solutions using modern technologies.", imageUrl: "/next.svg", type: "Full-time" as const, isUrgent: true },
      { id: "eng-2", title: "Data Engineer", company: "DataEngineering", description: "Build and maintain data pipelines and infrastructure.", imageUrl: "/next.svg", type: "Full-time" as const },
      { id: "eng-3", title: "DevOps Engineer", company: "DevOpsCorp", description: "Manage cloud infrastructure and implement CI/CD pipelines.", imageUrl: "/next.svg", type: "Full-time" as const },
      { id: "eng-4", title: "Systems Engineer", company: "SystemsCorp", description: "Design and maintain complex system architectures.", imageUrl: "/next.svg", type: "Full-time" as const }
    ],
    consulting: [
      { id: "consult-1", title: "Business Consultant", company: "BusinessConsult", description: "Provide strategic business advice and solutions to clients.", imageUrl: "/next.svg", type: "Full-time" as const, isUrgent: true },
      { id: "consult-2", title: "IT Consultant", company: "ITConsulting", description: "Advise on technology strategy and digital transformation.", imageUrl: "/next.svg", type: "Full-time" as const },
      { id: "consult-3", title: "Management Consultant", company: "ManagementConsult", description: "Help organizations improve performance and efficiency.", imageUrl: "/next.svg", type: "Full-time" as const },
      { id: "consult-4", title: "Strategy Consultant", company: "StrategyConsult", description: "Develop strategic plans and business strategies.", imageUrl: "/next.svg", type: "Full-time" as const }
    ]
  };

  // Get current jobs based on active tab
  const currentJobs = jobData[activeTab as keyof typeof jobData] || jobData.all;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar - Only visible on mobile */}
      <div className="lg:hidden">
        <Sidebar isMobileMenuOpen={isMobileMenuOpen} onMenuClose={handleMenuClose} />
      </div>

      {/* Header */}
      <Header onMenuToggle={handleMenuToggle} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="space-y-8 sm:space-y-12">
          {/* Hero Section */}
          <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-2xl p-6 sm:p-8 lg:p-12 text-white relative">
            {/* Resume Link - Top Left */}
            <div className="absolute top-4 left-4 sm:top-2 sm:left-2">
              <Link
                href="/resume"
                className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-medium hover:bg-white/30 transition-all duration-300 border border-white/30 flex items-center gap-2 text-sm sm:text-base group"
              >
                <Icon icon="mdi:file-document" className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Do you want resume?</span>
              </Link>
            </div>
            
            <div className="max-w-4xl mx-auto text-center mt-3">
              {/* Quick Access Links */}
              <div className="grid grid-cols-2 gap-2 sm:hidden mb-6 sm:mb-8">
                <Link
                  href="/user/courses?category=it"
                  className="bg-white/20 backdrop-blur-sm text-white px-2 py-2 rounded-lg font-medium hover:bg-white/30 transition-all duration-300 border border-white/30 flex items-center justify-center gap-2 text-center min-h-[50px] group"
                >
                  <Icon icon="mdi:laptop" className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-xs">IT Job</span>
                </Link>
                <Link
                  href="/user/courses?category=banking"
                  className="bg-white/20 backdrop-blur-sm text-white px-2 py-2 rounded-lg font-medium hover:bg-white/30 transition-all duration-300 border border-white/30 flex items-center justify-center gap-2 text-center min-h-[50px] group"
                >
                  <Icon icon="mdi:bank" className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-xs">Banking Job</span>
                </Link>
                <Link
                  href="/user/courses?category=healthcare"
                  className="bg-white/20 backdrop-blur-sm text-white px-2 py-2 rounded-lg font-medium hover:bg-white/30 transition-all duration-300 border border-white/30 flex items-center justify-center gap-2 text-center min-h-[50px] group"
                >
                  <Icon icon="mdi:medical-bag" className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-xs">Healthcare Job</span>
                </Link>
                <Link
                  href="/user/courses?category=manufacturing"
                  className="bg-white/20 backdrop-blur-sm text-white px-2 py-2 rounded-lg font-medium hover:bg-white/30 transition-all duration-300 border border-white/30 flex items-center justify-center gap-2 text-center min-h-[50px] group"
                >
                  <Icon icon="mdi:factory" className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-xs">Manufacturing Job</span>
                </Link>
                <Link
                  href="/user/courses?category=education"
                  className="bg-white/20 backdrop-blur-sm text-white px-2 py-2 rounded-lg font-medium hover:bg-white/30 transition-all duration-300 border border-white/30 flex items-center justify-center gap-2 text-center min-h-[50px] group"
                >
                  <Icon icon="mdi:school" className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-xs">Education Job</span>
                </Link>
                <Link
                  href="/user/courses?category=retail"
                  className="bg-white/20 backdrop-blur-sm text-white px-2 py-2 rounded-lg font-medium hover:bg-white/30 transition-all duration-300 border border-white/30 flex items-center justify-center gap-2 text-center min-h-[50px] group"
                >
                  <Icon icon="mdi:shopping" className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-xs">Retail Job</span>
                </Link>
                <Link
                  href="/user/courses?category=marketing"
                  className="bg-white/20 backdrop-blur-sm text-white px-2 py-2 rounded-lg font-medium hover:bg-white/30 transition-all duration-300 border border-white/30 flex items-center justify-center gap-2 text-center min-h-[50px] group"
                >
                  <Icon icon="mdi:bullhorn" className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-xs">Marketing Job</span>
                </Link>
                <Link
                  href="/user/courses?category=design"
                  className="bg-white/20 backdrop-blur-sm text-white px-2 py-2 rounded-lg font-medium hover:bg-white/30 transition-all duration-300 border border-white/30 flex items-center justify-center gap-2 text-center min-h-[50px] group"
                >
                  <Icon icon="mdi:palette" className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-xs">Design Job</span>
                </Link>
                <Link
                  href="/user/courses?category=engineering"
                  className="bg-white/20 backdrop-blur-sm text-white px-2 py-2 rounded-lg font-medium hover:bg-white/30 transition-all duration-300 border border-white/30 flex items-center justify-center gap-2 text-center min-h-[50px] group"
                >
                  <Icon icon="mdi:cog" className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-xs">Engineering Job</span>
                </Link>
                <Link
                  href="/user/courses?category=consulting"
                  className="bg-white/20 backdrop-blur-sm text-white px-2 py-2 rounded-lg font-medium hover:bg-white/30 transition-all duration-300 border border-white/30 flex items-center justify-center gap-2 text-center min-h-[50px] group"
                >
                  <Icon icon="mdi:account-group" className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-xs">Consulting Job</span>
                </Link>
              </div>

              {/* Desktop Quick Access Links */}
              <div className="hidden sm:flex flex-wrap justify-center gap-3 mb-6 sm:mb-8">
                <Link
                  href="/user/courses?category=it"
                  className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-medium hover:bg-white/30 transition-all duration-300 border border-white/30 flex items-center gap-2"
                >
                  <Icon icon="mdi:laptop" className="w-5 h-5" />
                  IT Job
                </Link>
                <Link
                  href="/user/courses?category=banking"
                  className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-medium hover:bg-white/30 transition-all duration-300 border border-white/30 flex items-center gap-2"
                >
                  <Icon icon="mdi:bank" className="w-5 h-5" />
                  Banking Job
                </Link>
                <Link
                  href="/user/courses?category=healthcare"
                  className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-medium hover:bg-white/30 transition-all duration-300 border border-white/30 flex items-center gap-2"
                >
                  <Icon icon="mdi:medical-bag" className="w-5 h-5" />
                  Healthcare Job
                </Link>
                <Link
                  href="/user/courses?category=manufacturing"
                  className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-medium hover:bg-white/30 transition-all duration-300 border border-white/30 flex items-center gap-2"
                >
                  <Icon icon="mdi:factory" className="w-5 h-5" />
                  Manufacturing Job
                </Link>
                <Link
                  href="/user/courses?category=education"
                  className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-medium hover:bg-white/30 transition-all duration-300 border border-white/30 flex items-center gap-2"
                >
                  <Icon icon="mdi:school" className="w-5 h-5" />
                  Education Job
                </Link>
                <Link
                  href="/user/courses?category=retail"
                  className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-medium hover:bg-white/30 transition-all duration-300 border border-white/30 flex items-center gap-2"
                >
                  <Icon icon="mdi:shopping" className="w-5 h-5" />
                  Retail Job
                </Link>
                <Link
                  href="/user/courses?category=marketing"
                  className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-medium hover:bg-white/30 transition-all duration-300 border border-white/30 flex items-center gap-2"
                >
                  <Icon icon="mdi:bullhorn" className="w-5 h-5" />
                  Marketing Job
                </Link>
                <Link
                  href="/user/courses?category=design"
                  className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-medium hover:bg-white/30 transition-all duration-300 border border-white/30 flex items-center gap-2"
                >
                  <Icon icon="mdi:palette" className="w-5 h-5" />
                  Design Job
                </Link>
                <Link
                  href="/user/courses?category=engineering"
                  className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-medium hover:bg-white/30 transition-all duration-300 border border-white/30 flex items-center gap-2"
                >
                  <Icon icon="mdi:cog" className="w-5 h-5" />
                  Engineering Job
                </Link>
                <Link
                  href="/user/courses?category=consulting"
                  className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-medium hover:bg-white/30 transition-all duration-300 border border-white/30 flex items-center gap-2"
                >
                  <Icon icon="mdi:account-group" className="w-5 h-5" />
                  Consulting Job
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
                  href="/about"
                  className="border-2 border-white text-white px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors text-center"
                >
                  About Us
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

      {/* Footer */}
      <Footer />
    </div>
  );
}
