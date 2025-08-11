import { useRef, type FC } from 'react';
import gsap from 'gsap'; // <-- import GSAP
import { useGSAP } from '@gsap/react'; // <-- import the hook from our React package

gsap.registerPlugin(useGSAP);

interface HamburgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

const HamburgerButton: FC<HamburgerButtonProps> = ({ isOpen, onClick }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const line1 = line1Ref.current;
    const line2 = line2Ref.current;
    const line3 = line3Ref.current;

    if (!line1 || !line2 || !line3) return;

    if (isOpen) {
      // Animar a X
      gsap.to(line1, {
        rotation: 45,
        y: 6,
        duration: 0.3,
        ease: 'power2.inOut'
      });
      gsap.to(line2, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.inOut'
      });
      gsap.to(line3, {
        rotation: -45,
        y: -6,
        duration: 0.3,
        ease: 'power2.inOut'
      });
    } else {
      // Volver a hamburguesa
      gsap.to([line1, line3], {
        rotation: 0,
        y: 0,
        duration: 0.3,
        ease: 'power2.inOut'
      });
      gsap.to(line2, {
        opacity: 1,
        duration: 0.2,
        delay: 0.1,
        ease: 'power2.inOut'
      });
    }
  }, [isOpen]);

  return (
    <button
      ref={buttonRef}
      className="p-2 mobile-menu-btn relative z-50"
      onClick={onClick}
      aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
    >
      <div className="hamburger">
        <span 
          ref={line1Ref}
          className="block w-6 h-0.5 bg-current transition-colors duration-300 mb-1"
        />
        <span 
          ref={line2Ref}
          className="block w-6 h-0.5 bg-current transition-colors duration-300 mb-1"
        />
        <span 
          ref={line3Ref}
          className="block w-6 h-0.5 bg-current transition-colors duration-300"
        />
      </div>
    </button>
  );
};

export default HamburgerButton;
