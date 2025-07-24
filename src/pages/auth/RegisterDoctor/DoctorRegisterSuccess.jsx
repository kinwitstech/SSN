import { SparklesIcon } from "@heroicons/react/24/solid";

import Button from "../../../components/Button";
import RegisterSuccessIcon from "@/assets/RegisterSuccessIcon.jpg";

const DoctorRegisterSuccess = () => {
  return (
    <div className="min-h-screen bg-white flex-center flex-col px-4 py-10 animate-fade-in">
      <img
        src={RegisterSuccessIcon}
        alt="Registration Success"
        className="w-[280px] h-[239px] mb-8"
      />

      <h2 className="mb-4 text-center">Registration Successful</h2>
      <SparklesIcon className="w-16 h-16 text-primary mb-10" />
      <div className="w-full max-w-md">
        <Button to="/login" text="Login" />
      </div>
    </div>
  );
};

export default DoctorRegisterSuccess;
