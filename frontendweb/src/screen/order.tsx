import { useEffect, useState } from "react";
import { OrderApi, type Order } from "../api/orderApi";
import { useSearchParams } from "react-router-dom";
import { getProductImage } from "../utils/imageHelper";
import { useNavigation } from "../navigation";

export default function Invoice() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchParams] = useSearchParams();
  const table_number = Number(searchParams.get("table_number") || 1);
  const { gotoMenu } = useNavigation();

  useEffect(() => {
    OrderApi.getNotCompletedOrCancelled({ table_number })
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, [table_number]);

  // Gom tất cả item của cùng 1 bàn
  const mergedItems = orders.flatMap(order => order.items);

  // Gom theo tên sản phẩm
  const groupedItems = mergedItems.reduce((acc: any[], item) => {
    const existing = acc.find(i => i.product.name === item.product.name);
    if (existing) {
      existing.quantity += item.quantity;
      existing.subtotal += item.subtotal ?? item.product.price * item.quantity;
    } else {
      acc.push({
        ...item,
        quantity: item.quantity,
        subtotal: item.subtotal ?? item.product.price * item.quantity
      });
    }
    return acc;
  }, []);

  // Tính tổng tiền
  const totalPrice = groupedItems.reduce(
    (sum, item) => sum + item.subtotal,
    0
  );

  // Lấy thời gian order đầu tiên (hoặc mới nhất tuỳ nhu cầu)
  const orderTime = orders.length > 0 
    ? new Date(orders[0].created_at).toLocaleString("vi-VN") 
    : "";

  return (
    <div className="bg-[#F1E0C6] p-4 min-h-screen flex flex-col items-center space-y-4">
      {/* Khung hoá đơn */}
      <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-lg">
        {/* Tiêu đề */}
        <h1 className="text-center text-2xl sm:text-3xl font-bold text-[#795548] mb-2">
          Mộc Quán
        </h1>
        <p className="text-center text-base sm:text-lg font-semibold text-gray-700 mb-1">
          Bàn số {table_number}
        </p>
        {orderTime && (
          <p className="text-center text-sm text-gray-500 mb-6">
            Thời gian order: {orderTime}
          </p>
        )}

        {/* Danh sách sản phẩm */}
        <div className="space-y-3">
          {groupedItems.map(item => (
            <div
              key={item.product.id}
              className="flex items-center border-b border-gray-200 pb-2"
            >
              <img
                src={getProductImage(item.product.image_url)}
                alt={item.product.name}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded mr-3"
              />
              <div className="flex-1">
                <p className="font-medium text-[#795548]">
                  {item.product.name}
                </p>
                <p className="text-sm text-gray-500">
                  x{item.quantity} × {item.product.price.toLocaleString()} VND
                </p>
              </div>
              <p className="font-semibold text-[#795548] text-sm sm:text-base">
                {item.subtotal.toLocaleString()} VND
              </p>
            </div>
          ))}
        </div>

        {/* Tổng tiền */}
        <div className="mt-6 text-right font-bold text-lg sm:text-xl text-[#795548]">
          Tổng cộng: {totalPrice.toLocaleString()} VND
        </div>
        <div className="mt-8 pt-4 text-center font-bold text-[#795548] border-t border-[#795548] mx-4">
          XIN CẢM ƠN QUÝ KHÁCH
        </div>
      </div>
      {/* Nút quay lại nằm riêng biệt */}
      <button
        onClick={gotoMenu}
        className="bg-[#795548] text-white px-4 py-2 sm:px-6 sm:py-2 rounded-xl shadow hover:bg-[#5d4037] text-sm sm:text-base"
      >
        Quay lại menu
      </button>
    </div>
  );
}
