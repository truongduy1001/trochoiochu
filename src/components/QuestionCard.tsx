import { motion } from 'motion/react';
import React from 'react';
import { Question } from '../data/questions';
import { ThemeDef } from '../data/themes';

interface QuestionCardProps {
  key?: React.Key;
  question: Question;
  isOpened: boolean;
  onClick: (question: Question) => void;
  theme: ThemeDef;
  isEditMode: boolean;
}

export const QuestionCard = ({ question, isOpened, onClick, theme, isEditMode }: QuestionCardProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(question)}
      className={`
        w-full h-full min-h-[100px] md:min-h-[120px] rounded-[24px] border-[2px] flex flex-col items-center justify-center relative transition-all duration-300 outline-none
        ${isOpened && !isEditMode
          ? theme.cardOpened
          : theme.cardNotOpened
        }
        ${isEditMode ? 'ring-2 ring-red-500 ring-offset-2 ring-offset-transparent' : ''}
      `}
    >
      <span className={`text-[36px] md:text-[48px] font-[900] leading-none transition-colors duration-300 ${(isOpened && !isEditMode) ? theme.cardTextOpened : theme.cardText}`}>
        {String(question.id).padStart(2, '0')}
      </span>
      {isOpened && !isEditMode && (
        <span className={`absolute bottom-[8px] md:bottom-[12px] text-[9px] md:text-[10px] font-bold tracking-[1px] uppercase ${theme.cardTextOpened}`}>
          ĐÃ CHỌN
        </span>
      )}
    </motion.button>
  );
};
