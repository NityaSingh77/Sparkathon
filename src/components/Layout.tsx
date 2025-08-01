import React, { ReactNode, useState } from 'react';
import {
  Package,
  Map,
  TrendingUp,
  BarChart3,
  RouteIcon,
  UserCircle,
  Bell
} from 'lucide-react';
import logo from '../assets/logo.jpg';
import { useNotifications } from '../contexts/NotificationContext';

interface LayoutProps {
  children: ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const { notifications, removeNotification } = useNotifications();

  const tabs = [
    { id: 'map', label: 'Store Map', icon: Map },
    { id: 'forecast', label: 'AI Forecasting', icon: TrendingUp },
    { id: 'transfers', label: 'Redistributions', icon: Package },
    { id: 'dashboard', label: 'Impact Dashboard', icon: BarChart3 },
    { id: 'Routing Engine', label: 'Sustainability Insights', icon: RouteIcon },
    { id: 'surplusRescue', label: 'Surplus Rescue', icon: Package }
  ];

  return (
    <div className="min-h-screen bg-gray-100 text-white">
      {/* HEADER */}
      <header className="bg-white border-b border-gray-200 shadow">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <img src={logo} alt="Logo" className="w-6 h-6 object-cover" />
              <h1 className="text-lg font-bold text-black">SIRN</h1>
            </div>

            {/* Status & Icons */}
            <div className="flex items-center space-x-5 text-sm text-gray-600 relative">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Live Data</span>
              </div>

              {/* Bell Icon */}
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative hover:text-[#043980] transition"
              >
                <Bell className="w-6 h-6" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    {notifications.length}
                  </span>
                )}
              </button>

              {/* User Icon */}
              <button className="hover:text-[#043980] transition" title="Login">
                <UserCircle className="w-6 h-6" />
              </button>

              {/* Notification Modal */}
              {showNotifications && (
                <div className="absolute top-12 right-0 w-80 bg-white shadow-lg rounded-lg z-50 overflow-hidden border border-gray-200">
                  <div className="px-4 py-2 border-b text-black font-semibold">Notifications</div>
                  <ul className="divide-y divide-gray-200 max-h-64 overflow-y-auto text-sm text-black">
                    {notifications.length === 0 ? (
                      <li className="px-4 py-3 text-gray-500">No notifications</li>
                    ) : (
                      notifications.map((note) => (
                        <li key={note.id} className="px-4 py-3 hover:bg-gray-50 flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <span className={`w-2 h-2 rounded-full ${
                                note.type === 'approve' ? 'bg-green-500' :
                                note.type === 'reject' ? 'bg-red-500' :
                                note.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                              }`}></span>
                              <strong className="capitalize">{note.type}:</strong>
                            </div>
                            <p className="text-sm mt-1">{note.message}</p>
                            <p className="text-xs text-gray-400 mt-1">
                              {note.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                          <button
                            onClick={() => removeNotification(note.id)}
                            className="text-gray-400 hover:text-red-500 text-xs ml-2"
                          >
                            ×
                          </button>
                        </li>
                      ))
                    )}
                  </ul>
                  <div className="px-4 py-2 text-right">
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* NAVBAR */}
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

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;
