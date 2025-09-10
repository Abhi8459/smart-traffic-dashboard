import React from 'react';
import { Activity, Cpu, Database, Wifi } from 'lucide-react';

const SystemOverview = () => {
  const systemMetrics = [
    { name: 'CPU Usage', value: 67, icon: Cpu, color: 'text-blue-400' },
    { name: 'Memory', value: 45, icon: Database, color: 'text-green-400' },
    { name: 'Network', value: 89, icon: Wifi, color: 'text-yellow-400' },
    { name: 'System Load', value: 72, icon: Activity, color: 'text-red-400' },
  ];

  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
      <h3 className="text-lg font-semibold text-white mb-4">System Overview</h3>
      
      <div className="space-y-4">
        {systemMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon className={`w-5 h-5 ${metric.color}`} />
                <span className="text-gray-300">{metric.name}</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-20 bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-1000 ${
                      metric.value > 80 ? 'bg-red-500' :
                      metric.value > 60 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${metric.value}%` }}
                  />
                </div>
                <span className="text-white font-medium w-10 text-right">
                  {metric.value}%
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-green-400">99.8%</p>
            <p className="text-xs text-gray-400">Uptime</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-400">156</p>
            <p className="text-xs text-gray-400">Active Cameras</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemOverview;