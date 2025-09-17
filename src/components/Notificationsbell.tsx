import React, { useState, useRef, useEffect } from 'react';
import { Bell } from 'lucide-react';

const notifications = [
  {
    id: 1,
    title: 'Payment Received',
    description: 'You received ₦20,000 from John.',
    time: '2h ago',
    read: false,
  },
  {
    id: 2,
    title: 'Loan Approved',
    description: 'Your loan request was approved!',
    time: '1d ago',
    read: true,
  },
  {
    id: 3,
    title: 'Reminder',
    description: 'Repayment is due tomorrow.',
    time: '3d ago',
    read: false,
  },
];

const NotificationBell: React.FC = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <div className="relative z-[1000]" ref={dropdownRef}>
        {/* Bell Button */}
        <button
          onClick={() => setOpen(prev => !prev)}
          className="relative p-2 rounded-xl bg-blue-100/50 hover:bg-blue-200/50 transition-all duration-200 group"
        >
          <Bell className="w-5 h-5 text-blue-600 group-hover:text-blue-700" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-red-500 to-green-500 rounded-full flex items-center justify-center">
            <span className="text-xs text-white font-medium">
              {notifications.filter(n => !n.read).length}
            </span>
          </div>
        </button>
      </div>

      {/* Notification Modal */}
      {open && (
        <div
          className="fixed top-16 right-6 w-80 z-[9999] rounded-lg shadow-lg border border-blue-800"
          style={{ backgroundColor: 'rgba(10, 25, 47, 0.95)' }}
        >
          {notifications.length === 0 ? (
            <div className="p-4 text-sm text-center text-white">No notifications</div>
          ) : (
            <ul className="divide-y divide-blue-700 max-h-60 overflow-y-auto">
              {notifications.map(n => (
                <li
                  key={n.id}
                  className={`p-3 text-sm cursor-pointer transition-colors duration-150 hover:bg-blue-800 ${
                    n.read
                      ? 'text-blue-300'
                      : 'text-white font-semibold bg-blue-900'
                  }`}
                >
                  <div className="flex justify-between">
                    <span>{n.title}</span>
                    <span className="text-xs text-blue-400">{n.time}</span>
                  </div>
                  <p className="text-xs text-blue-200 mt-1">{n.description}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
};

export default NotificationBell;