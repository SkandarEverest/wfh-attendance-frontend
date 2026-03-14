import { forwardRef, type InputHTMLAttributes } from "react";
import clsx from "clsx";
import { formControlClassName } from "../../utils/formControlStyles";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={clsx(formControlClassName, className)}
      {...props}
    />
  ),
);

Input.displayName = "Input";

export default Input;
