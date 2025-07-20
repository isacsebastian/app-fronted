import * as React from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          variant === "default" && "bg-blue-600 text-white hover:bg-blue-700",
          variant === "outline" && "bg-white border border-gray-300 text-gray-900 hover:bg-gray-50",
          size === "sm" && "px-2 py-1 text-xs",
          size === "md" && "px-4 py-2 text-sm",
          size === "lg" && "px-6 py-3 text-base",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
