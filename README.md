# VMO-BLOG

- Tải các gói cần thiết bằng npm install 
- Tạo file .env dựa vào .env.example
- Tùy chỉnh file config

- Migrate database bằng: npx sequelize-cli db:migrate

- Start server: npm run dev

- Các type người dùng gồm:
+ Không đăng nhập - chỉ có quyền đọc và tìm kiếm post/tag/category
+ Type 1 (User) - người dùng thường
+ Type 2 (Mod) - người kiểm duyệt
+ Type 3 (Admin) - admin hệ thống

Các API hiện tại (test bằng Post man): https://www.getpostman.com/collections/caf2136ac69c20d073f3
- Auth:
  + api/auth/register (POST)
  + api/auth/login (GET)
  + api/auth/refresh-token (POST))

- User:
  + api/user (GET) (authen)
  + api/user/:id (GET) (authen)
  + api/user/type/:id (PATCH) (type 3) - Tùy chỉnh type của người dùng hệ thông
  + api/user/:id (DELETE) (type 3)

- Post:
  + api/post (GET) 
  + api/post/:id (GET)  
  + api/post (POST) (authen)
  + api/post/:id (PATCH)  (chủ nhân của bài viết hoặc type 2 trở lên)
  + api/post/:id (DELETE)  (chủ nhân của bài viết hoặc type 2 trở lên)

- Category:
  + api/category (GET) 
  + api/category/:id (GET) 
  + api/category (POST)  (type 2)
  + api/category/:id (PATCH)  (type 2)
  + api/category/:id (DELETE)  (type 2)

- Tag:
  + api/tag (GET) 
  + api/tag/:id (GET) 
  + api/tag (POST)  (type 2)
  + api/tag/:id (PATCH)  (type 2)
  + api/tag/:id (DELETE)  (type 2)

