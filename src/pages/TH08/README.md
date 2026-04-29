# Ứng Dụng Thể Dục, Theo Dõi Sức Khỏe - TH08

Ứng dụng hoàn chỉnh quản lý sức khỏe và tập luyện thể dục với đầy đủ các chức năng theo yêu cầu.

## 📋 Tính Năng Chính

### 1. **Dashboard (Trang Chủ)** - `src/pages/TH08/index.jsx`

- **4 Thẻ Chỉ Số Nhanh:**

  - 💪 Buổi tập trong tháng
  - 🔥 Tổng calo đã đốt
  - 📈 Ngày tập liên tiếp (Streak)
  - 🎯 Mục tiêu hoàn thành (%)

- **Biểu Đồ Cột:** Số buổi tập theo từng tuần trong tháng
- **Biểu Đồ Đường:** Thay đổi cân nặng theo thời gian
- **Timeline:** Danh sách 5 buổi tập gần nhất với chi tiết (Ngày, Loại, Thời lượng, Calo, Ghi chú)

---

### 2. **Nhật Ký Tập Luyện** - `src/pages/TH08/Workout.jsx`

**Bảng Danh Sách với các cột:**

- Ngày
- Loại bài tập (Cardio, Strength, Yoga, HIIT, Other)
- Thời lượng (phút)
- Calo đốt
- Ghi chú
- Trạng thái (Hoàn thành / Bỏ lỡ)

**Tính Năng Tìm Kiếm & Lọc:**

- 🔍 Tìm kiếm theo tên bài tập
- 📌 Lọc theo loại bài tập (Select)
- 📅 Lọc theo khoảng thời gian (DatePicker range)

**CRUD Operations:**

- ➕ Thêm buổi tập mới (Modal Form)
- ✏️ Sửa buổi tập (Form pre-fill dữ liệu cũ)
- 🗑️ Xóa buổi tập (Popconfirm xác nhận)

---

### 3. **Nhật Ký Chỉ Số Sức Khỏe** - `src/pages/TH08/Health.jsx`

**Bảng Ghi Lại Chỉ Số Theo Ngày:**

- Ngày
- Cân nặng (kg)
- Chiều cao (cm)
- **BMI** (Tự tính toán + Tag màu phân loại)
- Nhịp tim lúc nghỉ (bpm)
- Giờ ngủ

**Tính Toán BMI:**

```
BMI = Cân nặng (kg) / (Chiều cao (m))²
```

**Phân Loại BMI Với Tag Màu:** | Phân loại | Chỉ số BMI | Màu tag | |-----------|-----------|--------| | Thiếu cân | < 18.5 | Xanh dương | | Bình thường | 18.5 – 24.9 | Xanh lá | | Thừa cân | 25 – 29.9 | Vàng | | Béo phì | ≥ 30 | Đỏ |

**CRUD Operations:**

- ➕ Thêm chỉ số sức khỏe
- ✏️ Sửa chỉ số
- 🗑️ Xóa chỉ số

---

### 4. **Quản Lý Mục Tiêu** - `src/pages/TH08/Goals.jsx`

**Hiển Thị Dạng Card:** Mỗi card gồm:

- Tên mục tiêu
- Loại (Giảm cân / Tăng cơ / Cải thiện sức bền / Khác)
- Giá trị mục tiêu & Giá trị hiện tại
- Progress Bar (% hoàn thành)
- Deadline
- Trạng thái (Đang thực hiện / Đã đạt / Đã hủy)

**Tính Năng:**

- ➕ Thêm mục tiêu mới (Drawer Form)
- 📝 Cập nhật giá trị hiện tại trực tiếp bằng Input
- ✏️ Sửa mục tiêu
- 🗑️ Xóa mục tiêu (Popconfirm)
- 🔘 Lọc theo trạng thái (Segmented - Tất cả / Đang thực hiện / Đã đạt / Đã hủy)

---

### 5. **Thư Viện Bài Tập** - `src/pages/TH08/Exercises.jsx`

**Hiển Thị Dạng Card Grid (3 cột):** Mỗi card gồm:

- Tên bài tập
- Nhóm cơ tác động (Tag)
- Mức độ khó (Tag: Dễ / Trung bình / Khó)
- Mô tả ngắn
- Calo đốt/giờ

**Tính Năng Tìm Kiếm & Lọc:**

- 🔍 Tìm kiếm theo tên bài tập
- 📌 Lọc theo nhóm cơ (Chest / Back / Legs / Shoulders / Arms / Core / Full Body)
- 📊 Lọc theo mức độ khó (Dễ / Trung bình / Khó)

