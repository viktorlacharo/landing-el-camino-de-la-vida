import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

// Datos de ejemplo para cada slide
const slideData = [
  {
    id: 1,
    title: "Aura",
    description:
      "Caseta de madera acogedora con vistas al jardín. Perfecta para reconectar con la naturaleza.",
    image: "/house_placeholder.webp",
  },
  {
    id: 2,
    title: "Gaya",
    description:
      "Refugio sereno junto a la piscina. Un espacio ideal para la meditación y el descanso.",
    image: "/pool_placeholder.webp",
  },
  // {
  //   id: 3,
  //   title: "Espacios Comunes",
  //   description:
  //     "Áreas compartidas diseñadas para el bienestar y la conexión con otros huéspedes.",
  //   image: "/house_placeholder.webp",
  // },
];

const AccommodationsCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

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
        loop: true,
        
      
      }}
      
    >
      {/* Carousel de imágenes */}
      <div className="flex-1">
        <CarouselContent className="h-full">
          {slideData.map((slide, index) => (
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
      <div className="flex items-center justify-between mt-6 px-4">
        {/* Texto dinámico a la izquierda */}
        <div className="flex-1 max-w-md">
          <h4 className="text-xl font-semibold text-gray-900 mb-2">
            {currentSlide.title}
          </h4>
          <p className="text-sm text-gray-600 leading-relaxed">
            {currentSlide.description}
          </p>
        </div>

        {/* Flechas a la derecha */}
        <div className="flex items-center gap-2 ml-6">
          <Button
            variant="outline"
            size="icon"
            className="size-8 rounded-full"
            onClick={scrollToPrevious}
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Previous slide</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8 rounded-full"
            onClick={scrollToNext}
          >
            <ArrowRight className="h-4 w-4" />
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
