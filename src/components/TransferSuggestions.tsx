import React, { useState, useMemo } from 'react';
import { ArrowRight, Clock, DollarSign, MapPin, CheckCircle, XCircle, AlertCircle, Download, Edit3, Save, X } from 'lucide-react';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { transferSuggestions, stores } from '../data/mockData';
import { useNotifications } from '../contexts/NotificationContext';
import { sendApprovalEmail, sendRejectionEmail, sendEditEmail, SuggestionData } from '../data/emailApi';
import { useAuth } from '../contexts/AuthContext';

const additionalProducts = [
  'Sony Noise Cancelling Headphones',
  'Fitbit Charge 6',
  'GoPro Hero 12',
  'Apple Watch Series 9',
  'Canon EOS R6 Camera',
];

const SURPLUS_THRESHOLD = 40;
const SHORTAGE_THRESHOLD = 30;
const CO2_PER_KM = 0.02; // kg CO₂/km

const calculateCostEffectiveness = (savings: number, fuelCost: number, co2Impact: number) => {
  const totalCost = fuelCost + co2Impact;
  return savings - totalCost;
};


const isValidTransfer = (suggestion: any) => {
  const surplusValid = suggestion.surplus > SURPLUS_THRESHOLD;
  const shortageValid = suggestion.shortage > SHORTAGE_THRESHOLD;
  const valueOfAvoidedLoss = suggestion.estimatedSavings ?? (Math.min(suggestion.surplus, suggestion.shortage) * 2);
  const environmentalCost = suggestion.fuelCost + suggestion.co2Impact;
  const cpiFavorable = suggestion.cpiFactor <= 1.0;
  return surplusValid && shortageValid && valueOfAvoidedLoss > environmentalCost && cpiFavorable;
};




