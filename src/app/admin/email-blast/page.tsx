'use client';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import BreadCrumbs from '@/components/admin/BreadCrumbs';
import EmailBlastContent from './EmailBlastContent';
import EmailTemplates from './EmailTemplates';
import SentEmail from './SentEmail';

export default function EmailBlast() {
  const [activeTab, setActiveTab] = useState('email-blast');

  const tabs = [
    { id: 'email-blast', label: 'Email Blast', icon: 'fluent:mail-24-regular' },
    { id: 'email-templates', label: 'Email Templates', icon: 'fluent:document-24-regular' },
    { id: 'sent-email', label: 'Sent Email', icon: 'fluent:send-24-regular' }
  ];

  return (
    <div className="space-y-2">
      {/* BreadCrumbs */}
      <BreadCrumbs 
        title="Email Blast" 
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dashboard", icon: "fluent:grid-24-regular" },
          { label: "Email Blast", icon: "fluent:mail-24-regular" }
        ]} 
      />

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon icon={tab.icon} className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'email-blast' && <EmailBlastContent />}
          {activeTab === 'email-templates' && <EmailTemplates />}
          {activeTab === 'sent-email' && <SentEmail />}
        </div>
      </div>
    </div>
  );
}
