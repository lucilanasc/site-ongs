import { useEffect, useState } from 'react';
import { Menu, X, Heart } from 'lucide-react';

const navLinks = [
  { label: 'Início', href: '#hero' },
  { label: 'Adote', href: '#pets' },
  { label: 'Ajude', href: '#ajude' },
  { label: 'Nossa História', href: '#historia' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-md shadow-neutral-200/40' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 md:px-12">
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#hero');
          }}
          className="flex items-center gap-2.5"
        >
          <img
            src="/images/pata_vida.jpeg"
            alt="Pata Vida"
            className="h-12 w-12 rounded-xl object-cover shadow-lg shadow-primary-500/20"
          />
          <span className="text-lg font-bold tracking-tight text-neutral-800">
            Pata<span className="text-primary-500">Vida</span>
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="btn-ghost"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#ajude"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#ajude');
            }}
            className="ml-2 inline-flex items-center justify-center gap-2 rounded-full bg-accent-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-accent-500/30 transition-all duration-300 hover:bg-accent-600 hover:-translate-y-0.5"
          >
            <Heart className="h-4 w-4" fill="white" />
            Quero Doar
          </a>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-neutral-700 transition-colors hover:bg-neutral-100 md:hidden"
          aria-label="Menu"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {menuOpen && (
        <div className="glass border-t border-neutral-200/60 md:hidden">
          <div className="flex flex-col gap-1 px-5 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="btn-ghost text-left"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#ajude"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#ajude');
              }}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-accent-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent-500/30"
            >
              <Heart className="h-4 w-4" fill="white" />
              Quero Doar
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
