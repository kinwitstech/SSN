import PropTypes from "prop-types";
import { useFormContext, Controller } from "react-hook-form";

const CheckBox = ({ 
    name, 
    options, 
    label, 
    requiredMessage,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="w-full mb-6">
      {label && (
        <label className="block text-textSecondary mb-1">
          {label}
          <span className="text-error ml-1">*</span>
        </label>
      )}

      <Controller
        name={name}
        control={control}
        rules={{
          validate: (value) =>
            value?.length > 0 || requiredMessage || "Please select an option",
        }}
        render={({ field }) => (
          <div className="space-y-2">
            {options.map((option) => (
              <label key={option} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={option}
                  checked={field.value?.includes(option) || false}
                  onChange={(e) => {
                    const newValue = e.target.checked
                      ? [...(field.value || []), option]
                      : (field.value || []).filter((v) => v !== option);
                    field.onChange(newValue);
                  }}
                  className="accent-primary"
                />
                {option}
              </label>
            ))}
          </div>
        )}
      />

      {errors[name] && (
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
};

CheckBox.defaultProps = {
  label: "",
  requiredMessage: "Please select an option",
};

export default CheckBox;
