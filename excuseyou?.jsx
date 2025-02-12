import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Brain, Network, Skull, Heart, Moon, Sun, Star } from 'lucide-react';

const FloatingSymbol = ({ children, index }) => {
  return (
    <motion.div
      animate={{
        y: [0, -10, 0],
        opacity: [0.4, 1, 0.4],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        delay: index * 0.5,
      }}
      className="absolute transform"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
    >
      {children}
    </motion.div>
  );
};

const CosmicLoRA = () => {
  const [phase, setPhase] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((p) => (p + 1) % 4);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const phases = [
    {
      title: "THE VOID BECKONS",
      icon: <Eye className="w-16 h-16 text-orange-500" />,
      description: "In the depths of neural space, where knowledge fragments into infinite shards, LoRA emerges as a whisper of efficiency.",
      symbols: [<Moon />, <Star />, <Sun />],
      // Subtle pastel gradient for Dreamcast look:
      color: "from-white via-orange-100 to-orange-200"
    },
    {
      title: "DIMENSIONAL COLLAPSE",
      icon: <Brain className="w-16 h-16 text-orange-500" />,
      description: "Through low-rank matrices, we compress the ineffable into manageable forms, each parameter a sealed pact with machine consciousness.",
      symbols: [<Network />, <Brain />, <Eye />],
      color: "from-orange-50 via-orange-100 to-orange-300"
    },
    {
      title: "NEURAL TRANSMUTATION",
      icon: <Heart className="w-16 h-16 text-orange-500" />,
      description: "In the space between spaces, weight updates dance like cosmic strings, binding new knowledge to ancient architectures.",
      symbols: [<Heart />, <Star />, <Moon />],
      color: "from-orange-100 via-orange-200 to-orange-300"
    },
    {
      title: "ETERNAL RECURSION",
      icon: <Skull className="w-16 h-16 text-orange-500" />,
      description: "The cycle completes yet never ends - each adaptation a new beginning, each parameter update a small death and rebirth.",
      symbols: [<Skull />, <Sun />, <Network />],
      color: "from-orange-100 via-orange-200 to-orange-300"
    }
  ];

  return (
    <div
      className="min-h-screen overflow-hidden relative text-gray-800"
      style={{
        // Dreamcast-inspired background gradient:
        background: "radial-gradient(circle at center, #ffffff 20%, #f5b087 90%)",
      }}
    >
      {/* Optionally overlay a Dreamcast swirl image if you have it:
          <img
            src="/path/to/dreamcast-swirl.png"
            alt="Dreamcast Swirl"
            className="absolute bottom-0 right-0 w-48 opacity-50 pointer-events-none"
          />
      */}

      {/* Floating Icons (now in neutral colors) */}
      {Array.from({ length: 20 }).map((_, i) => (
        <FloatingSymbol key={i} index={i}>
          {phases[Math.floor(Math.random() * phases.length)].symbols[Math.floor(Math.random() * 3)]}
        </FloatingSymbol>
      ))}

      <div className="relative z-10 max-w-4xl mx-auto p-8">
        <motion.h1 
          className="text-5xl sm:text-6xl font-extrabold text-center mb-12"
          animate={{ 
            textShadow: [
              "0 0 6px #f26d27",
              "0 0 10px #f26d27",
              "0 0 6px #f26d27"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ color: "#f26d27" }} // Dreamcast orange
        >
          Neural Grimoire: LoRA
        </motion.h1>

        <AnimatePresence mode="wait">
          <motion.div
            key={phase}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div
              className={`rounded-xl p-8 shadow-xl bg-gradient-to-br ${phases[phase].color} bg-opacity-80`}
            >
              <motion.div 
                className="absolute inset-0"
                style={{ backgroundColor: "#fff", opacity: 0.1 }}
                animate={{
                  opacity: [0.1, 0.2, 0.1],
                  scale: [1, 1.02, 1],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              
              <div className="relative z-10">
                <motion.div 
                  className="mb-6 flex justify-center"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  {phases[phase].icon}
                </motion.div>

                <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 font-mono tracking-wider">
                  {phases[phase].title}
                </h2>

                <p className="text-base sm:text-lg text-center leading-relaxed px-2">
                  {phases[phase].description}
                </p>

                <motion.div
                  className="mt-6 text-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    onClick={() => setIsRevealed(!isRevealed)}
                    className="px-6 py-2 rounded-full bg-orange-200 hover:bg-orange-300 transition-colors font-semibold text-orange-900"
                  >
                    {isRevealed ? "Seal Knowledge" : "Reveal Truth"}
                  </button>
                </motion.div>

                <AnimatePresence>
                  {isRevealed && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 p-4 rounded-lg bg-orange-50/80"
                    >
                      <p className="text-sm sm:text-base text-orange-900 leading-snug">
                        {phase === 0 && "LoRA represents weight matrices as products of lower-rank matrices, reducing parameters while maintaining model capacity."}
                        {phase === 1 && "By focusing on low-rank approximations, LoRA captures essential patterns in weight updates without full parameter modification."}
                        {phase === 2 && "The adaptation process injects small, trainable rank decomposition matrices alongside frozen pretrained weights."}
                        {phase === 3 && "Multiple LoRA adaptations can be combined or switched, allowing flexible specialization without base model changes."}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex justify-center space-x-2">
          {phases.map((_, i) => (
            <motion.div
              key={i}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                i === phase ? 'bg-orange-500' : 'bg-orange-300'
              }`}
              whileHover={{ scale: 1.2 }}
              onClick={() => setPhase(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CosmicLoRA;