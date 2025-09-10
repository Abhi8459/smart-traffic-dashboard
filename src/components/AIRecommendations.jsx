import React, { useState, useEffect } from 'react';
import { Brain, Target, TrendingDown, Clock, Zap, CheckCircle, AlertCircle } from 'lucide-react';

const AIRecommendations = () => {
  const [predictions, setPredictions] = useState([
    { lane: 'North-South Main St', currentDuration: 45, predictedDuration: 38, reduction: 15.6 },
    { lane: 'East-West Broadway', currentDuration: 35, predictedDuration: 42, reduction: -20.0 },
    { lane: 'North-South Park Ave', currentDuration: 40, predictedDuration: 32, reduction: 20.0 },
    { lane: 'East-West 5th Ave', currentDuration: 30, predictedDuration: 25, reduction: 16.7 }
  ]);

  const [congestionReduction, setCongestionReduction] = useState({
    current: 67,
    predicted: 45,
    improvement: 32.8
  });

  const [aiStatus, setAiStatus] = useState({
    status: 'active',
    confidence: 94.2,
    lastUpdate: new Date(),
    recommendationsApplied: 7,
    efficiency: 89.4
  });

  // Simulate real-time AI updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPredictions(prev => prev.map(prediction => ({
        ...prediction,
        predictedDuration: Math.max(15, prediction.predictedDuration + Math.floor(Math.random() * 6) - 3),
        reduction: Math.random() * 30 - 5 // -5% to 25%
      })));

      setCongestionReduction(prev => ({
        ...prev,
        predicted: Math.max(20, Math.min(80, prev.predicted + Math.floor(Math.random() * 6) - 3)),
        improvement: Math.random() * 40 + 10 // 10% to 50%
      }));

      setAiStatus(prev => ({
        ...prev,
        confidence: Math.max(85, Math.min(98, prev.confidence + Math.random() * 4 - 2)),
        lastUpdate: new Date(),
        efficiency: Math.max(75, Math.min(95, prev.efficiency + Math.random() * 4 - 2))
      }));
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold flex items-center">
          <Brain className="w-6 h-6 mr-3 text-purple-400" />
          AI Recommendations
        </h3>
        <div className="flex items-center space-x-4">
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
            aiStatus.status === 'active' ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              aiStatus.status === 'active' ? 'bg-green-400 animate-pulse' : 'bg-red-400'
            }`}></div>
            <span>{aiStatus.status === 'active' ? 'AI Active' : 'AI Offline'}</span>
          </div>
          <div className="text-sm text-gray-400">
            Confidence: <span className="text-white font-semibold">{aiStatus.confidence.toFixed(1)}%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Predicted Green Light Durations */}
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-white flex items-center">
            <Clock className="w-5 h-5 mr-2 text-blue-400" />
            Predicted Signal Timing
          </h4>
          
          <div className="space-y-3">
            {predictions.map((prediction, index) => (
              <div key={index} className="bg-gray-900 rounded-lg p-4 border border-gray-600">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h5 className="font-medium text-white text-sm">{prediction.lane}</h5>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="text-xs text-gray-400">
                        Current: <span className="text-white font-mono">{prediction.currentDuration}s</span>
                      </div>
                      <div className="text-xs text-gray-400">
                        Predicted: <span className="text-blue-400 font-mono">{prediction.predictedDuration}s</span>
                      </div>
                    </div>
                  </div>
                  <div className={`text-xs px-2 py-1 rounded ${
                    prediction.reduction > 0 
                      ? 'bg-green-900/50 text-green-400' 
                      : 'bg-red-900/50 text-red-400'
                  }`}>
                    {prediction.reduction > 0 ? '↓' : '↑'} {Math.abs(prediction.reduction).toFixed(1)}%
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="relative bg-gray-700 rounded-full h-2 mt-3">
                  <div 
                    className="absolute top-0 left-0 h-2 bg-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${(prediction.predictedDuration / 60) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Congestion Reduction Predictions */}
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-white flex items-center">
            <TrendingDown className="w-5 h-5 mr-2 text-green-400" />
            Congestion Reduction
          </h4>
          
          {/* Main Prediction Card */}
          <div className="bg-gradient-to-br from-green-900/30 to-blue-900/30 rounded-lg p-6 border border-green-600/50">
            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-green-400 mb-1">
                {congestionReduction.improvement.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-300">Expected Reduction</div>
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <div className="text-center">
                <div className="text-xl font-bold text-red-400">{congestionReduction.current}%</div>
                <div className="text-xs text-gray-400">Current</div>
              </div>
              <div className="flex-1 mx-4">
                <div className="relative bg-gray-700 rounded-full h-3">
                  <div 
                    className="absolute top-0 left-0 h-3 bg-gradient-to-r from-red-500 to-green-500 rounded-full transition-all duration-1000"
                    style={{ width: `${100 - congestionReduction.predicted}%` }}
                  ></div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-green-400">{congestionReduction.predicted}%</div>
                <div className="text-xs text-gray-400">Predicted</div>
              </div>
            </div>
            
            <div className="text-xs text-center text-gray-400">
              Estimated time to achieve: 12-15 minutes
            </div>
          </div>

          {/* AI Recommendations Actions */}
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-600">
            <h5 className="font-medium text-white mb-3 flex items-center">
              <Target className="w-4 h-4 mr-2 text-purple-400" />
              Recommended Actions
            </h5>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-3 text-sm">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span className="text-gray-300">Extend green phase on Main St by 7 seconds</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span className="text-gray-300">Reduce Broadway signal duration by 3 seconds</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <AlertCircle className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                <span className="text-gray-300">Monitor Park Ave for potential bottleneck</span>
              </div>
            </div>
          </div>

          {/* AI Performance Metrics */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-900 rounded-lg p-3 border border-gray-600 text-center">
              <div className="text-lg font-bold text-blue-400">{aiStatus.recommendationsApplied}</div>
              <div className="text-xs text-gray-400">Applied Today</div>
            </div>
            <div className="bg-gray-900 rounded-lg p-3 border border-gray-600 text-center">
              <div className="text-lg font-bold text-green-400">{aiStatus.efficiency.toFixed(1)}%</div>
              <div className="text-xs text-gray-400">AI Efficiency</div>
            </div>
          </div>
        </div>
      </div>

      {/* API Integration Status */}
      <div className="mt-6 p-4 bg-purple-900/20 border border-purple-600/50 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Zap className="w-5 h-5 text-purple-400" />
            <div>
              <div className="text-sm font-medium text-purple-300">Reinforcement Learning API</div>
              <div className="text-xs text-gray-400">
                Last updated: {aiStatus.lastUpdate.toLocaleTimeString()}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-purple-400 font-medium">Ready for Integration</div>
            <div className="text-xs text-gray-400">Endpoint: /api/v1/ai/recommendations</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIRecommendations;