import React, { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";

const QrScanner = ({ onScanSuccess, onScanFailure }) => {
  const qrCodeRegionId = "html5qr-code-full-region";
  const html5QrCodeRef = useRef(null);
  const isScanningRef = useRef(false);

  useEffect(() => {
    html5QrCodeRef.current = new Html5Qrcode(qrCodeRegionId);

    const config = {
      fps: 10,
      qrbox: { width: 250, height: 250 },
    };

    const startScanner = async () => {
      try {
        const devices = await Html5Qrcode.getCameras();
        if (devices && devices.length) {
          const cameraId = devices[0].id;
          await html5QrCodeRef.current.start(
            cameraId,
            config,
            (decodedText) => onScanSuccess?.(decodedText),
            (errorMessage) => onScanFailure?.(errorMessage)
          );
          isScanningRef.current = true;
        } else {
          console.warn("No camera devices found");
        }
      } catch (err) {
        console.error("Camera start failed", err);
      }
    };

    startScanner();

    return () => {
      // Only stop if it’s actually running
      if (html5QrCodeRef.current && isScanningRef.current) {
        html5QrCodeRef.current
          .stop()
          .then(() => {
            html5QrCodeRef.current.clear();
            isScanningRef.current = false;
          })
          .catch((err) => {
            console.warn("Stop failed:", err);
          });
      }
    };
  }, [onScanSuccess, onScanFailure]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div id={qrCodeRegionId} />
    </div>
  );
};

export default QrScanner;
