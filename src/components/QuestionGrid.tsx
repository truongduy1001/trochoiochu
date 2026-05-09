import { Question } from '../data/questions';
import { QuestionCard } from './QuestionCard';
import { ThemeDef } from '../data/themes';

interface QuestionGridProps {
  questions: Question[];
  openedIds: number[];
  onSelect: (question: Question) => void;
  theme: ThemeDef;
  isEditMode: boolean;
}

export const QuestionGrid = ({ questions, openedIds, onSelect, theme, isEditMode }: QuestionGridProps) => {
  return (
    <main className="flex-grow p-[20px] md:p-[40px] w-full max-w-[1400px] mx-auto h-full grid grid-cols-4 md:grid-cols-5 xl:grid-cols-5 auto-rows-[minmax(120px,1fr)] gap-[16px] sm:gap-[24px]">
      {questions.map((q) => (
        <QuestionCard
            key={q.id}
            question={q}
            isOpened={openedIds.includes(q.id)}
            onClick={onSelect}
            theme={theme}
            isEditMode={isEditMode}
          />
        ))}
    </main>
  );
};
