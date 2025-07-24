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
      <div className="bg-blue-50 text-blue-800 p-5 text-sm rounded-md flex items-start gap-2">
        <div className="flex items-center justify-center">
          <InformationCircleIcon className="w-5 h-5 mt-5 text-blue-600 shrink-0" />
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
          <div className="w-24 h-24 rounded-full bg-purple-100 overflow-hidden">
            {profileImagePreview ? (
              <img
                src={profileImagePreview}
                alt="Profile Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <UserIcon className="w-10 h-10 text-purple-400" />
              </div>
            )}
          </div>
          <label
            htmlFor="profileImageUpload"
            className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary text-white flex items-center justify-center rounded-full cursor-pointer hover:bg-primary-dark"
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
        <p className="text-error text-xs text-center -mt-4">
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

  const { trigger, getValues } = methods;
  const navigate = useNavigate();

  const onSubmit = () => {
    const data = getValues();
    console.log("Doctor Registration Data:", data);
    navigate({ to: "/register-doctor/success" });
  };

  return (
    <FormProvider {...methods}>
      <div className="h-screen flex flex-col max-w-xl mx-auto p-6">
        <div className="flex items-center mb-6 pt-4 h-16 bg-primary text-white rounded-md relative px-4">
          <div className="flex-shrink-0">
            <img src={logo} className="w-8 h-8 mb-4" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-lg font-semibold">Register at Clinic X</p>
          </div>
        </div>

        {/* Scrollable form container */}
        <div className="hide-scroll flex-grow overflow-y-auto pr-1">
          <DoctorFormContent />
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
