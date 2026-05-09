export interface Question {
  id: number;
  question: string;
}

// Lưu trữ dữ liệu câu hỏi, dễ dàng chỉnh sửa hoặc tăng số lượng bằng cách thêm phần tử vào mảng
export const questions: Question[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  question: `Nội dung của câu hỏi số ${i + 1}? Bạn hãy đọc kỹ và trả lời thật chính xác nhé!`,
}));
