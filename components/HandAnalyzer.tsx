"use client";

import { useState, useRef, useEffect } from "react";
import { HandLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Camera, Sparkles, Hand, Palette, RefreshCw, 
  Check, Loader2, Download, Scan, Fingerprint, X
} from "lucide-react";
import { analyzeHandShape, getSkinTone, NAIL_RECOMMENDATIONS, COLOR_PALETTES } from "@/app/constants/nails";
import html2canvas from "html2canvas";
import Image from "next/image";

export default function HandAnalyzer() {
  // --- Refs ---
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const resultCardRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();

  // --- States ---
  const [landmarker, setLandmarker] = useState<HandLandmarker | null>(null);
  const [webcamRunning, setWebcamRunning] = useState(false);
  const [landmarks, setLandmarks] = useState<any[]>([]);
  const [result, setResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [scanStep, setScanStep] = useState(0); 
  const [isDownloading, setIsDownloading] = useState(false);

  // 1. Load Model
  useEffect(() => {
    const loadModel = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
        );
        const handLandmarker = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: "/models/hand_landmarker.task",
            delegate: "GPU"
          },
          runningMode: "VIDEO",
          numHands: 1
        });
        setLandmarker(handLandmarker);
      } catch (err) {
        console.error("AI Load Error:", err);
      }
    };
    loadModel();
  }, []);

  // 2. Toggle Camera
  const enableCam = async () => {
    if (!landmarker) return;
    if (webcamRunning) {
      setWebcamRunning(false);
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 1280, height: 720 } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadeddata = () => {
           videoRef.current?.play();
           setWebcamRunning(true);
        };
      }
    } catch (err) {
      alert("لطفاً دسترسی به دوربین را فعال کنید.");
    }
  };

  // 3. Loop
  useEffect(() => {
    if (webcamRunning && landmarker && videoRef.current) {
       const video = videoRef.current;
       let lastVideoTime = -1;

       const renderLoop = () => {
          if (video.readyState >= 2 && video.currentTime !== lastVideoTime) {
             const startTimeMs = performance.now();
             const detection = landmarker.detectForVideo(video, startTimeMs);
             if (detection.landmarks && detection.landmarks.length > 0) {
                setLandmarks(detection.landmarks[0]);
             } else {
                setLandmarks([]);
             }
             lastVideoTime = video.currentTime;
          }
          requestRef.current = requestAnimationFrame(renderLoop);
       };
       renderLoop();
    }
    return () => { if (requestRef.current) cancelAnimationFrame(requestRef.current); };
  }, [webcamRunning, landmarker]);

  // 4. Analyze Logic (FIXED: Capture First, Animate Later) 🛠️
  const analyzeHand = () => {
    if (landmarks.length === 0) {
       alert("لطفاً دست خود را در کادر قرار دهید!");
       return;
    }

    // --- گام ۱: شکار اطلاعات قبل از خاموش شدن دوربین ---
    let capturedResult = null;

    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      
      if (ctx) {
        // عکس گرفتن از فریم فعلی
        ctx.drawImage(video, 0, 0);
        
        // محاسبات ریاضی (همین لحظه انجام میشه)
        const shapeKey = analyzeHandShape(landmarks);
        
        // محاسبات رنگ
        const x = landmarks[9].x * canvas.width;
        const y = (landmarks[9].y + 0.05) * canvas.height; 
        const toneKey = getSkinTone(ctx, x, y);

        // ذخیره نتیجه در متغیر موقت
        capturedResult = {
          shape: NAIL_RECOMMENDATIONS[shapeKey || "Petite"],
          tone: COLOR_PALETTES[toneKey || "Neutral"]
        };
      }
    }

    // اگر به هر دلیلی نتونست بخونه، یه نتیجه پیش‌فرض بده که برنامه گیر نکنه
    if (!capturedResult) {
        capturedResult = {
            shape: NAIL_RECOMMENDATIONS["Petite"],
            tone: COLOR_PALETTES["Neutral"]
        };
    }

    // --- گام ۲: شروع نمایش (Show Time) ---
    setIsAnalyzing(true);
    setWebcamRunning(false); // حالا با خیال راحت دوربین رو خاموش کن

    // تایم‌لاین انیمیشن‌ها
    setTimeout(() => setScanStep(1), 1000); 
    setTimeout(() => setScanStep(2), 2500); 
    setTimeout(() => setScanStep(3), 4000); 

    // --- گام ۳: نمایش نهایی نتیجه ---
    setTimeout(() => {
      setResult(capturedResult); // نتیجه‌ای که اون بالا گرفتیم رو ست کن
      setIsAnalyzing(false);
      setScanStep(0);
    }, 5500);
  };

  // 5. Download Logic
  const handleDownload = async () => {
    if (!resultCardRef.current) return;
    setIsDownloading(true);
    try {
      const element = resultCardRef.current;
      element.style.display = 'flex';
      element.style.position = 'fixed';
      element.style.zIndex = '-9999';
      
      const canvas = await html2canvas(element, { 
         scale: 2, 
         backgroundColor: '#050505',
         useCORS: true 
      });
      
      element.style.display = 'none';

      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/jpeg", 0.9);
      link.download = `Ayneh-Nails-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.error(e);
    } finally {
      setIsDownloading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setLandmarks([]);
    setWebcamRunning(false);
    enableCam();
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <canvas ref={canvasRef} className="hidden" />

      {/* --- 🌟 کارت دانلود مخفی (Hidden Luxury Card) 🌟 --- */}
      {result && (
        <div ref={resultCardRef} className="w-[1080px] h-[1920px] bg-[#050505] hidden flex-col relative border-[40px] border-[#C6A87C] font-sans" dir="rtl">
           <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-10"></div>
           <div className="absolute top-0 right-0 w-[900px] h-[900px] bg-gradient-to-b from-[#C6A87C]/10 to-transparent rounded-full blur-[150px] -mr-40 -mt-40"></div>
           
           <div className="p-16 flex justify-between items-end border-b border-[#C6A87C]/20 relative z-10">
              <div className="text-right">
                 <h1 className="text-9xl font-black text-[#C6A87C] font-serif tracking-tighter">آینه</h1>
                 <p className="text-4xl text-gray-400 tracking-[0.4em] mt-6 uppercase">NAIL STUDIO</p>
              </div>
              <div className="text-left opacity-60" dir="ltr">
                 <p className="text-3xl font-mono text-white">REF: {Math.floor(Math.random()*9999)}</p>
                 <p className="text-2xl mt-2 text-gray-400">AI ANALYSIS</p>
              </div>
           </div>

           <div className="flex-1 flex flex-col items-center justify-center text-center space-y-20 p-16 relative z-10">
              <div className="relative">
                 <div className="w-[400px] h-[400px] rounded-full border-[6px] border-[#C6A87C] flex items-center justify-center bg-[#0a0a0a] shadow-[0_0_150px_rgba(198,168,124,0.4)]">
                    <span className="text-[12rem]">{result.shape.icon}</span>
                 </div>
                 <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-[#C6A87C] text-black px-10 py-4 rounded-full text-3xl font-black uppercase tracking-widest whitespace-nowrap">
                    {result.shape.shape}
                 </div>
              </div>

              <div>
                 <p className="text-4xl text-[#C6A87C] font-bold uppercase tracking-[0.3em] mb-8">فرم دست و استایل شما</p>
                 <h2 className="text-7xl font-black text-white leading-tight max-w-4xl mx-auto">
                    {result.shape.title}
                 </h2>
                 <p className="text-4xl text-gray-400 font-light mt-10 max-w-4xl mx-auto leading-relaxed">
                    {result.shape.desc}
                 </p>
              </div>

              <div className="w-full bg-white/5 rounded-[4rem] p-12 border border-white/10 mt-10">
                 <p className="text-3xl text-gray-500 mb-10 uppercase tracking-widest text-center">پالت پیشنهادی پوست {result.tone.title}</p>
                 <div className="flex justify-center gap-8">
                    {result.tone.colors.map((c: string, i: number) => (
                       <div key={i} className="flex flex-col items-center gap-4">
                          <div className="w-32 h-40 rounded-[2rem] shadow-2xl border-4 border-white/10 relative overflow-hidden" style={{backgroundColor: c}}>
                             <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent"></div>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        
        {/* --- 1. حالت دوربین و استندبای --- */}
        {!result && !isAnalyzing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full max-w-4xl flex flex-col items-center gap-10">
            
            <div className="text-center space-y-4">
               <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#C6A87C] via-white to-[#C6A87C] font-serif">
                  استودیو ناخن هوشمند
               </h1>
               <p className="text-gray-400 text-lg font-light tracking-wide">
                  پیشنهاد فرم و رنگ لاک، متناسب با آناتومی دست شما
               </p>
            </div>

            <div className="relative w-full aspect-[3/4] md:aspect-video bg-[#111] rounded-[3rem] overflow-hidden border-2 border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.6)] group">
              {!webcamRunning && (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-[url('/images/grid.png')] bg-cover opacity-80 backdrop-blur-sm">
                  <div className="w-32 h-32 border-2 border-[#C6A87C] rounded-full flex items-center justify-center mb-8 relative">
                     <div className="absolute inset-0 rounded-full border-2 border-dashed border-white/20 animate-spin-slow"></div>
                     <Hand size={48} className="text-[#C6A87C]" />
                  </div>
                  <button onClick={enableCam} className="bg-white text-black px-10 py-4 rounded-full font-bold text-lg hover:bg-[#C6A87C] transition-all flex items-center gap-3 shadow-xl hover:shadow-[0_0_30px_rgba(198,168,124,0.5)]">
                    <Camera size={22} /> روشن کردن دوربین
                  </button>
                </div>
              )}
              
              <video ref={videoRef} autoPlay playsInline muted className={`w-full h-full object-cover transform scale-x-[-1] transition-all duration-700 ${!webcamRunning ? "opacity-0 scale-110" : "opacity-100 scale-100"}`} />
              
              {/* ماسک راهنمای دست */}
              {webcamRunning && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                   {/* کادر دست */}
                   <div className={`w-[280px] h-[400px] border-2 rounded-[3rem] transition-colors duration-300 relative ${landmarks.length > 0 ? "border-green-500/50 shadow-[0_0_50px_rgba(34,197,94,0.2)]" : "border-white/20 border-dashed"}`}>
                      
                      {/* خط اسکنر */}
                      {landmarks.length > 0 && (
                         <motion.div 
                            initial={{ top: "0%" }} animate={{ top: "100%" }} 
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            className="absolute left-0 right-0 h-[2px] bg-green-400 shadow-[0_0_20px_#4ade80]"
                         />
                      )}

                      {/* بج وضعیت */}
                      <div className={`absolute -bottom-14 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full border backdrop-blur-md flex items-center gap-2 transition-all ${landmarks.length > 0 ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-black/50 text-gray-400 border-white/10"}`}>
                         {landmarks.length > 0 ? <><Check size={16}/> دست شناسایی شد</> : <><Scan size={16}/> دست خود را در کادر بگیرید</>}
                      </div>
                   </div>
                </div>
              )}
            </div>

            {webcamRunning && (
              <button 
                onClick={analyzeHand} 
                disabled={landmarks.length === 0}
                className="w-full max-w-sm py-5 bg-gradient-to-r from-[#C6A87C] to-[#b0936a] text-black rounded-2xl font-black text-xl hover:shadow-[0_0_40px_rgba(198,168,124,0.4)] hover:-translate-y-1 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:grayscale"
              >
                <Sparkles size={24} /> شروع آنالیز دست
              </button>
            )}
          </motion.div>
        )}

        {/* --- 2. انیمیشن اسکن سینمایی (Loading) --- */}
        {isAnalyzing && (
          <motion.div className="flex flex-col items-center justify-center fixed inset-0 bg-[#050505] z-50">
             <div className="relative w-72 h-72">
                {/* دایره‌های چرخان */}
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border-t-2 border-[#C6A87C] rounded-full shadow-[0_0_40px_#C6A87C]"></motion.div>
                <motion.div animate={{ rotate: -360 }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }} className="absolute inset-4 border-b-2 border-white/20 rounded-full"></motion.div>
                
                <div className="absolute inset-0 flex items-center justify-center">
                   <Hand size={80} className="text-white/80 animate-pulse" />
                </div>
             </div>
             
             {/* متن‌های متغیر */}
             <div className="mt-16 w-64 space-y-4">
                <motion.div animate={{ opacity: scanStep >= 1 ? 1 : 0.3, x: scanStep >= 1 ? 0 : -20 }} className="flex items-center gap-4 text-[#C6A87C] font-bold">
                   <Check size={18} /> اندازه‌گیری طول انگشتان
                </motion.div>
                <motion.div animate={{ opacity: scanStep >= 2 ? 1 : 0.3, x: scanStep >= 2 ? 0 : -20 }} className="flex items-center gap-4 text-[#C6A87C] font-bold">
                   <Check size={18} /> نمونه‌برداری رنگ پوست
                </motion.div>
                <motion.div animate={{ opacity: scanStep >= 3 ? 1 : 0.3, x: scanStep >= 3 ? 0 : -20 }} className="flex items-center gap-4 text-[#C6A87C] font-bold">
                   <Check size={18} /> تولید پالت اختصاصی
                </motion.div>
             </div>
          </motion.div>
        )}

        {/* --- 3. پنل نتایج (The Dashboard) --- */}
        {result && (
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 py-10 px-4">
             
             {/* کارت فرم دست (Left) */}
             <div className="bg-[#111] border border-white/10 rounded-[3rem] p-10 relative overflow-hidden group hover:border-[#C6A87C]/50 transition-all duration-500 shadow-2xl">
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#C6A87C]/10 rounded-full blur-[60px] pointer-events-none"></div>
                
                <div className="flex items-start justify-between mb-8">
                   <div className="w-20 h-20 bg-[#C6A87C] rounded-2xl flex items-center justify-center text-4xl shadow-[0_10px_30px_rgba(198,168,124,0.3)]">
                      {result.shape.icon}
                   </div>
                   <span className="px-4 py-1 rounded-full border border-white/10 text-gray-400 text-xs font-bold uppercase tracking-widest bg-white/5">Shape Analysis</span>
                </div>
                
                <h2 className="text-4xl font-black text-white mb-4 leading-tight">{result.shape.title}</h2>
                <p className="text-gray-400 leading-loose text-sm mb-8 border-r-2 border-[#C6A87C] pr-4">{result.shape.desc}</p>
                
                <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5 flex items-center justify-between">
                   <div>
                      <span className="text-gray-500 text-xs block mb-1 uppercase tracking-wider">مدل پیشنهادی</span>
                      <span className="text-white font-bold text-xl">{result.shape.shape}</span>
                   </div>
                   <Fingerprint className="text-[#C6A87C] opacity-50" size={32} />
                </div>
             </div>

             {/* کارت رنگ پوست (Right) */}
             <div className="flex flex-col gap-6">
                <div className="flex-1 bg-[#111] border border-white/10 rounded-[3rem] p-10 relative overflow-hidden group hover:border-[#C6A87C]/50 transition-all duration-500 shadow-2xl">
                   <div className="flex items-center gap-4 mb-8">
                      <Palette className="text-[#C6A87C]" size={28} />
                      <h3 className="text-2xl font-bold text-white">پالت {result.tone.title}</h3>
                   </div>
                   <p className="text-gray-400 text-sm mb-8">{result.tone.desc}</p>
                   
                   <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                      {result.tone.colors.map((c: string, idx: number) => (
                         <div key={idx} className="group/color relative cursor-pointer shrink-0">
                            <div className="w-14 h-14 rounded-full border-2 border-white/10 shadow-lg transform group-hover/color:scale-125 transition-all duration-300" style={{ backgroundColor: c }}></div>
                            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] text-gray-500 opacity-0 group-hover/color:opacity-100 transition-opacity uppercase">{c}</span>
                         </div>
                      ))}
                   </div>
                </div>

                {/* دکمه‌ها */}
                <div className="flex flex-col sm:flex-row gap-4">
                   <button onClick={handleDownload} disabled={isDownloading} className="flex-1 py-5 bg-[#C6A87C] text-black rounded-[2rem] font-bold flex items-center justify-center gap-2 hover:bg-white hover:scale-[1.02] transition-all shadow-[0_10px_30px_rgba(198,168,124,0.2)]">
                      {isDownloading ? <Loader2 className="animate-spin"/> : <><Download size={20}/> دانلود نتیجه</>}
                   </button>
                   <button onClick={reset} className="flex-1 py-5 border border-white/10 text-gray-400 rounded-[2rem] font-bold flex items-center justify-center gap-2 hover:bg-white/5 hover:text-white transition-all">
                      <RefreshCw size={20}/> تست مجدد
                   </button>
                </div>
             </div>

          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}