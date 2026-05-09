import { ThemeKey, ThemeDef } from '../data/themes';

interface FooterProps {
  onReset: () => void;
  onUndo: () => void;
  canUndo: boolean;
  theme: ThemeDef;
  themeKey: ThemeKey;
  setThemeKey: (key: ThemeKey) => void;
  isEditMode: boolean;
  setIsEditMode: (v: boolean) => void;
}

export const Footer = ({ onReset, onUndo, canUndo, theme, themeKey, setThemeKey, isEditMode, setIsEditMode }: FooterProps) => {
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.log(`Lỗi khi mở toàn màn hình: ${err.message}`);
      });
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const themes: { key: ThemeKey; title: string; color: string }[] = [
    { key: 'ocean', title: 'Ocean', color: 'bg-sky-400 border-sky-600' },
    { key: 'sunny', title: 'Sunny', color: 'bg-amber-400 border-amber-600' },
    { key: 'berry', title: 'Berry', color: 'bg-pink-400 border-pink-600' },
    { key: 'forest', title: 'Forest', color: 'bg-green-400 border-green-600' },
  ];

  return (
    <footer className={`py-[20px] px-[40px] border-t flex flex-col md:flex-row justify-between items-center gap-4 mt-auto relative z-10 w-full transition-colors duration-500 font-[Helvetica_Neue,Arial,sans-serif] ${theme.footer}`}>
      <div className="flex gap-[12px]">
        <button 
          onClick={onUndo}
          disabled={!canUndo}
          className={`px-[24px] py-[12px] rounded-[12px] font-[600] uppercase cursor-pointer border-none text-[14px] tracking-[1px] transition-colors ${theme.footerBtn} ${!canUndo ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          QUAY LẠI
        </button>
        <button 
          onClick={onReset}
          className={`px-[24px] py-[12px] rounded-[12px] font-[600] uppercase cursor-pointer border-none text-[14px] tracking-[1px] transition-colors ${theme.footerBtn}`}
        >
          LÀM MỚI TRÒ CHƠI
        </button>
      </div>

      <div className="flex gap-[12px] items-center">
        <span className="text-[14px] uppercase font-bold tracking-wider opacity-60">Giao diện:</span>
        <div className="flex gap-[8px]">
          {themes.map((t) => (
            <button
              key={t.key}
              onClick={() => setThemeKey(t.key)}
              title={t.title}
              className={`w-[24px] h-[24px] rounded-full border-2 transition-transform hover:scale-110 cursor-pointer ${t.color} ${themeKey === t.key ? 'scale-125 shadow-[0_0_10px_currentColor]' : 'opacity-70'}`}
              aria-label={`Select ${t.title} theme`}
            />
          ))}
        </div>
      </div>

      <div className="flex gap-[10px] items-center">
        <button
          onClick={() => setIsEditMode(!isEditMode)}
          className={`px-[16px] py-[12px] rounded-[12px] font-[600] uppercase cursor-pointer border-2 text-[14px] tracking-[1px] transition-colors ${
            isEditMode ? 'bg-red-500 text-white border-red-500' : 'bg-transparent border-current opacity-70'
          }`}
        >
          {isEditMode ? 'EXIT EDIT' : 'EDIT'}
        </button>
        <button 
          onClick={toggleFullscreen}
          className={`px-[24px] py-[12px] rounded-[12px] font-[600] uppercase cursor-pointer border-none text-[14px] tracking-[1px] hover:opacity-90 transition-opacity ${theme.button}`}
        >
          CHẾ ĐỘ TOÀN MÀN HÌNH
        </button>
      </div>
    </footer>
  );
};
