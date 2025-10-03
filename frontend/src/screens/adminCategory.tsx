import { View, Text, Modal, TouchableOpacity, FlatList } from "react-native";
import React, { useState, useEffect  } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import CustomButton from "../components/button";
import CustomInput from "../components/input";
import MessageBox from "../components/messageBox";
import { theme } from "../styles/theme";
import { globalStyles } from "../styles/globalCss";
import { CategoryApi } from "../api/categoryApi";
import { Category } from "../types/inđex";

const AdminCategory = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [messageVisible, setMessageVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  
  // hàm lấy danh sách danh mục
  const fetchCategories = async () => {
    try {
      const res = await CategoryApi.getAll();
      setCategories(res.data.reverse());
    } catch (error) {
      console.log(error);
    }
  };
  
  // handle thêm danh mục => bật/tắt modal
  const handleAddCategory = () => {
    setEditingId(null);
    setName("");
    setModalVisible(true);
  }
  
  // hàm sửa => bật/tắt modal
  const handleEditCategory = (id: number) => {
    const cat = categories.find((c) => c.id === id);
    if(!cat) return;
    setEditingId(id);
    setName(cat.name);
    setModalVisible(true);
  };

  // hàm lưu khi thêm danh mục
  const handleSaveCategory = async () => {
    if (!name.trim()) {
      setMessage("Tên danh mục không được để trống!");
      setIsError(true);
      setMessageVisible(true);
      return;
    }

    try {
      if (editingId === null) {
        // thêm
        const res = await CategoryApi.create(name.trim());
        console.log("API Response:", res.data);
        setCategories([{ id: res.data.id, name: res.data.name }, ...categories]);
        setMessage("Thêm danh mục thành công!");
      } else {
        // sửa
        await CategoryApi.update(editingId, name.trim());
        setCategories(categories.map((c) => c.id === editingId ? { ...c, name: name.trim() } : c));
        setMessage("Cập nhật danh mục thành công!");
      }

      setIsError(false);
      setMessageVisible(true);
      setName("");
      setEditingId(null);
      setModalVisible(false);
    } catch (error) {
      setMessage(editingId === null ? "Không thể thêm danh mục!" : "Không thể cập nhật danh mục!");
      setIsError(true);
      setMessageVisible(true);
    }
  };

  

  // hàm xóa danh mục
  const handleDeleteCategory = async (id: number) => {
    try {
      await CategoryApi.remove(id);
      setCategories(categories.filter((c) => c.id !== id));
      setMessage("Xóa danh mục thành công!");
      setIsError(false);
      setMessageVisible(true);
    } catch (error) {
      setMessage("Không thể xóa danh mục!");
      setIsError(true);
      setMessageVisible(true);
    }
  };


  const renderCategoryItem = ({ item, index }: { item: Category; index: number }) => (
    <View style={globalStyles.componentFlatlist}>
      <Text style={globalStyles.textStt}>{index + 1}.</Text>
      <Text style={globalStyles.textName}>{item.name}</Text>
      <TouchableOpacity onPress={() => handleEditCategory(item.id)} style={{ marginRight: 20 }}>
        <FontAwesome5 name="edit" size={18} color="#00a6ffff" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDeleteCategory(item.id)}>
        <FontAwesome5 name="trash" size={18} color="#ff0000ff" />
      </TouchableOpacity>
    </View>
  );
  
  return (
    <View style={globalStyles.container2}>
      <View style={{ flexDirection: "row", justifyContent: "flex-end", marginBottom: 16}}>
        <TouchableOpacity onPress={handleAddCategory}>
          <FontAwesome5 name="plus" solid color={"#795548"} style={{ marginRight: 20, fontSize: 18 }} />
        </TouchableOpacity>
        
        {/* <TouchableOpacity onPress={() => console.log("Search pressed!")}>
          <FontAwesome5 name="search" solid color={"#795548"} style={{ marginRight: 16, fontSize: 18 }} />
        </TouchableOpacity> */}
      </View>
      <Text style={globalStyles.title2}>Danh mục</Text>

      {categories.length === 0 ? (
        <View style={globalStyles.content}>
          <FontAwesome5
            name="th-large"
            size={100}
            color={theme.colors.primary}
            style={{ marginBottom: 20 }}
          />
          <Text style={globalStyles.emptyTitle}>Không có danh mục nào ở đây.</Text>
          <Text style={globalStyles.emptySubtitle}>Vui lòng thêm danh mục!</Text>
          <CustomButton title="Thêm danh mục" onPress={handleAddCategory} />
        </View>
      ) : (
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCategoryItem}
        />
      )}

      <Modal visible={modalVisible} transparent animationType="slide" onRequestClose={() => setModalVisible(false)}>
        <View style={globalStyles.overlay}>
          <View style={globalStyles.messageBox}>
            <Text style={globalStyles.messageTitle}>
              {editingId === null ? "Thêm danh mục" : "Sửa danh mục"}
            </Text>
            <CustomInput
              placeholder="Nhập tên danh mục"
              value={name}
              onChangeText={setName}
            />
            <View style={{ flexDirection: "row", gap: 16}}>
              <CustomButton
                title="Hủy"
                onPress={() => setModalVisible(false)}
              />
              <CustomButton title="Lưu" onPress={handleSaveCategory} />
            </View>
          </View>
        </View>
      </Modal>

      <MessageBox
        message={message}
        visible={messageVisible}
        isError={isError}
        onConfirm={() => setMessageVisible(false)}
      />
    </View>
  );
};

export default AdminCategory;
