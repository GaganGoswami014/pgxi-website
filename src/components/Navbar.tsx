import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import FestivalHeaderLayer from "./festivals/FestivalHeaderLayer";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Work", href: "#work" },
  { label: "Blog", href: "/blog", external: true },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection("#" + entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    navLinks
      .filter((link) => link.href.startsWith("#"))
      .forEach((link) => {
        const el = document.querySelector(link.href);
        if (el) observer.observe(el);
      });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const handleNav = (link: typeof navLinks[0]) => {
    setMobileOpen(false);

    if (link.external) {
      window.location.href = link.href;
      return;
    }

    if (link.href.startsWith("#")) {

      // agar blog ya kisi aur page par ho
      if (window.location.pathname !== "/") {
        window.location.href = "/" + link.href;
        return;
      }

      // home page par ho
      const element = document.querySelector(link.href);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
  };

  const goHome = () => {
    if (window.location.pathname !== "/") {
      window.location.href = "/";
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-lg shadow-sm border-b border-border/50 py-3"
          : "py-5"
      }`}
    >
      <FestivalHeaderLayer />

      <div className="container mx-auto flex items-center justify-between px-4 md:px-8 relative z-10">

        {/* LOGO */}
        <button onClick={goHome} className="flex items-center">
  <img
    src={dark ? "/logo-light.png" : "/logo-dark.png"}
    alt="PG-XI Creatives"
    className="h-16 md:h-18 w-auto"
      />
</button>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link)}
              className="relative text-base font-medium text-muted-foreground hover:text-foreground transition-colors py-1 group"            >
              {link.label}

              <span
                className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${
                  activeSection === link.href
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              />
            </button>
          ))}

          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            aria-label="Toggle theme"
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={() => handleNav({ label: "Contact", href: "#contact" })}
            className="px-5 py-2 rounded-lg text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Get Started
          </button>
        </div>

        {/* MOBILE BUTTON */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground"
            aria-label="Toggle theme"
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-foreground"
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden bg-background border-t border-border mt-2"
        >
          <div className="flex flex-col p-4 gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link)}
                className={`text-left py-3 px-3 rounded-lg transition-colors ${
                  activeSection === link.href
                    ? "text-primary bg-primary/5 font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </button>
            ))}

            <button
              onClick={() =>
                handleNav({ label: "Contact", href: "#contact" })
              }
              className="mt-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-primary text-primary-foreground"
            >
              Get Started
            </button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;