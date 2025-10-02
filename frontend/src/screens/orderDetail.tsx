import { View, Text, Image, TouchableOpacity, ScrollView, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { OrderApi } from "../api/orderApi";
import { Order, OrderItem } from "../types/inđex";
import { globalStyles } from "../styles/globalCss";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AdminStackParamList } from "../navigation/adminIndex";

type OrderDetailNavProp = NativeStackNavigationProp<AdminStackParamList, "OrderDetail">;
type OrderDetailRouteProp = RouteProp<AdminStackParamList, "OrderDetail">;

// BASE_URL backend để nối với path ảnh
const BASE_URL = Platform.OS === "android" ? "http://10.0.2.2:3000" : "http://192.168.1.5:3000" ;

const OrderDetail = () => {
  const navigation = useNavigation<OrderDetailNavProp>();
  const route = useRoute<OrderDetailRouteProp>();
  const { id } = route.params;

  const [orderItem, setOrderItem] = useState<Order | null>(null);
  const [items, setItems] = useState<OrderItem[]>([]);

  useEffect(() => {
    OrderApi.getOrder(id)
      .then((res) => {
        const order = res.data;
        // Xử lý ảnh
        const mappedItems = order.items.map((item) => ({
          ...item,
          product: {
            ...item.product,
            image: item.product.image_url
              ? { id: item.product.id, url: `${BASE_URL}${item.product.image_url}` }
              : null,
          },
        }));
        setOrderItem(order);
        setItems(mappedItems);
      })
      .catch((err) => console.error(err));
  }, [id]);

  // Gom nhóm sản phẩm
  const groupedItems = items.reduce((acc: any[], item) => {
    const existing = acc.find((i) => i.product.id === item.product.id);
    if (existing) {
      existing.quantity += item.quantity;
      existing.subtotal += item.subtotal;
    } else {
      acc.push({ ...item });
    }
    return acc;
  }, []);

  const totalPrice = groupedItems.reduce((sum, item) => sum + item.subtotal, 0);

  if (!orderItem) {
    return (
      <View style={globalStyles.content}>
        <Text>Đang tải...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#F1E0C6", padding: 16 }}>
      <View style={{ backgroundColor: "white", borderRadius: 16, padding: 16 }}>
        <Text style={{ fontSize: 22, fontWeight: "bold", textAlign: "center", color: "#795548" }}>
          Mộc Quán
        </Text>
        <Text style={{ textAlign: "center", fontWeight: "600", marginVertical: 4 }}>
          Bàn {orderItem.table_number ?? "??"}
        </Text>
        <Text style={{ textAlign: "center", fontSize: 12, color: "gray", marginBottom: 16 }}>
          Thời gian: {new Date(orderItem.created_at).toLocaleString("vi-VN")}
        </Text>

        {groupedItems.map((item) => (
          <View
            key={item.product.id}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 12,
              borderBottomWidth: 1,
              borderColor: "#eee",
              paddingBottom: 8,
            }}
          >
            {item.product.image ? (
              <Image
                source={{ uri: item.product.image }}
                style={{ width: 40, height: 40, borderRadius: 8, marginRight: 12 }}
                resizeMode="cover"
              />
            ) : (
              <FontAwesome5 name="image" size={32} color="#ccc" style={{ marginRight: 12 }} />
            )}
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "600", color: "#795548" }}>{item.product.name}</Text>
              <Text style={{ fontSize: 12, color: "gray" }}>
                x{item.quantity} × {item.product.price.toLocaleString()} VND
              </Text>
            </View>
            <Text style={{ fontWeight: "bold", color: "#795548" }}>
              {item.subtotal.toLocaleString()} VND
            </Text>
          </View>
        ))}

        <Text
          style={{
            textAlign: "right",
            fontSize: 16,
            fontWeight: "bold",
            marginTop: 16,
            color: "#795548",
          }}
        >
          Tổng cộng: {totalPrice.toLocaleString()} VND
        </Text>
      </View>

      {/* Nút quay lại */}
      <TouchableOpacity
        onPress={() => navigation.goBack()} // ✅ quay lại đúng màn hình Order
        style={{
          marginTop: 20,
          backgroundColor: "#795548",
          padding: 12,
          borderRadius: 12,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Quay lại</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default OrderDetail;
