import React, { useState, useEffect } from 'react';
import { MapPin, Clock, AlertTriangle } from 'lucide-react';

const TrafficSignalVisualizer = () => {
  const [signals, setSignals] = useState([
    { id: 1, intersection: 'Main St & 5th Ave', north: 'green', south: 'green', east: 'red', west: 'red', timer: 45 },
    { id: 2, intersection: 'Broadway & Park Ave', north: 'red', south: 'red', east: 'green', west: 'green', timer: 32 },
    { id: 3, intersection: '1st St & Central Ave', north: 'yellow', south: 'yellow', east: 'red', west: 'red', timer: 5 },
    { id: 4, intersection: 'Highway 101 & Oak St', north: 'red', south: 'red', east: 'yellow', west: 'yellow', timer: 3 },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSignals(prevSignals => 
        prevSignals.map(signal => {
          let newTimer = signal.timer - 1;
          let newSignal = { ...signal };

          if (newTimer <= 0) {
            // Cycle through the lights
            if (signal.north === 'green') {
              newSignal = { ...signal, north: 'yellow', south: 'yellow', timer: 5 };
            } else if (signal.north === 'yellow') {
              newSignal = { ...signal, north: 'red', south: 'red', east: 'green', west: 'green', timer: 35 };
            } else if (signal.east === 'green') {
              newSignal = { ...signal, east: 'yellow', west: 'yellow', timer: 5 };
            } else if (signal.east === 'yellow') {
              newSignal = { ...signal, east: 'red', west: 'red', north: 'green', south: 'green', timer: 45 };
            } else {
              // Default case
              newSignal = { ...signal, north: 'green', south: 'green', east: 'red', west: 'red', timer: 45 };
            }
          } else {
            newSignal.timer = newTimer;
          }

          return newSignal;
        })
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getSignalColor = (state) => {
    switch (state) {
      case 'red': return 'bg-red-500';
      case 'yellow': return 'bg-yellow-500';
      case 'green': return 'bg-green-500';
      default: return 'bg-gray-600';
    }
  };

  const SignalLight = ({ state, direction, timer }) => (
    <div className="flex flex-col items-center space-y-1">
      <div className={`w-6 h-6 rounded-full ${getSignalColor(state)} ${
        state !== 'red' ? 'animate-pulse' : ''
      } shadow-lg`}></div>
      <span className="text-xs text-gray-400 uppercase">{direction}</span>
      {state !== 'red' && (
        <span className="text-xs text-white font-mono">{timer}s</span>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Live Traffic Map Visualization */}
      <div className="bg-gray-900 rounded-lg p-6 min-h-[300px] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
        
        {/* Intersection Grid */}
        <div className="relative z-10 grid grid-cols-2 gap-8 h-full">
          {signals.map((signal, index) => (
            <div key={signal.id} className="relative">
              {/* Intersection Visualization */}
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-600">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-blue-400" />
                    <span className="text-sm font-medium text-white">{signal.intersection}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-gray-400">
                    <Clock className="w-3 h-3" />
                    <span>Live</span>
                  </div>
                </div>
                
                {/* Traffic Light Simulation */}
                <div className="relative bg-gray-700 rounded-lg p-4 min-h-[120px]">
                  {/* Road Layout */}
                  <div className="absolute inset-4 border-2 border-gray-500 rounded">
                    {/* Horizontal Road */}
                    <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-600 transform -translate-y-1/2"></div>
                    {/* Vertical Road */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-2 bg-gray-600 transform -translate-x-1/2"></div>
                  </div>
                  
                  {/* Traffic Lights */}
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
                    <SignalLight state={signal.north} direction="N" timer={signal.timer} />
                  </div>
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
                    <SignalLight state={signal.south} direction="S" timer={signal.timer} />
                  </div>
                  <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
                    <SignalLight state={signal.west} direction="W" timer={signal.timer} />
                  </div>
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <SignalLight state={signal.east} direction="E" timer={signal.timer} />
                  </div>
                  
                  {/* Center Intersection */}
                  <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-yellow-400 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Traffic Signal Status Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-green-900/30 border border-green-600 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-400">
            {signals.filter(s => s.north === 'green' || s.east === 'green').length}
          </div>
          <div className="text-sm text-green-300">Active Signals</div>
        </div>
        <div className="bg-yellow-900/30 border border-yellow-600 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-yellow-400">
            {signals.filter(s => s.north === 'yellow' || s.east === 'yellow').length}
          </div>
          <div className="text-sm text-yellow-300">Transitioning</div>
        </div>
        <div className="bg-red-900/30 border border-red-600 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-red-400">
            {signals.filter(s => s.north === 'red' && s.east === 'red').length}
          </div>
          <div className="text-sm text-red-300">Stopped</div>
        </div>
        <div className="bg-blue-900/30 border border-blue-600 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-400">96.8%</div>
          <div className="text-sm text-blue-300">Efficiency</div>
        </div>
      </div>
    </div>
  );
};

export default TrafficSignalVisualizer;