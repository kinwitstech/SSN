import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

import FormFieldWrapper from "./FormFieldsWrapper";

// Input Component
// This component is a reusable input field with optional icons, validation, and styling.
// It accepts label, placeholder, left and right icons.

const Input = ({
  className,
  formState,
  inputMode,
  label,
  labelClassName,
  leftIcon,
  leftIconClassName,
  maxLength,
  name,
  placeholder,
  register,
  rightIcon,
  rightIconClassName,
  rules,
  type,
  required,
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
      <div
        className={twMerge(
          "border-neutral-light flex w-full items-center rounded-xl border",
          error ? "border-error" : "focus-within:border-primary"
        )}
      >
        {leftIcon && (
          <span className={twMerge("mr-2", leftIconClassName)}>{leftIcon}</span>
        )}

        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          inputMode={inputMode}
          maxLength={maxLength}
          {...(register ? register(name, rules) : {})}
          className={twMerge(
            "input text-textPrimary w-full rounded-xl border-0 bg-transparent outline-none focus:outline-none",
            size ? `input-${size}` : "input-lg",
            leftIcon ? "pl-2" : "",
            rightIcon ? "pr-2" : "",
            className
          )}
          onChange={rest.onChange}
          onInput={rest.onInput}
          aria-invalid={!!error}
          aria-describedby={`${name}${error ? "-error" : ""}`}
          {...rest}
        />

        {rightIcon && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              rightIcon?.props?.onClick?.(e);
            }}
            className={rightIconClassName}
          >
            {rightIcon}
          </button>
        )}
      </div>
    </FormFieldWrapper>
  );
};

Input.propTypes = {
  className: PropTypes.string,
  formState: PropTypes.object,
  inputMode: PropTypes.string,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  leftIcon: PropTypes.node,
  leftIconClassName: PropTypes.string,
  maxLength: PropTypes.number,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onInput: PropTypes.func,
  placeholder: PropTypes.string,
  register: PropTypes.func,
  rightIcon: PropTypes.node,
  rightIconClassName: PropTypes.string,
  rules: PropTypes.object,
  size: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool,
};

Input.defaultProps = {
  className: undefined,
  inputMode: undefined,
  label: undefined,
  labelClassName: undefined,
  leftIcon: null,
  leftIconClassName: undefined,
  maxLength: undefined,
  placeholder: undefined,
  rightIcon: null,
  rightIconClassName: undefined,
  rules: {},
  type: "text",
  onChange: () => {},
  onInput: () => {},
  required: false,
};

export default Input;
