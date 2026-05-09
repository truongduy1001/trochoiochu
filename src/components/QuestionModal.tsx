import { motion, AnimatePresence } from 'motion/react';
import { Question } from '../data/questions';
import { useEffect } from 'react';
import { ThemeDef } from '../data/themes';

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
            className={`relative w-full max-w-[500px] border-[2px] rounded-[32px] p-[30px] md:p-[40px] flex flex-col font-[Helvetica_Neue,Arial,sans-serif] ${theme.modalBg} transition-colors duration-500`}
          >
            <div className="flex justify-between items-center mb-[24px] border-b border-white/10 pb-[16px]">
              <span className={`font-bold text-[14px] ${theme.modalTitle}`}>
                CÂU HỎI SỐ {String(question.id).padStart(2, '0')}
              </span>
              <span className="text-slate-500 text-[14px]">ID: Q{question.id}-{new Date().getFullYear()}</span>
            </div>

            <p className={`text-[20px] md:text-[22px] leading-[1.5] mb-[32px] ${theme.modalText}`}>
              {question.question}
            </p>

            <div className="flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className={`px-[40px] py-[12px] rounded-[12px] font-[600] text-[14px] uppercase tracking-[1px] cursor-pointer border-none transition-opacity ${theme.button} hover:opacity-90`}
              >
                ĐÓNG
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
