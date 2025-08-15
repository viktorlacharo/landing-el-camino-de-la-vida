import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Logo from "./Logo";

interface NavItem {
  href: string;
  title: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    href: "#talleres",
    title: "Talleres",
  },

  {
    href: "#alojamiento",
    title: "Alojamiento",
  },

  {
    href: "#terapias",
    title: "Terapias",
  },

  {
    href: "#packs",
    title: "Packs",
  },

  {
    href: "#contacto",
    title: "Contacto",
  },
];

// Burger Icon Component
function BurgerIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="6" width="18" height="1" rx="1" />
      <rect x="3" y="16" width="18" height="1" rx="1" />
    </svg>
  );
}

// Social Media
function SocialMedia() {
  return (
    <div className="flex space-x-6 absolute right-10 top-24 justify-end w-fit social-media">
      {/* Instagram */}
      <a
        href="https://instagram.com/elcaminodelavida"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white/60 hover:text-golden transition-all duration-300 transform hover:scale-110"
        aria-label="Instagram"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      </a>

      {/* Facebook */}
      <a
        href="https://facebook.com/elcaminodelavida"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white/60 hover:text-golden transition-all duration-300 transform hover:scale-110"
        aria-label="Facebook"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </a>

      {/* WhatsApp */}
      <a
        href="https://wa.me/34123456789"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white/60 hover:text-golden transition-all duration-300 transform hover:scale-110"
        aria-label="WhatsApp"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488" />
        </svg>
      </a>
    </div>
  );
}

