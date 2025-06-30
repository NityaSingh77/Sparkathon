import React, { useState } from 'react';
import { ArrowRight, Clock, DollarSign, MapPin, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { transferSuggestions, stores } from '../data/mockData';

const TransferSuggestions: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'critical' | 'high' | 'medium' | 'low'>('all');
  const [approvedTransfers, setApprovedTransfers] = useState<string[]>([]);
  const [rejectedTransfers, setRejectedTransfers] = useState<string[]>([]);

  const getStoreName = (storeId: string) => {
    return stores.find(store => store.id === storeId)?.name || 'Unknown Store';
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'bg-red-600 text-white';
      case 'high': return 'bg-orange-600 text-white';
      case 'medium': return 'bg-yellow-600 text-black';
      case 'low': return 'bg-blue-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'critical': return <AlertCircle className="w-4 h-4" />;
      case 'high': return <Clock className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const handleApprove = (transferId: string) => {
    setApprovedTransfers([...approvedTransfers, transferId]);
    setRejectedTransfers(rejectedTransfers.filter(id => id !== transferId));
  };

  const handleReject = (transferId: string) => {
    setRejectedTransfers([...rejectedTransfers, transferId]);
    setApprovedTransfers(approvedTransfers.filter(id => id !== transferId));
  };

  const filteredSuggestions = transferSuggestions.filter(suggestion => {
    if (filter === 'all') return true;
    return suggestion.urgency === filter;
  });

  const totalSavings = filteredSuggestions.reduce((sum, suggestion) => sum + suggestion.estimatedSavings, 0);
  const averageDistance = filteredSuggestions.reduce((sum, suggestion) => sum + suggestion.distance, 0) / filteredSuggestions.length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Smart Redistribution</h2>
          <p className="text-gray-400">AI-optimized inventory transfer recommendations</p>
        </div>
        <div className="flex items-center space-x-3">
          <label className="text-sm text-gray-400">Filter by urgency:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Suggestions</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">${totalSavings.toLocaleString()}</p>
              <p className="text-sm text-gray-400">Potential Savings</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{averageDistance.toFixed(1)} mi</p>
              <p className="text-sm text-gray-400">Avg Distance</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{approvedTransfers.length}</p>
              <p className="text-sm text-gray-400">Approved</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{filteredSuggestions.length}</p>
              <p className="text-sm text-gray-400">Pending Review</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filteredSuggestions.map((suggestion) => {
          const isApproved = approvedTransfers.includes(suggestion.id);
          const isRejected = rejectedTransfers.includes(suggestion.id);
          const isPending = !isApproved && !isRejected;

          return (
            <div
              key={suggestion.id}
              className={`bg-gray-800 rounded-xl p-6 border transition-all duration-200 ${
                isApproved ? 'border-green-500' :
                isRejected ? 'border-red-500' :
                'border-gray-700 hover:border-gray-600'
              }`}
            >
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getUrgencyColor(suggestion.urgency)}`}>
                      {getUrgencyIcon(suggestion.urgency)}
                      <span className="capitalize">{suggestion.urgency}</span>
                    </span>
                    <span className="text-sm text-gray-400">
                      Confidence: {(suggestion.confidence * 100).toFixed(0)}%
                    </span>
                    {(isApproved || isRejected) && (
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        isApproved ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                      }`}>
                        {isApproved ? 'Approved' : 'Rejected'}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-sm font-medium text-white">{getStoreName(suggestion.fromStoreId)}</p>
                      <p className="text-xs text-gray-400">Source</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-blue-400" />
                    <div className="text-center">
                      <p className="text-sm font-medium text-white">{getStoreName(suggestion.toStoreId)}</p>
                      <p className="text-xs text-gray-400">Destination</p>
                    </div>
                  </div>

                  <div className="bg-gray-700 rounded-lg p-3">
                    <h4 className="font-medium text-white mb-1">{suggestion.productName}</h4>
                    <p className="text-sm text-gray-400 mb-2">{suggestion.reason}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <div>
                        <span className="text-gray-400">Quantity:</span>
                        <span className="text-white font-medium ml-1">{suggestion.quantity} units</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Distance:</span>
                        <span className="text-white font-medium ml-1">{suggestion.distance} mi</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Savings:</span>
                        <span className="text-green-400 font-medium ml-1">${suggestion.estimatedSavings.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">SKU:</span>
                        <span className="text-white font-medium ml-1">{suggestion.sku}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {isPending && (
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleApprove(suggestion.id)}
                      className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Approve</span>
                    </button>
                    <button
                      onClick={() => handleReject(suggestion.id)}
                      className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Reject</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredSuggestions.length === 0 && (
        <div className="text-center py-12">
          <Clock className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">No transfers found</h3>
          <p className="text-gray-400">Try adjusting your filter settings</p>
        </div>
      )}
    </div>
  );
};

export default TransferSuggestions;
