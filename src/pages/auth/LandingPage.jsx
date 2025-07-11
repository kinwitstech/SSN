import doctorImage from "../../assets/doctorImage.jpg";
import ssnLogo from "../../assets/ssn-logo.png";
import Button from "../../components/Button";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-8 text-center">
      <img src={ssnLogo} alt="SSN Logo" className="w-30 h-30 mb-6" />
      <img src={doctorImage} alt="Doctor" className="w-96 h-auto mb-6" />

      <div className="mb-4">
        <h1 className="text-2xl font-bold mb-3">
          Affordable Care.
          <br />
          Anywhere.
        </h1>
        <p className="text-gray-600 text-sm mb-6 max-w-sm">
          Built for clinics and doctors to bring quality healthcare to every
          patient.
        </p>
      </div>

      <div className="w-full max-w-sm space-y-3">
        <Button text="Sign In" to="/login" />
        <Button
          text="Register Clinic"
          variant="outlined"
          to="/registerClinic"
        />
      </div>

      {/* <p className="text-sm text-gray-600 mt-6">
        New Patient?{" "}
        <Link to="/register" className="text-blue-600 hover:underline">
          Register Here
        </Link>
      </p> */}
    </div>
  );
};

export default LandingPage;
