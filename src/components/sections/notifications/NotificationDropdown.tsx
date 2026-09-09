import { markAllNotificationsAsRead, markNotificationAsRead, setNotificationLoading, setNotifications, setUnreadCount } from "@/src/store/notificationSlice";
import { useAppSelector } from "@/src/store/useSelecterhook";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { IoMdNotifications } from "react-icons/io";
import { useDispatch } from "react-redux";

interface NotificationDropdownProps {
//   notifications: any[];
  showNotifications: boolean;
  setShowNotifications: React.Dispatch<React.SetStateAction<boolean>>;
  showDropDownInDashboardSidebar?: string;
//   handleReadNotification: (notificationId: string) => void;
}

const NotificationDropdown = ({
//   notifications,
//   unreadCount,
  showNotifications,
  setShowNotifications,
   showDropDownInDashboardSidebar,
//   handleReadNotification,
}: NotificationDropdownProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { notifications, unreadCount, loading } = useAppSelector( (state) => state.notifications );
  

  const handleNotificationClick = (notification: any) => {
    handleReadNotification(notification._id);

    if (
      notification.type === "new_post" &&
      notification.postId?._id
    ) {
      setShowNotifications(false);

      router.push(
        `/community?postId=${notification.postId._id}`
      );
    }
  };
  
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

    useEffect(() => {
        const getNotifications = async () => {
        try {
            dispatch(setNotificationLoading(true));

            const response = await axios.get("/api/user/get/notifications");

            dispatch(setNotifications(response.data.notifications));
            dispatch(setUnreadCount(response.data.unreadCount));
        } catch (error) {
            console.error("Notification error:", error);
        } finally {
            dispatch(setNotificationLoading(false));
        }
        };

        getNotifications();
    }, [dispatch]);
  return (
    <div className="relative">

    <button
        onClick={() => setShowNotifications((prev) => !prev)}
        className="relative p-1.5 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-[#1E293B] transition"
        aria-label="Notifications"
    >
        <IoMdNotifications
            size={23}
            className={`${showDropDownInDashboardSidebar? "text-gray-200" : "text-gray-800"} dark:text-[#FBFCFE]`}
        />

        {unreadCount > 0 && (
            <span className="absolute top-0 right-0 min-w-4 h-4 px-1 flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-semibold">
                {unreadCount > 99 ? "99+" : unreadCount}
            </span>
        )}

    </button>

    {/* Notification Dropdown */}
    {showNotifications && (
        <div
            className={`
                ${showDropDownInDashboardSidebar?
                    "top-11 left-10"
                    :
                    "top-11 right-0"
                }
            absolute   
            z-500

            w-[calc(100vw-24px)]
            md:max-w-95
            max-w-75

            bg-white
            dark:bg-[#0F172A]

            border
            border-gray-200
            dark:border-[#263449]

            rounded-xl
            shadow-xl
            overflow-hidden
            `}
        >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-[#263449]">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white">
        Notifications
        </h3>

        {unreadCount > 0 && (
        <button
            onClick={handleMarkAllAsRead}
            className="text-xs font-medium text-[#017D63] hover:text-[#0aa382] transition cursor-pointer"
        >
            Mark all as read
        </button>
        )}
        </div>

        {/* Notifications */}
        <div className="max-h-100 overflow-y-auto">
        {notifications.length > 0 ? (
        notifications.map((notification) => (
            <div
            key={notification._id}
            onClick={() => {
                handleReadNotification(notification._id)

                if (notification.type === "new_post" && notification.postId?._id) {
                        router.push(`/community?postId=${notification.postId._id}`);
                    }
            }}
            className={`flex gap-3 px-4 py-3 cursor-pointer transition hover:bg-gray-100 dark:hover:bg-[#1E293B]
                ${
                !notification.isRead
                    ? "bg-gray-50 dark:bg-[#162033]"
                    : ""
                }
            `}
            >
            {/* Profile Image */}
            <div className="shrink-0">
                <img
                src={
                    notification.sender?.userProfile?.profileImgUrl ||
                    "/img/defaultProfile.jfif"
                }
                alt={notification.sender?.userProfile?.profileName || "User"}
                className="w-10 h-10 rounded-full object-cover"
                />
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1">
                <p className="text-sm text-gray-800 dark:text-gray-200 leading-5">
                <span className="font-semibold pr-2">
                    {notification.sender?.userProfile?.profileName}
                </span>{" "}
                {notification.type === "new_post"?
                    notification?.postId?.postType || notification.message
                :
                    notification.message
                }
                </p>

                <p className="text-sm text-gray-800 dark:text-gray-200 leading-5">
                {notification.type === "new_post"?
                    notification?.postId?.title || notification.message
                :
                    notification.message
                }
                </p>

                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {new Date(
                    notification.createdAt
                ).toLocaleDateString()}
                </p>
            </div>

            {/* Unread Dot */}
            {!notification.isRead && (
                <span className="w-2 h-2 mt-2 shrink-0 rounded-full bg-[#017D63]" />
            )}
            </div>
        ))
        ) : (
        <div className="flex flex-col items-center justify-center py-10 px-4">
            <IoMdNotifications
            size={32}
            className="text-gray-400 dark:text-gray-500 mb-2"
            />

            <p className="text-sm text-gray-500 dark:text-gray-400">
            No notifications yet
            </p>
        </div>
        )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
        <div className="border-t border-gray-200 dark:border-[#263449]">
        <Link
            href="/notifications"
            className="
            block
            text-center
            px-4
            py-3
            text-sm
            font-semibold
            text-[#017D63]
            hover:bg-gray-100
            dark:hover:bg-[#1E293B]
            transition
            "
        >
            View all notifications
        </Link>
        </div>
        )}
        </div>
    )}
    </div>
  );
};

export default NotificationDropdown;