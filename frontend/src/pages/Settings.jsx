import { useEffect, useState } from 'react';
import { useSettingsStore } from '../store/foodStore';
import { useAuthStore } from '../store/authStore';
import { Bell, MapPin, LogOut } from 'lucide-react';

export default function Settings() {
  const { settings, fetchSettings, updateNotificationPreferences, updateLocation } = useSettingsStore();
  const { logout, user } = useAuthStore();
  const [notificationPrefs, setNotificationPrefs] = useState({});
  const [locationData, setLocationData] = useState({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  useEffect(() => {
    if (settings?.preferences) {
      setNotificationPrefs(settings.preferences);
    }
    if (settings?.location) {
      setLocationData(settings.location);
    }
  }, [settings]);

  const handleNotificationChange = (key, value) => {
    setNotificationPrefs(prev => ({ ...prev, [key]: value }));
  };

  const handleReminderDayChange = (index, value) => {
    const newDays = [...notificationPrefs.reminderDays];
    newDays[index] = parseInt(value);
    setNotificationPrefs(prev => ({ ...prev, reminderDays: newDays }));
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setLocationData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveNotifications = async () => {
    try {
      await updateNotificationPreferences(notificationPrefs);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      alert('Failed to save notification preferences');
    }
  };

  const handleSaveLocation = async () => {
    try {
      await updateLocation(locationData.address, locationData.latitude, locationData.longitude);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      alert('Failed to save location');
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold text-8te-dark">Settings</h1>

      {saved && (
        <div className="bg-green-500 text-white p-4 rounded-lg">
          ✓ Settings saved successfully!
        </div>
      )}

      {/* Notification Preferences */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-8te-dark mb-4 flex items-center gap-2">
          <Bell className="text-8te-yellow" />
          Notification Preferences
        </h2>

        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={notificationPrefs.notificationsEnabled || false}
              onChange={(e) => handleNotificationChange('notificationsEnabled', e.target.checked)}
              className="w-5 h-5"
            />
            <span className="text-8te-dark font-semibold">Enable all notifications</span>
          </label>

          {notificationPrefs.notificationsEnabled && (
            <>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationPrefs.emailNotifications || false}
                  onChange={(e) => handleNotificationChange('emailNotifications', e.target.checked)}
                  className="w-5 h-5"
                />
                <span className="text-8te-dark">Email Notifications</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationPrefs.pushNotifications || false}
                  onChange={(e) => handleNotificationChange('pushNotifications', e.target.checked)}
                  className="w-5 h-5"
                />
                <span className="text-8te-dark">Push Notifications</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationPrefs.smsNotifications || false}
                  onChange={(e) => handleNotificationChange('smsNotifications', e.target.checked)}
                  className="w-5 h-5"
                />
                <span className="text-8te-dark">SMS Notifications</span>
              </label>

              <div className="bg-gray-50 p-4 rounded-lg mt-4">
                <p className="text-8te-dark font-semibold mb-3">Reminder Timing (days before expiry)</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {(notificationPrefs.reminderDays || []).map((day, index) => (
                    <input
                      key={index}
                      type="number"
                      value={day}
                      onChange={(e) => handleReminderDayChange(index, e.target.value)}
                      className="input-primary text-center"
                    />
                  ))}
                </div>
              </div>
            </>
          )}

          <button onClick={handleSaveNotifications} className="btn-primary w-full">
            Save Notification Preferences
          </button>
        </div>
      </div>

      {/* Location Settings */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-8te-dark mb-4 flex items-center gap-2">
          <MapPin className="text-8te-yellow" />
          Location Settings
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-8te-dark font-semibold mb-2">Address</label>
            <input
              type="text"
              name="address"
              value={locationData.address || ''}
              onChange={handleLocationChange}
              className="input-primary"
              placeholder="Your address"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-8te-dark font-semibold mb-2">Latitude</label>
              <input
                type="number"
                name="latitude"
                value={locationData.latitude || ''}
                onChange={handleLocationChange}
                className="input-primary"
                step="0.0001"
              />
            </div>
            <div>
              <label className="block text-8te-dark font-semibold mb-2">Longitude</label>
              <input
                type="number"
                name="longitude"
                value={locationData.longitude || ''}
                onChange={handleLocationChange}
                className="input-primary"
                step="0.0001"
              />
            </div>
          </div>

          <button onClick={handleSaveLocation} className="btn-primary w-full">
            Save Location
          </button>
        </div>
      </div>

      {/* Account Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-8te-dark mb-4">Account</h2>
        
        <div className="mb-4">
          <p className="text-gray-600 text-sm">Email</p>
          <p className="text-8te-dark font-semibold">{user?.email}</p>
        </div>

        <button
          onClick={logout}
          className="btn-secondary w-full flex items-center justify-center gap-2"
        >
          <LogOut size={20} />
          Sign Out
        </button>
      </div>
    </div>
  );
}
