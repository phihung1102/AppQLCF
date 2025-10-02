import { View, Text, FlatList, TouchableOpacity, Alert, Modal, Pressable } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useFocusEffect } from "@react-navigation/native";
import { theme } from "../styles/theme";
import { globalStyles } from "../styles/globalCss";
import { UserApi } from "../api/userApi";
import { User } from "../types/inđex";

const AdminStaff = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null); // user được chọn để xem
  const [modalVisible, setModalVisible] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await UserApi.getAll();
      setUsers(res.data.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchUsers();
    }, [])
  );

  const handleDelete = (user: User) => {
    Alert.alert(
      "Xác nhận xoá",
      `Bạn có chắc muốn xoá nhân viên ${user.name}?`,
      [
        { text: "Huỷ", style: "cancel" },
        {
          text: "Xoá",
          style: "destructive",
          onPress: async () => {
            try {
              await UserApi.remove(user.id);
              fetchUsers();
            } catch (err) {
              console.log(err);
            }
          },
        },
      ]
    );
  };

  const handleUserPress = (user: User) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const formatGender = (gender?: string) => {
    if (!gender) return "Khác";
    if (gender.toLowerCase() === "male") return "Nam";
    if (gender.toLowerCase() === "female") return "Nữ";
    return gender;
  };

  const renderUserItem = ({ item, index }: { item: User; index: number }) => (
    <View style={globalStyles.componentFlatlist}>
      <TouchableOpacity
        onPress={() => handleUserPress(item)}
        style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
      >
        <Text style={globalStyles.textStt}>{index + 1}.</Text>
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={globalStyles.textName}>{item.name}</Text>
          <Text style={globalStyles.text}>{item.email}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleDelete(item)}
        style={{ marginHorizontal: 8 }}
      >
        <FontAwesome5 name="trash" size={18} color={theme.colors.primary} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={globalStyles.container2}>
      <View style={{ flexDirection: "row", justifyContent: "flex-end", marginBottom: 16}}>
        <TouchableOpacity onPress={() => console.log("Search pressed!")}>
          <FontAwesome5 name="search" solid color={"#795548"} style={{ marginRight: 16, fontSize: 18 }} />
        </TouchableOpacity>
      </View>
      <Text style={globalStyles.title2}>Nhân viên</Text>
      {users.length === 0 ? (
        <View style={globalStyles.content}>
          <FontAwesome5 name="users" size={100} color={theme.colors.primary} style={{ marginBottom: 20 }} />
          <Text style={globalStyles.emptyTitle}>Chưa có nhân viên nào.</Text>
        </View>
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderUserItem}
        />
      )}

      {/* Modal hiển thị thông tin user */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex:1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <View style={{ width: "85%", backgroundColor: "#fff", borderRadius: 12, padding: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Thông tin nhân viên</Text>
            <Text><Text style={{ fontWeight: 'bold' }}>Tên đầy đủ:</Text> {selectedUser?.fullname}</Text>
            <Text><Text style={{ fontWeight: 'bold' }}>Email:</Text> {selectedUser?.email}</Text>
            <Text><Text style={{ fontWeight: 'bold' }}>Phone:</Text> {selectedUser?.phone || "Chưa có"}</Text>
            <Text><Text style={{ fontWeight: 'bold' }}>Giới tính:</Text>{formatGender(selectedUser?.gender)}</Text>
            <Text><Text style={{ fontWeight: 'bold' }}>Địa chỉ:</Text> {selectedUser?.address || "Chưa có"}</Text>

            <Pressable
              onPress={() => setModalVisible(false)}
              style={{ marginTop: 20, alignSelf: "flex-end", padding: 10, backgroundColor: theme.colors.primary, borderRadius: 8 }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>Đóng</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AdminStaff;
