import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

const TrafficMetrics = () => {
  const hourlyData = [
    { hour: '06:00', vehicles: 1200, congestion: 45 },
    { hour: '07:00', vehicles: 2800, congestion: 78 },
    { hour: '08:00', vehicles: 3500, congestion: 92 },
    { hour: '09:00', vehicles: 2200, congestion: 65 },
    { hour: '10:00', vehicles: 1800, congestion: 43 },
    { hour: '11:00', vehicles: 2100, congestion: 58 },
    { hour: '12:00', vehicles: 2900, congestion: 71 },
    { hour: '13:00', vehicles: 2600, congestion: 68 },
    { hour: '14:00', vehicles: 2400, congestion: 62 },
    { hour: '15:00', vehicles: 2800, congestion: 74 },
    { hour: '16:00', vehicles: 3200, congestion: 85 },
    { hour: '17:00', vehicles: 3800, congestion: 95 },
    { hour: '18:00', vehicles: 3600, congestion: 88 },
    { hour: '19:00', vehicles: 2900, congestion: 72 },
    { hour: '20:00', vehicles: 2100, congestion: 55 },
  ];

  const intersectionData = [
    { name: 'Main St & 5th Ave', efficiency: 87, color: '#22c55e' },
    { name: 'Park Ave & 3rd St', efficiency: 92, color: '#22c55e' },
    { name: 'Broadway & 1st St', efficiency: 76, color: '#eab308' },
    { name: 'Oak St & 7th Ave', efficiency: 68, color: '#ef4444' },
    { name: 'Pine St & 2nd Ave', efficiency: 89, color: '#22c55e' },
  ];

  const COLORS = ['#22c55e', '#eab308', '#ef4444', '#3b82f6'];

  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
      <h2 className="text-xl font-semibold mb-6 text-white">Traffic Analytics & Performance</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hourly Traffic Volume */}
        <div className="bg-gray-900 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-4 text-white">Hourly Traffic Volume</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="hour" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#fff'
                }} 
              />
              <Bar dataKey="vehicles" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Congestion Levels */}
        <div className="bg-gray-900 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-4 text-white">Congestion Levels (%)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="hour" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#fff'
                }} 
              />
              <Line type="monotone" dataKey="congestion" stroke="#ef4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Intersection Performance */}
      <div className="mt-6 bg-gray-900 p-4 rounded-lg">
        <h3 className="text-lg font-medium mb-4 text-white">Top Intersection Performance</h3>
        <div className="space-y-3">
          {intersectionData.map((intersection, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-800 rounded">
              <span className="text-gray-300">{intersection.name}</span>
              <div className="flex items-center space-x-3">
                <div className="w-32 bg-gray-700 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-1000"
                    style={{ 
                      width: `${intersection.efficiency}%`,
                      backgroundColor: intersection.color
                    }}
                  />
                </div>
                <span className="text-white font-medium w-12 text-right">
                  {intersection.efficiency}%
                </span>
                {intersection.efficiency > 85 ? (
                  <TrendingUp className="w-4 h-4 text-green-400" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-400" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-900 p-4 rounded-lg text-center">
          <p className="text-gray-400 text-sm">Average Efficiency</p>
          <p className="text-2xl font-bold text-green-400">84.4%</p>
          <p className="text-xs text-green-400 flex items-center justify-center mt-1">
            <TrendingUp className="w-3 h-3 mr-1" />
            +5.2% from yesterday
          </p>
        </div>
        <div className="bg-gray-900 p-4 rounded-lg text-center">
          <p className="text-gray-400 text-sm">Fuel Savings</p>
          <p className="text-2xl font-bold text-blue-400">23,450L</p>
          <p className="text-xs text-gray-400 mt-1">Estimated daily savings</p>
        </div>
        <div className="bg-gray-900 p-4 rounded-lg text-center">
          <p className="text-gray-400 text-sm">CO₂ Reduction</p>
          <p className="text-2xl font-bold text-green-400">54.8 tons</p>
          <p className="text-xs text-gray-400 mt-1">Daily emission reduction</p>
        </div>
      </div>
    </div>
  );
};

export default TrafficMetrics;