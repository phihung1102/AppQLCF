// context/NotificationContext.tsx
import React, { createContext, useState, useEffect } from "react";
import socket from "../services/socket";

type Notification = {
  id: number;
  message: string;
  timestamp: number;
};

type NotificationContextType = {
  notifications: Notification[];
  addNotification: (n: Notification) => void;
};

export const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  addNotification: () => {},
});

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Notification) => {
    setNotifications((prev) => [notification, ...prev]);
  };

  useEffect(() => {
    // Listen socket toàn app
    socket.on("orderUpdated", (order) => {
      if (order.status === "pending") {
        addNotification({
          id: order.id,
          message: `Có đơn hàng mới #${order.id}`,
          timestamp: Date.now(),
        });
      }
    });

    return () => {
      socket.off("orderUpdated");
    };
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, addNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};
