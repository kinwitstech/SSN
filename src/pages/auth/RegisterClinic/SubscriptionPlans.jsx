import { useFormContext } from "react-hook-form";

const plans = [
  {
    id: "free",
    title: "Free Plan",
    price: "Rs 0 for 30 Days",
    features: ["Everything in Professional Tier for a period of 30 Days"],
  },
  {
    id: "basic",
    title: "Basic Plan",
    price: "Rs 100/ Month",
    features: [
      "Doctor Management, Patient Management, Teleconsultation",
      "Everything in Professional Tier for a period of 30 Days",
    ],
  },
  {
    id: "growth",
    title: "Growth Plan",
    price: "Rs 1000/ Month",
    features: [
      "Doctor Management, Patient Management, Teleconsultation",
      "Everything in Professional Tier for a period of 30 Days",
    ],
  },
];

export default function SubscriptionPlans() {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const selectedPlan = watch("subscriptionPlan");

  const onHandleSelect = (planId) => {
    setValue("subscriptionPlan", planId, { shouldValidate: true });
  };

  return (
    <div className="space-y-4">
      <h1 className="mb-2">Subscription</h1>
      <p className="text-textSecondary">Select a plan that fits your needs</p>
      <>
        {errors.subscriptionPlan && (
          <p className="text-error text-xs">
            Please select a subscription plan!
          </p>
        )}
        {plans.map((plan) => {
          const isSelected = selectedPlan === plan.id;
          return (
            <div
              key={plan.id}
              onClick={() => onHandleSelect(plan.id)}
              className={`cursor-pointer gap-y-4 rounded-lg border p-4 transition ${
                isSelected ? "border-primary shadow" : "border-neutral-light"
              }`}
            >
              <div className="mb-2 flex items-center">
                <input
                  type="radio"
                  name="subscriptionPlan"
                  value={plan.id}
                  checked={isSelected}
                  onChange={() => onHandleSelect(plan.id)}
                  className="accent-primary mr-3 h-5 w-5"
                />
                <h3>{plan.title}</h3>
              </div>
              <p className="text-primary mb-2 font-semibold">{plan.price}</p>
              <ul className="space-y-1 text-sm">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="bg-success mt-2 h-2 w-2 shrink-0 rounded-full" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </>
    </div>
  );
}
