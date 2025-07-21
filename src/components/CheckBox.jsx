import PropTypes from "prop-types";
import { Controller, useFormContext } from "react-hook-form";

const CheckBox = ({ name, options, label, requiredMessage, required }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

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
                    className="accent-primary ml-4"
                  />
                  <label htmlFor={optionId}>{option}</label>
                </div>
              );
            })}
          </div>
        )}
      />

      {errors?.[name]?.message && (
        <p className="text-error text-xs mt-1">{errors[name].message}</p>
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
};

CheckBox.defaultProps = {
  label: "",
  requiredMessage: "Please select an option",
  required: false,
};

export default CheckBox;
