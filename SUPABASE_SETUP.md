# Hướng dẫn kết nối Supabase

Ứng dụng hiện tại đã được tích hợp Supabase để lưu trữ dữ liệu câu hỏi. Để tính năng này hoạt động, bạn cần cấu hình Supabase theo các bước sau:

## 1. Tạo dự án Supabase
1. Truy cập [Supabase](https://supabase.com/) và tạo một Project mới.
2. Từ trang quản trị Project, vào mục **Project Settings -> API** để lấy `Project URL` và `anon public key`.

## 2. Cấu hình biến môi trường
1. Trong AI Studio, mở mục **Secrets** hoặc thay đổi file `.env` (tuỳ thuộc vào môi trường).
2. Thêm hai biến sau vào trong Config/Environment Variables:
   - `VITE_SUPABASE_URL`: (Giá trị Project URL của bạn)
   - `VITE_SUPABASE_ANON_KEY`: (Giá trị anon key của bạn)

## 3. Tạo bảng dữ liệu (Table)
Bằng cách vào tính năng **SQL Editor** trong bảng điểu khiển của Supabase, hãy chạy đoạn mã tạo bảng sau:

```sql
create table public.questions (
  id bigint primary key,
  question text not null
);

-- Cho phép đọc (Read) public
create policy "Allow public access for select" on public.questions for select using (true);
-- Cho phép ghi (Insert/Upsert) public (lưu ý: Chỉ xài cho app nội bộ)
create policy "Allow public access for insert" on public.questions for insert with check (true);
create policy "Allow public access for update" on public.questions for update using (true);

-- Hoặc tắt hoàn toàn Row Level Security (RLS) để test nhanh chóng:
alter table public.questions disable row level security;
```

Sau khi hoàn tất, bạn có thể sử dụng nút **Chỉnh sửa** trên giao diện trò chơi và nội dung sẽ được đồng bộ lên Supabase của bạn!
