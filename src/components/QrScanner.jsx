// src/components/QrScanner.jsx
import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

const QrScanner = ({ onScanSuccess }) => {
  const qrRegionId = "html5qr-code-region";
  const html5QrCodeRef = useRef(null);
  const [cameras, setCameras] = useState([]);
  const [currentCamera, setCurrentCamera] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    const html5QrCode = new Html5Qrcode(qrRegionId);
    html5QrCodeRef.current = html5QrCode;

    const config = { fps: 15, qrbox: { width: 300, height: 300 } };

    const initCameras = async () => {
      try {
        const devices = await Html5Qrcode.getCameras();
        if (!devices || devices.length === 0) {
          alert("❌ No camera found on this device.");
          return;
        }
        setCameras(devices);

        // Auto-select back camera if available
        let backCam =
          devices.find((d) =>
            d.label.toLowerCase().includes("back")
          ) || devices[0];

        setCurrentCamera(backCam.id);
      } catch (err) {
        console.error("Camera init failed:", err);
        alert("Failed to access camera. Allow permissions and reload.");
      }
    };

    initCameras();

    return () => {
      stopScanner();
    };
    // eslint-disable-next-line
  }, []);

  const startScanner = async (cameraId) => {
    if (!cameraId) return;
    const html5QrCode = html5QrCodeRef.current;

    try {
      await html5QrCode.start(
        cameraId,
        { fps: 15, qrbox: { width: 300, height: 300 } },
        (decodedText) => {
          console.log("✅ QR Code:", decodedText);
          onScanSuccess(decodedText);
          stopScanner();
        },
        (error) => {}
      );
      setIsScanning(true);
    } catch (err) {
      console.error("Start failed:", err);
    }
  };

  const stopScanner = async () => {
    const html5QrCode = html5QrCodeRef.current;
    if (isScanning && html5QrCode) {
      await html5QrCode.stop().catch(() => {});
      await html5QrCode.clear().catch(() => {});
    }
    setIsScanning(false);
  };

  const toggleCamera = async () => {
    if (cameras.length < 2) return alert("Only one camera available.");

    await stopScanner();

    const currentIndex = cameras.findIndex((c) => c.id === currentCamera);
    const nextIndex = (currentIndex + 1) % cameras.length;
    const nextCamera = cameras[nextIndex];

    setCurrentCamera(nextCamera.id);
    startScanner(nextCamera.id);
  };

  useEffect(() => {
    if (currentCamera) startScanner(currentCamera);
    // eslint-disable-next-line
  }, [currentCamera]);

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

      <div className="flex items-center gap-3 mt-3">
        <p className="text-gray-500 text-sm">Align QR code inside the box</p>
        {cameras.length > 1 && (
          <button
            onClick={toggleCamera}
            className="bg-gray-700 text-white text-sm px-3 py-1 rounded hover:bg-gray-800 transition"
          >
            🔁 Switch Camera
          </button>
        )}
      </div>
    </div>
  );
};

export default QrScanner;
