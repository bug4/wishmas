import React, { useState, useEffect } from 'react';
import Spline from '@splinetool/react-spline';
import { TwitterIcon, BarChart2 } from 'lucide-react';
import HoldersCounter from './HoldersCounter';

const LoadingScreen = () => {
  const [loadingText, setLoadingText] = useState('Loading Santa AI...');
  
  useEffect(() => {
    const texts = [
      'Loading Santa AI...',
      'Loading Santa\'s Humor...',
      'System ready...'
    ];
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % texts.length;
      setLoadingText(texts[currentIndex]);
    }, 600);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-red-500 flex flex-col items-center justify-center z-50">
      <div className="text-white text-2xl mb-8">{loadingText}</div>
      <div className="w-64 h-2 bg-red-700 rounded-full overflow-hidden">
        <div className="h-full bg-white animate-[loading_2s_ease-in-out]" />
      </div>
    </div>
  );
};

const SocialButton = ({ href, icon: Icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group bg-white bg-opacity-10 backdrop-blur-md p-3 hover:bg-opacity-20 transition-all duration-300 border border-white border-opacity-20"
    aria-label={label}
  >
    <Icon className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
  </a>
);

const InfoBox = () => (
  <div className="absolute right-6 top-1/2 transform -translate-y-1/2 z-10 max-w-sm">
    <div className="bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 p-6">
      <h3 className="text-white text-2xl font-bold mb-4">
        Before talking to Santa:
      </h3>
      <ul className="text-white space-y-3 text-lg">
        <li className="flex items-start">
          <div className="w-2 h-2 bg-white rounded-full mr-3 mt-2" />
          <span className="filter drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
            Please provide microphone permissions
          </span>
        </li>
        <li className="flex items-start">
          <div className="w-2 h-2 bg-white rounded-full mr-3 mt-2" />
          <span className="filter drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
            Ensure you have a stable internet connection
          </span>
        </li>
      </ul>
    </div>
  </div>
);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-screen h-screen">
      {isLoading && <LoadingScreen />}
      
      {/* Spline Scene */}
      <div className="absolute inset-0 z-0">
        <Spline 
          scene="https://prod.spline.design/xErZuIH6RoUqP603/scene.splinecode"
          className="w-full h-full"
        />
      </div>

      <InfoBox />
      <HoldersCounter />

      {/* Navigation Elements */}
      <div className="absolute top-0 left-0 w-full px-6 py-4 flex items-center z-10">
        {/* Left: WISHMAS Text */}
        <div className="w-1/3">
          <h1 className="text-8xl font-bold text-white font-christmas filter drop-shadow-[0_0_8px_rgba(255,255,255,0.7)] transition-all duration-300">
            WISHMAS
          </h1>
        </div>

        {/* Center: Social Buttons */}
        <div className="w-1/3 flex justify-center gap-3">
          <SocialButton
            href="https://twitter.com"
            icon={TwitterIcon}
            label="Twitter"
          />
          <SocialButton
            href="https://pump.fun"
            icon={BarChart2}
            label="Chart"
          />
        </div>

        {/* Right: Buy Button */}
        <div className="w-1/3 flex justify-end">
          <a 
            href="https://pump.fun" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 text-white font-bold py-2 px-6 hover:bg-opacity-20 transition-all duration-300 text-lg"
          >
            Buy $HOHO
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;