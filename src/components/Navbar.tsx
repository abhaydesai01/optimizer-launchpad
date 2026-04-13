import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/solutions", label: "Solutions" },
  { to: "/case-studies/aptech", label: "Case Studies" },
  { to: "/about", label: "About" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-background/70 backdrop-blur-2xl border-b border-white/[0.06] shadow-lg shadow-black/20" : "bg-transparent"}`}>
      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between h-[72px]">
        <Link to="/" className="flex items-center gap-2 text-xl font-extrabold tracking-tight">
          <img src="/logo.png" alt="Optimizer360" width={32} height={32} className="rounded-md" />
          <span><span className="gradient-text">O</span><span className="text-foreground">ptimizer360</span></span>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 ${
                location.pathname === link.to
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/[0.04]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:block">
          <Button asChild size="sm" className="rounded-full px-6 font-semibold shadow-lg shadow-primary/20">
            <Link to="/contact">Book a Call →</Link>
          </Button>
        </div>

        <button className="lg:hidden text-foreground p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-[72px] bg-background/98 backdrop-blur-2xl z-40 flex flex-col items-center justify-center gap-6 animate-fade-in">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-2xl font-semibold transition-colors ${location.pathname === link.to ? "gradient-text" : "text-foreground"}`}
            >
              {link.label}
            </Link>
          ))}
          <Button asChild size="lg" className="rounded-full px-8 mt-4">
            <Link to="/contact">Book a Call →</Link>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
