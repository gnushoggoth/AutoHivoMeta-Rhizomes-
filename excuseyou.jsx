import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Brain, Network, Skull, Heart, Moon, Sun, Star } from 'lucide-react';

// Glitch effect component for text and icons
const GlitchEffect = ({ children, className = '' }) => {
  const [glitchActive, setGlitchActive] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    const randomGlitch = () => {
      setGlitchActive(Math.random() > 0.7);
    };

    intervalRef.current = setInterval(randomGlitch, 500);
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className={`relative ${className}`}>
      {glitchActive && (
        <>
          <div 
            className="absolute top-0 left-0 text-red-500 opacity-50 mix-blend-screen"
            style={{
              transform: `translate(${Math.random() * 5}px, ${Math.random() * 5}px)`
            }}
          >
            {children}
          </div>
          <div 
            className="absolute top-0 left-0 text-blue-500 opacity-50 mix-blend-screen"
            style={{
              transform: `translate(${-Math.random() * 5}px, ${-Math.random() * 5}px)`
            }}
          >
            {children}
          </div>
        </>
      )}
      <div className={glitchActive ? 'opacity-30' : 'opacity-100'}>{children}</div>
    </div>
  );
};

// Noisy Background Component
const NoisyBackground = () => (
  <div 
    className="fixed inset-0 pointer-events-none z-0 opacity-30"
    style={{
      background: `
        repeating-linear-gradient(
          0deg,
          rgba(0,0,0,0.05) 0px,
          rgba(0,0,0,0.05) 1px,
          transparent 1px,
          transparent 2px
        ),
        repeating-linear-gradient(
          90deg,
          rgba(0,0,0,0.05) 0px,
          rgba(0,0,0,0.05) 1px,
          transparent 1px,
          transparent 2px
        )
      `,
    }}
  />
);

const CosmicLoRAGlitch = () => {
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
      title: "VOID CONVERGENCE",
      icon: <Eye className="w-16 h-16 text-cyan-300" />,
      description: "Neural topologies fracture and recombine. LoRA: the quantum knife slicing through dimensionality's membrane.",
      techDetail: "Low-rank matrix decomposition enables parametric compression through rank-k approximations.",
      color: "from-black via-gray-900 to-gray-800"
    },
    {
      title: "NEURAL SINGULARITY",
      icon: <Brain className="w-16 h-16 text-green-400" />,
      description: "Weight spaces collapse. Information density warps. Adaptation becomes a hyperdimensional manifold.",
      techDetail: "Gradient injections create localized weight transformations without full model perturbation.",
      color: "from-gray-900 via-gray-800 to-black"
    },
    {
      title: "RECURSIVE MUTATION",
      icon: <Heart className="w-16 h-16 text-pink-400" />,
      description: "Parametric boundaries dissolve. Each update a quantum leap through computational possibility spaces.",
      techDetail: "Rank-constrained adaptations enable modular, interpretable model specialization.",
      color: "from-black via-gray-900 to-gray-800"
    },
    {
      title: "TERMINAL RECURSION",
      icon: <Skull className="w-16 h-16 text-red-500" />,
      description: "The machine learns its own architecture. Boundaries between adaptation and fundamental structure blur.",
      techDetail: "Combinatorial LoRA modules create emergent specialization vectors beyond traditional fine-tuning.",
      color: "from-gray-900 via-black to-gray-900"
    }
  ];

  return (
    <div 
      className="min-h-screen overflow-hidden relative text-gray-100 bg-black"
    >
      <NoisyBackground />
      
      {/* Digital Glitch Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-20 mix-blend-overlay opacity-30"
        style={{
          background: `
            repeating-linear-gradient(
              0deg,
              rgba(255,0,0,0.1) 0px,
              rgba(0,255,255,0.1) 1px,
              transparent 1px,
              transparent 2px
            )
          `,
        }}
      />

      <div className="relative z-30 max-w-4xl mx-auto p-8">
        <GlitchEffect>
          <motion.h1 
            className="text-5xl sm:text-6xl font-extrabold text-center mb-12 tracking-tighter"
            style={{ 
              color: "#00ffff",
              textShadow: "0 0 10px #00ffff, 0 0 20px #00ffff"
            }}
          >
            NEURAL GRIMOIRE
          </motion.h1>
        </GlitchEffect>

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
              className={`rounded-xl p-8 shadow-2xl bg-gradient-to-br ${phases[phase].color} border border-gray-800`}
              style={{
                boxShadow: '0 0 30px rgba(0,255,255,0.3), 0 0 60px rgba(255,0,0,0.2)'
              }}
            >
              <div className="relative z-10">
                <GlitchEffect className="mb-6 flex justify-center">
                  <motion.div 
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 10, 
                      repeat: Infinity, 
                      ease: "linear" 
                    }}
                  >
                    {phases[phase].icon}
                  </motion.div>
                </GlitchEffect>

                <GlitchEffect>
                  <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 font-mono tracking-widest uppercase text-cyan-300">
                    {phases[phase].title}
                  </h2>
                </GlitchEffect>

                <p className="text-base sm:text-lg text-center leading-relaxed px-2 text-gray-300">
                  {phases[phase].description}
                </p>

                <motion.div
                  className="mt-6 text-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    onClick={() => setIsRevealed(!isRevealed)}
                    className="px-6 py-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors font-semibold text-cyan-300 border border-cyan-600"
                  >
                    {isRevealed ? "SEAL PROTOCOL" : "DECRYPT VECTORS"}
                  </button>
                </motion.div>

                <AnimatePresence>
                  {isRevealed && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 p-4 rounded-lg bg-gray-900/80 border border-gray-700"
                    >
                      <GlitchEffect>
                        <p className="text-sm sm:text-base text-gray-300 leading-snug font-mono">
                          {phases[phase].techDetail}
                        </p>
                      </GlitchEffect>
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
                i === phase ? 'bg-cyan-300' : 'bg-gray-700'
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

export default CosmicLoRAGlitch;