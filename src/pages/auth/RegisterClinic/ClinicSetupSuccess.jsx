import { CheckCircleIcon, SparklesIcon } from "@heroicons/react/24/solid";

import Button from "../../../components/Button";

const ClinicSetupSuccess = () => {
  return (
    <div className="flex-center min-h-screen flex-col bg-white px-4">
      <div className="mb-10 flex">
        <SparklesIcon className="text-primary mb-6 h-32 w-32" />
      </div>
      <div className="mb-10 flex w-full max-w-md items-start gap-3 rounded-lg bg-green-100 p-5">
        <CheckCircleIcon className="text-success mt-1 h-6 w-6" />
        <div>
          <p className="font-semibold">Clinic Setup is successful</p>
          <p className="text-sm">Login to complete full setup</p>
        </div>
      </div>
      <div className="w-full max-w-md">
        <Button to="/login" text="Login" className="btn-primary btn-lg" />
      </div>
    </div>
  );
};

export default ClinicSetupSuccess;