**CRUD Operations:**

- ➕ Thêm bài tập (Modal Form)
- ✏️ Sửa bài tập
- 🗑️ Xóa bài tập
- 👁️ Xem chi tiết (Modal) - Hiển thị hướng dẫn thực hiện đầy đủ

---

## 🛠️ Các Công Cụ & Thư Viện Sử Dụng

- **Ant Design**: UI Components (Card, Table, Modal, Form, Button, DatePicker, Select, Tag, Progress...)
- **@ant-design/charts**: Column & Line charts cho Dashboard
- **dayjs**: Xử lý ngày tháng
- **React**: State management với `useState`, lifecycle với `useEffect`

---

## 💾 Lưu Trữ Dữ Liệu

Tất cả dữ liệu được lưu trữ trong **localStorage** của trình duyệt:

- `workouts` - Danh sách buổi tập
- `health` - Danh sách chỉ số sức khỏe
- `goals` - Danh sách mục tiêu
- `exercises` - Danh sách bài tập

Mock data được tự động khởi tạo lần đầu tiên (trong `mockData.js` và được gọi từ `useEffect` của Dashboard).

---

## 📂 Cấu Trúc File

```
src/pages/TH08/
├── index.jsx           # Dashboard
├── Health.jsx          # Nhật ký chỉ số sức khỏe
├── Workout.jsx         # Nhật ký tập luyện
├── Goals.jsx           # Quản lý mục tiêu
├── Exercises.jsx       # Thư viện bài tập
├── utils.js            # Utility functions (calcBMI, bmiTag, getData, setData)
└── mockData.js         # Dữ liệu mẫu khởi tạo
```

---

## 🔧 Hàm Utility (utils.js)

```javascript
// Lấy dữ liệu từ localStorage
getData(key);

// Lưu dữ liệu vào localStorage
setData(key, data);

// Tính toán BMI
calcBMI(weight_kg, height_cm);

// Lấy thông tin phân loại BMI (text + color)
bmiTag(bmi);
```

---

## 📊 Mock Data

Ứng dụng được khởi tạo với dữ liệu mẫu:

- **8 buổi tập** (Cardio, Strength, Yoga, HIIT) từ ngày 20/4 đến 28/4
- **8 chỉ số sức khỏe** (cân nặng từ 67kg → 65kg)
- **3 mục tiêu** (Giảm cân, Tăng cơ, Chạy 5km)
- **9 bài tập** (Push-up, Squat, Deadlift, Pull-up, Curl, Plank, Shoulder Press, Running, Cycling)

---

## 🚀 Cách Sử Dụng

1. **Truy cập Dashboard**: Xem tổng quan các chỉ số sức khỏe & tập luyện
2. **Thêm buổi tập**: Vào "Nhật ký tập luyện" → Click "+ Thêm"
3. **Ghi nhận chỉ số**: Vào "Nhật ký chỉ số sức khỏe" → Click "+ Thêm chỉ số"
4. **Đặt mục tiêu**: Vào "Quản lý mục tiêu" → Click "+ Thêm mục tiêu"
5. **Tham khảo bài tập**: Vào "Thư viện bài tập" → Tìm kiếm hoặc lọc bài tập

---

## ✨ Tính Năng Đặc Biệt

- ✅ **Tính streak tự động**: Đếm số ngày tập liên tiếp từ ngày hôm nay
- ✅ **Biểu đồ động**: Tự cập nhật khi thêm/sửa dữ liệu
- ✅ **BMI tự tính**: Tính toán tự động và phân loại theo tiêu chuẩn quốc tế
- ✅ **Lọc & Tìm kiếm**: Đa tiêu chí (ngày, loại, nhóm cơ, mức độ khó)
- ✅ **Xác nhận xóa**: Popconfirm trước khi xóa dữ liệu
- ✅ **Form validation**: Kiểm tra dữ liệu bắt buộc

---

## 🎯 Đã Hoàn Thành 100% Yêu Cầu

✅ Dashboard với 4 thẻ chỉ số + 2 biểu đồ + Timeline ✅ Nhật ký tập luyện (CRUD, tìm kiếm, lọc) ✅ Nhật ký chỉ số sức khỏe (BMI, Heart Rate, Sleep) ✅ Quản lý mục tiêu (Card, Progress Bar, Segmented filter) ✅ Thư viện bài tập (Grid, CRUD, chi tiết modal) ✅ Lưu trữ localStorage ✅ UI đẹp với Ant Design

Bạn có thể bắt đầu sử dụng ứng dụng ngay bây giờ! 🎉
