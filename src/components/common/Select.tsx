import { forwardRef, type SelectHTMLAttributes } from "react";
import clsx from "clsx";
import { formControlClassName } from "./formControlStyles";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, ...props }, ref) => (
    <select
      ref={ref}
      className={clsx(formControlClassName, className)}
      {...props}
    />
  ),
);

Select.displayName = "Select";

export default Select;
