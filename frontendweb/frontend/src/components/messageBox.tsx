import { Modal, View, Text, TouchableOpacity } from "react-native";
import { globalStyles } from "../styles/globalCss";

type Props = {
    message: string;
    onConfirm: () => void;
    onCancel?: () => void;
    type?: "alert" | "confirm";
    visible: boolean;
    isError?: boolean;
};

const  MessageBox = ({ message, onConfirm, onCancel, type = "alert", visible, isError }: Props) => {
    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
        >
            <View style={globalStyles.overlay}>
                <View style={globalStyles.messageBox}>
                    <Text style={[globalStyles.messageTitle, { color: isError ? "red" : "green" }]}>Thông báo</Text>
                    <Text style={globalStyles.messageText}>{message}</Text>
                    <View style={{ flexDirection: "row", marginTop: 15 }}>
                        {type === "confirm" && onCancel && (
                            <TouchableOpacity style={[globalStyles.okButton, {backgroundColor: "#a3a3a3ff", marginRight: 16}]} onPress={onCancel}>
                                <Text style={globalStyles.okButtonText}>Hủy</Text>
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity style={globalStyles.okButton} onPress={onConfirm}>
                            <Text style={globalStyles.okButtonText}>{type === "confirm" ? "Đồng ý" : "OK"}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default MessageBox;