import { useState, useContext } from "react";
import { View, Text,  } from "react-native";
import { RootStackParamList } from "../navigation";
import CustomInput from "../components/input";
import CustomButton from "../components/button";
import { globalStyles } from "../styles/globalCss";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { validateLogin } from "../utils/validateInput";
import MessageBox from '../components/messageBox';
import { login } from "../services/auth";
import { AuthContext } from "../context/AuthContext";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function Login({ navigation }: Props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({email: "", password: ""});
    const [message, setMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const [isError, setIsError] = useState(false);
    const { setUser } = useContext(AuthContext);

    const handleLogin = async () => {
        let newErrors = validateLogin(email, password);
        setErrors(newErrors);
        if (newErrors.email || newErrors.password) return;
        
        try {
            const user = await login(email, password);
            setUser(user)
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Đăng nhập thất bại, vui lòng thử lại!";
            setMessage(errorMessage);
            setIsError(true);
            setShowMessage(true);
        }
    };

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.title}>Đăng nhập</Text>

            <CustomInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                error={errors.email}
            />

            <CustomInput
                placeholder="Mật khẩu"
                value={password}
                onChangeText={setPassword}
                isPassword
                error={errors.password}
            />

            <CustomButton title="Đăng nhập" onPress={handleLogin} />
            
            <Text>Bạn chưa có tài khoản?
                <Text style={{ color: "#6600b4", fontWeight: "bold"}} onPress={() => navigation.navigate("Register")}>Đăng ký</Text>
            </Text> 

            <MessageBox
                visible={showMessage}
                message={message}
                isError={isError}
                type="alert"
                onConfirm={() => setShowMessage(false)}
            />
        </View>
    )
}