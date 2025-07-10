import React, { ReactNode } from 'react';
import { Package, Map, TrendingUp, BarChart3, RouteIcon } from 'lucide-react';
import logo from '../assets/logo.jpg';

interface LayoutProps {
  children: ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  const tabs = [
    { id: 'map', label: 'Store Map', icon: Map },
    { id: 'forecast', label: 'AI Forecasting', icon: TrendingUp },
    { id: 'transfers', label: 'Redistributions', icon: Package },
    { id: 'dashboard', label: 'Impact Dashboard', icon: BarChart3 },
    { id: 'Routing Engine', label: 'Routing Engine', icon: RouteIcon }
  ];

  return (
    <div className="min-h-screen bg-gray-100 text-white">
      <header className="bg-white border-b border-gray-700">
        <div className="max-w-9xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-1">
              <img src={logo} alt="Logo" className="w-6 h-6 object-cover" />
              <h1 className="px-2 py-1 text-lg font-bold text-black">
                SIRN
              </h1>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Live Data</span>
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-[#043980] border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'border-white text-white'
                      : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;