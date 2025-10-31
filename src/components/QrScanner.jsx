import React, { useState } from "react";
import { QrReader } from "react-qr-reader";

const QrCodeScanner = () => {
  const [data, setData] = useState("No result");

  return (
    <div className="flex flex-col items-center gap-6 mt-8">
      <h2 className="text-2xl font-semibold text-gray-800">QR Code Scanner</h2>

      <div className="relative w-[320px] h-[320px] rounded-xl overflow-hidden">
        {/* QR Camera */}
        <QrReader
          constraints={{ video: { facingMode: "environment" } }}
          onResult={(result, error) => {
            if (!!result) {
              setData(result?.text);
              console.log("Scanned:", result?.text);
            }
            if (!!error) console.info(error);
          }}
          videoId="qr-video"
          style={{ width: "100%", height: "100%" }}
        />

        {/* Overlay mask */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Transparent scan box */}
        <div className="absolute inset-10 border-4 border-green-500 rounded-lg"></div>

        {/* Scanning red line */}
        <div className="absolute left-10 right-10 top-10 h-[2px] bg-red-500 animate-scan"></div>
      </div>

      <p className="text-gray-700 text-lg font-medium">
        Scanned Result: <span className="font-normal">{data}</span>
      </p>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(0); }
          100% { transform: translateY(240px); }
        }
        .animate-scan {
          animation: scan 2s linear infinite alternate;
        }
      `}</style>
    </div>
  );
};

export default QrCodeScanner;
