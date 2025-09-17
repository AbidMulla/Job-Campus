'use client';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import BreadCrumbs from '@/components/admin/BreadCrumbs';

function Course() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedDuration, setSelectedDuration] = useState('all');
  const [selectedCourses, setSelectedCourses] = useState<number[]>([]);

  // Mock course data
  const courses = [
    {
      id: 1,
      title: 'React Development Fundamentals',
      instructor: 'John Smith',
      category: 'Web Development',
      level: 'Beginner',
      duration: '8 weeks',
      status: 'active',
      enrolled: 156,
      views: 1247,
      price: '$299',
      startDate: '2024-02-15',
      endDate: '2024-04-15'
    },
    {
      id: 2,
      title: 'Advanced JavaScript Concepts',
      instructor: 'Sarah Johnson',
      category: 'Programming',
      level: 'Advanced',
      duration: '12 weeks',
      status: 'active',
      enrolled: 89,
      views: 892,
      price: '$399',
      startDate: '2024-02-20',
      endDate: '2024-05-20'
    },
    {
      id: 3,
      title: 'UI/UX Design Principles',
      instructor: 'Mike Chen',
      category: 'Design',
      level: 'Intermediate',
      duration: '6 weeks',
      status: 'expire',
      enrolled: 45,
      views: 567,
      price: '$249',
      startDate: '2024-01-15',
      endDate: '2024-03-15'
    },
    {
      id: 4,
      title: 'Python for Data Science',
      instructor: 'Emily Davis',
      category: 'Data Science',
      level: 'Intermediate',
      duration: '10 weeks',
      status: 'active',
      enrolled: 203,
      views: 1456,
      price: '$349',
      startDate: '2024-02-10',
      endDate: '2024-04-20'
    },
    {
      id: 5,
      title: 'Digital Marketing Strategy',
      instructor: 'Alex Rodriguez',
      category: 'Marketing',
      level: 'Beginner',
      duration: '4 weeks',
      status: 'active',
      enrolled: 78,
      views: 634,
      price: '$199',
      startDate: '2024-02-25',
      endDate: '2024-03-25'
    },
    {
      id: 6,
      title: 'Machine Learning Basics',
      instructor: 'Dr. Lisa Wang',
      category: 'AI/ML',
      level: 'Advanced',
      duration: '14 weeks',
      status: 'active',
      enrolled: 134,
      views: 1123,
      price: '$499',
      startDate: '2024-02-01',
      endDate: '2024-05-15'
    },
    {
      id: 7,
      title: 'Mobile App Development',
      instructor: 'David Kim',
      category: 'Mobile Development',
      level: 'Intermediate',
      duration: '10 weeks',
      status: 'active',
      enrolled: 92,
      views: 789,
      price: '$379',
      startDate: '2024-02-18',
      endDate: '2024-04-28'
    },
    {
      id: 8,
      title: 'Cybersecurity Fundamentals',
      instructor: 'Robert Taylor',
      category: 'Security',
      level: 'Beginner',
      duration: '8 weeks',
      status: 'expire',
      enrolled: 67,
      views: 445,
      price: '$329',
      startDate: '2024-01-20',
      endDate: '2024-03-20'
    },
    {
      id: 9,
      title: 'Cloud Computing with AWS',
      instructor: 'Jennifer Lee',
      category: 'Cloud',
      level: 'Intermediate',
      duration: '12 weeks',
      status: 'active',
      enrolled: 145,
      views: 987,
      price: '$449',
      startDate: '2024-02-12',
      endDate: '2024-05-12'
    },
    {
      id: 10,
      title: 'Blockchain Development',
      instructor: 'Kevin Patel',
      category: 'Blockchain',
      level: 'Advanced',
      duration: '16 weeks',
      status: 'active',
      enrolled: 56,
      views: 678,
      price: '$599',
      startDate: '2024-02-05',
      endDate: '2024-05-26'
    },
    {
      id: 11,
      title: 'DevOps and CI/CD',
      instructor: 'Maria Garcia',
      category: 'DevOps',
      level: 'Intermediate',
      duration: '9 weeks',
      status: 'active',
      enrolled: 112,
      views: 834,
      price: '$399',
      startDate: '2024-02-22',
      endDate: '2024-04-22'
    },
    {
      id: 12,
      title: 'Graphic Design Mastery',
      instructor: 'Tom Wilson',
      category: 'Design',
      level: 'Beginner',
      duration: '6 weeks',
      status: 'expire',
      enrolled: 89,
      views: 523,
      price: '$279',
      startDate: '2024-01-10',
      endDate: '2024-02-21'
    },
    {
      id: 13,
      title: 'Database Management',
      instructor: 'Anna Brown',
      category: 'Database',
      level: 'Intermediate',
      duration: '7 weeks',
      status: 'active',
      enrolled: 98,
      views: 712,
      price: '$319',
      startDate: '2024-02-15',
      endDate: '2024-04-05'
    },
    {
      id: 14,
      title: 'Project Management',
      instructor: 'Chris Anderson',
      category: 'Management',
      level: 'Beginner',
      duration: '5 weeks',
      status: 'active',
      enrolled: 156,
      views: 945,
      price: '$229',
      startDate: '2024-02-28',
      endDate: '2024-04-04'
    },
    {
      id: 15,
      title: 'Full Stack Development',
      instructor: 'Rachel Green',
      category: 'Web Development',
      level: 'Advanced',
      duration: '20 weeks',
      status: 'active',
      enrolled: 78,
      views: 1234,
      price: '$799',
      startDate: '2024-02-01',
      endDate: '2024-06-21'
    },
    {
      id: 16,
      title: 'iOS App Development',
      instructor: 'Steve Jobs Jr.',
      category: 'Mobile Development',
      level: 'Intermediate',
      duration: '11 weeks',
      status: 'active',
      enrolled: 67,
      views: 567,
      price: '$429',
      startDate: '2024-02-20',
      endDate: '2024-05-06'
    },
    {
      id: 17,
      title: 'Android Development',
      instructor: 'Andy Rubin',
      category: 'Mobile Development',
      level: 'Intermediate',
      duration: '11 weeks',
      status: 'active',
      enrolled: 89,
      views: 678,
      price: '$429',
      startDate: '2024-02-18',
      endDate: '2024-05-04'
    },
    {
      id: 18,
      title: 'Web Security',
      instructor: 'Bruce Schneier',
      category: 'Security',
      level: 'Advanced',
      duration: '9 weeks',
      status: 'expire',
      enrolled: 45,
      views: 389,
      price: '$379',
      startDate: '2024-01-15',
      endDate: '2024-03-15'
    },
    {
      id: 19,
      title: 'Agile Methodology',
      instructor: 'Jeff Sutherland',
      category: 'Management',
      level: 'Beginner',
      duration: '4 weeks',
      status: 'active',
      enrolled: 123,
      views: 756,
      price: '$199',
      startDate: '2024-02-25',
      endDate: '2024-03-25'
    },
    {
      id: 20,
      title: 'Docker and Kubernetes',
      instructor: 'Solomon Hykes',
      category: 'DevOps',
      level: 'Advanced',
      duration: '8 weeks',
      status: 'active',
      enrolled: 76,
      views: 612,
      price: '$349',
      startDate: '2024-02-10',
      endDate: '2024-04-10'
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || course.status === selectedStatus;
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    const matchesDuration = selectedDuration === 'all' || course.duration === selectedDuration;
    
    return matchesSearch && matchesStatus && matchesCategory && matchesLevel && matchesDuration;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', label: 'Active' },
      expire: { color: 'bg-red-100 text-red-800', label: 'Expire' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.expire;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getCategoryBadge = (category: string) => {
    const categoryConfig = {
      'Web Development': { color: 'bg-blue-100 text-blue-800' },
      'Programming': { color: 'bg-purple-100 text-purple-800' },
      'Design': { color: 'bg-pink-100 text-pink-800' },
      'Data Science': { color: 'bg-emerald-100 text-emerald-800' },
      'Marketing': { color: 'bg-orange-100 text-orange-800' },
      'AI/ML': { color: 'bg-indigo-100 text-indigo-800' },
      'Mobile Development': { color: 'bg-cyan-100 text-cyan-800' },
      'Security': { color: 'bg-red-100 text-red-800' },
      'Cloud': { color: 'bg-sky-100 text-sky-800' },
      'Blockchain': { color: 'bg-yellow-100 text-yellow-800' },
      'DevOps': { color: 'bg-teal-100 text-teal-800' },
      'Database': { color: 'bg-lime-100 text-lime-800' },
      'Management': { color: 'bg-violet-100 text-violet-800' }
    };
    
    const config = categoryConfig[category as keyof typeof categoryConfig] || { color: 'bg-gray-100 text-gray-800' };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {category}
      </span>
    );
  };

  const getLevelBadge = (level: string) => {
    const levelConfig = {
      'Beginner': { color: 'bg-green-100 text-green-800' },
      'Intermediate': { color: 'bg-yellow-100 text-yellow-800' },
      'Advanced': { color: 'bg-red-100 text-red-800' }
    };
    
    const config = levelConfig[level as keyof typeof levelConfig] || { color: 'bg-gray-100 text-gray-800' };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {level}
      </span>
    );
  };

  return (
    <div className="space-y-2">
      {/* BreadCrumbs */}
      <BreadCrumbs 
        title="Course Management" 
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dashboard", icon: "fluent:grid-24-regular" },
          { label: "Course", icon: "fluent:book-24-regular" }
        ]} 
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Upload Course</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">1,247</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Icon icon="fluent:book-24-regular" className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <Link href="/admin/course/active" className="block w-full h-full">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">892</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <Icon icon="fluent:checkmark-circle-24-regular" className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <Link href="/admin/course/expired" className="block w-full h-full">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Expire</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">156</p>
              </div>
              <div className="p-3 bg-red-50 rounded-lg">
                <Icon icon="fluent:clock-24-regular" className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Last</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">-</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <Icon icon="fluent:calendar-24-regular" className="w-6 h-6 text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Course Search */}
          <div className="relative w-48">
            <Icon icon="fluent:book-24-regular" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by course..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-40 pl-3 pr-8 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer"
            >
              <option value="all">All Categories</option>
              <option value="Web Development">Web Development</option>
              <option value="Programming">Programming</option>
              <option value="Design">Design</option>
              <option value="Data Science">Data Science</option>
              <option value="Marketing">Marketing</option>
              <option value="AI/ML">AI/ML</option>
              <option value="Mobile Development">Mobile Development</option>
              <option value="Security">Security</option>
              <option value="Cloud">Cloud</option>
              <option value="Blockchain">Blockchain</option>
              <option value="DevOps">DevOps</option>
              <option value="Database">Database</option>
              <option value="Management">Management</option>
            </select>
            <Icon icon="fluent:chevron-down-24-regular" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
          </div>

          {/* Level Filter */}
          <div className="relative">
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-36 pl-3 pr-8 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer"
            >
              <option value="all">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
            <Icon icon="fluent:chevron-down-24-regular" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
          </div>

          {/* Duration Filter */}
          <div className="relative">
            <select
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(e.target.value)}
              className="w-36 pl-3 pr-8 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer"
            >
              <option value="all">All Duration</option>
              <option value="4 weeks">4 weeks</option>
              <option value="5 weeks">5 weeks</option>
              <option value="6 weeks">6 weeks</option>
              <option value="7 weeks">7 weeks</option>
              <option value="8 weeks">8 weeks</option>
              <option value="9 weeks">9 weeks</option>
              <option value="10 weeks">10 weeks</option>
              <option value="11 weeks">11 weeks</option>
              <option value="12 weeks">12 weeks</option>
              <option value="14 weeks">14 weeks</option>
              <option value="16 weeks">16 weeks</option>
              <option value="20 weeks">20 weeks</option>
            </select>
            <Icon icon="fluent:chevron-down-24-regular" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-32 pl-3 pr-8 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="expire">Expire</option>
            </select>
            <Icon icon="fluent:chevron-down-24-regular" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
          </div>

          {/* Add New Course Button */}
          <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Icon icon="fluent:add-24-regular" className="w-4 h-4" />
            Add New Course
          </button>
        </div>
      </div>

      {/* Courses Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Courses ({filteredCourses.length})</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input
                    type="checkbox"
                    checked={filteredCourses.length > 0 && filteredCourses.every(course => selectedCourses.includes(course.id))}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedCourses(filteredCourses.map(course => course.id));
                      } else {
                        setSelectedCourses([]);
                      }
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enrolled</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCourses.map((course, index) => (
                <tr 
                  key={course.id} 
                  className="hover:bg-gray-50 cursor-pointer group"
                  onClick={() => window.location.href = `/admin/course-details?id=${course.id}`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600">
                      {course.title}
                    </div>
                    <div className="text-sm text-gray-500">{course.price}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getCategoryBadge(course.category)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getLevelBadge(course.level)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(course.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center space-x-2">
                      <span className="text-blue-600 font-medium">{course.enrolled}</span>
                      <Icon icon="fluent:people-24-regular" className="w-4 h-4 text-gray-400" />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(course.endDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit'
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
                      <button className="p-1 border border-gray-300 rounded-md text-blue-600 hover:text-blue-900 hover:bg-blue-50 hover:border-blue-400 transition-colors">
                        <Icon icon="fluent:edit-24-regular" className="w-4 h-4" />
                      </button>
                      <button className="p-1 border border-gray-300 rounded-md text-green-600 hover:text-green-900 hover:bg-green-50 hover:border-green-400 transition-colors">
                        <Icon icon="fluent:eye-24-regular" className="w-4 h-4" />
                      </button>
                      <button className="p-1 border border-gray-300 rounded-md text-red-600 hover:text-red-900 hover:bg-red-50 hover:border-red-400 transition-colors">
                        <Icon icon="fluent:delete-24-regular" className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Course;
