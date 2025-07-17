import React from "react";
import { useFormContext } from "react-hook-form";
import Input from "../../../components/InputField";
import Textarea from "../../../components/TextareaField";

const ClinicDetails = () => {
  const { register, formState } = useFormContext();

  const services = ["Lab Work", "Medical Dispensary"];

  return (
    <div className="px-4 py-6">
      {/* --- Header --- */}
      <h2 className="text-2xl font-bold text-textPrimary mb-1">Clinic Details</h2>
      <p className="text-base text-textHint mb-6">
        Let’s start by setting up your clinic’s information
      </p>

      <div className="space-y-4">
        {/* --- Input Fields --- */}
        <Input
          name="clinicName"
          placeholder="Name of the Clinic*"
          register={register}
          formState={formState}
        />
        <Input
          name="adminName"
          placeholder="Admin’s Name*"
          register={register}
          formState={formState}
        />
        <Input
          name="email"
          type="email"
          placeholder="Email Address*"
          register={register}
          formState={formState}
        />
        <Input
          name="phone"
          type="tel"
          placeholder="Phone Number*"
          register={register}
          formState={formState}
        />

        <Textarea
          name="clinicAddress"
          placeholder="Clinic Address*"
          register={register}
          formState={formState}
          rows={3}
        />

        {/* --- Speciality Textbox --- */}
        <Input
          name="speciality"
          placeholder="Speciality*"
          register={register}
          formState={formState}
        />

        {/* --- Consultation Fee --- */}
        <Input
          name="consultationFee"
          placeholder="Patient Consultation Fee"
          register={register}
          formState={formState}
        />

        {/* --- Certificate Upload --- */}
        <div>
          <input
            type="file"
            {...register("certificate")}
            className="w-full px-4 py-2 border border-neutral-light rounded-xl text-textHint file:bg-primary file:text-white file:rounded-md file:px-3 file:py-1"
          />
          {formState.errors.certificate && (
            <p className="text-error text-sm mt-1">
              {formState.errors.certificate.message}
            </p>
          )}
        </div>

        {/* --- Services Provided --- */}
        <div>
          <p className="font-semibold text-textSecondary mb-2">Services Provided</p>
          <div className="space-y-2">
            {services.map((service) => (
              <label key={service} className="flex items-center gap-2 text-textPrimary">
                <input
                  type="checkbox"
                  value={service}
                  {...register("servicesProvided")}
                  className="accent-primary"
                />
                {service}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicDetails;
