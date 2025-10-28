import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="logo" onClick={() => scrollToSection('hero')}>
          <span className="logo-icon">🎮</span>
          <span className="logo-text">海怪科技</span>
        </div>
        
        <button 
          className={`menu-toggle ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`nav ${menuOpen ? 'open' : ''}`}>
          <button onClick={() => scrollToSection('hero')}>首页</button>
          <button onClick={() => scrollToSection('about')}>关于我们</button>
          <button onClick={() => scrollToSection('projects')}>核心项目</button>
          <button onClick={() => scrollToSection('cases')}>成功案例</button>
          <button onClick={() => scrollToSection('contact')}>联系我们</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;

