import { motion, AnimatePresence } from 'motion/react';
import { ThemeDef } from '../data/themes';

interface ConfirmModalProps {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  theme: ThemeDef;
}

export const ConfirmModal = ({ isOpen, message, onConfirm, onCancel, theme }: ConfirmModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="absolute inset-0 bg-[#020617]/85 backdrop-blur-[8px] cursor-pointer"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`relative w-full max-w-[400px] border-[2px] rounded-[32px] p-[30px] flex flex-col font-[Helvetica_Neue,Arial,sans-serif] ${theme.modalBg} transition-colors duration-500`}
          >
            <div className="text-center mb-[32px]">
               <h3 className={`font-bold text-[20px] mb-4 uppercase tracking-[1px] ${theme.modalTitle}`}>XÁC NHẬN</h3>
               <p className={`text-[16px] leading-[1.5] ${theme.modalText}`}>{message}</p>
            </div>

            <div className="flex justify-center gap-[16px]">
              <button
                onClick={onCancel}
                className={`px-[30px] py-[12px] rounded-[12px] font-[600] text-[14px] uppercase tracking-[1px] cursor-pointer border-none bg-[#334155] text-white hover:bg-[#475569] transition-colors w-[120px]`}
              >
                KHÔNG
              </button>
              <button
                onClick={onConfirm}
                className={`px-[30px] py-[12px] rounded-[12px] font-[600] text-[14px] uppercase tracking-[1px] cursor-pointer border-none transition-opacity ${theme.button} hover:opacity-90 w-[120px]`}
              >
                CÓ
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
