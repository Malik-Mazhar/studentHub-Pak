import { twMerge } from "tailwind-merge";

interface InputProps {
    type: string;
    placeholder: string;
    label: string;
    optional: boolean;
    className?: string;
    error?: string;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    isSignUp?: boolean
}

export default function CustomInput({
    label,
    type,
    placeholder,
    className, 
    optional = false,
    isSignUp,
    error,
    onFocus,
    onBlur,
    ...props
}: InputProps) {
  return (
    <div>
        <label className={`mb-1 block text-sm font-medium ${isSignUp? "" : "text-gray-700"} dark:text-gray-300`}>
            {label}

            {optional && (
            <span className="text-gray-400 dark:text-gray-500 ml-1">(Optional)</span>
            )}

            {!optional && (
                <span className="ml-1 text-red-500">*</span>
            )}
        </label>

        <input
            type={type}
            placeholder={placeholder}
            autoComplete="new-password"
            onFocus={onFocus}
            onBlur={onBlur}
            className={twMerge(
            `w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-[#101827] px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:border-gray-300 dark:focus:border-gray-600 focus:border-2`,
            className
            )}
            {...props}
        />

        {error && (
            <p className="text-sm text-red-500 dark:text-red-400 mt-1">
            {error}
            </p>
        )}
    </div>

  )
};