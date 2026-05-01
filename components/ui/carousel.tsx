'use client';

import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react';
import { createContext, forwardRef, useCallback, useContext, useEffect, useState } from 'react';

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

interface CarouselProps {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  setApi?: (api: CarouselApi) => void;
}

interface CarouselContextProps extends CarouselProps {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: CarouselApi;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  scrollPrev: () => void;
  scrollNext: () => void;
}

const CarouselContext = createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const ctx = useContext(CarouselContext);
  if (!ctx) throw new Error('useCarousel must be used within a <Carousel />');
  return ctx;
}

const Carousel = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & CarouselProps>(
  ({ opts, plugins, setApi, children, className, ...props }, ref) => {
    const [carouselRef, api] = useEmblaCarousel(opts, plugins);
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    const onSelect = useCallback((api: CarouselApi) => {
      if (!api) return;
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    }, []);

    useEffect(() => {
      if (!api) return;
      onSelect(api);
      api.on('reInit', onSelect);
      api.on('select', onSelect);
      return () => { api.off('reInit', onSelect); api.off('select', onSelect); };
    }, [api, onSelect]);

    useEffect(() => { if (api && setApi) setApi(api); }, [api, setApi]);

    return (
      <CarouselContext.Provider value={{ carouselRef, api, opts, canScrollPrev, canScrollNext, scrollPrev: () => api?.scrollPrev(), scrollNext: () => api?.scrollNext() }}>
        <div ref={ref} className={className} {...props}>
          {children}
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = 'Carousel';

const CarouselContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { carouselRef } = useCarousel();
    return (
      <div ref={carouselRef} className="overflow-hidden">
        <div ref={ref} className={`flex ${className ?? ''}`} {...props} />
      </div>
    );
  }
);
CarouselContent.displayName = 'CarouselContent';

const CarouselItem = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} role="group" aria-roledescription="slide" className={`min-w-0 shrink-0 grow-0 basis-full ${className ?? ''}`} {...props} />
  )
);
CarouselItem.displayName = 'CarouselItem';

export { Carousel, CarouselContent, CarouselItem, type CarouselApi };
