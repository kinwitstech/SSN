import { KeyIcon } from "@heroicons/react/24/outline";
import { useLocation } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import ssnLogo from "../../assets/ssn-logo.png";
import BackArrowButton from "../../components/BackArrowButton";
import Button from "../../components/Button";

const VerifyOtp = () => {
  const { state: { phone = "" } = {} } = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Submitted OTP:", data.otp);
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4 py-6 relative">
      <BackArrowButton />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center w-full max-w-sm space-y-6"
      >
        <img src={ssnLogo} alt="SSN Logo" className="w-20 h-20 mx-auto" />

        <h2 className="text-2xl font-bold text-center w-full">
          Input Verification Code
        </h2>

        <p className="text-gray-600 text-sm text-center w-full">
          We have sent an OTP to <br />
          <span className="font-medium text-black">
            +91 - {phone.replace(/^(\d{6})/, "XXXXXX")}
          </span>
        </p>

        <div className="w-full">
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
            <KeyIcon className="h-5 w-5 text-blue-500 mr-4" />
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              {...register("otp", {
                required: "OTP is required",
                pattern: {
                  value: /^[0-9]{6}$/,
                  message: "Enter a valid 6-digit OTP",
                },
              })}
              placeholder="Enter 6 digit OTP"
              className="flex-1 outline-none text-sm text-gray-700"
            />
          </div>
          {errors.otp && (
            <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>
          )}
        </div>

        <Button
          text="Verify & Login"
          type="submit"
          disabled={!isValid}
          to="/superAdmin"
        />
      </form>
    </div>
  );
};

export default VerifyOtp;
