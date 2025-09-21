import React, { type FC, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import SocialMedia from "./SocialMedia";
import { ArrowUpRight } from "lucide-react";

interface TherapyProps {
  name: string;
  index: number;
  description: string;
}

// Plus Icon Component
function PlusIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

const Therapy: FC<TherapyProps> = ({ name, index, description }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const refButton = useRef<HTMLButtonElement>(null);
  const refDrawer = useRef<HTMLDivElement>(null);

  function toggleDrawer(open: boolean) {
    const tl = gsap.timeline({
      defaults: { ease: "power4.out", duration: 0.35 },
    });

    const plusIcon = refButton.current?.querySelector<SVGElement>("svg");
    const drawer = refDrawer.current;
    const drawerContent = drawer?.querySelector(".drawer-content");
    const socialMediaLinks =
      drawer?.querySelectorAll<HTMLAnchorElement>(".social-media a");

    const cta = drawer?.querySelector(".cta a");

    if (!plusIcon || !drawer || !drawerContent || !socialMediaLinks || !cta)
      return;

    const header = document.querySelector("header");

    tl.clear();

    if (open) {
      // Open animation
      tl.to(plusIcon, {
        rotation: 45,
        transformOrigin: "center center",
      })
        .to(
          header,
          {
            autoAlpha: 0,
            duration: 0.2,
          },
          "<0.1",
        )

        .to(
          drawer,
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            visibility: "visible",
            duration: 0.5,
            ease: "power2.in",
          },
          "-=0.4",
        )

        .to(
          drawerContent,
          {
            x: 0,
            opacity: 1,
            ease: "elastic.out(1, 0.75)",
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
        )
        .to(
          cta,
          {
            opacity: 1,
            x: 0,
            ease: "power2.in",
            duration: 0.2,
          },
          "<",
        );
    } else {
      // Close animation
      tl.to(cta, {
        opacity: 0,
        x: 20,
        ease: "power2.out",
        duration: 0.1,
      })
        .to(
          socialMediaLinks,
          {
            opacity: 0,
            x: 20,
            stagger: 0.1,
            ease: "power2.out",
            duration: 0.2,
          },
          ">",
        )
        .to(
          drawerContent,
          {
            x: 100,
            opacity: 0,
            ease: "power2.out",
          },
          "-=0.1",
        )
        .to(
          drawer,
          {
            clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.3",
        )
        .to(header, { autoAlpha: 1, duration: 0.2 })
        .to(drawer, {
          visibility: "hidden",
        })

        .to(plusIcon, { rotation: 0 }, "-=0.5");
    }
  }

  const toggleMenu = () => {
    setIsOpen((prev) => {
      const newState = !prev;
      toggleDrawer(newState);
      return newState;
    });
  };

  const handleClose = () => {
    setIsOpen(false);
    toggleDrawer(false);
  };

  useEffect(() => {
    if (isOpen) {
      // Guardar la posición actual del scroll
      const currentScrollY = window.scrollY;
      setScrollPosition(currentScrollY);

      // Deshabilitar scroll del body
      document.body.style.overflow = "hidden";

      // Deshabilitar Lenis si existe
      const lenisInstance = (window as any).lenis;
      if (lenisInstance) {
        lenisInstance.stop();
      }

      // Prevenir scroll con touch events en iOS
      const preventScroll = (e: TouchEvent) => {
        e.preventDefault();
      };

      document.addEventListener("touchmove", preventScroll, { passive: false });
      (window as any).preventScrollHandler = preventScroll;
    } else {
      // Rehabilitar scroll del body
      document.body.style.overflow = "";

      // Restaurar la posición del scroll
      window.scrollTo(0, scrollPosition);

      // Rehabilitar Lenis si existe
      const lenisInstance = (window as any).lenis;
      if (lenisInstance) {
        lenisInstance.start();
      }

      // Remover prevención de scroll en touch
      const preventScrollHandler = (window as any).preventScrollHandler;
      if (preventScrollHandler) {
        document.removeEventListener("touchmove", preventScrollHandler);
        delete (window as any).preventScrollHandler;
      }
    }

    return () => {
      // Cleanup: asegurar que el scroll se rehabilite
      document.body.style.overflow = "";

      const lenisInstance = (window as any).lenis;
      if (lenisInstance) {
        lenisInstance.start();
      }

      const preventScrollHandler = (window as any).preventScrollHandler;
      if (preventScrollHandler) {
        document.removeEventListener("touchmove", preventScrollHandler);
        delete (window as any).preventScrollHandler;
      }
    };
  }, [isOpen, scrollPosition]);

  // Initialize drawer content position for animation
  useEffect(() => {
    const drawerContent = refDrawer.current?.querySelector(".drawer-content");
    const socialMediaLinks =
      refDrawer.current?.querySelectorAll(".social-media a");
    const cta = refDrawer.current?.querySelector(".cta a");

    if (drawerContent) {
      gsap.set(drawerContent, { x: 100, opacity: 0 });
    }

    if (socialMediaLinks) {
      gsap.set(socialMediaLinks, { opacity: 0, x: 20 });
    }

    if (cta) {
      gsap.set(cta, { opacity: 0, x: 20 });
    }
  }, []);

  return (
    <>
      {/* Therapy Button */}

      <div className="therapy-item ">
        <button
          ref={refButton}
          onClick={toggleMenu}
          className="w-full flex items-center justify-between text-left hover:text-golden transition-colors duration-300 group"
          aria-expanded={isOpen}
          aria-label={`Ver descripción de ${name}`}
        >
          <p className="text-2xl tracking-wider uppercase font-mono">
            <span className="text-golden">{index + 1}.</span>
            <span className="group-hover:text-golden transition-colors duration-300">
              {name}
            </span>
          </p>

          <PlusIcon className="w-6 h-6 text-golden transition-transform duration-300" />
        </button>
      </div>

      {/* Drawer Overlay */}

      <div
        ref={refDrawer}
        className="fixed   inset-0 h-dvh flex flex-col justify-center items-end px-4 bg-gray-900/95 backdrop-blur-lg z-40 invisible"
        style={{
          clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
        }}
      >
        <img
          src="/therapies.webp"
          className="-z-10 mask-b-from-2.5 w-full  h-dvh opacity-5 absolute  mix-blend-luminosity inset-0 object-cover"
          alt=""
        />{" "}
        {/* Botón de cerrar en la esquina superior derecha */}
        <button
          onClick={handleClose}
          className="absolute top-8  right-8 w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-200 drawer-content"
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
        {/* Social Media Icons */}
        <SocialMedia />
        {/* Therapy Content */}
        <div className="drawer-content max-w-lg pr-4">
          <div className="text-left">
            <h2 className="text-2xl font-display font-light uppercase tracking-wide text-golden mb-6">
              {name}
            </h2>

            <div>
              <p className="text-white/90 leading-relaxed tracking-wide text-lg text-left text-pretty">
                {description}
              </p>
            </div>
          </div>
        </div>
        {/* CTA */}
        <div className="mt-8 cta">
          <a
            href="/todo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-golden border text-golden mt-8   px-6 py-3  g hover:bg-golden/10 transition-colors duration-300"
          >
            Pide cita <ArrowUpRight />
          </a>
        </div>
      </div>

      {/* Background Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/20 z-30" onClick={handleClose} />
      )}
    </>
  );
};

export default Therapy;
