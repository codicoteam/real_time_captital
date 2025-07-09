import React, { useRef, useEffect } from "react";
import { Bell } from "lucide-react";

type Notification = {
  id: number;
  text: string;
};

interface BellProps {
  notifications: Notification[];
  onViewAll: () => void;
}

const AdminBell: React.FC<BellProps> = ({ notifications, onViewAll }) => {
  const [showNotifications, setShowNotifications] = React.useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={notificationRef}>
      <button
        onClick={() => setShowNotifications((prev) => !prev)}
        className="relative p-2 rounded-xl bg-orange-100/50 hover:bg-orange-200/50 transition-all duration-200 group"
      >
        <Bell className="w-5 h-5 text-orange-600 group-hover:text-orange-700" />
        {notifications.length > 0 && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
            <span className="text-xs text-white font-medium">
              {notifications.length}
            </span>
          </div>
        )}
      </button>

      {showNotifications && (
        <div className="absolute right-0 mt-2 w-72 bg-white border border-orange-100 shadow-xl rounded-xl z-50 p-4 space-y-2">
          <h3 className="text-sm font-semibold text-orange-600">
            Notifications
          </h3>
          <ul className="text-sm text-orange-800 space-y-1">
            {notifications.map((note) => (
              <li key={note.id}>{note.text}</li>
            ))}
          </ul>
          <button
            onClick={() => {
              setShowNotifications(false);
              onViewAll();
            }}
            className="text-xs text-orange-500 hover:underline mt-2"
          >
            View all
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminBell;
