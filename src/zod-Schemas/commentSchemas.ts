import {z} from "zod"

export const commentSchema = z.object({
   commentContent: z.string(),
   replyContent: z.string(),
   targetModel: z.string().optional()
});