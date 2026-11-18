
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
  Search
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

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="new-navbar">
      <div className="navbar-container">

        {/* LOGO */}
        <Link to="/" className="new-logo" onClick={closeMenu}>
          <Clapperboard className="logo-icon" />

          <span className="logo-text">
            MOVIE<span>BOX</span>
          </span>
        </Link>

        {/* NAVIGATION LINKS */}
        <nav className={`new-nav-links ${menuOpen ? 'active' : ''}`}>

          <NavLink
            to="/"
            onClick={closeMenu}
          >
            Home
          </NavLink>

          <NavLink
            to="/search?query=popular"
            onClick={closeMenu}
          >
            Movies
          </NavLink>

          <NavLink
            to="/search?query=popular+tv+shows"
            onClick={closeMenu}
          >
            TV Shows
          </NavLink>

          <NavLink
            to="/anime"
            onClick={closeMenu}
          >
            Anime
          </NavLink>

        </nav>

        {/* SEARCH */}
        <form
          className="new-nav-search"
          onSubmit={handleSearch}
        >
          <Search size={18} />

          <input
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>

        {/* MOBILE MENU BUTTON */}
        <button
          className="new-menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>

      </div>
    </header>
  );
}

export default Navbar;
