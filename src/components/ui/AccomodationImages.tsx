import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const images = [
  {
    src: "/house_placeholder.webp",
    alt: "Casetas Aura y Gaya - Alojamiento de bienestar",
    title: "todo",
  },
  {
    src: "/pool_placeholder.webp",
    alt: "Piscina privada - Relajación y meditación acuática",
    title: "todo",
  },
  {
    src: "/breakfast.webp",
    alt: "Desayuno saludable - Productos frescos y naturales",
    title: "todo",
  },
  {
    src: "/Houses.webp",
    alt: "Vista exterior de las casetas de madera",
    title: "todo",
  },
  {
    src: "/joao-marcelo-martins-pDC7vQrW-EM-unsplash.jpg",
    alt: "Ambiente de tranquilidad y naturaleza",
    title: "todo",
  },
];

export default function AccommodationImages() {
  const [api, setApi] = useState<CarouselApi>();
  const [_, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="">
      <Carousel
        setApi={setApi}
        className="w-full "
        opts={{ loop: false, dragFree: true }}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index} className="w-[80vw] flex-none ">
              <div
                className={cn(
                  "relative",
                  //   {
                  //     "opacity-40 scale-95": index !== current,
                  //     "opacity-100 scale-100": index === current,
                  //   },
                )}
              >
                <div
                  className="absolute  
                    top-0 left-0 w-full px-4 flex items-center gap-2 pt-4
                
                "
                >
                  <span className="   text-base font-semibold text-white uppercase ">
                    {image.title}
                  </span>
                </div>

                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full object-cover object-center  aspect-9/16 rounded-2xl"
                />

                <div
                  className="absolute  
                    bottom-0 left-0 w-full px-4 flex items-center justify-end-safe gap-2 pb-4
                
                "
                >
                  <span className=" border-2 h-fit px-4 py-0.5 text-sm border-white rounded-full text-white">
                    {index + 1}
                  </span>
                  <span className="h-fit px-4 py-0.5 border-2  text-sm border-white/70 rounded-full text-white/70">
                    {images.length}
                  </span>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
