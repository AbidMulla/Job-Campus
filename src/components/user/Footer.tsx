import { useEffect, useRef } from 'react';

// Adsterra Banner Component
function AdsterraBanner() {
  const banner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Clear any existing content
    if (banner.current) {
      banner.current.innerHTML = '';
    }

    // Create and append the Adsterra script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = `
      atOptions = {
        'key': '49c501ac723291f0b3e32b6bba490d74',
        'format': 'iframe',
        'height': 90,
        'width': 728,
        'params': {}
      };
    `;

    const invokeScript = document.createElement('script');
    invokeScript.type = 'text/javascript';
    invokeScript.src = '//www.highperformanceformat.com/49c501ac723291f0b3e32b6bba490d74/invoke.js';

    if (banner.current) {
      banner.current.appendChild(script);
      banner.current.appendChild(invokeScript);
    }

    // Cleanup function
    return () => {
      if (banner.current) {
        banner.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="flex justify-center my-8">
      <div ref={banner} className="adsterra-banner"></div>
    </div>
  );
}

export default function Footer() {
  return (
    <>
      <AdsterraBanner />


      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Adsterra Display Ad */}



          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand */}
            <div className="col-span-1 md:col-span-2 lg:col-span-2">
              <h3 className="text-xl font-bold text-blue-400 mb-4">FresherJobCampus</h3>
              <p className="text-gray-300 mb-4">
                The new way to find jobs. Discover opportunities, connect with employers, and accelerate your career journey.
              </p>
            </div>

            {/* Batch Jobs */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Batch Jobs</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/user/batch?year=2025" className="text-gray-300 hover:text-white">
                    2025 Batch Jobs
                  </a>
                </li>
                <li>
                  <a href="/user/batch?year=2024" className="text-gray-300 hover:text-white">
                    2024 Batch Jobs
                  </a>
                </li>
                <li>
                  <a href="/user/batch?year=2023" className="text-gray-300 hover:text-white">
                    2023 Batch Jobs
                  </a>
                </li>
                <li>
                  <a href="/user/batch?year=2022" className="text-gray-300 hover:text-white">
                    2022 Batch Jobs
                  </a>
                </li>
              </ul>
            </div>

            {/* Courses */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Courses</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/user/courses?category=be-btech" className="text-gray-300 hover:text-white">
                    B.E B.Tech Jobs
                  </a>
                </li>
                <li>
                  <a href="/user/courses?category=me-mtech" className="text-gray-300 hover:text-white">
                    M.E M.Tech Jobs
                  </a>
                </li>
                <li>
                  <a href="/user/courses?category=mba" className="text-gray-300 hover:text-white">
                    MBA Jobs
                  </a>
                </li>
                <li>
                  <a href="/user/courses?category=mca" className="text-gray-300 hover:text-white">
                    MCA Jobs
                  </a>
                </li>
                <li>
                  <a href="/user/courses?category=bca" className="text-gray-300 hover:text-white">
                    BCA Jobs
                  </a>
                </li>
              </ul>
            </div>

            {/* Locations */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Locations</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/user/location?city=bangalore" className="text-gray-300 hover:text-white">
                    Bangalore Jobs
                  </a>
                </li>
                <li>
                  <a href="/user/location?city=mumbai" className="text-gray-300 hover:text-white">
                    Mumbai Jobs
                  </a>
                </li>
                <li>
                  <a href="/user/location?city=delhi" className="text-gray-300 hover:text-white">
                    Delhi Jobs
                  </a>
                </li>
                <li>
                  <a href="/user/location?city=chennai" className="text-gray-300 hover:text-white">
                    Chennai Jobs
                  </a>
                </li>
                <li>
                  <a href="/user/location?city=hyderabad" className="text-gray-300 hover:text-white">
                    Hyderabad Jobs
                  </a>
                </li>
                <li>
                  <a href="/user/location?city=pune" className="text-gray-300 hover:text-white">
                    Pune Jobs
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="/user/contact" className="text-gray-300 hover:text-white">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/auth/login" className="text-gray-300 hover:text-white">
                    Login
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 FresherJobCampus. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

    </>

  );
}
