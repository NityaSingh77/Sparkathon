import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import StoreMap from './components/StoreMap';
import AIForecasting from './components/AIForecasting';
import TransferSuggestions from './components/TransferSuggestions';
import ImpactDashboard from './components/ImpactDashboard';
import RoutingEngine from './components/MobileView';
import Home from './components/Home';
import Login from './components/login';
import SurplusRescue from './components/surplusRescue';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('map');

  const renderContent = () => {
    switch (activeTab) {
      case 'map':
        return <StoreMap />;
      case 'forecast':
        return <AIForecasting />;
      case 'transfers':
        return <TransferSuggestions />;
      case 'dashboard':
        return <ImpactDashboard />;
      case 'Routing Engine':
        return <RoutingEngine />;
      case 'surplusRescue':
        return <SurplusRescue />;
      default:
        return <StoreMap />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </Layout>
  );
}

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
