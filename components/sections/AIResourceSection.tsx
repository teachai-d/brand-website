'use client';

import { motion } from 'framer-motion';
import { Sparkles, FileText, Cpu, Wand2, BarChart2, Globe } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import Button from '@/components/ui/Button';

const resources = [
  {
    icon: Sparkles,
    title: '초보자를 위한 AI 프롬프트 입문',
    desc: '한 번도 써본 적 없어도 바로 쓸 수 있는 ChatGPT 프롬프트 30선',
    tag: '무료',
    tagBg: '#E8F3EC',
    tagColor: '#0D593C',
  },
  {
    icon: Wand2,
    title: 'Canva × AI 디자인 가이드',
    desc: 'Canva와 AI를 조합해 10분 만에 프로급 디자인 완성하는 법',
    tag: '가이드',
    tagBg: '#FDE8EA',
    tagColor: '#E0747E',
  },
  {
    icon: FileText,
    title: 'ChatGPT 강의 기획 템플릿',
    desc: '강의 목차부터 스크립트까지 AI로 3배 빠르게 기획하는 템플릿',
    tag: '템플릿',
    tagBg: '#F5E6D3',
    tagColor: '#B8824A',
  },
  {
    icon: Cpu,
    title: '미드저니 상업용 이미지 가이드',
    desc: '저작권 걱정 없이 상업적으로 쓸 수 있는 AI 이미지 생성 노하우',
    tag: '리포트',
    tagBg: '#EEF0FD',
    tagColor: '#5A65C4',
  },
  {
    icon: BarChart2,
    title: 'AI 콘텐츠 캘린더 자동화',
    desc: '1개월치 SNS 콘텐츠를 1시간 만에 기획하는 AI 워크플로우',
    tag: '전략',
    tagBg: '#FDE8EA',
    tagColor: '#E0747E',
  },
  {
    icon: Globe,
    title: '온라인 클래스 제작 체크리스트',
    desc: '강의 오픈 전 반드시 확인해야 할 50가지 체크리스트 완벽판',
    tag: '무료',
    tagBg: '#E8F3EC',
    tagColor: '#0D593C',
  },
];

export default function AIResourceSection() {
  return (
    <section id="ai-resources" className="bg-white py-24 md:py-32 px-6 md:px-10">
      <div className="content-container flex flex-col gap-14">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <SectionTitle
            eyebrow="AI 자료실"
            title="AI 시대, 먼저 알고 쓰세요"
            accentWords={['AI']}
            subtitle="실무에서 바로 쓰는 AI 가이드와 템플릿. 처음이어도 따라할 수 있어요."
            align="left"
          />
          <Button href="#contact" variant="secondary" size="sm" className="shrink-0 self-start">
            자료실 전체보기
          </Button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[15px]">
          {resources.map((r, i) => {
            const Icon = r.icon;
            return (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group bg-[#F9FAF8] rounded-2xl p-6 flex flex-col gap-4 border border-[#E5E5E5] hover:border-[#CFE3D8] hover:bg-[#F5F3EE] transition-all duration-300 cursor-pointer"
              >
                {/* Top row */}
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#E5E5E5] flex items-center justify-center group-hover:border-[#CFE3D8] transition-colors">
                    <Icon size={18} className="text-[#0D593C]" strokeWidth={1.5} />
                  </div>
                  <span
                    className="text-[11px] font-semibold px-3 py-1 rounded-full"
                    style={{ backgroundColor: r.tagBg, color: r.tagColor }}
                  >
                    {r.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-[15px] font-bold text-[#1A1A1A] leading-snug group-hover:text-[#0D593C] transition-colors">
                    {r.title}
                  </h3>
                  <p className="text-sm text-[#666666] leading-relaxed">{r.desc}</p>
                </div>

                {/* CTA */}
                <span className="text-xs text-[#0D593C] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  다운로드 →
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
