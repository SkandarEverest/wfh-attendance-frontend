import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary" | "danger" | "disabled";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  buttonSize?: ButtonSize;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60",
  secondary: "bg-gray-200 text-gray-dark hover:bg-gray-300 disabled:opacity-60",
  danger: "bg-red-600 text-white hover:bg-red-700 disabled:opacity-60",
  disabled: "bg-gray-300 text-gray-500 cursor-not-allowed",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-2.5 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      buttonSize = "md",
      startIcon,
      endIcon,
      children,
      disabled,
      onClick,
      className = "",
      type = "button",
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || variant === "disabled";

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!isDisabled && onClick) {
        onClick(e);
      }
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        onClick={handleClick}
        className={clsx(
          "inline-flex items-center justify-center rounded font-medium transition-colors disabled:cursor-not-allowed",
          variantClasses[variant],
          sizeClasses[buttonSize],
          className,
        )}
        {...props}
      >
        {startIcon && <span className="mr-1">{startIcon}</span>}
        {children}
        {endIcon && <span className="ml-1">{endIcon}</span>}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
