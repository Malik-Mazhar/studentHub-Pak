"use client";

import { useState } from "react";
import { useForm, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import EmojiPicker from "emoji-picker-react";
import { Smile, SendHorizonal } from "lucide-react";

import CustomInput from "./CustomInput";

interface CommentInputProps {
  watch: UseFormWatch<FormValues>;
  setValue: UseFormSetValue<FormValues>;
  register: UseFormRegister<FormValues>
  placeholder?: string;
  isSubmitting?: boolean;
  fieldName: "commentContent" | "replyContent"
}

interface FormValues {
  commentContent: string;
  replyContent: string;
}

export default function CommentInput({
  register,
  watch,
  setValue,
  placeholder = "Write a public reply...",
  isSubmitting = false,
  fieldName

}: CommentInputProps) {
  const [showEmoji, setShowEmoji] = useState(false);
  const [isFocusEmogiInput, setIsFocusEmogiInput] = useState(false);


  return (
        <div className="border-t relative bg-white p-4">
            
            {showEmoji && (
                <div className={`flex absolute bottom-full ${ isFocusEmogiInput? "right-[0.5px]" : ""}  mb-2 z-100 overflow-x-scroll`}>
                    <EmojiPicker
                        searchDisabled
                        // skinTonesDisabled
                        previewConfig={{
                        showPreview: false,
                    }}
                    height={250}
                    onEmojiClick={(emojiData) =>
                    setValue(fieldName , (watch(fieldName) || "") + emojiData.emoji,     { shouldDirty: true })
                    }
                />
                </div>
            )}

        <div className={`${isFocusEmogiInput && fieldName === "commentContent" ? "flex flex-col items-start rounded-2xl" : "flex justify-between items-center  rounded-full "} gap-2 border border-gray-300 w-full bg-gray-50 px-2`} onClick={() => setIsFocusEmogiInput(true)} >

            <div className="flex-1">
                <CustomInput
                label="" 
                type="text"
                placeholder={watch(fieldName).length === 0? placeholder : ""}
                optional= {false}
                className="fle bg-transparent outline-none text-md border-0 px-3 py-0 focus:border-none"
                {...register(fieldName)}
                />
            </div>

            <div className={`flex gap-2 ${isFocusEmogiInput && fieldName === "commentContent" ?"items-center justify-between px-3 w-full" : ""}`}>
                {/* Emoji */}
                <button
                    type="button"
                    className="text-gray-500 hover:text-yellow-500 transition"
                    onClick={() => setShowEmoji(!showEmoji)}
                    >
                    <Smile size={18} />
                </button>

                {/* Send */}
                <button
                    type="submit"
                    className={`rounded-full ${isSubmitting ? "bg-blue-300" : "bg-gray-400"} my-1 p-2 cursor-pointer text-white hover:bg-gray-500 transition`}
                    >
                    <SendHorizonal size={13} />
                </button>
            </div>

        </div>
        
        </div>
  );
}