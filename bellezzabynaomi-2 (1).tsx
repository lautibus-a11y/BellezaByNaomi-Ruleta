import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Sparkles, Star, X } from 'lucide-react';

// --- Configuration & Assets ---
const DESIGN_IMAGES = [
  "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=600&auto=format&fit=crop", // Abstract pink
  "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=600&auto=format&fit=crop", // Nails close up
  "https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?q=80&w=600&auto=format&fit=crop", // Beauty textures
  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600&auto=format&fit=crop", // Cosmetics luxury
  "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?q=80&w=600&auto=format&fit=crop", // Glitter gold
  "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop", // Minimalist pink/gold
  "https://images.unsplash.com/photo-1615397323201-72cb6f5a3e14?q=80&w=600&auto=format&fit=crop", // Glossy texture
  "https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=600&auto=format&fit=crop"  // Luxury beauty
];

// Creamos un array gigantesco para que avance infinitamente en una dirección sin tener que reiniciar ni causar saltos
const STRIP_MULTIPLIER = 150; 
const SPINNER_ITEMS = Array(STRIP_MULTIPLIER).fill(DESIGN_IMAGES).flat();

// Theme Constants
const THEME = {
  pink: '#FECDC9',
  darkText: '#4A3331',
  gold: '#D4AF37'
};

// --- Ambient Cinematic Background ---
const AmbientBackground = () => (
  <div className="fixed inset-0 z-0 overflow-hidden bg-[#FECDC9]">
    {/* Noise Texture Overlay for premium feel */}
    <div 
      className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
    />
    {/* Subtle central glow */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.4)_0%,transparent_80%)] pointer-events-none" />
  </div>
);

// --- Fluid Confetti Burst Effect ---
const ConfettiBurst = () => {
  const colors = ['#ffffff', '#D4AF37', '#FF69B4', '#ffced6', '#FFC0CB'];
  return (
    <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden flex items-center justify-center">
      {Array.from({ length: 60 }).map((_, i) => {
        // Distribuir en 360 grados
        const angle = Math.random() * Math.PI * 2;
        // Velocidad inicial (distancia)
        const velocity = 30 + Math.random() * 70; 
        const x = Math.cos(angle) * velocity;
        const y = Math.sin(angle) * velocity;
        
        return (
          <motion.div
            key={i}
            initial={{ x: 0, y: 0, scale: 0, opacity: 1, rotate: 0 }}
            animate={{
              x: `${x}vw`,
              // El confeti sube un poco y luego cae por la gravedad
              y: [`0vh`, `${y - 10}vh`, `${y + 100}vh`],
              scale: [0, 1, 1, 0.5],
              opacity: [1, 1, 1, 0],
              rotate: Math.random() * 720
            }}
            transition={{ 
              duration: 2.5 + Math.random() * 2, 
              ease: [0.25, 0.46, 0.45, 0.94] // Ease out sutil
            }}
            className="absolute w-2 h-4 sm:w-3 sm:h-6 rounded-sm shadow-sm"
            style={{ backgroundColor: colors[i % colors.length] }}
          />
        );
      })}
    </div>
  );
};

// --- Animated Text Widget ---
const HeroTitle = () => {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center pt-6 md:pt-10 pointer-events-none">
      {/* Subtítulo Decorativo con líneas doradas */}
      <div className="flex items-center gap-3 mb-2 sm:mb-3">
        <div className="h-[1px] w-8 sm:w-12 bg-gradient-to-r from-transparent to-[#D4AF37]"></div>
        <p className="text-[#8E635F] uppercase tracking-[0.3em] text-[10px] sm:text-xs font-bold">
          Luxury Nail Art
        </p>
        <div className="h-[1px] w-8 sm:w-12 bg-gradient-to-l from-transparent to-[#D4AF37]"></div>
      </div>
      
      {/* Título Principal Estático con Oro y Borgoña */}
      <h1 
        className="text-4xl sm:text-5xl md:text-6xl font-bold text-center leading-none flex flex-col sm:block"
        style={{ fontFamily: "'Playfair Display', serif" }} 
      >
        <span className="text-[#4A3331] drop-shadow-[0_2px_4px_rgba(255,255,255,0.6)]">
          Bellezza
        </span>
        <span className="bg-gradient-to-b from-[#D4AF37] via-[#FFF3B0] to-[#B38728] bg-clip-text text-transparent drop-shadow-[0_1px_2px_rgba(74,51,49,0.3)]">
          ByNaomi
        </span>
      </h1>
    </div>
  );
};

