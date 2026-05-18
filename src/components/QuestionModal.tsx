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
  // Ngăn cuộn trang web khi popup đang mở và reset trạng thái bắt đầu
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-6">
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
            className={`relative w-full h-full max-w-[1800px] border-[2px] rounded-[32px] p-[30px] md:p-[60px] flex flex-col ${theme.modalBg} transition-colors duration-500 overflow-hidden shadow-2xl`}
          >
            <div className="flex justify-between items-center mb-[32px] border-b border-black/10 pb-[24px]">
              <span className={`font-bold text-[18px] md:text-[28px] uppercase tracking-[2px] ${theme.modalTitle}`}>
                CÂU HỎI SỐ {String(question.id).padStart(2, '0')}
              </span>
            </div>

            <div className="flex-1 flex flex-col justify-center gap-8 overflow-y-auto pr-4">
              <p className={`text-[28px] md:text-[45px] font-medium leading-[1.5] text-center ${theme.text} break-words whitespace-pre-wrap mb-8`}>
                {question.question}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 max-w-6xl mx-auto w-full mt-4">
                {['A', 'B', 'C', 'D'].map((opt) => {
                  const optionText = 
                    opt === 'A' ? question.optionA : 
                    opt === 'B' ? question.optionB : 
                    opt === 'C' ? question.optionC : 
                    question.optionD;
                  
                  if (!optionText) return null;

                  return (
                    <motion.div
                      key={opt}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + (opt.charCodeAt(0) - 65) * 0.1 }}
                      className={`flex items-center gap-6 p-6 md:p-8 rounded-3xl border-2 border-black/5 ${theme.optionBg} cursor-pointer hover:scale-[1.02] transition-transform shadow-sm`}
                    >
                      <div className={`w-12 h-12 md:w-14 md:h-14 shrink-0 flex items-center justify-center rounded-full font-bold text-xl md:text-2xl ${theme.button}`}>
                        {opt}
                      </div>
                      <span className={`text-[20px] md:text-[24px] leading-snug font-medium ${theme.text}`}>{optionText}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-end items-center mt-auto">
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
