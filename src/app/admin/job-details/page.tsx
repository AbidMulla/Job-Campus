'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import BreadCrumbs from '@/components/admin/BreadCrumbs';

export default function JobDetails() {
  const searchParams = useSearchParams();
  const jobId = searchParams.get('id');
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Mock job data - in real app, this would come from an API
  const mockJobs = [
    {
      id: 1,
      title: 'TCS iON NQT National Qualifier Test For Fresher',
      company: 'Tata Consultancy Services',
      location: 'Hyderabad',
      status: 'active',
      category: 'Development',
      jobType: 'Full Time',
      employmentType: 'Full-time',
      postedDate: '2024-01-15',
      expireDate: '2024-02-15',
      applications: 24,
      views: 156,
      salary: 'Competitive Package',
      experience: 'Entry Level',
      description: 'TCS iON NQT Off Campus Drive: TCS iON NQT Off Campus hiring fresher for any graduates are eligible. The detailed company eligibility and application details are given below.',
      aboutCompany: 'Capgemini is a global leader in partnering with companies to transform and manage their business by harnessing the power of technology. The Group is guided everyday by its purpose of unleashing human energy through technology for an inclusive and sustainable future.',
      jobDescription: 'Is the entry level in Software Engineering with a foundational understanding on programming concepts, software design and software development principles. Consistently works to direction with reducing supervision, producing accurate and reliable results. They are expected to be eager to learn and know when to ask questions and check for understanding. Understands and follows work processes. Is aware of costs related to own work. Organises own time to deliver against tasks set by others with a short term horizon. Works co-operatively with others to achieve team goals and has a direct and positive impact on project performance. Actively seeking feedback to improve and starting to manage own career with support.',
      requirements: [
        'Experience: IT Asset Management (ITAM) software like Manage Engine or equivalent',
        'Inventory Management',
        'Ticketing tool',
        'Compliance Monitoring and Data Analysis',
        'Bachelor\'s degree in IT, CSE, Business Administration, Commerce, Science',
        'Minimum of 6 months experience in IT Asset & Inventory Management, Procurement, focusing on Asset compliance and budgeting',
        'Strong negotiation skills and the ability to manage multiple teams and vendors simultaneously',
        'Good understanding of Hardware (servers, laptops), Network, Storage and consumables',
        'Excellent communication and interpersonal skills, with the ability to collaborate effectively with internal and external stakeholders'
      ],
      responsibilities: [
        'Works in the area of Software Engineering, which encompasses the development, maintenance and optimization of software solutions/applications.',
        'Applies scientific methods to analyse and solve software engineering problems.',
        'He/she is responsible for the development and application of software engineering practice and knowledge, in research, design, development and maintenance.',
        'His/her work requires the exercise of original thought and judgement and the ability to supervise the technical and administrative work of other software engineers.',
        'The software engineer builds skills and expertise of his/her software engineering discipline to reach standard software engineer skills expectations for the applicable role, as defined in Professional Communities.',
        'The software engineer collaborates and acts as team player with other software engineers and stakeholders.'
      ],
      benefits: [
        'Competitive salary and benefits package',
        'Flexible working hours and remote work options',
        'Professional development and training opportunities',
        'Health, dental, and vision insurance',
        '401(k) retirement plan with company match'
      ],
      contactEmail: 'careers@tcs.com',
      contactPhone: '+91 (40) 1234-5678',
      applicationLink: 'https://www.tcs.com/careers',
      socialLinks: {
        whatsapp: 'https://wa.me/1234567890',
        telegram: 'https://t.me/tcs_careers',
        emailUpdates: 'https://tcs.com/subscribe'
      }
    },
    {
      id: 2,
      title: 'UX Designer',
      company: 'Design Studio',
      location: 'San Francisco, CA',
      status: 'active',
      category: 'Design',
      jobType: 'IT',
      employmentType: 'Full-time',
      postedDate: '2024-01-14',
      expireDate: '2024-02-14',
      applications: 18,
      views: 134,
      salary: '$70k - $100k',
      description: 'Join our creative team as a UX Designer and help shape the future of digital experiences. We need someone passionate about user-centered design.',
      requirements: [
        '2+ years of UX design experience',
        'Proficiency in design tools like Figma, Sketch, or Adobe XD',
        'Understanding of user research and usability testing',
        'Knowledge of design systems and component libraries',
        'Portfolio showcasing previous work'
      ],
      responsibilities: [
        'Create user-centered designs by understanding business requirements',
        'Create user flows, wireframes, prototypes and mockups',
        'Translate requirements into style guides, design systems, design patterns and attractive user interfaces',
        'Create original graphic designs (e.g. images, sketches and tables)',
        'Identify and troubleshoot UX problems'
      ],
      benefits: [
        'Competitive salary and benefits',
        'Creative and collaborative work environment',
        'Latest design tools and software',
        'Professional development opportunities',
        'Health and wellness benefits'
      ],
      contactEmail: 'jobs@designstudio.com',
      contactPhone: '+1 (555) 987-6543'
    },
    {
      id: 3,
      title: 'Product Manager',
      company: 'Startup Inc',
      location: 'Remote',
      status: 'expire',
      category: 'Management',
      jobType: 'IT',
      employmentType: 'Work from Home',
      postedDate: '2024-01-13',
      expireDate: '2024-02-13',
      applications: 0,
      views: 89,
      salary: '$90k - $130k',
      description: 'We are seeking an experienced Product Manager to lead our product development efforts and drive innovation in our fast-growing startup.',
      requirements: [
        '5+ years of product management experience',
        'Strong analytical and problem-solving skills',
        'Experience with agile development methodologies',
        'Excellent communication and leadership skills',
        'Technical background or understanding preferred'
      ],
      responsibilities: [
        'Define product vision, strategy, and roadmap',
        'Gather and prioritize product requirements',
        'Work closely with engineering, design, and marketing teams',
        'Analyze market trends and competitive landscape',
        'Drive product launches and go-to-market strategies'
      ],
      benefits: [
        'Competitive salary and equity options',
        'Remote work flexibility',
        'Fast-paced startup environment',
        'Opportunity for rapid career growth',
        'Health insurance and other benefits'
      ],
      contactEmail: 'careers@startupinc.com',
      contactPhone: '+1 (555) 456-7890'
    }
  ];

  useEffect(() => {
    // Simulate API call
    const fetchJob = () => {
      const foundJob = mockJobs.find(j => j.id === Number(jobId));
      setJob(foundJob || null);
      setLoading(false);
    };

    if (jobId) {
      fetchJob();
    }
  }, [jobId]);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', label: 'Active' },
      expire: { color: 'bg-red-100 text-red-800', label: 'Expire' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.expire;
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getJobTypeBadge = (jobType: string) => {
    const jobTypeConfig = {
      IT: { color: 'bg-blue-100 text-blue-800' },
      'Non-IT': { color: 'bg-gray-100 text-gray-800' },
      Banking: { color: 'bg-green-100 text-green-800' },
      Marketing: { color: 'bg-pink-100 text-pink-800' },
      Finance: { color: 'bg-emerald-100 text-emerald-800' },
      Healthcare: { color: 'bg-red-100 text-red-800' },
      Education: { color: 'bg-purple-100 text-purple-800' }
    };
    
    const config = jobTypeConfig[jobType as keyof typeof jobTypeConfig] || { color: 'bg-gray-100 text-gray-800' };
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
        {jobType}
      </span>
    );
  };

  const getEmploymentTypeBadge = (employmentType: string) => {
    const employmentTypeConfig = {
      'Full-time': { color: 'bg-blue-100 text-blue-800' },
      'Part-time': { color: 'bg-orange-100 text-orange-800' },
      'Work from Home': { color: 'bg-purple-100 text-purple-800' }
    };
    
    const config = employmentTypeConfig[employmentType as keyof typeof employmentTypeConfig] || { color: 'bg-gray-100 text-gray-800' };
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
        {employmentType}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="space-y-2">
        <BreadCrumbs 
          title="Job Details" 
          breadcrumbs={[
            { label: "Dashboard", href: "/admin/dashboard", icon: "fluent:grid-24-regular" },
            { label: "Job Management", href: "/admin/job-management", icon: "fluent:briefcase-24-regular" },
            { label: "Job Details", icon: "fluent:document-24-regular" }
          ]} 
        />
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <Icon icon="fluent:error-circle-24-regular" className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Job Not Found</h2>
          <p className="text-gray-600 mb-6">The job you're looking for doesn't exist or has been removed.</p>
          <Link 
            href="/admin/job-management"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Icon icon="fluent:arrow-left-24-regular" className="w-4 h-4 mr-2" />
            Back to Job Management
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {/* BreadCrumbs */}
      <BreadCrumbs 
        title="Job Details" 
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dashboard", icon: "fluent:grid-24-regular" },
          { label: "Job Management", href: "/admin/job-management", icon: "fluent:briefcase-24-regular" },
          { label: "Job Details", icon: "fluent:document-24-regular" }
        ]} 
      />

      {/* Job Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
              {getStatusBadge(job.status)}
            </div>
            <div className="flex items-center gap-4 text-gray-600 mb-4">
              <div className="flex items-center gap-2">
                <Icon icon="fluent:building-24-regular" className="w-5 h-5" />
                <span className="font-medium">{job.company}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon icon="fluent:location-24-regular" className="w-5 h-5" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon icon="fluent:money-24-regular" className="w-5 h-5" />
                <span className="font-medium">{job.salary}</span>
              </div>
              {job.experience && (
                <div className="flex items-center gap-2">
                  <Icon icon="fluent:person-24-regular" className="w-5 h-5" />
                  <span>{job.experience}</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-3">
              {getJobTypeBadge(job.jobType)}
              {getEmploymentTypeBadge(job.employmentType)}
            </div>
          </div>
          <div className="mt-6 lg:mt-0 lg:ml-6">
            <div className="flex flex-col gap-3">
              <Link 
                href={`/admin/job-management/edit/${job.id}`}
                className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Icon icon="fluent:edit-24-regular" className="w-4 h-4 mr-2" />
                Edit Job
              </Link>
              <button className="inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors">
                <Icon icon="fluent:delete-24-regular" className="w-4 h-4 mr-2" />
                Delete Job
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Job Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Posted Date</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {new Date(job.postedDate).toLocaleDateString()}
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Icon icon="fluent:calendar-24-regular" className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Expire Date</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {new Date(job.expireDate).toLocaleDateString()}
              </p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <Icon icon="fluent:clock-24-regular" className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">View Jobs</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{job.applications}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <Icon icon="fluent:people-24-regular" className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Click on Link</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{job.views}</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <Icon icon="fluent:eye-24-regular" className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Job Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Overview</h3>
            <p className="text-gray-700 leading-relaxed">{job.description}</p>
          </div>

          {/* About Company */}
          {job.aboutCompany && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">About Company</h3>
              <p className="text-gray-700 leading-relaxed">{job.aboutCompany}</p>
            </div>
          )}

          {/* Job Description */}
          {job.jobDescription && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Description</h3>
              <p className="text-gray-700 leading-relaxed">{job.jobDescription}</p>
            </div>
          )}

          {/* Job Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <span className="font-medium text-gray-700">Job Title:</span>
                  <span className="ml-2 text-gray-900">Software Engineer</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Job Type:</span>
                  <span className="ml-2 text-gray-900">Full Time</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Location:</span>
                  <span className="ml-2 text-gray-900">Hyderabad</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Experience:</span>
                  <span className="ml-2 text-gray-900">Entry Level</span>
                </div>
              </div>
            </div>
          </div>

          {/* Role and Responsibility */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Role and Responsibility</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-gray-700">Works in the area of Software Engineering, which encompasses the development, maintenance and optimization of software solutions/applications.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-gray-700">Applies scientific methods to analyse and solve software engineering problems.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-gray-700">He/she is responsible for the development and application of software engineering practice and knowledge, in research, design, development and maintenance.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-gray-700">His/her work requires the exercise of original thought and judgement and the ability to supervise the technical and administrative work of other software engineers.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-gray-700">The software engineer builds skills and expertise of his/her software engineering discipline to reach standard software engineer skills expectations for the applicable role, as defined in Professional Communities.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-gray-700">The software engineer collaborates and acts as team player with other software engineers and stakeholders.</span>
              </li>
            </ul>
          </div>

          {/* Education and Skills */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Education and Skills</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <Icon icon="fluent:checkmark-circle-24-regular" className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Experience: IT Asset Management (ITAM) software like Manage Engine or equivalent</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon icon="fluent:checkmark-circle-24-regular" className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Inventory Management</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon icon="fluent:checkmark-circle-24-regular" className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Ticketing tool</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon icon="fluent:checkmark-circle-24-regular" className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Compliance Monitoring and Data Analysis</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon icon="fluent:checkmark-circle-24-regular" className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Bachelor's degree in IT, CSE, Business Administration, Commerce, Science</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon icon="fluent:checkmark-circle-24-regular" className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Minimum of 6 months experience in IT Asset & Inventory Management, Procurement, focusing on Asset compliance and budgeting</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon icon="fluent:checkmark-circle-24-regular" className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Strong negotiation skills and the ability to manage multiple teams and vendors simultaneously</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon icon="fluent:checkmark-circle-24-regular" className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Good understanding of Hardware (servers, laptops), Network, Storage and consumables</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon icon="fluent:checkmark-circle-24-regular" className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Excellent communication and interpersonal skills, with the ability to collaborate effectively with internal and external stakeholders</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Benefits */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Benefits</h3>
            <ul className="space-y-2">
              {job.benefits.map((benefit: string, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <Icon icon="fluent:star-24-regular" className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Bulk Message */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Bulk Message</h3>
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Icon icon="fluent:mail-24-regular" className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-900">Email Campaign</span>
                </div>
                <div className="text-sm text-blue-700">
                  <p>No of users sent mail: <span className="font-semibold">1,250</span></p>
                  <p>Number of people opened the email: <span className="font-semibold">892</span></p>
                </div>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Icon icon="fluent:chat-24-regular" className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-900">WhatsApp Campaign</span>
                </div>
                <div className="text-sm text-green-700">
                  <p>No of users sent in WhatsApp: <span className="font-semibold">856</span></p>
                  <p>Number of people opened the message: <span className="font-semibold">743</span></p>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}
