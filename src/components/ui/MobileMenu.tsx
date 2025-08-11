import { useRef, useEffect, type FC } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Registrar el plugin useGSAP
gsap.registerPlugin(useGSAP);

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  // Efecto para adaptar colores según scroll
  useEffect(() => {
    const updateMenuColors = () => {
      if (!menuRef.current) return;

      const menu = menuRef.current;
      const links = linksRef.current?.children;

      if (window.scrollY > 100) {
        // Fondo claro
        menu.classList.remove("bg-black/95");
        menu.classList.add("bg-background/95");

        // Texto oscuro para todos los links
        if (links) {
          Array.from(links).forEach((link) => {
            link.classList.remove("text-white");
            link.classList.add("text-dark-bg");
          });
        }
      } else {
        // Fondo oscuro
        menu.classList.add("bg-black/95");
        menu.classList.remove("bg-background/95");

        // Texto blanco para todos los links
        if (links) {
          Array.from(links).forEach((link) => {
            link.classList.add("text-white");
            link.classList.remove("text-dark-bg");
          });
        }
      }
    };

    // Actualizar colores cuando el menú esté abierto
    if (isOpen) {
      updateMenuColors();
      window.addEventListener("scroll", updateMenuColors);
    }

    return () => {
      window.removeEventListener("scroll", updateMenuColors);
    };
  }, [isOpen]);

  useGSAP(
    () => {
      if (!menuRef.current || !linksRef.current) return;

      const menu = menuRef.current; // Drawer (panel) fijo a la derecha
      const links = gsap.utils.toArray<HTMLElement>(linksRef.current.children);
      const underlines = gsap.utils.toArray<HTMLElement>(
        linksRef.current.querySelectorAll(".menu-underline")
      );

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const lockScroll = (lock: boolean) =>
        document.documentElement.classList.toggle("no-scroll", lock);

      // Estado base
      gsap.set(menu, {
        willChange: "transform, opacity",
        width: "100vw",
        right: 0,
        left: "auto",
      });
      gsap.set(links, {
        willChange: "transform, opacity",
        visibility: "hidden",
        opacity: 0,
        x: 160,
      });
      if (underlines.length) gsap.set(underlines, { transformOrigin: "0 50%" });

      console.log("🚀 ~ MobileMenu ~ isOpen:", isOpen);
      if (isOpen) {
        lockScroll(true);

        const tl = gsap.timeline({ defaults: { ease: "elastic.in" } });

        tl.set(menu, {
          display: "flex",
          pointerEvents: "auto",
          width: "100vw",
          right: 0,
          left: "auto",
        });

        if (reduceMotion) {
          tl.fromTo(menu, { opacity: 0 }, { duration: 0.25, opacity: 1 }).set(
            links,
            { visibility: "visible", opacity: 1, x: 0 }
          );
          return;
        }

        // Drawer entra más lento y suave desde la derecha
        tl.fromTo(
          menu,
          { xPercent: 100, opacity: 0 },
          { duration: 0.8, xPercent: 0, opacity: 1, ease: "power3.in" }
        )
          // Links: fade-in desde la izquierda con opacity
          .to(
            links,
            {
              duration: 0.3,
              opacity: 1,
              visibility: "visible",
              x: 0,
              stagger: { each: 0.06, from: "start" },
              ease: "power3.out",
            },
            "-=0.4"
          )
        
        
      }
      // else if (getComputedStyle(menu).display !== "none") {
      //   const tl = gsap.timeline({
      //     defaults: { ease: "power2.in" },
      //     onComplete: () => {
      //       // Oculta panel y limpia estilos de links
      //       gsap.set(menu, {
      //         display: "none",
      //         pointerEvents: "none",
      //         xPercent: 100,
      //       });
      //       gsap.set(links, { clearProps: "all" });
      //       lockScroll(false);
      //     },
      //   });

      //   if (reduceMotion) {
      //     tl.to(menu, { duration: 0.15, opacity: 0 });
      //     return;
      //   }

      //   // Cierre: desvanecer links ligeramente y sacar el panel a la derecha
      //   tl.to(links, {
      //     duration: 0.16,
      //     opacity: 0,
      //     x: -8,
      //     stagger: { each: 0.04, from: "end" },
      //   }).to(
      //     menu,
      //     {
      //       duration: 0.28,
      //       xPercent: 100,
      //       opacity: 0.9,
      //     },
      //     "-=0.06"
      //   );
      // }
    },
    { dependencies: [isOpen] }
  );

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <div
      ref={menuRef}
      className="mobile-menu fixed h-dvh inset-0 z-[60] mt-[72px]  backdrop-blur-sm bg-black/95 hidden"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <nav className="flex flex-col justify-center items-center h-full w-full space-y-12 px-8">
        <div ref={linksRef} className="flex flex-col items-center space-y-12">
          <a
            href="#terapias"
            className="text-3xl font-dm font-light text-white hover:text-golden  transition-colors duration-200"
            onClick={handleLinkClick}
          >
            Terapias
          </a>
          <a
            href="#alojamiento"
            className="text-3xl font-dm font-light text-white hover:text-golden  transition-colors duration-200"
            onClick={handleLinkClick}
          >
            Alojamiento
          </a>
          <a
            href="#packs"
            className="text-3xl font-dm font-light text-white hover:text-golden  transition-colors duration-200"
            onClick={handleLinkClick}
          >
            Packs
          </a>
          <a
            href="#talleres"
            className="text-3xl font-dm font-light text-white hover:text-golden  transition-colors duration-200"
            onClick={handleLinkClick}
          >
            Talleres
          </a>
          <a
            href="#contacto"
            className="text-3xl font-dm font-light text-white hover:text-golden  transition-colors duration-200"
            onClick={handleLinkClick}
          >
            Contacto
          </a>
        </div>
      </nav>
    </div>
  );
};

export default MobileMenu;
