import RootNavigation from "./src/navigation";
import { AuthProvider } from "./src/context/AuthContext";
import { NotificationProvider } from "./src/context/NotificationContext";
import Toast from "react-native-toast-message";
import NotificationListener from "./src/components/NotificationListener";

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <RootNavigation />
        <NotificationListener />
        <Toast />
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
