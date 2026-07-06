import { twMerge } from "tailwind-merge";

interface InputProps {
    type: string;
    placeholder: string;
    label: string;
    optional: boolean;
    className?: string;
}

export default function CustomInput({
    label,
    type,
    placeholder,
    className,
    optional = false,
    ...props
}: InputProps) {
  return (
    <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
            {label}
            
            {optional && (
                <span className="text-gray-400 ml-1">(Optional)</span>
            )}

        </label>

        <input
            type={type}
            placeholder={placeholder}
            autoComplete="new-password"
            className= {twMerge(
                `
                w-full
                rounded-xl 
                border 
                border-gray-300 
                bg-white/80 
                px-4 py-3 
                outline-none 
                focus:border-gray-300
                focus:border-2
                `,
                className
            )
            }
            {...props}
        />
    </div>

  )
};