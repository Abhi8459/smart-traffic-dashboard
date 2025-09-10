import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, Settings, Activity, Car, Clock, TrendingUp, BarChart3, PieChart, Map, Brain, Zap, Target, AlertTriangle, Menu, X, Video, Camera, Users, Bell } from 'lucide-react';
import TrafficStats from './components/TrafficStats';
import TrafficCharts from './components/TrafficCharts';
import AIRecommendations from './components/AIRecommendations';
import VideoPlayer from './components/VideoPlayer';

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedCity, setSelectedCity] = useState('Mumbai');
  const [controlMode, setControlMode] = useState('auto'); // 'auto' or 'manual'
  const [activeSection, setActiveSection] = useState('liveFeed'); // Menu navigation state
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar toggle state
  const [trafficData, setTrafficData] = useState({
    vehicleCount: 142,
    avgWaitTime: 32,
    congestionIndex: 67,
    flowRate: 85
  });
  
  // Vehicle counts for each junction
  const [junctionData, setJunctionData] = useState({
    junction1: { vehicleCount: 28, lastUpdated: new Date() },
    junction2: { vehicleCount: 34, lastUpdated: new Date() }
  });

  // Alert functions
  const sendAlert = (junctionName) => {
    alert(`Emergency alert sent for ${junctionName}!\nTraffic control center has been notified.`);
  };

  // Menu items
  const menuItems = [
    { id: 'liveFeed', label: 'Live Feed', icon: Video },
    { id: 'trafficStats', label: 'Traffic Stats', icon: Activity },
    { id: 'charts', label: 'Analytics', icon: BarChart3 },
    { id: 'aiRecommendations', label: 'AI Recommendations', icon: Brain },
    { id: 'simulation', label: 'Simulation', icon: Play },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Simulate real-time data updates every 2 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      
      // Simulate data changes
      setTrafficData(prev => ({
        vehicleCount: prev.vehicleCount + Math.floor(Math.random() * 6) - 3,
        avgWaitTime: Math.max(15, prev.avgWaitTime + Math.floor(Math.random() * 6) - 3),
        congestionIndex: Math.max(0, Math.min(100, prev.congestionIndex + Math.floor(Math.random() * 6) - 3)),
        flowRate: Math.max(0, Math.min(100, prev.flowRate + Math.floor(Math.random() * 6) - 3))
      }));
      
      // Update junction vehicle counts
      setJunctionData(prev => ({
        junction1: {
          vehicleCount: Math.max(0, prev.junction1.vehicleCount + Math.floor(Math.random() * 6) - 3),
          lastUpdated: new Date()
        },
        junction2: {
          vehicleCount: Math.max(0, prev.junction2.vehicleCount + Math.floor(Math.random() * 6) - 3),
          lastUpdated: new Date()
        }
      }));
    }, 2000);
    
    return () => clearInterval(timer);
  }, []);

  const cities = [
    // Maharashtra Cities
    'Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad', 'Solapur', 'Amravati', 'Kolhapur', 'Sangli', 'Malegaon',
    'Jalgaon', 'Akola', 'Latur', 'Dhule', 'Ahmednagar', 'Chandrapur', 'Parbhani', 'Ichalkaranji', 'Jalna', 'Ambarnath',
    'Bhiwandi', 'Panvel', 'Yavatmal', 'Achalpur', 'Virar', 'Navi Mumbai', 'Thane', 'Kalyan-Dombivli', 'Vasai-Virar', 'Mira-Bhayandar'
  ];

  // Render different sections based on activeSection
  const renderMainContent = () => {
    switch (activeSection) {
      case 'liveFeed':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Live Feed Videos */}
            <div className="lg:col-span-2">
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Play className="w-5 h-5 mr-2 text-green-400" />
                  Live Feed
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Junction 1 - Video 1 */}
                  <div className="bg-gray-900 rounded-lg p-4">
                    <div className="mb-3">
                      <h4 className="text-lg font-semibold text-white mb-2 flex items-center">
                        <Map className="w-5 h-5 mr-2 text-blue-400" />
                        Junction 1
                      </h4>
                      <VideoPlayer 
                        src="/Video.mp4"
                        poster="/placeholder-live-feed.jpg"
                        title="Live Traffic Feed - Junction 1"
                      />
                    </div>
                    
                    {/* Vehicle Count and Alert */}
                    <div className="space-y-3">
                      <div className="bg-gray-800 rounded-lg p-3 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Car className="w-5 h-5 text-green-400" />
                          <span className="text-gray-300">Vehicle Count:</span>
                        </div>
                        <span className="text-2xl font-bold text-white">{junctionData.junction1.vehicleCount}</span>
                      </div>
                      
                      <button 
                        onClick={() => sendAlert('Junction 1')}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                      >
                        <AlertTriangle className="w-5 h-5" />
                        <span>Send Alert</span>
                      </button>
                    </div>
                  </div>

                  {/* Junction 2 - Video 2 */}
                  <div className="bg-gray-900 rounded-lg p-4">
                    <div className="mb-3">
                      <h4 className="text-lg font-semibold text-white mb-2 flex items-center">
                        <Map className="w-5 h-5 mr-2 text-purple-400" />
                        Junction 2
                      </h4>
                      <VideoPlayer 
                        src="/Video2.mp4"
                        poster="/placeholder-live-feed-2.jpg"
                        title="Live Traffic Feed - Junction 2"
                      />
                    </div>
                    
                    {/* Vehicle Count and Alert */}
                    <div className="space-y-3">
                      <div className="bg-gray-800 rounded-lg p-3 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Car className="w-5 h-5 text-green-400" />
                          <span className="text-gray-300">Vehicle Count:</span>
                        </div>
                        <span className="text-2xl font-bold text-white">{junctionData.junction2.vehicleCount}</span>
                      </div>
                      
                      <button 
                        onClick={() => sendAlert('Junction 2')}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                      >
                        <AlertTriangle className="w-5 h-5" />
                        <span>Send Alert</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel - Traffic Stats + Simulation */}
            <div className="lg:col-span-1 space-y-6">
              <TrafficStats data={trafficData} />
              
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-purple-400" />
                  Traffic Simulation
                </h3>
                <VideoPlayer 
                  src="/Simulation.mp4"
                  poster="/placeholder-simulation.jpg"
                  title="Traffic Simulation"
                />
              </div>
            </div>
          </div>
        );
      
      case 'trafficStats':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            <div className="lg:col-span-2 xl:col-span-2">
              <TrafficStats data={trafficData} />
            </div>
            <div>
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-semibold mb-4 text-white">Additional Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Peak Hour Traffic:</span>
                    <span className="text-white font-semibold">8:00-9:00 AM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Avg Speed:</span>
                    <span className="text-white font-semibold">25 mph</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Incidents Today:</span>
                    <span className="text-red-400 font-semibold">3</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'charts':
        return <TrafficCharts />;
      
      case 'aiRecommendations':
        return <AIRecommendations />;
      
      case 'simulation':
        return (
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex justify-center items-center">
              <div className="w-full max-w-4xl">
                <div className="bg-gray-900 rounded-lg overflow-hidden">
                  <VideoPlayer 
                    src="/Simulation.mp4"
                    poster="/placeholder-simulation.jpg"
                    title="Traffic Simulation"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'settings':
        return (
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Settings className="w-5 h-5 mr-2 text-gray-400" />
              System Settings
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-white font-semibold">Display Settings</h4>
                <div className="space-y-3">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-gray-300">Auto-refresh data</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-gray-300">Show notifications</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-gray-300">Dark mode</span>
                  </label>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-white font-semibold">Alert Settings</h4>
                <div className="space-y-3">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-gray-300">Emergency alerts</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-gray-300">Traffic congestion alerts</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-gray-300">System maintenance alerts</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return <div>Section not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Left Sidebar Menu */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-16'} bg-gray-800 border-r border-gray-700 transition-all duration-300 flex-shrink-0`}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            {isSidebarOpen && (
              <div className="flex items-center space-x-2">
                <Activity className="w-6 h-6 text-blue-400" />
                <span className="font-bold text-white">Traffic Hub</span>
              </div>
            )}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
          
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                    activeSection === item.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {isSidebarOpen && <span>{item.label}</span>}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-gray-800 border-b border-gray-700 p-4">
          <div className="max-w-full mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-2xl font-bold text-white">Urban Traffic Dashboard</h1>
                <p className="text-gray-400 text-sm">{currentTime.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <label className="text-sm text-gray-300">City:</label>
              <select 
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>
        </header>

        {/* Main Dashboard Content */}
        <main className="flex-1 p-6">
          {renderMainContent()}
        </main>

        {/* Bottom Bar - Control Modes */}
        <footer className="bg-gray-800 border-t border-gray-700 p-4">
          <div className="max-w-full mx-auto flex justify-center items-center space-x-6">
            <div className="flex items-center space-x-4">
              <span className="text-gray-300 font-medium">Control Mode:</span>
              <button
                onClick={() => setControlMode('auto')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2 ${
                  controlMode === 'auto'
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <Brain className="w-5 h-5" />
                <span>Auto Mode (AI Control)</span>
              </button>
              <button
                onClick={() => setControlMode('manual')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2 ${
                  controlMode === 'manual'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <Settings className="w-5 h-5" />
                <span>Manual Mode (User Control)</span>
              </button>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Live Data • Updates every 2s</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
