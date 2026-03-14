import { forwardRef, type TextareaHTMLAttributes } from "react";
import clsx from "clsx";
import { formControlClassName } from "../../utils/formControlStyles";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={clsx(formControlClassName, className)}
      {...props}
    />
  ),
);

Textarea.displayName = "Textarea";

export default Textarea;
