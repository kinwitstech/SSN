import { SparklesIcon } from "@heroicons/react/24/solid";

import Button from "../../../components/Button";
import RegisterSuccessIcon from "@/assets/RegisterSuccessIcon.jpg";

const PatientRegisterSuccess = () => {
  return (
    <div className="flex-center animate-fade-in min-h-screen flex-col bg-white px-4 py-10">
      <img
        src={RegisterSuccessIcon}
        alt="Registration Success"
        className="mb-8 h-[239px] w-[280px]"
      />

      <h2 className="mb-4 text-center">Registration Successful</h2>
      <SparklesIcon className="text-primary mb-10 h-16 w-16" />
      <div className="w-full max-w-md">
        <Button to="/login" text="Login" className="btn-primary btn-lg" />
      </div>
    </div>
  );
};

export default PatientRegisterSuccess;
