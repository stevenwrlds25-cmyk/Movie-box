
import { useState } from 'react';
import {
  Link,
  NavLink,
  useNavigate
} from 'react-router-dom';

import {
  Clapperboard,
  Menu,
  X,
  Search,
  ArrowUpRight
} from 'lucide-react';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    if (!query.trim()) return;

    navigate(`/search?query=${encodeURIComponent(query.trim())}`);

    setQuery('');
    setMenuOpen(false);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="silver-navbar">
      <div className="navbar-container">

        <Link to="/" className="silver-logo" onClick={closeMenu}>
          <span className="silver-logo-icon">
            <Clapperboard size={23} />
          </span>

          <span className="silver-logo-text">
            MOVIE<span>BOX</span>
          </span>
        </Link>

        <nav className={`silver-nav-links ${menuOpen ? 'active' : ''}`}>
          <NavLink to="/" end onClick={closeMenu}>
            Home
          </NavLink>

          <NavLink to="/search?query=popular" onClick={closeMenu}>
            Movies
          </NavLink>

          <NavLink to="/search?query=popular+tv+shows" onClick={closeMenu}>
            TV Shows
          </NavLink>

          <NavLink to="/anime" onClick={closeMenu}>
            Anime
          </NavLink>
        </nav>

        <form className="silver-nav-search" onSubmit={handleSearch}>
          <Search size={17} />

          <input
            type="search"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search movies"
          />

          <button type="submit" aria-label="Submit search">
            <ArrowUpRight size={16} />
          </button>
        </form>

        <button
          className="silver-menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          type="button"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div>
    </header>
  );
}

export default Navbar;
