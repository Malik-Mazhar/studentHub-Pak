import * as z from "zod"; 

export const userPostSchema  = z.object({
    postType: z.string(),
    title: z.string().min(2, "Too short!"),
    content: z.string().optional(),
    category: z.string(),
    tags: z.array(z.string()).optional(),
    postImageUrl: z.array(z.string()).optional(),
    visibility: z.string()
});
 