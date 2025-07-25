import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "@tanstack/react-router";
import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

const Button = ({
  text,
  to,
  onClick,
  disabled,
  type = "button",
  className,
  isLoading,
  leftIcon,
  leftIconClassName,
  rightIcon,
  rightIconClassName,
}) => {
  const navigate = useNavigate();

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
      className={twMerge(
        "btn flex-center btn-block gap-2 rounded-lg",
        className
      )}
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
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  leftIcon: PropTypes.node,
  leftIconClassName: PropTypes.string,
  rightIcon: PropTypes.node,
  rightIconClassName: PropTypes.string,
};

export default Button;
