'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sprout, ChevronDown } from 'lucide-react';
import Button from '@/components/ui/Button';

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
});

const stats = [
  { value: '200+', label: '완성된 프로젝트' },
  { value: '98%',  label: '재의뢰율' },
  { value: '5년+', label: '강의 · 디자인 경력' },
];

const accordionItems = [
  {
    id: 1,
    title: 'Web Design',
    imageUrl: '/image/WEBDESIGN1.png',
    objectFit: 'cover' as const,
    objectPosition: 'center',
    bgColor: '#1A1A1A',
  },
  {
    id: 2,
    title: 'Product Details Page',
    imageUrl: '/image/page.png',
    objectFit: 'cover' as const,
    objectPosition: 'center',
    bgColor: '#1A1A1A',
  },
  {
    id: 3,
    title: 'Logo',
    imageUrl: '/image/logo.png',
    objectFit: 'contain' as const,
    objectPosition: 'center',
    bgColor: '#F0F0F2',
  },
  {
    id: 4,
    title: 'Portfolio',
    imageUrl: '/image/port.png',
    objectFit: 'contain' as const,
    objectPosition: 'center',
    bgColor: '#0D4A30',
  },
];

interface AccordionItemProps {
  item: (typeof accordionItems)[0];
  isActive: boolean;
  onMouseEnter: () => void;
}


function AccordionItem({ item, isActive, onMouseEnter }: AccordionItemProps) {
  return (
    <div
      className={`relative h-[450px] overflow-hidden cursor-pointer ${isActive ? 'w-[380px]' : 'w-[60px]'}`}
      style={{
        borderRadius: 'var(--radius-card, 16px)',
        transition: 'width 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
        backgroundColor: item.bgColor,
      }}
      onMouseEnter={onMouseEnter}
    >
      {/* Background Image */}
      <img
        src={item.imageUrl}
        alt={item.title}
        className="absolute inset-0 w-full h-full"
        style={{ objectFit: item.objectFit, objectPosition: item.objectPosition }}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = 'https://placehold.co/400x450/0D593C/ffffff?text=Image';
        }}
      />

      {/* Brand-colored overlay */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(160deg, rgba(13,89,60,0.55) 0%, rgba(9,69,48,0.70) 100%)' }}
      />

      {/* Caption */}
      <span
        className="absolute text-white font-semibold whitespace-nowrap"
        style={{
          fontFamily: "'Pretendard Variable', sans-serif",
          fontSize: '16px',
          letterSpacing: '0.02em',
          transition: 'bottom 0.5s cubic-bezier(0.22, 1, 0.36, 1), transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
          ...(isActive
            ? { bottom: '24px', left: '50%', transform: 'translateX(-50%) rotate(0deg)' }
            : { bottom: '96px', left: '50%', transform: 'translateX(-50%) rotate(90deg)' }),
        }}
      >
        {item.title}
      </span>

      {/* Active: bottom accent line */}
      {isActive && (
        <div
          className="absolute bottom-0 left-0 w-full h-1"
          style={{ backgroundColor: '#CFE3D8' }}
        />
      )}
    </div>
  );
}

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(3);

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-[#F9FAF8] flex items-center overflow-hidden"
    >
      {/* Decorative blobs */}
      <div
        className="absolute top-0 right-0 w-[520px] h-[520px] rounded-full opacity-30 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 70% 30%, #CFE3D8 0%, transparent 65%)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-[360px] h-[360px] rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #F29CA3 0%, transparent 70%)' }}
      />

      <div className="relative z-10 content-container px-6 md:px-10 pt-28 pb-20 w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">

          {/* Left: Copy */}
          <div className="flex flex-col gap-7 w-full md:w-1/2">
            {/* Eyebrow */}
            <motion.div variants={fadeUp(0.1)} initial="hidden" animate="show" className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 bg-[#E8F3EC] text-[#0D593C] text-xs font-semibold px-3 py-1.5 rounded-full">
                <Sprout size={12} strokeWidth={2} />
                지식의 씨앗을 심는 디자인 공방
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp(0.2)} initial="hidden" animate="show"
              className="text-[40px] md:text-[52px] font-bold text-[#1A1A1A] leading-[1.2]"
            >
              처음이어도 <span className="text-[#1A1A1A]">괜찮아요</span><br />
              함께해요.
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={fadeUp(0.32)} initial="hidden" animate="show"
              className="text-[#666666] text-base md:text-lg leading-relaxed max-w-md"
            >
              러블리디와 함께라면,<br />
              AI디자인도 온라인 강의도 처음이 두렵지 않아요.
              <br />
              <span className="text-[#0D593C] font-medium">당신의 이야기를 아름답게 만들어드립니다.</span>
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp(0.44)} initial="hidden" animate="show"
              className="flex flex-wrap gap-3"
            >
              <Button href="#contact" size="lg">함께 시작해요 →</Button>
              <Button href="#portfolio" variant="secondary" size="lg">작업물 보기</Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeUp(0.56)} initial="hidden" animate="show"
              className="flex gap-8 pt-2 border-t border-[#E5E5E5]"
            >
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col gap-0.5">
                  <span className="text-2xl font-bold text-[#0D593C]">{s.value}</span>
                  <span className="text-xs text-[#999999]">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Accordion */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="hidden md:flex w-full md:w-1/2 justify-center"
          >
            <div className="flex flex-row items-center gap-3 p-2">
              {accordionItems.map((item, index) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  isActive={index === activeIndex}
                  onMouseEnter={() => setActiveIndex(index)}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#service"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 6, 0] }}
        transition={{
          opacity: { delay: 1.2, duration: 0.5 },
          y: { repeat: Infinity, duration: 2, ease: 'easeInOut' },
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#999999] hover:text-[#0D593C] transition-colors"
        aria-label="아래로 스크롤"
      >
        <ChevronDown size={24} />
      </motion.a>
    </section>
  );
}
