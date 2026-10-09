import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import './styles/global.css';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AppLayout from './components/AppLayout';
import Dashboard from './pages/Dashboard';
import Marketplace from './pages/Marketplace';
import MaterialDetail from './pages/MaterialDetail';
import AddMaterial from './pages/AddMaterial';
import MaterialRequests from './pages/MaterialRequests';
import Exchanges from './pages/Exchanges';
import ImpactPage from './pages/ImpactPage';
import ProfilePage from './pages/ProfilePage';
import HistoryPage from './pages/HistoryPage';

function ProtectedRoute({ children }) {
  const { currentUser } = useApp();
  if (!currentUser) return <Navigate to="/login" replace />;
  return children;
}

function AppRoutes() {
  const { currentUser } = useApp();
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={currentUser ? <Navigate to="/dashboard" /> : <LoginPage />} />
      <Route path="/register" element={currentUser ? <Navigate to="/dashboard" /> : <RegisterPage />} />

      {/* Protected app routes with sidebar */}
      <Route path="/" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="marketplace" element={<Marketplace />} />
        <Route path="material/:id" element={<MaterialDetail />} />
        <Route path="add-material" element={<AddMaterial />} />
        <Route path="material-requests" element={<MaterialRequests />} />
        <Route path="exchanges" element={<Exchanges />} />
        <Route path="impact" element={<ImpactPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="history" element={<HistoryPage />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProvider>
  );
}
