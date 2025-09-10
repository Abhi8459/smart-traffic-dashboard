import React, { useState } from 'react';
import { Camera, Eye, Car, Truck, Motorcycle, AlertTriangle } from 'lucide-react';

const VehicleDetection = () => {
  const [selectedCamera, setSelectedCamera] = useState('Camera 1');
  
  const detectionData = [
    { type: 'Cars', count: 24, icon: Car, color: 'text-blue-400' },
    { type: 'Trucks', count: 6, icon: Truck, color: 'text-green-400' },
    { type: 'Motorcycles', count: 8, icon: Motorcycle, color: 'text-yellow-400' },
    { type: 'Violations', count: 2, icon: AlertTriangle, color: 'text-red-400' },
  ];

  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <Camera className="w-5 h-5 mr-2 text-blue-400" />
          Real-time Vehicle Detection
        </h3>
        <select 
          className="bg-gray-700 text-white px-3 py-1 rounded border border-gray-600"
          value={selectedCamera}
          onChange={(e) => setSelectedCamera(e.target.value)}
        >
          <option>Camera 1 - Main St</option>
          <option>Camera 2 - Park Ave</option>
          <option>Camera 3 - Broadway</option>
        </select>
      </div>

      {/* Camera Feed Simulation */}
      <div className="bg-gray-900 rounded-lg p-4 mb-4">
        <div className="aspect-video bg-gray-800 rounded border-2 border-gray-600 flex items-center justify-center relative">
          <Eye className="w-12 h-12 text-gray-500" />
          <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs">
            🔴 LIVE
          </div>
          <div className="absolute bottom-2 left-2 text-white text-xs bg-black bg-opacity-50 px-2 py-1 rounded">
            {selectedCamera} - AI Detection Active
          </div>
        </div>
      </div>

      {/* Detection Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {detectionData.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="bg-gray-900 p-3 rounded text-center">
              <Icon className={`w-6 h-6 mx-auto mb-2 ${item.color}`} />
              <p className="text-2xl font-bold text-white">{item.count}</p>
              <p className="text-xs text-gray-400">{item.type}</p>
            </div>
          );
        })}
      </div>

      {/* AI Features */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="bg-gray-900 p-3 rounded">
          <h4 className="text-sm font-medium text-white mb-2">AI Features</h4>
          <ul className="text-xs text-gray-400 space-y-1">
            <li>✓ Real-time object detection</li>
            <li>✓ License plate recognition</li>
            <li>✓ Traffic violation detection</li>
          </ul>
        </div>
        <div className="bg-gray-900 p-3 rounded">
          <h4 className="text-sm font-medium text-white mb-2">Performance</h4>
          <ul className="text-xs text-gray-400 space-y-1">
            <li>Accuracy: 96.8%</li>
            <li>Processing: 30 FPS</li>
            <li>Latency: &lt;50ms</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetection;