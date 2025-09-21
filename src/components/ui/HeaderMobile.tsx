import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Logo from "./Logo";
import SocialMedia from "./SocialMedia";

interface NavItem {
  href: string;
  title: string;
}

const NAV_ITEMS: NavItem[] = [
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
    href: "#talleres",
    title: "Talleres",
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
          "<",
        )
        .to(
          navbarList,
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            visibility: "visible",
          },
          "-=0.4",
        )
        .to(
          navbarItems,
          {
            x: 0,
            opacity: 1,
            ease: "elastic.out(1, 0.75)",
            stagger: 0.1,
          },
          "-=0.2",
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
          "<",
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
          "-=0.1",
        )
        .to(
          navbarList,
          {
            clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
          },
          "-=0.3",
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
