import EmojiPicker, { Theme } from "emoji-picker-react";
import { Smile } from "lucide-react";

interface CommentInputProps {
    register: any;
    setValue: any;
    commentContent: string;
    emojiPickerFor: string | null;
    setEmojiPickerFor: (value: string | null) => void;
    profileImage?: string;
}

const CommentInput = ({
    register,
    setValue,
    commentContent,
    emojiPickerFor,
    setEmojiPickerFor,
    profileImage
}: CommentInputProps) => {

    return (
                <div className="flex items-start gap-3 sm:gap-5">

                    <img
                        src={profileImage || "/img/defaultProfile.jfif"}
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover shrink-0"
                    />

                    <div className="flex-1 min-w-0">

                        <input
                            type="text"
                            placeholder="Add a comment..."
                            className="w-full bg-transparent border-b border-gray-300 dark:border-gray-700 py-2 outline-none text-gray-900 dark:text-[#FBFCFE] placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm sm:text-base"
                            {...register("commentContent")}
                        />

                        <div className="mt-3 flex items-center justify-between gap-3">

                            <div className="relative">

                                <button
                                    type="button"
                                    onClick={() => setEmojiPickerFor(emojiPickerFor === "comment"? null : "comment")}
                                    className="text-gray-500 dark:text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-400 cursor-pointer transition"
                                >
                                    <Smile size={22} />
                                </button>

                                {emojiPickerFor === "comment" && (
                                    <div className="absolute top-10 left-0 z-50 max-w-[calc(100vw-24px)] overflow-hidden rounded-xl shadow-xl">
                                        <EmojiPicker
                                            width={Math.min(400, window.innerWidth - 24)}
                                            height={350}
                                            theme={Theme.AUTO}
                                            onEmojiClick={(emojiData) =>
                                                setValue(
                                                    "commentContent",
                                                    (commentContent || "") + emojiData.emoji,
                                                    {
                                                        shouldDirty: true,
                                                        shouldTouch: true,
                                                        shouldValidate: true,
                                                    }
                                                )
                                            }
                                        />
                                    </div>
                                )}

                            </div>

                            <div className="flex gap-2 sm:gap-3">

                                <button
                                    type="button"
                                    className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer text-sm sm:text-base"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="px-3 sm:px-4 py-1.5 rounded-2xl bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-800 dark:text-gray-100 cursor-pointer text-sm sm:text-base transition"
                                >
                                    Comment
                                </button>

                            </div>

                        </div>

                    </div>

                </div>
    );
};

export default CommentInput;