> npx create-next-app@latest .
> npx shadcn@latest init        
> npx shadcn@latest add button tooltip accordion radio-group label card
> npm install react-icons --save
> npm install @clerk/nextjs
> npx sanity@latest init (All Yes + Clean project...)
> npm install motion
> npm i dayjs
> npm install react-is
> npm install zustand --legacy-peer-deps
> npm install react-hot-toast (Pop-up message `https://react-hot-toast.com/docs`) 


import { cn } from "@/lib/utils"

1. Clerk: để tạo form đăng nhập
- Chạy lệnh cài đặt
- Tạo file .env để lưu KEY
- Tạo file middleware.ts và copy paste vào
2. Sanity: 
- Cài đặt Sanity vào dự án
- Tạo 1 folder (client) và bỏ `shop`, `layout.tsx` và `page.tsx` vào đó rồi tạo 1 file layout.tsx mơi ở ngoài và setting lại cả 2 file
- Truy cập `localhost:3000/studio` nếu thành công sẽ vào thẳng giao diện đăng nhập vào sanity, tiếp tục đăng nhập và code thêm những content bên trong folder `sanity/schemaTypes/` để tạo những mô hình để upload dữ liệu lên trang web dễ dàng.
3. Cài Zustand: (Cấu trúc chức năng cho các button)
- Tất cả cài đặt setup bên trong `store.ts`
4. Toast: (pop-up message)
- Cấu trúc file trong layout.tsx
+ AddToCartButton.tsx: pop-up message khi click vào button
+ CartIcon.tsx: number của cart tăng theo số món đồ user đã add.
+  

, Shadcn, Icon-React, Button, Tooltip, 