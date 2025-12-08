"use client";

import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { FilesetResolver, FaceLandmarker } from "@mediapipe/tasks-vision";
import { detectFaceShape } from "@/app/utils/faceLogic";
import { X, Camera, RefreshCw, Sparkles, ScanFace, ArrowDown } from "lucide-react";
import Image from "next/image";

export default function FaceAnalyzer({ onClose }: { onClose: () => void }) {
  const webcamRef = useRef<Webcam>(null);
  const [faceLandmarker, setFaceLandmarker] = useState<FaceLandmarker | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    const loadModel = async () => {
      const filesetResolver = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
      );
      const landmarker = await FaceLandmarker.createFromOptions(filesetResolver, {
        baseOptions: {
          modelAssetPath: "/models/face_landmarker.task",
          delegate: "GPU",
        },
        runningMode: "IMAGE",
        numFaces: 1,
      });
      setFaceLandmarker(landmarker);
    };
    loadModel();
  }, []);

  const captureAndAnalyze = () => {
    if (!webcamRef.current || !faceLandmarker) return;
    setAnalyzing(true);
    let count = 3;
    setCountdown(count);
    const timer = setInterval(() => {
      count--;
      setCountdown(count);
      if (count === 0) {
        clearInterval(timer);
        processImage();
      }
    }, 1000);
  };

  const processImage = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc && faceLandmarker) {
      const image = new window.Image();
      image.src = imageSrc;
      image.onload = () => {
        const detection = faceLandmarker.detect(image);
        if (detection.faceLandmarks.length > 0) {
          const shapeData = detectFaceShape(detection.faceLandmarks[0]);
          setResult({ ...shapeData, image: imageSrc });
        } else {
          alert("صورتی پیدا نشد! لطفاً نور را چک کنید.");
        }
        setAnalyzing(false);
        setCountdown(null);
      };
    }
  };

  // ✅ فانکشن جدید: هدایت به بخش خدمات
  const handleNavigateToService = () => {
    onClose(); // بستن مودال
    // اسکرول نرم به بخش خدمات
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 font-sans">
      <button onClick={onClose} className="absolute top-6 right-6 text-white/60 hover:text-white z-50">
        <X size={32} />
      </button>

      <div className="w-full max-w-lg bg-[#111] rounded-[2rem] overflow-hidden border border-white/10 relative shadow-2xl">
        
        {!result ? (
          /* --- حالت دوربین (تم کلاسیک) --- */
          <div className="relative">
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="w-full h-[60vh] object-cover filter brightness-110"
              mirrored
            />
            {/* قاب راهنما ساده */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-80 border-2 border-white/30 rounded-[50%] border-dashed opacity-50"></div>
              <p className="absolute top-10 text-white/70 text-sm bg-black/50 px-3 py-1 rounded-full">
                صورت خود را در قاب قرار دهید
              </p>
            </div>

            {countdown !== null && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-20">
                <span className="text-9xl font-black text-brand-gold animate-ping">{countdown}</span>
              </div>
            )}

            <div className="absolute bottom-8 left-0 w-full flex justify-center z-10">
              <button
                onClick={captureAndAnalyze}
                disabled={!faceLandmarker || analyzing}
                className="flex items-center gap-3 bg-brand-gold text-black px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform disabled:opacity-50"
              >
                {analyzing ? "در حال پردازش..." : <><Camera size={24} /> اسکن چهره</>}
              </button>
            </div>
          </div>
        ) : (
          /* --- حالت نتیجه (تم کلاسیک + دکمه جدید) --- */
          <div className="p-8 text-center">
            <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-2 border-brand-gold shadow-lg">
              <img src={result.image} alt="User" className="object-cover w-full h-full" />
            </div>
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-brand-gold text-xs font-bold tracking-widest uppercase mb-4">
              <ScanFace size={14} /> AI Analysis
            </div>
            
            <h2 className="text-3xl font-black text-white mb-2">{result.shape}</h2>
            <p className="text-gray-400 mb-8 font-light text-sm">{result.desc}</p>

            <div className="bg-white/5 rounded-2xl p-6 mb-8 text-left border border-white/5">
              <h4 className="text-white font-bold mb-4 flex items-center gap-2 text-sm">
                <Sparkles size={16} className="text-brand-gold"/> 
                مدل‌های پیشنهادی:
              </h4>
              <ul className="space-y-3">
                {result.styles.map((style: string, idx: number) => (
                  <li key={idx} className="text-gray-300 text-sm flex items-center gap-3 bg-black/20 p-2 rounded-lg">
                    <span className="w-1.5 h-1.5 bg-brand-gold rounded-full"></span>
                    {style}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              {/* ✅ دکمه جدید با کارایی هدایت به خدمات */}
              <button 
                onClick={handleNavigateToService}
                className="w-full bg-brand-gold text-black py-4 rounded-xl font-bold hover:bg-white transition-colors flex items-center justify-center gap-2 group text-sm"
              >
                مشاهده خدمات مناسب من
                <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform" />
              </button>

              <button 
                onClick={() => setResult(null)} 
                className="w-full flex items-center justify-center gap-2 border border-white/20 text-gray-400 py-3 rounded-xl hover:bg-white/10 hover:text-white transition-colors text-sm"
              >
                <RefreshCw size={16} /> اسکن مجدد
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}