import { ThemeDef } from '../data/themes';

interface HeaderProps {
  total: number;
  opened: number;
  onReset: () => void;
  resetTrigger: number;
  theme: ThemeDef;
}

export const Header = ({ total, opened, theme }: HeaderProps) => {
  const unopened = total - opened;

  return (
    <header className={`w-full backdrop-blur-[10px] border-b sticky top-0 z-10 py-[16px] md:py-[20px] px-[20px] md:px-[40px] flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 ${theme.header} transition-colors duration-500`}>
      <div className="md:flex-1"></div>
      <div className="md:flex-1 flex justify-center">
        <h1 className={`m-0 text-[26px] md:text-[36px] font-[900] tracking-[2px] bg-clip-text text-transparent uppercase text-center ${theme.title}`} style={{ fontFamily: '"Times New Roman", Times, serif' }}>
          TRÒ CHƠI CHỌN SỐ
        </h1>
      </div>

      <div className="md:flex-1 flex gap-[10px] md:gap-[20px] items-center shrink-0 flex-wrap justify-center md:justify-end">
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

