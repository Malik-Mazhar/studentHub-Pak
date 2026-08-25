import { ThumbsDown, ThumbsUp, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { commentSchema } from '@/src/zod-Schemas/commentSchemas';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { ApiResponse } from '@/src/lib/apiResponse';
import { toast } from 'sonner';
import { useAppDispatch, useAppSelector } from '@/src/store/useSelecterhook';
import { addComment, setComments, setLoading, toggleLike } from '@/src/store/commmentSlice';
import { useSession } from 'next-auth/react';
import EmojiPickerInput from '@/src/components/shared/EmojiPickerInput'

interface CommentProps {
  setShowComment: React.Dispatch<React.SetStateAction<boolean>>;
  postId: string;
}

function Comment({ setShowComment, postId }: CommentProps) {
  const [replyCommentId, setReplyCommentId] = useState<string | null>(null);
  const [isSubmiting, setIsSubmitting] = useState(false);
  const dispatch = useAppDispatch();
  const { data: session, status } = useSession();
  const commentsData = useAppSelector((state) => state.commentsData.comments);
  console.log("commentsData", commentsData)


  const {
    register,
    handleSubmit,
    setValue,
    watch
  } = useForm<z.infer <typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {    
        commentContent: "",
        replyContent: "",
    },
  });

    const getAllComments = async () => {
        dispatch(setLoading(true));

        try {
        const response = await axios.get(`/api/user/post/comment?postId=${postId}`);

        dispatch(setComments(response?.data?.data))
        } catch (error) {
           const axiosError = error as AxiosError<ApiResponse>;

            console.error(
                "Failed to fetch comments:",
                axiosError.response?.data?.message || axiosError.message
            );

        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        getAllComments();
    }, [])

    const onSubmit = async (data: z.infer<typeof commentSchema>) => {
        setIsSubmitting(true);

        try {
            const formDeta = new FormData();
            formDeta.append("commentContent", data.commentContent);
            formDeta.append("replyContent", data.replyContent);
            formDeta.append("postId", postId);

            if(replyCommentId){
                formDeta.append("parentComment", replyCommentId);
            }

            const result = await axios.post("/api/user/post/comment", formDeta);

            dispatch(addComment(result.data.data))

            
            if (replyCommentId) {
            setValue("replyContent", "");
            setReplyCommentId(null);
            } else {
                setValue("commentContent", "");
            };

            setIsSubmitting(false);

        } catch (err) {
            console.log("Error creating post please checking comment page",err)
            
            const axiosError = err as AxiosError<ApiResponse>;

            toast('post created Failed', {
            position: "top-right",
            description: <span className="text-black">{axiosError.response?.data?.message}</span>,
            action: {
                    label: "Undo",
                    onClick: () => console.log("Undo"),
                },
            });

            setIsSubmitting(false);
        }
        
    };

    const handleLike = async (commentId: string) => {
    try {
        const formData = new FormData();
        formData.append("commentId", commentId);

        const response = await axios.post("/api/user/post/comment/like", formData);

        dispatch(toggleLike(response.data.data))

    } catch (error) {
        console.log(error);
    }
    };

              console.log("replyCommentId", replyCommentId)
  return (
    // <form onSubmit={handleSubmit(onSubmit)}>

    //     <div className="fixed inset-0 z-50">
    //         <div className="absolute right-0 top-0 h-full w-100 bg-white shadow-lg flex flex-col">

    //             <div className="flex justify-between items-center px-4 py-3">

    //                 <h1>Comments({commentsData.length})</h1>
    //                 <button onClick={() => setShowComment(false)} className="bg-gray-400 rounded-full p-1 text-white cursor-pointer shadow-lg">
                    
    //                     <X size={20} />
    //                 </button>

    //             </div>
                 
    //              <div className='flex-1 overflow-y-auto p-7 pb-24'>

    //                 {commentsData && commentsData.filter((comment) => comment && !comment.parentComment).map((comment) => (

    //                     <div key={comment._id}  className='mb-6'>

    //                         <div className='flex gap-2'>

    //                             <img
    //                                 src={ comment.author.userProfile?.coverImageUrl||"/img/defaultProfile.jfif" }
    //                                 className="w-7 h-7 rounded-full"
    //                             />

    //                             <div className="gap-1">

    //                                 <h6 className="font-semibold text-sm">{comment.author.userProfile?.profileName}</h6>

    //                                 <p className='text-sm text-gray-700'>{comment?.content}</p>


    //                                 <div className='flex items-center gap-x-8 pt-1 pb-4'>

    //                                     <button type='button' onClick={() => handleLike(comment._id)} className={`cursor-pointer ${session?.user._id && comment.likes.includes(session?.user._id  )? "text-blue-800" : ""}`}><ThumbsUp size={15} /></button>
    //                                     <button 
    //                                         type='button' 
    //                                         onClick={() =>
    //                                             session?.user?._id &&
    //                                             comment.likes.includes(session.user._id) &&
    //                                             handleLike(comment._id)
    //                                         }
    //                                         className={`cursor-pointer`}
    //                                         >
    //                                         <ThumbsDown size={15} />
    //                                     </button>

    //                                     <p 
    //                                         onClick={(e) => {
    //                                             e.stopPropagation()
    //                                             setReplyCommentId(comment._id)
    //                                             }
    //                                         }
    //                                     className='text-sm text-blue-700 cursor-pointer'>reply</p>
    //                                 </div>

    //                                 {replyCommentId === comment._id && (
    //                                     <EmojiPickerInput
    //                                         watch={watch}
    //                                         register={register}
    //                                         setValue={setValue}
    //                                         isSubmitting={isSubmiting}
    //                                         fieldName = "replyContent"
    //                                         // placeholder=''
    //                                     />
    //                                 )}

    //                             </div> 

    //                         </div>

    //                         {/* Replies */}
    //                         <div className="ml-10 mt-3 space-y-3">

    //                             {commentsData.filter((reply) => reply.parentComment === comment._id).map((reply) => (

    //                                 <div key={reply._id} className="flex gap-2">

    //                                     <img
    //                                         src={reply.author.userProfile?.coverImageUrl || "/img/defaultProfile.jfif"}
    //                                         className="w-7 h-7 rounded-full"
    //                                     />

    //                                 <div>
    //                                     <h6 className="font-semibold text-sm"> {reply.author.userProfile?.profileName} </h6>

    //                                     <p className="text-sm text-gray-700"> {reply.content} </p>

                                        
    //                                 </div>

    //                                 </div>
    //                             ))}
    //                         </div>

    //                     </div>
    //                 ))}

    //             </div>



    //                 <EmojiPickerInput
    //                    watch={watch}
    //                    register={register}
    //                    setValue={setValue}
    //                    isSubmitting={isSubmiting}
    //                    fieldName = "commentContent"
    //                 />

    //         </div>
        
    //     </div>
    // </form>

    <form onSubmit={handleSubmit(onSubmit)}>
  <div className="fixed inset-0 z-50">

    <div
      className="absolute right-0 top-0 h-full w-full lg:w-105 bg-white dark:bg-[#0F172A] text-gray-900 dark:text-gray-100 shadow-2xl flex flex-col border-l border-gray-200 dark:border-slate-800" >

      {/* Header */}
      <div
        className=" flex justify-between items-center px-4 sm:px-5 py-3 sm:py-4 border-b border-gray-200 dark:border-slate-800 shrink-0 ">

        <h1 className="font-semibold text-base sm:text-lg">
          Comments ({commentsData.length})
        </h1>

        <button
          type="button"
          onClick={() => setShowComment(false)}
          className="bg-gray-200 hover:bg-gray-300 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-full p-1.5 text-gray-700 dark:text-gray-200 cursor-pointer transi " >
          <X size={20} />
        </button>

      </div>

      {/* Comments */}
      <div
        className=" flex-1 overflow-y-auto px-4 sm:px-6 py-5 pb-28">

        {commentsData &&
          commentsData
            .filter(
              (comment) =>
                comment && !comment.parentComment
            )
            .map((comment) => (

              <div
                key={comment._id}
                className="mb-6"
              >

                {/* Main Comment */}
                <div className="flex gap-2.5">

                  <img
                    src={
                      comment.author.userProfile?.coverImageUrl ||
                      "/img/defaultProfile.jfif"
                    }
                    className=" w-8 h-8 rounded-full object-cover shrink-0
                    "
                  />

                  <div className="min-w-0 flex-1">

                    <h6 className="font-semibold text-sm text-gray-900 dark:text-g ">
                      {comment.author.userProfile?.profileName}
                    </h6>

                    <p
                      className="
                        text-sm
                        text-gray-700
                        dark:text-gray-300
                        leading-6
                        wrap-break-words
                      "
                    >
                      {comment?.content}
                    </p>

                    {/* Actions */}
                    <div
                      className="
                        flex items-center
                        gap-x-6 sm:gap-x-8
                        pt-2 pb-3
                      "
                    >

                      {/* Like */}
                      <button
                        type="button"
                        onClick={() =>
                          handleLike(comment._id)
                        }
                        className={`
                          cursor-pointer
                          transition
                          ${
                            session?.user._id &&
                            comment.likes.includes(
                              session?.user._id
                            )
                              ? "text-blue-600 dark:text-blue-400"
                              : "text-gray-500 dark:text-gray-400"
                          }
                        `}
                      >
                        <ThumbsUp size={15} />
                      </button>

                      {/* Dislike */}
                      <button
                        type="button"
                        onClick={() =>
                          session?.user?._id &&
                          comment.likes.includes(
                            session.user._id
                          ) &&
                          handleLike(comment._id)
                        }
                        className="
                          cursor-pointer
                          text-gray-500
                          dark:text-gray-400
                          hover:text-gray-800
                          dark:hover:text-gray-200
                          transition
                        "
                      >
                        <ThumbsDown size={15} />
                      </button>

                      {/* Reply */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setReplyCommentId(comment._id);
                        }}
                        className="
                          text-sm
                          text-blue-600
                          dark:text-blue-400
                          hover:text-blue-700
                          dark:hover:text-blue-300
                          cursor-pointer
                        "
                      >
                        Reply
                      </button>

                    </div>

                    {/* Reply Input */}
                    {replyCommentId === comment._id && (
                      <div className="mb-3">
                        <EmojiPickerInput
                          watch={watch}
                          register={register}
                          setValue={setValue}
                          isSubmitting={isSubmiting}
                          fieldName="replyContent"
                        />
                      </div>
                    )}

                  </div>

                </div>

                {/* Replies */}
                <div
                  className="
                    ml-8 sm:ml-10
                    mt-3
                    space-y-4
                    border-l
                    border-gray-200
                    dark:border-slate-800
                    pl-3 sm:pl-4
                  "
                >

                  {commentsData
                    .filter(
                      (reply) =>
                        reply.parentComment === comment._id
                    )
                    .map((reply) => (

                      <div
                        key={reply._id}
                        className="flex gap-2.5"
                      >

                        <img
                          src={
                            reply.author.userProfile?.coverImageUrl ||
                            "/img/defaultProfile.jfif"
                          }
                          className="
                            w-7 h-7
                            rounded-full
                            object-cover
                            shrink-0
                          "
                        />

                        <div className="min-w-0">

                          <h6
                            className="
                              font-semibold
                              text-sm
                              text-gray-900
                              dark:text-gray-100
                            "
                          >
                            {reply.author.userProfile?.profileName}
                          </h6>

                          <p
                            className="
                              text-sm
                              text-gray-700
                              dark:text-gray-300
                              leading-6
                              wrap-break-words
                            "
                          >
                            {reply.content}
                          </p>

                        </div>

                      </div>

                    ))}

                </div>

              </div>

            ))}

      </div>

      {/* Comment Input */}
      <div className=" shrink-0 border-t border-gray-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] px-4 sm:px-5 py-3 " >

        <EmojiPickerInput
          watch={watch}
          register={register}
          setValue={setValue}
          isSubmitting={isSubmiting}
          fieldName="commentContent"
        />

      </div>

    </div>

  </div>
