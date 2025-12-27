
import { GoogleGenAI } from "@google/genai";

export const getRaidRecommendation = async (requirements: {
  priority: 'speed' | 'safety' | 'cost' | 'balanced';
  usage: string;
  diskCount: number;
  diskSize: number;
}) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `بناءً على المعطيات التالية لنظام NAS:
  - الأولوية: ${requirements.priority}
  - الاستخدام: ${requirements.usage}
  - عدد الأقراص: ${requirements.diskCount}
  - حجم كل قرص: ${requirements.diskSize} TB
  
  اقترح أفضل نوع RAID واشرح السبب بالتفصيل مع ذكر المزايا والعيوب والسيناريو العملي المناسب. اجعل الرد باللغة العربية بأسلوب خبير تقني.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: prompt,
    config: {
      temperature: 0.7,
    },
  });

  return response.text;
};
