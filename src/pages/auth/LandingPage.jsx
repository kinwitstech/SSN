import { Trans, useTranslation } from "react-i18next";

import doctorImage from "../../assets/doctorImage.jpg";
import ssnLogo from "../../assets/ssn-logo.png";
import Button from "../../components/Button";

const LandingPage = () => {
  const { t } = useTranslation();

  return (
    <div className="flex-center min-h-screen flex-col px-4 py-8 text-center">
      <img
        src={ssnLogo || ""}
        alt={t("ssnLogo")}
        className="mb-6 h-auto w-20 object-contain"
        loading="lazy"
      />
      <img
        src={doctorImage || ""}
        srcSet={`${doctorImage} 1x, ${doctorImage} 2x`}
        alt={t("doctor")}
        className="mb-6 h-auto w-full max-w-md object-contain"
        loading="lazy"
      />

      <div className="mb-4">
        <h1 className="mb-3">
          <Trans i18nKey="affordableCareAnywhere" components={{ br: <br /> }} />
        </h1>
        <p className="text-textSecondary mb-6 max-w-sm">
          {t("builtForClinicsAndDoctorsToBringQuality")}
        </p>
      </div>

      <div className="w-full max-w-sm space-y-5">
        <Button text={t("signIn")} to="/login" />
        <Button
          text={t("registerClinic")}
          variant="outline"
          to="/registerClinic"
        />
      </div>
    </div>
  );
};

export default LandingPage;
