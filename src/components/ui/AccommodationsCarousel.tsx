import React, { useState, useEffect, useCallback } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

// Datos de ejemplo para cada slide
const slideData = [
  {
    id: 1,
    title: "Caseta",
    description:
      "Caseta de madera acogedora con vistas al jardín. Perfecta para reconectar con la naturaleza.",
    image: "/house_placeholder.webp",
  },
  {
    id: 2,
    title: "Piscina",
    description:
      "Refugio sereno junto a la piscina. Un espacio ideal para la meditación y el descanso.",
    image: "/pool_placeholder.webp",
  },
  {
    id: 3,
    title: "Desayuno",
    description:
      "Delicioso desayuno casero con ingredientes frescos y locales, servido en un entorno tranquilo.",
    image: "/breakfast.webp",
  },
];

const AccommodationsCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const text = useRef(null);
  const title = useRef(null);
  const prevIndexRef = useRef<number>(0);

  useGSAP(
    () => {
      if (!api || !text.current) return;

      const currentIndex = api.selectedScrollSnap();
      const previousIndex = prevIndexRef.current;

      const tl = gsap.timeline();

      if (previousIndex !== currentIndex) {
        // Comparación simple sin loop
        const isNext = currentIndex > previousIndex;

        if (isNext) {
          tl.fromTo(
            title.current,
            { opacity: 0, x: 100 },
            { opacity: 1, x: 0, duration: 0.2, ease: "sine.in" },
          )

            .fromTo(
              text.current,
              { opacity: 0, x: 100 },
              { opacity: 1, x: 0, duration: 0.2, ease: "sine.in" },
              "<0.15",
            );
        } else {
          tl.fromTo(
            title.current,
            { opacity: 0, x: -100 },
            { opacity: 1, x: 0, duration: 0.2, ease: "sine.in" },
          )

            .fromTo(
              text.current,
              { opacity: 0, x: -100 },
              { opacity: 1, x: 0, duration: 0.2, ease: "sine.in" },
              "<0.15",
            );
        }
      }

      prevIndexRef.current = currentIndex;
    },
    { scope: text, dependencies: [current, api] },
  );

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const currentSlide = slideData[current] || slideData[0];

  const scrollToPrevious = () => {
    api?.scrollPrev();
  };

  const scrollToNext = () => {
    api?.scrollNext();
  };

  return (
    <Carousel
      setApi={setApi}
      className="w-full h-full flex flex-col"
      opts={{
        align: "start",
      }}
    >
      {/* Carousel de imágenes */}
      <div className="flex-1">
        <CarouselContent className="h-full">
          {slideData.map((slide) => (
            <CarouselItem key={slide.id} className="h-full">
              <div className="h-full rounded-2xl overflow-hidden">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover aspect-square"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </div>

      {/* Controles y texto debajo */}
      <div className="flex flex-col xs:flex-row items-center justify-between mt-6 xs:px-4 ">
        {/* Texto dinámico a la izquierda */}
        <div className="flex-1 max-w-md overflow-x-hidden">
          <h4
            className="text-xl font-semibold text-golden mb-2 carousel-title overflow-hidden"
            ref={title}
          >
            {currentSlide.title}
          </h4>
          <p
            className="text-sm text-gray-600 leading-relaxed carousel-description overflow-hidden"
            ref={text}
          >
            {currentSlide.description}
          </p>
        </div>

        {/* Flechas a la derecha */}
        <div className="flex items-center w-full mt-4 justify-end xs:w-auto gap-2 xs:ml-6">
          <Button
            variant="outline"
            size="icon"
            className={cn("size-8 rounded-full ", {
              "opacity-5 cursor-not-allowed bg-white": !api?.canScrollPrev(),
            })}
            disabled={!api?.canScrollPrev()}
            onClick={scrollToPrevious}
          >
            <ArrowLeft className="size-4 text-golden" />
            <span className="sr-only">Previous slide</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className={cn("size-8 rounded-full", {
              "opacity-5 cursor-not-allowed bg-white": !api?.canScrollNext(),
            })}
            disabled={!api?.canScrollNext()}
            onClick={scrollToNext}
          >
            <ArrowRight className="size-4 text-golden" />
            <span className="sr-only">Next slide</span>
          </Button>
        </div>
      </div>

      {/* Indicadores de puntos */}
      <div className="flex justify-center gap-2 mt-4">
        {slideData.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === current ? "bg-golden" : "bg-gray-300"
            }`}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>
    </Carousel>
  );
};

export default AccommodationsCarousel;
