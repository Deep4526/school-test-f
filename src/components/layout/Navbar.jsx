import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Globe, Camera, Video, Send } from 'lucide-react';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about'},
  // { label: 'People', path: '/people', hasDropdown: true, children: ['Teachers', 'Committee', 'Staff'] },
  // { label: 'What We Do', path: '/activities', hasDropdown: true, children: ['Academics', 'Hifz Program', 'Extra Curricular'] },
  // { label: 'Admission', path: '/admission', hasDropdown: true, children: ['Apply Online', 'Admission Process', 'Fee Structure'] },
  { label: 'Admission', path: '/admission'},
  { label: 'Notices', path: '/notices' },
  // { label: 'School Calendar 2026', path: '/calendar' },
  { label: 'Contact', path: '/contact' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Academics', path: '/academics'},
  { label: 'Verify Certificate', path: '/verify-certificate' },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <li
                key={item.path}
                className="relative group"
                onMouseEnter={() => item.hasDropdown && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  to={item.path}
                  className={`px-3 py-5 text-sm font-medium flex items-center gap-1 transition-colors border-b-2
                    ${isActive(item.path)
                      ? 'text-primary border-accent'
                      : 'text-gray-700 border-transparent hover:text-primary hover:border-accent'}`}
                >
                  {item.label}
                  {item.hasDropdown && <ChevronDown size={14} />}
                </Link>

                {/* Dropdown */}
                {item.hasDropdown && openDropdown === item.label && (
                  <div className="absolute top-full left-0 bg-white shadow-lg rounded-b-md min-w-[200px] py-2 border-t-2 border-accent animate-fade-in">
                    {item.children.map((child, i) => (
                      <Link
                        key={i}
                        to={item.path}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-light hover:text-primary transition"
                      >
                        {child}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Follow Us + Social Icons */}
          <div className="hidden lg:flex items-center gap-3 text-sm">
            <span className="text-gray-600 font-medium">Follow Us :</span>
            <a href="#" className="w-7 h-7 bg-accent text-primary-dark rounded-full flex items-center justify-center hover:bg-accent-dark transition" title="Facebook">
              <Globe size={14} />
            </a>
            <a href="#" className="w-7 h-7 bg-accent text-primary-dark rounded-full flex items-center justify-center hover:bg-accent-dark transition" title="Instagram">
              <Camera size={14} />
            </a>
            <a href="#" className="w-7 h-7 bg-accent text-primary-dark rounded-full flex items-center justify-center hover:bg-accent-dark transition" title="LinkedIn">
              <Video size={14} />
            </a>
            <a href="#" className="w-7 h-7 bg-accent text-primary-dark rounded-full flex items-center justify-center hover:bg-accent-dark transition" title="Twitter">
              <Send size={14} />
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-primary p-2"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t animate-fade-in max-h-[80vh] overflow-y-auto">
          <ul className="py-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`block py-3 px-4 border-b border-gray-100 ${
                    isActive(item.path) ? 'text-primary bg-primary-light font-semibold' : 'text-gray-700'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="px-4 py-3 flex items-center gap-3">
            <span className="text-sm text-gray-600">Follow Us:</span>
            <a href="#" className="w-8 h-8 bg-accent text-primary-dark rounded-full flex items-center justify-center"><Globe size={14} /></a>
            <a href="#" className="w-8 h-8 bg-accent text-primary-dark rounded-full flex items-center justify-center"><Camera size={14} /></a>
            <a href="#" className="w-8 h-8 bg-accent text-primary-dark rounded-full flex items-center justify-center"><Send size={14} /></a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;