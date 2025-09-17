'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { authServices } from '../../services/authServices';

interface HeaderProps {
  onMenuToggle?: () => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{
    name?: string;
    email?: string;
    role?: string;
  } | null>(null);
  const pathname = usePathname();

  // Check authentication status on component mount and when localStorage changes
  useEffect(() => {
    const checkAuthStatus = () => {
      const authStatus = authServices.isAuthenticated();
      const currentUser = authServices.getCurrentUser();
      setIsAuthenticated(authStatus);
      setUser(currentUser);
    };

    // Check initial auth status
    checkAuthStatus();

    // Listen for storage changes (when user logs in/out in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'token' || e.key === 'user') {
        checkAuthStatus();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const navigationItems = [
    {
      name: 'BATCH',
      href: '/user/batch',
      isActive: pathname === '/user/batch',
      hasDropdown: true,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      dropdownItems: [
        { name: '2025 Batch Jobs', href: '/user/batch?year=2025' },
        { name: '2024 Batch Jobs', href: '/user/batch?year=2024' },
        { name: '2023 Batch Jobs', href: '/user/batch?year=2023' },
        { name: '2022 Batch Jobs', href: '/user/batch?year=2022' },
        { name: '2021 Batch Jobs', href: '/user/batch?year=2021' },
        { name: '2020 Batch Jobs', href: '/user/batch?year=2020' },
        { name: '2019 Batch Jobs', href: '/user/batch?year=2019' },
        { name: '2018 Batch Jobs', href: '/user/batch?year=2018' }
      ]
    },
    {
      name: 'DEGREES',
      href: '/user/degrees',
      isActive: pathname === '/user/degrees',
      hasDropdown: true,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      dropdownItems: [
        { name: 'B.E B.Tech Jobs', href: '/user/courses?category=be-btech' },
        { name: 'M.E M.Tech Jobs', href: '/user/courses?category=me-mtech' },
        { name: 'BCA Jobs', href: '/user/courses?category=bca' },
        { name: 'MCA Jobs', href: '/user/courses?category=mca' },
        { name: 'MBA Jobs', href: '/user/courses?category=mba' },
        { name: 'BBA Jobs', href: '/user/courses?category=bba' },
        { name: 'B.Sc Jobs', href: '/user/courses?category=bsc' },
        { name: 'M.Sc Jobs', href: '/user/courses?category=msc' },
        { name: 'B.Com Jobs', href: '/user/courses?category=bcom' },
        { name: 'BA Jobs', href: '/user/courses?category=ba' }
      ]
    },
    {
      name: 'LOCATION',
      href: '/user/location',
      isActive: pathname === '/user/location',
      hasDropdown: true,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      dropdownItems: [
        { name: 'Bangalore Jobs', href: '/user/location?city=bangalore' },
        { name: 'Chennai Jobs', href: '/user/location?city=chennai' },
        { name: 'Hyderabad Jobs', href: '/user/location?city=hyderabad' },
        { name: 'Pune Jobs', href: '/user/location?city=pune' },
        { name: 'Gurgaon Jobs', href: '/user/location?city=gurgaon' }
      ]
    },
    {
      name: 'COURSES',
      href: '/user/courses',
      isActive: pathname === '/user/courses',
      hasDropdown: false,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      name: 'WALK-IN',
      href: '/user/walkin-interview',
      isActive: pathname === '/user/walkin-interview',
      hasDropdown: false,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      name: 'POST JOB',
      href: '/user/contact',
      isActive: pathname === '/user/contact',
      hasDropdown: false,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      )
    }
  ];


  const handleDropdownEnter = (itemName: string) => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setActiveDropdown(itemName);
  };

  const handleDropdownLeave = () => {
    const timeout = setTimeout(() => {
      setActiveDropdown(null);
    }, 150); // 150ms delay before closing
    setDropdownTimeout(timeout);
  };


