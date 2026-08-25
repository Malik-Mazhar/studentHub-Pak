import EmojiPicker from "emoji-picker-react";
import { Smile } from "lucide-react";

interface ReplyInputProps {
    commentId: string;
    register: any;
    setValue: any;
    replyContent: string;
    emojiPickerFor: string | null;
    setEmojiPickerFor: (value: string | null) => void;
    setReplyCommentId: (value: string | null) => void;
}

const ReplyInput = ({
    commentId,
    register,
    setValue,
    replyContent,
    emojiPickerFor,
    setEmojiPickerFor,
    setReplyCommentId,
}: ReplyInputProps) => {

    return (
        <div className="flex items-start gap-3 sm:gap-5 mb-4">

            <img
                src="/img/defaultProfile.jfif"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover shrink-0"
            />

            <div className="flex-1 min-w-0">

                <input
                    type="text"
                    placeholder="Add a reply..."
                    className="w-full bg-transparent border-b border-gray-300 dark:border-gray-700 py-2 outline-none text-gray-900 dark:text-[#FBFCFE] placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm"
                    {...register("replyContent")}
                />

                <div className="mt-3 flex items-center justify-between gap-3">

                    <div className="relative">

                        <button
                            type="button"
                            onClick={() =>
                                setEmojiPickerFor(
                                    emojiPickerFor === `reply-${commentId}`
                                        ? null
                                        : `reply-${commentId}`
                                )
                            }
                            className="text-gray-500 dark:text-gray-400 hover:text-yellow-500 cursor-pointer"
                        >
                            <Smile size={22} />
                        </button>

                        {emojiPickerFor === `reply-${commentId}` && (
                            <div className="absolute top-10 left-0 z-50">
                                <EmojiPicker
                                    width={Math.min(400, window.innerWidth - 24)}
                                    height={350}
                                    // theme={Theme.AUTO}
                                    onEmojiClick={(emojiData) =>
                                        setValue(
                                            "replyContent",
                                            (replyContent || "") +
                                                emojiData.emoji,
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
                            onClick={() => setReplyCommentId(null)}
                            className="text-gray-500 dark:text-gray-400 cursor-pointer text-sm"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-3 sm:px-4 py-1.5 rounded-2xl bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-gray-100 cursor-pointer text-sm"
                        >
                            Comment
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default ReplyInput;