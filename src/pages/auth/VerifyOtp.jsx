import { KeyIcon } from "@heroicons/react/24/outline";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import ssnLogo from "../../assets/ssn-logo.png";
import BackArrowButton from "../../components/BackArrowButton";
import Button from "../../components/Button";
import Input from "../../components/InputField";

const VerifyOtp = () => {
  const { state: { phone = "" } = {} } = useLocation();
  const navigate = useNavigate();

  const { register, handleSubmit, formState } = useForm();

  const onSubmit = (data) => {
    console.log("Submitted OTP:", data?.otp);
    navigate({ to: "/superAdmin" });
  };

  return (
    <div className="min-h-screen flex-center px-4 py-6 relative">
      <BackArrowButton />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center w-full max-w-sm space-y-6"
      >
        <img
          src={ssnLogo || ""}
          alt="SSN Logo"
          className="w-20 h-20 mx-auto"
          loading="lazy"
        />

        <h1 className="text-center w-full mb-4">Input Verification Code</h1>

        <p className="text-textSecondary text-center w-full">
          We have sent an OTP to <br />
          <span className="font-medium">
            +91 - {phone.replace(/^(\d{6})/, "XXXXXX")}
          </span>
        </p>

        <Input
          name="otp"
          type="text"
          inputMode="numeric"
          maxLength={6}
          placeholder="Enter 6 digit OTP"
          rules={{
            required: "OTP is required",
            pattern: {
              value: /^[0-9]{6}$/,
              message: "Enter a valid 6-digit OTP",
            },
          }}
          className="rounded-xl"
          leftIcon={<KeyIcon className="h-5 w-5 text-primary mx-2" />}
          leftIconClassName={"flex items-center text-neutral-dark"}
          register={register}
          formState={formState}
        />
        <Button text="Verify & Login" type="submit" />
      </form>
    </div>
  );
};

export default VerifyOtp;
