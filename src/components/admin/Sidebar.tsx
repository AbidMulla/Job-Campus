'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  isMobileMenuOpen?: boolean;
  onMenuClose?: () => void;
}

export default function Sidebar({ isMobileMenuOpen = false, onMenuClose }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openSections, setOpenSections] = useState(['dashboard']);
  const pathname = usePathname();

  const toggleSection = (section: string) => {
    setOpenSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const navigation: Array<{
    id: string;
    name: string;
    icon: React.ReactElement;
    href: string;
    badge: null;
    subItems?: Array<{ name: string; href: string }>;
  }> = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
        </svg>
      ),
      href: '/admin/dashboard',
      badge: null
    },
    {
      id: 'users',
      name: 'CRM',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      ),
      href: '/admin/user-management',
      badge: null
    },
    {
      id: 'jobs',
      name: 'Job Management',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
        </svg>
      ),
      href: '/admin/job-management',
      badge: null
    },
    {
      id: 'email-blast',
      name: 'Email Blast',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      href: '/admin/email-blast',
      badge: null
    },
    {
      id: 'whatsapp-blast',
      name: 'WhatsApp Blast',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      href: '/admin/whatsapp-blast',
      badge: null
    }
  ];

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onMenuClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
        fixed lg:relative inset-y-0 left-0 z-50
        bg-blue-900 text-white
        transform transition-transform duration-300 ease-in-out
        h-screen lg:h-auto
        flex flex-col shadow-2xl
        ${isCollapsed ? 'w-16' : 'w-64'}
        flex-shrink-0
      `}>
        <div className="p-4">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <h1 className="text-xl font-bold">Admin Panel</h1>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        <nav className="mt-8 flex-1">
          <ul className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              const isOpen = openSections.includes(item.id);
              const hasSubItems = item.subItems && item.subItems.length > 0;

              return (
                <li key={item.id}>
                  <div>
                    <Link
                      href={item.href}
                      className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg mx-2 transition-colors ${
                        isActive
                          ? 'bg-blue-800 text-white'
                          : 'text-blue-100 hover:bg-blue-800 hover:text-white'
                      }`}
                      onClick={() => hasSubItems && toggleSection(item.id)}
                    >
                      <span className="flex-shrink-0">{item.icon}</span>
                      {!isCollapsed && (
                        <>
                          <span className="ml-3 flex-1">{item.name}</span>
                          {item.badge && (
                            <span className="ml-auto inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              {item.badge}
                            </span>
                          )}
                          {hasSubItems && (
                            <svg
                              className={`ml-2 w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          )}
                        </>
                      )}
                    </Link>

                    {/* Sub-items */}
                    {hasSubItems && isOpen && !isCollapsed && (
                      <ul className="mt-1 ml-8 space-y-1">
                        {item.subItems?.map((subItem) => {
                          const isSubActive = pathname === subItem.href;
                          return (
                            <li key={subItem.name}>
                              <Link
                                href={subItem.href}
                                className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
                                  isSubActive
                                    ? 'bg-blue-700 text-white'
                                    : 'text-blue-200 hover:bg-blue-700 hover:text-white'
                                }`}
                              >
                                {subItem.name}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}
