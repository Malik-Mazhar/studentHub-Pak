import axios from "axios";

type HistoryPage =
  | "community"
  | "create Post"
  | "notes"
  | "My Posts"
  | "save Post"
  | "contact"
  | "questions"
  | "videos"
  | "courses"
  | "playlists"
  | "profile";

export const addToHistory = async (
  page: HistoryPage,
  resourceId?: string
) => {
  try {
    await axios.post("/api/user/history", {
      page,
      resourceId,
    });
  } catch (error) {
    console.error("History error:", error);
  }
};