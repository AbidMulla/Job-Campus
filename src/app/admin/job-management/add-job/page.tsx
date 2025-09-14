'use client';
import { useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import BreadCrumbs from '@/components/admin/BreadCrumbs';
import { adminServices } from '@/services/adminServices';
import { showSuccessToast, showErrorToast } from '@/utils/simpleToast';

export default function AddJob() {
  const router = useRouter();
  
  // Custom styles for better placeholder visibility
  const inputStyles = {
    '--tw-placeholder-opacity': '1',
    '--tw-placeholder-color': '#6b7280'
  } as React.CSSProperties;

  const [formData, setFormData] = useState({
    title: 'Senior Software Engineer Position',
    description: 'Join our innovative team as a Senior Software Engineer. We are looking for passionate developers who want to make a difference.',
    description_style: 'point',
    job_title: 'Senior Software Engineer',
    job_slug: 'senior-software-engineer',
    job_description: 'We are seeking a highly skilled Senior Software Engineer to join our dynamic development team. The ideal candidate will have extensive experience in full-stack development and a passion for creating innovative solutions.',
    job_type: 'Full-time',
    location: 'Hyderabad, India',
    employment_type: 'Permanent',
    job_post_date: '2024-01-15',
    job_post_time: '09:00',
    job_expire_date: '2024-02-15',
    job_expire_time: '18:00',
    company: 'TechCorp Solutions',
    min_salary: '800000',
    max_salary: '1200000',
    currency: 'INR',
    salary_type: 'Annual',
    apply_link: 'https://techcorp.com/careers/senior-software-engineer',
    // SEO fields
    seo_title: 'Senior Software Engineer Jobs in Hyderabad | TechCorp Solutions',
    seo_description: 'Apply for Senior Software Engineer position at TechCorp Solutions in Hyderabad. Competitive salary, great benefits, and growth opportunities.',
    seo_keywords: 'senior software engineer, hyderabad jobs, full stack developer, techcorp careers',
    // OpenGraph fields
    og_title: 'Join Our Team - Senior Software Engineer Role',
    og_description: 'Exciting opportunity for experienced developers to join our innovative team at TechCorp Solutions.',
    og_image: 'https://techcorp.com/images/senior-engineer-banner.jpg',
    og_image_width: '1200',
    og_image_height: '630',
    og_image_alt: 'Senior Software Engineer Position at TechCorp',
    og_url: 'https://techcorp.com/careers/senior-software-engineer',
    og_site_name: 'TechCorp Career Portal',
    og_locale: 'en_US',
    og_type: 'website'
  });

  // State for multiple description points
  const [descriptionPoints, setDescriptionPoints] = useState([
    { id: 1, text: 'Develop and maintain scalable web applications using modern technologies' },
    { id: 2, text: 'Collaborate with cross-functional teams to deliver high-quality software solutions' },
    { id: 3, text: 'Mentor junior developers and contribute to technical architecture decisions' }
  ]);

  // State for SEO keywords
  const [seoKeywords, setSeoKeywords] = useState([
    { id: 1, text: 'senior software engineer' },
    { id: 2, text: 'hyderabad jobs' },
    { id: 3, text: 'full stack developer' },
    { id: 4, text: 'techcorp careers' }
  ]);

  // State for selected title and description items
  const [selectedItems, setSelectedItems] = useState<Array<{
    id: number;
    title: string;
    description: string;
    descriptionStyle: string;
  }>>([
    {
      id: 1,
      title: 'Key Responsibilities',
      description: 'Lead development of new features and enhancements to existing applications. Work closely with product managers and designers to understand requirements and deliver solutions that meet business objectives.',
      descriptionStyle: 'point'
    },
    {
      id: 2,
      title: 'Required Skills',
      description: 'Strong proficiency in JavaScript, React, Node.js, and database technologies. Experience with cloud platforms and DevOps practices. Excellent problem-solving and communication skills.',
      descriptionStyle: 'square'
    }
  ]);

  // State to track which item is being edited
  const [editingItemId, setEditingItemId] = useState<number | null>(null);

  // Loading and error states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Search states for dropdowns
  const [jobTypeSearch, setJobTypeSearch] = useState('');
  const [locationSearch, setLocationSearch] = useState('');
  const [employmentTypeSearch, setEmploymentTypeSearch] = useState('');
  const [currencySearch, setCurrencySearch] = useState('');
  const [salaryTypeSearch, setSalaryTypeSearch] = useState('');
  const [showJobTypeDropdown, setShowJobTypeDropdown] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showEmploymentTypeDropdown, setShowEmploymentTypeDropdown] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [showSalaryTypeDropdown, setShowSalaryTypeDropdown] = useState(false);

  // Dropdown options
  const jobTypeOptions = [
    'Full-time', 'Part-time', 'Contract', 'Internship',
    'Freelance', 'Temporary', 'Volunteer', 'Walk-in'
  ];

  const locationOptions = [
    'Bangalore', 'Chennai', 'Hyderabad', 'Pune', 'Gurgaon',
    'Mumbai', 'Delhi', 'Kolkata', 'Ahmedabad', 'Remote',
    'Work from Home', 'Hybrid', 'On-site'
  ];

  const employmentTypeOptions = [
    'Walk-in', 'Full-time', 'Part-time', 'Work from home',
    'Hybrid', 'Remote', 'On-site'
  ];

  const currencyOptions = [
    'INR', 'USD', 'EUR', 'GBP'
  ];

  const salaryTypeOptions = [
    'Fixed', 'Negotiable', 'As per company policy'
  ];

  // Filter options based on search
  const filteredJobTypes = jobTypeOptions.filter(option =>
    option.toLowerCase().includes(jobTypeSearch.toLowerCase())
  );

  const filteredLocations = locationOptions.filter(option =>
    option.toLowerCase().includes(locationSearch.toLowerCase())
  );

  const filteredEmploymentTypes = employmentTypeOptions.filter(option =>
    option.toLowerCase().includes(employmentTypeSearch.toLowerCase())
  );

  const filteredCurrencies = currencyOptions.filter(option =>
    option.toLowerCase().includes(currencySearch.toLowerCase())
  );

  const filteredSalaryTypes = salaryTypeOptions.filter(option =>
    option.toLowerCase().includes(salaryTypeSearch.toLowerCase())
  );

  // Helper function to format date for display (dd-mm-yyyy)
  const formatDateForDisplay = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Helper function to convert dd-mm-yyyy to yyyy-mm-dd for input
  const formatDateForInput = (dateString: string) => {
    if (!dateString) return '';
    const parts = dateString.split('-');
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return dateString;
  };

  // Function to generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  };

  // Validation function
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    // Required fields validation
    if (!formData.job_title.trim()) {
      newErrors.job_title = 'Job title is required';
    }
    
    if (!formData.job_slug.trim()) {
      newErrors.job_slug = 'Job slug is required';
    }
    
    if (!formData.job_description.trim()) {
      newErrors.job_description = 'Job description is required';
    }
    
    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    if (!formData.job_type.trim()) {
      newErrors.job_type = 'Job type is required';
    }
    
    if (!formData.employment_type.trim()) {
      newErrors.employment_type = 'Employment type is required';
    }
    
    if (!formData.job_post_date.trim()) {
      newErrors.job_post_date = 'Job post date is required';
    }
    
    if (!formData.job_expire_date.trim()) {
      newErrors.job_expire_date = 'Job expire date is required';
    }
    
     if (!formData.currency.trim()) {
       newErrors.currency = 'Currency is required';
     }
    
    // URL validation for apply link
    if (formData.apply_link.trim() && !isValidUrl(formData.apply_link)) {
      newErrors.apply_link = 'Please enter a valid URL';
    }
    
    // Date validation
    if (formData.job_post_date && formData.job_expire_date) {
      const postDate = new Date(formData.job_post_date);
      const expireDate = new Date(formData.job_expire_date);
      
      if (expireDate <= postDate) {
        newErrors.job_expire_date = 'Expire date must be after post date';
      }
    }
    
    // Salary validation
    if (formData.min_salary && formData.max_salary) {
      const minSalary = parseInt(formData.min_salary);
      const maxSalary = parseInt(formData.max_salary);
      
      if (minSalary >= maxSalary) {
        newErrors.max_salary = 'Maximum salary must be greater than minimum salary';
      }
    }
    
    // Title and description items validation
    if (selectedItems.length === 0) {
      newErrors.title_and_description = 'At least one title and description item is required';
    } else {
      selectedItems.forEach((item, index) => {
        if (!item.title.trim()) {
          newErrors[`title_${index}`] = 'Title is required';
        }
        if (!item.description.trim()) {
          newErrors[`description_${index}`] = 'Description is required';
        }
      });
    }
    
    return newErrors;
  };

  // Helper function to validate URL
  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => {
      const newData = {
        ...prev,
        [name]: value
      };
      
      // Auto-generate slug when job title changes
      if (name === 'job_title' && value) {
        newData.job_slug = generateSlug(value);
      }
      
      return newData;
    });

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle description style change
  const handleDescriptionStyleChange = (style: string) => {
    setFormData(prev => ({
      ...prev,
      description_style: style
    }));
  };

  // Handle description point text change
  const handleDescriptionPointChange = (id: number, text: string) => {
    const updatedPoints = descriptionPoints.map(point =>
      point.id === id ? { ...point, text } : point
    );
    setDescriptionPoints(updatedPoints);

    // Update form data with combined description
    const combinedDescription = updatedPoints
      .filter(point => point.text.trim())
      .map(point => point.text.trim())
      .join('\n');

    setFormData(prev => ({
      ...prev,
      description: combinedDescription
    }));
  };

  // Add new description point
  const addDescriptionPoint = () => {
    const newId = Math.max(...descriptionPoints.map(p => p.id)) + 1;
    setDescriptionPoints(prev => [...prev, { id: newId, text: '' }]);
  };

  // Remove description point
  const removeDescriptionPoint = (id: number) => {
    if (descriptionPoints.length > 1) {
      const updatedPoints = descriptionPoints.filter(point => point.id !== id);
      setDescriptionPoints(updatedPoints);

      // Update form data
      const combinedDescription = updatedPoints
        .filter(point => point.text.trim())
        .map(point => point.text.trim())
        .join('\n');

      setFormData(prev => ({
        ...prev,
        description: combinedDescription
      }));
    }
  };

  // Get formatted description with style
  const getFormattedDescription = () => {
    const nonEmptyPoints = descriptionPoints.filter(point => point.text.trim());
    if (nonEmptyPoints.length === 0) return '';

    if (formData.description_style === 'point') {
      return nonEmptyPoints.map(point => `• ${point.text.trim()}`).join('\n');
    } else if (formData.description_style === 'square') {
      return nonEmptyPoints.map(point => `▪ ${point.text.trim()}`).join('\n');
    }
    return nonEmptyPoints.map(point => point.text.trim()).join('\n');
  };

  // Add new SEO keyword
  const addSeoKeyword = () => {
    const keywordText = formData.seo_keywords.trim();
    
    // Check if keyword meets minimum length requirement
    if (keywordText.length < 3) {
      showErrorToast('Keyword must be at least 3 characters long');
      return;
    }
    
    // Check if we've reached the maximum number of keywords
    const validKeywords = seoKeywords.filter(k => k.text.trim().length >= 3);
    if (validKeywords.length >= 8) {
      showErrorToast('Maximum 8 keywords allowed');
      return;
    }
    
    // Check if keyword already exists
    const keywordExists = seoKeywords.some(k => k.text.trim().toLowerCase() === keywordText.toLowerCase());
    if (keywordExists) {
      showErrorToast('This keyword already exists');
      return;
    }
    
    // Add the keyword
    const newId = Math.max(...seoKeywords.map(k => k.id), 0) + 1;
    setSeoKeywords(prev => [...prev, { id: newId, text: keywordText }]);
    
    // Clear the input field
    setFormData(prev => ({ ...prev, seo_keywords: '' }));
  };

  // Remove SEO keyword
  const removeSeoKeyword = (id: number) => {
    const updatedKeywords = seoKeywords.filter(keyword => keyword.id !== id);
    setSeoKeywords(updatedKeywords);

    // Update form data with remaining keywords
    const combinedKeywords = updatedKeywords
      .filter(keyword => keyword.text.trim().length >= 3)
      .map(keyword => keyword.text.trim())
      .join(', ');

    setFormData(prev => ({
      ...prev,
      seo_keywords: combinedKeywords
    }));
  };


  // Get formatted preview with title and description
  const getFormattedPreview = () => {
    let preview = '';

    if (formData.title) {
      preview += formData.title;
    }

    if (formData.description) {
      if (preview) preview += '\n\n';
      preview += getFormattedDescription();
    }

    return preview;
  };

  // Handler to add preview content to selected items
  const handleAddToSelected = () => {
    if (!formData.title && !formData.description) {
      return; // Don't add if both title and description are empty
    }

    const itemData = {
      id: editingItemId || Date.now(), // Use existing ID if editing, otherwise create new
      title: formData.title,
      description: getFormattedDescription(),
      descriptionStyle: formData.description_style
    };

    if (editingItemId) {
      // Update existing item
      setSelectedItems(prev => prev.map(item => 
        item.id === editingItemId ? itemData : item
      ));
      setEditingItemId(null);
    } else {
      // Add new item
      setSelectedItems(prev => [...prev, itemData]);
    }

    // Clear the form after adding/updating
    setFormData(prev => ({
      ...prev,
      title: '',
      description: ''
    }));
    setDescriptionPoints([{ id: 1, text: '' }]);
  };

  // Handler to remove item from selected items
  const handleRemoveSelectedItem = (id: number) => {
    setSelectedItems(prev => prev.filter(item => item.id !== id));
    // Clear editing state if the item being edited is removed
    if (editingItemId === id) {
      setEditingItemId(null);
    }
  };

  // Handler to edit item - populate form with item data
  const handleEditItem = (item: { id: number; title: string; description: string; descriptionStyle: string }) => {
    setEditingItemId(item.id);
    
    // Set the title
    setFormData(prev => ({
      ...prev,
      title: item.title,
      description_style: item.descriptionStyle
    }));

    // Parse the description back into description points
    const descriptionLines = item.description.split('\n').filter(line => line.trim());
    const points = descriptionLines.map((line, index) => {
      // Remove bullet points or squares from the beginning
      const cleanLine = line.replace(/^[•▪]\s*/, '').trim();
      return { id: index + 1, text: cleanLine };
    });

    // If no points, create one empty point
    if (points.length === 0) {
      setDescriptionPoints([{ id: 1, text: '' }]);
    } else {
      setDescriptionPoints(points);
    }

    // Update form data with combined description
    const combinedDescription = points
      .filter(point => point.text.trim())
      .map(point => point.text.trim())
      .join('\n');

    setFormData(prev => ({
      ...prev,
      description: combinedDescription
    }));
  };

  // Handler to cancel editing
  const handleCancelEdit = () => {
    setEditingItemId(null);
    setFormData(prev => ({
      ...prev,
      title: '',
      description: ''
    }));
    setDescriptionPoints([{ id: 1, text: '' }]);
  };

  // Handler for selecting dropdown options
  const handleSelectOption = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Close dropdown and clear search
    if (field === 'job_type') {
      setShowJobTypeDropdown(false);
      setJobTypeSearch('');
    } else if (field === 'location') {
      setShowLocationDropdown(false);
      setLocationSearch('');
    } else if (field === 'employment_type') {
      setShowEmploymentTypeDropdown(false);
      setEmploymentTypeSearch('');
    } else if (field === 'currency') {
      setShowCurrencyDropdown(false);
      setCurrencySearch('');
    } else if (field === 'salary_type') {
      setShowSalaryTypeDropdown(false);
      setSalaryTypeSearch('');
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-container')) {
        setShowJobTypeDropdown(false);
        setShowLocationDropdown(false);
        setShowEmploymentTypeDropdown(false);
        setShowCurrencyDropdown(false);
        setShowSalaryTypeDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setErrors({});

    // Validate form before proceeding
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showErrorToast('Please fix the validation errors before submitting');
      return;
    }

    setIsLoading(true);

    // Record start time for minimum loading duration
    const startTime = Date.now();
    const minLoadingTime = 2000; // 2 seconds

    try {
      // Prepare the job data for API
      const jobData = {
        job_title: formData.job_title,
        job_slug: formData.job_slug,
        job_description: formData.job_description,
        company: formData.company,
        location: formData.location,
        job_type: formData.job_type,
        employment_type: formData.employment_type,
        job_post_date: formData.job_post_date,
        job_post_time: formData.job_post_time,
        job_expire_date: formData.job_expire_date,
        job_expire_time: formData.job_expire_time,
        min_salary: formData.min_salary,
        max_salary: formData.max_salary,
        currency: formData.currency,
        salary_type: formData.salary_type,
        apply_link: formData.apply_link,
        title_and_description_json: selectedItems.map((item, index) => ({
          title: item.title,
          description: [item.description],
          type: item.descriptionStyle,
          order: index
        })),
        // SEO fields
        seo_title: formData.seo_title,
        seo_description: formData.seo_description,
        seo_keywords: formData.seo_keywords,
        // OpenGraph fields
        og_title: formData.og_title,
        og_description: formData.og_description,
        og_image: formData.og_image,
        og_image_width: formData.og_image_width,
        og_image_height: formData.og_image_height,
        og_image_alt: formData.og_image_alt,
        og_url: formData.og_url,
        og_site_name: formData.og_site_name,
        og_locale: formData.og_locale,
        og_type: formData.og_type
      };

      // Call the API
      const response = await adminServices.addJob(jobData);

      if (response.success) {
        // Show success toast notification
        showSuccessToast('Job created successfully!');
        
        // Reset form
        setFormData({
          title: '',
          description: '',
          description_style: 'none',
          job_title: '',
          job_slug: '',
          job_description: '',
          job_type: '',
          location: '',
          employment_type: '',
          job_post_date: '',
          job_post_time: '',
          job_expire_date: '',
          job_expire_time: '',
          company: '',
          min_salary: '',
          max_salary: '',
          currency: 'INR',
          salary_type: '',
          apply_link: '',
          // SEO fields
          seo_title: '',
          seo_description: '',
          seo_keywords: '',
          // OpenGraph fields
          og_title: '',
          og_description: '',
          og_image: '',
          og_image_width: '1200',
          og_image_height: '630',
          og_image_alt: '',
          og_url: '',
          og_site_name: 'Your Career Portal',
          og_locale: 'en_US',
          og_type: 'website'
        });
        setDescriptionPoints([{ id: 1, text: '' }]);
        setSeoKeywords([{ id: 1, text: '' }]);
        setSelectedItems([]);
        setEditingItemId(null);

        // Calculate remaining time to ensure minimum 2 seconds loading
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minLoadingTime - elapsedTime);

        // Wait for remaining time, then redirect
        setTimeout(() => {
          router.push('/admin/job-management');
        }, remainingTime);
      }
    } catch (error: any) {
      console.error('Error creating job:', error);
      let errorMessage = 'Failed to create job. Please try again.';
      
      // Extract proper error message from different error formats
      if (error.response?.data?.message) {
        // Backend error message
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error) {
        // Alternative backend error format
        errorMessage = error.response.data.error;
      } else if (error.message && !error.message.includes('Request failed with status code')) {
        // Other specific error messages
        errorMessage = error.message;
      } else if (error.response?.status === 400) {
        // Handle 400 errors specifically
        if (error.response.data?.errors) {
          // Validation errors
          const validationErrors = error.response.data.errors;
          if (typeof validationErrors === 'object') {
            const firstError = Object.values(validationErrors)[0];
            errorMessage = Array.isArray(firstError) ? firstError[0] : firstError;
          }
        } else if (error.response.data?.message) {
          errorMessage = error.response.data.message;
        } else {
          errorMessage = 'Invalid data provided. Please check your inputs and try again.';
        }
      } else if (error.response?.status === 409) {
        errorMessage = 'A job with this slug already exists. Please use a different slug.';
      } else if (error.response?.status === 500) {
        errorMessage = 'Server error occurred. Please try again later.';
      }
      
      setError(errorMessage);
      showErrorToast(errorMessage);
      
      // Calculate remaining time to ensure minimum 2 seconds loading
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
      
      // Wait for remaining time before stopping loader
      setTimeout(() => {
        setIsLoading(false);
      }, remainingTime);
      return; // Exit early to avoid setting isLoading to false in finally block
    }

    // Calculate remaining time to ensure minimum 2 seconds loading
    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
    
    // Wait for remaining time before stopping loader
    setTimeout(() => {
      setIsLoading(false);
    }, remainingTime);
  };

  return (
    <div className="space-y-2">
      {/* BreadCrumbs */}
      <BreadCrumbs
        title="Add New Job"
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dashboard", icon: "fluent:grid-24-regular" },
          { label: "Job Management", href: "/admin/job-management", icon: "fluent:briefcase-24-regular" },
          { label: "Add New Job", icon: "fluent:add-24-regular" }
        ]}
      />

      {/* Success/Error Messages */}
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <Icon icon="fluent:checkmark-circle-24-regular" className="w-5 h-5 text-green-600 mr-2" />
            <p className="text-green-800 font-medium">{success}</p>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <Icon icon="fluent:error-circle-24-regular" className="w-5 h-5 text-red-600 mr-2" />
            <p className="text-red-800 font-medium">{error}</p>
          </div>
        </div>
      )}

      {/* Form Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Job Information</h3>
          <p className="text-sm text-gray-600 mt-1">Fill in the details to create a new job posting</p>
        </div>

         <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-6">
           {/* Loading Overlay */}
           {isLoading && (
             <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-10 rounded-lg">
               <div className="flex flex-col items-center space-y-4">
                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                 <div className="text-center">
                   <p className="text-lg font-semibold text-gray-900">Creating Job...</p>
                   <p className="text-sm text-gray-600 mt-1">Please wait while we process your job posting</p>
                 </div>
               </div>
             </div>
           )}
           <fieldset disabled={isLoading} className={isLoading ? 'opacity-60 pointer-events-none' : ''}>
          {/* Job Title and Description */}
          <div className="space-y-6">
            <div>
              <label htmlFor="job_title" className="block text-sm font-medium text-gray-700 mb-2">
                Job Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="job_title"
                name="job_title"
                value={formData.job_title}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 text-gray-900 ${
                  errors.job_title ? 'border-red-300' : 'border-gray-300'
                }`}
                style={inputStyles}
                placeholder="e.g., Frontend Developer"
                required
              />
              {errors.job_title && (
                <p className="mt-1 text-sm text-red-600">{errors.job_title}</p>
              )}
            </div>

            <div>
              <label htmlFor="job_slug" className="block text-sm font-medium text-gray-700 mb-2">
                Job Slug <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="job_slug"
                name="job_slug"
                value={formData.job_slug}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 text-gray-900 ${
                  errors.job_slug ? 'border-red-300' : 'border-gray-300'
                }`}
                style={inputStyles}
                placeholder="e.g., frontend-developer"
                
              />
              <p className="text-xs text-gray-500 mt-1">
                URL-friendly version of the job title. Auto-generated from job title but can be edited.
              </p>
              {errors.job_slug && (
                <p className="mt-1 text-sm text-red-600">{errors.job_slug}</p>
              )}
            </div>

            <div>
              <label htmlFor="job_description" className="block text-sm font-medium text-gray-700 mb-2">
                Job Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="job_description"
                name="job_description"
                value={formData.job_description}
                onChange={handleInputChange}
                rows={6}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 text-gray-900 ${
                  errors.job_description ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Describe the job responsibilities, duties, and what the candidate will be doing..."
                
              />
              {errors.job_description && (
                <p className="mt-1 text-sm text-red-600">{errors.job_description}</p>
              )}
            </div>
          </div>

          {/* Job Type, Location, Employment Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Job Type Searchable Dropdown */}
            <div className="dropdown-container relative">
              <label htmlFor="job_type" className="block text-sm font-medium text-gray-700 mb-2">
                Job Type <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.job_type || jobTypeSearch}
                  onChange={(e) => {
                    setJobTypeSearch(e.target.value);
                    setShowJobTypeDropdown(true);
                    if (!e.target.value) {
                      setFormData(prev => ({ ...prev, job_type: '' }));
                    }
                    // Clear error when user starts typing
                    if (errors.job_type) {
                      setErrors(prev => ({ ...prev, job_type: '' }));
                    }
                  }}
                  onFocus={() => setShowJobTypeDropdown(true)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 text-gray-900 ${
                    errors.job_type ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Search or select job type..."
                  
                />
                <button
                  type="button"
                  onClick={() => setShowJobTypeDropdown(!showJobTypeDropdown)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <Icon icon="fluent:chevron-down-24-regular" className="w-4 h-4" />
                </button>
              </div>

              {showJobTypeDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {filteredJobTypes.length > 0 ? (
                    filteredJobTypes.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleSelectOption('job_type', option)}
                        className="w-full px-3 py-2 text-left text-gray-900 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        {option}
                      </button>
                    ))
                  ) : (
                    <div className="px-3 py-2 text-gray-500">No options found</div>
                  )}
                </div>
              )}
              {errors.job_type && (
                <p className="mt-1 text-sm text-red-600">{errors.job_type}</p>
              )}
            </div>

            {/* Location Searchable Dropdown */}
            <div className="dropdown-container relative">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                Location <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.location || locationSearch}
                  onChange={(e) => {
                    setLocationSearch(e.target.value);
                    setShowLocationDropdown(true);
                    if (!e.target.value) {
                      setFormData(prev => ({ ...prev, location: '' }));
                    }
                    // Clear error when user starts typing
                    if (errors.location) {
                      setErrors(prev => ({ ...prev, location: '' }));
                    }
                  }}
                  onFocus={() => setShowLocationDropdown(true)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 text-gray-900 ${
                    errors.location ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Search or select location..."
                  
                />
                <button
                  type="button"
                  onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <Icon icon="fluent:chevron-down-24-regular" className="w-4 h-4" />
                </button>
              </div>

              {showLocationDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {filteredLocations.length > 0 ? (
                    filteredLocations.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleSelectOption('location', option)}
                        className="w-full px-3 py-2 text-left text-gray-900 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        {option}
                      </button>
                    ))
                  ) : (
                    <div className="px-3 py-2 text-gray-500">No options found</div>
                  )}
                </div>
              )}
            </div>

            {/* Employment Type Searchable Dropdown */}
            <div className="dropdown-container relative">
              <label htmlFor="employment_type" className="block text-sm font-medium text-gray-700 mb-2">
                Employment Type <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.employment_type || employmentTypeSearch}
                  onChange={(e) => {
                    setEmploymentTypeSearch(e.target.value);
                    setShowEmploymentTypeDropdown(true);
                    if (!e.target.value) {
                      setFormData(prev => ({ ...prev, employment_type: '' }));
                    }
                    // Clear error when user starts typing
                    if (errors.employment_type) {
                      setErrors(prev => ({ ...prev, employment_type: '' }));
                    }
                  }}
                  onFocus={() => setShowEmploymentTypeDropdown(true)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 text-gray-900 ${
                    errors.employment_type ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Search or select employment type..."
                />
                <button
                  type="button"
                  onClick={() => setShowEmploymentTypeDropdown(!showEmploymentTypeDropdown)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <Icon icon="fluent:chevron-down-24-regular" className="w-4 h-4" />
                </button>
              </div>

              {showEmploymentTypeDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {filteredEmploymentTypes.length > 0 ? (
                    filteredEmploymentTypes.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleSelectOption('employment_type', option)}
                        className="w-full px-3 py-2 text-left text-gray-900 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        {option}
                      </button>
                    ))
                  ) : (
                    <div className="px-3 py-2 text-gray-500">No options found</div>
                  )}
                </div>
              )}
              {errors.employment_type && (
                <p className="mt-1 text-sm text-red-600">{errors.employment_type}</p>
              )}
            </div>
          </div>

          {/* Job Dates and Times */}
          <div className="space-y-6">
            {/* Job Post Date and Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label htmlFor="job_post_date" className="block text-sm font-medium text-gray-700 mb-2">
                  Job Post Date (dd-mm-yyyy) <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="job_post_date"
                  name="job_post_date"
                  value={formData.job_post_date}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white ${
                    errors.job_post_date ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {formData.job_post_date && (
                  <p className="text-sm text-gray-500 mt-1">
                    Display: {formatDateForDisplay(formData.job_post_date)}
                  </p>
                )}
                {errors.job_post_date && (
                  <p className="mt-1 text-sm text-red-600">{errors.job_post_date}</p>
                )}
              </div>

              <div>
                <label htmlFor="job_post_time" className="block text-sm font-medium text-gray-700 mb-2">
                  Job Post Time
                </label>
                <input
                  type="time"
                  id="job_post_time"
                  name="job_post_time"
                  value={formData.job_post_time}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white ${
                    errors.job_post_time ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.job_post_time && (
                  <p className="mt-1 text-sm text-red-600">{errors.job_post_time}</p>
                )}
              </div>
            </div>

            {/* Job Expire Date and Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label htmlFor="job_expire_date" className="block text-sm font-medium text-gray-700 mb-2">
                  Job Expire Date (dd-mm-yyyy) <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="job_expire_date"
                  name="job_expire_date"
                  value={formData.job_expire_date}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white ${
                    errors.job_expire_date ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {formData.job_expire_date && (
                  <p className="text-sm text-gray-500 mt-1">
                    Display: {formatDateForDisplay(formData.job_expire_date)}
                  </p>
                )}
                {errors.job_expire_date && (
                  <p className="mt-1 text-sm text-red-600">{errors.job_expire_date}</p>
                )}
              </div>

              <div>
                <label htmlFor="job_expire_time" className="block text-sm font-medium text-gray-700 mb-2">
                  Job Expire Time
                </label>
                <input
                  type="time"
                  id="job_expire_time"
                  name="job_expire_time"
                  value={formData.job_expire_time}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white ${
                    errors.job_expire_time ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.job_expire_time && (
                  <p className="mt-1 text-sm text-red-600">{errors.job_expire_time}</p>
                )}
              </div>
            </div>
          </div>

          {/* Company and Salary Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 text-gray-900 ${
                  errors.company ? 'border-red-300' : 'border-gray-300'
                }`}
                style={inputStyles}
                placeholder="e.g., Tech Corp"
                
              />
              {errors.company && (
                <p className="mt-1 text-sm text-red-600">{errors.company}</p>
              )}
            </div>

            <div>
              <label htmlFor="apply_link" className="block text-sm font-medium text-gray-700 mb-2">
                Apply Link
              </label>
              <input
                type="url"
                id="apply_link"
                name="apply_link"
                value={formData.apply_link}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 text-gray-900 ${
                  errors.apply_link ? 'border-red-300' : 'border-gray-300'
                }`}
                style={inputStyles}
                placeholder="https://example.com/apply"
              />
              {errors.apply_link && (
                <p className="mt-1 text-sm text-red-600">{errors.apply_link}</p>
              )}
            </div>
          </div>

          {/* Salary Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div>
              <label htmlFor="min_salary" className="block text-sm font-medium text-gray-700 mb-2">
                Min Salary
              </label>
              <input
                type="number"
                id="min_salary"
                name="min_salary"
                value={formData.min_salary}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 text-gray-900"
                style={inputStyles}
                placeholder="50000"
              />
            </div>

            <div>
              <label htmlFor="max_salary" className="block text-sm font-medium text-gray-700 mb-2">
                Max Salary
              </label>
              <input
                type="number"
                id="max_salary"
                name="max_salary"
                value={formData.max_salary}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 text-gray-900"
                style={inputStyles}
                placeholder="100000"
              />
            </div>

            {/* Currency Searchable Dropdown */}
            <div className="dropdown-container relative">
              <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-2">
                Currency <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.currency || currencySearch}
                  onChange={(e) => {
                    setCurrencySearch(e.target.value);
                    setShowCurrencyDropdown(true);
                    if (!e.target.value) {
                      setFormData(prev => ({ ...prev, currency: '' }));
                    }
                    // Clear error when user starts typing
                    if (errors.currency) {
                      setErrors(prev => ({ ...prev, currency: '' }));
                    }
                  }}
                  onFocus={() => setShowCurrencyDropdown(true)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 text-gray-900 ${
                    errors.currency ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Search or select currency..."
                />
                <button
                  type="button"
                  onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <Icon icon="fluent:chevron-down-24-regular" className="w-4 h-4" />
                </button>
              </div>

              {showCurrencyDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {filteredCurrencies.length > 0 ? (
                    filteredCurrencies.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleSelectOption('currency', option)}
                        className="w-full px-3 py-2 text-left text-gray-900 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        {option}
                      </button>
                    ))
                  ) : (
                    <div className="px-3 py-2 text-gray-500">No options found</div>
                  )}
                </div>
              )}
              {errors.currency && (
                <p className="mt-1 text-sm text-red-600">{errors.currency}</p>
              )}
            </div>

            {/* Salary Type Searchable Dropdown */}
            <div className="dropdown-container relative">
              <label htmlFor="salary_type" className="block text-sm font-medium text-gray-700 mb-2">
                Salary Type <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.salary_type || salaryTypeSearch}
                  onChange={(e) => {
                    setSalaryTypeSearch(e.target.value);
                    setShowSalaryTypeDropdown(true);
                    if (!e.target.value) {
                      setFormData(prev => ({ ...prev, salary_type: '' }));
                    }
                    // Clear error when user starts typing
                    if (errors.salary_type) {
                      setErrors(prev => ({ ...prev, salary_type: '' }));
                    }
                  }}
                  onFocus={() => setShowSalaryTypeDropdown(true)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 text-gray-900 ${
                    errors.salary_type ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Search or select salary type..."
                />
                <button
                  type="button"
                  onClick={() => setShowSalaryTypeDropdown(!showSalaryTypeDropdown)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <Icon icon="fluent:chevron-down-24-regular" className="w-4 h-4" />
                </button>
              </div>

              {showSalaryTypeDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {filteredSalaryTypes.length > 0 ? (
                    filteredSalaryTypes.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleSelectOption('salary_type', option)}
                        className="w-full px-3 py-2 text-left text-gray-900 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        {option}
                      </button>
                    ))
                  ) : (
                    <div className="px-3 py-2 text-gray-500">No options found</div>
                  )}
                </div>
              )}
              {errors.salary_type && (
                <p className="mt-1 text-sm text-red-600">{errors.salary_type}</p>
              )}
            </div>
          </div>

          {/* Title and Description */}
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 text-gray-900"
                style={inputStyles}
                placeholder="e.g., Software Engineer Position"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>

              {/* Description Style Selection */}
              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Description Style
                </label>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => handleDescriptionStyleChange('none')}
                    className={`px-3 py-1 text-sm rounded-md border transition-colors ${formData.description_style === 'none'
                        ? 'bg-blue-100 border-blue-300 text-blue-700'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                  >
                    None
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDescriptionStyleChange('point')}
                    className={`px-3 py-1 text-sm rounded-md border transition-colors ${formData.description_style === 'point'
                        ? 'bg-blue-100 border-blue-300 text-blue-700'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                  >
                    • Point
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDescriptionStyleChange('square')}
                    className={`px-3 py-1 text-sm rounded-md border transition-colors ${formData.description_style === 'square'
                        ? 'bg-blue-100 border-blue-300 text-blue-700'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                  >
                    ▪ Square
                  </button>
                </div>
              </div>

              {/* Description Points */}
              <div className="space-y-3">
                {descriptionPoints.map((point, index) => (
                  <div key={point.id} className="flex flex-col sm:flex-row gap-2 items-start">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={point.text}
                        onChange={(e) => handleDescriptionPointChange(point.id, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 text-gray-900"
                        placeholder={`Description point ${index + 1}...`}
                      />
                    </div>
                    {descriptionPoints.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeDescriptionPoint(point.id)}
                        className="mt-2 sm:mt-0 p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors self-start"
                      >
                        <Icon icon="fluent:delete-24-regular" className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}

                {/* Add Description Point Button */}
                <button
                  type="button"
                  onClick={addDescriptionPoint}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors border border-blue-200"
                >
                  <Icon icon="fluent:add-24-regular" className="w-4 h-4" />
                  Add Description Point
                </button>
              </div>

              {/* Preview of formatted title and description */}
              {(formData.title || formData.description) && (
                <div className="mt-2 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <p className="text-xs font-medium text-gray-600 mb-1">Preview:</p>
                  <div className="max-w-full overflow-hidden">
                    <div className="text-gray-800 break-words whitespace-pre-wrap overflow-wrap-anywhere">
                      {formData.title && (
                        <p className="text-base font-semibold mb-2">{formData.title}</p>
                      )}
                      {formData.description && (
                        <div className="text-sm text-gray-700">
                          {getFormattedDescription().split('\n').map((line, index) => (
                            <p key={index}>{line}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Add/Update Button in Preview */}
                  <div className="mt-3 pt-3 border-t border-gray-200 flex gap-2">
                    <button
                      type="button"
                      onClick={handleAddToSelected}
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    >
                      <Icon icon={editingItemId ? "fluent:save-24-regular" : "fluent:add-24-regular"} className="w-4 h-4" />
                      {editingItemId ? 'Update' : 'Add'}
                    </button>
                    {editingItemId && (
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      >
                        <Icon icon="fluent:dismiss-24-regular" className="w-4 h-4" />
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              )}
              
            </div>
            {errors.title_and_description && (
              <p className="mt-2 text-sm text-red-600">{errors.title_and_description}</p>
            )}
          </div>

          {/* Selected Title and Description */}
          {selectedItems.length > 0 && (
            <div className="space-y-6">
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Selected Title and Description</h3>
                <div className="space-y-4">
                  {selectedItems.map((item, index) => (
                    <div key={item.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-sm font-medium text-gray-700">Item {index + 1}</h4>
                        <div className="flex gap-1">
                          <button
                            type="button"
                            onClick={() => handleEditItem(item)}
                            className="p-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
                            title="Edit item"
                          >
                            <Icon icon="fluent:edit-24-regular" className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveSelectedItem(item.id)}
                            className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                            title="Delete item"
                          >
                            <Icon icon="fluent:delete-24-regular" className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      {item.title && (
                        <div className="mb-3">
                          <p className="text-sm font-medium text-gray-600 mb-1">Title:</p>
                          <p className="text-base font-semibold text-gray-800">{item.title}</p>
                        </div>
                      )}
                      
                      {item.description && (
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-1">Description:</p>
                          <div className="text-sm text-gray-800 whitespace-pre-wrap">
                            {item.description}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SEO Metadata */}
          <div className="space-y-6">
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO Settings</h3>
              <p className="text-sm text-gray-600 mb-6">Configure search engine optimization settings for better visibility in search results.</p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  <div>
                    <label htmlFor="seo_title" className="block text-sm font-medium text-gray-700 mb-2">
                      SEO Title
                    </label>
                    <input
                      type="text"
                      id="seo_title"
                      name="seo_title"
                      value={formData.seo_title}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 text-gray-900"
                      style={inputStyles}
                      placeholder="e.g., Senior Developer Jobs in Hyderabad | Apply Now"
                      maxLength={60}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Title for search engines. Recommended: 50-60 characters. Leave empty to use job title.
                    </p>
                  </div>

                  <div>
                    <label htmlFor="seo_description" className="block text-sm font-medium text-gray-700 mb-2">
                      SEO Description
                    </label>
                    <textarea
                      id="seo_description"
                      name="seo_description"
                      value={formData.seo_description}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 text-gray-900"
                      placeholder="e.g., Join our team as a Senior Developer in Hyderabad. Exciting opportunities with competitive salary and growth prospects. Apply now!"
                      maxLength={160}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Description for search engines. Recommended: 150-160 characters. Leave empty to use job description.
                    </p>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      SEO Keywords *
                    </label>
                    
                    {/* Input Field and Add Button */}
                    <div className="flex flex-col sm:flex-row gap-2 mb-3">
                      <input
                        type="text"
                        value={formData.seo_keywords}
                        onChange={(e) => {
                          setFormData(prev => ({ ...prev, seo_keywords: e.target.value }));
                        }}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addSeoKeyword();
                          }
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 text-gray-900"
                        style={inputStyles}
                        placeholder="Add keywords (e.g., 'senior developer', 'software engineer', 'hyderabad jobs')"
                      />
                      <button
                        type="button"
                        onClick={addSeoKeyword}
                        className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                      >
                        Add Keyword
                      </button>
                    </div>

                    {/* Rules */}
                    <div className="text-xs text-gray-600 mb-3">
                      <p className="mb-1">Press Enter or click Add Keyword to add</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Minimum 3 characters per keyword</li>
                        <li>Maximum 8 keywords allowed</li>
                        <li>{Math.max(0, 8 - seoKeywords.filter(k => k.text.trim().length >= 3).length)} keywords remaining</li>
                      </ul>
                    </div>

                    {/* Display Tags */}
                    {seoKeywords.filter(k => k.text.trim().length >= 3).length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {seoKeywords
                          .filter(keyword => keyword.text.trim().length >= 3)
                          .map((keyword) => (
                            <div
                              key={keyword.id}
                              className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                            >
                              <span>{keyword.text.trim()}</span>
                              <button
                                type="button"
                                onClick={() => removeSeoKeyword(keyword.id)}
                                className="text-red-600 hover:text-red-800 hover:bg-red-100 rounded-full p-0.5 transition-colors"
                                title="Remove keyword"
                              >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* OpenGraph Metadata */}
          <div className="space-y-6">
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Social Media Sharing (OpenGraph)</h3>
              <p className="text-sm text-gray-600 mb-6">Configure how this job appears when shared on social media platforms like Facebook, LinkedIn, and Twitter.</p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  <div>
                    <label htmlFor="og_title" className="block text-sm font-medium text-gray-700 mb-2">
                      Social Media Title
                    </label>
                    <input
                      type="text"
                      id="og_title"
                      name="og_title"
                      value={formData.og_title}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 text-gray-900"
                      style={inputStyles}
                      placeholder="e.g., Join Our Team - Senior Developer Role"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Title shown when shared on social media. Leave empty to use job title.
                    </p>
                  </div>

                  <div>
                    <label htmlFor="og_description" className="block text-sm font-medium text-gray-700 mb-2">
                      Social Media Description
                    </label>
                    <textarea
                      id="og_description"
                      name="og_description"
                      value={formData.og_description}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 text-gray-900"
                      placeholder="e.g., Exciting opportunity for experienced developers to join our innovative team..."
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Description shown when shared on social media. Leave empty to use job description.
                    </p>
                  </div>

                  <div>
                    <label htmlFor="og_image" className="block text-sm font-medium text-gray-700 mb-2">
                      Social Media Image URL
                    </label>
                    <input
                      type="url"
                      id="og_image"
                      name="og_image"
                      value={formData.og_image}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 text-gray-900"
                      style={inputStyles}
                      placeholder="https://example.com/job-banner.png"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Image URL for social media sharing. Recommended size: 1200x630px.
                    </p>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div>
                    <label htmlFor="og_image_alt" className="block text-sm font-medium text-gray-700 mb-2">
                      Image Alt Text
                    </label>
                    <input
                      type="text"
                      id="og_image_alt"
                      name="og_image_alt"
                      value={formData.og_image_alt}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 text-gray-900"
                      style={inputStyles}
                      placeholder="e.g., Senior Developer Position at Our Company"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Alternative text for the social media image.
                    </p>
                  </div>

                  <div>
                    <label htmlFor="og_url" className="block text-sm font-medium text-gray-700 mb-2">
                      Custom URL
                    </label>
                    <input
                      type="url"
                      id="og_url"
                      name="og_url"
                      value={formData.og_url}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 text-gray-900"
                      style={inputStyles}
                      placeholder="https://yourwebsite.com/job-details/custom-url"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Custom URL for social media sharing. Leave empty to auto-generate from slug.
                    </p>
                  </div>

                  <div>
                    <label htmlFor="og_site_name" className="block text-sm font-medium text-gray-700 mb-2">
                      Site Name
                    </label>
                    <input
                      type="text"
                      id="og_site_name"
                      name="og_site_name"
                      value={formData.og_site_name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 text-gray-900"
                      style={inputStyles}
                      placeholder="Your Career Portal"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Your website/brand name for social media sharing.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

                {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-3">
          <div className="flex items-center">
            <Icon icon="fluent:error-circle-24-regular" className="w-5 h-5 text-red-600 mr-2" />
            <p className="text-red-800 font-medium">{error}</p>
          </div>
        </div>
      )}

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 sm:gap-4 pt-6 border-t border-gray-200">
            <Link
              href="/admin/job-management"
              className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-center"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto px-6 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Icon icon="fluent:spinner-ios-16-regular" className="w-4 h-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Icon icon="fluent:save-24-regular" className="w-4 h-4" />
                  Create Job
                </>
              )}
            </button>
          </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
