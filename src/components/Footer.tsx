import { Instagram, Facebook, Linkedin, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const socials = [
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://www.instagram.com/pgxicreatives/",
  },
  {
    icon: Facebook,
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61584159473511",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
  },
  {
    icon: Youtube,
    label: "YouTube",
    href: "https://youtube.com",
  },
];

const Footer = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Logo + Tagline */}
        <div className="text-center md:text-left flex flex-col items-center md:items-start">

          {/* Light mode logo */}
          <img
            src="/logo-dark.png"
            alt="PG-XI Creatives"
            className="h-14 w-auto mb-2 dark:hidden"
          />

          {/* Dark mode logo */}
          <img
            src="/logo-light.png"
            alt="PG-XI Creatives"
            className="h-14 w-auto mb-2 hidden dark:block"
          />

          <p className="text-sm text-muted-foreground">
            Performance & Growth, Exponential Impact.
          </p>
        </div>

        {/* Blog + Socials */}
        <div className="flex items-center gap-4">

          {/* Blog link */}
          <Link
            to="/blog"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Blog
          </Link>

          {/* Social icons */}
          <div className="flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary-foreground hover:bg-primary hover:border-primary transition-all duration-300"
              >
                <s.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <p className="text-sm text-muted-foreground text-center md:text-right">
          © {new Date().getFullYear()} PG-XI Creatives. All rights reserved.
        </p>

      </div>
    </footer>
  );
};

export default Footer;