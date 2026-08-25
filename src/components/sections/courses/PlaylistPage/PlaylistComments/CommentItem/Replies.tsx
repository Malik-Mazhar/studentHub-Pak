import { ChevronDown, ChevronUp, ThumbsDown, ThumbsUp } from "lucide-react";
import ReplyInput from "./ReplyInput";

interface CommentItemProps {
    comment: any;
    commentsData: any[];
    session: any;
    dispatch: any;

    replyCommentId: string | null;
    setReplyCommentId: (value: string | null) => void;

    viewReplyComments: boolean;
    setViewReplyComments: (value: boolean) => void;

    emojiPickerFor: string | null;
    setEmojiPickerFor: (value: string | null) => void;

    register: any;
    setValue: any;
    replyContent: string;

    handleLikesAndComments: any;
}

const CommentItem = ({
    comment,
    commentsData,
    session,
    dispatch,
    replyCommentId,
    setReplyCommentId,
    viewReplyComments,
    setViewReplyComments,
    emojiPickerFor,
    setEmojiPickerFor,
    register,
    setValue,
    replyContent,
    handleLikesAndComments,
}: CommentItemProps) => {

    const replies = commentsData.filter(
        (reply) => reply.parentComment === comment._id
    );

    return (
        <div className="mb-6">

            {/* Main Comment */}
            <div className="flex gap-2 sm:gap-3">

                <img
                    src={
                        comment.author.userProfile?.coverImageUrl ||
                        "/img/defaultProfile.jfif"
                    }
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover shrink-0"
                />

                <div className="flex-1 min-w-0">

                    <h6 className="font-semibold text-gray-900 dark:text-gray-200 text-sm">
                        {comment.author.userProfile?.profileName}
                    </h6>

                    <p className="text-sm text-gray-700 dark:text-gray-100 wrap-break-word leading-6">
                        {comment.content}
                    </p>

                    {/* Actions */}
                    <div className="flex items-center gap-x-5 sm:gap-x-8 pt-1 pb-4">

                        <button
                            type="button"
                            onClick={() =>
                                handleLikesAndComments({
                                    dispatch,
                                    commentId: comment._id,
                                })
                            }
                            className={`cursor-pointer ${
                                session?.user._id &&
                                comment.likes.includes(session.user._id)
                                    ? "text-blue-600 dark:text-blue-400"
                                    : "text-gray-500 dark:text-gray-400"
                            }`}
                        >
                            <ThumbsUp size={15} />
                        </button>

                        <button
                            type="button"
                            className="text-gray-500 dark:text-gray-400 cursor-pointer"
                        >
                            <ThumbsDown size={15} />
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                setReplyCommentId(comment._id)
                            }
                            className="text-sm text-blue-600 dark:text-blue-400 cursor-pointer"
                        >
                            reply
                        </button>

                    </div>

                    {/* Reply Input */}
                    {replyCommentId === comment._id && (
                        <ReplyInput
                            commentId={comment._id}
                            register={register}
                            setValue={setValue}
                            replyContent={replyContent}
                            emojiPickerFor={emojiPickerFor}
                            setEmojiPickerFor={setEmojiPickerFor}
                            setReplyCommentId={setReplyCommentId}
                        />
                    )}

                </div>

            </div>

            {/* Replies */}
            {replies.length > 0 && (
                <div className="ml-7 sm:ml-10 mt-3 space-y-3">

                    {viewReplyComments ? (

                        <>
                            {replies.map((reply) => (

                                <div
                                    key={reply._id}
                                    className="flex gap-2"
                                >

                                    <img
                                        src={
                                            reply.author.userProfile?.coverImageUrl ||
                                            "/img/defaultProfile.jfif"
                                        }
                                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover shrink-0"
                                    />

                                    <div className="min-w-0">

                                        <h6 className="font-semibold text-sm text-gray-900 dark:text-gray-200">
                                            {reply.author.userProfile?.profileName}
                                        </h6>

                                        <p className="text-sm text-gray-700 dark:text-gray-100 wrap-break-word leading-6">
                                            {reply.content}
                                        </p>

                                    </div>

                                </div>

                            ))}

                            <button
                                type="button"
                                onClick={() => setViewReplyComments(false)}
                                className="flex items-center gap-2 text-blue-600 dark:text-blue-400 cursor-pointer text-sm"
                            >
                                <ChevronUp size={16} />
                                Hide replies
                            </button>
                        </>

                    ) : (

                        <button
                            type="button"
                            onClick={() => setViewReplyComments(true)}
                            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 cursor-pointer text-sm"
                        >
                            <ChevronDown size={16} />
                            View replies
                        </button>

                    )}

                </div>
            )}

        </div>
    );
};

export default CommentItem;