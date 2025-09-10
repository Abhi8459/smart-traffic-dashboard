import React from 'react';
import { Car, Clock, TrendingUp, Activity, AlertTriangle, Users } from 'lucide-react';

const TrafficStats = ({ data }) => {
  const stats = [
    {
      icon: Car,
      label: 'Vehicle Count',
      value: data.vehicleCount,
      unit: 'vehicles',
      color: 'text-blue-400',
      bgColor: 'bg-blue-900/30',
      borderColor: 'border-blue-600',
      trend: '+5.2%'
    },
    {
      icon: Clock,
      label: 'Avg Wait Time',
      value: data.avgWaitTime,
      unit: 'seconds',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-900/30',
      borderColor: 'border-yellow-600',
      trend: '-2.1%'
    },
    {
      icon: TrendingUp,
      label: 'Congestion Index',
      value: data.congestionIndex,
      unit: '%',
      color: data.congestionIndex > 70 ? 'text-red-400' : data.congestionIndex > 40 ? 'text-yellow-400' : 'text-green-400',
      bgColor: data.congestionIndex > 70 ? 'bg-red-900/30' : data.congestionIndex > 40 ? 'bg-yellow-900/30' : 'bg-green-900/30',
      borderColor: data.congestionIndex > 70 ? 'border-red-600' : data.congestionIndex > 40 ? 'border-yellow-600' : 'border-green-600',
      trend: data.congestionIndex > 70 ? '+1.8%' : '-0.9%'
    },
    {
      icon: Activity,
      label: 'Flow Rate',
      value: data.flowRate,
      unit: '%',
      color: 'text-green-400',
      bgColor: 'bg-green-900/30',
      borderColor: 'border-green-600',
      trend: '+3.4%'
    }
  ];

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <h3 className="text-lg font-semibold mb-6 flex items-center">
        <Activity className="w-5 h-5 mr-2 text-green-400" />
        Real-time Traffic Stats
      </h3>
      
      <div className="space-y-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className={`${stat.bgColor} border ${stat.borderColor} rounded-lg p-4`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                  <div>
                    <div className="text-sm text-gray-300">{stat.label}</div>
                    <div className={`text-2xl font-bold ${stat.color}`}>
                      {stat.value}
                      <span className="text-sm ml-1">{stat.unit}</span>
                    </div>
                  </div>
                </div>
                <div className={`text-xs px-2 py-1 rounded ${
                  stat.trend.startsWith('+') ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'
                }`}>
                  {stat.trend}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Emergency Alerts */}
      <div className="mt-6 space-y-2">
        <h4 className="text-sm font-medium text-gray-300 flex items-center">
          <AlertTriangle className="w-4 h-4 mr-2 text-red-400" />
          Active Alerts
        </h4>
        <div className="space-y-2">
          <div className="bg-red-900/30 border border-red-600 rounded p-3">
            <div className="flex justify-between items-center">
              <span className="text-red-400 text-sm font-medium">Heavy congestion detected</span>
              <span className="text-xs text-gray-400">2 min ago</span>
            </div>
            <p className="text-xs text-gray-300 mt-1">Main St & 5th Ave - Alternative routes suggested</p>
          </div>
          <div className="bg-yellow-900/30 border border-yellow-600 rounded p-3">
            <div className="flex justify-between items-center">
              <span className="text-yellow-400 text-sm font-medium">Signal maintenance</span>
              <span className="text-xs text-gray-400">5 min ago</span>
            </div>
            <p className="text-xs text-gray-300 mt-1">Broadway & Park Ave - Reduced capacity</p>
          </div>
        </div>
      </div>
      
      {/* Peak Hours Indicator */}
      <div className="mt-6 p-4 bg-purple-900/30 border border-purple-600 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-purple-400" />
            <span className="text-sm font-medium text-purple-300">Peak Hours Status</span>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-purple-400">Moderate Traffic</div>
            <div className="text-xs text-gray-400">Next peak: 5:00 PM</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrafficStats;