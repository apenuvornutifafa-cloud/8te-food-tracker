import { useEffect, useState } from 'react';
import { useDonationStore } from '../store/foodStore';
import { useFoodStore } from '../store/foodStore';
import { Heart, MapPin, Phone, Clock } from 'lucide-react';

export default function Donations() {
  const { donations, charities, fetchCharitiesNearby, fetchDonations, createDonation } = useDonationStore();
  const { foods } = useFoodStore();
  const [selectedFood, setSelectedFood] = useState(null);
  const [selectedCharity, setSelectedCharity] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDonations();
    
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        fetchCharitiesNearby(position.coords.latitude, position.coords.longitude);
      });
    }
  }, []);

  const handleDonate = async () => {
    if (!selectedFood || !selectedCharity) {
      alert('Please select both food and charity');
      return;
    }

    setLoading(true);
    try {
      await createDonation(selectedFood._id, selectedCharity._id, selectedFood.quantity);
      alert('Donation created successfully!');
      setSelectedFood(null);
      setSelectedCharity(null);
      fetchDonations();
    } catch (err) {
      alert('Failed to create donation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold text-8te-dark flex items-center gap-2">
        <Heart size={36} className="text-8te-yellow" />
        Donation Finder
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Food Selection */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-8te-dark mb-4">Select Food to Donate</h2>
          
          {foods.length === 0 ? (
            <p className="text-gray-600">No food items available. Add items first!</p>
          ) : (
            <div className="space-y-2">
              {foods.filter(f => f.status !== 'donated').map(food => (
                <button
                  key={food._id}
                  onClick={() => setSelectedFood(food)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                    selectedFood?._id === food._id
                      ? 'border-8te-yellow bg-yellow-50'
                      : 'border-gray-200 hover:border-8te-yellow'
                  }`}
                >
                  <p className="font-bold text-8te-dark">{food.name}</p>
                  <p className="text-sm text-gray-600">{food.quantity} {food.unit}</p>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Charity Selection */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-8te-dark mb-4">Nearby Charities</h2>
          
          {charities.length === 0 ? (
            <p className="text-gray-600">No charities found in your area.</p>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {charities.map(charity => (
                <button
                  key={charity._id}
                  onClick={() => setSelectedCharity(charity)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                    selectedCharity?._id === charity._id
                      ? 'border-8te-yellow bg-yellow-50'
                      : 'border-gray-200 hover:border-8te-yellow'
                  }`}
                >
                  <p className="font-bold text-8te-dark">{charity.name}</p>
                  <p className="text-xs text-gray-600 flex items-center gap-1 mt-1">
                    <MapPin size={14} /> {charity.address}
                  </p>
                  <p className="text-xs text-gray-600 flex items-center gap-1">
                    <Phone size={14} /> {charity.phone}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedFood && selectedCharity && (
        <div className="bg-gradient-to-r from-8te-yellow to-yellow-300 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-8te-dark mb-4">Confirm Donation</h3>
          <p className="text-8te-dark mb-4">
            Donate <strong>{selectedFood.quantity} {selectedFood.unit}</strong> of <strong>{selectedFood.name}</strong> to <strong>{selectedCharity.name}</strong>
          </p>
          <button
            onClick={handleDonate}
            disabled={loading}
            className="btn-primary"
          >
            {loading ? 'Processing...' : 'Confirm Donation'}
          </button>
        </div>
      )}

      {/* Donation History */}
      {donations.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-8te-dark mb-4">Donation History</h2>
          <div className="space-y-3">
            {donations.map(donation => (
              <div key={donation._id} className="p-4 border-l-4 border-green-500 bg-green-50 rounded">
                <p className="font-bold text-8te-dark">{donation.quantity} items donated</p>
                <p className="text-sm text-gray-600">to {donation.charityId?.name}</p>
                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                  <Clock size={12} /> {new Date(donation.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
