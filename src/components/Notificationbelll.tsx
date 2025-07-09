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
      <button onClick={() => setOpen(!open)} className="relative p-2">
        <Bell className="w-6 h-6" />
        {notifications.some((n) => !n.read) && (
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg z-50 max-h-96 overflow-auto">
          <div className="p-4 font-bold border-b">Notifications</div>
          {notifications.length === 0 ? (
            <div className="p-4 text-sm text-gray-500">No delivered notifications</div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-4 border-b ${
                  notif.read ? 'bg-white' : 'bg-gray-100'
                } transition-colors`}
              >
                <div className="font-semibold">{notif.title}</div>
                <div className="text-sm text-gray-600">{notif.description}</div>
                <div className="text-xs text-gray-400">
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
