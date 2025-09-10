import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, PieChart as PieChartIcon, Map, BarChart3 } from 'lucide-react';

const TrafficCharts = () => {
  const [trafficFlowData, setTrafficFlowData] = useState([]);
  const [vehicleTypeData] = useState([
    { name: 'Cars', value: 65, color: '#3B82F6' },
    { name: 'Trucks', value: 15, color: '#10B981' },
    { name: 'Motorcycles', value: 12, color: '#F59E0B' },
    { name: 'Buses', value: 8, color: '#8B5CF6' }
  ]);
  
  const [heatmapData] = useState([
    { intersection: 'Main & 5th', congestion: 85, x: 1, y: 1 },
    { intersection: 'Broadway & Park', congestion: 62, x: 2, y: 1 },
    { intersection: '1st & Central', congestion: 45, x: 1, y: 2 },
    { intersection: 'Highway & Oak', congestion: 73, x: 2, y: 2 },
    { intersection: 'Elm & Pine', congestion: 38, x: 3, y: 1 },
    { intersection: 'Maple & Oak', congestion: 67, x: 3, y: 2 },
    { intersection: 'Cedar & Birch', congestion: 52, x: 1, y: 3 },
    { intersection: 'Willow & Ash', congestion: 78, x: 2, y: 3 },
    { intersection: 'Poplar & Elm', congestion: 41, x: 3, y: 3 }
  ]);

  // Generate real-time traffic flow data
  useEffect(() => {
    const generateData = () => {
      const now = new Date();
      const newData = [];
      
      for (let i = 29; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60000); // Every minute
        const vehicles = Math.floor(Math.random() * 40) + 60 + Math.sin(i * 0.2) * 20;
        newData.push({
          time: time.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
          vehicles: Math.max(0, vehicles)
        });
      }
      
      setTrafficFlowData(newData);
    };

    generateData();
    const interval = setInterval(generateData, 2000);
    
    return () => clearInterval(interval);
  }, []);

  const getHeatmapColor = (congestion) => {
    if (congestion >= 80) return 'bg-red-500';
    if (congestion >= 60) return 'bg-orange-500';
    if (congestion >= 40) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getHeatmapIntensity = (congestion) => {
    return Math.max(0.3, congestion / 100);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Line Chart - Traffic Flow */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-blue-400" />
          Traffic Flow
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trafficFlowData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="time" 
                stroke="#9CA3AF"
                fontSize={12}
                interval="preserveStartEnd"
              />
              <YAxis 
                stroke="#9CA3AF"
                fontSize={12}
                label={{ value: 'Vehicles/min', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#9CA3AF' } }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F3F4F6'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="vehicles" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2, fill: '#1E40AF' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex justify-between text-sm text-gray-400">
          <span>Peak: 127 vehicles/min</span>
          <span>Avg: 89 vehicles/min</span>
        </div>
      </div>

      {/* Pie Chart - Vehicle Distribution */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <PieChartIcon className="w-5 h-5 mr-2 text-green-400" />
          Vehicle Types
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={vehicleTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {vehicleTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F3F4F6'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          {vehicleTypeData.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-gray-300">{item.name}: {item.value}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Heatmap - Congestion at Intersections */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Map className="w-5 h-5 mr-2 text-purple-400" />
          Congestion Heatmap
        </h3>
        <div className="h-64">
          {/* 3x3 Grid Heatmap */}
          <div className="grid grid-cols-3 gap-2 h-full">
            {Array.from({ length: 9 }, (_, index) => {
              const x = (index % 3) + 1;
              const y = Math.floor(index / 3) + 1;
              const intersection = heatmapData.find(item => item.x === x && item.y === y);
              
              return (
                <div
                  key={index}
                  className={`${getHeatmapColor(intersection?.congestion || 0)} rounded-lg flex flex-col items-center justify-center text-white text-xs font-semibold relative overflow-hidden`}
                  style={{
                    opacity: getHeatmapIntensity(intersection?.congestion || 0)
                  }}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                  <div className="relative z-10 text-center p-2">
                    <div className="font-bold text-sm">
                      {intersection?.congestion || 0}%
                    </div>
                    <div className="text-xs mt-1 leading-tight">
                      {intersection?.intersection.split(' & ')[0] || 'N/A'}
                    </div>
                    <div className="text-xs">
                      {intersection?.intersection.split(' & ')[1] || ''}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Legend */}
        <div className="mt-4 flex justify-between items-center text-xs">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-gray-300">Low (0-40%)</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-yellow-500 rounded"></div>
              <span className="text-gray-300">Medium (40-60%)</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-orange-500 rounded"></div>
              <span className="text-gray-300">High (60-80%)</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span className="text-gray-300">Critical (80%+)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrafficCharts;