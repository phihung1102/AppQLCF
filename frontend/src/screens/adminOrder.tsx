import { View, Text, FlatList, TouchableOpacity, Alert, Modal, Button, Platform } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { theme } from "../styles/theme";
import { globalStyles } from "../styles/globalCss";
import { OrderApi } from "../api/orderApi";
import { Order } from "../types/inđex";
import { TranslateOrderStatus } from "../helpers/statusHelper";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AdminStackParamList } from "../navigation/adminIndex";
import DateTimePickerModal from "react-native-modal-datetime-picker";

type AdminOrderNavProp = NativeStackNavigationProp<AdminStackParamList, "OrderDetail">;

const AdminOrder = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const navigation = useNavigation<AdminOrderNavProp>();

  // States lọc
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  // lấy danh sách order
  const fetchOrders = async (from?: Date, to?: Date) => {
    try {
      const res = await OrderApi.getAll({
        fromDate: from?.toISOString().split("T")[0],
        toDate: to?.toISOString().split("T")[0],
      });
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchOrders();
    }, [])
  );

  // xoá order
  const handleDelete = (order: Order) => {
    Alert.alert(
      "Xác nhận xoá",
      `Bạn chắc chắn muốn xoá order #${order.id}?`,
      [
        { text: "Huỷ", style: "cancel" },
        {
          text: "Xoá",
          style: "destructive",
          onPress: async () => {
            try {
              await OrderApi.remove(order.id);
              fetchOrders(fromDate ?? undefined, toDate ?? undefined);
            } catch (error) {
              console.log(error);
            }
          },
        },
      ]
    );
  };

  // hiển thị chủ sở hữu order
  const getOrderOwner = (order: Order) => {
    if (order.table_number) return `Khách order tại bàn ${order.table_number}`;
    if (order.user_id && order.user_name) return `Bán mang đi (${order.user_name})`;
    return "Khách lạ";
  };

  return (
    <View style={globalStyles.container2}>
      {/* Header với search + filter */}
      <View style={{ flexDirection: "row", justifyContent: "flex-end", marginBottom: 16 }}>
        <TouchableOpacity onPress={() => console.log("Search pressed!")}>
          <FontAwesome5 name="search" solid color={"#795548"} style={{ marginRight: 16, fontSize: 18 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilterModalVisible(true)}>
          <FontAwesome5 name="filter" solid color={"#795548"} style={{ fontSize: 18 }} />
        </TouchableOpacity>
      </View>

      <Text style={globalStyles.title2}>Hoá đơn</Text>

      {orders.length === 0 ? (
        <View style={globalStyles.content}>
          <FontAwesome5
            name="list-alt"
            size={100}
            color={theme.colors.primary}
            style={{ marginBottom: 20 }}
          />
          <Text style={globalStyles.emptyTitle}>Chưa có order nào.</Text>
          <Text style={globalStyles.emptySubtitle}>Khách chưa đặt món.</Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("OrderDetail", { id: item.id })}
              style={globalStyles.componentFlatlist}
            >
              <Text style={globalStyles.textStt}>{index + 1}.</Text>
              <View style={{ flex: 1, flexDirection: "column", marginLeft: 8 }}>
                <Text style={globalStyles.textName}>{getOrderOwner(item)}</Text>
                <Text style={globalStyles.text}>
                  Trạng thái: {TranslateOrderStatus(item.status)}
                </Text>
                <Text style={globalStyles.text}>
                  Thời gian: {new Date(item.created_at).toLocaleString()}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => handleDelete(item)}
                style={{ marginHorizontal: 8 }}
              >
                <FontAwesome5 name="trash" size={18} color="#ff0000ff" />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      )}

      {/* Modal lọc */}
      <Modal
        visible={filterModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <View style={{
          flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)"
        }}>
          <View style={{ width: "90%", backgroundColor: "#fff", padding: 16, borderRadius: 8 }}>
            <Text style={{ fontWeight: "bold", marginBottom: 10 }}>Lọc theo ngày</Text>

            <TouchableOpacity onPress={() => setShowFromPicker(true)} style={{ marginBottom: 10 }}>
              <Text>Ngày bắt đầu: {fromDate ? fromDate.toLocaleDateString() : "Chọn ngày"}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setShowToPicker(true)} style={{ marginBottom: 20 }}>
              <Text>Ngày kết thúc: {toDate ? toDate.toLocaleDateString() : "Chọn ngày"}</Text>
            </TouchableOpacity>

            {/* Picker From */}
            <DateTimePickerModal
              isVisible={showFromPicker}
              mode="date"
              onConfirm={(date) => { setFromDate(date); setShowFromPicker(false); }}
              onCancel={() => setShowFromPicker(false)}
            />

            {/* Picker To */}
            <DateTimePickerModal
              isVisible={showToPicker}
              mode="date"
              onConfirm={(date) => { setToDate(date); setShowToPicker(false); }}
              onCancel={() => setShowToPicker(false)}
            />

            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Button title="Huỷ" onPress={() => setFilterModalVisible(false)} />
              <Button title="Áp dụng" onPress={() => {
                fetchOrders(fromDate ?? undefined, toDate ?? undefined);
                setFilterModalVisible(false);
              }} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AdminOrder;
