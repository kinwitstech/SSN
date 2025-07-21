import { Trans, useTranslation } from "react-i18next";

import doctorImage from "../../assets/doctorImage.jpg";
import ssnLogo from "../../assets/ssn-logo.png";
import Button from "../../components/Button";

const LandingPage = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-white flex-center flex-col px-4 py-8 text-center">
      <img
        src={ssnLogo || ""}
        alt={t("ssnLogo")}
        className="w-20 h-auto mb-6 object-contain"
        loading="lazy"
      />
      <img
        src={doctorImage || ""}
        srcSet={`${doctorImage} 1x, ${doctorImage} 2x`}
        alt={t("doctor")}
        className="w-full max-w-md h-auto mb-6 object-contain"
        loading="lazy"
      />

      <div className="mb-4">
        <h1 className="mb-3">
          <Trans i18nKey="affordableCareAnywhere" components={{ br: <br /> }} />
        </h1>
        <p className="mb-6 max-w-sm text-textSecondary">
          {t("builtForClinicsAndDoctorsToBringQuality")}
        </p>
      </div>

      <div className="w-full max-w-sm space-y-5">
        <Button text={t("signIn")} to="/login" />
        <Button
          text={t("registerClinic")}
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
