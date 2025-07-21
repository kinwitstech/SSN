import { PhoneIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import ssnLogo from "../../assets/ssn-logo.png";
import BackArrowButton from "../../components/BackArrowButton";
import Button from "../../components/Button";
import Input from "../../components/InputField";

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [phoneValue, setPhoneValue] = useState("");

  const { register, handleSubmit, setValue, getValues, formState } = useForm({
    mode: "onBlur",
    defaultValues: {
      phone: "",
    },
  });

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
        <img
          src={ssnLogo || ""}
          alt="SSN Logo"
          className="w-20 h-20 mx-auto"
          loading="lazy"
        />

        <h1 className="text-center w-full mb-4">{t("login")}</h1>

        <p className="text-textSecondary text-center w-full">
          {t("pleaseProvideYourMobileNumberToLogin")}
        </p>

        <Input
          name="phone"
          type="tel"
          inputMode="numeric"
          maxLength={10}
          placeholder="Enter Phone Number"
          rules={{
            required: "Phone number is required",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Phone number must be 10 digits",
            },
          }}
          className="rounded-xl"
          leftIcon={
            <>
              <PhoneIcon className="h-5 w-5 text-primary mr-1" />
              <span className="flex items-center text-neutral-dark mr-1 space-x-2">
                <span>+91</span>
                <span className="inline-block w-px h-6 bg-current" />
              </span>
            </>
          }
          leftIconClassName={"flex items-center text-neutral-dark"}
          rightIcon={
            phoneValue.length > 0 &&
            phoneValue.length < 10 && (
              <XMarkIcon
                className="h-4 w-4 text-textSecondary cursor-pointer ml-2"
                onClick={clearInput}
              />
            )
          }
          onInput={handleInputChange}
          register={register}
          formState={formState}
        />

        <Button
          text="Get OTP"
          type="submit"
          disabled={phoneValue.length !== 10}
          className="mt-2"
        />
      </form>
    </div>
  );
};

export default Login;
