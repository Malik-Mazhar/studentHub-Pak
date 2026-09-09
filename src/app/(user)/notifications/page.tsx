"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { IoMdNotifications } from "react-icons/io";
import { FaHeart, FaUserPlus, FaComment, FaBookmark, FaFilePdf, FaQuestionCircle, } from "react-icons/fa";
import { NotificationType } from "@/src/types/dataTaype";
import { useDispatch } from "react-redux";
import { markAllNotificationsAsRead, markNotificationAsRead, setNotifications, setUnreadCount } from "@/src/store/notificationSlice";
import { useAppSelector } from "@/src/store/useSelecterhook";

export default function NotificationsPage() {
  const router = useRouter();
  const dispatch = useDispatch();
//   const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const { notifications, unreadCount, loading } = useAppSelector( (state) => state.notifications );

  // Get Notifications
  const getNotifications = async () => {
    try {
      const response = await axios.get("/api/user/get/notifications");

    dispatch(setNotifications(response.data.notifications));
    dispatch(setUnreadCount(response.data.unreadCount));
    } catch (error) {
      console.log("Get notifications error:", error);
    }
  };

  // Mark One As Read
  const handleReadNotification = async (notificationId: string) => {
    try {
      await axios.patch("/api/user/patch/notification", {
        notificationId,
      });

      dispatch(markNotificationAsRead(notificationId));
    } catch (error) {
      console.error("Mark notification as read error:", error);
    }
  };

  // Mark All As Read
  const handleMarkAllAsRead = async () => {
    try {
      await axios.patch("/api/user/patch/notification", {
        markAll: true,
      });

      dispatch(markAllNotificationsAsRead());
    } catch (error) {
      console.error("Mark all as read error:", error);
    }
  };

  // Notification Click
  const handleNotificationClick = async (
    notification: NotificationType
  ) => {
    try {
      if (!notification.isRead) {
        await handleReadNotification(notification._id);
      }

      if (
        notification.type === "new_post" &&
        notification.postId?._id
      ) {
        router.push(
          `/community?postId=${notification.postId._id}`
        );
      }
    } catch (error) {
      console.log("Notification click error:", error);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  // Notification Icon
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "like":
        return (
          <div className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center shrink-0">
            <FaHeart className="text-red-500 text-sm" />
          </div>
        );

      case "follow":
        return (
          <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
            <FaUserPlus className="text-blue-500 text-sm" />
          </div>
        );

      case "comment":
        return (
          <div className="w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center shrink-0">
            <FaComment className="text-purple-500 text-sm" />
          </div>
        );

      case "save":
        return (
          <div className="w-10 h-10 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center shrink-0">
            <FaBookmark className="text-green-500 text-sm" />
          </div>
        );

      case "new_post":
        return (
          <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
            <FaFilePdf className="text-blue-500 text-sm" />
          </div>
        );

      case "question":
        return (
          <div className="w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center shrink-0">
            <FaQuestionCircle className="text-purple-500 text-sm" />
          </div>
        );

      default:
        return (
          <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0">
            <IoMdNotifications className="text-gray-500 text-lg" />
          </div>
        );
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <main className="min-h-screen pt-25 md:pt-20 bg-[#F4F8FC] dark:bg-[#0B1120] px-3 sm:px-5 lg:px-8 py-4 sm:py-6">

      <div className="max-w-5xl mx-auto">

        {/* Main Card */}
        <div className="bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-[#263449] rounded-xl sm:rounded-2xl shadow-sm overflow-hidden">

          {/* Header */}
          <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-5 border-b border-gray-200 dark:border-[#263449]">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#017D63]/10 dark:bg-[#017D63]/20 flex items-center justify-center shrink-0">
                  <IoMdNotifications
                    size={22}
                    className="text-[#017D63]"
                  />
                </div>

                <div>
                  <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                    Notifications
                  </h1>

                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    Stay updated with your latest activities
                  </p>
                </div>

              </div>

              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllAsRead}
                  className="self-start sm:self-auto text-xs sm:text-sm font-semibold text-[#017D63] hover:text-[#0aa382] transition cursor-pointer"
                >
                  Mark all as read
                </button>
              )}

            </div>

          </div>

          {/* Notification List */}
          <div>

            {loading ? (
              <div className="py-16 text-center">
                <div className="w-7 h-7 mx-auto border-2 border-gray-300 border-t-[#017D63] rounded-full animate-spin" />

                <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                  Loading notifications...
                </p>
              </div>
            ) : notifications.length > 0 ? (

              <div>

                {notifications.map((notification) => (

                  <div
                    key={notification._id}
                    onClick={() =>
                      handleNotificationClick(notification)
                    }
                    className={`
                      flex gap-3 sm:gap-4
                      px-4 sm:px-6 lg:px-8
                      py-4
                      border-b border-gray-100 dark:border-[#1E293B]
                      cursor-pointer
                      transition
                      hover:bg-gray-50 dark:hover:bg-[#162033]
                      ${
                        !notification.isRead
                          ? "bg-[#F0FAF7] dark:bg-[#102923]"
                          : ""
                      }
                    `}
                  >

                    {/* Avatar */}
                    <div className="relative shrink-0">

                      <img
                        src={
                          notification.sender?.userProfile
                            ?.profileImgUrl ||
                          "/img/defaultProfile.jfif"
                        }
                        alt={
                          notification.sender?.userProfile
                            ?.profileName || "User"
                        }
                        className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover"
                      />

                      {/* Type Icon */}
                      <div className="absolute -bottom-1 -right-1">
                        {getNotificationIcon(
                          notification.type
                        )}
                      </div>

                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1">

                      <p className="text-sm sm:text-[15px] text-gray-800 dark:text-gray-200 leading-5">

                        <span className="font-semibold text-gray-900 dark:text-white">
                          {
                            notification.sender?.userProfile
                              ?.profileName || "User"
                          }
                        </span>

                        <span className="ml-1">
                          {notification.type === "new_post"
                            ? notification.postId?.postType ||
                              notification.message
                            : notification.message}
                        </span>

                      </p>

                      {notification.type === "new_post" &&
                        notification.postId?.title && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                            {notification.postId.title}
                          </p>
                        )}

                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5">
                        {formatDate(notification.createdAt)}
                      </p>

                    </div>

                    {/* Unread */}
                    {!notification.isRead && (
                      <span className="w-2.5 h-2.5 mt-2 rounded-full bg-[#017D63] shrink-0" />
                    )}

                  </div>

                ))}

              </div>

            ) : (

              /* Empty State */
              <div className="flex flex-col items-center justify-center py-20 px-5">

                <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">

                  <IoMdNotifications
                    size={30}
                    className="text-gray-400 dark:text-gray-500"
                  />

                </div>

                <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200">
                  No notifications yet
                </h2>

                <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-1 max-w-sm">
                  When someone interacts with you, your
                  notifications will appear here.
                </p>

              </div>

            )}

          </div>

        </div>

      </div>

    </main>
  );
}