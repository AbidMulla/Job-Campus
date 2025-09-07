'use client';
import { useState } from 'react';
import { Icon } from '@iconify/react';

export default function WhatsAppBlastContent() {
  const [whatsappData, setWhatsappData] = useState({
    message: '',
    recipientType: 'all',
    recipientCount: 0,
    scheduledDate: '',
    isScheduled: false,
    includeMedia: false,
    mediaType: 'image'
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const recipientCounts = {
    all: 856,
    active: 743,
    inactive: 113,
    specific: 0
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setWhatsappData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
      recipientCount: recipientCounts[value as keyof typeof recipientCounts] || 0
    }));
  };

  const handleSendWhatsApp = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('WhatsApp blast sent successfully!');
    }, 2000);
  };

  const handlePreview = () => {
    setShowPreview(!showPreview);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={whatsappData.message}
            onChange={handleInputChange}
            rows={8}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-y placeholder-gray-500"
            placeholder="Enter your message here"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white appearance-none cursor-pointer text-gray-900"
          >
            <option value="" disabled className="text-gray-500">Choose a template</option>
            <option value="job-alert" className="text-gray-900">Job Alert Template</option>
            <option value="interview-reminder" className="text-gray-900">Interview Reminder</option>
            <option value="welcome" className="text-gray-900">Welcome Message</option>
            <option value="follow-up" className="text-gray-900">Follow-up Template</option>
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
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white appearance-none cursor-pointer text-gray-900"
          >
            <option value="" disabled className="text-gray-500">Select recipient group</option>
            <option value="all" className="text-gray-900">All Users (856)</option>
            <option value="active" className="text-gray-900">Active Users (743)</option>
            <option value="inactive" className="text-gray-900">Inactive Users (113)</option>
            <option value="specific" className="text-gray-900">Specific Users</option>
          </select>
        </div>

        {/* Media Options */}
        <div>
          <div className="flex items-center mb-3">
            <input
              type="checkbox"
              id="includeMedia"
              name="includeMedia"
              checked={whatsappData.includeMedia}
              onChange={handleInputChange}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label htmlFor="includeMedia" className="ml-2 text-sm font-medium text-gray-700">
              Include Media
            </label>
          </div>
          
          {whatsappData.includeMedia && (
            <div className="ml-6 space-y-3">
              <select
                name="mediaType"
                value={whatsappData.mediaType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="image">Image</option>
                <option value="document">Document</option>
                <option value="video">Video</option>
              </select>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <Icon icon="fluent:cloud-upload-24-regular" className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG, PDF, MP4 up to 10MB</p>
              </div>
            </div>
          )}
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
            onClick={handleSendWhatsApp}
            disabled={isLoading || !whatsappData.message}
            className="flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
        <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-green-50">
          <h4 className="text-md font-semibold text-gray-900 mb-4">WhatsApp Message Preview</h4>
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <Icon icon="fluent:chat-24-regular" className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <p className="text-gray-900 whitespace-pre-wrap">
                  {whatsappData.message || 'No message content'}
                </p>
              </div>
              <p className="text-xs text-gray-500 mt-1">WhatsApp Business</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
