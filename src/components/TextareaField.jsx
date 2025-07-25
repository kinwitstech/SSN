import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

import FormFieldWrapper from "./FormFieldsWrapper";

// Textarea component for handling multi-line text input with optional auto-expansion,
// error handling and label support.

const Textarea = ({
  className,
  formState,
  inputMode,
  label,
  labelClassName,
  maxLength,
  name,
  placeholder,
  register,
  rules,
  rows,
  autoExpand,
  onInput,
  required,
  size,
  ...rest
}) => {
  const error = formState?.errors?.[name]?.message;
  const textareaRef = useRef(null);

  // Auto-expand logic
  useEffect(() => {
    if (autoExpand && textareaRef.current) {
      const el = textareaRef.current;
      const resize = () => {
        el.style.height = "auto";
        el.style.height = `${el.scrollHeight}px`;
      };
      resize();
      el.addEventListener("input", resize);
      return () => el.removeEventListener("input", resize);
    }
  }, [autoExpand]);

  return (
    <FormFieldWrapper
      name={name}
      label={label}
      required={required}
      error={error}
      labelClassName={labelClassName}
    >
      <textarea
        id={name}
        name={name}
        rows={rows}
        placeholder={placeholder}
        inputMode={inputMode}
        maxLength={maxLength}
        ref={textareaRef}
        {...(register ? register(name, rules) : {})}
        onInput={(e) => {
          if (autoExpand && textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height =
              textareaRef.current.scrollHeight + "px";
          }
          onInput?.(e);
        }}
        {...rest}
        className={twMerge(
          "textarea w-full rounded-xl p-3 outline-none focus:outline-none",
          size ? `textarea-${size}` : "textarea-lg",
          error ? "border-error" : "focus-within:border-primary",
          className
        )}
        aria-invalid={!!error}
        aria-describedby={`${name}-error`}
      />
    </FormFieldWrapper>
  );
};

Textarea.propTypes = {
  className: PropTypes.string,
  formState: PropTypes.object,
  inputMode: PropTypes.string,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  maxLength: PropTypes.number,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  register: PropTypes.func,
  rules: PropTypes.object,
  rows: PropTypes.number,
  autoExpand: PropTypes.bool,
  onChange: PropTypes.func,
  onInput: PropTypes.func,
  required: PropTypes.bool,
  size: PropTypes.string,
};

Textarea.defaultProps = {
  className: undefined,
  inputMode: undefined,
  label: undefined,
  labelClassName: undefined,
  maxLength: undefined,
  placeholder: undefined,
  rules: {},
  rows: 3,
  autoExpand: false,
  onChange: () => {},
  onInput: () => {},
  required: false,
};

export default Textarea;
