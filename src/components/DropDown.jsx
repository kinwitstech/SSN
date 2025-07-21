import PropTypes from "prop-types";
import { useFormContext, Controller } from "react-hook-form";
import { twMerge } from "tailwind-merge";

const Dropdown = ({
  name,
  label,
  options,
  required,
  requiredMessage,
  placeholder,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const hasError = !!errors?.[name];

  return (
    <div className="w-full mb-6">
      {label && (
        <label htmlFor={name} className="block text-textSecondary mb-1">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}

      <Controller
        id={name}
        name={name}
        control={control}
        defaultValue=""
        rules={{
          validate: (value) =>
            !required || (value && value !== "") || requiredMessage,
        }}
        render={({ field }) => (
          <div
            className={twMerge(
              "flex items-center border rounded px-2 py-3 bg-white",
              hasError
                ? "border-error"
                : "border-neutral-light focus-within:border-primary"
            )}
          >
            <select
              id={name}
              {...field}
              className={twMerge(
                "w-full outline-none bg-transparent text-m",
                field.value === "" ? "text-neutral-dark" : "text-dark"
              )}
            >
              <option value="" disabled hidden>
                {placeholder}
              </option>
              {options.map((option) => (
                <option key={option} value={option} className="text-dark">
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}
      />

      {errors?.[name]?.message && (
        <p className="text-error text-xs mt-1">{errors[name].message}</p>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  required: PropTypes.bool,
  requiredMessage: PropTypes.string,
  placeholder: PropTypes.string,
};

Dropdown.defaultProps = {
  label: "",
  required: false,
  requiredMessage: "Please select an option",
};

export default Dropdown;
