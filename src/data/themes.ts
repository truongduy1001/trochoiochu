export type ThemeKey = 'ocean' | 'sunny' | 'berry' | 'forest';

export interface ThemeDef {
  bg: string;
  text: string;
  header: string;
  title: string;
  timer: string;
  pillBg: string;
  pillBorder: string;
  pillTextHighlight: string;
  cardNotOpened: string;
  cardOpened: string;
  cardText: string;
  cardTextOpened: string;
  modalBg: string;
  modalTitle: string;
  modalText: string;
  button: string;
  footer: string;
  footerBtn: string;
  optionBg: string;
}

export const themes: Record<ThemeKey, ThemeDef> = {
  ocean: {
    bg: 'bg-[radial-gradient(circle_at_center,_#e0f2fe_0%,_#bae6fd_100%)] bg-sky-100',
    text: 'text-slate-800',
    header: 'bg-white/50 border-sky-200 text-slate-800',
    title: 'bg-[linear-gradient(to_right,#0284c7,#0369a1)]',
    timer: 'text-[#0ea5e9] drop-shadow-[0_0_10px_rgba(14,165,233,0.5)]',
    pillBg: 'bg-white/50',
    pillBorder: 'border-sky-300/50',
    pillTextHighlight: 'text-[#0284c7]',
    cardNotOpened: 'bg-white/60 border-sky-400/50 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] hover:border-sky-500 hover:shadow-[0_0_30px_rgba(14,165,233,0.4)] hover:bg-sky-100/50',
    cardOpened: 'opacity-60 border-slate-300 bg-slate-200 cursor-not-allowed',
    cardText: 'text-sky-900',
    cardTextOpened: 'text-slate-500',
    modalBg: 'bg-white border-sky-300 shadow-[0_0_50px_rgba(14,165,233,0.2)]',
    modalTitle: 'text-[#0284c7]',
    modalText: 'text-slate-700',
    button: 'bg-[linear-gradient(135deg,#0ea5e9_0%,#0284c7_100%)] text-white shadow-[0_4px_14px_0_rgba(14,165,233,0.39)]',
    footer: 'bg-white/80 border-sky-200 text-slate-600',
    footerBtn: 'bg-sky-200 text-sky-900 hover:bg-sky-300',
    optionBg: 'bg-sky-100/80',
  },
  sunny: {
    bg: 'bg-[radial-gradient(circle_at_center,_#fef3c7_0%,_#fcd34d_100%)] bg-amber-100',
    text: 'text-amber-950',
    header: 'bg-white/50 border-amber-200 text-amber-900',
    title: 'bg-[linear-gradient(to_right,#d97706,#b45309)]',
    timer: 'text-[#ea580c] drop-shadow-[0_0_10px_rgba(234,88,12,0.5)]',
    pillBg: 'bg-white/50',
    pillBorder: 'border-amber-300/50',
    pillTextHighlight: 'text-[#d97706]',
    cardNotOpened: 'bg-white/60 border-amber-400/50 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] hover:border-amber-500 hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] hover:bg-amber-100/50',
    cardOpened: 'opacity-60 border-slate-300 bg-slate-200 cursor-not-allowed',
    cardText: 'text-amber-900',
    cardTextOpened: 'text-slate-500',
    modalBg: 'bg-white border-amber-300 shadow-[0_0_50px_rgba(245,158,11,0.2)]',
    modalTitle: 'text-[#d97706]',
    modalText: 'text-slate-700',
    button: 'bg-[linear-gradient(135deg,#f59e0b_0%,#d97706_100%)] text-white shadow-[0_4px_14px_0_rgba(245,158,11,0.39)]',
    footer: 'bg-white/80 border-amber-200 text-slate-600',
    footerBtn: 'bg-amber-200 text-amber-900 hover:bg-amber-300',
    optionBg: 'bg-amber-100/80',
  },
  berry: {
    bg: 'bg-[radial-gradient(circle_at_center,_#fce7f3_0%,_#fbcfe8_100%)] bg-pink-100',
    text: 'text-pink-950',
    header: 'bg-white/50 border-pink-200 text-pink-900',
    title: 'bg-[linear-gradient(to_right,#db2777,#be185d)]',
    timer: 'text-[#e11d48] drop-shadow-[0_0_10px_rgba(225,29,72,0.5)]',
    pillBg: 'bg-white/50',
    pillBorder: 'border-pink-300/50',
    pillTextHighlight: 'text-[#db2777]',
    cardNotOpened: 'bg-white/60 border-pink-400/50 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] hover:border-pink-500 hover:shadow-[0_0_30px_rgba(236,72,153,0.4)] hover:bg-pink-100/50',
    cardOpened: 'opacity-60 border-slate-300 bg-slate-200 cursor-not-allowed',
    cardText: 'text-pink-900',
    cardTextOpened: 'text-slate-500',
    modalBg: 'bg-white border-pink-300 shadow-[0_0_50px_rgba(236,72,153,0.2)]',
    modalTitle: 'text-[#db2777]',
    modalText: 'text-slate-700',
    button: 'bg-[linear-gradient(135deg,#ec4899_0%,#db2777_100%)] text-white shadow-[0_4px_14px_0_rgba(236,72,153,0.39)]',
    footer: 'bg-white/80 border-pink-200 text-slate-600',
    footerBtn: 'bg-pink-200 text-pink-900 hover:bg-pink-300',
    optionBg: 'bg-pink-100/80',
  },
  forest: {
    bg: 'bg-[radial-gradient(circle_at_center,_#dcfce7_0%,_#bbf7d0_100%)] bg-green-100',
    text: 'text-green-950',
    header: 'bg-white/50 border-green-200 text-green-900',
    title: 'bg-[linear-gradient(to_right,#16a34a,#15803d)]',
    timer: 'text-[#059669] drop-shadow-[0_0_10px_rgba(5,150,105,0.5)]',
    pillBg: 'bg-white/50',
    pillBorder: 'border-green-300/50',
    pillTextHighlight: 'text-[#16a34a]',
    cardNotOpened: 'bg-white/60 border-green-400/50 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] hover:border-green-500 hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] hover:bg-green-100/50',
    cardOpened: 'opacity-60 border-slate-300 bg-slate-200 cursor-not-allowed',
    cardText: 'text-green-900',
    cardTextOpened: 'text-slate-500',
    modalBg: 'bg-white border-green-300 shadow-[0_0_50px_rgba(34,197,94,0.2)]',
    modalTitle: 'text-[#16a34a]',
    modalText: 'text-slate-700',
    button: 'bg-[linear-gradient(135deg,#22c55e_0%,#16a34a_100%)] text-white shadow-[0_4px_14px_0_rgba(34,197,94,0.39)]',
    footer: 'bg-white/80 border-green-200 text-slate-600',
    footerBtn: 'bg-green-200 text-green-900 hover:bg-green-300',
    optionBg: 'bg-green-100/80',
  }
};
