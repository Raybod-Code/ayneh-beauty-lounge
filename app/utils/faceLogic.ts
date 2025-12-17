// app/utils/faceLogic.ts
import { AI_STYLE_ENGINE } from "./faceDatabase";

const getDistance = (p1: any, p2: any) => Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));

export const analyzeFaceGeometry = (landmarks: any[]) => {
  if (!landmarks || landmarks.length < 468) return null;

  // فواصل کلیدی (نقاط استاندارد مدیاپایپ)
  const foreheadWidth = getDistance(landmarks[103], landmarks[332]);
  const cheekboneWidth = getDistance(landmarks[234], landmarks[454]);
  const jawlineWidth = getDistance(landmarks[58], landmarks[288]);
  const faceLength = getDistance(landmarks[10], landmarks[152]);

  const ratioLenWid = faceLength / cheekboneWidth;

  if (ratioLenWid > 1.5) return AI_STYLE_ENGINE.Long;
  
  if (cheekboneWidth > foreheadWidth && cheekboneWidth > jawlineWidth) {
    return (jawlineWidth < foreheadWidth * 0.8) ? AI_STYLE_ENGINE.Heart : AI_STYLE_ENGINE.Diamond;
  }
  
  if (Math.abs(faceLength - cheekboneWidth) < 0.1 * faceLength) {
    return (jawlineWidth > foreheadWidth * 0.9) ? AI_STYLE_ENGINE.Square : AI_STYLE_ENGINE.Round;
  }

  return AI_STYLE_ENGINE.Oval;
};