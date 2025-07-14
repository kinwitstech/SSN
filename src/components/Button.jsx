import { useNavigate } from "@tanstack/react-router";
import PropTypes from "prop-types";

const Button = ({ className, disabled, onClick, text, to, type, variant }) => {
  const navigate = useNavigate();

  const baseStyles = "w-full font-medium py-3 rounded-lg";

  const filledStyles = "bg-primary text-white hover:bg-primary-dark";

  const outlinedStyles = "border border-primary text-primary hover:bg-blue-50";

  const variantStyles = variant === "outlined" ? outlinedStyles : filledStyles;

  const finalClassName = `${baseStyles} ${variantStyles} ${
    className || ""
  }`.trim();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (to) {
      navigate({ to });
    }
  };

  return (
    <button
      className={`${finalClassName} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={handleClick}
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  to: PropTypes.string,
  type: PropTypes.string,
  variant: PropTypes.oneOf(["filled", "outlined"]),
};

Button.defaultProps = {
  variant: "filled",
  className: "",
  type: "button",
  disabled: false,
};

export default Button;
