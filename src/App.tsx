import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Layout from './components/Layout';
import StoreMap from './components/StoreMap';
import AIForecasting from './components/AIForecasting';
import TransferSuggestions from './components/TransferSuggestions';
import ImpactDashboard from './components/ImpactDashboard';
import RoutingEngine from './components/MobileView';
import Home from './components/Home';
import Login from './components/login';

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
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
