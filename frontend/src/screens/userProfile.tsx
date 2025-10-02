import React, { useContext, useEffect, useState } from 'react';
import { Text, View, Alert, TouchableOpacity } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { UserApi } from '../api/userApi';
import { globalStyles } from '../styles/globalCss';

const genderOptions = [
  { value: "male", label: "Nam" },
  { value: "female", label: "Nữ" },
  { value: "other", label: "Khác" },
];

const UserProfile = () => {
  const { user: storedUser, logout } = useContext(AuthContext);
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (!storedUser?.id) return;
      try {
        const res = await UserApi.getUserById(storedUser.id);
        setUser(res.data);
      } catch (err) {
        console.warn("Không thể lấy dữ liệu user:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [storedUser]);

  if (loading) return <Text>Đang tải...</Text>;
  if (!user) return <Text>Không có dữ liệu người dùng</Text>;

  const genderLabel = genderOptions.find(g => g.value === user.gender)?.label || "Khác";

  const handleDelete = () => {
    Alert.alert(
      "Xác nhận",
      "Bạn có chắc chắn muốn xóa tài khoản này không?",
      [
        { text: "Hủy", style: "cancel" },
        { 
          text: "Xóa", 
          style: "destructive",
          onPress: async () => {
            try {
              await UserApi.remove(user.id);
              Alert.alert("Thành công", "Tài khoản đã được xóa");
              logout();
            } catch (error) {
              Alert.alert("Lỗi", "Không thể xóa tài khoản");
            }
          }
        }
      ]
    )
  }

  const handleLogout = () => {
    Alert.alert(
      "Xác nhận",
      "Bạn có chắc chắn muốn đăng xuất không?",
      [
        { text: "Hủy", style: "cancel" },
        { text: "Đăng xuất", style: "destructive", onPress: () => logout() },
      ]
    );
  }

  return (
    <View style={globalStyles.containerUser}>
      <Text style={globalStyles.titleUser}>Tài khoản</Text>
      <Text style={globalStyles.fullnameUser}>{user.fullname}</Text>

      <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
        <Text style={{ marginRight: 8, fontSize: 16}}>ID:</Text>
        <Text style={{ fontSize: 16, textAlign: "center"}}>{user.id}</Text>
      </View>

      <Text style={globalStyles.labelUser}>Số điện thoại:</Text>
      <Text style={globalStyles.valueUser}>{user.phone}</Text>

      <Text style={globalStyles.labelUser}>Email:</Text>
      <Text style={globalStyles.valueUser}>{user.email}</Text>

      <Text style={globalStyles.labelUser}>Giới tính:</Text>
      <Text style={globalStyles.valueUser}>{genderLabel}</Text>

      <Text style={globalStyles.labelUser}>Địa chỉ:</Text>
      <Text style={globalStyles.valueUser}>{user.address}</Text>

      <TouchableOpacity onPress={handleDelete}>
        <Text style={{ color: "#a7a7a7", fontWeight: '600', fontSize: 16, marginVertical: 16,}}>Xóa tài khoản</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLogout} style={{ alignItems: "center"}}>
        <Text style={{ color: "#373737", fontSize: 24, fontWeight: "bold"}}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  )
}

export default UserProfile;