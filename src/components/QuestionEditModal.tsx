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
  const [optA, setOptA] = useState('');
  const [optB, setOptB] = useState('');
  const [optC, setOptC] = useState('');
  const [optD, setOptD] = useState('');
  const [correct, setCorrect] = useState('');

  useEffect(() => {
    if (question) {
      setContent(question.question);
      setOptA(question.optionA || '');
      setOptB(question.optionB || '');
      setOptC(question.optionC || '');
      setOptD(question.optionD || '');
      setCorrect(question.correctAnswer || 'A');
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
          className={`relative w-full max-w-[600px] border-[2px] rounded-[32px] p-[30px] md:p-[40px] flex flex-col font-[Helvetica_Neue,Arial,sans-serif] ${theme.modalBg} transition-colors duration-500 max-h-[90vh] overflow-y-auto`}
        >
          <div className="flex justify-between items-center mb-[24px] border-b border-white/10 pb-[16px] shrink-0">
            <span className={`font-bold text-[14px] ${theme.modalTitle}`}>
              CHỈNH SỬA CÂU HỎI SỐ {String(question.id).padStart(2, '0')}
            </span>
            <span className="text-slate-500 text-[14px]">ID: Q{question.id}-{new Date().getFullYear()}</span>
          </div>

          <div className="flex flex-col gap-4 mb-6 shrink-0">
            <div>
              <label className="block text-sm font-bold text-white mb-2">Nội dung câu hỏi</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className={`w-full h-[100px] text-[16px] leading-[1.5] p-[16px] rounded-[16px] bg-black/20 border border-white/20 focus:outline-none focus:border-white/50 resize-none ${theme.modalText}`}
                placeholder="Nhập nội dung câu hỏi..."
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-white mb-1">Đáp án A</label>
                <input
                  type="text"
                  value={optA}
                  onChange={(e) => setOptA(e.target.value)}
                  className={`w-full text-[14px] p-[10px] rounded-[8px] bg-black/20 border border-white/20 focus:outline-none focus:border-white/50 ${theme.modalText}`}
                  placeholder="Đáp án A"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-white mb-1">Đáp án B</label>
                <input
                  type="text"
                  value={optB}
                  onChange={(e) => setOptB(e.target.value)}
                  className={`w-full text-[14px] p-[10px] rounded-[8px] bg-black/20 border border-white/20 focus:outline-none focus:border-white/50 ${theme.modalText}`}
                  placeholder="Đáp án B"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-white mb-1">Đáp án C</label>
                <input
                  type="text"
                  value={optC}
                  onChange={(e) => setOptC(e.target.value)}
                  className={`w-full text-[14px] p-[10px] rounded-[8px] bg-black/20 border border-white/20 focus:outline-none focus:border-white/50 ${theme.modalText}`}
                  placeholder="Đáp án C"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-white mb-1">Đáp án D</label>
                <input
                  type="text"
                  value={optD}
                  onChange={(e) => setOptD(e.target.value)}
                  className={`w-full text-[14px] p-[10px] rounded-[8px] bg-black/20 border border-white/20 focus:outline-none focus:border-white/50 ${theme.modalText}`}
                  placeholder="Đáp án D"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-white mb-2">Đáp án đúng</label>
              <select
                value={correct}
                onChange={(e) => setCorrect(e.target.value)}
                className={`w-full text-[14px] p-[10px] rounded-[8px] bg-black/40 border border-white/20 focus:outline-none focus:border-white/50 text-white [&>option]:bg-slate-800`}
              >
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-[12px] shrink-0">
            <button
              onClick={onClose}
              className={`px-[30px] py-[12px] rounded-[12px] font-[600] text-[14px] uppercase tracking-[1px] cursor-pointer border-none bg-[#334155] text-white hover:bg-[#475569] transition-colors`}
            >
              HỦY
            </button>
            <button
              onClick={() => {
                onSave({ 
                  ...question, 
                  question: content,
                  optionA: optA,
                  optionB: optB,
                  optionC: optC,
                  optionD: optD,
                  correctAnswer: correct
                });
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
