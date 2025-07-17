  import PropTypes from "prop-types";
  import { twMerge } from "tailwind-merge";

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
    ...rest
  }) => {
    const error = formState?.errors?.[name]?.message;

    return (
      <div className="w-full mb-6">
        {label && (
          <label
            htmlFor={name}
            className={twMerge("block mb-1 text-textSecondary", labelClassName)}
          >
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </label>
        )}
        <div
          className={twMerge(
            "flex items-center border border-neutral-light rounded px-3 py-3 bg-white",
            error
              ? "border-error"
              : "focus-within:ring-2 focus-within:ring-primary",
            className
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
              "flex-1 outline-none bg-transparent text-textPrimary",
              leftIcon ? "pl-2" : "",
              rightIcon ? "pr-2" : ""
            )}
            onChange={rest.onChange}
            onInput={rest.onInput}
            aria-invalid={!!error}
            aria-describedby={`${name}-error`}
            {...rest}
          />

          {rightIcon && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (typeof rightIcon?.props?.onClick === "function") {
                  rightIcon.props.onClick(e);
                }
              }}
              className={rightIconClassName}
            >
              {rightIcon}
            </button>
          )}
        </div>

        {error && (
          <p id={`${name}-error`} className="text-error text-xs mt-1">
            {error}
          </p>
        )}
      </div>
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
