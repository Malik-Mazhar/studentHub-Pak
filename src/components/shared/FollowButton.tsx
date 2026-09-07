
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

interface FollowButtonProps {
  userId: string;
}

export default function FollowButton({
  userId,
}: FollowButtonProps) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const checkFollowStatus = async () => {
      try {
        const response = await axios.get(
          `/api/user/post/follow/${userId}`
        );

        setIsFollowing(response.data.isFollowing);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    checkFollowStatus();
  }, [userId]);

  const handleFollow = async () => {
    try {
      setLoading(true);

      if (isFollowing) {
        await axios.delete(`/api/user/post/follow/${userId}`);

        setIsFollowing(false);
      } else {
        await axios.post(`/api/user/post/follow/${userId}`);

        setIsFollowing(true);
      }
    } catch (error: any) {
        console.error(error);

        toast.error("Failed to follow user", {
            position: "top-right",
            description: (
            <span className="text-black">
                {error?.response?.data?.message || "Something went wrong."}
            </span>
            ),
        });
    }finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleFollow}
      disabled={loading}
      className="text-xs sm:text-sm font-semibold bg-blue-100 text-blue-700 hover:text-blue-500 cursor-pointer dark:bg-blue-900/30 dark:text-blue-400 px-4 py-1 rounded-full"
    >
      {loading
        ? "Loading..."
        : isFollowing
        ? "Following"
        : "Follow"}
    </button>
  );
}