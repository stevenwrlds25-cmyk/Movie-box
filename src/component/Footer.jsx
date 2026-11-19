
import { Link, useLocation } from 'react-router-dom';
import {
  Clapperboard,
  ArrowUpRight,
  Film,
  MoveUpRight
} from 'lucide-react';

function Footer() {
  const location = useLocation();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleHomeClick = () => {
    if (location.pathname === '/') {
      scrollToTop();
    }
  };

  return (
    <footer className="silver-footer">
      <div className="footer-glow" />

      <div className="silver-footer-main">

        <div className="silver-footer-brand">
          <Link
            to="/"
            className="footer-logo"
            onClick={handleHomeClick}
          >
            <span className="footer-logo-icon">
              <Clapperboard size={25} />
            </span>

            <span>
              MOVIE<span className="footer-logo-highlight">BOX</span>
            </span>
          </Link>

          <p>
            Your destination for discovering incredible stories,
            exploring trending movies and finding your next
            unforgettable cinematic experience.
          </p>

          <div className="footer-status">
            <span className="status-dot" />
            YOUR CINEMATIC WORLD
          </div>
        </div>

        <div className="silver-footer-links">
          <h3>Navigation</h3>

          <Link to="/" onClick={handleHomeClick}>
            Home <ArrowUpRight size={14} />
          </Link>

          <Link to="/search?query=trending">
            Trending <ArrowUpRight size={14} />
          </Link>

          <Link to="/search?query=popular">
            Popular Movies <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="silver-footer-links">
          <h3>Discover</h3>

          <Link to="/search?query=action">
            Action Movies <ArrowUpRight size={14} />
          </Link>

          <Link to="/search?query=comedy">
            Comedy Movies <ArrowUpRight size={14} />
          </Link>

          <Link to="/search?query=adventure">
            Adventure Movies <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="silver-footer-extra">
          <div className="footer-extra-icon">
            <Film size={23} />
          </div>

          <h3>Made for movie lovers.</h3>

          <p>
            Explore. Discover. Experience.
            The next great movie is waiting.
          </p>

          <Link to="/search" className="footer-discover-link">
            Explore Movies <MoveUpRight size={16} />
          </Link>
        </div>

      </div>

      <div className="silver-footer-bottom">
        <p>
          © {new Date().getFullYear()} MovieBox. All rights reserved.
        </p>

        <p className="footer-tmdb-note">
          Movie information provided by TMDB.
          MovieBox is not endorsed or certified by TMDB.
        </p>

        <button
          type="button"
          className="back-to-top"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          BACK TO TOP <ArrowUpRight size={14} />
        </button>
      </div>
    </footer>
  );
}

export default Footer;
