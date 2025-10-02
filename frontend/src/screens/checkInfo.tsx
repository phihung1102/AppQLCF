import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { UserApi } from "../api/userApi";
import Toast from "react-native-toast-message";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/index";
import { validateFullname, validatePhone, validateGender, validateAddress } from "../utils/validators";

type Props = NativeStackScreenProps<RootStackParamList, "CheckInfo">;

const genderOptions = [
  { value: "male", label: "Nam" },
  { value: "female", label: "Nữ" },
  { value: "other", label: "Khác" },
];

export default function CheckInfo({ navigation }: Props) {
  const { user, setUser, logout } = useContext(AuthContext);

  const [fullname, setFullname] = useState(user?.fullname || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [gender, setGender] = useState(user?.gender || "other");
  const [address, setAddress] = useState(user?.address || "");
  const [showGenderMenu, setShowGenderMenu] = useState(false);

  if (!user) return <Text>Đang tải...</Text>;

  const handleSave = async () => {
    // Validate
    const fullnameError = validateFullname(fullname);
    const phoneError = validatePhone(phone);
    const genderError = validateGender(gender);
    const addressError = validateAddress(address);

    if (fullnameError || phoneError || genderError || addressError) {
      if (fullnameError) Toast.show({ type: "error", text1: "Lỗi", text2: fullnameError });
      if (phoneError) Toast.show({ type: "error", text1: "Lỗi", text2: phoneError });
      if (genderError) Toast.show({ type: "error", text1: "Lỗi", text2: genderError });
      if (addressError) Toast.show({ type: "error", text1: "Lỗi", text2: addressError });
      return;
    }

    try {
      const updatedUser = await UserApi.updateInfoStaff(user.id, fullname, phone, gender, address);
      updatedUser.isFirstLogin = false;
      setUser(updatedUser);
      Toast.show({ type: "success", text1: "Thành công", text2: "Đã lưu thông tin cá nhân" });
      navigation.reset({ index: 0, routes: [{ name: "UserTabs" }] });
    } catch (err) {
      console.error(err);
      Toast.show({ type: "error", text1: "Lỗi", text2: "Không thể cập nhật thông tin" });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Để thuận lợi cho việc quản lý, vui lòng cập nhật thông tin cá nhân.</Text>
      <Text style={{ fontSize: 14, marginBottom: 20 }}> - Lưu ý: Những mục có * không được bỏ trống.</Text>

      <TextInput
        placeholder="Họ và tên (*)"
        value={fullname}
        onChangeText={setFullname}
        style={styles.input}
      />

      <TextInput
        placeholder="Số điện thoại (*)"
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
        keyboardType="phone-pad"
      />

      {/* Gender menu */}
      <TouchableOpacity
        style={styles.genderBox}
        onPress={() => setShowGenderMenu(!showGenderMenu)}
      >
        <Text>{genderOptions.find((g) => g.value === gender)?.label || "Chọn giới tính"}</Text>
      </TouchableOpacity>

      {showGenderMenu &&
        genderOptions.map((g) => (
          <TouchableOpacity
            key={g.value}
            style={styles.genderOption}
            onPress={() => {
              setGender(g.value);
              setShowGenderMenu(false);
            }}
          >
            <Text>{g.label}</Text>
          </TouchableOpacity>
        ))}

      <TextInput
        placeholder="Địa chỉ"
        value={address}
        onChangeText={setAddress}
        style={styles.input}
      />

      <Button title="Lưu thông tin" onPress={handleSave} />

      <TouchableOpacity
        onPress={logout}
        style={{ position: "absolute", bottom: 20, left: 20 }}
      >
        <Text style={{ color: "#787878ff", fontWeight: "600", fontSize: 16 }}>Trở lại</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  genderBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
  },
  genderOption: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 5,
    backgroundColor: "#eee",
  },
});
