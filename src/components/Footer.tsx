import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-white/[0.06] pt-16 pb-8 bg-background">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        <div>
          <Link to="/" className="text-xl font-extrabold mb-4 block">
            <span className="gradient-text">O</span>ptimizer360
          </Link>
          <p className="text-sm text-muted-foreground mb-2 leading-relaxed">AI-Native Products. Autonomous Systems. Real Revenue.</p>
          <p className="text-xs text-muted-foreground/60">Bengaluru, India</p>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[2px] text-foreground/60 mb-5">Products</h4>
          <div className="flex flex-col gap-3">
            {[
              { to: "/products/are", label: "ARE" },
              { to: "/products", label: "Accounting Intelligence" },
              { to: "/products", label: "Facility Management" },
              { to: "/products", label: "Voice Agent" },
              { to: "/products", label: "Patient Care System" },
              { to: "/products", label: "Custom AI Builds" },
            ].map(l => (
              <Link key={l.label} to={l.to} className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">{l.label}</Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[2px] text-foreground/60 mb-5">Company</h4>
          <div className="flex flex-col gap-3">
            {[
              { to: "/about", label: "About" },
              { to: "/founder", label: "Founder" },
              { to: "/solutions", label: "Solutions" },
              { to: "/case-studies/aptech", label: "Case Studies" },
              { to: "/pricing", label: "Pricing" },
              { to: "/contact", label: "Contact" },
            ].map(l => (
              <Link key={l.label} to={l.to} className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">{l.label}</Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[2px] text-foreground/60 mb-5">Our Promise</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            First lead in Week 4. 90-day ROAS guarantee. Month 3 refunded if we miss.
          </p>
          <div className="mt-6 p-4 glass-card rounded-lg">
            <p className="text-xs gradient-text font-semibold">Performance Guaranteed</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.06] pt-6 text-center">
        <p className="text-xs text-muted-foreground/50">© 2026 Optimizer360. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
