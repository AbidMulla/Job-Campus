'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@iconify/react';

export default function JobDetailsPage() {
    const handleShare = (platform: 'whatsapp' | 'telegram') => {
        const url = window.location.href;
        const title = 'TCS iON NQT National Qualifier Test For Fresher';
        const text = 'Check out this amazing job opportunity!';
        
        if (platform === 'whatsapp') {
            const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${text} ${title} - ${url}`)}`;
            window.open(whatsappUrl, '_blank');
        } else if (platform === 'telegram') {
            const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(`${text} ${title}`)}`;
            window.open(telegramUrl, '_blank');
        }
    };

    const handleEmailNotification = () => {
        const subject = 'Job Notification Subscription';
        const body = 'I would like to receive email notifications for new job opportunities.';
        const mailtoUrl = `mailto:careers@company.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.open(mailtoUrl, '_blank');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 py-8 sm:py-12">
            <div className="max-w-6xl mx-auto  sm:px-6 lg:px-8">
                {/* Single Unified Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 lg:p-12">

                    <div className="mb-4">
                        <div className="flex items-start mb-6 lg:mb-0">
                            <div className="flex-1">
                                {/* Left side content can go here if needed */}
                            </div>
                        </div>
                    </div>


                    {/* Header Section */}
                    <div className="mb-4">
                        <div className="flex items-start space-x-6 mb-6 lg:mb-0">
                            <div className="flex-1">
                                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 leading-tight">
                                    TCS iON NQT National Qualifier Test For Fresher
                                </h1>
                                
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
                            </div>
                        </div>
                    </div>

                    {/* Overview Section */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3 border border-blue-100 mb-4">
                        <p className="text-gray-700 leading-relaxed text-lg">
                            TCS iON NQT Off Campus Drive: TCS iON NQT Off Campus hiring fresher for any graduates are eligible.
                            The detailed company eligibility and application details are given below.
                        </p>
                    </div>

                    {/* TCS Text Section */}
                    <div className="flex justify-center mb-8">
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-6 rounded-xl shadow-lg">
                            <h2 className="text-4xl font-bold text-center">TCS</h2>
                            <p className="text-xl text-center mt-2 opacity-90">Tata Consultancy Services</p>
                        </div>
                    </div>

                    {/* About Capgemini Section */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">About Capgemini</h2>
                        <div className="bg-white rounded-xl p-2 border border-gray-200 ">
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Capgemini is a global leader in partnering with companies to transform and manage their business by harnessing the power of technology. The Group is guided everyday by its purpose of unleashing human energy through technology for an inclusive and sustainable future.
                            </p>
                        </div>
                    </div>

                    {/* Job Description Section */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Job Description</h2>
                        <div className="bg-white rounded-xl p-2 border border-gray-200 ">
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Is the entry level in Software Engineering with a foundational understanding on programming concepts, software design and software development principles. Consistently works to direction with reducing supervision, producing accurate and reliable results. They are expected to be eager to learn and know when to ask questions and check for understanding. Understands and follows work processes. Is aware of costs related to own work. Organises own time to deliver against tasks set by others with a short term horizon. Works co-operatively with others to achieve team goals and has a direct and positive impact on project performance. Actively seeking feedback to improve and starting to manage own career with support.
                            </p>
                        </div>
                    </div>

                    {/* Job Details Section */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Job Details</h2>
                        <div className="bg-white rounded-xl p-2 border border-gray-200 ">
                            <div className="flex flex-col space-y-3">
                                <div className="flex items-center space-x-3">
                                    <span className="font-semibold text-gray-700">Job Title:</span>
                                    <span className="text-gray-600">Software Engineer</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <span className="font-semibold text-gray-700">Job Type:</span>
                                    <span className="text-gray-600">Full Time</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <span className="font-semibold text-gray-700">Location:</span>
                                    <span className="text-gray-600">Hyderabad</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <span className="font-semibold text-gray-700">Experience:</span>
                                    <span className="text-gray-600">Entry Level</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Role and Responsibility Section */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Role and Responsibility</h2>
                        <div className="bg-white rounded-xl p-2 border border-gray-200 ">
                            <ul className="space-y-3 text-gray-700 leading-relaxed">
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2">•</span>
                                    Works in the area of Software Engineering, which encompasses the development, maintenance and optimization of software solutions/applications.
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2">•</span>
                                    Applies scientific methods to analyse and solve software engineering problems.
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2">•</span>
                                    He/she is responsible for the development and application of software engineering practice and knowledge, in research, design, development and maintenance.
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2">•</span>
                                    His/her work requires the exercise of original thought and judgement and the ability to supervise the technical and administrative work of other software engineers.
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2">•</span>
                                    The software engineer builds skills and expertise of his/her software engineering discipline to reach standard software engineer skills expectations for the applicable role, as defined in Professional Communities.
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2">•</span>
                                    The software engineer collaborates and acts as team player with other software engineers and stakeholders.
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Education and Skills Section */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Education and Skills</h2>
                        <div className="bg-white rounded-xl p-2 border border-gray-200 ">
                            <ul className="space-y-3 text-gray-700 leading-relaxed">
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2">•</span>
                                    <strong>Experience:</strong> IT Asset Management (ITAM) software like Manage Engine or equivalent
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2">•</span>
                                    Inventory Management
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2">•</span>
                                    Ticketing tool
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2">•</span>
                                    Compliance Monitoring and Data Analysis
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2">•</span>
                                   Bachelor&apos;s degree in IT, CSE, Business Administration, Commerce, Science
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2">•</span>
                                    Minimum of 6 months experience in IT Asset & Inventory Management, Procurement, focusing on Asset compliance and budgeting
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2">•</span>
                                    Strong negotiation skills and the ability to manage multiple teams and vendors simultaneously
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2">•</span>
                                    Good understanding of Hardware (servers, laptops), Network, Storage and consumables
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2">•</span>
                                    Excellent communication and interpersonal skills, with the ability to collaborate effectively with internal and external stakeholders
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* How To Apply Razorpay Section */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">How To Apply Razorpay Off Campus Drive ??</h2>
                        <div className="bg-white rounded-xl p-2 border border-gray-200 ">
                            <p className="text-gray-700 leading-relaxed mb-4">
                                All interested and eligible candidates can apply before expired in the following link.
                            </p>
                            
                            <div className="text-left">
                                <span className="text-blue-600  cursor-pointer">
                                    <strong>Click Here:</strong> <span className='underline'>Click Me</span>
                                </span>
                            </div>
                        </div>
                    </div>


                    {/* Apply Section */}
                    <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-xl p-8 text-white">
                        <h2 className="text-2xl font-bold mb-4 text-center">How To Apply TCS iON NQT Off Campus Drive?</h2>
                        <p className="text-blue-100 text-center mb-6 max-w-2xl mx-auto">
                            All interested and eligible candidates can apply before expire in the following link.
                        </p>
                        
                        {/* Social Media Icons with Heartbeat Animation */}
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
                        
                       
                    </div>


                </div>
            </div>
        </div>
    );
}
