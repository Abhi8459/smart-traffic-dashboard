import React, { useState } from 'react';
import { Ambulance, Phone, MapPin, Clock } from 'lucide-react';

const EmergencyPanel = ({ onEmergencyActivate }) => {
  const [emergencyVehicles, setEmergencyVehicles] = useState([
    { id: 1, type: 'Ambulance', location: 'Main St & 3rd Ave', eta: '3 min', active: true },
    { id: 2, type: 'Fire Truck', location: 'Oak St & 5th Ave', eta: '7 min', active: false },
  ]);

  const activateEmergencyRoute = (vehicleId) => {
    setEmergencyVehicles(prev => 
      prev.map(vehicle => 
        vehicle.id === vehicleId ? { ...vehicle, active: true } : vehicle
      )
    );
    onEmergencyActivate();
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
      <h3 className="text-lg font-semibold text-white flex items-center mb-4">
        <Ambulance className="w-5 h-5 mr-2 text-red-400" />
        Emergency Response
      </h3>

      <div className="space-y-3">
        {emergencyVehicles.map((vehicle) => (
          <div key={vehicle.id} className={`p-4 rounded-lg border ${
            vehicle.active ? 'bg-red-900/20 border-red-600' : 'bg-gray-900/30 border-gray-600'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <Ambulance className="w-5 h-5 text-red-400" />
                <div>
                  <p className="font-medium text-white">{vehicle.type}</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <MapPin className="w-3 h-3" />
                    <span>{vehicle.location}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-1 text-sm">
                  <Clock className="w-3 h-3" />
                  <span className="text-white font-medium">{vehicle.eta}</span>
                </div>
              </div>
            </div>
            
            {!vehicle.active && (
              <button 
                onClick={() => activateEmergencyRoute(vehicle.id)}
                className="w-full mt-2 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded text-sm"
              >
                Activate Priority Route
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmergencyPanel;