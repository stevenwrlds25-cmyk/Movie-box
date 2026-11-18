import { Link } from 'react-router-dom';
import { Clapperboard } from 'lucide-react';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h2>
            <Clapperboard size={25} />
            MOVIE<span>BOX</span>
          </h2>

          <p>
            Discover trending movies, explore popular films,
            check ratings and find your next favourite movie.
          </p>
        </div>

        <div>
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/search?query=trending">Trending</Link></li>
            <li><Link to="/search?query=popular">Popular Movies</Link></li>
          </ul>
        </div>

        <div>
          <h3>Explore</h3>
          <ul>
            <li><Link to="/search?query=action">Action Movies</Link></li>
            <li><Link to="/search?query=comedy">Comedy Movies</Link></li>
            <li><Link to="/search?query=adventure">Adventure Movies</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} MovieBox. All rights reserved.</p>
        <p>Movie information provided by TMDB. MovieBox is not endorsed or certified by TMDB.</p>
      </div>
    </footer>
  );
}

export default Footer;