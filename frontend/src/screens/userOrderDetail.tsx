import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, Modal, Platform } from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation";
import { OrderApi } from "../api/orderApi";
import { globalStyles } from "../styles/globalCss";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { theme } from "../styles/theme";
import { Order, OrderItem } from "../types/inđex";

const BASE_URL = Platform.OS === "android" ? "http://10.0.2.2:3000" : "http://192.168.1.5:3000";

type OrderDetailRouteProp = RouteProp<RootStackParamList, "UserOrderDetail">;

const UserOrderDetail = () => {
  const route = useRoute<OrderDetailRouteProp>();
  const navigation = useNavigation<any>();
  const { orderId, userId, table_number } = route.params;

  const [order, setOrder] = useState<Order | null>(null);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<string | null>(null);

  // Gộp các món trùng nhau
  const mergeItems = (items: OrderItem[]): OrderItem[] => {
    const merged: OrderItem[] = [];
    items.forEach((item) => {
      const existing = merged.find((i) => i.product.id === item.product.id);
      if (existing) {
        existing.quantity += item.quantity;
        existing.subtotal += item.subtotal;
      } else {
        merged.push({ ...item });
      }
    });
    return merged;
  };

  const fetchOrder = async () => {
    try {
      let res;
      if (orderId) {
        res = await OrderApi.getOrder(orderId);
      } else {
        res = await OrderApi.getNotCompletedOrCancelled({
          table_number,
          user_id: userId,
        });
        if (res.data.length === 0) return;
        res = { data: res.data[0] };
      }

      const orderData: Order = {
        ...res.data,
        items: mergeItems(
          res.data.items.map((it: any) => ({
            ...it,
            product: {
              ...it.product,
              image: it.product.image_url
                ? { id: it.product.id, url: `${BASE_URL}${it.product.image_url}` }
                : null,
            },
          }))
        ),
      };

      setOrder(orderData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  const showConfirm = (status: string) => {
    setPendingStatus(status);
    setConfirmVisible(true);
  };

  const handleConfirm = async () => {
    if (!pendingStatus || !order?.id) return;
    setConfirmVisible(false);
    try {
      await OrderApi.update(order.id, pendingStatus);
      // Nếu hủy hoặc hoàn thành, quay về UserTabs
      if (pendingStatus === "completed" || pendingStatus === "cancelled") {
        navigation.navigate("UserTabs");
      } else {
        fetchOrder(); // cập nhật UI nếu chỉ chuyển trạng thái processing
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!order) return <Text>Đang tải...</Text>;

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "#ffffff" }}>
      {/* Header */}
      <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: 12, marginBottom: 12 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 12, padding: 8, borderRadius: 12 }}>
          <FontAwesome5 name="arrow-left" size={18} color={theme.colors.primary} />
        </TouchableOpacity>
        <Text style={globalStyles.orderDetailTitle}>
          {order.table_number ? `Bàn số ${order.table_number}` : "Bán mang đi"}
        </Text>
      </View>

      {/* Items */}
      <ScrollView>
        {order.items.map((it) => (
          <View key={it.id} style={globalStyles.orderDetailItem}>
            {it.product.image && <Image source={{ uri: it.product.image.url }} style={globalStyles.orderDetailItemImage} />}
            <View style={globalStyles.orderDetailItemInfo}>
              <Text style={globalStyles.orderDetailItemName}>{it.product.name}</Text>
              <Text style={globalStyles.orderDetailItemPrice}>{it.unit_price.toLocaleString()} ₫</Text>
            </View>
            <Text style={globalStyles.orderDetailItemQty}>x{it.quantity}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Footer buttons */}
      {order.status === "pending" && (
        <View style={globalStyles.orderDetailFooter}>
          <TouchableOpacity
            style={[globalStyles.orderDetailConfirmBtn, { backgroundColor: "#ff8b1e", flex: 1 }]}
            onPress={() => showConfirm("processing")}
          >
            <Text style={globalStyles.orderDetailConfirmText}>Xác nhận</Text>
          </TouchableOpacity>
        </View>
      )}

      {order.status === "processing" && (
        <View style={globalStyles.orderDetailFooter}>
          <TouchableOpacity
            style={[globalStyles.orderDetailConfirmBtn, { backgroundColor: "#f91d1d" }]}
            onPress={() => showConfirm("cancelled")}
          >
            <Text style={globalStyles.orderDetailConfirmText}>Hủy đơn</Text>
          </TouchableOpacity>

          <Text style={globalStyles.orderDetailTotal}>Tổng: {order.total.toLocaleString()} ₫</Text>

          <TouchableOpacity
            style={[globalStyles.orderDetailConfirmBtn, { backgroundColor: "#4ab706ff" }]}
            onPress={() => showConfirm("completed")}
          >
            <Text style={globalStyles.orderDetailConfirmText}>Hoàn thành</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Modal xác nhận */}
      <Modal visible={confirmVisible} transparent animationType="fade">
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <View style={{ width: 300, backgroundColor: "white", padding: 20, borderRadius: 10, alignItems: "center" }}>
            <Text style={{ marginBottom: 20, fontSize: 16, textAlign: "center" }}>
              Bạn có chắc chắn muốn{" "}
              {pendingStatus === "cancelled" ? "hủy" : pendingStatus === "completed" ? "hoàn thành" : "xác nhận"}{" "}
              đơn này không?
            </Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
              <TouchableOpacity
                style={{ flex: 1, backgroundColor: theme.colors.primary, padding: 12, borderRadius: 8, marginRight: 8, alignItems: "center" }}
                onPress={handleConfirm}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>Có</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ flex: 1, backgroundColor: "gray", padding: 12, borderRadius: 8, marginLeft: 8, alignItems: "center" }}
                onPress={() => setConfirmVisible(false)}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>Không</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default UserOrderDetail;
