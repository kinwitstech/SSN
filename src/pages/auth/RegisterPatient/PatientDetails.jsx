import {
  InformationCircleIcon,
  UserIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

import {
  RegisterPatientSchema,
  medicalFields,
  personalFields,
} from "./RegisterPatientSchema";
import logo from "@/assets/ssn-logo.png";
import Button from "@/components/Button";
import Input from "@/components/InputField";
import SelectField from "@/components/SelectField";
import Textarea from "@/components/TextareaField";

const allowedImageTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const maxImageSize = 2 * 1024 * 1024;

const formatDOB = (value) => {
  const digits = value.replace(/\D/g, "");

  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  if (digits.length <= 8)
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;
};

const PersonalTab = ({
  inputProps,
  handleDOBInput,
  dobValue,
  handleProfileImageChange,
  profileImagePreview,
  formState,
}) => {
  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];

  const bloodGroupOptions = [
    { value: "A+", label: "A+" },
    { value: "A-", label: "A-" },
    { value: "B+", label: "B+" },
    { value: "B-", label: "B-" },
    { value: "AB+", label: "AB+" },
    { value: "AB-", label: "AB-" },
    { value: "O+", label: "O+" },
    { value: "O-", label: "O-" },
  ];

  const handleNumericInput = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
  };

  return (
    <div>
      <div className="mb-6 flex flex-col items-center">
        <label htmlFor="profile-upload" className="relative cursor-pointer">
          <div className="avatar">
            <div className="ring-primary ring-offset-base-100 bg-primary/10 mt-1 w-24 rounded-full ring ring-offset-1">
              {profileImagePreview ? (
                <img
                  src={profileImagePreview}
                  className="h-full w-full object-cover object-center"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <UserIcon className="text-primary h-10 w-10" />
                </div>
              )}
            </div>
          </div>
          <div className="bg-primary text-base-100 absolute -right-1 -bottom-1 flex h-6 w-6 items-center justify-center rounded-full">
            <PencilIcon className="h-3 w-3" />
          </div>
          <input
            id="profile-upload"
            name="profileImage"
            type="file"
            accept="image/*"
            onChange={handleProfileImageChange}
            className="hidden"
          />
        </label>
        {formState.errors.profileImage && (
          <p className="text-error mt-2 text-center text-xs">
            {String(formState.errors.profileImage.message)}
          </p>
        )}
      </div>
      <Input
        name="fullName"
        label="Full Name"
        placeholder="Enter your full name"
        required
        {...inputProps}
      />
      <Input
        name="phone"
        label="Contact Number"
        placeholder="Enter your Phone number"
        required
        onInput={handleNumericInput}
        {...inputProps}
      />
      <Input
        name="email"
        label="Email ID"
        placeholder="Enter your email address"
        required
        {...inputProps}
      />
      <div className="flex gap-4">
        <div className="w-3/5">
          <SelectField
            name="gender"
            label="Gender"
            placeholder="Select Gender"
            options={genderOptions}
            required
            {...inputProps}
          />
        </div>
        <div className="w-2/5">
          <SelectField
            name="bloodGroup"
            label="Blood Group"
            placeholder="Select"
            options={bloodGroupOptions}
            required
            {...inputProps}
          />
        </div>
      </div>
      <Textarea
        name="address"
        label="Address"
        placeholder="Enter your Full Address"
        required
        {...inputProps}
      />
      <Input
        name="dob"
        label="Date of Birth"
        placeholder="Date of Birth (dd/mm/yyyy)"
        maxLength={10}
        value={dobValue}
        onChange={handleDOBInput}
        required
        {...inputProps}
      />
    </div>
  );
};

