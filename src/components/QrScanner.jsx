import React, { useState, useEffect, useRef } from 'react';

const QRScanner = () => {
  const [result, setResult] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState('');
  const [hasPermission, setHasPermission] = useState(false);
  
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const canvasRef = useRef(null);
  const scanIntervalRef = useRef(null);

  // Request camera permission
  const requestCameraPermission = async () => {
    try {
      setError('');
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setHasPermission(true);
        setIsScanning(true);
        
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
          startScanning();
        };
      }
    } catch (err) {
      setError('Camera access denied. Please allow camera permissions in your browser settings.');
      setHasPermission(false);
      console.error('Camera error:', err);
    }
  };

  // Start scanning for QR codes
  const startScanning = () => {
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
    }

    // Scan every 500ms
    scanIntervalRef.current = setInterval(() => {
      captureAndScan();
    }, 500);
  };

  // Capture frame and scan for QR code
  const captureAndScan = () => {
    if (!videoRef.current || !canvasRef.current || videoRef.current.readyState !== videoRef.current.HAVE_ENOUGH_DATA) {
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Set canvas size to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw current video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Get image data for QR detection
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    
    // In a real implementation, you would use a QR detection library here
    // For example with jsQR: const code = jsQR(imageData.data, imageData.width, imageData.height);
    
    // Simulated detection (replace with actual library in your project)
    detectQRCode(imageData);
  };

  // Placeholder for QR detection (replace with actual library)
  const detectQRCode = (imageData) => {
    // This is where you'd integrate a QR detection library
    // Example with jsQR:
    // import jsQR from 'jsqr';
    // const code = jsQR(imageData.data, imageData.width, imageData.height);
    // if (code) {
    //   setResult(code.data);
    //   stopScanning();
    // }
  };

  // Stop scanning and release camera
  const stopScanning = () => {
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setIsScanning(false);
    setHasPermission(false);
  };

  // Reset scanner to initial state
  const resetScanner = () => {
    setResult('');
    setError('');
  };

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
            QR Code Scanner
          </h1>

          {/* Initial State - Not Scanning */}
          {!isScanning && !result && (
            <div className="space-y-4">
              <div className="bg-indigo-50 border-2 border-indigo-200 rounded-xl p-8 text-center">
                <svg className="w-24 h-24 mx-auto mb-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
                <p className="text-gray-600 mb-4">Ready to scan QR codes</p>
              </div>
              
              <button
                onClick={requestCameraPermission}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md"
              >
                Start Scanning
              </button>

              {error && (
                <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}
            </div>
          )}

          {/* Scanning State */}
          {isScanning && !result && (
            <div className="space-y-4">
              <div className="relative rounded-xl overflow-hidden shadow-lg border-4 border-indigo-500 bg-black">
                <video
                  ref={videoRef}
                  className="w-full h-auto"
                  playsInline
                  autoPlay
                  muted
                />
                <canvas ref={canvasRef} className="hidden" />
                
                {/* Scanning overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-0 border-2 border-white opacity-50 m-12"></div>
                  <div className="absolute top-12 left-12 w-8 h-8 border-t-4 border-l-4 border-white"></div>
                  <div className="absolute top-12 right-12 w-8 h-8 border-t-4 border-r-4 border-white"></div>
                  <div className="absolute bottom-12 left-12 w-8 h-8 border-b-4 border-l-4 border-white"></div>
                  <div className="absolute bottom-12 right-12 w-8 h-8 border-b-4 border-r-4 border-white"></div>
                </div>

                {/* Scanning animation */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-3/4 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent animate-pulse"></div>
                </div>
              </div>
              
              <p className="text-center text-gray-600 font-medium">
                Position the QR code within the frame
              </p>
              
              <button
                onClick={stopScanning}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md"
              >
                Stop Scanning
              </button>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-sm">
                  <strong>📱 Note:</strong> For full QR code detection, install a library like <code className="bg-blue-100 px-1 rounded">jsqr</code> or <code className="bg-blue-100 px-1 rounded">html5-qrcode</code>
                </p>
              </div>
            </div>
          )}

          {/* Result State */}
          {result && (
            <div className="space-y-6">
              <div className="bg-green-50 border-2 border-green-500 rounded-xl p-6">
                <div className="flex items-center justify-center mb-4">
                  <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-green-800 mb-3 text-center">
                  Scan Successful!
                </h2>
                <div className="bg-white rounded-lg p-4 break-all">
                  <p className="text-gray-800 font-mono text-sm">{result}</p>
                </div>
              </div>
              
              <button
                onClick={resetScanner}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md"
              >
                Scan Another QR Code
              </button>
            </div>
          )}
        </div>

     
      </div>
    </div>
  );
};

export default QRScanner;