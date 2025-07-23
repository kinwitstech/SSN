import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";

import CheckBox from "@/components/CheckBox";
import Input from "@/components/InputField";
import Select from "@/components/SelectField";
import Textarea from "@/components/TextareaField";

const allowedTypes = [
  "application/pdf",
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const maxSize = 2 * 1024 * 1024; // 2MB

const specialtyOptions = [
  { value: "cardiology", label: "Cardiology" },
  { value: "dermatology", label: "Dermatology" },
];

const ClinicDetails = () => {
  const {
    register,
    setValue,
    setError,
    clearErrors,
    trigger,
    watch,
    formState,
  } = useFormContext();
  const [certificatePreviewName, setCertificatePreviewName] = useState("");

  const selectedCertificate = watch("certificate");

  const handleNumericInput = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
  };

  const handleDecimalInput = (e) => {
    let value = e.target.value.replace(/[^0-9.]/g, "");
    const parts = value.split(".");
    if (parts.length > 2) {
      value = parts[0] + "." + parts.slice(1).join("");
    }
    e.target.value = value;
  };

  const handleCertificateChange = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      setError("certificate", {
        type: "manual",
        message: "Certificate file is required.",
      });
      setValue("certificate", null);
      setCertificatePreviewName("");
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      setError("certificate", {
        type: "manual",
        message: "Invalid file type. Only PDF or image formats allowed.",
      });
      setValue("certificate", null);
      setCertificatePreviewName("");
      return;
    }

    if (file.size > maxSize) {
      setError("certificate", {
        type: "manual",
        message: "File must be under 2MB.",
      });
      setValue("certificate", null);
      setCertificatePreviewName("");
      return;
    }

    clearErrors("certificate");
    setValue("certificate", file, { shouldValidate: true });
    await trigger("certificate");
    setCertificatePreviewName(file.name);
  };

  useEffect(() => {
    if (selectedCertificate && typeof selectedCertificate === "object") {
      setCertificatePreviewName(selectedCertificate.name);
    }
  }, [selectedCertificate]);

  const inputProps = { register, formState };

  return (
    <div className="space-y-6">
      <h1 className="mb-2">Clinic Details</h1>
      <p className="text-textSecondary">
        Let's start by setting up your clinic's information
      </p>

      <div>
        <Input
          name="clinicName"
          label="Clinic Name"
          placeholder="Enter clinic name"
          required
          {...inputProps}
        />
        <Input
          name="adminName"
          label="Admin Name"
          placeholder="Enter admin name"
          required
          {...inputProps}
        />
        <Input
          name="email"
          label="Email"
          placeholder="Enter email id"
          type="email"
          autoComplete="email"
          {...inputProps}
        />
        <Input
          name="phone"
          label="Phone"
          placeholder="Enter phone number"
          type="tel"
          required
          onInput={handleNumericInput}
          autoComplete={"mobile tel"}
          {...inputProps}
        />
        <Textarea
          name="clinicAddress"
          label="Clinic Address"
          placeholder="Enter clinic address"
          required
          rows={3}
          {...inputProps}
        />
        <Select
          name="specialty"
          label="Specialty"
          placeholder="Select specialty"
          required
          options={specialtyOptions}
          {...inputProps}
        />
        <Input
          name="consultationFee"
          label="Consultation Fee"
          placeholder="Enter consultation fee"
          onInput={handleDecimalInput}
          {...inputProps}
        />

        {/* --- Certificate Upload --- */}
        <div className="mb-6 w-full">
          <div className="text-textSecondary mb-2 block">
            Medical Registration Certificate{" "}
            <span className="text-error">*</span>
          </div>

          <label htmlFor="certificateUpload" className="cursor-pointer">
            <div
              className={twMerge(
                "border-neutral-light flex w-full items-center justify-between rounded-xl border px-4 py-2",
                formState.errors?.certificate?.message ? "border-error" : ""
              )}
            >
              <span className="text-neutral-dark text-sm">
                {certificatePreviewName || "No file chosen"}
              </span>
              <span className="bg-primary rounded-xl px-3 py-1 text-sm text-white">
                Choose File
              </span>
            </div>
          </label>

          <input
            id="certificateUpload"
            type="file"
            accept=".pdf,image/*"
            onChange={handleCertificateChange}
            className="hidden"
          />

          {formState.errors.certificate?.message && (
            <p className="text-error mt-1 text-xs">
              {formState.errors.certificate.message}
            </p>
          )}
        </div>
        <CheckBox
          name="servicesProvided"
          label="Services Provided"
          options={["Lab Work", "Medical Dispensary"]}
          required
        />
      </div>
    </div>
  );
};

export default ClinicDetails;
