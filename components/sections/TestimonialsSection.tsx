'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';

interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    text: "처음엔 디자인을 전혀 몰랐는데, 러블리디 선생님 덕분에 제 강의 브랜딩을 직접 만들 수 있게 됐어요. 정말 따뜻하게 가르쳐주셔서 감사해요.",
    name: '김OO',
    role: '온라인 강의 크리에이터',
    image: 'https://api.dicebear.com/9.x/thumbs/svg?seed=kim1',
  },
  {
    text: "의뢰한 랜딩 페이지 오픈 후 수강 신청이 3배 늘었어요. 단순한 디자인이 아니라 전략까지 담아주시는 게 다른 것 같아요.",
    name: '이OO',
    role: '1인 교육 기업 대표',
    image: 'https://api.dicebear.com/9.x/thumbs/svg?seed=lee2',
  },
  {
    text: "강의 썸네일 작업을 맡겼는데 클릭률이 눈에 띄게 올랐어요. 브랜드 분위기를 정말 잘 이해해 주셨어요.",
    name: '박OO',
    role: 'YouTube 강의 채널 운영자',
    image: 'https://api.dicebear.com/9.x/thumbs/svg?seed=park3',
  },
  {
    text: "PPT 템플릿 제작을 의뢰했는데, 제 수업 스타일에 딱 맞게 커스터마이징해 주셔서 정말 만족스러워요.",
    name: '최OO',
    role: '초등학교 교사',
    image: 'https://api.dicebear.com/9.x/thumbs/svg?seed=choi4',
  },
  {
    text: "AI 툴 활용법 강의를 듣고 업무 속도가 2배 빨라졌어요. 실무에 바로 쓸 수 있는 내용이라 특히 좋았습니다.",
    name: '정OO',
    role: '프리랜서 강사',
    image: 'https://api.dicebear.com/9.x/thumbs/svg?seed=jung5',
  },
  {
    text: "전자책 디자인부터 홍보 콘텐츠까지 패키지로 맡겼는데, 브랜드가 훨씬 전문적으로 보이게 됐어요.",
    name: '윤OO',
    role: '교육 콘텐츠 크리에이터',
    image: 'https://api.dicebear.com/9.x/thumbs/svg?seed=yoon6',
  },
];

const col1 = testimonials.filter((_, i) => i % 2 === 0);
const col2 = testimonials.filter((_, i) => i % 2 !== 0);

const TestimonialsColumn = ({
  className,
  testimonials: items,
  duration = 15,
}: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={className}>
      <motion.div
        animate={{ translateY: '-50%' }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'linear',
          repeatType: 'loop',
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...new Array(2).fill(0).map((_, index) => (
          <React.Fragment key={index}>
            {items.map(({ text, image, name, role }, i) => (
              <div
                key={i}
                className="p-7 rounded-2xl border border-[#E5E5E5] bg-[#F9FAF8] max-w-xs w-full"
                style={{ boxShadow: '0 2px 16px rgba(13,89,60,0.07)' }}
              >
                <p className="text-[#3A3A3A] text-sm leading-relaxed">{text}</p>
                <div className="flex items-center gap-3 mt-5 pt-4 border-t border-[#F0F0F0]">
                  <img
                    width={40}
                    height={40}
                    src={image}
                    alt={name}
                    className="h-10 w-10 rounded-full bg-[#E8F3EC]"
                  />
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm text-[#1A1A1A] leading-5">{name}</span>
                    <span className="text-xs text-[#999999] leading-5">{role}</span>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))]}
      </motion.div>
    </div>
  );
};

export default function TestimonialsSection() {
  return (
    <section id="reviews" className="bg-white py-24 md:py-32 px-6 md:px-10">
      <div className="content-container flex flex-col gap-10">
        <SectionTitle
          eyebrow="후기"
          title="함께한 분들의 이야기"
          accentWords={['이야기']}
          align="center"
        />
        <div
          className="overflow-hidden h-[520px]"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center">
            <TestimonialsColumn testimonials={col1} duration={15} />
            <TestimonialsColumn testimonials={col2} duration={22} className="hidden md:block" />
          </div>
        </div>
      </div>
    </section>
  );
}
