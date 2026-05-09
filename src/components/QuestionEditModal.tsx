import { motion, AnimatePresence } from 'motion/react';
import { Question } from '../data/questions';
import { useEffect, useState } from 'react';
import { ThemeDef } from '../data/themes';

interface QuestionEditModalProps {
  question: Question | null;
  onClose: () => void;
  onSave: (question: Question) => void;
  theme: ThemeDef;
}

export const QuestionEditModal = ({ question, onClose, onSave, theme }: QuestionEditModalProps) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    if (question) {
      setContent(question.question);
    }
  }, [question]);

  useEffect(() => {
    if (question) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [question]);

  if (!question) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#020617]/85 backdrop-blur-[8px] cursor-pointer"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className={`relative w-full max-w-[500px] border-[2px] rounded-[32px] p-[30px] md:p-[40px] flex flex-col font-[Helvetica_Neue,Arial,sans-serif] ${theme.modalBg} transition-colors duration-500`}
        >
          <div className="flex justify-between items-center mb-[24px] border-b border-white/10 pb-[16px]">
            <span className={`font-bold text-[14px] ${theme.modalTitle}`}>
              CHỈNH SỬA CÂU HỎI SỐ {String(question.id).padStart(2, '0')}
            </span>
            <span className="text-slate-500 text-[14px]">ID: Q{question.id}-{new Date().getFullYear()}</span>
          </div>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={`w-full h-[150px] text-[18px] md:text-[20px] leading-[1.5] mb-[32px] p-[16px] rounded-[16px] bg-black/20 border border-white/20 focus:outline-none focus:border-white/50 resize-none ${theme.modalText}`}
            placeholder="Nhập nội dung câu hỏi..."
          />

          <div className="flex justify-end gap-[12px]">
            <button
              onClick={onClose}
              className={`px-[30px] py-[12px] rounded-[12px] font-[600] text-[14px] uppercase tracking-[1px] cursor-pointer border-none bg-[#334155] text-white hover:bg-[#475569] transition-colors`}
            >
              HỦY
            </button>
            <button
              onClick={() => {
                onSave({ ...question, question: content });
                onClose();
              }}
              className={`px-[40px] py-[12px] rounded-[12px] font-[600] text-[14px] uppercase tracking-[1px] cursor-pointer border-none transition-opacity ${theme.button} hover:opacity-90`}
            >
              LƯU
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
