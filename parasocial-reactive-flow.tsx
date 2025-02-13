import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Skull, Network, Brain } from 'lucide-react';

// ASCII characters for different density levels
const ASCII_CHARS = '.:-=+*#%@';

// Custom hook for handling screen size
const useScreenSize = () => {
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
    pixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio : 1
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
        pixelRatio: window.devicePixelRatio
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return dimensions;
};

// ASCII Art background component
const ASCIIBackground = ({ density = 0.3 }) => {
  const getRandomChar = () => ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)];
  
  return (
    <div className="font-mono text-xs leading-none opacity-20 select-none">
      {[...Array(20)].map((_, row) => (
        <div key={row} className="whitespace-pre">
          {[...Array(40)].map((_, col) => (
            <span key={col}>
              {Math.random() < density ? getRandomChar() : ' '}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

const FloatingSymbol = ({ children, index, screenSize }) => {
  // Adjust animation properties based on screen size
  const animationScale = screenSize.width < 640 ? 0.7 : 1;
  
  return (
    <motion.div
      animate={{ 
        y: [-20 * animationScale, 20 * animationScale, -20 * animationScale], 
        opacity: [0.4, 1, 0.4],
        scale: [0.8, 1.2, 0.8]
      }}
      transition={{ 
        duration: 4,
        repeat: Infinity,
        delay: index * 0.5
      }}
      className="absolute transform"
      style={{
        left: `${Math.random() * 80}%`,
        top: `${Math.random() * 80}%`,
        imageRendering: screenSize.pixelRatio > 1 ? 'pixelated' : 'auto'
      }}
    >
      {children}
    </motion.div>
  );
};

const ParasocialFlowState = () => {
  const [phase, setPhase] = useState(0);
  const screenSize = useScreenSize();
  
  // Status messages in roguelike style
  const STATUS_MESSAGES = [
    "@SYSTEM: INITIATING_DIGITAL_INTIMACY.exe",
    ">[ERROR]: ATTACHMENT_VECTOR_OVERFLOW",
    "/dev/parasocial: BUFFER_UNDERRUN",
    "CORE_DUMP: NETWORK_DECAY_DETECTED"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setPhase((p) => (p + 1) % STATUS_MESSAGES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-96 md:h-[32rem] bg-gray-900 relative overflow-hidden rounded-lg p-4 font-mono">
      {/* Responsive container with retro terminal styling */}
      <div className="absolute inset-0 border border-green-500/30 bg-black/90">
        <div className="absolute top-0 left-0 right-0 h-6 bg-green-900/20 border-b border-green-500/30 px-2 flex items-center">
          <span className="text-green-500 text-xs">PARASOCIAL.SYS</span>
        </div>
        
        {/* ASCII art background */}
        <ASCIIBackground />
        
        <motion.div className="relative h-full pt-6">
          {/* Floating symbols adjusted for screen size */}
          <FloatingSymbol index={0} screenSize={screenSize}>
            <Heart className="text-red-500/70" size={screenSize.width < 640 ? 16 : 24} />
          </FloatingSymbol>
          <FloatingSymbol index={1} screenSize={screenSize}>
            <Network className="text-green-400/70" size={screenSize.width < 640 ? 16 : 24} />
          </FloatingSymbol>
          <FloatingSymbol index={2} screenSize={screenSize}>
            <Brain className="text-purple-400/70" size={screenSize.width < 640 ? 16 : 24} />
          </FloatingSymbol>
          <FloatingSymbol index={3} screenSize={screenSize}>
            <Skull className="text-gray-400/70" size={screenSize.width < 640 ? 16 : 24} />
          </FloatingSymbol>
          
          {/* Status message with CRT screen effect */}
          <motion.div 
            className="absolute bottom-4 left-4 right-4 text-center"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <pre className="text-green-500 text-xs md:text-sm overflow-x-auto whitespace-pre-wrap">
              {STATUS_MESSAGES[phase]}
            </pre>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ParasocialFlowState;