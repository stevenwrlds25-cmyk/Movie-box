import { Routes, Route } from 'react-router-dom';

import Navbar from './component/Navbar.jsx';
import Footer from './component/Footer.jsx';

import Home from './pages/Home.jsx';
import MovieDetails from './pages/MovieDetails.jsx';
import Search from './pages/Search.jsx';
import Anime from './pages/Anime.jsx';

import NotFound from './component/NotFound.jsx';

function App() {
  return (
    <div className="app">
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/search" element={<Search />} />
          <Route path="/anime" element={<Anime />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;