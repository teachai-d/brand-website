'use client';

import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  titleEn: string;
  description: string;
  index?: number;
}

export default function ServiceCard({
  icon: Icon,
  title,
  titleEn,
  description,
  index = 0,
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      className="group bg-white rounded-2xl p-6 flex flex-col gap-4 border border-[#E5E5E5] hover:border-[#CFE3D8] hover:shadow-lg transition-all duration-300"
      style={{ boxShadow: '0 2px 16px rgba(13,89,60,0.06)' }}
    >
      {/* Icon */}
      <div className="w-11 h-11 rounded-xl bg-[#E8F3EC] flex items-center justify-center group-hover:bg-[#CFE3D8] transition-colors duration-300">
        <Icon size={22} className="text-[#0D593C]" strokeWidth={1.5} />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1.5">
        <span className="text-[11px] font-semibold text-[#999999] tracking-widest uppercase">
          {titleEn}
        </span>
        <h3 className="text-[17px] font-bold text-[#1A1A1A]">{title}</h3>
        <p className="text-sm text-[#666666] leading-relaxed">{description}</p>
      </div>

      {/* Hover arrow */}
      <div className="mt-auto flex items-center gap-1 text-[#0D593C] text-sm font-medium opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200">
        자세히 보기
        <span className="text-base">→</span>
      </div>
    </motion.div>
  );
}
