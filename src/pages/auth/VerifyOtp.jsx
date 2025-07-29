import { KeyIcon } from "@heroicons/react/24/outline";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import ssnLogo from "../../assets/ssn-logo.png";
import BackArrowButton from "../../components/BackArrowButton";
import Button from "../../components/Button";
import Input from "../../components/InputField";

const VerifyOtp = () => {
  const { state: { phone = "" } = {} } = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { register, handleSubmit, formState } = useForm();

  const onSubmit = (data) => {
    console.log("Submitted OTP:", data?.otp);
    navigate({ to: "/super-admin/dashboard" });
  };

  return (
    <div className="flex-center relative min-h-screen px-4 py-6">
      <BackArrowButton />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-sm flex-col items-center space-y-6"
      >
        <img
          src={ssnLogo || ""}
          alt="SSN Logo"
          className="mx-auto h-20 w-20"
          loading="lazy"
        />

        <h1 className="mb-4 w-full text-center">
          {t("inputVerificationCode")}
        </h1>

        <p className="text-textSecondary w-full text-center">
          {t("WeHaveSentOTP")} <br />
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
          leftIcon={<KeyIcon className="text-primary mx-2 h-5 w-5" />}
          leftIconClassName={"flex items-center text-neutral-dark ml-4"}
          register={register}
          formState={formState}
        />
        <Button
          text="Verify & Login"
          type="submit"
          className="btn-primary btn-lg"
        />
      </form>
    </div>
  );
};

export default VerifyOtp;
