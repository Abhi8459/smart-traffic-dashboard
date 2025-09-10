import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';

const VideoPlayer = ({ src, poster, title, className = "" }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current && !videoError) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(err => {
          console.log('Video play failed:', err);
          setVideoError(true);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const handleVideoError = () => {
    setVideoError(true);
    setIsLoading(false);
  };

  const handleVideoLoad = () => {
    setIsLoading(false);
    setVideoError(false);
  };

  return (
    <div className={`relative bg-gray-900 rounded-lg overflow-hidden ${className}`}>
      {!videoError ? (
        <>
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            loop
            muted
            className="w-full h-48 object-cover"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
            onError={handleVideoError}
            onLoadedData={handleVideoLoad}
            onCanPlay={() => {
              setIsLoading(false);
              // Auto-play the video
              if (videoRef.current) {
                videoRef.current.play().catch(err => {
                  console.log('Auto-play failed:', err);
                });
              }
            }}
          >
            <source src={src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Video Controls Overlay */}
          <div className={`absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center transition-opacity duration-200 ${
            showControls ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="flex items-center space-x-4">
              <button
                onClick={togglePlay}
                className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all duration-200"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </button>
              <button
                onClick={toggleMute}
                className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <button
                onClick={toggleFullscreen}
                className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200"
              >
                <Maximize2 className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Video Title */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
            <p className="text-white text-sm font-medium">{title}</p>
          </div>
          
          {/* Loading State */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
              <div className="text-gray-400 text-center">
                <div className="w-16 h-16 border-4 border-gray-600 border-t-blue-500 rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-sm">Loading video...</p>
              </div>
            </div>
          )}
        </>
      ) : (
        /* Video Error/Fallback State */
        <div className="w-full h-48 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 flex flex-col items-center justify-center border border-gray-600 relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 to-blue-500 animate-pulse"></div>
          </div>
          
          <div className="text-center p-6 relative z-10">
            <div className="flex items-center justify-center mb-3">
              <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse mr-2"></div>
              <span className="text-red-400 text-sm font-medium">● LIVE</span>
            </div>
            <h3 className="text-white font-semibold mb-2 text-lg">{title}</h3>
            <div className="bg-black bg-opacity-40 rounded-lg p-3 mb-3">
              <p className="text-blue-300 text-sm mb-1">📹 Camera Feed Simulation</p>
              <p className="text-gray-300 text-xs">Real-time traffic monitoring</p>
            </div>
            
            {/* Simulated Traffic Data */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-green-900/50 rounded p-2">
                <div className="text-green-400 font-mono">VEH: {Math.floor(Math.random() * 50) + 20}</div>
              </div>
              <div className="bg-yellow-900/50 rounded p-2">
                <div className="text-yellow-400 font-mono">SPD: {Math.floor(Math.random() * 30) + 25} mph</div>
              </div>
            </div>
            
            <p className="text-xs text-gray-500 mt-3">Add {src} to enable video</p>
          </div>
          
          {/* Live indicator */}
          <div className="absolute top-2 right-2 flex items-center space-x-1">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
            <span className="text-xs text-white">LIVE</span>
          </div>
          
          {/* Simulated video scanlines */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="h-full w-full" style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)'
            }}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;