import * as z from "zod"; 

export const profileSchema  = z.object({
    profileName: z.string().min(3, "Too short!").max(15, "profileName must be no more then 15 characters").optional(),
    bio: z.string().min(10, "Bio is Too short!").max(300, "Bio must be no more then 300 characters").optional().or(z.literal("")),
    location: z.string().optional(),
    pinnedDetail: z.string().optional(),
    gender: z.string().optional(),
    profileImgUrl: z.string().url().optional(),
    coverImageUrl: z.string().url().optional(),
    coverImgPublicId: z.string().url().optional(), 
    profileImgPublicId: z.string().url().optional()
});
