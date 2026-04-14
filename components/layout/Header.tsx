'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sprout } from 'lucide-react';
import Button from '@/components/ui/Button';

const navLinks = [
  { label: '소개',      href: '#about' },
  { label: '서비스',    href: '#service' },
  { label: '포트폴리오', href: '#portfolio' },
  { label: 'AI 자료실', href: '#ai-resources' },
  { label: '문의',      href: '#contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? 'rgba(255,255,255,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid #E5E5E5' : 'none',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10 h-16 md:h-[72px] flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-[#0D593C] flex items-center justify-center">
              <Sprout size={16} className="text-white" strokeWidth={2} />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[13px] font-bold text-[#0D593C] tracking-wide">TD STUDIO</span>
              <span className="text-[10px] text-[#666666]">러블리디</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#3A3A3A] hover:text-[#0D593C] transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button href="#contact" size="sm">작업문의</Button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-[#1A1A1A] p-1"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="메뉴"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-2xl font-bold text-[#1A1A1A] hover:text-[#0D593C] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Button href="#contact" onClick={() => setMenuOpen(false)}>
              작업문의 하기
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