// Mobile Menu Component - Solo para móvil
export function HeaderMobile() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState("");
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const refButton = useRef<HTMLButtonElement>(null);
  const refNavbarList = useRef<HTMLDivElement>(null);

  // Track current hash for active states
  useEffect(() => {
    const updateHash = () => setCurrentHash(window.location.hash);
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  function toggleNavbar(open: boolean) {
    const tl = gsap.timeline({
      defaults: { ease: "power4.out", duration: 0.35 },
    });

    const burgerRect =
      refButton.current?.querySelectorAll<SVGRectElement>("svg rect");
    const navbarList = refNavbarList.current;
    const navbarItems = navbarList?.querySelectorAll(".navbar-item");
    const socialMediaLinks =
      navbarList?.querySelectorAll<HTMLAnchorElement>(".social-media a");

    if (!burgerRect || !navbarList || !navbarItems || !socialMediaLinks) return;

    // Animación de apertura
    tl.clear(); // Resetea la animación anterior

    if (open) {
      // Open animation
      tl.to(burgerRect[0], {
        y: 5,
        rotation: -45,
        transformOrigin: "50% center",
      })
        .to(
          burgerRect[1],
          {
            y: -5,
            rotation: 45,
            transformOrigin: "55% 55%",
          },
          "<"
        )
        .to(
          navbarList,
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            visibility: "visible",
          },
          "-=0.4"
        )
        .to(
          navbarItems,
          {
            x: 0,
            opacity: 1,
            ease: "elastic.out(1, 0.75)",
            stagger: 0.1,
          },
          "-=0.2"
        )
        .to(
          socialMediaLinks,
          {
            opacity: 1,
            x: 0,
            stagger: 0.05,
            ease: "elastic.inOut(0.75, 0.25)",
            duration: 0.3,
          },
          "<"
        );
    } else {
      // Close animation
      tl.to(socialMediaLinks, {
        opacity: 0,
        x: 20,
        stagger: 0.1,
        ease: "power2.out",
        duration: 0.2,
      })
        .to(
          navbarItems,
          {
            x: 100,
            opacity: 0,
            ease: "power2.out",
            stagger: 0.05,
          },
          "-=0.1"
        )
        .to(
          navbarList,
          {
            clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
          },
          "-=0.3"
        )
        .to(navbarList, {
          visibility: "hidden",
        })
        .to(burgerRect[0], { y: 0, rotation: 0 }, "-=0.5")
        .to(burgerRect[1], { y: 0, rotation: 0 }, "<");
    }
  }

  const toggleMenu = () => {
    setIsOpen((prev) => {
      const newState = !prev;
      toggleNavbar(newState);
      return newState;
    });
  };

  const handleItemClick = () => {
    setIsOpen(false);
    toggleNavbar(false);
  };

  useEffect(() => {
    if (isOpen) {
      // Guardar la posición actual del scroll
      const currentScrollY = window.scrollY;
      setScrollPosition(currentScrollY);
      console.log("🚀 ~ HeaderMobile ~ currentScrollY:", currentScrollY);

      // Deshabilitar scroll del body con múltiples métodos
      document.body.style.overflow = "hidden";
      //   document.body.style.height = "100vh";
      //   document.body.style.position = "fixed";
      //   document.body.style.width = "100%";
      //   document.body.style.top = `-${currentScrollY}px`; // Mantener la posición visual
      //   document.body.classList.add("mobile-menu-open");

      // Deshabilitar Lenis si existe
      const lenisInstance = window.lenis;

      //
      if (lenisInstance) {
        lenisInstance.stop();
      }

      // Prevenir scroll con touch events en iOS
      const preventScroll = (e: TouchEvent) => {
        e.preventDefault();
      };

      document.addEventListener("touchmove", preventScroll, { passive: false });

      // Guardar la función para poder removerla después
      window.preventScrollHandler = preventScroll;
    } else {
      // Rehabilitar scroll del body
      document.body.style.overflow = "";
      document.body.style.height = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      document.body.classList.remove("mobile-menu-open");

      // Restaurar la posición del scroll
      window.scrollTo(0, scrollPosition);

      // Rehabilitar Lenis si existe
      const lenisInstance = window.lenis;
      if (lenisInstance) {
        lenisInstance.start();
      }

      // Remover prevención de scroll en touch
      const preventScrollHandler = window.preventScrollHandler;
      if (preventScrollHandler) {
        document.removeEventListener("touchmove", preventScrollHandler);
        delete window.preventScrollHandler;
      }
    }

    return () => {
      // Cleanup: asegurar que el scroll se rehabilite
      document.body.style.overflow = "";
      document.body.style.height = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      document.body.classList.remove("mobile-menu-open");

      const lenisInstance = window.lenis;
      if (lenisInstance) {
        lenisInstance.start();
      }

      // Cleanup touch event listener
      const preventScrollHandler = window.preventScrollHandler;
      if (preventScrollHandler) {
        document.removeEventListener("touchmove", preventScrollHandler);
        delete window.preventScrollHandler;
      }
    };
  }, [isOpen, scrollPosition]);

  // Initialize navbar items position for animation
  useEffect(() => {
    const navbarItems = refNavbarList.current?.querySelectorAll(".navbar-item");
    const socialMediaLinks =
      refNavbarList.current?.querySelectorAll(".social-media a");

    if (navbarItems) {
      gsap.set(navbarItems, { x: 100, opacity: 0 });
    }

    if (socialMediaLinks) {
      gsap.set(socialMediaLinks, { opacity: 0, x: 20 });
    }
  }, []);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        ref={refButton}
        onClick={toggleMenu}
        className="burger px-3 py-2  rounded-lg flex justify-center items-center cursor-pointer transition-colors duration-200 relative "
        aria-label="Toggle mobile menu"
      >
        <BurgerIcon className="w-5 h-5" />
      </button>

      {/* Mobile Navigation Overlay */}
      <div
        ref={refNavbarList}
        className="fixed inset-0 h-dvh flex flex-col justify-end items-end px-4 pb-16 bg-gray-900/95 backdrop-blur-lg z-40 invisible"
        style={{
          clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
        }}
      >
        {/* Logo en el menú móvil */}
        <div className="absolute top-8 left-8 flex items-center navbar-item">
          <Logo />
        </div>

        {/* Botón de cerrar en la esquina superior derecha */}
        <button
          onClick={handleItemClick}
          className="absolute top-8 right-8 w-10 h-10 flex items-center justify-center rounded-full   transition-colors duration-200 navbar-item"
          aria-label="Cerrar menú"
        >
          <svg
            className="w-6 h-6 text-white/80"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* botones de redes sociales */}
        <SocialMedia />

        <nav className="flex flex-col items-end space-y-8">
          {NAV_ITEMS.map(({ href, title }) => (
            <div key={href} className="navbar-item">
              <a
                href={href}
                onClick={handleItemClick}
                className={`
                  text-3xl font-display font-light uppercase tracking-wide text-right
                  transition-colors duration-300 
                  hover:text-golden relative group
                  ${currentHash === href ? "text-golden" : "text-white/80"}
                `}
              >
                {title}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-golden transition-all duration-300 group-hover:w-full"></div>
              </a>
            </div>
          ))}
        </nav>
      </div>

      {/* Background Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30"
          onClick={() => {
            setIsOpen(false);
            toggleNavbar(false);
          }}
        />
      )}
    </>
  );
}
