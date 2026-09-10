"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import {
  UserRound,
  UserCheck,
  Users,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { UserProfile } from "@/src/types/dataTaype";

interface FollowingUser {
  _id: string;
  userProfile?: UserProfile;
}

interface FollowingItem {
  _id: string;
  following: FollowingUser;
  createdAt: string;
}

export default function FollowingPage() {
  const [following, setFollowing] = useState<FollowingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [unfollowingId, setUnfollowingId] = useState<string | null>(null);
  console.log("following", following)

  const getFollowing = async () => {
    try {
      setLoading(true);

      const response = await axios.get("/api/user/get/my-following");

      setFollowing(response.data.data || []);
    } catch (error) {
      console.error("GET FOLLOWING ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFollowing();
  }, []);

  const handleUnfollow = async (userId: string) => {
    try {
      setUnfollowingId(userId);

      await axios.delete(`/api/user/post/follow/${userId}`);

      setFollowing((prev) =>
        prev.filter((item) => item.following._id !== userId)
      );
    } catch (error) {
      console.error("UNFOLLOW ERROR:", error);
    } finally {
      setUnfollowingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 px-2.5 py-5 text-gray-900 sm:px-3 sm:py-6 dark:bg-linear-to-br dark:from-[#0B1120] dark:via-[#0F172A] dark:to-[#111827] dark:text-gray-100">
    <div className="mx-auto w-full">

        {/* Header */}
        <div className="mb-5 sm:mb-6">
        <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 shadow-sm dark:bg-blue-500/10 dark:text-blue-400">
            <Users size={21} />
            </div>

            <div className="min-w-0">
            <h1 className="text-lg font-bold text-gray-900 sm:text-xl dark:text-white">
                Following
            </h1>

            <p className="mt-0.5 text-xs text-gray-500 sm:text-sm dark:text-gray-400">
                People you are following
            </p>
            </div>
        </div>
        </div>

        {/* Loading */}
        {loading && (
        <div className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm dark:border-[#243047] dark:bg-[#111827]">
            {[1, 2, 3, 4, 5].map((item) => (
            <div
                key={item}
                className={`flex items-center gap-3 px-3 py-4 sm:gap-4 sm:px-5 ${
                item !== 5
                    ? "border-b border-gray-100 dark:border-[#243047]"
                    : ""
                }`}
            >
                <div className="h-11 w-11 shrink-0 animate-pulse rounded-full bg-blue-100 dark:bg-[#1E293B]" />

                <div className="min-w-0 flex-1 space-y-2">
                <div className="h-4 w-32 animate-pulse rounded bg-gray-200 dark:bg-[#1E293B]" />
                <div className="h-3 w-24 animate-pulse rounded bg-gray-200 dark:bg-[#1E293B]" />
                </div>

                <div className="h-8 w-20 animate-pulse rounded-lg bg-gray-200 dark:bg-[#1E293B]" />
            </div>
            ))}
        </div>
        )}

        {/* Empty State */}
        {!loading && following.length === 0 && (
        <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-blue-100 bg-white px-5 text-center shadow-sm dark:border-[#243047] dark:bg-[#111827]">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-500 dark:bg-blue-500/10 dark:text-blue-400">
            <Users size={28} />
            </div>

            <h2 className="text-base font-semibold text-gray-900 sm:text-lg dark:text-white">
            No following yet
            </h2>

            <p className="mt-1 max-w-sm text-xs text-gray-500 sm:text-sm dark:text-gray-400">
            Users you follow will appear here.
            </p>

            <Link
            href="/community"
            className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
            >
            Explore Community
            </Link>
        </div>
        )}

        {/* Following List */}
        {!loading && following.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm dark:border-[#243047] dark:bg-[#111827]">

            {/* Count */}
            <div className="flex items-center justify-between border-b border-blue-100 bg-blue-50/70 px-4 py-3 dark:border-[#243047] dark:bg-[#172033] sm:px-5">
            <p className="text-xs font-medium text-blue-600 dark:text-blue-400">
                {following.length}{" "}
                {following.length === 1 ? "person" : "people"}
            </p>

            <Users
                size={16}
                className="text-blue-400 dark:text-blue-500"
            />
            </div>

            {following.map((item, index) => {
            const user = item.following;

            return (
                <div
                key={item._id}
                className={`flex items-center gap-3 px-3 py-4 transition-all hover:bg-blue-50/50 sm:gap-4 sm:px-5 dark:hover:bg-[#172033] ${
                    index !== following.length - 1
                    ? "border-b border-gray-100 dark:border-[#243047]"
                    : ""
                }`}
                >

                {/* Profile Image */}
                <Link
                    href={`/profile/profile}`}
                    className="shrink-0"
                >
                    {user?.userProfile?.profileImgUrl ? (
                    <img
                        src={user.userProfile.profileImgUrl}
                        alt={
                        user.userProfile.profileName || "User"
                        }
                        className="h-11 w-11 rounded-full object-cover ring-2 ring-blue-100 dark:ring-blue-500/20"
                    />
                    ) : (
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-blue-500 dark:bg-[#1E293B] dark:text-blue-400">
                        <UserRound size={20} />
                    </div>
                    )}
                </Link>

                {/* User Info */}
                <div className="min-w-0 flex-1">
                    <Link
                    href={`/profile/profile`}
                    className="block truncate text-sm font-semibold text-gray-900 transition hover:text-blue-600 hover:underline dark:text-white dark:hover:text-blue-400"
                    >
                    {user?.userProfile?.profileName ||
                        "Unknown User"}
                    </Link>

                    {user?.userProfile?.profileName && (
                    <p className="mt-0.5 truncate text-xs text-gray-500 dark:text-gray-400">
                        @{user.userProfile.profileName}
                    </p>
                    )}
                </div>

                {/* Profile Link */}
                <Link
                    href={`/profile/profile`}
                    className="hidden items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-2 text-xs font-medium text-blue-600 transition hover:bg-blue-100 sm:flex dark:bg-blue-500/10 dark:text-blue-400 dark:hover:bg-blue-500/20"
                >
                    <ExternalLink size={14} />
                    Profile
                </Link>

                {/* Unfollow */}
                <button
                    onClick={() => handleUnfollow(user._id)}
                    disabled={unfollowingId === user._id}
                    className="flex shrink-0 items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-60 dark:border-[#334155] dark:bg-[#111827] dark:text-gray-300 dark:hover:border-red-900 dark:hover:bg-red-950/30 dark:hover:text-red-400"
                >
                    {unfollowingId === user._id ? (
                    <Loader2
                        size={14}
                        className="animate-spin"
                    />
                    ) : (
                    <UserCheck size={14} />
                    )}

                    <span>
                    {unfollowingId === user._id
                        ? "Unfollowing..."
                        : "Following"}
                    </span>
                </button>
                </div>
            );
            })}
        </div>
        )}
    </div>
    </div>
  );
}