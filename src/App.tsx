/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { QuestionGrid } from './components/QuestionGrid';
import { QuestionModal } from './components/QuestionModal';
import { QuestionEditModal } from './components/QuestionEditModal';
import { ConfirmModal } from './components/ConfirmModal';
import { Footer } from './components/Footer';
import { questions as defaultQuestions, Question } from './data/questions';
import { playSound } from './utils/audio';
import { ThemeKey, themes } from './data/themes';
import { supabase } from './lib/supabase';

export default function App() {
  const [questionsData, setQuestionsData] = useState<Question[]>(defaultQuestions);
  const [openedIds, setOpenedIds] = useState<number[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [confirmAction, setConfirmAction] = useState<{type: 'reset' | 'undo' | null, message: string}>({type: null, message: ''});
  const [resetTrigger, setResetTrigger] = useState(0);
  const [themeKey, setThemeKey] = useState<ThemeKey>('ocean');
  const [isEditMode, setIsEditMode] = useState(false);
  
  const theme = themes[themeKey];

  useEffect(() => {
    async function loadQuestions() {
      if (!supabase) {
        console.warn('Chưa cấu hình Supabase! Vui lòng thêm VITE_SUPABASE_URL và VITE_SUPABASE_ANON_KEY.');
        return;
      }
      if (supabase) {
        try {
          const { data, error } = await supabase.from('questions').select('*').order('id', { ascending: true });
          if (error) {
            console.error('Error fetching questions from Supabase:', error);
            return;
          }
          if (data && data.length > 0) {
            setQuestionsData(data);
          } else if (data?.length === 0) {
            // Sync default questions if table is empty
            const { error: insertError } = await supabase.from('questions').insert(defaultQuestions);
            if (insertError) {
              console.warn('Lý do thường gặp: Supabase đang bật RLS. Bạn cần tắt RLS trên bảng questions.', insertError.message);
            }
          }
        } catch (err) {
          console.error('Supabase load error:', err);
        }
      }
    }
    loadQuestions();
  }, []);

  const handleSelectQuestion = (question: Question) => {
    playSound('click');
    if (isEditMode) {
      setEditingQuestion(question);
    } else {
      setSelectedQuestion(question);
      if (!openedIds.includes(question.id)) {
        setOpenedIds(prev => [...prev, question.id]);
      }
    }
  };

  const handleSaveQuestion = async (updated: Question) => {
    // Update local state immediately for fast feedback
    setQuestionsData(prev => prev.map(q => q.id === updated.id ? updated : q));
    if (!supabase) {
      alert('Lưu ý: Dữ liệu chỉ được lưu tạm trên màn hình vì bạn CHƯA cấu hình kết nối Supabase (thiếu VITE_SUPABASE_URL và VITE_SUPABASE_ANON_KEY). Vui lòng cấu hình trong phần Settings -> Secrets!');
      return;
    }
    if (supabase) {
      try {
        const { error } = await supabase.from('questions').upsert(updated);
        if (error) {
          console.error('Error saving to Supabase:', error);
          alert('Lỗi lưu Supabase: ' + error.message);
        }
      } catch (err) {
        console.error('Catch error:', err);
      }
    }
  };

  const handleCloseModal = () => {
    playSound('close');
    setSelectedQuestion(null);
  };

  const handleResetRequest = () => {
    setConfirmAction({ type: 'reset', message: 'Bạn có chắc chắn muốn làm mới trò chơi? Toàn bộ trạng thái sẽ bị xóa.' });
  };

  const handleUndoRequest = () => {
    setConfirmAction({ type: 'undo', message: 'Bạn có chắc chắn muốn quay lại hành động trước đó không?' });
  };

  const executeConfirm = () => {
    if (confirmAction.type === 'reset') {
      setOpenedIds([]);
      setSelectedQuestion(null);
      setResetTrigger(prev => prev + 1);
    } else if (confirmAction.type === 'undo') {
      setOpenedIds(prev => prev.slice(0, -1));
    }
    setConfirmAction({ type: null, message: '' });
  };

  const cancelConfirm = () => {
    setConfirmAction({ type: null, message: '' });
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 overflow-x-hidden selection:bg-indigo-500/30 ${theme.bg} ${theme.text}`}>
      <Header
        total={questionsData.length}
        opened={openedIds.length}
        theme={theme}
      />

      <div className="flex-1 flex flex-col relative z-0">
        <QuestionGrid
          questions={questionsData}
          openedIds={openedIds}
          onSelect={handleSelectQuestion}
          theme={theme}
          isEditMode={isEditMode}
        />
      </div>

      <Footer onReset={handleResetRequest} onUndo={handleUndoRequest} canUndo={openedIds.length > 0} theme={theme} themeKey={themeKey} setThemeKey={setThemeKey} isEditMode={isEditMode} setIsEditMode={setIsEditMode} />

      <QuestionModal
        question={selectedQuestion}
        onClose={handleCloseModal}
        theme={theme}
      />

      <QuestionEditModal
        question={editingQuestion}
        onClose={() => setEditingQuestion(null)}
        onSave={handleSaveQuestion}
        theme={theme}
      />

      <ConfirmModal
        isOpen={confirmAction.type !== null}
        message={confirmAction.message}
        onConfirm={executeConfirm}
        onCancel={cancelConfirm}
        theme={theme}
      />
    </div>
  );
}
