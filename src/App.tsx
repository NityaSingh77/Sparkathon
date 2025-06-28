import { useState } from 'react';
import Layout from './components/Layout';
import StoreMap from './components/StoreMap';
import AIForecasting from './components/AIForecasting';
import TransferSuggestions from './components/TransferSuggestions';
import ImpactDashboard from './components/ImpactDashboard';
import MobileView from './components/MobileView';

function App() {
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
      case 'mobile':
        return <MobileView />;
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

export default App;