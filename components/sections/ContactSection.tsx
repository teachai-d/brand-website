'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Mail, Clock, ArrowRight, Quote } from 'lucide-react';
import Button from '@/components/ui/Button';
import SectionTitle from '@/components/ui/SectionTitle';

const contactCards = [
  {
    icon: MessageCircle,
    label: '카카오톡',
    value: '@teachaid',
    desc: '평균 1시간 이내 응답',
    bg: '#FEF9C3',
    iconColor: '#CA8A04',
  },
  {
    icon: Mail,
    label: '이메일',
    value: 'hello@teachaid.kr',
    desc: '24시간 이내 회신',
    bg: '#E8F3EC',
    iconColor: '#0D593C',
  },
  {
    icon: Clock,
    label: '운영시간',
    value: '평일 10:00 – 18:00',
    desc: '공휴일 제외',
    bg: '#FDE8EA',
    iconColor: '#E0747E',
  },
];

const testimonials = [
  {
    quote: "처음엔 디자인을 전혀 몰랐는데, 러블리디 선생님 덕분에 제 강의 브랜딩을 직접 만들 수 있게 됐어요. 정말 따뜻하게 가르쳐주셔서 감사해요.",
    name: '김OO',
    role: '온라인 강의 크리에이터',
  },
  {
    quote: "의뢰한 랜딩 페이지 오픈 후 수강 신청이 3배 늘었어요. 단순한 디자인이 아니라 전략까지 담아주시는 게 다른 것 같아요.",
    name: '이OO',
    role: '1인 교육 기업 대표',
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="bg-[#F9FAF8] py-24 md:py-32 px-6 md:px-10">
      <div className="max-w-6xl mx-auto flex flex-col gap-16">

        {/* Testimonials */}
        <div className="flex flex-col gap-8">
          <SectionTitle
            eyebrow="후기"
            title="함께한 분들의 이야기"
            accentWords={['이야기']}
            align="center"
          />
          <div className="grid md:grid-cols-2 gap-5">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-7 border border-[#E5E5E5] flex flex-col gap-4"
                style={{ boxShadow: '0 2px 16px rgba(13,89,60,0.05)' }}
              >
                <Quote size={20} className="text-[#CFE3D8]" />
                <p className="text-[#3A3A3A] text-sm leading-relaxed italic">"{t.quote}"</p>
                <div className="flex items-center gap-3 pt-2 border-t border-[#F0F0F0]">
                  <div className="w-8 h-8 rounded-full bg-[#E8F3EC] flex items-center justify-center text-[#0D593C] font-bold text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1A1A1A]">{t.name}</p>
                    <p className="text-xs text-[#999999]">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-[#0D593C] rounded-3xl px-8 md:px-14 py-12 overflow-hidden flex flex-col md:flex-row md:items-center md:justify-between gap-8"
        >
          {/* BG decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #CFE3D8, transparent)' }} />
          <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #F29CA3, transparent)' }} />

          <div className="relative flex flex-col gap-3">
            <span className="text-[#CFE3D8] text-sm font-semibold">함께 시작해요</span>
            <h2 className="text-white text-2xl md:text-3xl font-bold leading-tight">
              당신의 이야기를<br />아름답게 만들어드릴게요. 🌱
            </h2>
            <p className="text-[#A8C9B8] text-sm leading-relaxed">
              어떤 작업이든 먼저 이야기해 주세요. 방향부터 함께 잡아드립니다.
            </p>
          </div>

          <Button
            href="mailto:hello@teachaid.kr"
            variant="accent-pink"
            size="lg"
            className="relative shrink-0 whitespace-nowrap"
          >
            작업문의 하기 <ArrowRight size={16} className="ml-2" />
          </Button>
        </motion.div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {contactCards.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-white rounded-2xl p-6 flex items-start gap-4 border border-[#E5E5E5]"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: c.bg }}
                >
                  <Icon size={18} style={{ color: c.iconColor }} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs text-[#999999] mb-0.5">{c.label}</p>
                  <p className="text-sm font-bold text-[#1A1A1A]">{c.value}</p>
                  <p className="text-xs text-[#999999] mt-0.5">{c.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
