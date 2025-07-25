import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

import FormFieldWrapper from "./FormFieldsWrapper";

const Select = ({
  name,
  label,
  required,
  placeholder,
  formState,
  register,
  rules,
  options,
  labelClassName,
  className,
  size,
  ...rest
}) => {
  const error = formState?.errors?.[name]?.message;

  return (
    <FormFieldWrapper
      name={name}
      label={label}
      required={required}
      error={error}
      labelClassName={labelClassName}
    >
      <select
        id={name}
        name={name}
        className={twMerge(
          "border-neutral-light select w-full rounded-xl outline-none focus:outline-none",
          rest?.disabled ? "cursor-not-allowed bg-gray-100" : "",
          size ? `select-${size}` : "select-lg",
          error ? "border-error" : "focus-within:border-primary",
          className
        )}
        {...(register ? register(name, rules) : {})}
        aria-invalid={!!error}
        aria-describedby={`${name}${error ? "-error" : ""}`}
        defaultValue=""
        {...rest}
      >
        {placeholder && (
          <option value="" disabled={required}>
            {placeholder}
          </option>
        )}
        {options?.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </FormFieldWrapper>
  );
};

Select.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  formState: PropTypes.object,
  register: PropTypes.func,
  rules: PropTypes.object,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  labelClassName: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.string,
};

Select.defaultProps = {
  label: undefined,
  required: false,
  placeholder: "Please select an option",
  formState: {},
  register: undefined,
  rules: {},
  labelClassName: undefined,
  className: undefined,
};

export default Select;
