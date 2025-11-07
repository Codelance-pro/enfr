import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Moon, Sun, Building2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Gallery", href: "/gallery" },
  { name: "FAQ", href: "/faq" },
];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-2 group">
            <div className="bg-gradient-primary p-2 rounded-lg shadow-md group-hover:shadow-glow transition-all duration-300">
              <Building2 className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">
              Traders
            </span>
          </Link>
        </div>
        
        {/* Mobile controls */}
        <div className="flex lg:hidden gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="hover:bg-secondary text-foreground"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(true)}
            className="hover:bg-secondary text-foreground"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors duration-200 relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Desktop controls */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="hover:bg-secondary text-foreground"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
          <Button 
            asChild 
            variant="outline" 
            className="border-border text-foreground hover:bg-secondary"
          >
            <Link to="/auth/login">Vendor Login</Link>
          </Button>
          <Button 
            asChild 
            className="bg-gradient-primary hover:opacity-90 text-primary-foreground font-semibold"
          >
            <Link to="/auth/register">Get Started</Link>
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-border lg:hidden"
            >
              <div className="flex items-center justify-between">
                <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                  <div className="bg-gradient-primary p-2 rounded-lg">
                    <Building2 className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <span className="text-lg font-bold text-foreground">Traders</span>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-foreground"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <div className="mt-6 flow-root">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-foreground hover:bg-secondary transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="space-y-2 py-6 border-t border-border">
                  <Link
                    to="/auth/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-foreground hover:bg-secondary"
                  >
                    Vendor Login
                  </Link>
                  <Link
                    to="/auth/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 bg-gradient-primary text-primary-foreground text-center font-semibold"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};