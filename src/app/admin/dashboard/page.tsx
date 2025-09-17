'use client';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import BreadCrumbs from '@/components/admin/BreadCrumbs';

export default function AdminDashboard() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: 'Important Meeting',
      content: 'Team meeting scheduled for tomorrow at 2 PM to discuss Q4 goals.',
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      title: 'System Update',
      content: 'Remember to update the server before the weekend maintenance window.',
      createdAt: '2024-01-14'
    }
  ]);
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const [isAddingNote, setIsAddingNote] = useState(false);

  const handleAddNote = () => {
    if (newNote.title.trim() && newNote.content.trim()) {
      const note = {
        id: Date.now(),
        title: newNote.title,
        content: newNote.content,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setNotes([note, ...notes]);
      setNewNote({ title: '', content: '' });
      setIsAddingNote(false);
    }
  };

  const handleDeleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
  };


  return (
    <div className="space-y-2">
      {/* BreadCrumbs */}
      <BreadCrumbs 
        title="Dashboard" 
        breadcrumbs={[
          { label: "Dashboard", icon: "fluent:grid-24-regular" }
        ]} 
      />


      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Users Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">12,847</p>
             
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Icon icon="fluent:people-24-regular" className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Total Jobs Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Jobs</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">1,234</p>
             
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <Icon icon="fluent:briefcase-24-regular" className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        {/* Total Earnings Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Earnings</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">₹45,678</p>
             
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <Icon icon="fluent:money-24-regular" className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        {/* Total Groups Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Groups</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">456</p>
             
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <Icon icon="fluent:people-team-24-regular" className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Communication Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* WhatsApp Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon icon="mdi:whatsapp" className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">WhatsApp</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Groups:</span>
                <span className="text-lg font-semibold text-green-600">156</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Members:</span>
                <span className="text-lg font-semibold text-green-600">8,247</span>
              </div>
            </div>
          </div>
        </div>

        {/* Telegram Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon icon="mdi:telegram" className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Telegram</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Groups:</span>
                <span className="text-lg font-semibold text-blue-600">89</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Members:</span>
                <span className="text-lg font-semibold text-blue-600">5,123</span>
              </div>
            </div>
          </div>
        </div>

        {/* Email Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon icon="mdi:email" className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Groups:</span>
                <span className="text-lg font-semibold text-red-600">234</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Members:</span>
                <span className="text-lg font-semibold text-red-600">12,456</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notes Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Icon icon="mdi:note-text" className="w-5 h-5 text-blue-600" />
            Notes
          </h3>
          <button
            onClick={() => setIsAddingNote(!isAddingNote)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Icon icon="mdi:plus" className="w-4 h-4" />
            Add Note
          </button>
        </div>

        {/* Add Note Form */}
        {isAddingNote && (
          <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={newNote.title}
                  onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                  placeholder="Enter note title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                <textarea
                  value={newNote.content}
                  onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                  placeholder="Enter note content"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleAddNote}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Save Note
                </button>
                <button
                  onClick={() => {
                    setIsAddingNote(false);
                    setNewNote({ title: '', content: '' });
                  }}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Notes List */}
        <div className="space-y-4">
          {notes.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Icon icon="mdi:note-off" className="w-12 h-12 mx-auto mb-2 text-gray-400" />
              <p>No notes yet. Add your first note above!</p>
            </div>
          ) : (
            notes.map((note) => (
              <div key={note.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">{note.title}</h4>
                    <p className="text-gray-600 mb-2">{note.content}</p>
                    <p className="text-sm text-gray-400">Created: {note.createdAt}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteNote(note.id)}
                    className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Icon icon="mdi:delete" className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}
