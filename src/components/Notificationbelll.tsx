import React, { useState, useEffect, useRef } from 'react';
import { Bell } from 'lucide-react';
import { db } from '../firebase'; // adjust this to your setup
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  doc,
  updateDoc,
  Timestamp,
} from 'firebase/firestore';

interface Notification {
  id: string;
  userId: string;
  title: string;
  description: string;
  timestamp: Timestamp | Date;
  read: boolean;
  delivered: boolean;
}

interface NotificationBellProps {
  userId: string;
}

const NotificationBell: React.FC<NotificationBellProps> = ({ userId }) => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch all delivered notifications (regardless of read status)
  useEffect(() => {
    if (!userId) return;

    const q = query(
      collection(db, 'notifications'),
      where('userId', '==', userId),
      where('delivered', '==', true),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Notification[];
      setNotifications(data);
    });

    return () => unsubscribe();
  }, [userId]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Mark all unread as read when dropdown opens
  useEffect(() => {
    if (open) {
      notifications.forEach((notif) => {
        if (!notif.read) {
          const ref = doc(db, 'notifications', notif.id);
          updateDoc(ref, { read: true });
        }
      });
    }
  }, [open, notifications]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setOpen(!open)} 
        className="relative p-2 rounded-full hover:bg-green-50 transition-colors"
      >
        <Bell className="w-6 h-6 text-green-600" />
        {notifications.some((n) => !n.read) && (
          <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full"></span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg z-50 max-h-96 overflow-auto border border-green-100">
          <div className="p-4 font-bold border-b border-green-200 bg-green-50 text-green-800 rounded-t-lg">
            Notifications
          </div>
          {notifications.length === 0 ? (
            <div className="p-4 text-sm text-green-600 bg-green-25">No delivered notifications</div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-4 border-b border-green-100 ${
                  notif.read ? 'bg-white' : 'bg-green-50'
                } transition-colors`}
              >
                <div className="font-semibold text-green-900">{notif.title}</div>
                <div className="text-sm text-green-700">{notif.description}</div>
                <div className="text-xs text-green-500 mt-1">
                  {new Date(
                    notif.timestamp instanceof Timestamp
                      ? notif.timestamp.toDate()
                      : notif.timestamp
                  ).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;