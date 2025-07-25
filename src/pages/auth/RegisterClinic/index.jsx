import { CheckIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import BrandingSetup from "./BrandingSetup";
import ClinicDetails from "./ClinicDetails";
import { fullSchema, stepFieldsMap } from "./RegisterClinicSchema";
import SubscriptionPlans from "./SubscriptionPlans";
import Button from "../../../components/Button";

// Step Components
const steps = [
  { title: "Clinic Details", component: ClinicDetails },
  { title: "Branding", component: BrandingSetup },
  { title: "Subscription", component: SubscriptionPlans },
];

const RegisterClinic = () => {
  const [stepIndex, setStepIndex] = useState(0);
  const StepComponent = steps[stepIndex]?.component;
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const methods = useForm({
    resolver: zodResolver(fullSchema),
    mode: "onBlur",
    defaultValues: {
      clinicLogo: undefined,
      subscriptionPlan: "",
      servicesProvided: [],
    },
  });

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [stepIndex]);

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
      <div className="mx-auto flex h-screen max-w-xl flex-col p-6">
        {/* Step Indicator */}
        <div className="mb-6 flex justify-between pt-4">
          {steps.map((step, index) => (
            <div
              key={step.title}
              onClick={() => onHandleStepperClick(index)}
              className="flex-1 cursor-pointer text-center"
            >
              <div
                className={`flex-center mx-auto h-8 w-8 rounded-full text-white ${
                  index === stepIndex
                    ? "bg-primary"
                    : index < stepIndex
                      ? "text-primary-dark bg-[#B4DBFF]"
                      : "bg-gray-300 text-black"
                }`}
              >
                {index < stepIndex ? (
                  <CheckIcon
                    className="text-primary-dark h-4 w-8"
                    strokeWidth={4}
                  />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <p className="mt-1 text-sm">{step.title}</p>
            </div>
          ))}
        </div>

        {/* Scrollable Form Content */}
        <div ref={scrollRef} className="hide-scroll flex-grow overflow-y-auto">
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
            <div className="mr-2 w-50">
              <Button
                text="Previous"
                variant="outline"
                type="button"
                onClick={handlePrevious}
              />
            </div>
            <div className="ml-2 w-50">
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
