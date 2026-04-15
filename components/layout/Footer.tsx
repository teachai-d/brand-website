import { Sprout, Mail, MessageCircle } from 'lucide-react';

const footerLinks = [
  { label: '소개',      href: '#about' },
  { label: '서비스',    href: '#service' },
  { label: '포트폴리오', href: '#portfolio' },
  { label: 'AI 자료실', href: '#ai-resources' },
  { label: '문의',      href: '#contact' },
];

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white py-14 px-6 md:px-10">
      <div className="content-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#0D593C] flex items-center justify-center">
                <Sprout size={16} className="text-white" strokeWidth={2} />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[13px] font-bold text-white">TD STUDIO</span>
                <span className="text-[10px] text-[#999999]">러블리디</span>
              </div>
            </div>
            <p className="text-[#999999] text-sm leading-relaxed max-w-xs">
              지식의 씨앗을 심는 디자인 공방.<br />
              처음이어도 괜찮은 곳, TeachAI_D입니다.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-xs font-semibold text-[#666666] tracking-widest uppercase mb-4">Menu</p>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-[#999999] hover:text-white transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold text-[#666666] tracking-widest uppercase mb-4">Contact</p>
            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-2.5 text-sm text-[#999999]">
                <MessageCircle size={15} className="text-[#CFE3D8]" />
                카카오톡 @teachaid
              </li>
              <li className="flex items-center gap-2.5 text-sm text-[#999999]">
                <Mail size={15} className="text-[#CFE3D8]" />
                hello@teachaid.kr
              </li>
              <li className="text-sm text-[#999999] ml-[27px]">평일 10:00 – 18:00</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-sm text-[#555555]">
          <span>© 2024 TeachAI_D (TD STUDIO). All rights reserved.</span>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white transition-colors">이용약관</a>
            <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
