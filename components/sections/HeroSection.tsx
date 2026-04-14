'use client';

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
  { value: '98%', label: '재의뢰율' },
  { value: '5년+', label: '강의 · 디자인 경력' },
];

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen bg-[#F9FAF8] flex items-center overflow-hidden"
    >
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-[520px] h-[520px] rounded-full opacity-30 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 70% 30%, #CFE3D8 0%, transparent 65%)' }} />
      <div className="absolute bottom-0 left-0 w-[360px] h-[360px] rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #F29CA3 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 pt-28 pb-20 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left: Copy */}
          <div className="flex flex-col gap-7">
            {/* Eyebrow */}
            <motion.div
              variants={fadeUp(0.1)} initial="hidden" animate="show"
              className="flex items-center gap-2"
            >
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
              처음이어도<br />
              <span className="text-[#0D593C]">괜찮아요,</span><br />
              함께 시작해요.
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={fadeUp(0.32)} initial="hidden" animate="show"
              className="text-[#666666] text-base md:text-lg leading-relaxed max-w-md"
            >
              러블리디와 함께라면, AI 디자인도 온라인 강의도 처음이 두렵지 않아요.
              <br className="hidden md:block" />
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

          {/* Right: Visual Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden md:flex flex-col gap-4"
          >
            {/* Main card */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-[#E5E5E5]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#F29CA3] flex items-center justify-center text-white text-lg">
                  🌱
                </div>
                <div>
                  <p className="text-sm font-bold text-[#1A1A1A]">러블리디</p>
                  <p className="text-xs text-[#999999]">TD STUDIO 대표</p>
                </div>
              </div>
              <p className="text-[#3A3A3A] text-sm leading-relaxed mb-6">
                "디자인이 어렵게 느껴지는 분들을 위해,<br />
                따뜻하고 쉽게 알려드리는 것이 제 역할이에요. 🌸"
              </p>
              <div className="flex flex-wrap gap-2">
                {['AI 디자인', '온라인 강의', '브랜딩', '썸네일'].map((t) => (
                  <span key={t} className="text-xs bg-[#E8F3EC] text-[#0D593C] px-3 py-1 rounded-full font-medium">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className="absolute -top-4 -right-4 bg-[#F29CA3] text-white text-xs font-bold px-4 py-2 rounded-full shadow-md"
            >
              🎀 재의뢰율 98%
            </motion.div>

            {/* Second mini card */}
            <div className="bg-[#F5F3EE] rounded-2xl p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#D4A373]/20 flex items-center justify-center text-xl">✨</div>
              <div>
                <p className="text-sm font-semibold text-[#1A1A1A]">이달의 신규 강의 오픈</p>
                <p className="text-xs text-[#999999]">AI 썸네일 디자인 A to Z</p>
              </div>
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
          y: { repeat: Infinity, duration: 2, ease: 'easeInOut' }
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#999999] hover:text-[#0D593C] transition-colors"
        aria-label="아래로 스크롤"
      >
        <ChevronDown size={24} />
      </motion.a>
    </section>
  );
}
