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
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Función para obtener colores según el scroll
  const getMenuColors = () => {
    const isScrolled = window.scrollY > 100;
    return {
      bgClass: isScrolled ? "bg-background/95" : "bg-black/95",
      textClass: isScrolled ? "text-dark-bg" : "text-white"
    };
  };

  useGSAP(
    () => {
      if (!menuRef.current || !linksRef.current) return;

      const menu = menuRef.current;
      const links = gsap.utils.toArray<HTMLElement>(linksRef.current.children);

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const lockScroll = (lock: boolean) =>
        document.documentElement.classList.toggle("no-scroll", lock);

      // Limpiar timeline anterior si existe
      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      // Estado base
      gsap.set(menu, {
        willChange: "transform, opacity",
        width: "100vw",
        right: 0,
        left: "auto",
      });

      if (isOpen) {
        lockScroll(true);

        // Obtener colores apropiados para el estado actual del scroll
        const colors = getMenuColors();
        
        // Aplicar colores iniciales
        menu.className = `mobile-menu fixed h-dvh inset-0 z-[60] mt-[72px] backdrop-blur-sm ${colors.bgClass} flex`;
        
        // Aplicar color de texto a los links
        links.forEach((link) => {
          link.className = link.className.replace(/text-(white|dark-bg)/g, colors.textClass);
        });

        // Crear nueva timeline para la apertura
        timelineRef.current = gsap.timeline({ 
          defaults: { ease: reduceMotion ? "none" : "power3.out" } 
        });

        // Configuración inicial
        gsap.set(links, {
          willChange: "transform, opacity",
          visibility: "hidden",
          opacity: 0,
          x: 160,
        });

        if (reduceMotion) {
          timelineRef.current
            .set(menu, { display: "flex", pointerEvents: "auto", opacity: 1 })
            .set(links, { visibility: "visible", opacity: 1, x: 0 });
        } else {
          timelineRef.current
            .fromTo(
              menu,
              { xPercent: 100, opacity: 0 },
              { 
                duration: 0.6, 
                xPercent: 0, 
                opacity: 1, 
                ease: "power3.out",
                onStart: () => {
                  gsap.set(menu, { display: "flex", pointerEvents: "auto" });
                }
              }
            )
            .to(
              links,
              {
                duration: 0.4,
                opacity: 1,
                visibility: "visible",
                x: 0,
                stagger: { each: 0.06, from: "start" },
                ease: "power3.out",
              },
              "-=0.3"
            );
        }

        // Listener para actualizar colores durante scroll
        const updateColorsOnScroll = () => {
          if (!isOpen) return;
          const newColors = getMenuColors();
          
          // Actualizar fondo del menú
          menu.className = menu.className.replace(/bg-(black|background)\/95/g, newColors.bgClass);
          
          // Actualizar color de texto de los links
          links.forEach((link) => {
            link.className = link.className.replace(/text-(white|dark-bg)/g, newColors.textClass);
          });
        };

        window.addEventListener("scroll", updateColorsOnScroll);
        
        // Limpiar listener cuando el menú se cierre
        timelineRef.current.eventCallback("onComplete", () => {
          window.removeEventListener("scroll", updateColorsOnScroll);
        });

      } else if (getComputedStyle(menu).display !== "none") {
        // Animación de cierre
        timelineRef.current = gsap.timeline({
          defaults: { ease: reduceMotion ? "none" : "power2.in" },
          onComplete: () => {
            gsap.set(menu, {
              display: "none",
              pointerEvents: "none",
              xPercent: 100,
            });
            gsap.set(links, { clearProps: "all" });
            lockScroll(false);
            
            // Limpiar timeline
            if (timelineRef.current) {
              timelineRef.current.kill();
              timelineRef.current = null;
            }
          },
        });

        if (reduceMotion) {
          timelineRef.current.to(menu, { duration: 0.15, opacity: 0 });
        } else {
          timelineRef.current
            .to(links, {
              duration: 0.2,
              opacity: 0,
              x: -20,
              stagger: { each: 0.04, from: "end" },
            })
            .to(
              menu,
              {
                duration: 0.4,
                xPercent: 100,
                opacity: 0,
              },
              "-=0.1"
            );
        }
      }
    },
    { dependencies: [isOpen] }
  );

  const handleLinkClick = () => {
    onClose();
  };

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
      // Asegurar que el scroll se desbloquee al desmontar
      document.documentElement.classList.remove("no-scroll");
    };
  }, []);

  return (
    <div
      ref={menuRef}
      className="mobile-menu fixed h-dvh inset-0 z-[60] mt-[72px] backdrop-blur-sm bg-black/95 hidden"
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
            className="text-3xl font-dm font-light text-white hover:text-golden transition-colors duration-200"
            onClick={handleLinkClick}
          >
            Terapias
          </a>
          <a
            href="#alojamiento"
            className="text-3xl font-dm font-light text-white hover:text-golden transition-colors duration-200"
            onClick={handleLinkClick}
          >
            Alojamiento
          </a>
          <a
            href="#packs"
            className="text-3xl font-dm font-light text-white hover:text-golden transition-colors duration-200"
            onClick={handleLinkClick}
          >
            Packs
          </a>
          <a
            href="#talleres"
            className="text-3xl font-dm font-light text-white hover:text-golden transition-colors duration-200"
            onClick={handleLinkClick}
          >
            Talleres
          </a>
          <a
            href="#contacto"
            className="text-3xl font-dm font-light text-white hover:text-golden transition-colors duration-200"
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
