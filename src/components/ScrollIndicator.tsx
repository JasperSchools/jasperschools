'use client'

import { motion } from 'framer-motion'

export default function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer z-20"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.5, duration: 0.8 }}
      onClick={() => {
        window.scrollTo({
          top: window.innerHeight,
          behavior: 'smooth'
        })
      }}
    >
      <span className="text-white text-sm font-heading-medium tracking-wider uppercase drop-shadow-lg">
        Scroll to explore
      </span>
      <motion.div
        className="w-6 h-10 border-2 border-white/80 rounded-full flex items-start justify-center p-2"
        animate={{ 
          borderColor: ['rgba(255,255,255,0.8)', 'rgba(255,255,255,1)', 'rgba(255,255,255,0.8)']
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <motion.div
          className="w-1.5 h-1.5 bg-white rounded-full"
          animate={{ y: [0, 16, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </motion.div>
  )
}