// --- Winner Modal Overlay ---
const WinnerModal = ({ isOpen, imageSrc, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <ConfettiBurst />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40 backdrop-blur-md"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              className="relative w-full max-w-sm sm:max-w-md bg-[#FFF5F6] p-4 sm:p-6 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.2)] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the card itself
            >
              {/* Close Button */}
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-white/50 rounded-full text-[#4A3331] hover:bg-white transition-colors"
              >
                <X size={20} />
              </button>

              <h2 className="text-2xl sm:text-3xl font-bold text-[#4A3331] mb-2 font-serif text-center">
                ¡Tu Diseño!
              </h2>
              <p className="text-xs sm:text-sm text-[#8E635F] mb-6 text-center">
                Toma captura de pantalla y agendemos tu cita.
              </p>

              {/* Full width image display inside modal */}
              <div className="w-full aspect-[4/5] rounded-xl overflow-hidden relative shadow-inner">
                <img 
                  src={imageSrc} 
                  alt="Diseño Ganador" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 border border-white/40 rounded-xl pointer-events-none" />
              </div>

              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 w-full py-4 bg-gradient-to-r from-[#4A3331] to-[#6B4C4A] text-[#FECDC9] font-bold rounded-xl tracking-widest text-sm uppercase shadow-lg"
              >
                Cerrar
              </motion.button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// --- Main Application ---
export default function App() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasRevealed, setHasRevealed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(10); // Start index
  const [itemWidth, setItemWidth] = useState(160);
  
  const containerRef = useRef(null);
  const controls = useAnimation();
  
  const gap = 16; 
  const totalItemWidth = itemWidth + gap;

  // Responsive sizing
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 400) setItemWidth(160); 
      else if (window.innerWidth < 640) setItemWidth(180); 
      else if (window.innerWidth < 1024) setItemWidth(260); 
      else setItemWidth(300); 
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Main Spin Action - 100% Fluid forward movement
  const handleSpin = async () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setHasRevealed(false);
    setShowModal(false);

    // Pick a target index exactly 30 to 50 items ahead.
    // By purely adding to the currentIndex, we NEVER jump backwards. Fluidity guaranteed.
    const jumpAmount = Math.floor(Math.random() * 20) + 30; 
    const targetIndex = currentIndex + jumpAmount;
    
    // Calculate pixel position
    const screenCenterOffset = (window.innerWidth / 2) - (itemWidth / 2);
    const targetX = -(targetIndex * totalItemWidth) + screenCenterOffset;

    // Cinematic pull-back anticipation
    await controls.start({
      x: -(currentIndex * totalItemWidth) + screenCenterOffset + 40,
      transition: { duration: 0.5, ease: "easeOut" }
    });

    // High speed spin with extremely smooth deceleration
    await controls.start({
      x: targetX,
      transition: {
        type: "tween",
        duration: 5.5,
        ease: [0.1, 0.9, 0.1, 1], // Custom bezier curve for casino-style slow down
      }
    });

    // Spin Complete
    setCurrentIndex(targetIndex);
    setIsSpinning(false);
    setHasRevealed(true);
    
    // Haptic feedback
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate([50, 50, 100]);
    }

    // Wait a brief moment before popping the modal for dramatic effect
    setTimeout(() => {
      setShowModal(true);
    }, 600);
  };

  // Setup initial position smoothly without animating
  useEffect(() => {
    const screenCenterOffset = (window.innerWidth / 2) - (itemWidth / 2);
    controls.set({ x: -(currentIndex * totalItemWidth) + screenCenterOffset });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemWidth]); // Run only when width changes

  return (
    <div className="fixed inset-0 w-full h-[100dvh] bg-[#FECDC9] text-[#4A3331] overflow-hidden font-sans flex flex-col">
      <AmbientBackground />
      
      {/* Modal overlay for winner */}
      <WinnerModal 
        isOpen={showModal} 
        imageSrc={SPINNER_ITEMS[currentIndex]} 
        onClose={() => setShowModal(false)} 
      />

      <div className="relative z-10 flex flex-col h-full w-full justify-between">
        
        {/* Header Section */}
        <header className="flex-none mt-safe-top">
          <HeroTitle />
        </header>

        {/* Main Spinner Area */}
        <main className="flex-1 flex flex-col justify-center items-center relative min-h-0 w-full">
          {/* Glass framing background */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[220px] sm:h-[280px] md:h-[400px] bg-gradient-to-b from-[#FECDC9]/10 via-white/40 to-[#FECDC9]/10 pointer-events-none" />

          {/* Spinner Container */}
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            
            {/* The Palito (Selector Indicator) */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center">
               <div className="h-full w-full bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent shadow-[0_0_15px_#D4AF37]" />
               <div className="absolute top-8 w-3 h-3 rotate-45 bg-[#D4AF37] shadow-[0_0_10px_#D4AF37]" />
               <div className="absolute bottom-8 w-3 h-3 rotate-45 bg-[#D4AF37] shadow-[0_0_10px_#D4AF37]" />
            </div>

            {/* Moving Track */}
            <motion.div 
              ref={containerRef}
              className="flex items-center will-change-transform"
              style={{ gap: `${gap}px` }}
              animate={controls}
            >
              {SPINNER_ITEMS.map((imgSrc, index) => {
                // Focus states
                const isWinner = hasRevealed && index === currentIndex;
                const distanceToCenter = Math.abs(index - currentIndex);
                const isNearCenter = distanceToCenter < 2; 
                
                // Opacidad y escala fluida
                const opacity = hasRevealed ? (isWinner ? 1 : 0.5) : (isNearCenter ? 1 : 0.8);
                const scale = hasRevealed ? (isWinner ? 1.05 : 0.95) : (isNearCenter ? 1 : 0.95);
                const blurAmount = isSpinning ? 'blur(1px)' : 'blur(0px)';

                return (
                  <motion.div
                    key={`${index}-${imgSrc}`}
                    animate={{ opacity, scale, filter: blurAmount }}
                    transition={{ duration: 0.3 }}
                    className="relative flex-shrink-0 rounded-xl overflow-hidden glass-panel"
                    style={{ 
                      width: `${itemWidth}px`, 
                      height: `${itemWidth * 1.4}px`, 
                    }}
                  >
                    {/* Image Layer */}
                    <img 
                      src={imgSrc} 
                      alt="Nail Design" 
                      className="w-full h-full object-cover"
                      loading={index < 30 ? "eager" : "lazy"} 
                    />

                    {/* Glass Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
                    
                    {/* Winner Glow Frame */}
                    <AnimatePresence>
                      {isWinner && !showModal && (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1, boxShadow: ["inset 0 0 10px #ffffff", "inset 0 0 30px #ffffff"] }}
                          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                          className="absolute inset-0 rounded-xl border-[3px] border-white z-10 pointer-events-none"
                        />
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </main>

        {/* Interaction Section */}
        <footer className="flex-none pb-8 sm:pb-12 px-4 flex flex-col items-center z-20 w-full mb-safe-bottom">
          <motion.button
            onClick={handleSpin}
            disabled={isSpinning}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            className={`
              relative group overflow-hidden rounded-full
              px-6 py-4 sm:px-10 sm:py-5 text-sm sm:text-base md:text-xl font-bold tracking-[0.15em] uppercase
              backdrop-blur-md border border-[#D4AF37]/80
              transition-all duration-300 w-[95%] max-w-md mx-auto
              ${isSpinning ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer shadow-[0_8px_32px_rgba(212,175,55,0.2)] hover:shadow-[0_10px_40px_rgba(212,175,55,0.4)]'}
            `}
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 100%)',
              boxShadow: 'inset 0 0 20px rgba(255,255,255,0.5)'
            }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3 text-[#4A3331] drop-shadow-sm font-semibold">
              {isSpinning ? (
                <>
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                    <Star className="w-5 h-5 text-[#8E635F]" />
                  </motion.div>
                  BUSCANDO...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                  {hasRevealed ? "GIRAR DE NUEVO" : "GIRAR DISEÑO"}
                  <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                </>
              )}
            </span>
            <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/80 opacity-60 group-hover:animate-shine" />
          </motion.button>
        </footer>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');

        :root {
          --sat: env(safe-area-inset-top);
          --sab: env(safe-area-inset-bottom);
        }

        html, body {
          font-family: 'Inter', sans-serif;
          background-color: #FECDC9;
          margin: 0;
          padding: 0;
          height: 100%;
          width: 100%;
          overflow: hidden; 
          overscroll-behavior-y: none; 
          touch-action: none; 
        }

        .mt-safe-top { margin-top: calc(var(--sat) + 16px); }
        .mb-safe-bottom { margin-bottom: var(--sab); }

        h1, h2, h3, .font-serif {
          font-family: 'Playfair Display', serif;
        }

        .glass-panel {
          background: rgba(255, 255, 255, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.8);
          box-shadow: 0 8px 32px 0 rgba(255, 255, 255, 0.2);
        }

        @keyframes shine {
          100% { left: 200%; }
        }
        .group-hover\\:animate-shine:hover {
          animation: shine 1.5s infinite;
        }

        ::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </div>
  );
}