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
      <p>Select a plan that fits your needs</p>
      <>
        {errors.subscriptionPlan && (
          <p className="text-red-500 text-sm">
            Please select a subscription plan!
          </p>
        )}
        {plans.map((plan) => {
          const isSelected = selectedPlan === plan.id;
          return (
            <div
              key={plan.id}
              onClick={() => onHandleSelect(plan.id)}
              className={`cursor-pointer border rounded-lg p-4 transition gap-y-4 ${
                isSelected ? "border-primary shadow" : "border-gray-300"
              }`}
            >
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  name="subscriptionPlan"
                  value={plan.id}
                  checked={isSelected}
                  onChange={() => onHandleSelect(plan.id)}
                  className="w-5 h-5 mr-3 accent-primary"
                />
                <h3>{plan.title}</h3>
              </div>
              <p className="text-primary font-semibold mb-2">{plan.price}</p>
              <ul className="space-y-1 text-sm">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex gap-2 items-start">
                    <span className="w-2 h-2 mt-2 bg-green-500 rounded-full shrink-0" />
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