  return (
    <>
      {/* Desktop Header */}
      <header className="hidden lg:block bg-gradient-to-r from-blue-900 to-blue-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-white hover:text-blue-200 transition-colors">
                FresherJobCampus
              </Link>
            </div>

            {/* Navigation Menu */}
            <nav className="flex items-center space-x-1">
              {navigationItems.map((item) => (
                <div key={item.name} className="relative">
                  {item.hasDropdown ? (
                    <div 
                      className="relative"
                      onMouseEnter={() => handleDropdownEnter(item.name)}
                      onMouseLeave={handleDropdownLeave}
                    >
                      <button
                        className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                          item.isActive
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'text-white hover:text-blue-200 hover:bg-blue-700/50'
                        }`}
                      >
                        {item.icon}
                        <span className="ml-2">{item.name}</span>
                        <svg
                          className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                            activeDropdown === item.name ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {/* Dropdown Menu */}
                      {activeDropdown === item.name && (
                        <div 
                          className="absolute top-full left-0 mt-1 w-56 bg-white rounded-md shadow-lg border border-gray-200 z-50"
                          onMouseEnter={() => handleDropdownEnter(item.name)}
                          onMouseLeave={handleDropdownLeave}
                        >
                          <div className="py-1">
                            {item.dropdownItems?.map((dropdownItem) => (
                              <Link
                                key={dropdownItem.name}
                                href={dropdownItem.href}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                              >
                                {dropdownItem.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                        item.isActive
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'text-white hover:text-blue-200 hover:bg-blue-700/50'
                      }`}
                    >
                      {item.icon}
                      <span className="ml-2">{item.name}</span>
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Right side - User Profile & Notifications */}
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  {/* Notifications - Only show when authenticated */}
                  <button className="relative p-2 text-white hover:text-blue-200 hover:bg-blue-700/50 rounded-md transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM10.5 3.75a6 6 0 0 1 6 6v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5A2.25 2.25 0 0 1 4.5 17.25v-7.5a6 6 0 0 1 6-6Z" />
                    </svg>
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>

                  {/* User Profile - Only show when authenticated */}
                  <div className="relative">
                    <Link href="/user/dashboard">
                      <button className="text-white hover:text-blue-200 transition-colors">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                          {user?.name ? (
                            <span className="text-white font-semibold text-sm">
                              {user.name.charAt(0).toUpperCase()}
                            </span>
                          ) : (
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                            </svg>
                          )}
                        </div>
                      </button>
                    </Link>
                  </div>
                </>
              ) : (
                /* Login Button - Only show when not authenticated */
                <Link href="/auth/login">
                  <button className="bg-white text-blue-900 px-4 py-2 rounded-md font-medium hover:bg-blue-50 transition-colors cursor-pointer">
                    Login
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="lg:hidden bg-gradient-to-r from-blue-900 to-blue-800 shadow-lg">
        <div className="px-4">
          <div className="flex justify-between items-center h-14">
            {/* Mobile Menu Toggle */}
            <button
              onClick={onMenuToggle}
              className="p-2 text-white hover:text-blue-200 hover:bg-blue-700/50 rounded-md transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Logo */}
            <Link href="/" className="text-xl font-bold text-white">
              FresherJobCampus
            </Link>

            {/* Mobile Right Side */}
            <div className="flex items-center space-x-2">
              {isAuthenticated ? (
                <>
                  {/* Notifications - Only show when authenticated */}
                  <button className="relative p-2 text-white hover:text-blue-200 hover:bg-blue-700/50 rounded-md transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM10.5 3.75a6 6 0 0 1 6 6v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5A2.25 2.25 0 0 1 4.5 17.25v-7.5a6 6 0 0 1 6-6Z" />
                    </svg>
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>

                  {/* User Profile - Only show when authenticated */}
                  <Link href="/user/dashboard">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      {user?.name ? (
                        <span className="text-white font-semibold text-sm">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      ) : (
                        <span className="text-white font-semibold text-sm">U</span>
                      )}
                    </div>
                  </Link>
                </>
              ) : (
                /* Login Button - Only show when not authenticated */
                <Link href="/auth/login">
                  <button className="bg-white text-blue-900 px-3 py-1 rounded-md font-medium text-sm hover:bg-blue-50 transition-colors cursor-pointer">
                    Login
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>


    </>
  );
}
