import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "px-6 py-3 rounded-none font-medium transition disabled:opacity-50",
          variant === "primary" && "bg-black text-white hover:bg-gray-800",
          variant === "secondary" && "bg-gray-100 text-gray-900 hover:bg-gray-200",
          variant === "outline" && "border border-black text-black hover:bg-black hover:text-white",
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
