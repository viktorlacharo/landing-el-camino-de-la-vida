const Logo = () => {
  return (
    <a className="flex gap-2 items-center" href="#hero">
      <img
        src="/moon_sun.webp"
        alt="El camino de la vida"
        className="w-10 h-10 object-contain"
        loading="lazy"
      />
      <span className="ml-3 font-display text-lg font-light uppercase tracking-wider text-white/80">
        El camino.
      </span>
    </a>
  );
};

export default Logo;
