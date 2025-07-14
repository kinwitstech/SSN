import { CheckCircleIcon, SparklesIcon } from "@heroicons/react/24/solid";
import Button from "../../../components/Button";

const ClinicSetupSuccess = () => {
  return (
    <div className="min-h-screen flex-center flex-col px-4 bg-white">
      <div className="flex mb-10">
        <SparklesIcon className="w-32 h-32 text-primary mb-6" />
      </div>
      <div className="bg-green-100 text-gray-700 rounded-lg p-5 w-full max-w-md flex items-start gap-3 mb-10">
        <CheckCircleIcon className="h-6 w-6 text-green-500 mt-1" />
        <div>
          <p className="font-semibold">Clinic Setup is successful</p>
          <p className="text-sm">Login to complete full setup</p>
        </div>
      </div>
      <div className="w-full max-w-md">
        <Button to="/login" text="Login" />
      </div>
    </div>
  );
};

export default ClinicSetupSuccess;
