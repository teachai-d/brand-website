'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';

const projects = [
  {
    id: 1,
    title: '클래스 랜딩 페이지',
    category: 'Website Design',
    desc: '초보자를 위한 AI 강의 랜딩페이지',
    bg: '#E8F3EC',
    accent: '#0D593C',
    emoji: '🌿',
  },
  {
    id: 2,
    title: '강사 브랜드 패키지',
    category: 'Brand Identity',
    desc: '따뜻한 색감의 1인 강사 브랜딩 시스템',
    bg: '#FDE8EA',
    accent: '#F29CA3',
    emoji: '🌸',
  },
  {
    id: 3,
    title: '유튜브 채널 아트',
    category: 'Thumbnail Design',
    desc: '구독자 10만 채널의 아이덴티티 디자인',
    bg: '#F5E6D3',
    accent: '#D4A373',
    emoji: '✨',
  },
  {
    id: 4,
    title: 'AI 활용 워크북',
    category: 'Educational Content',
    desc: '30페이지 분량 AI 실습 워크북 디자인',
    bg: '#EEF0FD',
    accent: '#7B86D4',
    emoji: '📘',
  },
  {
    id: 5,
    title: '온라인 클래스 커버',
    category: 'Thumbnail Design',
    desc: '클릭률 3배 높인 강의 커버 시리즈',
    bg: '#F0F4F1',
    accent: '#4A9B6F',
    emoji: '🎯',
  },
];

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="bg-[#F9FAF8] py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-10 mb-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <SectionTitle
            eyebrow="포트폴리오"
            title="직접 만든 결과물로 증명합니다"
            accentWords={['증명']}
            subtitle="결과로 말하는 200개 이상의 프로젝트 중 일부입니다."
            align="left"
          />
          <a
            href="#contact"
            className="shrink-0 flex items-center gap-1.5 text-[#0D593C] text-sm font-semibold hover:underline underline-offset-4"
          >
            의뢰하기 <ArrowUpRight size={15} />
          </a>
        </div>
      </div>

      {/* Carousel */}
      <div
        className="flex gap-5 overflow-x-auto px-6 md:px-10 pb-4 scrollbar-hide"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {projects.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            className="shrink-0 w-[260px] md:w-[300px] rounded-2xl overflow-hidden bg-white border border-[#E5E5E5] hover:shadow-lg transition-shadow duration-300 group cursor-pointer"
            style={{ scrollSnapAlign: 'start' }}
          >
            {/* Image area */}
            <div
              className="h-48 flex items-center justify-center text-5xl relative overflow-hidden"
              style={{ backgroundColor: p.bg }}
            >
              <span className="group-hover:scale-110 transition-transform duration-300">{p.emoji}</span>
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                style={{ backgroundColor: p.accent }}
              />
            </div>

            {/* Info */}
            <div className="p-5 flex flex-col gap-2">
              <span
                className="text-[11px] font-semibold tracking-wider uppercase"
                style={{ color: p.accent }}
              >
                {p.category}
              </span>
              <h3 className="text-base font-bold text-[#1A1A1A]">{p.title}</h3>
              <p className="text-xs text-[#666666] leading-relaxed">{p.desc}</p>
            </div>
          </motion.div>
        ))}

        {/* CTA Card */}
        <a
          href="#contact"
          className="shrink-0 w-[260px] md:w-[300px] rounded-2xl border-2 border-dashed border-[#CFE3D8] flex flex-col items-center justify-center gap-3 hover:border-[#0D593C] hover:bg-[#E8F3EC] transition-all duration-300 group cursor-pointer"
          style={{ scrollSnapAlign: 'start', minHeight: '280px' }}
        >
          <span className="text-3xl">🌱</span>
          <span className="text-sm font-semibold text-[#666666] group-hover:text-[#0D593C] transition-colors text-center">
            다음 프로젝트는<br />당신의 이야기예요
          </span>
          <span className="text-xs text-[#0D593C] font-medium border border-[#0D593C] px-4 py-1.5 rounded-full">
            작업문의 →
          </span>
        </a>
      </div>
    </section>
  );
}
