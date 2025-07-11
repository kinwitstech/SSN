import { CheckIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Button from "../../../components/Button";
import BrandingSetup from "./BrandingSetup";
import { fullSchema, stepFieldsMap } from "./RegisterClinicSchema";

// Step Components
const steps = [{ title: "Branding", component: BrandingSetup }];

const RegisterClinic = () => {
  const [stepIndex, setStepIndex] = useState(0);
  const StepComponent = steps[stepIndex].component;
  const navigate = useNavigate();

  const methods = useForm({
    resolver: zodResolver(fullSchema),
    mode: "onBlur",
    defaultValues: {
      clinicLogo: undefined,
    },
  });

  const onSubmit = (data) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
    navigate({ to: "/registerClinic/success" });
  };

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen flex flex-col max-w-xl mx-auto p-6">
        {/* Step Indicator */}
        <div className="flex justify-between mb-8 pt-6">
          {steps.map((step, index) => (
            <div
              key={step.title}
              onClick={async () => {
                if (index === stepIndex) return;
                const isForward = index > stepIndex;
                let canNavigate = true;
                if (isForward) {
                  // Validate each step from current to target (exclusive)
                  for (let i = stepIndex; i < index; i++) {
                    const fieldsToValidate = stepFieldsMap[i] || [];
                    const valid = await methods.trigger(fieldsToValidate);
                    if (!valid) {
                      canNavigate = false;
                      break;
                    }
                  }
                }
                if (canNavigate) setStepIndex(index);
              }}
              className="flex-1 text-center cursor-pointer"
            >
              <div
                className={`w-8 h-8 mx-auto rounded-full text-white flex items-center justify-center ${
                  index === stepIndex
                    ? "bg-primary"
                    : index < stepIndex
                    ? "bg-[#B4DBFF] text-primary-dark"
                    : "bg-gray-300 text-black"
                }`}
              >
                {index < stepIndex ? (
                  <CheckIcon
                    className="w-8 h-4 text-primary-dark"
                    strokeWidth={4}
                  />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <p className="text-sm mt-1">{step.title}</p>
            </div>
          ))}
        </div>

        {/* Form Step */}
        <form
          className="flex flex-col flex-grow mb-4"
          onSubmit={async (e) => {
            e.preventDefault();
            const fields = stepFieldsMap[stepIndex] || [];
            const isValid = await methods.trigger(fields);
            if (!isValid) return;
            if (stepIndex === steps.length - 1) {
              const data = methods.getValues();
              onSubmit(data);
            } else setStepIndex((prev) => prev + 1);
          }}
        >
          <div className="flex-grow">
            <StepComponent />
          </div>

          <div className="flex justify-between pt-6 mt-6">
            <div className="w-50 mr-2">
              <Button
                text="Previous"
                variant="outlined"
                type="button"
                onClick={() => setStepIndex((prev) => prev - 1)}
                disabled={stepIndex === 0}
              />
            </div>
            <div className="w-50 ml-2">
              <Button
                text={
                  stepIndex === steps.length - 1
                    ? "Submit"
                    : steps[stepIndex + 1]?.title
                }
                type="submit"
              />
            </div>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default RegisterClinic;
