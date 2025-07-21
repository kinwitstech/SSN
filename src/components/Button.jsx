import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "@tanstack/react-router";
import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

const Button = ({
  text,
  to,
  onClick,
  disabled,
  type,
  variant,
  className,
  isLoading,
  leftIcon,
  leftIconClassName,
  rightIcon,
  rightIconClassName,
}) => {
  const navigate = useNavigate();

  const baseStyles =
    "w-full font-medium py-3 rounded-lg flex items-center justify-center gap-2";
  const filledStyles = "bg-primary text-white hover:bg-primary-dark";
  const outlinedStyles = "border border-primary text-primary hover:bg-blue-50";
  const variantStyles = variant === "outlined" ? outlinedStyles : filledStyles;

  const finalClassName = twMerge(
    baseStyles,
    variantStyles,
    disabled || isLoading ? "opacity-50 cursor-not-allowed" : "",
    className
  );

  const handleClick = (e) => {
    if (disabled || isLoading) {
      e.preventDefault();
      return;
    }
    if (onClick) {
      onClick(e);
    } else if (to) {
      navigate({ to });
    }
  };

  return (
    <button
      className={finalClassName}
      onClick={handleClick}
      type={type}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <ArrowPathIcon className="h-6 w-6 animate-spin" />
      ) : (
        <>
          {leftIcon && (
            <span className={twMerge("mr-1", leftIconClassName)}>
              {leftIcon}
            </span>
          )}
          <span>{text}</span>
          {rightIcon && (
            <span className={twMerge("ml-1", rightIconClassName)}>
              {rightIcon}
            </span>
          )}
        </>
      )}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  to: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  variant: PropTypes.oneOf(["filled", "outlined"]),
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  leftIcon: PropTypes.node,
  leftIconClassName: PropTypes.string,
  rightIcon: PropTypes.node,
  rightIconClassName: PropTypes.string,
};

Button.defaultProps = {
  to: undefined,
  onClick: undefined,
  disabled: false,
  type: "button",
  variant: "filled",
  className: "",
  isLoading: false,
  leftIcon: null,
  leftIconClassName: undefined,
  rightIcon: null,
  rightIconClassName: undefined,
};

export default Button;
