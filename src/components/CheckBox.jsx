import PropTypes from "prop-types";
import { Controller, useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";

const CheckBox = ({
  name,
  options,
  label,
  requiredMessage,
  required,
  size,
  className,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mb-6 w-full">
      {label && (
        <div className="text-textSecondary mb-2 block">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </div>
      )}

      <Controller
        id={name}
        name={name}
        control={control}
        rules={{
          validate: (value) =>
            !required || value?.length > 0 || requiredMessage,
        }}
        render={({ field }) => (
          <div className="space-y-2">
            {options.map((option, index) => {
              const optionId = `${name}-${index}`;
              const checked = field.value?.includes(option) || false;

              return (
                <div key={option} className="flex items-center gap-2">
                  <input
                    id={optionId}
                    type="checkbox"
                    value={option}
                    checked={checked}
                    onChange={(e) => {
                      const newValue = e.target.checked
                        ? [...(field.value || []), option]
                        : (field.value || []).filter((v) => v !== option);
                      field.onChange(newValue);
                    }}
                    className={twMerge(
                      "checkbox checkbox-primary ml-4",
                      size ? `checkbox-${size}` : "checkbox-sm",
                      className
                    )}
                  />
                  <label htmlFor={optionId}>{option}</label>
                </div>
              );
            })}
          </div>
        )}
      />

      {errors?.[name]?.message && (
        <p className="text-error mt-1 text-xs">{errors[name].message}</p>
      )}
    </div>
  );
};

CheckBox.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  label: PropTypes.string,
  requiredMessage: PropTypes.string,
  required: PropTypes.bool,
  size: PropTypes.string,
  className: PropTypes.string,
};

CheckBox.defaultProps = {
  label: "",
  requiredMessage: "Please select an option",
  required: false,
};

export default CheckBox;
