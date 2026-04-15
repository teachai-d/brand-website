'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Mail, Clock, ArrowRight } from 'lucide-react';
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


export default function ContactSection() {
  const [name, setName] = useState('');
  const [inquiryType, setInquiryType] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[${inquiryType || '문의'}] ${name}님의 문의`);
    const body = encodeURIComponent(`이름: ${name}\n문의 유형: ${inquiryType}\n\n내용:\n${message}`);
    window.location.href = `mailto:hello@teachaid.kr?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="bg-[#F9FAF8] py-24 md:py-32 px-6 md:px-10">
      <div className="content-container flex flex-col gap-16">

        {/* CTA Banner + Inquiry Form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-[#0D593C] rounded-3xl overflow-hidden"
        >
          {/* BG decoration */}
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-10 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #CFE3D8, transparent)' }} />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #F29CA3, transparent)' }} />

          <div className="relative grid md:grid-cols-2 gap-0">
            {/* Left: 문구 */}
            <div className="flex flex-col justify-center gap-5 px-8 md:px-14 py-12 md:py-16 md:border-r md:border-white/10">
              <span className="text-[#CFE3D8] text-sm font-semibold">함께 시작해요</span>
              <h2 className="text-white text-2xl md:text-3xl font-bold leading-tight">
                당신의 이야기를<br />아름답게 만들어드릴게요. 🌱
              </h2>
              <p className="text-[#A8C9B8] text-sm leading-relaxed">
                어떤 작업이든 먼저 이야기해 주세요.<br />방향부터 함께 잡아드립니다.
              </p>
              {/* Contact hints */}
              <div className="flex flex-col gap-2 pt-2">
                <div className="flex items-center gap-2 text-xs text-[#7BB99A]">
                  <MessageCircle size={13} />
                  카카오톡 @teachaid · 평균 1시간 이내 응답
                </div>
                <div className="flex items-center gap-2 text-xs text-[#7BB99A]">
                  <Mail size={13} />
                  hello@teachaid.kr · 24시간 이내 회신
                </div>
              </div>
            </div>

            {/* Right: 문의 폼 */}
            <div
              className="px-8 md:px-12 py-12 md:py-16 rounded-r-3xl"
              style={{
                background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(207,227,216,0.7) 40%, rgba(13,89,60,0.35) 100%) border-box',
                border: '1.5px solid transparent',
              }}
            >
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* 이름 */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#3A3A3A]">
                    이름 <span className="text-[#F29CA3]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="홍길동"
                    className="w-full rounded-xl border border-[#E5E5E5] bg-[#F9FAF8] px-4 py-3 text-sm text-[#1A1A1A] placeholder-[#BBBBBB] outline-none focus:border-[#0D593C] focus:ring-2 focus:ring-[#0D593C]/10 transition-all"
                  />
                </div>
                {/* 문의 유형 */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#3A3A3A]">
                    문의 유형 <span className="text-[#F29CA3]">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { key: '디자인 의뢰', label: '🎨 디자인 의뢰' },
                      { key: '강의 수강',   label: '📚 강의 수강'   },
                      { key: '기타 문의',   label: '💬 기타 문의'   },
                    ].map(({ key, label }) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setInquiryType(key)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150 ${
                          inquiryType === key
                            ? 'bg-[#0D593C] text-white border-[#0D593C] shadow-sm'
                            : 'bg-white text-[#3A3A3A] border-[#E5E5E5] hover:border-[#0D593C] hover:text-[#0D593C]'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
                {/* 문의 내용 */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#3A3A3A]">
                    문의 내용 <span className="text-[#F29CA3]">*</span>
                  </label>
                  <textarea
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="어떤 작업을 원하시나요? 간단하게 적어주셔도 괜찮아요 😊"
                    rows={4}
                    className="w-full rounded-xl border border-[#E5E5E5] bg-[#F9FAF8] px-4 py-3 text-sm text-[#1A1A1A] placeholder-[#BBBBBB] outline-none focus:border-[#0D593C] focus:ring-2 focus:ring-[#0D593C]/10 transition-all resize-none"
                  />
                </div>
                {/* 제출 */}
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 font-medium tracking-[1px] rounded-[3px] bg-[var(--button-bg)] text-[var(--button-text)] border border-[var(--button-border)] hover:bg-[var(--button-hover-bg)] hover:text-[var(--button-hover-text)] hover:border-[var(--button-hover-border)] transition-colors duration-200 text-[15px] px-[20px] py-[11px] w-full md:w-auto self-start"
                >
                  문의 보내기 <ArrowRight size={15} />
                </button>
              </form>
            </div>
          </div>
        </motion.div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[15px]">
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
