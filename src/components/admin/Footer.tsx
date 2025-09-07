export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Left side - Copyright and links */}
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
            <p className="text-sm text-gray-500">
              © 2024 FresherJobCampus. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                Help Center
              </a>
            </div>
          </div>

          {/* Right side - Version and status */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-green-400 rounded-full"></div>
              <span className="text-sm text-gray-500">System Online</span>
            </div>
            <span className="text-sm text-gray-400">v1.0.0</span>
          </div>
        </div>

        {/* Bottom section - Quick links */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Platform</h4>
              <ul className="space-y-1">
                <li><a href="#" className="text-sm text-gray-500 hover:text-gray-700">About Us</a></li>
                <li><a href="#" className="text-sm text-gray-500 hover:text-gray-700">Careers</a></li>
                <li><a href="#" className="text-sm text-gray-500 hover:text-gray-700">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Support</h4>
              <ul className="space-y-1">
                <li><a href="#" className="text-sm text-gray-500 hover:text-gray-700">Documentation</a></li>
                <li><a href="#" className="text-sm text-gray-500 hover:text-gray-700">API Reference</a></li>
                <li><a href="#" className="text-sm text-gray-500 hover:text-gray-700">Status Page</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Legal</h4>
              <ul className="space-y-1">
                <li><a href="#" className="text-sm text-gray-500 hover:text-gray-700">Privacy</a></li>
                <li><a href="#" className="text-sm text-gray-500 hover:text-gray-700">Terms</a></li>
                <li><a href="#" className="text-sm text-gray-500 hover:text-gray-700">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Connect</h4>
              <ul className="space-y-1">
                <li><a href="#" className="text-sm text-gray-500 hover:text-gray-700">Twitter</a></li>
                <li><a href="#" className="text-sm text-gray-500 hover:text-gray-700">LinkedIn</a></li>
                <li><a href="#" className="text-sm text-gray-500 hover:text-gray-700">GitHub</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
