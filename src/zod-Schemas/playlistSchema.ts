import { z } from "zod";

export const playlistSchema = z.object({
  youtubePlaylistLink: z
    .string()
    .min(1, "Playlist URL is required"),

  visibility: z.enum(["Everyone", "Only Me"]),
});

export type PlaylistForm = z.infer<typeof playlistSchema>;