import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

const FormFieldWrapper = ({
  name,
  label,
  required,
  error,
  labelClassName,
  children,
}) => {
  return (
    <div className="mb-6 w-full">
      <div className="relative flex items-start rounded">
        <label
          htmlFor={name}
          className={twMerge(
            "floating-label text-textSecondary block w-full",
            labelClassName
          )}
        >
          {children}
          {label && (
            <span className="bg-white">
              {label}
              {required && <span className="text-error ml-1">*</span>}
            </span>
          )}
        </label>
      </div>

      {error && (
        <p id={`${name}-error`} className="text-error mt-1 text-xs">
          {error}
        </p>
      )}
    </div>
  );
};

FormFieldWrapper.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.string,
  labelClassName: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default FormFieldWrapper;
