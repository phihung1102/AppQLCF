export const TranslateOrderStatus = (status: string) => {
  switch (status) {
    case "pending": return "Chờ xác nhận";
    case "processing": return "Đang chế biến";
    case "completed": return "Hoàn thành";
    case "cancelled": return "Đã hủy";
    default: return status;
  }
};
