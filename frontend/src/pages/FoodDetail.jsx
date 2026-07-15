import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFoodStore } from '../store/foodStore';
import { Trash2, Edit2, Heart } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function FoodDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { foods, updateFood, deleteFood } = useFoodStore();
  const [food, setFood] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const foundFood = foods.find(f => f._id === id);
    if (foundFood) {
      setFood(foundFood);
      setFormData(foundFood);
    }
  }, [id, foods]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? Number(value) : value
    }));
  };

  const handleSave = async () => {
    try {
      await updateFood(id, formData);
      setFood(formData);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteFood(id);
        navigate('/dashboard');
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (!food) {
    return <div className="p-6">Loading...</div>;
  }

  const daysUntilExpiry = Math.ceil((new Date(food.expiryDate) - new Date()) / (1000 * 60 * 60 * 24));
  
  let freshnessClass = 'status-fresh';
  let freshnessLabel = '✓ Fresh';
  
  if (daysUntilExpiry < 0) {
    freshnessClass = 'status-expired';
    freshnessLabel = 'Expired';
  } else if (daysUntilExpiry <= 7) {
    freshnessClass = 'status-expiring';
    freshnessLabel = 'Expiring Soon';
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-4xl font-bold text-8te-dark">{food.name}</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="btn-secondary"
          >
            <Edit2 size={20} />
          </button>
          <button
            onClick={handleDelete}
            className="btn-secondary bg-red-500 border-red-500"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      {isEditing ? (
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4 mb-6">
          <div>
            <label className="block text-8te-dark font-semibold mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input-primary"
            />
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
              </select>
            </div>
          </div>

          <div>
            <label className="block text-8te-dark font-semibold mb-2">Expiry Date</label>
            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate?.substring(0, 10)}
              onChange={handleChange}
              className="input-primary"
            />
          </div>

          <div className="flex gap-2">
            <button onClick={handleSave} className="btn-primary flex-1">Save Changes</button>
            <button onClick={() => setIsEditing(false)} className="btn-secondary flex-1">Cancel</button>
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4 mb-6">
          <div className={`freshness-indicator ${freshnessClass}`}>
            {freshnessLabel}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600 text-sm">Category</p>
              <p className="text-lg font-semibold text-8te-dark capitalize">{food.category}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Location</p>
              <p className="text-lg font-semibold text-8te-dark capitalize">{food.location}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Quantity</p>
              <p className="text-lg font-semibold text-8te-dark">{food.quantity} {food.unit}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Days Until Expiry</p>
              <p className="text-lg font-semibold text-8te-dark">{Math.max(0, daysUntilExpiry)} days</p>
            </div>
          </div>

          <div>
            <p className="text-gray-600 text-sm">Expiry Date</p>
            <p className="text-lg font-semibold text-8te-dark">
              {new Date(food.expiryDate).toLocaleDateString()}
              <span className="text-sm text-gray-500 ml-2">({formatDistanceToNow(new Date(food.expiryDate), { addSuffix: true })})</span>
            </p>
          </div>

          {food.notes && (
            <div>
              <p className="text-gray-600 text-sm">Notes</p>
              <p className="text-8te-dark">{food.notes}</p>
            </div>
          )}

          <button className="btn-primary w-full flex items-center justify-center gap-2">
            <Heart size={20} />
            Donate This Item
          </button>
        </div>
      )}
    </div>
  );
}
