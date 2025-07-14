import doctorImage from "../../assets/doctorImage.jpg";
import ssnLogo from "../../assets/ssn-logo.png";
import Button from "../../components/Button";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white flex-center flex-col px-4 py-8 text-center">
      <img
        src={ssnLogo || ""}
        alt="SSN Logo"
        className="w-20 h-auto mb-6 object-contain"
        loading="lazy"
      />
      <img
        src={doctorImage || ""}
        srcSet={`${doctorImage} 1x, ${doctorImage} 2x`}
        alt="Doctor"
        className="w-full max-w-md h-auto mb-6 object-contain"
        loading="lazy"
      />

      <div className="mb-4">
        <h1 className="mb-3">
          Affordable Care.
          <br />
          Anywhere.
        </h1>
        <p className="mb-6 max-w-sm">
          Built for clinics and doctors to bring quality healthcare to every
          patient.
        </p>
      </div>

      <div className="w-full max-w-sm space-y-5">
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
