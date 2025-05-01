import { useState, useEffect } from 'react';

export default function DuolingoLoader() {
  const [dots, setDots] = useState(1);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev < 3 ? prev + 1 : 1);
    }, 500);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-4">
      {/* Owl Container */}
      <div className="relative">
        {/* Owl */}
        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
          <div className="relative w-10 h-8">
            {/* Eyes */}
            <div className="absolute top-0 left-0 w-4 h-4 bg-white rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-black rounded-full"></div>
            </div>
            <div className="absolute top-0 right-0 w-4 h-4 bg-white rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-black rounded-full"></div>
            </div>
            
            {/* Beak */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-3">
              <div className="w-3 h-2 bg-yellow-500 rounded-b-full"></div>
            </div>
          </div>
        </div>
        
        {/* Belly */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/4 w-8 h-6 bg-green-300 rounded-full z-10"></div>
      </div>
      
      {/* Loading Text */}
      <div className="mt-2 text-sm font-bold text-green-600">
        Loading{'.'.repeat(dots)}
      </div>
    </div>
  );
}