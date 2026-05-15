import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          className="fixed right-[10px] bottom-[15px] z-[99] bg-white border border-gray-200 p-3 shadow-lg group hover:bg-black hover:text-white transition-all cursor-pointer"
          aria-label="Back to top"
        >
          <div className="flex flex-col items-center">
            <span className="text-[10px] uppercase font-bold tracking-widest [writing-mode:vertical-rl] mb-1 group-hover:text-white text-gray-800 transition-colors">
              BACK TO TOP
            </span>
            <ArrowUp size={16} />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
