import { useEffect, useState } from "react";

function isIOS() {
  return (
    /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase()) &&
    !window.navigator.standalone
  );
}

function isInStandaloneMode() {
  return "standalone" in window.navigator && window.navigator.standalone;
}

const usePWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showIOSPrompt, setShowIOSPrompt] = useState(false);

  useEffect(() => {
    // Chrome/Android
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };
    window.addEventListener("beforeinstallprompt", handler);

    // iOS
    if (isIOS() && !isInStandaloneMode()) {
      setShowIOSPrompt(true);
    }

    // If already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    // After install
    window.addEventListener("appinstalled", () => setIsInstalled(true));

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const triggerInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      console.log("✅ PWA installed");
    }
    setDeferredPrompt(null);
  };

  return {
    isInstallable: isInstallable && !isInstalled,
    triggerInstall,
    showIOSPrompt,
  };
};

export default usePWAInstallPrompt;
