import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Aperture, Upload, User, Menu, X, LogOut } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <Aperture className="logo-icon" size={32} />
                    <span className="logo-text">APERTURE GALLERY</span>
                </Link>

                {/* Desktop Nav */}
                <div className="navbar-links desktop-only">
                    {user ? (
                        <>
                            <Link to="/upload" className="nav-btn primary">
                                <Upload size={18} />
                                <span>Upload</span>
                            </Link>
                            <div className="user-menu">
                                <Link to="/profile" className="profile-link">
                                    <img src={user.avatar} alt="Profile" className="nav-avatar" />
                                </Link>
                                <button onClick={handleLogout} className="nav-btn icon-only" title="Logout">
                                    <LogOut size={20} />
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link">Login</Link>
                            <Link to="/signup" className="nav-btn primary">Get Started</Link>
                        </>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button
                    className="mobile-toggle"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="mobile-menu">
                        {user ? (
                            <>
                                <Link to="/upload" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>
                                    <Upload size={18} /> Upload Work
                                </Link>
                                <Link to="/profile" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>
                                    <User size={18} /> My Profile
                                </Link>
                                <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="mobile-link logout">
                                    <LogOut size={18} /> Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Login</Link>
                                <Link to="/signup" className="mobile-link highlight" onClick={() => setMobileMenuOpen(false)}>Sign Up</Link>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
