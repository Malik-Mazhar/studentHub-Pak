import { X } from 'lucide-react';
import React, { useState } from 'react'
import { Image, Smile, SendHorizonal } from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import CustomInput from '../shared/CustomInput';
import { useForm } from 'react-hook-form';

interface CommentProps {
  setShowComment: React.Dispatch<React.SetStateAction<boolean>>;
}

function Comment({ setShowComment }: CommentProps) {
  const [showEmoji, setShowEmoji] = useState(false);
  const [comment, setComment] = useState("");

  const {
    register,
    setValue,
    watch
  } = useForm();

  return (
    <div>

        <div className="fixed inset-0 z-50">
            <div className="absolute right-0 top-0 h-full w-100 bg-white shadow-lg">
            <div className="flex flex-col h-full">

                <div className="flex justify-between items-center px-4 py-3">
                <h1>Comments(0)</h1>
                <button onClick={() => setShowComment(false)} className="bg-gray-400 rounded-full p-1 text-white cursor-pointer shadow-lg">
                
                    <X size={20} />
                </button>
                </div>


                    <div className="mt-auto bg-white p-4">

                        
                        {showEmoji && (
                        <div className="flex ">
                            <EmojiPicker
                                searchDisabled
                                // skinTonesDisabled
                                previewConfig={{
                                showPreview: false,
                            }}
                            height={300}
                            onEmojiClick={(emojiData) =>
                             setValue("comment", (watch("comment") || "") + emojiData.emoji,     { shouldDirty: true })
                            }
                        />
                        </div>
                        )}

                    <div className="flex items-center gap-3 rounded-full border border-gray-300 bg-gray-50 px-4 py-2">
                        {/* Emoji */}
                        <button
                        type="button"
                        className="text-gray-500 hover:text-yellow-500 transition"
                        onClick={() => setShowEmoji(!showEmoji)}
                        >
                        <Smile size={22} />
                        </button>

                        <div className="flex-1">
                            <CustomInput
                            label="" 
                            type=""
                            placeholder="Write a comment... "
                            optional= {false}
                            className="flex-1 bg-transparent outline-none text-md border-0 px-3 py-0 focus:border-none"
                            {...register("comment")}
                            />
                        </div>

                        {/* Send */}
                        <button
                        type="submit"
                        className="rounded-full bg-blue-600 p-2 text-white hover:bg-blue-700 transition"
                        >
                        <SendHorizonal size={18} />
                        </button>
                    </div>
                    
                    </div>

            </div>
            </div>
        </div>

    </div>
  )
}

export default Comment
