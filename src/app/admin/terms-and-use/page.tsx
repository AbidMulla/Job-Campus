'use client';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import BreadCrumbs from '@/components/admin/BreadCrumbs';

export default function TermsAndUse() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedTerms, setSelectedTerms] = useState<number[]>([]);

  // Mock terms and use data
  const termsAndUse = [
    {
      id: 1,
      title: 'Terms of Service',
      type: 'Legal',
      status: 'active',
      version: '2.1',
      lastUpdated: '2024-02-15',
      createdDate: '2024-01-15',
      views: 1247,
      downloads: 89
    },
    {
      id: 2,
      title: 'Privacy Policy',
      type: 'Legal',
      status: 'active',
      version: '1.8',
      lastUpdated: '2024-02-14',
      createdDate: '2024-01-10',
      views: 892,
      downloads: 67
    },
    {
      id: 3,
      title: 'Cookie Policy',
      type: 'Legal',
      status: 'active',
      version: '1.2',
      lastUpdated: '2024-02-13',
      createdDate: '2024-01-08',
      views: 567,
      downloads: 45
    },
    {
      id: 4,
      title: 'User Agreement',
      type: 'Agreement',
      status: 'active',
      version: '3.0',
      lastUpdated: '2024-02-12',
      createdDate: '2024-01-05',
      views: 445,
      downloads: 34
    },
    {
      id: 5,
      title: 'Acceptable Use Policy',
      type: 'Policy',
      status: 'active',
      version: '1.5',
      lastUpdated: '2024-02-11',
      createdDate: '2024-01-03',
      views: 334,
      downloads: 28
    },
    {
      id: 6,
      title: 'Data Protection Policy',
      type: 'Policy',
      status: 'active',
      version: '2.0',
      lastUpdated: '2024-02-10',
      createdDate: '2024-01-01',
      views: 678,
      downloads: 52
    },
    {
      id: 7,
      title: 'Refund Policy',
      type: 'Policy',
      status: 'active',
      version: '1.3',
      lastUpdated: '2024-02-09',
      createdDate: '2023-12-28',
      views: 789,
      downloads: 61
    },
    {
      id: 8,
      title: 'Copyright Notice',
      type: 'Legal',
      status: 'active',
      version: '1.0',
      lastUpdated: '2024-02-08',
      createdDate: '2023-12-25',
      views: 234,
      downloads: 19
    },
    {
      id: 9,
      title: 'Disclaimer',
      type: 'Legal',
      status: 'active',
      version: '1.1',
      lastUpdated: '2024-02-07',
      createdDate: '2023-12-20',
      views: 189,
      downloads: 15
    },
    {
      id: 10,
      title: 'Service Level Agreement',
      type: 'Agreement',
      status: 'active',
      version: '2.2',
      lastUpdated: '2024-02-06',
      createdDate: '2023-12-18',
      views: 456,
      downloads: 38
    },
    {
      id: 11,
      title: 'End User License Agreement',
      type: 'Agreement',
      status: 'active',
      version: '1.7',
      lastUpdated: '2024-02-05',
      createdDate: '2023-12-15',
      views: 345,
      downloads: 27
    },
    {
      id: 12,
      title: 'Code of Conduct',
      type: 'Policy',
      status: 'active',
      version: '1.4',
      lastUpdated: '2024-02-04',
      createdDate: '2023-12-12',
      views: 278,
      downloads: 22
    },
    {
      id: 13,
      title: 'Community Guidelines',
      type: 'Guidelines',
      status: 'active',
      version: '2.1',
      lastUpdated: '2024-02-03',
      createdDate: '2023-12-10',
      views: 512,
      downloads: 41
    },
    {
      id: 14,
      title: 'Security Policy',
      type: 'Policy',
      status: 'active',
      version: '1.6',
      lastUpdated: '2024-02-02',
      createdDate: '2023-12-08',
      views: 389,
      downloads: 31
    },
    {
      id: 15,
      title: 'Accessibility Statement',
      type: 'Statement',
      status: 'active',
      version: '1.2',
      lastUpdated: '2024-02-01',
      createdDate: '2023-12-05',
      views: 167,
      downloads: 13
    },
    {
      id: 16,
      title: 'Trademark Policy',
      type: 'Policy',
      status: 'active',
      version: '1.0',
      lastUpdated: '2024-01-31',
      createdDate: '2023-12-03',
      views: 123,
      downloads: 9
    },
    {
      id: 17,
      title: 'DMCA Policy',
      type: 'Policy',
      status: 'active',
      version: '1.1',
      lastUpdated: '2024-01-30',
      createdDate: '2023-12-01',
      views: 89,
      downloads: 7
    },
    {
      id: 18,
      title: 'Third Party Services',
      type: 'Agreement',
      status: 'active',
      version: '1.3',
      lastUpdated: '2024-01-29',
      createdDate: '2023-11-28',
      views: 234,
      downloads: 18
    },
    {
      id: 19,
      title: 'Beta Testing Agreement',
      type: 'Agreement',
      status: 'draft',
      version: '0.9',
      lastUpdated: '2024-01-28',
      createdDate: '2023-11-25',
      views: 45,
      downloads: 3
    },
    {
      id: 20,
      title: 'API Terms of Use',
      type: 'Agreement',
      status: 'active',
      version: '1.5',
      lastUpdated: '2024-01-27',
      createdDate: '2023-11-22',
      views: 567,
      downloads: 44
    }
  ];

  const filteredTerms = termsAndUse.filter(term => {
    const matchesSearch = term.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         term.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || term.status === selectedStatus;
    const matchesType = selectedType === 'all' || term.type === selectedType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', label: 'Active' },
      inactive: { color: 'bg-red-100 text-red-800', label: 'Inactive' },
      draft: { color: 'bg-yellow-100 text-yellow-800', label: 'Draft' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getTypeBadge = (type: string) => {
    const typeConfig = {
      'Legal': { color: 'bg-red-100 text-red-800' },
      'Agreement': { color: 'bg-blue-100 text-blue-800' },
      'Policy': { color: 'bg-purple-100 text-purple-800' },
      'Guidelines': { color: 'bg-green-100 text-green-800' },
      'Statement': { color: 'bg-orange-100 text-orange-800' }
    };
    
    const config = typeConfig[type as keyof typeof typeConfig] || { color: 'bg-gray-100 text-gray-800' };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {type}
      </span>
    );
  };

  return (
    <div className="space-y-2">
      {/* BreadCrumbs */}
      <BreadCrumbs 
        title="Terms and Use Management" 
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dashboard", icon: "fluent:grid-24-regular" },
          { label: "CRM", href: "/admin/user-management", icon: "fluent:people-24-regular" },
          { label: "Terms and Use", icon: "fluent:document-text-24-regular" }
        ]} 
      />


    </div>
  );
}
