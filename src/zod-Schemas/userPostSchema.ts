import * as z from "zod"; 

export const userPostSchema  = z.object({
    title: z.string().min(2, "Too short!"),
    content: z.string().optional(),
    postImageUrl: z.string().url().optional(),
    postImgPublicId: z.string().url().optional(),
});