const TransferSuggestions: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'critical' | 'high' | 'medium' | 'low'>('all');
  const [search, setSearch] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [approvedTransfers, setApprovedTransfers] = useState<string[]>([]);
  const [rejectedTransfers, setRejectedTransfers] = useState<string[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<{
    fromStoreId: string;
    toStoreId: string;
    quantity: number;
    reason: string;
  }>({
    fromStoreId: '',
    toStoreId: '',
    quantity: 0,
    reason: ''
  });
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const { addNotification } = useNotifications();
  const { user } = useAuth();

  const getStoreName = (storeId: string) => stores.find(store => store.id === storeId)?.name || 'Unknown Store';

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'bg-red-500/80 text-white border-2 border-red-700';
      case 'high': return 'bg-orange-500/80 text-white border-2 border-orange-700';
      case 'medium': return 'bg-yellow-400/80 text-white border-2 border-yellow-700';
      case 'low': return 'bg-blue-500/80 text-white border-2 border-blue-700';
      default: return 'bg-gray-500/80 text-white border-2 border-gray-700';
    }
  };

  const getUrgencyIcon = (urgency: string) => urgency === 'critical' ? <AlertCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />;

  const handleApprove = async (id: string) => {
    // Check if this suggestion is currently being edited
    if (editingId === id) {
      addNotification({
        type: 'reject',
        message: 'Please save or cancel your edits before approving this suggestion.'
      });
      return;
    }

    setApprovedTransfers([...approvedTransfers, id]);
    setRejectedTransfers(rejectedTransfers.filter(r => r !== id));
    
    // Find the suggestion to get store names
    const suggestion = suggestions.find(s => s.id === id);
    if (suggestion) {
      const fromStore = getStoreName(suggestion.fromStoreId);
      const toStore = getStoreName(suggestion.toStoreId);
      
      // Add notification
      addNotification({
        type: 'approve',
        message: `Distribution from ${fromStore} to ${toStore} has been approved.`
      });

      // Send email notification (silent - no notification bell message)
      try {
        const suggestionData: SuggestionData = {
          id: suggestion.id,
          fromStoreId: suggestion.fromStoreId,
          toStoreId: suggestion.toStoreId,
          productName: suggestion.productName,
          quantity: suggestion.quantity,
          reason: suggestion.reason,
          estimatedSavings: suggestion.estimatedSavings,
          fromStore,
          toStore
        };

        await sendApprovalEmail(suggestionData, user?.username || 'Unknown User');
      } catch (error) {
        console.error('Error sending approval email:', error);
      }
    }
  };

  const handleReject = async (id: string) => {
    // Check if this suggestion is currently being edited
    if (editingId === id) {
      addNotification({
        type: 'reject',
        message: 'Please save or cancel your edits before rejecting this suggestion.'
      });
      return;
    }

    setRejectedTransfers([...rejectedTransfers, id]);
    setApprovedTransfers(approvedTransfers.filter(a => a !== id));
    
    // Find the suggestion to get store names
    const suggestion = suggestions.find(s => s.id === id);
    if (suggestion) {
      const fromStore = getStoreName(suggestion.fromStoreId);
      const toStore = getStoreName(suggestion.toStoreId);
      
      // Add notification
      addNotification({
        type: 'reject',
        message: `Distribution from ${fromStore} to ${toStore} has been rejected.`
      });

      // Send email notification (silent - no notification bell message)
      try {
        const suggestionData: SuggestionData = {
          id: suggestion.id,
          fromStoreId: suggestion.fromStoreId,
          toStoreId: suggestion.toStoreId,
          productName: suggestion.productName,
          quantity: suggestion.quantity,
          reason: suggestion.reason,
          estimatedSavings: suggestion.estimatedSavings,
          fromStore,
          toStore
        };

        await sendRejectionEmail(suggestionData, user?.username || 'Unknown User');
      } catch (error) {
        console.error('Error sending rejection email:', error);
      }
    }
  };

  const handleEdit = (suggestion: any) => {
    setEditingId(suggestion.id);
    setEditForm({
      fromStoreId: suggestion.fromStoreId,
      toStoreId: suggestion.toStoreId,
      quantity: suggestion.quantity,
      reason: suggestion.reason
    });
  };

  const handleSaveEdit = async (suggestion: any) => {
    // Validate source and destination stores
    if (editForm.fromStoreId === editForm.toStoreId) {
      addNotification({
        type: 'reject',
        message: 'Source and destination stores cannot be the same'
      });
      return;
    }
    
    // Validate quantity
    if (editForm.quantity <= 0) {
      addNotification({
        type: 'reject',
        message: 'Quantity must be greater than 0'
      });
      return;
    }
    
    if (editForm.quantity > suggestion.surplus) {
      addNotification({
        type: 'reject',
        message: `Quantity cannot exceed available surplus (${suggestion.surplus} units)`
      });
      return;
    }

    // Update the suggestion with new values
    const updatedSuggestion = {
      ...suggestion,
      fromStoreId: editForm.fromStoreId,
      toStoreId: editForm.toStoreId,
      quantity: editForm.quantity,
      reason: editForm.reason,
      // Recalculate distance and costs based on new source and destination
      distance: calculateDistance(editForm.fromStoreId, editForm.toStoreId),
      fuelCost: calculateFuelCost(editForm.toStoreId),
      co2Impact: calculateDistance(editForm.fromStoreId, editForm.toStoreId) * CO2_PER_KM,
      estimatedSavings: Math.min(suggestion.surplus, editForm.quantity) * 2,
      // Recalculate derived values
      costEffectivenessScore: calculateCostEffectiveness(
        Math.min(suggestion.surplus, editForm.quantity) * 2,
        calculateFuelCost(editForm.toStoreId),
        calculateDistance(editForm.fromStoreId, editForm.toStoreId) * CO2_PER_KM
      ),
      urgency: suggestion.shortage > 150 ? 'critical' : suggestion.shortage > 100 ? 'high' : suggestion.shortage > 50 ? 'medium' : 'low'
    };

    console.log('Saving edit for suggestion:', suggestion.id);
    console.log('Updated values:', {
      fromStoreId: editForm.fromStoreId,
      toStoreId: editForm.toStoreId,
      quantity: editForm.quantity,
      reason: editForm.reason
    });

    // Update the suggestions array (in a real app, this would be an API call)
    setSuggestions(prevSuggestions => {
      const newSuggestions = prevSuggestions.map(s => s.id === suggestion.id ? updatedSuggestion : s);
      console.log('Suggestions updated, new count:', newSuggestions.length);
      return [...newSuggestions]; // Force new array reference
    });

    // Add notification for successful edit
    const fromStore = getStoreName(editForm.fromStoreId);
    const toStore = getStoreName(editForm.toStoreId);
    addNotification({
      type: 'info',
      message: `Transfer details updated: ${fromStore} to ${toStore}`
    });

    // Send email notification (silent - no notification bell message)
    try {
      const suggestionData: SuggestionData = {
        id: suggestion.id,
        fromStoreId: editForm.fromStoreId,
        toStoreId: editForm.toStoreId,
        productName: suggestion.productName,
        quantity: editForm.quantity,
        reason: editForm.reason,
        estimatedSavings: Math.min(suggestion.surplus, editForm.quantity) * 2,
        fromStore,
        toStore
      };

      await sendEditEmail(suggestionData, user?.username || 'Unknown User');
    } catch (error) {
      console.error('Error sending edit email:', error);
    }

    setEditingId(null);
    setEditForm({ fromStoreId: '', toStoreId: '', quantity: 0, reason: '' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({ fromStoreId: '', toStoreId: '', quantity: 0, reason: '' });
  };

  const calculateDistance = (fromStoreId: string, toStoreId: string) => {
    const fromStore = stores.find(s => s.id === fromStoreId);
    const toStore = stores.find(s => s.id === toStoreId);
    
    if (!fromStore || !toStore) return 0;
    
    // Simple distance calculation (in a real app, you'd use a proper distance API)
    const latDiff = Math.abs(fromStore.lat - toStore.lat);
    const lngDiff = Math.abs(fromStore.lng - toStore.lng);
    return Math.sqrt(latDiff * latDiff + lngDiff * lngDiff) * 69; // Rough conversion to miles
  };

  const calculateFuelCost = (storeId: string) => {
    const store = stores.find(s => s.id === storeId);
    return store ? store.cpiIndex * 0.03 : 0.03; // Base fuel cost calculation
  };

  const handleSearch = () => {
    setSearch(searchTerm);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const exportCSV = () => {
    const headers = ['ID', 'From', 'To', 'Product', 'Quantity', 'Distance', 'Savings', 'Urgency'];
    const rows = filteredSuggestions.map(s => [s.id, getStoreName(s.fromStoreId), getStoreName(s.toStoreId), s.productName, s.quantity, s.distance, s.estimatedSavings, s.urgency].join(','));
    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transfer_suggestions.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const enrichedSuggestions = useMemo(() => transferSuggestions
  .map(s => {
    const estimatedSavings = s.estimatedSavings ?? Math.min(s.surplus, s.shortage) * 2;
    const quantity = Math.min(s.surplus, s.shortage);
    const fuelCost = s.fuelCost ?? (s.cpiFactor * 0.03); // fallback
    const co2Impact = s.co2Impact ?? (s.distance * CO2_PER_KM); // fallback

    return {
      ...s,
      estimatedSavings,
      quantity,
      urgency: s.shortage > 150 ? 'critical' : s.shortage > 100 ? 'high' : s.shortage > 50 ? 'medium' : 'low',
      costEffectivenessScore: calculateCostEffectiveness(estimatedSavings, fuelCost, co2Impact),
      fuelCost,
      co2Impact,
    };
  })
  .filter(s => isValidTransfer(s)), [transferSuggestions]);

  const additionalSuggestions = useMemo(() => 
    additionalProducts.map((product, index) => {
      const distance = parseFloat((Math.random() * 50).toFixed(1));
      const cpiFactor = 0.95;
      const fuelCost = cpiFactor * 0.03;
      const co2Impact = distance * CO2_PER_KM;
      const estimatedSavings = Math.floor(Math.random() * 500) + 50;

      return {
        id: `new-${index}`,
        fromStoreId: stores[0]?.id || '',
        toStoreId: stores[1]?.id || '',
        productName: product,
        quantity: Math.floor(Math.random() * 20) + 1,
        distance,
        estimatedSavings,
        urgency: ['critical', 'high', 'medium', 'low'][index % 4],
        confidence: Math.random(),
        reason: 'System generated suggestion',
        sku: `SKU-${index + 1000}`,
        surplus: 100,
        shortage: 150,
        cpiFactor,
        cpiIndex: cpiFactor, // added to maintain consistency
        fuelCost,
        co2Impact,
        costEffectivenessScore: calculateCostEffectiveness(estimatedSavings, fuelCost, co2Impact),
      };
    }).filter(s => isValidTransfer(s)), []
  );

  const allSuggestions = useMemo(() => [
    ...enrichedSuggestions,
    ...additionalSuggestions
  ], [enrichedSuggestions, additionalSuggestions]);

  // Initialize suggestions state
  React.useEffect(() => {
    setSuggestions(allSuggestions);
  }, [allSuggestions]);

  const filteredSuggestions = useMemo(() => suggestions.filter(s => {
    const matchesFilter = filter === 'all' || s.urgency === filter;
    const matchesSearch = s.productName.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch && s.costEffectivenessScore > 0;
  }), [suggestions, filter, search]);

  const urgencyStats = useMemo(() => suggestions.reduce((acc, s) => {
    acc[s.urgency] = (acc[s.urgency] || 0) + 1;
    return acc;
  }, {} as Record<string, number>), [suggestions]);

  const totalSavings = useMemo(() => filteredSuggestions.reduce((sum, s) => sum + s.estimatedSavings, 0), [filteredSuggestions]);
  const averageDistance = useMemo(() => filteredSuggestions.reduce((sum, s) => sum + s.distance, 0) / (filteredSuggestions.length || 1), [filteredSuggestions]);
  const pendingSuggestions = useMemo(() => filteredSuggestions.filter(s => !approvedTransfers.includes(s.id) && !rejectedTransfers.includes(s.id)), [filteredSuggestions, approvedTransfers, rejectedTransfers]);

  return (
    <div className="space-y-6 font-inter">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-black">Smart Redistribution</h2>
          <p className="text-gray-500">AI-optimized inventory transfer recommendations</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search product..."
              className="bg-gray-100 border-2 border-gray-700 text-black px-4 py-2 pr-10 rounded-full focus:ring-2 focus:ring-[#043980]"
            />
            <button
              onClick={handleSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-[#043980] transition-colors"
            >
              <FaMagnifyingGlass className="w-4 h-4" />
            </button>
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-full focus:ring-2 focus:ring-[#043980]"
          >
            <option value="all" className="hover:bg-[#043980]/80">All Suggestions</option>
            <option value="critical">Critical ({urgencyStats['critical'] || 0})</option>
            <option value="high">High ({urgencyStats['high'] || 0})</option>
            <option value="medium">Medium ({urgencyStats['medium'] || 0})</option>
            <option value="low">Low ({urgencyStats['low'] || 0})</option>
          </select>
          <button
            onClick={exportCSV}
            className="flex items-center space-x-2 border-2 border-black bg-gray-100 px-4 py-2 rounded-full text-black hover:bg-[#043980] hover:text-gray-100 transition ease-in-out duration-300"
          >
            <Download className="w-4 h-4" />
            <span>Download CSV</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#043980] rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100/80 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-700" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">${totalSavings.toLocaleString()}</p>
              <p className="text-sm text-gray-300">Potential Savings</p>
            </div>
          </div>
        </div>

        <div className="bg-[#043980] rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100/80 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-blue-700" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{averageDistance.toFixed(1)} mi</p>
              <p className="text-sm text-gray-300">Avg Distance</p>
            </div>
          </div>
        </div>

        <div className="bg-[#043980] rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100/80 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-purple-700" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{approvedTransfers.length}</p>
              <p className="text-sm text-gray-300">Approved</p>
            </div>
          </div>
        </div>

        <div className="bg-[#043980] rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-200/80 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-red-700" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{pendingSuggestions.length}</p>
              <p className="text-sm text-gray-300">Pending Review</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filteredSuggestions.map((suggestion) => {
          const isApproved = approvedTransfers.includes(suggestion.id);
          const isRejected = rejectedTransfers.includes(suggestion.id);
          const isPending = !isApproved && !isRejected;
          const isEditing = editingId === suggestion.id;

          return (
            <div
              key={suggestion.id}
              className={`bg-[#043980] rounded-xl p-6 border transition-all duration-200 ${
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
                    <span className="text-sm text-gray-300">
                      Confidence: {(suggestion.confidence * 100).toFixed(0)}%
                    </span>
                                         {(isApproved || isRejected) && (
                       <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                         isApproved ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                       }`}>
                         {isApproved ? 'Approved' : 'Rejected'}
                       </span>
                     )}
                     {isEditing && (
                       <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-600 text-white">
                         Editing
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

                  <div className="bg-gray-100/80 rounded-lg p-3">
                    <h4 className="font-medium text-black mb-1">{suggestion.productName}</h4>
                    
                                         {isEditing ? (
                       <div className="space-y-3">
                         <div>
                           <label className="block text-sm font-medium text-gray-800 mb-1">Source Store</label>
                           <select
                             value={editForm.fromStoreId}
                             onChange={(e) => setEditForm({...editForm, fromStoreId: e.target.value})}
                             className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#043980] focus:border-transparent bg-white text-gray-900 ${
                               editForm.fromStoreId === editForm.toStoreId && editForm.fromStoreId !== '' 
                                 ? 'border-red-500' 
                                 : 'border-gray-300'
                             }`}
                           >
                             <option value="">Select source store</option>
                             {stores.map(store => (
                               <option key={store.id} value={store.id} disabled={store.id === editForm.toStoreId}>
                                 {store.name} {store.id === editForm.toStoreId ? '(Same as destination)' : ''}
                               </option>
                             ))}
                           </select>
                           {editForm.fromStoreId === editForm.toStoreId && editForm.fromStoreId !== '' && (
                             <p className="text-xs text-red-600 mt-1">Source and destination cannot be the same</p>
                           )}
                         </div>
                         
                         <div>
                           <label className="block text-sm font-medium text-gray-800 mb-1">Destination Store</label>
                           <select
                             value={editForm.toStoreId}
                             onChange={(e) => setEditForm({...editForm, toStoreId: e.target.value})}
                             className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#043980] focus:border-transparent bg-white text-gray-900 ${
                               editForm.fromStoreId === editForm.toStoreId && editForm.toStoreId !== '' 
                                 ? 'border-red-500' 
                                 : 'border-gray-300'
                             }`}
                           >
                             <option value="">Select destination store</option>
                             {stores.map(store => (
                               <option key={store.id} value={store.id} disabled={store.id === editForm.fromStoreId}>
                                 {store.name} {store.id === editForm.fromStoreId ? '(Same as source)' : ''}
                               </option>
                             ))}
                           </select>
                           {editForm.fromStoreId === editForm.toStoreId && editForm.toStoreId !== '' && (
                             <p className="text-xs text-red-600 mt-1">Source and destination cannot be the same</p>
                           )}
                         </div>
                         
                         <div>
                           <label className="block text-sm font-medium text-gray-800 mb-1">Quantity</label>
                           <input
                             type="number"
                             value={editForm.quantity}
                             onChange={(e) => setEditForm({...editForm, quantity: parseInt(e.target.value) || 0})}
                             min="1"
                             max={suggestion.surplus}
                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#043980] focus:border-transparent bg-white text-gray-900"
                           />
                           <p className="text-xs text-gray-600 mt-1">Max available: {suggestion.surplus} units</p>
                         </div>
                         
                         <div>
                           <label className="block text-sm font-medium text-gray-800 mb-1">Reason</label>
                           <textarea
                             value={editForm.reason}
                             onChange={(e) => setEditForm({...editForm, reason: e.target.value})}
                             rows={2}
                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#043980] focus:border-transparent bg-white text-gray-900"
                             placeholder="Enter reason for transfer..."
                           />
                         </div>
                         
                         {/* Real-time preview of updated metrics */}
                         <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                           <h5 className="text-sm font-medium text-blue-800 mb-2">Updated Metrics Preview:</h5>
                           <div className="grid grid-cols-2 gap-2 text-xs">
                             <div>
                               <span className="text-blue-700">New Distance:</span>
                               <span className="text-blue-900 font-semibold ml-1">
                                 {calculateDistance(editForm.fromStoreId, editForm.toStoreId).toFixed(1)} mi
                               </span>
                             </div>
                             <div>
                               <span className="text-blue-700">New Savings:</span>
                               <span className="text-green-700 font-semibold ml-1">
                                 ${Math.min(suggestion.surplus, editForm.quantity) * 2}
                               </span>
                             </div>
                             <div>
                               <span className="text-blue-700">Fuel Cost:</span>
                               <span className="text-blue-900 font-semibold ml-1">
                                 ${calculateFuelCost(editForm.toStoreId).toFixed(2)}
                               </span>
                             </div>
                             <div>
                               <span className="text-blue-700">CO₂ Impact:</span>
                               <span className="text-blue-900 font-semibold ml-1">
                                 {(calculateDistance(editForm.fromStoreId, editForm.toStoreId) * CO2_PER_KM).toFixed(2)} kg
                               </span>
                             </div>
                           </div>
                         </div>
                       </div>
                    ) : (
                      <>
                        <p className="text-sm text-gray-500 mb-2">{suggestion.reason}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                          <div>
                            <span className="text-gray-700">Quantity:</span>
                            <span className="text-black font-semibold ml-1">{suggestion.quantity} units</span>
                          </div>
                          <div>
                            <span className="text-gray-700">Distance:</span>
                            <span className="text-black font-semibold ml-1">{suggestion.distance} mi</span>
                          </div>
                          <div>
                            <span className="text-gray-700">Savings:</span>
                            <span className="text-green-700 font-semibold ml-1">${suggestion.estimatedSavings.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-gray-700">SKU:</span>
                            <span className="text-black font-semibold ml-1">{suggestion.sku}</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mt-2">
                          <div>
                            <span className="text-gray-700">Fuel Cost:</span>
                            <span className="text-black font-semibold ml-1">${suggestion.fuelCost.toFixed(2)}</span>
                          </div>
                          <div>
                            <span className="text-gray-700">CO₂ Impact:</span>
                            <span className="text-black font-semibold ml-1">{suggestion.co2Impact.toFixed(2)} kg</span>
                          </div>
                          <div>
                            <span className="text-gray-700">CPI Index:</span>
                            <span className="text-black font-semibold ml-1">{suggestion.cpiIndex}</span>
                          </div>
                          <div>
                            <span className="text-gray-700">Effectiveness:</span>
                            <span className={`font-semibold ml-1 ${suggestion.costEffectivenessScore > 0 ? 'text-green-700' : 'text-red-700'}`}>
                              ${suggestion.costEffectivenessScore.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-bottom space-x-3">
                  {isEditing ? (
                    <>
                      <button
                        onClick={() => handleSaveEdit(suggestion)}
                        className="flex items-center space-x-2 bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-full transition-colors"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save</span>
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-full transition-colors"
                      >
                        <X className="w-4 h-4" />
                        <span>Cancel</span>
                      </button>
                    </>
                  ) : (
                    <>
                      {isPending && (
                        <>
                          <button
                            onClick={() => handleEdit(suggestion)}
                            className="flex items-center space-x-2 bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleApprove(suggestion.id)}
                            disabled={isEditing}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
                              isEditing 
                                ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                                : 'bg-green-700 hover:bg-green-600 text-white'
                            }`}
                            title={isEditing ? 'Save or cancel edits first' : 'Approve this suggestion'}
                          >
                            <CheckCircle className="w-4 h-4" />
                            <span>Approve</span>
                          </button>
                          <button
                            onClick={() => handleReject(suggestion.id)}
                            disabled={isEditing}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
                              isEditing 
                                ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                                : 'bg-red-700 hover:bg-red-600 text-white'
                            }`}
                            title={isEditing ? 'Save or cancel edits first' : 'Reject this suggestion'}
                          >
                            <XCircle className="w-4 h-4" />
                            <span>Reject</span>
                          </button>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredSuggestions.length === 0 && (
        <div className="text-center py-12">
          <Clock className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">No transfers found</h3>
          <p className="text-gray-400">Try adjusting your filter or search</p>
        </div>
      )}
    </div>
  );
};

export default TransferSuggestions;
