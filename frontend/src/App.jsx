import { useEffect, useState } from 'react';
import { useAuthStore } from './store/authStore';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import AddFood from './pages/AddFood';
import FoodDetail from './pages/FoodDetail';
import Donations from './pages/Donations';
import Settings from './pages/Settings';
import Notifications from './pages/Notifications';
import './index.css';

function App() {
  const { isAuthenticated, checkAuth } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen bg-8te-light">
      <div className="text-8te-dark text-2xl">Loading 8te...</div>
    </div>;
  }

  return (
    <Router>
      <Routes>
        {!isAuthenticated ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-food" element={<AddFood />} />
            <Route path="/food/:id" element={<FoodDetail />} />
            <Route path="/donations" element={<Donations />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Route>
        )}
      </Routes>
    </Router>
  );
}

export default App;
