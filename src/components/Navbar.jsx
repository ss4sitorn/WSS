'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import s from '@/styles/navbar.module.css';

export default function Navbar({ isHome = true }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    // Load theme setting on mount
    const savedTheme = localStorage.getItem('wss_theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('wss_theme', nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  const renderThemeToggle = () => (
    <button
      className={s.themeToggle}
      onClick={toggleTheme}
      aria-label={`Toggle theme, current: ${theme}`}
    >
      {theme === 'dark' ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      ) : (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      )}
    </button>
  );

  return (
    <nav className={`${s.nav} ${scrolled ? s.scrolled : ''}`}>
      <div className={s.container}>
        <Link href="/" className={s.logo} onClick={closeMenu}>
          <img src="/ncsa_logo.png" alt="NCSA" className={s.navLogoImg} />
          <div className={s.logoDivider} />
          <div className={s.logoBadge}>WSS</div>
          <span className={s.logoAccent}>Portal</span>
        </Link>

        {isHome ? (
          <>
            {/* Desktop Navigation Links */}
            <div className={s.navLinks}>
              <a href="#about" className={s.navLink}>WSS คืออะไร</a>
              <a href="#framework" className={s.navLink}>กรอบมาตรฐาน</a>
              <a href="#impact" className={s.navLink}>ระดับผลกระทบ</a>
              <a href="#forms" className={s.navLink}>แบบฟอร์ม</a>
              <a href="#videos" className={s.navLink}>คลังความรู้</a>
              <Link href="/assessment" className={s.navCta}>
                เริ่มประเมิน
              </Link>
              {renderThemeToggle()}
            </div>

            {/* Hamburger Button */}
            <button
              className={`${s.hamburger} ${isOpen ? s.active : ''}`}
              onClick={toggleMenu}
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
            >
              <span className={s.hamburgerLine} />
              <span className={s.hamburgerLine} />
              <span className={s.hamburgerLine} />
            </button>

            {/* Mobile Dropdown Menu */}
            <div className={`${s.mobileMenu} ${isOpen ? s.open : ''}`}>
              <a href="#about" className={s.navLink} onClick={closeMenu}>
                WSS คืออะไร
              </a>
              <a href="#framework" className={s.navLink} onClick={closeMenu}>
                กรอบมาตรฐาน
              </a>
              <a href="#impact" className={s.navLink} onClick={closeMenu}>
                ระดับผลกระทบ
              </a>
              <a href="#forms" className={s.navLink} onClick={closeMenu}>
                แบบฟอร์ม
              </a>
              <a href="#videos" className={s.navLink} onClick={closeMenu}>
                คลังความรู้
              </a>
              <div className={s.mobileMenuRow}>
                <Link href="/assessment" className={s.navCta} onClick={closeMenu}>
                  เริ่มประเมิน
                </Link>
                {renderThemeToggle()}
              </div>
            </div>
          </>
        ) : (
          <div className={s.navLinks} style={{ display: 'flex' }}>
            <Link href="/" className={s.navLink} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M15 18l-6-6 6-6" />
              </svg>
              กลับหน้าหลัก
            </Link>
            {renderThemeToggle()}
          </div>
        )}
      </div>
    </nav>
  );
}
