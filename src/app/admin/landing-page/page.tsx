'use client';
// import { useState } from 'react';
import BreadCrumbs from '@/components/admin/BreadCrumbs';

export default function LandingPage() {
  // const [searchTerm] = useState('');
  // const [selectedStatus] = useState('all');
  // const [selectedType] = useState('all');
  // const [selectedPages] = useState<number[]>([]);

  // Mock landing page data (commented out as unused)
  /*
  const landingPages = [
    {
      id: 1,
      title: 'Home Page',
      slug: 'home',
      status: 'active',
      type: 'Main',
      views: 1247,
      visits: 892,
      lastUpdated: '2024-02-15',
      createdDate: '2024-01-15'
    },
    {
      id: 2,
      title: 'About Us',
      slug: 'about',
      status: 'active',
      type: 'Static',
      views: 567,
      visits: 445,
      lastUpdated: '2024-02-14',
      createdDate: '2024-01-10'
    },
    {
      id: 3,
      title: 'Services',
      slug: 'services',
      status: 'active',
      type: 'Dynamic',
      views: 789,
      visits: 623,
      lastUpdated: '2024-02-13',
      createdDate: '2024-01-08'
    },
    {
      id: 4,
      title: 'Contact',
      slug: 'contact',
      status: 'active',
      type: 'Static',
      views: 445,
      visits: 334,
      lastUpdated: '2024-02-12',
      createdDate: '2024-01-05'
    },
    {
      id: 5,
      title: 'Blog',
      slug: 'blog',
      status: 'active',
      type: 'Dynamic',
      views: 1123,
      visits: 856,
      lastUpdated: '2024-02-11',
      createdDate: '2024-01-03'
    },
    {
      id: 6,
      title: 'Portfolio',
      slug: 'portfolio',
      status: 'active',
      type: 'Gallery',
      views: 678,
      visits: 512,
      lastUpdated: '2024-02-10',
      createdDate: '2024-01-01'
    },
    {
      id: 7,
      title: 'Testimonials',
      slug: 'testimonials',
      status: 'active',
      type: 'Static',
      views: 334,
      visits: 267,
      lastUpdated: '2024-02-09',
      createdDate: '2023-12-28'
    },
    {
      id: 8,
      title: 'FAQ',
      slug: 'faq',
      status: 'active',
      type: 'Static',
      views: 556,
      visits: 423,
      lastUpdated: '2024-02-08',
      createdDate: '2023-12-25'
    },
    {
      id: 9,
      title: 'Privacy Policy',
      slug: 'privacy-policy',
      status: 'active',
      type: 'Legal',
      views: 234,
      visits: 189,
      lastUpdated: '2024-02-07',
      createdDate: '2023-12-20'
    },
    {
      id: 10,
      title: 'Terms of Service',
      slug: 'terms-of-service',
      status: 'active',
      type: 'Legal',
      views: 189,
      visits: 156,
      lastUpdated: '2024-02-06',
      createdDate: '2023-12-18'
    },
    {
      id: 11,
      title: 'Career',
      slug: 'career',
      status: 'active',
      type: 'Dynamic',
      views: 445,
      visits: 334,
      lastUpdated: '2024-02-05',
      createdDate: '2023-12-15'
    },
    {
      id: 12,
      title: 'News',
      slug: 'news',
      status: 'active',
      type: 'Dynamic',
      views: 667,
      visits: 512,
      lastUpdated: '2024-02-04',
      createdDate: '2023-12-12'
    },
    {
      id: 13,
      title: 'Events',
      slug: 'events',
      status: 'active',
      type: 'Dynamic',
      views: 389,
      visits: 298,
      lastUpdated: '2024-02-03',
      createdDate: '2023-12-10'
    },
    {
      id: 14,
      title: 'Support',
      slug: 'support',
      status: 'active',
      type: 'Static',
      views: 523,
      visits: 412,
      lastUpdated: '2024-02-02',
      createdDate: '2023-12-08'
    },
    {
      id: 15,
      title: 'Pricing',
      slug: 'pricing',
      status: 'active',
      type: 'Static',
      views: 445,
      visits: 356,
      lastUpdated: '2024-02-01',
      createdDate: '2023-12-05'
    },
    {
      id: 16,
      title: 'Features',
      slug: 'features',
      status: 'active',
      type: 'Static',
      views: 334,
      visits: 267,
      lastUpdated: '2024-01-31',
      createdDate: '2023-12-03'
    },
    {
      id: 17,
      title: 'Team',
      slug: 'team',
      status: 'active',
      type: 'Static',
      views: 278,
      visits: 223,
      lastUpdated: '2024-01-30',
      createdDate: '2023-12-01'
    },
    {
      id: 18,
      title: 'Partners',
      slug: 'partners',
      status: 'active',
      type: 'Static',
      views: 189,
      visits: 156,
      lastUpdated: '2024-01-29',
      createdDate: '2023-11-28'
    },
    {
      id: 19,
      title: 'Resources',
      slug: 'resources',
      status: 'active',
      type: 'Dynamic',
      views: 456,
      visits: 367,
      lastUpdated: '2024-01-28',
      createdDate: '2023-11-25'
    },
    {
      id: 20,
      title: 'Downloads',
      slug: 'downloads',
      status: 'active',
      type: 'Static',
      views: 234,
      visits: 189,
      lastUpdated: '2024-01-27',
      createdDate: '2023-11-22'
    }
  ];
  */

  // Commented out unused variable
  // const filteredPages = landingPages.filter(page => {
  //   const matchesSearch = page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //                        page.slug.toLowerCase().includes(searchTerm.toLowerCase());
  //   const matchesStatus = selectedStatus === 'all' || page.status === selectedStatus;
  //   const matchesType = selectedType === 'all' || page.type === selectedType;
  //   
  //   return matchesSearch && matchesStatus && matchesType;
  // });

  // Commented out unused function
  // const getStatusBadge = (status: string) => {
  //   const statusConfig = {
  //     active: { color: 'bg-green-100 text-green-800', label: 'Active' },
  //     inactive: { color: 'bg-red-100 text-red-800', label: 'Inactive' },
  //     draft: { color: 'bg-yellow-100 text-yellow-800', label: 'Draft' }
  //   };
  //   
  //   const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
  //   return (
  //     <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
  //       {config.label}
  //     </span>
  //   );
  // };

  // Commented out unused function
  // const getTypeBadge = (type: string) => {
  //   const typeConfig = {
  //     'Main': { color: 'bg-blue-100 text-blue-800' },
  //     'Static': { color: 'bg-purple-100 text-purple-800' },
  //     'Dynamic': { color: 'bg-green-100 text-green-800' },
  //     'Gallery': { color: 'bg-pink-100 text-pink-800' },
  //     'Legal': { color: 'bg-gray-100 text-gray-800' }
  //   };
  //   
  //   const config = typeConfig[type as keyof typeof typeConfig] || { color: 'bg-gray-100 text-gray-800' };
  //   return (
  //     <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
  //       {type}
  //     </span>
  //   );
  // };

  return (
    <div className="space-y-2">
      {/* BreadCrumbs */}
      <BreadCrumbs 
        title="Landing Page Management" 
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dashboard", icon: "fluent:grid-24-regular" },
          { label: "CRM", href: "/admin/user-management", icon: "fluent:people-24-regular" },
          { label: "Landing Page", icon: "fluent:document-24-regular" }
        ]} 
      />


    </div>
  );
}
