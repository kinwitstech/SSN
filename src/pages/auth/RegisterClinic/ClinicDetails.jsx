import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import CheckBox from "../../../components/CheckBox";
import Input from "../../../components/InputField";
import Textarea from "../../../components/TextareaField";

const allowedTypes = [
  "application/pdf",
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const maxSize = 2 * 1024 * 1024; // 2MB

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
          placeholder="Enter your Clinic Name"
          required
          {...inputProps}
        />
        <Input
          name="adminName"
          label="Admin Name"
          placeholder="Enter Admin Name"
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
        <Textarea
          name="clinicAddress"
          label="Clinic Address"
          placeholder="Enter your Clinic Address"
          required
          {...inputProps}
          rows={3}
        />
        <Input
          name="speciality"
          label="Speciality"
          placeholder="Enter your Speciality"
          required
          {...inputProps}
        />
        <Input
          name="consultationFee"
          label="Consultation Fee"
          placeholder="Enter the Consultation Fee"
          required
          onInput={handleDecimalInput}
          {...inputProps}
        />

        {/* --- Certificate Upload --- */}
        <div className="w-full mb-6">
          <label className="block text-textSecondary mb-1">
            Medical Registration Certificate{" "}
            <span className="text-error">*</span>
          </label>

          <label htmlFor="certificateUpload" className="cursor-pointer">
            <div className="w-full flex items-center justify-between px-4 py-2 border border-neutral-light rounded-md bg-white">
              <span className="text-sm text-neutral-dark">
                {certificatePreviewName || "No file chosen"}
              </span>
              <span className="bg-primary text-white text-sm px-3 py-1 rounded-md">
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
            <p className="text-error text-xs mt-1">
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
