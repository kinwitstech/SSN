import { InformationCircleIcon, UserIcon } from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";

import registerDoctorSchema from "./RegisterDoctorSchema";
import logo from "@/assets/ssn-logo.png";
import Button from "@/components/Button";
import Input from "@/components/InputField";
import Textarea from "@/components/TextareaField";

const allowedImageTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const maxImageSize = 2 * 1024 * 1024;

const DoctorFormContent = () => {
  const {
    register,
    setValue,
    setError,
    clearErrors,
    trigger,
    watch,
    formState,
  } = useFormContext();

  const [profileImagePreview, setProfileImagePreview] = useState("");
  const selectedProfileImage = watch("profileImage");

  const handleNumericInput = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
  };

  const handleProfileImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      setValue("profileImage", null);
      setProfileImagePreview("");
      return;
    }

    if (!allowedImageTypes.includes(file.type)) {
      setError("profileImage", {
        type: "manual",
        message: "Invalid file type. Only image formats allowed.",
      });
      setValue("profileImage", null);
      setProfileImagePreview("");
      return;
    }

    if (file.size > maxImageSize) {
      setError("profileImage", {
        type: "manual",
        message: "Image must be under 2MB.",
      });
      setValue("profileImage", null);
      setProfileImagePreview("");
      return;
    }

    clearErrors("profileImage");
    setValue("profileImage", file, { shouldValidate: true });
    await trigger("profileImage");

    const reader = new FileReader();
    reader.onload = (e) => setProfileImagePreview(e.target?.result);
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (selectedProfileImage && typeof selectedProfileImage === "object") {
      const reader = new FileReader();
      reader.onload = (e) => setProfileImagePreview(e.target?.result);
      reader.readAsDataURL(selectedProfileImage);
    }
  }, [selectedProfileImage]);

  const inputProps = { register, formState };

  return (
    <div className="space-y-6 pb-6">
      <div className="text-secondary flex items-start gap-2 rounded-md bg-blue-50 p-5 text-sm">
        <div className="flex-center">
          <InformationCircleIcon className="text-primary mt-5 h-5 w-5 shrink-0" />
        </div>
        <span>
          Fill in the following details to complete your profile.
          <br />
          You can always make changes to your information once you login to the
          application.
        </span>
      </div>

      {/* Profile Image Upload */}
      <div className="flex justify-center">
        <div className="relative">
          <div className="h-24 w-24 overflow-hidden rounded-full bg-purple-100">
            {profileImagePreview ? (
              <img
                src={profileImagePreview}
                alt="Profile Preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex-center h-full w-full">
                <UserIcon className="h-10 w-10 text-purple-400" />
              </div>
            )}
          </div>
          <label
            htmlFor="profileImageUpload"
            className="bg-primary flex-center hover:bg-primary-dark absolute -right-1 -bottom-1 h-8 w-8 cursor-pointer rounded-full text-white"
          >
            +
          </label>
          <input
            id="profileImageUpload"
            type="file"
            accept="image/*"
            onChange={handleProfileImageChange}
            className="hidden"
          />
        </div>
      </div>

      {formState.errors.profileImage?.message && (
        <p className="text-error -mt-4 text-center text-xs">
          {String(formState.errors.profileImage.message)}
        </p>
      )}

      <Textarea
        name="shortIntroduction"
        label="Short Introduction"
        placeholder="Please provide a short introduction"
        rows={3}
        {...inputProps}
      />

      <Input
        name="fullName"
        label="Full Name"
        placeholder="Enter your Name"
        required
        {...inputProps}
      />
      <Input
        name="email"
        label="Email"
        placeholder="Enter your Email ID"
        type="email"
        required
        {...inputProps}
      />
      <Input
        name="phone"
        label="Phone"
        placeholder="Enter your Phone Number"
        type="tel"
        required
        onInput={handleNumericInput}
        {...inputProps}
      />
      <Input
        name="specialty"
        label="Specialty"
        placeholder="Enter your Specialty"
        required
        {...inputProps}
      />
    </div>
  );
};

const DoctorDetails = () => {
  const methods = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      specialty: "",
      shortIntroduction: "",
      profileImage: null,
    },
    mode: "onTouched",
    resolver: zodResolver(registerDoctorSchema),
  });

  const { trigger, getValues, handleSubmit } = methods;
  const navigate = useNavigate();

  const onSubmit = () => {
    const data = getValues();
    console.log("Doctor Registration Data:", data);
    navigate({ to: "/register-doctor/success" });
  };

  return (
    <FormProvider {...methods}>
      <div className="mx-auto flex h-screen max-w-xl flex-col p-6">
        <div className="bg-primary relative mb-6 flex h-16 items-center rounded-md px-4 pt-4 text-white">
          <div className="flex-shrink-0">
            <img src={logo} className="mb-4 h-8 w-8" />
          </div>
          <div className="flex-center absolute inset-0">
            <p className="text-lg font-semibold">Register at Clinic X</p>
          </div>
        </div>

        {/* Scrollable form container */}
        <div className="hide-scroll flex-grow overflow-y-auto pr-1">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <DoctorFormContent />
          </form>
        </div>

        {/* Footer buttons */}
        <div className="mt-6 mb-6 flex gap-4">
          <Button
            text="Cancel"
            variant="outline"
            onClick={() => navigate({ to: "/" })}
            className="flex-1"
          />
          <Button
            text="Complete"
            className="flex-1"
            onClick={async () => {
              const isValid = await trigger();
              if (isValid) {
                onSubmit();
              }
            }}
          />
        </div>
      </div>
    </FormProvider>
  );
};

export default DoctorDetails;
