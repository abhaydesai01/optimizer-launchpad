import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-secondary/30 border-t border-border pt-16 pb-8">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        <div>
          <Link to="/" className="text-xl font-bold mb-3 block">
            <span className="text-primary">O</span>ptimizer360
          </Link>
          <p className="text-sm text-muted-foreground mb-2">AI-Native Products. Autonomous Systems. Real Revenue.</p>
          <p className="text-xs text-muted-foreground">Bengaluru, India</p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-foreground mb-4">Products</h4>
          <div className="flex flex-col gap-2">
            <Link to="/products/are" className="text-sm text-muted-foreground hover:text-primary transition-colors">ARE</Link>
            <Link to="/products" className="text-sm text-muted-foreground hover:text-primary transition-colors">Accounting Intelligence</Link>
            <Link to="/products" className="text-sm text-muted-foreground hover:text-primary transition-colors">Facility Management</Link>
            <Link to="/products" className="text-sm text-muted-foreground hover:text-primary transition-colors">Voice Agent</Link>
            <Link to="/products" className="text-sm text-muted-foreground hover:text-primary transition-colors">Patient Care System</Link>
            <Link to="/products" className="text-sm text-muted-foreground hover:text-primary transition-colors">Custom AI Builds</Link>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-foreground mb-4">Company</h4>
          <div className="flex flex-col gap-2">
            <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About</Link>
            <Link to="/founder" className="text-sm text-muted-foreground hover:text-primary transition-colors">Founder</Link>
            <Link to="/solutions" className="text-sm text-muted-foreground hover:text-primary transition-colors">Solutions</Link>
            <Link to="/case-studies/aptech" className="text-sm text-muted-foreground hover:text-primary transition-colors">Case Studies</Link>
            <Link to="/pricing" className="text-sm text-muted-foreground hover:text-primary transition-colors">Pricing</Link>
            <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-foreground mb-4">Our Promise</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            First lead in Week 4. 90-day ROAS guarantee. Month 3 refunded if we miss.
          </p>
        </div>
      </div>

      <div className="border-t border-border pt-6 text-center">
        <p className="text-xs text-muted-foreground">© 2026 Optimizer360. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
