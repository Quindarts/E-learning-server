# e-Learning App Backend

## Mục lục

- [Giới thiệu](#giới-thiệu)
- [Công nghệ sử dụng](#công-nghệ-sử-dụng)
- [Cài đặt và khởi chạy](#cài-đặt-và-khởi-chạy)
- [Cấu trúc dự án](#cấu-trúc-dự-án)
- [API Endpoints](#api-endpoints)
- [Môi trường phát triển](#môi-trường-phát-triển)

## Giới thiệu

Backend cho ứng dụng e-learning app được xây dựng bằng **Node.js** và **TypeScript**, sử dụng **Redis** để cache dữ liệu và **Mongoose** để tương tác với cơ sở dữ liệu **MongoDB**. Phần backend cung cấp các API cần thiết cho các chức năng của ứng dụng e-learning như đăng ký, đăng nhập, quản lý khóa học và người dùng.

## Công nghệ sử dụng

- **Node.js**: Runtime để xây dựng ứng dụng phía server.
- **TypeScript**: Ngôn ngữ lập trình để tăng cường tính bảo mật và dễ bảo trì cho code.
- **Express.js**: Framework cho việc phát triển các API RESTful.
- **Mongoose**: ORM cho MongoDB để dễ dàng thao tác dữ liệu.
- **Redis**: Cache dữ liệu nhằm tăng tốc độ xử lý và giảm tải cho cơ sở dữ liệu.
- **JWT (JSON Web Token)**: Xác thực và phân quyền người dùng.

## Cài đặt và khởi chạy

### Yêu cầu hệ thống

- **Node.js** phiên bản >= 14.x
- **MongoDB**
- **Redis**

### Hướng dẫn cài đặt

1. Clone repository này:
   ```bash
   git clone https://github.com/Quindarts/E-learning-server.git
   cd e-learning-server
   ```
2. Cài đặt các dependency:
   ```bash
   npm install
   ```
3. Tạo file `.env` cập nhật các giá trị cần thiết.
4. Khởi chạy server ở môi trường development:
   ```bash
   npm run dev
   ```
   Hoặc build và chạy ở môi trường production:
   ```bash
   npm run build
   npm start
   ```

## Cấu trúc dự án

```
.
├── src
│   ├── cert
│   ├── config
│   ├── constant
│   ├── controllers
│   ├── helper
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── types
│   ├── utils
│   └── index.ts
├── tests
├── package.json
├── tsconfig.json
└── README.md
```

- **cert/**: Chứa các chứng chỉ bảo mật cần thiết (SSL certificates).
- **config/**: Chứa các file cấu hình cho dự án, bao gồm kết nối cơ sở dữ liệu và cấu hình Redis.
- **constant/**: Chứa các hằng số được sử dụng trong toàn bộ ứng dụng.
- **controllers/**: Chứa các logic xử lý request.
- **helper/**: Các hàm hỗ trợ tái sử dụng cho nhiều thành phần khác nhau.
- **middlewares/**: Các middleware như authentication, validation.
- **models/**: Định nghĩa các schema Mongoose.
- **routes/**: Định nghĩa các endpoint API.
- **types/**: Định nghĩa các interface và type để sử dụng với TypeScript.
- **utils/**: Chứa các hàm tiện ích được tái sử dụng.
- **index.ts**: File chính để khởi chạy ứng dụng.

## API Endpoints

### Authentication

- `POST /api/auth/register`: Đăng ký người dùng mới.
- `POST /api/auth/login`: Đăng nhập và nhận JWT token.

### User

- `GET /api/users/profile`: Lấy thông tin người dùng (Yêu cầu authentication).
- `PUT /api/users/profile`: Cập nhật thông tin người dùng.

### Courses

- `GET /api/courses`: Lấy danh sách khóa học.
- `GET /api/courses/:id`: Lấy chi tiết một khóa học.
- `POST /api/courses`: Tạo khóa học mới (Yêu cầu quyền admin).
- `PUT /api/courses/:id`: Cập nhật thông tin khóa học.
- `DELETE /api/courses/:id`: Xóa khóa học (Yêu cầu quyền admin).

### ...

## Môi trường phát triển

Tạo file `.env` với các biến môi trường cần thiết như sau:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/e-learning
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=your_jwt_secret
```
