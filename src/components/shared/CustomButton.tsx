import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
// import { Button } from '@/components/ui/button'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export default function Button({
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={twMerge(
        `
        text-gray-200
        text-sm
        font-semibold
        px-2.5
        py-1.25
        rounded
        shadow-lg
        transition-all
        duration-300
        hover:scale-105
        bg-linear-to-r
        from-[#017D63]
        to-[#0aa382] 
        cursor-pointer
        disabled:opacity-50
        disabled:cursor-not-allowed
        disabled:hover:scale-100
        `,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
