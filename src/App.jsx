
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Navbar from './component/Navbar.jsx';
import Footer from './component/Footer.jsx';

import Home from './pages/Home.jsx';
import MovieDetails from './pages/MovieDetails.jsx';
import Search from './pages/Search.jsx';
import Anime from './pages/Anime.jsx';

import NotFound from './component/NotFound.jsx';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname + location.search}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/search" element={<Search />} />
          <Route path="/anime" element={<Anime />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <div className="app silver-app">
      <Navbar />

      <main className="app-main">
        <AnimatedRoutes />
      </main>

      <Footer />
    </div>
  );
}

export default App;
