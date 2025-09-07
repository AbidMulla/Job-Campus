'use client';
import { Icon } from '@iconify/react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 sm:p-12">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Contact Us
            </h1>
      </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Email Section */}
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Icon icon="mdi:email" className="w-6 h-6 text-blue-600 mr-3" />
                <span className="text-lg font-semibold text-gray-700">Email :</span>
              </div>
              <div className="space-y-2">
                <p className="text-gray-600 text-lg">
                  <a 
                    href="mailto:support@fresheroffcampus.com" 
                    className="hover:text-blue-600 transition-colors"
                  >
                    support@fresheroffcampus.com
                  </a>
                </p>
                <p className="text-gray-600 text-lg">
                  <a 
                    href="mailto:contactfresheroffcampus@gmail.com" 
                    className="hover:text-blue-600 transition-colors"
                  >
                    contactfresheroffcampus@gmail.com
                  </a>
                </p>
              </div>
            </div>

            {/* Instagram Section */}
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Icon icon="mdi:instagram" className="w-6 h-6 text-pink-600 mr-3" />
                <span className="text-lg font-semibold text-gray-700">Instagram :</span>
            </div>
              <p className="text-lg">
                <a 
                  href="https://instagram.com/fresheroffcampus" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline transition-colors"
                >
                  @fresheroffcampus
                </a>
              </p>
            </div>
          </div>

          {/* Additional Contact Options */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Quick Response */}
              <div className="text-center">
                <Icon icon="mdi:clock-fast" className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Quick Response</h3>
                <p className="text-gray-600">
                  We typically respond to all inquiries within 24 hours during business days.
                </p>
      </div>

              {/* Support Hours */}
              <div className="text-center">
                <Icon icon="mdi:calendar-clock" className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Support Hours</h3>
                <p className="text-gray-600">
                  Monday - Friday: 9:00 AM - 6:00 PM<br />
                  Saturday: 10:00 AM - 4:00 PM
                </p>
      </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
