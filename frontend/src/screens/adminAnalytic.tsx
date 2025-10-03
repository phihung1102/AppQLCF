import { View, Text, FlatList, TouchableOpacity, Modal, Pressable, ActivityIndicator, Platform } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { theme } from "../styles/theme";
import { globalStyles } from "../styles/globalCss";
import { OrderApi } from "../api/orderApi";
import { Order } from "../types/inđex";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AdminStackParamList } from "../navigation/adminIndex";

interface DailyStats {
  date: string;
  totalRevenue: number;
  totalOrders: number;
  orders: Order[];
}

type AdminAnalyticNavProp = NativeStackNavigationProp<AdminStackParamList, "AdminAnalytic">;

const AdminAnalytic = () => {
  const [stats, setStats] = useState<DailyStats[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedDay, setSelectedDay] = useState<DailyStats | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation<AdminAnalyticNavProp>();

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await OrderApi.getAll();
      const orders: Order[] = res.data;

      const grouped: { [key: string]: DailyStats } = {};
      orders.forEach((order) => {
        const date = order.created_at.split("T")[0];
        if (!grouped[date]) {
          grouped[date] = {
            date,
            totalRevenue: 0,
            totalOrders: 0,
            orders: [],
          };
        }
        grouped[date].totalRevenue += order.total;
        grouped[date].totalOrders += 1;
        grouped[date].orders.push(order);
      });

      const dailyStats = Object.values(grouped).sort((a, b) => (a.date < b.date ? 1 : -1));
      setStats(dailyStats);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchOrders();
    }, [])
  );

  const handleDayPress = (day: DailyStats) => {
    setSelectedDay(day);
    setModalVisible(true);
  };

  const getOrderOwnerText = (order: Order) => {
    if (order.table_number) return `Bàn ${order.table_number}`;
    if (order.user_id) return "Bán mang đi";
    return "Khách lạ";
  };

  const renderDayItem = ({ item, index }: { item: DailyStats; index: number }) => (
    <TouchableOpacity
      onPress={() => handleDayPress(item)}
      style={[
        globalStyles.componentFlatlist,
        { flexDirection: "row", justifyContent: "space-between", paddingVertical: 14, paddingHorizontal: 12 }
      ]}
    >
      <Text style={{ fontWeight: "600" }}>{index + 1}. {item.date}</Text>
      <View style={{ alignItems: "flex-end" }}>
        <Text>Tổng đơn: {item.totalOrders}</Text>
        <Text>Doanh thu: {item.totalRevenue.toLocaleString()} ₫</Text>
      </View>
    </TouchableOpacity>
  );

  const renderOrderItem = ({ item, index }: { item: Order; index: number }) => (
    <TouchableOpacity
      onPress={() => {
        setModalVisible(false);
        navigation.navigate("OrderDetail", { id: item.id });
      }}
      style={{
        flexDirection: "column",
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 12,
        marginVertical: 6,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ fontWeight: "600" }}>{index + 1}. {getOrderOwnerText(item)}</Text>
        <Text style={{ fontWeight: "600" }}>{item.total.toLocaleString()} ₫</Text>
      </View>
      <Text style={{ fontSize: 12, color: "gray", marginTop: 4 }}>
        Thời gian: {new Date(item.created_at).toLocaleString("vi-VN")}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={globalStyles.container2}>
      <Text style={globalStyles.title2}>Thống kê theo ngày</Text>
      {loading ? (
        <ActivityIndicator size="large" color={theme.colors.primary} style={{ marginTop: 20 }} />
      ) : stats.length === 0 ? (
        <View style={globalStyles.content}>
          <FontAwesome5 name="chart-line" size={100} color={theme.colors.primary} style={{ marginBottom: 20 }} />
          <Text style={globalStyles.emptyTitle}>Chưa có dữ liệu</Text>
        </View>
      ) : (
        <FlatList
          data={stats}
          keyExtractor={(item) => item.date}
          renderItem={renderDayItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}

      {/* Modal hiển thị đơn của ngày */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={{ flex:1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" }}>
          <View style={{ width: "90%", maxHeight: "80%", backgroundColor: "white", borderRadius: 12, padding: 16 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 12 }}>
              Đơn hàng ngày {selectedDay?.date}
            </Text>

            <FlatList
              data={selectedDay?.orders || []}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderOrderItem}
              contentContainerStyle={{ paddingBottom: 12 }}
            />

            <Pressable
              onPress={() => setModalVisible(false)}
              style={{ marginTop: 16, backgroundColor: theme.colors.primary, padding: 12, borderRadius: 8, alignItems: "center" }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>Đóng</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AdminAnalytic;
