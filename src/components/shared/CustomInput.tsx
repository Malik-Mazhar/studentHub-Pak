import { twMerge } from "tailwind-merge";

interface InputProps {
    type: string;
    placeholder: string;
    label: string;
    className?: string;
}

export default function CustomInput({
    label,
    type,
    placeholder,
    className,
    ...props
}: InputProps) {
  return (
    <div>
        <label className="mb-1 block text-sm font-medium text-gray-800">
            {label}
        </label>

        <input
            type={type}
            placeholder={placeholder}
            autoComplete="new-password"
            className= {twMerge(`
                w-full
                rounded-xl 
                border 
                border-gray-300 
                bg-white/80 
                px-4 py-3 
                outline-none 
                focus:border-green-500
                `)
            }
            {...props}
        />
    </div>

  )
};
