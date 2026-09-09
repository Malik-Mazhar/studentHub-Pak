"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Clock3,
  Users,
  FileText,
  HelpCircle,
  PlayCircle,
  BookOpen,
  ListVideo,
  User,
  LucideIcon,
  Mail,
  PlusCircle,
  Bookmark,
} from "lucide-react";
import Link from "next/link";

interface HistoryItem {
  _id: string;

  page:
    | "community"
    | "createPost"
    | "notes" 
    | "contact"
    | "myPosts"
    | "savePost"
    | "questions"
    | "videos"
    | "courses"
    | "playlists"
    | "profile";

  resourceId?: string;

  visitedAt: string;
  createdAt: string;
  updatedAt: string;
}
const pageConfig: Record<
  HistoryItem["page"],
  {
    title: string;
    description: string;
    icon: LucideIcon;
    href: string;
  }
> = {
  community: {
    title: "Community",
    description: "Visited the community page",
    icon: Users,
    href: "/community",
  },

  createPost: {
    title: "Create Post",
    description: "Created a new post",
    icon: PlusCircle,
    href: "/createPost",
  },

  contact: {
    title: "Contact",
    description: "Visited the contact page",
    icon: Mail,
    href: "/contact",
  },

  notes: {
    title: "Notes",
    description: "Visited the notes page",
    icon: FileText,
    href: "/notes",
  },

  questions: {
    title: "Questions",
    description: "Visited the questions page",
    icon: HelpCircle,
    href: "/questions",
  },

  videos: {
    title: "Videos",
    description: "Visited the videos page",
    icon: PlayCircle,
    href: "/videos",
  },

  courses: {
    title: "Courses",
    description: "Visited the courses page",
    icon: BookOpen,
    href: "/courses",
  },

  myPosts: {
    title: "My Posts",
    description: "View your posts",
    icon: FileText,
    href: "/myPosts",
  },

  savePost: {
    title: "Saved Posts",
    description: "View your saved posts",
    icon: Bookmark,
    href: "/save",
  },

  playlists: {
    title: "Playlists",
    description: "Visited the playlists page",
    icon: ListVideo,
    href: "/playlists",
  },

  profile: {
    title: "Profile",
    description: "Visited the profile page",
    icon: User,
    href: "/profile/profile",
  },
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const historyRoutes: Record<string, string> = {
  viewAllPlayList: "/courses/playlists",
};

const getDynamicTitle = (resourceId?: string) => {
  if (!resourceId) return null;

  const titles: Record<string, string> = {
    viewAllPlayList: "All Playlists",
  };

  return titles[resourceId] ?? resourceId;
};

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const getHistory = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "/api/user/history?page=1&limit=20"
      );

      setHistory(response.data.data);
    } catch (error) {
      console.error("GET HISTORY ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-3 py-5 pt-26 md:pt-20 sm:px-5 sm:py-6 dark:bg-[#0B1120]">
      <div className="mx-auto w-full max-w-4xl">

        {/* Header */}
        <div className="mb-5 sm:mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-700 dark:bg-[#1E293B] dark:text-gray-200">
              <Clock3 size={21} />
            </div>

            <div className="min-w-0">
              <h1 className="text-lg font-semibold text-gray-900 sm:text-xl dark:text-white">
                History
              </h1>

              <p className="mt-0.5 text-xs text-gray-500 sm:text-sm dark:text-gray-400">
                Keep track of your recently visited pages
              </p>
            </div>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-[#243047] dark:bg-[#111827]">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className={`flex items-center gap-3 px-3 py-4 sm:gap-4 sm:px-5 ${
                  item !== 5
                    ? "border-b border-gray-100 dark:border-[#243047]"
                    : ""
                }`}
              >
                <div className="h-11 w-11 shrink-0 animate-pulse rounded-xl bg-gray-200 dark:bg-[#1E293B]" />

                <div className="min-w-0 flex-1 space-y-2">
                  <div className="h-4 w-32 animate-pulse rounded bg-gray-200 dark:bg-[#1E293B]" />
                  <div className="h-3 w-44 max-w-full animate-pulse rounded bg-gray-200 dark:bg-[#1E293B]" />
                </div>

                <div className="hidden h-3 w-28 animate-pulse rounded bg-gray-200 dark:bg-[#1E293B] sm:block" />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && history.length === 0 && (
          <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white px-5 text-center dark:border-[#243047] dark:bg-[#111827]">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-400 dark:bg-[#1E293B] dark:text-gray-500">
              <Clock3 size={28} />
            </div>

            <h2 className="text-base font-semibold text-gray-900 sm:text-lg dark:text-white">
              No history yet
            </h2>

            <p className="mt-1 max-w-sm text-xs text-gray-500 sm:text-sm dark:text-gray-400">
              Your recently visited pages will appear here.
            </p>
          </div>
        )}

        {/* History List */}
        {!loading && history.length > 0 && (
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-[#243047] dark:bg-[#111827]">
            {history.map((item, index) => {
              const config = pageConfig[item.page];

              const Icon = config?.icon ?? Clock3;

              const dynamicTitle = getDynamicTitle(item.resourceId);

              const href = item.resourceId
                ? historyRoutes[item.resourceId]
                : config?.href;

              const content = (
                <>
                  {/* Icon */}
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-600 dark:bg-[#1E293B] dark:text-gray-300">
                    <Icon size={20} />
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      {dynamicTitle ?? config?.title ?? item.page}
                    </h3>

                    <p className="mt-1 truncate text-xs text-gray-500 dark:text-gray-400">
                      {item.resourceId
                        ? config?.title
                          ? `Visited ${config.title}`
                          : "Visited this page"
                        : config?.description ?? "Visited this page"}
                    </p>

                    {/* Resource ID - optional small detail */}
                    {item.resourceId && (
                      <span className="mt-1 inline-block max-w-full truncate text-[11px] text-gray-400 dark:text-gray-500">
                        {item.resourceId}
                      </span>
                    )}

                    {/* Mobile Date */}
                    <p className="mt-1 text-[11px] text-gray-400 sm:hidden">
                      {formatDate(item.visitedAt)}
                    </p>
                  </div>

                  {/* Desktop Date */}
                  <span className="hidden shrink-0 text-xs text-gray-400 sm:block">
                    {formatDate(item.visitedAt)}
                  </span>
                </>
              );

              return href ? (
                <Link
                  key={item._id}
                  href={href}
                  className={`flex items-center gap-3 px-3 py-4 transition-colors hover:bg-gray-50 sm:gap-4 sm:px-5 dark:hover:bg-[#172033] ${
                    index !== history.length - 1
                      ? "border-b border-gray-100 dark:border-[#243047]"
                      : ""
                  }`}
                >
                  {content}
                </Link>
              ) : (
                <div
                  key={item._id}
                  className={`flex items-center gap-3 px-3 py-4 sm:gap-4 sm:px-5 ${
                    index !== history.length - 1
                      ? "border-b border-gray-100 dark:border-[#243047]"
                      : ""
                  }`}
                >
                  {content}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}