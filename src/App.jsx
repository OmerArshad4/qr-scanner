// src/App.jsx
import React, { useState } from "react";
import QrScanner from "./components/QrScanner";

function App() {
  const [scannedData, setScannedData] = useState("");

  // When QR is successfully scanned
  const handleScanSuccess = (decodedText) => {
    console.log("Scanned result:", decodedText);
    setScannedData(decodedText);
  };

  // Optional: When scan fails (e.g. not detected)
  const handleScanFailure = (error) => {
    // console.warn("Scan failed:", error);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-2xl font-semibold mb-4">QR Code Scanner</h1>

      {/* QR Scanner component */}
      <QrScanner
        onScanSuccess={handleScanSuccess}
        onScanFailure={handleScanFailure}
      />

      {/* Show scanned result */}
      {scannedData && (
        <p className="mt-6 text-green-600 font-medium">
          ✅ Scanned Data: {scannedData}
        </p>
      )}
    </div>
  );
}
 

export default App;
