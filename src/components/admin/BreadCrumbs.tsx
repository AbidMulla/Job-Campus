'use client';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { usePathname } from 'next/navigation';

interface BreadCrumbsProps {
  title: string;
  breadcrumbs: Array<{
    label: string;
    href?: string;
    icon?: string;
  }>;
  showBackButton?: boolean;
}

export default function BreadCrumbs({ title, breadcrumbs, showBackButton = false }: BreadCrumbsProps) {
  const pathname = usePathname();
  
  // Check if we're on a details page that should show back button
  const isDetailsPage = pathname.includes('/job-details') || pathname.includes('/user-details');
  const shouldShowBackButton = showBackButton || isDetailsPage;
  
  const getBackUrl = () => {
    if (pathname.includes('/job-details')) {
      return '/admin/job-management';
    } else if (pathname.includes('/user-details')) {
      return '/admin/user-management';
    }
    return '/admin/dashboard';
  };

  // Commented out unused function
  // const handleBack = () => {
  //   if (typeof window !== 'undefined') {
  //     window.history.back();
  //   }
  // };

  return (
    <div className="flex items-center justify-between py-2 px-6 bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Left side - Back Button and Title */}
      <div className="flex items-center gap-4">
        {shouldShowBackButton && (
          <Link
            href={getBackUrl()}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
            aria-label="Go back"
          >
            <Icon icon="heroicons:arrow-left" className="w-5 h-5" />
          </Link>
        )}
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      </div>

      {/* Right side - Breadcrumbs */}
      <nav className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
        {breadcrumbs.map((breadcrumb, index) => (
          <div key={index} className="flex items-center space-x-2">
            {index > 0 && <Icon icon="mdi:chevron-right" className="w-4 h-4 text-gray-400" />}
            {breadcrumb.href ? (
              <span className="text-gray-500 flex items-center gap-2">
                {breadcrumb.icon && <Icon icon={breadcrumb.icon} className="w-5 h-5 text-gray-500" />}
                {breadcrumb.label}
              </span>
            ) : (
              <span className="text-gray-900 font-medium flex items-center gap-2">
                {breadcrumb.icon && <Icon icon={breadcrumb.icon} className="w-5 h-5 text-gray-600" />}
                {breadcrumb.label}
              </span>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}
