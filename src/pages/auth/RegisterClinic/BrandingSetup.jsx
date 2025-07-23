import { PhotoIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { Controller, useFormContext } from "react-hook-form";

import Textarea from "../../../components/TextareaField";

const acceptedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

export default function BrandingSetup() {
  const {
    control,
    setValue,
    watch,
    trigger,
    setError,
    clearErrors,
    register,
    formState,
    formState: { errors },
  } = useFormContext();
  const selectedColor = watch("clinicPrimaryColor") || "#0190CC";
  const selectedLogo = watch("clinicLogo");
  const [logoPreview, setLogoPreview] = useState("");

  const handleLogoChange = async (e) => {
    const file = e.target.files[0];
    const maxSize = 500 * 1024; // 500 KB
    if (!file) return;
    if (file.size > maxSize) {
      setError("clinicLogo", {
        type: "manual",
        message: "Image must be less than 500 KB.",
      });
      setValue("clinicLogo", null);
      setLogoPreview("");
      return;
    }
    if (!acceptedTypes.includes(file.type)) {
      setError("clinicLogo", {
        type: "manual",
        message: "Please upload a PNG, JPG, or WebP image.",
      });
      setValue("clinicLogo", null);
      setLogoPreview("");
      return;
    }
    // Valid file: clear errors
    clearErrors("clinicLogo");
    setValue("clinicLogo", file, { shouldValidate: true });
    await trigger("clinicLogo");
    setLogoPreview(URL.createObjectURL(file));
  };

  useEffect(() => {
    if (selectedLogo && typeof selectedLogo === "object") {
      const previewUrl = URL.createObjectURL(selectedLogo);
      setLogoPreview(previewUrl);
      return () => URL.revokeObjectURL(previewUrl);
    }
  }, [selectedLogo]);

  return (
    <div className="space-y-6">
      <h1 className="mb-2">Branding Setup</h1>
      <p className="text-textSecondary">
        Customize your clinic's appearance for patients
      </p>
      {/* Upload Logo */}
      <div className="mb-2 flex items-center gap-4 md:flex-row">
        <div className="flex-center h-32 w-32 self-center overflow-hidden rounded bg-blue-50 md:self-auto">
          {logoPreview ? (
            <img
              src={logoPreview}
              alt="Preview"
              className="h-28 w-28 object-cover"
            />
          ) : (
            <PhotoIcon className="h-10 w-10 text-blue-300" />
          )}
        </div>

        <div className="text-center md:text-left">
          <div className="mb-2 block">Upload Clinic’s Logo</div>
          <label
            htmlFor="logoUpload"
            className="bg-primary inline-block cursor-pointer rounded px-4 py-2 text-white"
          >
            <input
              id="logoUpload"
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              className="hidden"
            />
            {selectedLogo?.name ? "Edit Logo" : "Choose Logo"}
          </label>

          {selectedLogo && typeof selectedLogo === "object" && (
            <p className="text-neutral-dark mt-1 text-sm">
              {selectedLogo.name}
            </p>
          )}
        </div>
      </div>
      {errors?.clinicLogo && (
        <p className="text-error mb-0 text-xs">{errors.clinicLogo.message}</p>
      )}

      {/* Color Picker */}
      <div className="mt-6">
        <label htmlFor="primaryColorSelection" className="mb-1 block">
          Pick your primary color
        </label>
        <div className="flex gap-4">
          <Controller
            id="primaryColorSelection"
            name="clinicPrimaryColor"
            control={control}
            defaultValue="#0190CC"
            render={({ field }) => (
              <div className="inline-block rounded border p-2">
                <HexColorPicker {...field} color={field.value} />
              </div>
            )}
          />
          <div
            className="mt-2 h-18 w-18 rounded border"
            style={{ backgroundColor: selectedColor }}
          />
        </div>
      </div>

      {/* Tagline */}
      <Textarea
        name="clinicTagline"
        label="Clinic Tagline"
        placeholder="Enter your clinic's tagline"
        rows={3}
        register={register}
        formState={formState}
      />
    </div>
  );
}
