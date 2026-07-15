import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFoodStore } from '../store/foodStore';
import { Camera, Plus } from 'lucide-react';

export default function AddFood() {
  const [formData, setFormData] = useState({
    name: '',
    category: 'other',
    quantity: 1,
    unit: 'pieces',
    expiryDate: '',
    location: 'fridge',
    notes: ''
  });
  const [error, setError] = useState('');
  const [mode, setMode] = useState('manual');
  const { addFood, loading, scanReceipt } = useFoodStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.expiryDate) {
      setError('Please select an expiry date');
      return;
    }
    try {
      await addFood(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add food item');
    }
  };

  const handleImageUpload = async (e) => {
    try {
      const items = await scanReceipt(e.target.files[0]);
      setMode('manual');
      // You can use these items to populate the form
    } catch (err) {
      setError('Failed to scan receipt');
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold text-8te-dark mb-8">Add Food Item</h1>

      {/* Mode Selection */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setMode('manual')}
          className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
            mode === 'manual'
              ? 'bg-8te-yellow text-8te-dark'
              : 'bg-gray-200 text-gray-600'
          }`}
        >
          <Plus size={20} className="inline mr-2" />
          Manual Entry
        </button>
        <button
          onClick={() => setMode('scan')}
          className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
            mode === 'scan'
              ? 'bg-8te-yellow text-8te-dark'
              : 'bg-gray-200 text-gray-600'
          }`}
        >
          <Camera size={20} className="inline mr-2" />
          Scan Receipt
        </button>
      </div>

      {error && (
        <div className="bg-red-500 text-white p-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {mode === 'manual' ? (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
          <div>
            <label className="block text-8te-dark font-semibold mb-2">Food Name*</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input-primary"
              placeholder="e.g., Bananas, Milk, Chicken"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-8te-dark font-semibold mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="input-primary"
              >
                <option value="fruits">Fruits</option>
                <option value="vegetables">Vegetables</option>
                <option value="dairy">Dairy</option>
                <option value="meat">Meat</option>
                <option value="bakery">Bakery</option>
                <option value="pantry">Pantry</option>
                <option value="frozen">Frozen</option>
                <option value="beverages">Beverages</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-8te-dark font-semibold mb-2">Location</label>
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="input-primary"
              >
                <option value="fridge">Fridge</option>
                <option value="freezer">Freezer</option>
                <option value="pantry">Pantry</option>
                <option value="counter">Counter</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-8te-dark font-semibold mb-2">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="input-primary"
                min="1"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-8te-dark font-semibold mb-2">Unit</label>
              <select
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className="input-primary"
              >
                <option value="pieces">Pieces</option>
                <option value="kg">kg</option>
                <option value="lb">lb</option>
                <option value="liters">Liters</option>
                <option value="ml">ml</option>
                <option value="cups">Cups</option>
                <option value="oz">oz</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-8te-dark font-semibold mb-2">Expiry Date*</label>
            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              className="input-primary"
              required
            />
          </div>

          <div>
            <label className="block text-8te-dark font-semibold mb-2">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="input-primary"
              placeholder="Any notes about this item..."
              rows="3"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full mt-6"
          >
            {loading ? 'Adding...' : 'Add to Pantry'}
          </button>
        </form>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <Camera size={64} className="mx-auto text-8te-yellow mb-4" />
          <p className="text-gray-600 mb-4">
            Upload a receipt photo to automatically detect food items and expiry dates
          </p>
          <label className="btn-primary cursor-pointer inline-block">
            Choose Receipt Image
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>
      )}
    </div>
  );
}
