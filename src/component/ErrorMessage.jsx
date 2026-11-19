
import { AlertCircle, RefreshCw, Clapperboard } from 'lucide-react';
import { motion } from 'framer-motion';

function ErrorMessage({ message, onRetry }) {
  return (
    <motion.div
      className="silver-error-state"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="silver-error-icon">
        <Clapperboard size={30} />
        <span><AlertCircle size={15} /></span>
      </div>

      <span className="silver-error-label">MOVIEBOX SYSTEM NOTICE</span>

      <h2>Something went wrong.</h2>

      <p>
        {message || 'We could not load this content. Please try again.'}
      </p>

      {onRetry && (
        <button className="silver-retry-button" onClick={onRetry}>
          <RefreshCw size={16} />
          Try Again
        </button>
      )}
    </motion.div>
  );
}

export default ErrorMessage;
