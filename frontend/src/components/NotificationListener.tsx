import { useContext, useEffect } from "react";
import { NotificationContext } from "../context/NotificationContext";
import { Alert } from "react-native";

const NotificationListener = () => {
  const { notifications } = useContext(NotificationContext);

  useEffect(() => {
    if (notifications.length > 0) {
      const latest = notifications[0];
      Alert.alert("Thông báo", latest.message);
    }
  }, [notifications]);

  return null;
};

export default NotificationListener;
