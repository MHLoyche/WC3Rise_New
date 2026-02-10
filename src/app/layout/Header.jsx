import { Link } from "react-router-dom"; // Link for navigation
import { useState } from "react"; // useState to store and update values in the component
import './Header.css';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Toggle the menu open/close state with boolean value used in burger menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="header">
            <div className="header-container">
                <div className="logo">
                    <Link to="/">WC3 - Rise</Link>
                </div>
                
                {/* Burger menu button for mobile view, using span for 3 line design*/}
                <button className="burger-menu" onClick={toggleMenu} aria-label="Toggle menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                {/* Navigation links, visibility controlled by burger menu state, clicking a menu sets the bool to false to close menu */}
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