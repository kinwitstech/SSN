import usePWAInstallPrompt from "../hooks/usePWAInstall";
import Button from "../components/Button";

const InstallBanner = () => {
  const { isInstallable, triggerInstall, showIOSPrompt } =
    usePWAInstallPrompt();

  return (
    <div className="fixed bottom-4 inset-x-4 z-50">
      {isInstallable && (
        <div className="bg-blue-100 border border-blue-300 p-4 rounded-md shadow">
          <p className="mb-2 font-semibold">Install this app?</p>
          <Button onClick={() => triggerInstall()} text="Install App" />
        </div>
      )}

      {showIOSPrompt && (
        <div className="bg-yellow-100 border border-yellow-300 p-4 rounded-md shadow">
          <p className="text-sm">
            📱 On iOS, tap <strong>Share</strong> and then{" "}
            <strong>Add to Home Screen</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default InstallBanner;
