import React, { useEffect, useState, useCallback } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { OrderApi } from "../api/orderApi";
import { RootStackParamList } from "../navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { globalStyles } from "../styles/globalCss";
import { theme } from "../styles/theme";
import socket from "../services/socket";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "UserOrderDetail">;

const statusMap: Record<string, { label: string; color: string; shadow: string }> = {
  pending: {
    label: "Đang chờ",
    color: "#3498db",
    shadow: "#2980b9",
  },
  processing: {
    label: "Đang xử lý",
    color: "#f1c40f",
    shadow: "#f39c12",
  },
};

const OrderList = () => {
  const navigation = useNavigation<NavigationProp>();
  const [orders, setOrders] = useState<any[]>([]);

  const fetchOrders = async () => {
    try {
      const res = await OrderApi.getNotCompletedOrCancelled();
      setOrders(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

    useEffect(() => {
        fetchOrders();
        socket.on("orderUpdated", fetchOrders);
        return () => { socket.off("orderUpdated", fetchOrders); };
    }, []);

    useFocusEffect(
        useCallback(() => {
            const load = async () => {
                await fetchOrders();
            };
            load();
        }, [])
    );

  const renderOrderInfo = (order: any) => {
    if (order.table_number) return `Bàn ${order.table_number}`;
    if (order.user_id) return "Mang đi";
    return "Không rõ";
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background2, padding: 10 }}>
      <Text style={globalStyles.titleOrder}>Danh sách đơn hàng</Text>
      <ScrollView contentContainerStyle={{ gap: 12 }}>
        {orders.length === 0 ? (
          <Text>Không có đơn hàng nào.</Text>
        ) : (
          orders.map((order) => {
            const status = statusMap[order.status] || {
              label: order.status,
              color: "#bdc3c7",
              shadow: "#7f8c8d",
            };

            return (
              <TouchableOpacity
                key={order.id}
                style={globalStyles.orderCard}
                onPress={() =>
                  navigation.navigate("UserOrderDetail", { orderId: order.id })
                }
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={globalStyles.orderId}>#{order.id}</Text>
                  <Text style={globalStyles.infoText}>{renderOrderInfo(order)}</Text>
                  <View
                    style={[
                      globalStyles.statusBadge,
                      { backgroundColor: status.color, shadowColor: status.shadow },
                    ]}
                  >
                    <Text style={globalStyles.statusText}>{status.label}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>
    </View>
  );
};

export default OrderList;
