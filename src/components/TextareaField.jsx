import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";
import { useRef, useEffect } from "react";

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
    <div className="w-full mb-6">
      {label && (
        <label htmlFor={name} className={twMerge("block mb-1 text-textSecondary", labelClassName)}>
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      <div 
        className={twMerge(
          "flex items-start border border-neutral-light rounded bg-white",
          error ? "border-error" : "",
          className
        )}
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
          className="w-full p-3 outline-none rounded focus:ring-1 focus:ring-primary focus:border-primary"
          aria-invalid={!!error}
          aria-describedby={`${name}-error`}
        />
      </div>

      {error && (
        <p id={`${name}-error`} className="text-error text-xs mt-1">
          {error}
        </p>
      )}
    </div>
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