</form>
  )
}

export default Comment







                    // <div className="mt-auto bg-white p-4">
                        
                    //     {showEmoji && (
                    //         <div className="flex ">
                    //             <EmojiPicker
                    //                 searchDisabled
                    //                 // skinTonesDisabled
                    //                 previewConfig={{
                    //                 showPreview: false,
                    //             }}
                    //             height={300}
                    //             onEmojiClick={(emojiData) =>
                    //             setValue("content", (watch("content") || "") + emojiData.emoji,     { shouldDirty: true })
                    //             }
                    //         />
                    //         </div>
                    //     )}

                    // <div className={`${isFocusEmogiInput? "flex flex-col items-start rounded-2xl" : "flex items-center  rounded-full "} gap-2 border border-gray-300 bg-gray-50 px-2`} onClick={() => setIsFocusEmogiInput(true)} >

                    //     <div className="flex-1">
                    //         <CustomInput
                    //         label="" 
                    //         type="text"
                    //         placeholder="Write a comment... "
                    //         optional= {false}
                    //         className="flex-1 bg-transparent outline-none text-md border-0 px-3 py-0 focus:border-none"
                    //         {...register("content")}
                    //         />
                    //     </div>

                    //     <div className='flex items-center justify-between px-3 w-full'>
                    //         {/* Emoji */}
                    //         <button
                    //             type="button"
                    //             className="text-gray-500 hover:text-yellow-500 transition"
                    //             onClick={() => setShowEmoji(!showEmoji)}
                    //             >
                    //             <Smile size={18} />
                    //         </button>

                    //         {/* Send */}
                    //         <button
                    //             type="submit"
                    //             className={`rounded-full ${isSubmiting ? "bg-blue-300" : "bg-gray-400"} my-1 p-2 cursor-pointer text-white hover:bg-gray-500 transition`}
                    //             >
                    //             <SendHorizonal size={13} />
                    //         </button>
                    //     </div>

                    // </div>

                    // {/* <EmojiPickerInput 
                    // isSubmitting={isSubmiting}
                    // onSubmit={onS}
                    //  /> */}
                    
                    // </div>