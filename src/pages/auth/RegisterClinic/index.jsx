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
  const StepComponent = steps[stepIndex]?.component;
  const navigate = useNavigate();

  const methods = useForm({
    resolver: zodResolver(fullSchema),
    mode: "onBlur",
    defaultValues: {
      clinicLogo: undefined,
      subscriptionPlan: "",
    },
  });

  const onHandleStepperClick = async (index) => {
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
  };

  const onSubmit = (data) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
    navigate({ to: "/registerClinic/success" });
  };

  const onHandleClick = async () => {
    const fields = stepFieldsMap[stepIndex] || [];
    const isValid = await methods.trigger(fields);
    if (!isValid) return;
    if (stepIndex === steps.length - 1) {
      const data = methods.getValues();
      onSubmit(data);
    } else setStepIndex((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (stepIndex === 0) {
      navigate({ to: "/" });
      return;
    }
    setStepIndex((prev) => prev - 1);
  };

  return (
    <FormProvider {...methods}>
      <div className="h-screen flex flex-col max-w-xl mx-auto p-6">
        {/* Step Indicator */}
        <div className="flex justify-between mb-6 pt-4">
          {steps.map((step, index) => (
            <div
              key={step.title}
              onClick={() => onHandleStepperClick(index)}
              className="flex-1 text-center cursor-pointer"
            >
              <div
                className={`w-8 h-8 mx-auto rounded-full text-white flex-center ${
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

        {/* Scrollable Form Content */}
        <div className="flex-grow overflow-y-auto pr-1">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onHandleClick();
            }}
            className="space-y-4"
          >
            <StepComponent />
          </form>
        </div>

        <div className="mt-6 mb-6">
          <div className="flex justify-between">
            <div className="w-50 mr-2">
              <Button
                text="Previous"
                variant="outlined"
                type="button"
                onClick={handlePrevious}
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
                onClick={onHandleClick}
              />
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default RegisterClinic;
