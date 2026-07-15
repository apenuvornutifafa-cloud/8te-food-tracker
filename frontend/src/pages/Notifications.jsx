import { useEffect } from 'react';
import { useNotificationStore } from '../store/foodStore';
import { Bell, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function Notifications() {
  const { notifications, fetchNotifications, markAsRead, unreadCount } = useNotificationStore();

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(() => fetchNotifications(), 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold text-8te-dark mb-2 flex items-center gap-2">
        <Bell className="text-8te-yellow" />
        Notifications
      </h1>
      
      {unreadCount > 0 && (
        <p className="text-gray-600 mb-6">
          You have <strong>{unreadCount}</strong> unread notification{unreadCount !== 1 ? 's' : ''}
        </p>
      )}

      {notifications.length === 0 ? (
        <div className="text-center p-8 text-gray-600">
          <Bell size={48} className="mx-auto mb-4 text-gray-400" />
          <p>No notifications yet. Your pantry is all set!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map(notification => (
            <div
              key={notification._id}
              className={`p-4 rounded-lg border-l-4 transition-colors ${
                !notification.isRead
                  ? 'bg-yellow-50 border-8te-yellow'
                  : 'bg-gray-50 border-gray-300'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-bold text-8te-dark">{notification.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                  </p>
                </div>
                {!notification.isRead && (
                  <button
                    onClick={() => markAsRead(notification._id)}
                    className="text-8te-yellow hover:text-yellow-600 ml-2"
                  >
                    <div className="w-3 h-3 bg-8te-yellow rounded-full"></div>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
