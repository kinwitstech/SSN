import { PhotoIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { Controller, useFormContext } from "react-hook-form";

export default function BrandingSetup() {
  const {
    register,
    control,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useFormContext();
  const selectedColor = watch("clinicPrimaryColor") || "#0190CC";
  const selectedLogo = watch("clinicLogo");
  const [logoPreview, setLogoPreview] = useState(null);

  const handleLogoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("clinicLogo", file, { shouldValidate: true });
      await trigger("clinicLogo");
      setLogoPreview(URL.createObjectURL(file));
    }
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
      {/* Upload Logo */}
      <div className="flex md:flex-row items-center gap-4 mb-2">
        <div className="w-32 h-32 bg-blue-50 flex items-center justify-center rounded overflow-hidden self-center md:self-auto">
          {logoPreview ? (
            <img
              src={logoPreview}
              alt="Preview"
              className="w-28 h-28 object-cover"
            />
          ) : (
            <PhotoIcon className="w-10 h-10 text-blue-300" />
          )}
        </div>

        <div className="text-center md:text-left">
          <label htmlFor="logoUpload" className="block mb-2">
            Upload Clinic’s Logo
          </label>
          <input
            id="logoUpload"
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
            className="hidden"
          />
          <label
            htmlFor="logoUpload"
            className="cursor-pointer bg-primary text-white px-4 py-2 rounded inline-block"
          >
            Choose Logo
          </label>

          {selectedLogo && typeof selectedLogo === "object" && (
            <p className="text-sm text-gray-500 mt-1">{selectedLogo.name}</p>
          )}
        </div>
      </div>
      {errors?.clinicLogo && (
        <p className="text-red-500 text-sm mb-0">Please select an image!</p>
      )}

      {/* Color Picker */}
      <div className="mt-6">
        <label
          htmlFor="primaryColorSelection"
          className="font-semibold mb-1 block"
        >
          Pick your primary color
        </label>
        <div className="flex gap-4">
          <Controller
            id="primaryColorSelection"
            name="clinicPrimaryColor"
            control={control}
            defaultValue="#0190CC"
            render={({ field }) => (
              <div className="p-2 border rounded inline-block">
                <HexColorPicker {...field} color={field.value} />
              </div>
            )}
          />
          <div
            className="mt-2 w-18 h-18 rounded border"
            style={{ backgroundColor: selectedColor }}
          />
        </div>
      </div>

      {/* Tagline */}
      <div>
        <textarea
          {...register("clinicTagline")}
          placeholder="Clinic Tagline / Description"
          className="w-full border p-3 rounded resize-none"
          rows={5}
        />
        {errors.clinicTagline && (
          <p className="text-red-500 text-sm">Please enter a tag line!</p>
        )}
      </div>
    </div>
  );
}
