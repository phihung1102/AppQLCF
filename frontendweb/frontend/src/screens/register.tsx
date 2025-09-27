import { View, Text, Alert } from 'react-native';
import { useState } from 'react';
import { RootStackParamList } from '../navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { globalStyles } from '../styles/globalCss';
import CustomInput from '../components/input';
import CustomButton from '../components/button';
import { register } from '../services/auth';
import { validateRegister } from '../utils/validateInput';
import MessageBox from '../components/messageBox';

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

const Register = ({ navigation }: Props) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({name: "", email: "", password: ""});
    const [message, setMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleRegister = async () => {
        let newErrors = validateRegister(name, email, password);
        setErrors(newErrors);
        if (newErrors.name || newErrors.email || newErrors.password) return;
        
        try {
            await register(name, email, password);
            setMessage("Đăng ký thành công!");
            setIsError(false);
            setShowMessage(true);
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Đăng ký thất bại, vui lòng thử lại!";
            setMessage(errorMessage);
            setIsError(true);
            setShowMessage(true);
        }
    };

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.title}>Đăng ký</Text>

            <CustomInput
                placeholder="Tên tài khoản"
                value={name}
                onChangeText={setName}
                error={errors.name}
            />

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

            <CustomButton title="Đăng ký" onPress={handleRegister} />

            <Text>Bạn đã có tài khoản?
                <Text style={{ color: "#6600b4", fontWeight: "bold"}} onPress={() => navigation.navigate("Login")}>Đăng nhập</Text>
            </Text> 

            <MessageBox
                visible={showMessage}
                message={message}
                isError={isError}
                onConfirm={() => {
                    setShowMessage(false);
                    if (!isError) { navigation.replace("Login")};
                }}
            />
        </View>
    )
}

export default Register
