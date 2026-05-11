import { motion, AnimatePresence } from 'motion/react';
import { Question } from '../data/questions';
import { useEffect } from 'react';
import { ThemeDef } from '../data/themes';
import { X } from 'lucide-react';

interface QuestionModalProps {
  question: Question | null;
  onClose: () => void;
  theme: ThemeDef;
}

export const QuestionModal = ({ question, onClose, theme }: QuestionModalProps) => {
  // Ngăn cuộn trang web khi popup đang mở
  useEffect(() => {
    if (question) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [question]);

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

            <div className="flex justify-end mt-auto">
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
