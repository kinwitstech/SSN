import { useEffect, useState } from "react";
import usePWAInstallPrompt from "../hooks/usePWAInstall";
import Button from "../components/Button";

const InstallBanner = () => {
  const { isInstallable, triggerInstall, showIOSPrompt } =
    usePWAInstallPrompt();
  const [dismissed, setDismissed] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Detect if PWA is already installed
    const isInStandalone =
      window.matchMedia?.("(display-mode: standalone)")?.matches ||
      window.navigator.standalone;
    setIsStandalone(isInStandalone);
  }, []);

  const handleClose = () => {
    setDismissed(true);
  };

  const shouldShow =
    (isInstallable || showIOSPrompt) && !dismissed && !isStandalone;

  if (!shouldShow) return null;

  return (
    <div className="fixed bottom-4 sm:top-4 sm:right-4 left-1/2 inset-x-4 z-50 max-w-sm mx-auto opacity-95">
      <div className="relative p-4 rounded-md shadow-lg bg-white">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 h-5 w-8 text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          aria-label="Close"
        >
          ✕
        </button>

        {isInstallable && (
          <>
            <p className="mb-4 font-semibold">Install this app?</p>
            <Button onClick={triggerInstall} text="Install App" />
          </>
        )}

        {showIOSPrompt && (
          <p className="text-sm">
            📱 On iOS, tap <strong>Share</strong> and then{" "}
            <strong>Add to Home Screen</strong>
          </p>
        )}
      </div>
    </div>
  );
};

export default InstallBanner;
