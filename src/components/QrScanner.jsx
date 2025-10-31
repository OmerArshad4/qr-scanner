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
      fps: 15,
      qrbox: { width: 300, height: 300 },
    };

    const startScanner = async () => {
      try {
        const devices = await Html5Qrcode.getCameras();

        if (!devices || devices.length === 0) {
          alert("❌ No camera found on this device.");
          return;
        }

        // 🪄 Try to find the back camera
        let backCamera = devices.find(
          (device) =>
            device.label.toLowerCase().includes("back") ||
            device.label.toLowerCase().includes("rear")
        );

        const cameraId = backCamera ? backCamera.id : devices[0].id;

        console.log("🎥 Using camera:", backCamera ? "Back" : "Front");

        await html5QrCode.start(
          cameraId,
          config,
          (decodedText) => {
            console.log("✅ QR Code detected:", decodedText);
            onScanSuccess(decodedText);

            // Stop scanning after successful detection
            html5QrCode.stop().then(() => html5QrCode.clear());
          },
          (error) => {
            // Continuous errors — safe to ignore
          }
        );
      } catch (err) {
        console.error("Camera start failed:", err);
        alert("Camera access failed. Please allow camera permissions.");
      }
    };

    startScanner();

    // Cleanup
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
