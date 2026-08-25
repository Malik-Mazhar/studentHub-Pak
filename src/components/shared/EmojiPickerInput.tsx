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
<div
  className="
    relative
    border-t
    border-gray-200
    dark:border-slate-800
    bg-white
    dark:bg-[#0F172A]
    p-3 sm:p-4
  "
>

  {/* Emoji Picker */}
  {showEmoji && (
    <div
      className={`
        absolute
        bottom-full
        mb-2
        z-100
        max-w-[calc(100vw-1.5rem)]
        overflow-hidden
        rounded-xl
        shadow-xl
        border
        border-gray-200
        dark:border-slate-700
        ${
          isFocusEmogiInput
            ? "right-2 sm:right-4"
            : "right-2"
        }
      `}
    >
      <EmojiPicker
        searchDisabled
        previewConfig={{
          showPreview: false,
        }}
        height={250}
        width="100%"
        onEmojiClick={(emojiData) =>
          setValue(
            fieldName,
            (watch(fieldName) || "") + emojiData.emoji,
            { shouldDirty: true }
          )
        }
      />
    </div>
  )}

  {/* Input Container */}
  <div
    className={`
      ${
        isFocusEmogiInput &&
        fieldName === "commentContent"
          ? "flex flex-col items-start rounded-2xl"
          : "flex justify-between items-center rounded-full"
      }
      gap-2
      border
      border-gray-300
      dark:border-slate-700
      w-full
      bg-gray-50
      dark:bg-slate-900
      px-2
      transition-colors
    `}
    onClick={() => setIsFocusEmogiInput(true)}
  >

    {/* Input */}
    <div className="flex-1 w-full min-w-0">

      <CustomInput
        label=""
        type="text"
        placeholder={
          watch(fieldName).length === 0
            ? placeholder
            : ""
        }
        optional={false}
        className="
          w-full
          bg-transparent
          text-sm sm:text-base
          text-gray-900
          dark:text-gray-100
          placeholder:text-gray-400
          dark:placeholder:text-gray-500
          outline-none
          border-0
          px-3
          py-2
          focus:border-0
          focus:ring-0
        "
        {...register(fieldName)}
      />

    </div>

    {/* Buttons */}
    <div
      className={`
        flex
        gap-2
        ${
          isFocusEmogiInput &&
          fieldName === "commentContent"
            ? "items-center justify-between px-2 sm:px-3 w-full"
            : "items-center"
        }
      `}
    >

      {/* Emoji */}
      <button
        type="button"
        className="
          p-1.5
          text-gray-500
          dark:text-gray-400
          hover:text-yellow-500
          dark:hover:text-yellow-400
          cursor-pointer
          transition
        "
        onClick={() => setShowEmoji(!showEmoji)}
      >
        <Smile size={18} />
      </button>

      {/* Send */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`
          rounded-full
          ${
            isSubmitting
              ? "bg-blue-300 dark:bg-blue-900"
              : "bg-gray-400 dark:bg-slate-700"
          }
          my-1
          p-2
          cursor-pointer
          text-white
          hover:bg-gray-500
          dark:hover:bg-slate-600
          transition
          disabled:cursor-not-allowed
        `}
      >
        <SendHorizonal size={13} />
      </button>

    </div>

  </div>

</div>
  );
}