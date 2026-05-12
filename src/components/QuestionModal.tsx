import { motion, AnimatePresence } from 'motion/react';
import { Question } from '../data/questions';
import { useEffect, useState } from 'react';
import { ThemeDef } from '../data/themes';
import { X, Play } from 'lucide-react';

interface QuestionModalProps {
  question: Question | null;
  onClose: () => void;
  theme: ThemeDef;
}

export const QuestionModal = ({ question, onClose, theme }: QuestionModalProps) => {
  const [isStarted, setIsStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5);

  // Ngăn cuộn trang web khi popup đang mở và reset trạng thái bắt đầu
  useEffect(() => {
    if (question) {
      document.body.style.overflow = 'hidden';
      setIsStarted(false);
      setTimeLeft(5);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [question]);

  const playTickSound = () => {
    try {
      const AudioContextDef = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextDef) return;
      const audioCtx = new AudioContextDef();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.type = 'triangle';
      oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.1);

      gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.1);
    } catch (e) {
      // Ignore audio error
    }
  };

  // Logic đếm ngược thời gian
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isStarted && timeLeft > 0) {
      timer = setInterval(() => {
        playTickSound();
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isStarted, timeLeft]);

  return (
    <AnimatePresence>
      {question && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Lớp nền làm mờ */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#020617]/85 backdrop-blur-[8px] cursor-pointer"
          />

          {/* Hộp thoại câu hỏi */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`relative w-[95vw] md:w-[90vw] max-w-[1200px] min-h-[60vh] md:min-h-[70vh] border-[2px] rounded-[32px] p-[30px] md:p-[60px] flex flex-col ${theme.modalBg} transition-colors duration-500`}
          >
            <div className="flex justify-between items-center mb-[32px] border-b border-white/10 pb-[24px]">
              <span className={`font-bold text-[18px] md:text-[24px] uppercase tracking-[2px] ${theme.modalTitle}`}>
                CÂU HỎI SỐ {String(question.id).padStart(2, '0')}
              </span>
            </div>

            <div className="flex-1 flex flex-col justify-center">
              <p className={`text-[28px] md:text-[48px] leading-[1.4] text-center mb-[40px] ${theme.modalText} break-words whitespace-pre-wrap`}>
                {question.question}
              </p>
            </div>

            <div className="flex justify-between items-center mt-auto">
              <div className="flex items-center gap-4 md:gap-6">
                {!isStarted && timeLeft === 5 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      playTickSound();
                      setIsStarted(true);
                    }}
                    className={`px-[30px] md:px-[40px] py-[12px] md:py-[16px] rounded-[16px] font-[700] text-[16px] md:text-[20px] uppercase tracking-[2px] cursor-pointer border-none transition-all duration-200 bg-emerald-500 text-white hover:bg-emerald-600 active:bg-emerald-700 shadow-lg flex items-center gap-2`}
                  >
                    <Play size={24} fill="currentColor" />
                    BẮT ĐẦU
                  </motion.button>
                ) : (
                  <div className={`text-[40px] md:text-[60px] font-bold tracking-widest ${timeLeft === 0 ? 'text-red-500' : theme.modalText}`}>
                    00:0{timeLeft}
                  </div>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className={`w-[60px] h-[60px] rounded-full flex items-center justify-center cursor-pointer border-none transition-all duration-200 ${theme.button} hover:opacity-90 active:!bg-red-500 active:!text-white shadow-lg`}
              >
                <X size={32} strokeWidth={2.5} />
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
