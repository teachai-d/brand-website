'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';

const items = [
  {
    id: 'click',
    title: 'UI 인터랙션 디자인',
    description: '클릭·호버 등 마이크로인터랙션으로 사용자 경험을 살아있게 만드는 GIF 작업물입니다.',
    image: '/image/gif/클릭.gif',
  },
  {
    id: 'idea',
    title: '아이디어 시각화',
    description: '기획 단계의 아이디어를 GIF 애니메이션으로 생동감 있게 표현했습니다.',
    image: '/image/gif/아이디어.gif',
  },
  {
    id: 'star',
    title: '브랜드 모션 그래픽',
    description: '브랜드 아이덴티티를 움직임으로 전달하는 스타 모션 GIF 시리즈입니다.',
    image: '/image/gif/별.gif',
  },
  {
    id: 'girl',
    title: '캐릭터 일러스트 GIF',
    description: '따뜻한 감성의 캐릭터 일러스트를 GIF로 제작하여 SNS 콘텐츠에 활용했습니다.',
    image: '/image/gif/소녀.gif',
  },
  {
    id: 'heart',
    title: '감성 소셜 콘텐츠',
    description: '손가락 하트 GIF로 팔로워와 감성적으로 소통하는 SNS 콘텐츠 제작 사례입니다.',
    image: '/image/gif/손가락하트.gif',
  },
];

export default function GiphyPortfolioSection() {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!carouselApi) return;
    const update = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };
    update();
    carouselApi.on('select', update);
    return () => { carouselApi.off('select', update); };
  }, [carouselApi]);

  return (
    <section id="giphy-portfolio" className="py-20 bg-[#F9FAF8]">
      <div className="content-container px-6 md:px-10">
        <div className="mb-10 flex items-end justify-between">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold text-[#0D593C] tracking-widest uppercase">Giphy Portfolio</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A1A1A]">
              움직이는 작업물
            </h2>
            <p className="max-w-lg text-[#666666]">
              GIF 애니메이션으로 제작된 포트폴리오입니다. 브랜딩·캐릭터·UI 인터랙션 등 다양한 분야의 작업물을 확인하세요.
            </p>
          </div>
          <div className="hidden md:flex gap-2 shrink-0">
            <Button size="icon" variant="ghost" onClick={() => carouselApi?.scrollPrev()} disabled={!canScrollPrev}>
              <ArrowLeft className="size-5" />
            </Button>
            <Button size="icon" variant="ghost" onClick={() => carouselApi?.scrollNext()} disabled={!canScrollNext}>
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{ breakpoints: { '(max-width: 768px)': { dragFree: true } } }}
        >
          <CarouselContent className="ml-0 2xl:ml-[max(8rem,calc(50vw-700px))] 2xl:mr-[max(0rem,calc(50vw-700px))] pl-6 md:pl-10">
            {items.map((item) => (
              <CarouselItem key={item.id} className="max-w-[320px] pl-5 lg:max-w-[360px]">
                <div className="group relative h-full min-h-[27rem] max-w-full overflow-hidden rounded-2xl md:aspect-[5/4] lg:aspect-[16/9]"
                  style={{ backgroundColor: '#0D4A30' }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute h-full w-full object-contain object-center transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(9,69,48,0.85) 0%, rgba(9,69,48,0.2) 60%, transparent 100%)' }} />
                  <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-6 md:p-8">
                    <div className="mb-2 text-xl font-semibold text-white">{item.title}</div>
                    <div className="mb-6 line-clamp-2 text-[#CFE3D8] text-sm">{item.description}</div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="mt-6 flex justify-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => carouselApi?.scrollTo(i)}
              aria-label={`슬라이드 ${i + 1}`}
              className={`h-2 w-2 rounded-full transition-colors ${currentSlide === i ? 'bg-[#0D593C]' : 'bg-[#0D593C]/20'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
