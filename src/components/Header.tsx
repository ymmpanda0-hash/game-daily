import { useState, useEffect } from 'react';
import { Gamepad2, Menu, X } from 'lucide-react';

const navItems = [
  { id: 'nav-news', label: '每日资讯', href: '#section-news' },
  { id: 'nav-promos', label: '游戏宣发', href: '#section-promos' },
  { id: 'nav-industry', label: '大厂变动', href: '#section-industry' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full border-b border-border transition-all duration-300 ${
          isScrolled
            ? 'bg-background/95 backdrop-blur-md shadow-sm'
            : 'bg-background/85 backdrop-blur'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <a
            href="#"
            className="flex items-center gap-2 text-xl font-bold text-foreground transition-opacity hover:opacity-80"
            data-dom-id="logo"
          >
            <Gamepad2 className="h-6 w-6 text-primary" />
            <span>Game Daily</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-2 md:flex" aria-label="主导航">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                data-dom-id={item.id}
                className="rounded-full px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? '关闭菜单' : '打开菜单'}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-background/95 backdrop-blur-lg transition-all duration-300 md:hidden ${
          isMenuOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
        aria-hidden={!isMenuOpen}
      >
        <nav
          className="flex h-full flex-col items-center justify-center gap-6"
          aria-label="移动端主导航"
        >
          {navItems.map((item, index) => (
            <a
              key={item.id}
              href={item.href}
              data-dom-id={`${item.id}-mobile`}
              onClick={handleNavClick}
              className="text-2xl font-semibold text-foreground transition-colors hover:text-primary"
              style={{
                animationDelay: isMenuOpen ? `${index * 80}ms` : '0ms',
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
