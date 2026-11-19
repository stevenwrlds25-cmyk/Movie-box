
import { motion } from 'framer-motion';
import { Clapperboard } from 'lucide-react';

function Loading() {
  return (
    <div className="silver-loading-container">
      <motion.div
        className="silver-loader-icon"
        animate={{ rotateY: [0, 180, 360] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear'
        }}
      >
        <Clapperboard size={35} />
      </motion.div>

      <div className="silver-loader">
        <motion.div
          className="silver-loader-progress"
          animate={{ x: ['-100%', '200%'] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </div>

      <p>LOADING MOVIES</p>
      <span>PREPARING YOUR CINEMATIC EXPERIENCE</span>
    </div>
  );
}

export default Loading;
