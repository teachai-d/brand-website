'use client';

import { Monitor, Pencil, LayoutTemplate, BookOpen, BrainCircuit, Video } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import ServiceCard from '@/components/ui/ServiceCard';

const services = [
  {
    icon: Monitor,
    title: '웹사이트 디자인',
    titleEn: 'Website Design',
    description: '브랜드의 첫인상을 결정하는 랜딩 페이지와 홈페이지를 감각적으로 제작합니다.',
  },
  {
    icon: Pencil,
    title: '브랜드 아이덴티티',
    titleEn: 'Brand Identity',
    description: '로고, 컬러, 타이포그래피까지 일관된 나만의 브랜드 세계관을 구축합니다.',
  },
  {
    icon: LayoutTemplate,
    title: '썸네일 디자인',
    titleEn: 'Thumbnail Design',
    description: '클릭하고 싶게 만드는 유튜브 · SNS · 강의 썸네일을 제작합니다.',
  },
  {
    icon: BookOpen,
    title: '교육 콘텐츠 제작',
    titleEn: 'Educational Content',
    description: '강의 슬라이드, 교안, 워크북 등 학습자 중심의 교육 자료를 만들어드립니다.',
  },
  {
    icon: BrainCircuit,
    title: 'AI 활용 코칭',
    titleEn: 'AI Consulting',
    description: 'ChatGPT, Midjourney 등 AI 툴로 업무 효율을 10배 높이는 법을 코칭합니다.',
  },
  {
    icon: Video,
    title: '온라인 강의 제작',
    titleEn: 'Online Lecture',
    description: '기획부터 영상 편집까지, 수강생이 몰입하는 온라인 강의를 완성합니다.',
  },
];

export default function ServiceSection() {
  return (
    <section id="service" className="bg-white py-24 md:py-32 px-6 md:px-10">
      <div className="max-w-6xl mx-auto flex flex-col gap-14">
        <div className="flex flex-col items-center">
          <SectionTitle
            eyebrow="서비스"
            title="어떤 도움이 필요하신가요?"
            accentWords={['도움']}
            subtitle="디자인 · 강의 · AI 코칭까지, 필요한 것 모두 한 곳에서."
            align="center"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <ServiceCard key={s.title} {...s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
