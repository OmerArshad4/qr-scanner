// src/components/QrScanner.jsx
import React, { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";

const QrScanner = ({ onScanSuccess }) => {
  const qrRegionId = "html5qr-code-region";
  const html5QrCodeRef = useRef(null);

  useEffect(() => {
    const html5QrCode = new Html5Qrcode(qrRegionId);
    html5QrCodeRef.current = html5QrCode;

    const config = {
      fps: 15, // process 15 frames per second
      qrbox: { width: 300, height: 300 }, // scanning region
      aspectRatio: 1.0,
    };

    const startScanner = async () => {
      try {
        const devices = await Html5Qrcode.getCameras();

        if (!devices || !devices.length) {
          alert("❌ No camera found on this device.");
          return;
        }

        const cameraId = devices[0].id; // back camera (or first available)

        await html5QrCode.start(
          cameraId,
          config,
          (decodedText) => {
            console.log("✅ QR Code detected:", decodedText);
            onScanSuccess(decodedText);

            // Stop scanning automatically after detection
            html5QrCode.stop().then(() => {
              html5QrCode.clear();
            });
          },
          (error) => {
            // Continuous detection errors happen often — safe to ignore
            // console.warn("Scan error:", error);
          }
        );
      } catch (err) {
        console.error("Failed to start scanning:", err);
        alert("Camera access failed. Please allow camera permissions.");
      }
    };

    startScanner();

    // Cleanup on unmount
    return () => {
      if (html5QrCodeRef.current) {
        html5QrCodeRef.current
          .stop()
          .then(() => html5QrCodeRef.current.clear())
          .catch(() => {});
      }
    };
  }, [onScanSuccess]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        id={qrRegionId}
        style={{
          width: "340px",
          height: "340px",
          border: "3px solid #4B5563",
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "0 0 20px rgba(0,0,0,0.1)",
        }}
      ></div>
      <p className="text-gray-500 mt-3 text-sm">Align QR code inside the box</p>
    </div>
  );
};

export default QrScanner;
