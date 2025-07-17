import React from "react";
import { useFormContext } from "react-hook-form";
import Input from "../../../components/InputField";
import Textarea from "../../../components/TextareaField";

const services = ["Lab Work", "Medical Dispensary"];

const ClinicDetails = () => {
  const { register, formState } = useFormContext();

  return (
    <div className="px-4 py-6">
      {/* --- Header --- */}
      <h2 className="text-2xl font-bold mb-1">Clinic Details</h2>
      <p className="text-base text-textSecondary mb-6">
        Let’s start by setting up your clinic’s information
      </p>

      <div className="space-y-4">
        <div>
          <Input
            name="clinicName"
            label="Clinic Name*"
            placeholder="Enter your Clinic Name here"
            register={register}
            formState={formState}
          />
        </div>

        <div>
          <Input
            name="adminName"
            label="Admin Name*"
            placeholder="Enter Admin Name here"
            register={register}
            formState={formState}
          />
        </div>

        <div>
          <Input
            name="email"
            label="Email*"
            placeholder="Enter your Email ID here"
            type="email"
            register={register}
            formState={formState}
          />
        </div>

        <div>
          <Input
            name="phone"
            label="Phone*"
            placeholder="Enter your Phone Number here"
            type="tel"
            register={register}
            formState={formState}
          />
        </div>

        <div>
          <Textarea
            name="clinicAddress"
            label="Clinic Address*"
            placeholder="Enter your Clinic Address here"
            register={register}
            formState={formState}
            rows={3}
          />
        </div>

        <div>
          <Input
            name="speciality"
            label="Speciality*"
            placeholder="Enter your Speciality here"
            register={register}
            formState={formState}
          />
        </div>

        <div>
          
          <Input
            name="consultationFee"
            label="Consultation Fee*"
            placeholder="Enter the Consultation Fee here"
            register={register}
            formState={formState}
          />
        </div>

        {/* --- Certificate Upload --- */}
        <div>
          <label className="block text-textSecondary mb-1">
            Medical Registration Certificate*
          </label>
          <input
            type="file"
            {...register("certificate")}
            className="w-full px-4 py-2 border border-neutral-light rounded-xl text-textHint file:bg-primary file:text-white file:rounded-md file:px-3 file:py-1"
          />
          {formState.errors.certificate && (
            <p className="text-error text-xs mt-1">
              {formState.errors.certificate.message}
            </p>
          )}
        </div>

        {/* --- Services Provided --- */}
        <div>
          <label className="block text-textSecondary mb-1">
            Services Provided*
          </label>
          <div className="space-y-2">
            {services.map((service) => (
              <label key={service} className="flex items-center gap-2">
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
