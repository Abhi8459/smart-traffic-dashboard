import React, { useState } from 'react';
import { MapPin, Navigation, Zap, AlertTriangle, CheckCircle } from 'lucide-react';

const LiveTrafficMap = () => {
  const [selectedIntersection, setSelectedIntersection] = useState(null);

  const intersections = [
    { id: 1, name: 'Main St & 5th Ave', x: 30, y: 40, status: 'optimal', waitTime: 25, vehicles: 12 },
    { id: 2, name: 'Park Ave & 3rd St', x: 60, y: 30, status: 'heavy', waitTime: 45, vehicles: 28 },
    { id: 3, name: 'Broadway & 1st St', x: 45, y: 60, status: 'moderate', waitTime: 32, vehicles: 18 },
    { id: 4, name: 'Oak St & 7th Ave', x: 75, y: 50, status: 'congested', waitTime: 65, vehicles: 35 },
    { id: 5, name: 'Pine St & 2nd Ave', x: 20, y: 70, status: 'optimal', waitTime: 18, vehicles: 8 },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'optimal': return 'bg-green-500';
      case 'moderate': return 'bg-yellow-500';
      case 'heavy': return 'bg-orange-500';
      case 'congested': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'optimal': return <CheckCircle className="w-4 h-4" />;
      case 'moderate': return <Zap className="w-4 h-4" />;
      case 'heavy': return <AlertTriangle className="w-4 h-4" />;
      case 'congested': return <AlertTriangle className="w-4 h-4" />;
      default: return <MapPin className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">Live Traffic Map</h2>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-300">Optimal</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-gray-300">Moderate</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span className="text-gray-300">Heavy</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-gray-300">Congested</span>
          </div>
        </div>\n      </div>

      <div className="relative bg-gray-900 rounded-lg h-96 overflow-hidden">
        {/* Simulated street grid */}
        <div className="absolute inset-0">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {/* Horizontal streets */}
            <line x1="0" y1="25" x2="100" y2="25" stroke="#4b5563" strokeWidth="0.5" />
            <line x1="0" y1="40" x2="100" y2="40" stroke="#4b5563" strokeWidth="0.8" />
            <line x1="0" y1="55" x2="100" y2="55" stroke="#4b5563" strokeWidth="0.5" />
            <line x1="0" y1="70" x2="100" y2="70" stroke="#4b5563" strokeWidth="0.5" />
            
            {/* Vertical streets */}
            <line x1="20" y1="0" x2="20" y2="100" stroke="#4b5563" strokeWidth="0.5" />
            <line x1="35" y1="0" x2="35" y2="100" stroke="#4b5563" strokeWidth="0.5" />
            <line x1="50" y1="0" x2="50" y2="100" stroke="#4b5563" strokeWidth="0.8" />
            <line x1="65" y1="0" x2="65" y2="100" stroke="#4b5563" strokeWidth="0.5" />
            <line x1="80" y1="0" x2="80" y2="100" stroke="#4b5563" strokeWidth="0.5" />
          </svg>
        </div>

        {/* Traffic intersections */}
        {intersections.map((intersection) => (
          <div
            key={intersection.id}
            className={`absolute w-4 h-4 rounded-full cursor-pointer transform -translate-x-2 -translate-y-2 ${getStatusColor(intersection.status)} transition-all duration-300 hover:scale-150`}
            style={{ 
              left: `${intersection.x}%`, 
              top: `${intersection.y}%`
            }}
            onClick={() => setSelectedIntersection(intersection)}
          >
            <div className={`w-full h-full rounded-full ${getStatusColor(intersection.status)} pulse-glow`}></div>
          </div>
        ))}

        {/* Vehicle simulation dots */}
        <div className="absolute top-1/4 left-0 w-2 h-2 bg-blue-400 rounded-full vehicle-animation"></div>
        <div className="absolute top-2/5 left-0 w-2 h-2 bg-blue-400 rounded-full vehicle-animation" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-3/5 left-0 w-2 h-2 bg-blue-400 rounded-full vehicle-animation" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Intersection Details Panel */}
      {selectedIntersection && (
        <div className="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-600">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-medium text-white">{selectedIntersection.name}</h3>
            <button 
              onClick={() => setSelectedIntersection(null)}
              className="text-gray-400 hover:text-white"
            >
              ×
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${getStatusColor(selectedIntersection.status)}`}>
                {getStatusIcon(selectedIntersection.status)}
              </div>
              <p className="text-sm text-gray-400 mt-2">Status</p>
              <p className="text-white font-medium capitalize">{selectedIntersection.status}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{selectedIntersection.waitTime}s</p>
              <p className="text-sm text-gray-400">Avg Wait Time</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{selectedIntersection.vehicles}</p>
              <p className="text-sm text-gray-400">Vehicles</p>
            </div>
          </div>
          <div className="mt-3 flex space-x-2">
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm">
              Optimize Timing
            </button>
            <button className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded text-sm">
              View Camera
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveTrafficMap;