import React from 'react';

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  accentWords?: string[];
  subtitle?: string;
  align?: 'left' | 'center';
}

export default function SectionTitle({
  eyebrow,
  title,
  accentWords = [],
  subtitle,
  align = 'center',
}: SectionTitleProps) {
  const alignClass = align === 'center'
    ? 'text-center items-center'
    : 'text-left items-start';

  const renderTitle = () => {
    if (accentWords.length === 0) return title;
    let parts: (string | React.ReactElement)[] = [title];
    accentWords.forEach((word, wi) => {
      parts = parts.flatMap((part, pi) => {
        if (typeof part !== 'string') return [part];
        const split = part.split(word);
        return split.flatMap((s, i) =>
          i < split.length - 1
            ? [s, <span key={`${wi}-${pi}-${i}`} className="text-[#0D593C]">{word}</span>]
            : [s]
        );
      });
    });
    return parts;
  };

  return (
    <div className={`flex flex-col gap-3 ${alignClass}`}>
      {eyebrow && (
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#0D593C] tracking-widest uppercase">
          <span className="w-6 h-px bg-[#0D593C] opacity-50" />
          {eyebrow}
          <span className="w-6 h-px bg-[#0D593C] opacity-50" />
        </span>
      )}
      <h2
        className="text-3xl md:text-4xl font-bold text-[#1A1A1A] leading-tight"
        style={{ lineHeight: 1.3 }}
      >
        {renderTitle()}
      </h2>
      {subtitle && (
        <p className="text-[#666666] text-base md:text-lg max-w-xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
