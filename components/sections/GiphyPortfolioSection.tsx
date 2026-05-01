'use client';

const images = [
  '/image/gif/클릭.gif',
  '/image/gif/아이디어.gif',
  '/image/gif/별.gif',
  '/image/gif/소녀.gif',
  '/image/gif/손가락하트.gif',
  '/image/gif/말풍선.gif',
  '/image/gif/번개.gif',
];

const duplicatedImages = [...images, ...images];

export default function GiphyPortfolioSection() {
  return (
    <section id="giphy-portfolio" className="w-full relative overflow-hidden py-20" style={{ backgroundColor: '#0D593C' }}>
      {/* Section header */}
      <div className="relative z-10 text-center mb-12">
        <span className="text-xs font-semibold text-[#CFE3D8] tracking-widest uppercase">Giphy Portfolio</span>
        <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-medium text-white">
          움직이는 작업물
        </h2>
        <p className="mt-4 text-[#CFE3D8]/80 text-sm max-w-md mx-auto">
          GIF 애니메이션으로 제작된 브랜딩·캐릭터·UI 인터랙션 작업물입니다.
        </p>
      </div>

      {/* Infinite scroll */}
      <div className="relative z-10 w-full scroll-container-green">
        <div className="infinite-scroll flex gap-6 w-max">
          {duplicatedImages.map((src, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-2xl overflow-hidden shadow-xl transition-transform duration-300 hover:scale-105"
              style={{ backgroundColor: '#F0F4F1' }}
            >
              <img
                src={src}
                alt={`GIF 작업물 ${(index % images.length) + 1}`}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