const MedicalTab = ({ inputProps }) => {
  return (
    <div className="overflow-visible pt-6">
      <Textarea
        name="allergies"
        label="Allergies"
        placeholder="List any known allergies"
        rows={2}
        autoExpand
        {...inputProps}
      />
      <Textarea
        name="currentIllness"
        label="Current Illness (If any)"
        placeholder="List your illness here"
        rows={4}
        autoExpand
        {...inputProps}
      />
      <Textarea
        name="currentMedication"
        label="Current Medications (If any)"
        placeholder="List your Medications here"
        rows={4}
        autoExpand
        {...inputProps}
      />
      <Textarea
        name="pastSurgeries"
        label="Past Surgeries"
        placeholder="Mention any past surgeries"
        rows={4}
        autoExpand
        {...inputProps}
      />
    </div>
  );
};

const PatientDetails = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [profileImagePreview, setProfileImagePreview] = useState("");
  const navigate = useNavigate();

  const methods = useForm({
    resolver: zodResolver(RegisterPatientSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      shortIntroduction: "",
      profileImage: null,
      bloodGroup: "",
      allergies: "",
      medicalHistory: "",
      dob: "",
      gender: "",
      currentIllness: "",
      currentMedication: "",
      pastSurgeries: "",
    },
    mode: "onTouched",
  });

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    setError,
    clearErrors,
    watch,
    getValues,
    formState,
  } = methods;

  const inputProps = { register, formState };
  const selectedProfileImage = watch("profileImage");
  const dobValue = watch("dob");

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

  const handleDOBInput = (e) => {
    const formatted = formatDOB(e.target.value);
    setValue("dob", formatted, { shouldValidate: true });
  };

  const onSubmit = () => {
    const data = getValues();
    console.log("Patient form data:", data);
    navigate({ to: "/register-patient/success" });
  };

  const validateAndSubmit = async () => {
    const personalValid = await trigger(personalFields);
    const medicalValid = await trigger(medicalFields);

    if (!personalValid) {
      setActiveTab("personal");
      return;
    }
    if (!medicalValid) {
      setActiveTab("medical");
      return;
    }

    if (personalValid && medicalValid) {
      onSubmit();
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="mx-auto flex h-screen max-w-xl flex-col p-6">
        <div className="bg-primary text-base-100 relative mb-6 flex h-16 items-center rounded-md px-4 pt-4">
          <img src={logo} className="mb-4 h-8 w-8" />
          <div className="flex-center absolute inset-0">
            <p className="text-lg font-semibold">
              Register as Patient in Clinic X
            </p>
          </div>
        </div>

        <div className="alert text-secondary mb-5 flex items-start gap-2 rounded-md bg-blue-50 p-5 text-sm">
          <div className="flex-center">
            <InformationCircleIcon className="text-primary mt-1 h-5 w-5 shrink-0" />
          </div>
          <span>
            Fill in the following details to complete your profile.
            <br />
            You can always make changes to your information once you login to
            the application.
          </span>
        </div>

        <div role="tablist" className="tabs tabs-border tabs-lg mb-4">
          <a
            role="tab"
            className={`tab ${activeTab === "personal" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("personal")}
          >
            Personal
          </a>
          <a
            role="tab"
            className={`tab ${activeTab === "medical" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("medical")}
          >
            Medical
          </a>
        </div>

        <div className="hide-scroll flex-grow overflow-y-auto pr-1">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {activeTab === "personal" ? (
              <PersonalTab
                inputProps={inputProps}
                handleDOBInput={handleDOBInput}
                dobValue={dobValue}
                handleProfileImageChange={handleProfileImageChange}
                profileImagePreview={profileImagePreview}
                formState={formState}
              />
            ) : (
              <MedicalTab inputProps={inputProps} />
            )}
          </form>
        </div>

        <div className="mt-6 mb-6 flex gap-4">
          <Button
            text="Cancel"
            className="btn btn-outline btn-lg flex-1"
            onClick={() => navigate({ to: "/" })}
          />
          <Button
            text="Complete"
            className="btn btn-primary btn-lg flex-1"
            onClick={validateAndSubmit}
          />
        </div>
      </div>
    </FormProvider>
  );
};

export default PatientDetails;
