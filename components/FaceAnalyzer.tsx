"use client";

import { useState, useRef, useEffect } from "react";
import { useCart } from "@/app/context/CartContext";
import { analyzeFaceGeometry } from "@/app/utils/faceLogic";
import { PRODUCTS } from "@/app/utils/faceDatabase";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Check,
  Sparkles,
  Palette,
  Scissors,
  Lightbulb,
  Loader2,
  Camera,
  RefreshCw,
} from "lucide-react";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

export default function FaceAnalyzer() {
  const { addToCart } = useCart();

  // --- State های دوربین و هوش مصنوعی ---
  const videoRef = useRef<HTMLVideoElement>(null);
  const [landmarker, setLandmarker] = useState<FaceLandmarker | null>(null);
  const [webcamRunning, setWebcamRunning] = useState(false);
  const [landmarks, setLandmarks] = useState<any[]>([]);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // --- State های تحلیل و UI ---
  const [result, setResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [addedId, setAddedId] = useState<string | null>(null);

  // 1️⃣ لود کردن مدل هوش مصنوعی در شروع کار
  useEffect(() => {
    const loadModel = async () => {
      try {
        const filesetResolver = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
        );
        const faceLandmarker = await FaceLandmarker.createFromOptions(
          filesetResolver,
          {
            baseOptions: {
              modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
              delegate: "GPU",
            },
            outputFaceBlendshapes: true,
            runningMode: "VIDEO",
            numFaces: 1,
          }
        );
        setLandmarker(faceLandmarker);
      } catch (err) {
        console.error("خطا در لود مدل:", err);
        setCameraError("خطا در بارگذاری هوش مصنوعی. لطفاً صفحه را رفرش کنید.");
      }
    };
    loadModel();
  }, []);

  // 2️⃣ فعال‌سازی وبکم
  const enableCam = async () => {
    if (!landmarker) return;

    if (webcamRunning) {
      setWebcamRunning(false);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.addEventListener("loadeddata", predictWebcam);
        setWebcamRunning(true);
        setCameraError(null);
      }
    } catch (err) {
      setCameraError("دسترسی به دوربین مسدود است. لطفاً دسترسی را فعال کنید.");
    }
  };

  // 3️⃣ حلقه تشخیص چهره (Loop)
  const predictWebcam = async () => {
    if (videoRef.current && landmarker) {
      const startTimeMs = performance.now();
      const detections = landmarker.detectForVideo(
        videoRef.current,
        startTimeMs
      );

      if (detections.faceLandmarks && detections.faceLandmarks.length > 0) {
        setLandmarks(detections.faceLandmarks[0]);
      } else {
        setLandmarks([]); // صورتی پیدا نشد
      }

      if (webcamRunning) {
        requestAnimationFrame(predictWebcam);
      }
    }
  };

  // 4️⃣ شروع فرآیند تحلیل (وقتی دکمه زده می‌شود)
  const captureAndAnalyze = () => {
    if (landmarks.length === 0) {
      alert("صورتی تشخیص داده نشد! لطفاً روبروی دوربین قرار بگیرید.");
      return;
    }

    setIsAnalyzing(true);
    setWebcamRunning(false); // توقف دوربین برای صرفه‌جویی در منابع

    // شبیه‌سازی پردازش هوشمند
    setTimeout(() => {
      const data = analyzeFaceGeometry(landmarks);
      setResult(data);
      setIsAnalyzing(false);
    }, 2500);
  };

  const handleReset = () => {
    setResult(null);
    setLandmarks([]);
    enableCam(); // روشن کردن دوباره دوربین
  };

  const handleAddToCart = (prodId: string) => {
    const product = PRODUCTS.find((p) => p.id === prodId);
    if (product) {
      addToCart(product);
      setAddedId(prodId);
      setTimeout(() => setAddedId(null), 2000);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 relative z-10 min-h-[600px]">
      <AnimatePresence mode="wait">
        {/* --- مرحله ۱: دوربین و اسکن --- */}
        {!result && !isAnalyzing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-8"
          >
            <div className="relative w-full max-w-2xl aspect-video bg-black/50 rounded-[3rem] overflow-hidden border-2 border-white/10 shadow-2xl">
              {!webcamRunning && !landmarker && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 gap-4">
                  <Loader2 className="animate-spin" size={40} />
                  <p>در حال آماده‌سازی مغز هوش مصنوعی...</p>
                </div>
              )}

              {!webcamRunning && landmarker && !cameraError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
                  <Sparkles
                    size={60}
                    className="text-brand-gold animate-pulse"
                  />
                  <button
                    onClick={enableCam}
                    className="bg-brand-gold text-black px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:scale-105 transition-transform"
                  >
                    <Camera size={24} /> فعال‌سازی دوربین
                  </button>
                  <p className="text-gray-400 text-sm">
                    برای آنالیز دقیق، لطفاً در محیط روشن باشید
                  </p>
                </div>
              )}

              {cameraError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-red-400 gap-4 p-4 text-center">
                  <p>{cameraError}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="underline"
                  >
                    تلاش مجدد
                  </button>
                </div>
              )}

              <video
                ref={videoRef}
                autoPlay
                playsInline
                className={`w-full h-full object-cover transform scale-x-[-1] ${
                  !webcamRunning ? "hidden" : ""
                }`}
              />

              {/* ماسک راهنما روی دوربین */}
              {webcamRunning && (
                <div className="absolute inset-0 pointer-events-none border-[20px] border-black/30 rounded-[3rem]">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[280px] border-2 border-white/20 rounded-[50%] opacity-50"></div>
                  {landmarks.length > 0 && (
                    <div className="absolute top-4 right-4 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2 border border-green-500/30">
                      <Check size={12} /> چهره شناسایی شد
                    </div>
                  )}
                </div>
              )}
            </div>

            {webcamRunning && (
              <button
                onClick={captureAndAnalyze}
                disabled={landmarks.length === 0}
                className="w-full max-w-md py-6 bg-brand-gold text-black rounded-[2rem] font-black text-xl hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {landmarks.length > 0 ? (
                  <>
                    <Sparkles /> ثبت و آنالیز چهره
                  </>
                ) : (
                  "چهره خود را در کادر قرار دهید..."
                )}
              </button>
            )}
          </motion.div>
        )}

        {/* --- مرحله ۲: لودینگ --- */}
        {isAnalyzing && (
          <motion.div key="loading" className="py-32 text-center space-y-8">
            <div className="relative w-32 h-32 mx-auto">
              <div className="absolute inset-0 border-4 border-brand-gold/30 rounded-full animate-ping"></div>
              <div className="absolute inset-0 border-4 border-brand-gold border-t-transparent rounded-full animate-spin"></div>
              <Sparkles
                className="absolute inset-0 m-auto text-brand-gold"
                size={40}
              />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white">
                در حال پردازش هندسه صورت...
              </h3>
              <p className="text-gray-500 font-mono text-sm uppercase tracking-widest">
                Analyzing Golden Ratio
              </p>
            </div>
          </motion.div>
        )}

        {/* --- مرحله ۳: نتایج --- */}
        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            <div className="lg:col-span-2 space-y-6">
              <div className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] backdrop-blur-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Sparkles size={100} />
                </div>
                <h3 className="text-4xl font-black text-white mb-4">
                  فرم چهره:{" "}
                  <span className="text-brand-gold uppercase">
                    {result.title}
                  </span>
                </h3>
                <p className="text-gray-400 leading-loose text-lg">
                  {result.description}
                </p>
                <button
                  onClick={handleReset}
                  className="mt-6 flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors"
                >
                  <RefreshCw size={16} /> اسکن مجدد
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-black/40 rounded-[2rem] border border-white/5 hover:border-brand-gold/30 transition-colors">
                  <div className="flex items-center gap-3 text-brand-gold mb-4">
                    <Lightbulb size={20} />{" "}
                    <span className="font-bold text-sm uppercase">
                      توصیه استایلیست
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 mb-3 leading-relaxed">
                    💄 <span className="text-white font-bold">میکاپ:</span>{" "}
                    {result.makeup}
                  </p>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    ✂️ <span className="text-white font-bold">مو:</span>{" "}
                    {result.hair}
                  </p>
                </div>

                <div className="p-6 bg-black/40 rounded-[2rem] border border-white/5 hover:border-brand-gold/30 transition-colors">
                  <div className="flex items-center gap-3 text-brand-gold mb-4">
                    <Palette size={20} />{" "}
                    <span className="font-bold text-sm uppercase">
                      پالت رنگی اختصاصی
                    </span>
                  </div>
                  <div className="flex gap-4 justify-center">
                    {result.palette.map((c: string) => (
                      <div key={c} className="group relative">
                        <div
                          style={{ backgroundColor: c }}
                          className="w-12 h-12 rounded-full border-2 border-white/10 shadow-lg transform group-hover:scale-110 transition-transform cursor-help"
                        />
                        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity uppercase">
                          {c}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <a
                href={result.service.link}
                className="block p-8 bg-brand-gold text-black rounded-[2rem] hover:bg-white transition-all group shadow-[0_20px_40px_rgba(198,168,124,0.15)] relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none"></div>
                <div className="flex justify-between items-center mb-4 relative z-10">
                  <span className="text-[10px] font-black uppercase opacity-60 tracking-[0.2em] text-black">
                    Service Match
                  </span>
                  <Scissors size={24} />
                </div>
                <h4 className="text-2xl font-black mb-2 relative z-10">
                  {result.service.name}
                </h4>
                <div className="flex items-center gap-2 mt-4 relative z-10 group-hover:gap-4 transition-all">
                  <span className="text-xs font-bold uppercase">رزرو نوبت</span>
                  <Check size={16} />
                </div>
              </a>

              <div className="p-6 bg-white/5 border border-white/10 rounded-[2.5rem]">
                <div className="flex items-center gap-2 mb-6 opacity-50">
                  <ShoppingBag size={18} />{" "}
                  <span className="text-xs font-bold uppercase tracking-widest">
                    محصول مکمل شما
                  </span>
                </div>
                {(() => {
                  const product = PRODUCTS.find(
                    (p) => p.id === result.productId
                  );
                  if (!product) return null;
                  return (
                    <div className="space-y-6">
                      <div className="flex gap-4 items-center">
                        <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center overflow-hidden border border-white/5">
                          <img
                            src={product.image}
                            className="w-full h-full object-cover"
                            alt={product.name}
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-base mb-1">
                            {product.name}
                          </h4>
                          <p className="text-brand-gold font-mono">
                            {product.price.toLocaleString()} تومان
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleAddToCart(product.id)}
                        className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${
                          addedId === product.id
                            ? "bg-green-600 text-white scale-95"
                            : "bg-white text-black hover:bg-brand-gold hover:scale-105"
                        }`}
                      >
                        {addedId === product.id ? (
                          <>
                            <Check size={20} /> به سبد اضافه شد
                          </>
                        ) : (
                          <>
                            <ShoppingBag size={20} /> افزودن به سبد خرید
                          </>
                        )}
                      </button>
                    </div>
                  );
                })()}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
