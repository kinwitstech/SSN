import { PhoneIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "@tanstack/react-router";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Trans, useTranslation } from "react-i18next";

import clinicLogo from "@/assets/clinic-sample.jpg";
import ssnLogo from "@/assets/ssn-logo.png";
import BackArrowButton from "@/components/BackArrowButton";
import Button from "@/components/Button";
import Input from "@/components/InputField";
import { useSubdomain } from "@/hooks/useSubdomain";

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { subdomain } = useSubdomain();
  const [phoneValue, setPhoneValue] = useState("");

  useEffect(() => {
    if (subdomain) {
      document.documentElement.style.setProperty("--color-primary", "#6f6dff");
      document.documentElement.style.setProperty(
        "--color-primary-dark",
        "#5553fd"
      );
    }
  }, [subdomain]);

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
    <div className="flex-center relative min-h-screen px-4 py-6">
      {!subdomain && <BackArrowButton to="/" />}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-md flex-col items-center space-y-6"
      >
        <img
          src={(subdomain ? clinicLogo : ssnLogo) || ""}
          alt={subdomain ? "Clinic logo" : "SSN Logo"}
          className="mx-auto h-20 w-20"
          loading="lazy"
        />

        <h1 className="mb-4 w-full text-center">
          {subdomain ? `Welcome to ${subdomain}` : `${t("login")}`}
        </h1>

        {subdomain && (
          <p className="text-lg text-center">
            <Trans
              i18nKey="affordableCareAnywhere"
              components={{ br: <br /> }}
            />
          </p>
        )}

        {!subdomain && (
          <>
            <p className="text-textSecondary w-full text-center">
              {t("pleaseProvideYourMobileNumberToLogin")}
            </p>
          </>
        )}

        <Input
          name="phone"
          type="tel"
          inputMode="numeric"
          maxLength={10}
          placeholder="Enter phone number"
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
              <PhoneIcon className="text-primary mr-2 h-5 w-5" />
              <span className="text-neutral-dark mr-1 flex items-center space-x-2">
                <span>+91</span>
                <span className="inline-block h-6 w-px bg-current" />
              </span>
            </>
          }
          leftIconClassName={"flex items-center text-neutral-dark ml-4"}
          rightIcon={
            phoneValue.length > 0 &&
            phoneValue.length < 10 && (
              <XMarkIcon
                className="text-textSecondary ml-2 h-4 w-4 cursor-pointer"
                onClick={clearInput}
              />
            )
          }
          onInput={handleInputChange}
          register={register}
          formState={formState}
          autoComplete={"mobile tel"}
        />

        <Button
          text="Get OTP"
          type="submit"
          disabled={phoneValue.length !== 10}
          className="mt-2"
        />
        <p className="text-sm text-gray-600">
          New Patient?{" "}
          <Link to="/" className="text-primary hover:underline">
            Register Here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
