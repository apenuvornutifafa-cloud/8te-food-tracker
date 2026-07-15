import { useEffect, useState } from 'react';
import { useDashboardStore, useFoodStore } from '../store/foodStore';
import { Plus, TrendingUp, Heart, AlertCircle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

export default function Dashboard() {
  const { fetchStats, fetchSummary, stats, summary, loading } = useDashboardStore();
  const [showEmptyState, setShowEmptyState] = useState(false);

  useEffect(() => {
    fetchStats();
    fetchSummary();
  }, []);

  useEffect(() => {
    if (summary && summary.freshItems.length === 0 && 
        summary.expiringItems.length === 0 && 
        summary.expiredItems.length === 0) {
      setShowEmptyState(true);
    } else {
      setShowEmptyState(false);
    }
  }, [summary]);

  if (loading) {
    return <div className="flex items-center justify-center p-8">Loading...</div>;
  }

  if (showEmptyState) {
    return (
      <div className="flex flex-col items-center justify-center min-h-96 text-center p-8">
        <div className="bg-8te-yellow p-8 rounded-full mb-6">
          <Plus size={48} className="text-8te-dark" />
        </div>
        <h2 className="text-3xl font-bold text-8te-dark mb-2">Start Your Pantry</h2>
        <p className="text-gray-600 mb-6 max-w-md">
          Add your first food item to get started tracking expiry dates and reducing food waste
        </p>
        <Link
          to="/add-food"
          className="btn-primary"
        >
          Add Your First Item
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-4xl font-bold text-8te-dark mb-8">
        Welcome to <span className="text-8te-yellow">8te</span>
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card bg-gradient-to-br from-green-50 to-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-semibold">Fresh Items</p>
              <p className="text-3xl font-bold text-green-600">{stats?.totalItems || 0}</p>
            </div>
            <CheckCircle size={40} className="text-green-600" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-yellow-50 to-yellow-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-semibold">Expiring Soon</p>
              <p className="text-3xl font-bold text-yellow-600">{stats?.expiringSoon || 0}</p>
            </div>
            <AlertCircle size={40} className="text-yellow-600" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-red-50 to-red-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-semibold">Expired</p>
              <p className="text-3xl font-bold text-red-600">{stats?.expired || 0}</p>
            </div>
            <AlertCircle size={40} className="text-red-600" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-semibold">Donated</p>
              <p className="text-3xl font-bold text-blue-600">{stats?.itemsDonated || 0}</p>
            </div>
            <Heart size={40} className="text-blue-600" />
          </div>
        </div>
      </div>

      {/* Expiring Soon Section */}
      {summary?.expiringItems?.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-8te-dark flex items-center gap-2">
            <AlertCircle className="text-8te-yellow" />
            Expiring Soon
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {summary.expiringItems.map(item => (
              <Link key={item._id} to={`/food/${item._id}`}>
                <div className="card hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-8te-dark">{item.name}</h3>
                    <span className="badge-yellow">
                      {formatDistanceToNow(new Date(item.expiryDate), { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {item.quantity} {item.unit} • {item.category}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Expired Items Section */}
      {summary?.expiredItems?.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-red-600 flex items-center gap-2">
            <AlertCircle size={28} />
            Expired Items
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {summary.expiredItems.map(item => (
              <div key={item._id} className="card bg-red-50 border-l-4 border-red-500">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-8te-dark">{item.name}</h3>
                  <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                    Expired
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {item.quantity} {item.unit} • Expired {formatDistanceToNow(new Date(item.expiryDate), { addSuffix: true })}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Fresh Items Section */}
      {summary?.freshItems?.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-8te-dark flex items-center gap-2">
            <CheckCircle className="text-green-600" />
            Fresh Items
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {summary.freshItems.map(item => (
              <Link key={item._id} to={`/food/${item._id}`}>
                <div className="card bg-green-50 hover:shadow-lg transition-shadow cursor-pointer">
                  <h3 className="font-bold text-8te-dark mb-1">{item.name}</h3>
                  <p className="text-sm text-gray-600">
                    {item.quantity} {item.unit}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Impact Stats */}
      {stats && (
        <div className="card bg-gradient-to-r from-8te-yellow to-yellow-300 text-8te-dark">
          <h3 className="text-2xl font-bold mb-4">Your Impact</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm font-semibold opacity-80">Items Tracked</p>
              <p className="text-3xl font-bold">{stats.totalItems}</p>
            </div>
            <div>
              <p className="text-sm font-semibold opacity-80">Donations</p>
              <p className="text-3xl font-bold">{stats.itemsDonated}</p>
            </div>
            <div>
              <p className="text-sm font-semibold opacity-80">This Month</p>
              <p className="text-3xl font-bold">{stats.monthlyDonations}</p>
            </div>
            <div>
              <p className="text-sm font-semibold opacity-80">Waste Saved</p>
              <p className="text-3xl font-bold">{stats.estimatedWasteSaved || '0'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
