import { Link } from "react-router-dom";
import { useState } from "react";
import './Header.css';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="header">
            <div className="header-container">
                <div className="logo">
                    <Link to="/">WC3 - Rise</Link>
                </div>
                
                <button className="burger-menu" onClick={toggleMenu} aria-label="Toggle menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
                    <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
                    <Link to="/items" className="nav-link" onClick={() => setIsMenuOpen(false)}>Items</Link>
                    <Link to="/heroes" className="nav-link" onClick={() => setIsMenuOpen(false)}>Heroes</Link>
                    <Link to="/bosses" className="nav-link" onClick={() => setIsMenuOpen(false)}>Bosses</Link>
                    <Link to="/patch-notes" className="nav-link" onClick={() => setIsMenuOpen(false)}>Patch Notes</Link>
                    <Link to="/downloads" className="nav-link" onClick={() => setIsMenuOpen(false)}>Downloads</Link>
                </nav>
            </div>
        </header>
    );
}