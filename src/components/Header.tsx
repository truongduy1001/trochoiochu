import { useEffect, useState } from 'react';
import { ThemeDef } from '../data/themes';

interface HeaderProps {
  total: number;
  opened: number;
  onReset: () => void;
  resetTrigger: number;
  theme: ThemeDef;
}

const Timer = ({ resetTrigger, theme }: { resetTrigger: number; theme: ThemeDef }) => {
  const [seconds, setSeconds] = useState(0);

  // Reset thời gian khi bắt đầu game mới
  useEffect(() => {
    setSeconds(0);
  }, [resetTrigger]);

  // Đếm ngược/Cộng dồn thời gian
  useEffect(() => {
    const interval = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const format = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`text-[28px] md:text-[32px] font-bold font-mono ${theme.timer}`}>
      {format(seconds)}
    </div>
  );
};

export const Header = ({ total, opened, onReset, resetTrigger, theme }: HeaderProps) => {
  const unopened = total - opened;

  return (
    <header className={`w-full backdrop-blur-[10px] border-b sticky top-0 z-10 py-[16px] md:py-[20px] px-[20px] md:px-[40px] flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 font-[Helvetica_Neue,Arial,sans-serif] ${theme.header} transition-colors duration-500`}>
      <div>
        <h1 className={`m-0 text-[24px] md:text-[28px] font-[800] tracking-[2px] bg-clip-text text-transparent uppercase text-center md:text-left ${theme.title}`}>
          Trò Chơi Chọn Số
        </h1>
      </div>

      <Timer resetTrigger={resetTrigger} theme={theme} />

      <div className="flex gap-[10px] md:gap-[20px] items-center shrink-0 flex-wrap justify-center">
        <div className={`border px-[12px] md:px-[16px] py-[6px] rounded-[20px] text-[12px] md:text-[14px] flex items-center gap-[6px] md:gap-[8px] ${theme.pillBg} ${theme.pillBorder}`}>
          <span>Tổng:</span>
          <span className={`font-bold ${theme.pillTextHighlight}`}>{total}</span>
        </div>
        <div className={`border px-[12px] md:px-[16px] py-[6px] rounded-[20px] text-[12px] md:text-[14px] flex items-center gap-[6px] md:gap-[8px] ${theme.pillBg} ${theme.pillBorder}`}>
          <span>Đã mở:</span>
          <span className={`font-bold ${theme.pillTextHighlight}`}>{opened}</span>
        </div>
        <div className={`border px-[12px] md:px-[16px] py-[6px] rounded-[20px] text-[12px] md:text-[14px] flex items-center gap-[6px] md:gap-[8px] ${theme.pillBg} ${theme.pillBorder}`}>
          <span>Còn lại:</span>
          <span className={`font-bold ${theme.pillTextHighlight}`}>{unopened}</span>
        </div>
      </div>
    </header>
  );
};
