import { useState, type FC } from "react";
import HamburgerButton from "./HamburgerButton";
import MobileMenu from "./MobileMenu";

const MobileMenuWrapper: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className="block md:hidden relative z-50">
        <HamburgerButton isOpen={isMenuOpen} onClick={toggleMenu} />
      </div>
      <MobileMenu isOpen={isMenuOpen} onClose={closeMenu} />
    </>
  );
};

export default MobileMenuWrapper;
