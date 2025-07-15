import { PhoneIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ssnLogo from "../../assets/ssn-logo.png";
import BackArrowButton from "../../components/BackArrowButton";
import Button from "../../components/Button";

const Login = () => {
  const navigate = useNavigate();
  const [phoneValue, setPhoneValue] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isValid },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Phone submitted:", data.phone);
    navigate({
      to: "/verify-otp",
      state: { phone: getValues("phone") },
    });
  };

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setPhoneValue(value);
    setValue("phone", value);
  };

  const clearInput = () => {
    setPhoneValue("");
    setValue("phone", "");
  };

  return (
    <div className="min-h-screen flex-center px-4 py-6 relative">
      <BackArrowButton to="/" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center w-full max-w-sm space-y-6"
      >
        <img src={ssnLogo || ""} alt="SSN Logo" className="w-20 h-20 mx-auto" />

        <h2 className="text-2xl font-bold text-center w-full">Login</h2>

        <p className="text-gray-600 text-sm text-center w-full">
          Please provide your mobile number to login.
        </p>

        <div className="w-full">
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
            <PhoneIcon className="h-5 w-5 text-blue-500 mr-4" />
            <span className="text-gray-500">+91 |</span>
            <input
              type="tel"
              inputMode="numeric"
              maxLength={10}
              {...register("phone", {
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Phone number must be 10 digits",
                },
              })}
              onInput={handleInputChange}
              placeholder="Enter Phone Number"
              className="flex-1 outline-none pl-2 text-sm text-gray-700"
            />
            {phoneValue.length > 0 && phoneValue.length < 10 && (
              <XMarkIcon
                className="h-4 w-4 text-gray-400 cursor-pointer ml-2"
                onClick={clearInput}
              />
            )}
          </div>
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        <Button
          text="Get OTP"
          type="submit"
          disabled={!isValid || phoneValue.length < 10}
        />
      </form>
    </div>
  );
};

export default Login;
