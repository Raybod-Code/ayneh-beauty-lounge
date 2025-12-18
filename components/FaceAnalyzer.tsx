"use client";

import { useState, useRef, useEffect } from "react";
import { useCart } from "@/app/context/CartContext";
import { useColor } from "@/app/context/ColorContext";
import { analyzeFaceGeometry } from "@/app/utils/faceLogic";
import { analyzeSeason, extractRegionColor, Season } from "@/app/utils/colorAnalysis";
import { SEASON_PALETTES } from "@/app/constants/colors";
import { PRODUCTS } from "@/app/utils/faceDatabase";
import { motion, AnimatePresence } from "framer-motion";
import html2canvas from "html2canvas";
import {
  ShoppingBag, Check, Sparkles, Palette, Scissors, Lightbulb,
  Camera, RefreshCw, Download, UserCheck, Share2, ScanFace,
  Loader2, Fingerprint, Aperture, X
} from "lucide-react";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import Image from "next/image";

export default function FaceAnalyzer() {
  const { addToCart } = useCart();
  const { setSeason } = useColor();

  // --- Refs & State ---
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const resultCardRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();

  const [landmarker, setLandmarker] = useState<FaceLandmarker | null>(null);
  const [webcamRunning, setWebcamRunning] = useState(false);
  const [landmarks, setLandmarks] = useState<any[]>([]);
  const [result, setResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [scanStep, setScanStep] = useState(0); 
  const [addedId, setAddedId] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // 1️⃣ Load AI Model
  useEffect(() => {
    const loadModel = async () => {
      try {
        const filesetResolver = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
        );
        const faceLandmarker = await FaceLandmarker.createFromOptions(filesetResolver, {
          baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
            delegate: "GPU",
          },
          outputFaceBlendshapes: true,
          runningMode: "VIDEO",
          numFaces: 1,
        });
        setLandmarker(faceLandmarker);
      } catch (err) {
        console.error("AI Load Error:", err);
      }
    };
    loadModel();
  }, []);

  // 2️⃣ Toggle Camera
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
        // صبر می‌کنیم تا متادیتای ویدیو لود بشه
        videoRef.current.onloadeddata = () => {
           videoRef.current?.play();
           setWebcamRunning(true);
        };
      }
    } catch (err) {
      alert("لطفاً دسترسی دوربین را فعال کنید.");
    }
  };

  // 3️⃣ AI Loop (Safe & Crash-Proof) 🛡️
  useEffect(() => {
    if (webcamRunning && landmarker && videoRef.current) {
       const video = videoRef.current;
       let lastVideoTime = -1;

       const renderLoop = () => {
          // فقط وقتی ویدیو کامل لود شده (readyState >= 2) پردازش کن
          if (video.readyState >= 2 && video.currentTime !== lastVideoTime) {
             const startTimeMs = performance.now();
             const detections = landmarker.detectForVideo(video, startTimeMs);
             
             if (detections.faceLandmarks && detections.faceLandmarks.length > 0) {
                setLandmarks(detections.faceLandmarks[0]);
             } else {
                setLandmarks([]);
             }
             lastVideoTime = video.currentTime;
          }
          requestRef.current = requestAnimationFrame(renderLoop);
       };

       renderLoop();
    }

    return () => { 
       if (requestRef.current) cancelAnimationFrame(requestRef.current); 
    };
  }, [webcamRunning, landmarker]);

  // 4️⃣ Analyze Logic
  const captureAndAnalyze = () => {
    if (landmarks.length === 0) {
      alert("لطفاً صورت خود را در کادر قرار دهید!");
      return;
    }
    setIsAnalyzing(true);
    setWebcamRunning(false);

    // مراحل نمایشی اسکن
    setTimeout(() => setScanStep(1), 1000);  // هندسه
    setTimeout(() => setScanStep(2), 2500); // رنگ پوست
    setTimeout(() => setScanStep(3), 4000); // تولید نتیجه

    let detectedSeason: Season = "Winter"; 
    
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        try {
           const w = canvas.width; const h = canvas.height;
           const skinPoints = [{ x: landmarks[4].x * w, y: landmarks[4].y * h }, { x: landmarks[234].x * w, y: landmarks[234].y * h }, { x: landmarks[454].x * w, y: landmarks[454].y * h }];
           const hairPoints = [{ x: landmarks[10].x * w, y: (landmarks[10].y - 0.15) * h }];
           const skinColor = extractRegionColor(ctx, skinPoints);
           const hairRegion = [{ x: hairPoints[0].x - 10, y: hairPoints[0].y - 10 }, { x: hairPoints[0].x + 10, y: hairPoints[0].y + 10 }];
           const hairColor = extractRegionColor(ctx, hairRegion);
           const season = analyzeSeason(skinColor, hairColor);
           if (season) detectedSeason = season;
        } catch (e) { console.error(e); }
        setSeason(detectedSeason);
      }
    }

    setTimeout(() => {
      const geometryData = analyzeFaceGeometry(landmarks);
      setResult({ ...geometryData, season: detectedSeason });
      setIsAnalyzing(false);
      setScanStep(0);
    }, 5500); 
  };

  // 5️⃣ Download System (Fixed)
  const handleDownload = async () => {
    if (!resultCardRef.current) return;
    setIsDownloading(true);
    try {
      // تکنیک: المنت رو موقتاً به صفحه میاریم ولی پشت همه چیز مخفی می‌کنیم
      const element = resultCardRef.current;
      element.style.display = 'flex';
      element.style.position = 'fixed';
      element.style.zIndex = '-9999'; // فرستادن به پشت صحنه
      element.style.top = '0';
      element.style.left = '0';
      
      const canvas = await html2canvas(element, { 
        scale: 2, // کیفیت بالا
        backgroundColor: '#050505', 
        useCORS: true,
        logging: false,
        allowTaint: true
      });

      element.style.display = 'none'; // دوباره مخفی کن

      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/jpeg', 0.9);
      link.download = `Ayneh-Analysis-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) { 
      console.error("Download failed:", err); 
      alert("خطا در دانلود کارت. لطفاً مجدد تلاش کنید.");
    } 
    finally { 
      setIsDownloading(false); 
    }
  };

  const handleSaveToProfile = () => {
    if (!result) return;
    localStorage.setItem("ayneh-user-analysis", JSON.stringify(result));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleReset = () => {
    setResult(null); setLandmarks([]); setSeason(null); enableCam();
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
    <div className="w-full min-h-screen relative flex flex-col items-center justify-center p-4 lg:p-10 overflow-hidden bg-[#050505]">
      <canvas ref={canvasRef} className="hidden" />

      {/* --- 🌟 کارت دانلود لوکس (Hidden but Renderable) 🌟 --- */}
      {/* این بخش فقط موقع دانلود استفاده میشه و کاربر نمی‌بینه */}
      {result && (
        <div ref={resultCardRef} className="w-[1080px] h-[1920px] bg-[#050505] hidden flex-col relative border-[40px] border-[#111] overflow-hidden font-sans" dir="rtl">
           {/* پس‌زمینه نویزدار لوکس */}
           <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-10"></div>
           <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-b from-[#C6A87C]/20 to-transparent rounded-full blur-[150px] -ml-40 -mt-40"></div>
           
           {/* هدر */}
           <div className="flex justify-between items-end p-16 border-b border-[#C6A87C]/20 relative z-10">
              <div className="text-right">
                 <h1 className="text-8xl font-black text-[#C6A87C] font-serif tracking-tighter">آینه</h1>
                 <p className="text-3xl text-gray-400 tracking-[0.4em] mt-4 uppercase">BEAUTY LOUNGE</p>
              </div>
              <div className="text-left opacity-60" dir="ltr">
                 <p className="text-3xl font-mono text-white">ID: {Math.floor(Math.random()*99999)}</p>
                 <p className="text-2xl mt-2 text-gray-400">AI REPORT</p>
              </div>
           </div>

           {/* بدنه اصلی */}
           <div className="flex-1 flex flex-col items-center justify-center text-center space-y-16 p-16 relative z-10">
              
              {/* آیکون فصل */}
              <div className="relative">
                 <div className="w-[350px] h-[350px] rounded-full border-[4px] border-[#C6A87C] flex items-center justify-center bg-[#0a0a0a] shadow-[0_0_150px_rgba(198,168,124,0.4)]">
                    <span className="text-[14rem] drop-shadow-2xl filter brightness-125">
                       {result.season ? SEASON_PALETTES[result.season].icon : "✨"}
                    </span>
                 </div>
                 <div className="absolute inset-0 border border-[#C6A87C]/30 rounded-full scale-110"></div>
              </div>

              <div>
                 <p className="text-4xl text-[#C6A87C] font-bold uppercase tracking-[0.3em] mb-6">شناسنامه زیبایی شما</p>
                 <h2 className="text-[9rem] leading-none font-black text-white mix-blend-overlay opacity-90">
                    {result.season ? SEASON_PALETTES[result.season].title.split(' ')[0] : "ROYAL"}
                 </h2>
                 <p className="text-4xl text-gray-300 font-light mt-10 max-w-4xl mx-auto leading-relaxed">
                    {result.season ? SEASON_PALETTES[result.season].description : result.description}
                 </p>
              </div>

              {/* پالت رنگی */}
              {result.season && (
                 <div className="w-full bg-white/5 rounded-[3rem] p-10 border border-white/10 mt-10">
                    <p className="text-2xl text-gray-500 mb-8 uppercase tracking-widest text-right">پالت اختصاصی شما</p>
                    <div className="flex justify-between px-10">
                       {SEASON_PALETTES[result.season].colors.map((c: string, i: number) => (
                          <div key={i} className="flex flex-col items-center gap-4">
                             <div className="w-28 h-40 rounded-full shadow-2xl border-4 border-white/10 relative overflow-hidden" style={{backgroundColor: c}}>
                                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent"></div>
                             </div>
                             <span className="text-xl text-gray-500 font-mono uppercase">{c}</span>
                          </div>
                       ))}
                    </div>
                 </div>
              )}
           </div>

           {/* فوتر */}
           <div className="p-10 border-t border-[#C6A87C]/20 flex justify-between items-center bg-[#080808]">
              <div className="flex items-center gap-6">
                 <div className="p-4 border border-white rounded-lg"><Fingerprint size={48} className="text-[#C6A87C]"/></div>
                 <div className="text-right">
                    <p className="text-2xl font-bold text-white uppercase">تایید شده توسط هوش مصنوعی</p>
                    <p className="text-xl text-gray-500">تکنولوژی اختصاصی آینه</p>
                 </div>
              </div>
              <p className="text-2xl text-[#C6A87C] tracking-[0.5em] uppercase">AYNEH.IR</p>
           </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        
        {/* --- 1. حالت استندبای و دوربین --- */}
        {!result && !isAnalyzing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full max-w-4xl flex flex-col items-center gap-10 py-10">
            <div className="relative w-full aspect-video md:aspect-[16/9] bg-[#050505] rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.6)] group">
              
              {/* Standby UI */}
              {!webcamRunning && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[url('/images/grid.png')] bg-cover opacity-60 z-10 backdrop-blur-sm">
                   <motion.div 
                      animate={{ scale: [1, 1.05, 1] }} 
                      transition={{ duration: 3, repeat: Infinity }}
                      className="w-40 h-40 border-[1px] border-[#C6A87C]/50 rounded-full flex items-center justify-center relative"
                   >
                      <div className="absolute inset-0 border-[1px] border-white/10 rounded-full scale-125 border-dashed animate-[spin_20s_linear_infinite]"></div>
                      <ScanFace size={64} className="text-[#C6A87C]" />
                   </motion.div>
                   <button onClick={enableCam} className="mt-12 bg-white text-black px-12 py-5 rounded-full font-black text-lg hover:bg-[#C6A87C] transition-all flex items-center gap-3 shadow-2xl hover:shadow-[0_0_40px_rgba(198,168,124,0.6)]">
                      <Aperture size={24} /> فعال‌سازی آینه هوشمند
                   </button>
                </div>
              )}
              
              <video ref={videoRef} autoPlay playsInline muted className={`w-full h-full object-cover transform scale-x-[-1] transition-all duration-1000 ${!webcamRunning ? "scale-110 blur-xl opacity-0" : "scale-100 blur-0 opacity-100"}`} />
              
              {/* HUD Overlay (رابط کاربری پیشرفته) */}
              {webcamRunning && (
                <div className="absolute inset-0 pointer-events-none">
                   {/* Grid Overlay */}
                   <div className="absolute inset-0 bg-[linear-gradient(rgba(198,168,124,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(198,168,124,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
                   
                   {/* Face Frame */}
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[380px] border border-white/10 rounded-[45%] shadow-[0_0_100px_rgba(0,0,0,0.8)_inset]">
                      {/* Corners */}
                      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#C6A87C] rounded-tl-2xl"></div>
                      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#C6A87C] rounded-tr-2xl"></div>
                      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#C6A87C] rounded-bl-2xl"></div>
                      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#C6A87C] rounded-br-2xl"></div>
                      
                      {/* Scanning Line (رادار) */}
                      {landmarks.length > 0 && (
                         <motion.div 
                            initial={{ top: "0%" }} animate={{ top: "100%" }} 
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C6A87C] to-transparent shadow-[0_0_20px_#C6A87C]"
                         />
                      )}
                   </div>

                   {/* Status Badge */}
                   <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/80 backdrop-blur-xl px-8 py-3 rounded-full border border-white/10 shadow-2xl">
                      <div className={`w-3 h-3 rounded-full ${landmarks.length > 0 ? "bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]" : "bg-red-500"}`}></div>
                      <span className="text-sm font-bold text-white tracking-wider">
                         {landmarks.length > 0 ? "چهره شناسایی شد" : "در جستجوی چهره..."}
                      </span>
                   </div>
                </div>
              )}
            </div>

            {webcamRunning && (
              <button
                onClick={captureAndAnalyze}
                disabled={landmarks.length === 0}
                className="w-full max-w-sm py-6 bg-gradient-to-r from-[#C6A87C] to-[#b0936a] text-black rounded-3xl font-black text-xl hover:shadow-[0_0_50px_rgba(198,168,124,0.5)] hover:-translate-y-1 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:grayscale disabled:hover:translate-y-0"
              >
                <Sparkles size={24} /> شروع اسکن جادویی
              </button>
            )}
          </motion.div>
        )}

        {/* --- 2. Cinematic Scanning Animation (اسکن سینمایی) --- */}
        {isAnalyzing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 bg-[#050505] flex flex-col items-center justify-center">
             <div className="relative">
                {/* Central Circle */}
                <div className="w-80 h-80 border-[1px] border-white/5 rounded-full flex items-center justify-center relative overflow-hidden">
                   <div className="absolute inset-0 bg-[#C6A87C]/5 animate-pulse"></div>
                   <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border-t-2 border-[#C6A87C] rounded-full shadow-[0_0_30px_#C6A87C]"></motion.div>
                   <ScanFace size={100} className="text-white/80 animate-pulse" />
                </div>
                
                {/* Orbital Texts */}
                <div className="absolute -right-40 top-1/2 -translate-y-1/2 flex flex-col gap-6 text-sm font-bold text-[#C6A87C] text-left w-40">
                   <motion.div animate={{ opacity: scanStep >= 1 ? 1 : 0.2, x: scanStep >= 1 ? 0 : -20 }} className="flex items-center gap-3"><Check size={14}/> آنالیز هندسه</motion.div>
                   <motion.div animate={{ opacity: scanStep >= 2 ? 1 : 0.2, x: scanStep >= 2 ? 0 : -20 }} className="flex items-center gap-3"><Check size={14}/> تشخیص تناژ پوست</motion.div>
                   <motion.div animate={{ opacity: scanStep >= 3 ? 1 : 0.2, x: scanStep >= 3 ? 0 : -20 }} className="flex items-center gap-3"><Check size={14}/> ساخت پالت رنگی</motion.div>
                </div>
             </div>
             
             <div className="mt-20 text-center space-y-4">
                <h3 className="text-3xl font-black text-white tracking-[0.2em] animate-pulse">در حال پردازش...</h3>
                <p className="text-gray-500 text-sm font-mono">لطفاً تا پایان تولید شناسنامه زیبایی صبر کنید</p>
             </div>
          </motion.div>
        )}

        {/* --- 3. The Result Dashboard (پنل نتایج لاکچری) --- */}
        {result && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "circOut" }} className="w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 py-10">
            
            {/* Left: The "Magazine Cover" Card (ستون راست در دسکتاپ به خاطر RTL) */}
            <div className="relative group perspective-1000 h-full">
               <div className="absolute -inset-1 bg-gradient-to-r from-[#C6A87C] to-[#333] rounded-[3.5rem] blur opacity-40 group-hover:opacity-70 transition duration-1000 animate-pulse"></div>
               <div className="relative h-full bg-[#111] border border-white/10 rounded-[3rem] overflow-hidden flex flex-col shadow-2xl min-h-[600px]">
                  {/* Decorative Elements */}
                  <div className="absolute top-0 left-0 p-10 opacity-10"><Fingerprint size={120} className="text-white"/></div>
                  <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

                  <div className="p-10 relative z-10 flex-1 flex flex-col justify-center items-center text-center">
                     <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", delay: 0.2 }} className="w-40 h-40 bg-gradient-to-br from-white/10 to-black rounded-full flex items-center justify-center text-7xl shadow-[0_0_60px_rgba(255,255,255,0.2)] mb-8 border border-white/20 backdrop-blur-md">
                        {result.season ? SEASON_PALETTES[result.season].icon : "💎"}
                     </motion.div>
                     
                     <span className="px-5 py-2 rounded-full border border-[#C6A87C] text-[#C6A87C] text-xs font-black tracking-[0.2em] uppercase mb-6 bg-[#C6A87C]/5">Ayneh Certified</span>
                     
                     <h1 className="text-5xl lg:text-6xl font-black text-white font-serif leading-none mb-6 drop-shadow-xl">
                        {result.season ? SEASON_PALETTES[result.season].title : result.title}
                     </h1>
                     
                     <p className="text-gray-400 leading-loose max-w-sm mx-auto text-sm font-medium">
                        {result.season ? SEASON_PALETTES[result.season].description : result.description}
                     </p>

                     {/* Interactive Palette */}
                     {result.season && (
                        <div className="mt-12 flex gap-4 p-3 bg-white/5 rounded-3xl border border-white/5 backdrop-blur-sm shadow-inner justify-center flex-wrap">
                           {SEASON_PALETTES[result.season].colors.map((c: string, idx: number) => (
                              <div key={idx} className="w-10 h-10 rounded-full border-2 border-white/20 shadow-lg cursor-pointer hover:scale-125 transition-transform duration-300" style={{ backgroundColor: c }} title={c} />
                           ))}
                        </div>
                     )}
                  </div>

                  {/* Actions Bar */}
                  <div className="p-6 bg-[#080808] border-t border-white/5 grid grid-cols-2 gap-4 relative z-20">
                     <button onClick={handleSaveToProfile} className={`py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${isSaved ? "text-green-400 bg-green-900/20 border border-green-500/30" : "text-white bg-white/5 hover:bg-white/10 border border-white/5"}`}>
                        {isSaved ? <Check size={18}/> : <UserCheck size={18}/>} {isSaved ? "ذخیره شد" : "ذخیره در پروفایل"}
                     </button>
                     <button onClick={handleDownload} disabled={isDownloading} className="bg-[#C6A87C] text-black py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-white transition-all shadow-[0_0_30px_rgba(198,168,124,0.3)] hover:shadow-[0_0_50px_rgba(198,168,124,0.5)]">
                        {isDownloading ? <Loader2 className="animate-spin" size={18}/> : <><Download size={18}/> دانلود کارت استوری</>}
                     </button>
                  </div>
               </div>
            </div>

            {/* Right: Smart Recommendations */}
            <div className="flex flex-col gap-6 h-full justify-between">
               
               {/* Hero Product Recommendation */}
               {(() => {
                  const product = PRODUCTS.find((p) => p.id === result.productId);
                  if (!product) return null;
                  return (
                     <div className="bg-gradient-to-br from-[#1a1a1a] to-black rounded-[3.5rem] p-8 lg:p-10 border border-white/10 relative overflow-hidden flex flex-col md:flex-row items-center gap-10 group shadow-2xl">
                        <div className="absolute left-0 top-0 w-2/3 h-full bg-[#C6A87C]/5 rounded-full blur-[120px] pointer-events-none group-hover:bg-[#C6A87C]/10 transition-all duration-1000"></div>
                        
                        <div className="w-48 h-48 bg-white rounded-[2rem] p-2 rotate-3 group-hover:rotate-0 transition-all duration-700 shadow-[0_20px_50px_rgba(0,0,0,0.5)] shrink-0">
                           <Image src={product.image} alt={product.name} width={300} height={300} className="w-full h-full object-cover rounded-[1.5rem]" />
                        </div>
                        
                        <div className="flex-1 text-center md:text-right z-10 w-full">
                           <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                              <Sparkles className="text-[#C6A87C]" size={18} />
                              <span className="text-[#C6A87C] text-xs font-black uppercase tracking-[0.2em]">پیشنهاد اختصاصی هوش مصنوعی</span>
                           </div>
                           <h2 className="text-3xl font-bold text-white mb-2">{product.name}</h2>
                           <p className="text-gray-400 text-sm mb-6 leading-relaxed">این محصول با توجه به پالت رنگی {result.season ? SEASON_PALETTES[result.season].title : "شما"} و فرم صورتتان انتخاب شده است.</p>
                           <div className="flex gap-4 justify-center md:justify-start">
                              <button 
                                 onClick={() => { addToCart(product); setAddedId(product.id); setTimeout(()=>setAddedId(null), 2000); }}
                                 className={`px-8 py-3 rounded-xl font-bold transition-all shadow-lg text-sm flex items-center justify-center gap-2 ${addedId ? "bg-green-600 text-white" : "bg-white text-black hover:bg-[#C6A87C] hover:scale-105"}`}
                              >
                                 {addedId ? <><Check size={16}/> به سبد اضافه شد</> : `خرید - ${product.price.toLocaleString()} تومان`}
                              </button>
                           </div>
                        </div>
                     </div>
                  )
               })()}

               {/* Advice Grid */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                  <div className="bg-[#111] rounded-[2.5rem] p-8 border border-white/10 flex flex-col justify-between hover:border-[#C6A87C]/50 transition-colors cursor-default group">
                     <div className="w-12 h-12 bg-[#C6A87C]/10 rounded-xl flex items-center justify-center text-[#C6A87C] mb-4 group-hover:scale-110 transition-transform"><Scissors size={24}/></div>
                     <div>
                        <h4 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">متخصص مو</h4>
                        <p className="text-lg text-white font-medium">{result.hair}</p>
                     </div>
                  </div>
                  <div className="bg-[#111] rounded-[2.5rem] p-8 border border-white/10 flex flex-col justify-between hover:border-[#C6A87C]/50 transition-colors cursor-default group">
                     <div className="w-12 h-12 bg-[#C6A87C]/10 rounded-xl flex items-center justify-center text-[#C6A87C] mb-4 group-hover:scale-110 transition-transform"><Palette size={24}/></div>
                     <div>
                        <h4 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">آرایشگر حرفه‌ای</h4>
                        <p className="text-lg text-white font-medium">{result.makeup}</p>
                     </div>
                  </div>
               </div>

               {/* Reset Button */}
               <button onClick={handleReset} className="w-full py-5 rounded-[2rem] border border-white/10 text-gray-500 hover:text-white hover:bg-white/5 transition-all flex items-center justify-center gap-3 text-sm font-bold tracking-wide">
                  <RefreshCw size={18} /> انجام تست مجدد برای شخص دیگر
               </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}