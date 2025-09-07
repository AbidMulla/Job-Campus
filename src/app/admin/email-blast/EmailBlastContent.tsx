'use client';
import { useState } from 'react';
import { Icon } from '@iconify/react';

export default function EmailBlastContent() {
  const [emailData, setEmailData] = useState({
    subject: '',
    message: '',
    recipientType: 'all',
    recipientCount: 0,
    scheduledDate: '',
    isScheduled: false
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const recipientCounts = {
    all: 1250,
    active: 892,
    inactive: 358,
    specific: 0
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEmailData(prev => ({
      ...prev,
      [name]: value,
      recipientCount: recipientCounts[value as keyof typeof recipientCounts] || 0
    }));
  };

  const handleSendEmail = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('Email blast sent successfully!');
    }, 2000);
  };

  const handlePreview = () => {
    setShowPreview(!showPreview);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={emailData.subject}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
            placeholder="Enter subject"
          />
        </div>

        {/* Select Template */}
        <div>
          <label htmlFor="selectTemplate" className="block text-sm font-medium text-gray-700 mb-2">
            Select Template
          </label>
          <select
            id="selectTemplate"
            name="selectTemplate"
            defaultValue=""
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none cursor-pointer text-gray-900"
          >
            <option value="" disabled className="text-gray-500">Choose a template</option>
            <option value="job-alert" className="text-gray-900">Job Alert Template</option>
            <option value="newsletter" className="text-gray-900">Newsletter Template</option>
            <option value="welcome" className="text-gray-900">Welcome Template</option>
            <option value="password-reset" className="text-gray-900">Password Reset Template</option>
          </select>
        </div>

        {/* Send To */}
        <div>
          <label htmlFor="sendTo" className="block text-sm font-medium text-gray-700 mb-2">
            Send To
          </label>
          <select
            id="sendTo"
            name="sendTo"
            defaultValue=""
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none cursor-pointer text-gray-900"
          >
            <option value="" disabled className="text-gray-500">Select recipient group</option>
            <option value="all" className="text-gray-900">All Users (1,250)</option>
            <option value="active" className="text-gray-900">Active Users (892)</option>
            <option value="inactive" className="text-gray-900">Inactive Users (358)</option>
            <option value="specific" className="text-gray-900">Specific Users</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={emailData.message}
            onChange={handleInputChange}
            rows={8}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y placeholder-gray-500"
            placeholder="Enter your message here"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={handlePreview}
            className="flex items-center px-6 py-3 bg-pink-600 text-white font-medium rounded-lg hover:bg-pink-700 transition-colors"
          >
            <Icon icon="fluent:eye-24-regular" className="w-5 h-5 mr-2" />
            Preview
          </button>
          
          <button
            onClick={handleSendEmail}
            disabled={isLoading || !emailData.subject || !emailData.message}
            className="flex items-center px-6 py-3 bg-cyan-500 text-white font-medium rounded-lg hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <>
                <Icon icon="eos-icons:loading" className="w-5 h-5 mr-2" />
                Sending...
              </>
            ) : (
              <>
                <Icon icon="fluent:send-24-regular" className="w-5 h-5 mr-2" />
                Submit
              </>
            )}
          </button>
        </div>
      </div>

      {/* Preview */}
      {showPreview && (
        <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h4 className="text-md font-semibold text-gray-900 mb-4">Email Preview</h4>
          <div className="space-y-2">
            <div>
              <strong>Subject:</strong> {emailData.subject || 'No subject'}
            </div>
            <div className="whitespace-pre-wrap">
              {emailData.message || 'No message content'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
