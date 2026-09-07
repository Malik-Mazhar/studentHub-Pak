import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NotificationType } from "../types/dataTaype";

interface NotificationState {
  notifications: NotificationType[];
  unreadCount: number;
  loading: boolean;
}

const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0,
  loading: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,

  reducers: {
    setNotifications: (
      state,
      action: PayloadAction<NotificationType[]>
    ) => {
      state.notifications = action.payload;
    },

    setUnreadCount: (
      state,
      action: PayloadAction<number>
    ) => {
      state.unreadCount = action.payload;
    },

    setNotificationLoading: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.loading = action.payload;
    },

    markNotificationAsRead: (
      state,
      action: PayloadAction<string>
    ) => {
      const notification = state.notifications.find(
        (item) => item._id === action.payload
      );

      if (notification && !notification.isRead) {
        notification.isRead = true;

        state.unreadCount = Math.max(
          0,
          state.unreadCount - 1
        );
      }
    },

    markAllNotificationsAsRead: (state) => {
      state.notifications.forEach((notification) => {
        notification.isRead = true;
      });

      state.unreadCount = 0;
    },

    clearNotifications: (state) => {
      state.notifications = [];
      state.unreadCount = 0;
    },
  },
});

export const {
  setNotifications,
  setUnreadCount,
  setNotificationLoading,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  clearNotifications,
} = notificationSlice.actions;

export default notificationSlice.reducer;