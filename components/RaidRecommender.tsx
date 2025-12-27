
import React, { useState, useMemo, useEffect } from 'react';
import { RaidLevel } from '../types';
import { RAID_CONFIGS } from '../constants';

interface RecommendationResult {
  level: RaidLevel;
  reason: string;
  suitability: string;
  scores: { speed: number; safety: number; cost: number };
}

const RaidRecommender: React.FC = () => {
  const [priority, setPriority] = useState<'speed' | 'safety' | 'cost' | 'balanced'>('balanced');
  const [usageType, setUsageType] = useState<string>('media');
  const [diskCount, setDiskCount] = useState<number>(4);
  const [isAnimating, setIsAnimating] = useState(false);

  // Trigger animation when recommendation changes
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [priority, usageType, diskCount]);

  const usageOptions = [
    { id: 'media', label: 'بث وسائط (Plex/Media)', icon: 'fa-play-circle' },
    { id: 'editing', label: 'مونتاج فيديو (4K/8K)', icon: 'fa-video' },
    { id: 'backup', label: 'نسخ احتياطي وأرشفة', icon: 'fa-archive' },
    { id: 'database', label: 'قواعد بيانات وسرعة استجابة', icon: 'fa-database' },
    { id: 'homelab', label: 'مختبر منزلي وتجارب', icon: 'fa-flask' },
  ];

  const recommendation: RecommendationResult = useMemo(() => {
    // 1. Critical Safeguard
    if (diskCount < 2) return { 
      level: RaidLevel.RAID0, 
      reason: "لا يمكن تكوين RAID حقيقي بأقل من قرصين.", 
      suitability: "يجب إضافة أقراص إضافية.",
      scores: { speed: 10, safety: 0, cost: 100 }
    };

    // 2. Logic based on intersection of Usage and Priority
    
    // CASE: High Speed or Editing
    if (usageType === 'editing' || priority === 'speed') {
      if (diskCount >= 4) {
        if (priority === 'cost') return {
          level: RaidLevel.RAID5,
          reason: "على الرغم من حاجتك للسرعة، إلا أن اختيارك لتوفير التكلفة يجعل RAID 5 الخيار الأفضل لأنه يضحي بقرص واحد فقط للحماية مع الحفاظ على سرعة قراءة جيدة.",
          suitability: "حل وسط بين أداء المونتاج والميزانية.",
          scores: { speed: 70, safety: 60, cost: 80 }
        };
        return {
          level: RaidLevel.RAID10,
          reason: "هذا المزيج يوفر أقصى سرعة كتابة وقراءة ممكنة مع أسرع وقت لإعادة البناء في حال فشل قرص.",
          suitability: "الخيار الاحترافي الأول لبيئات العمل الثقيلة.",
          scores: { speed: 100, safety: 80, cost: 40 }
        };
      }
      return {
        level: RaidLevel.RAID0,
        reason: "بسبب قلة الأقراص المتاحة، RAID 0 هو الوحيد الذي سيعطيك السرعة التي تطلبها، ولكن بدون أي حماية.",
        suitability: "خيار عالي المخاطر - يتطلب نسخة احتياطية خارجية فورية.",
        scores: { speed: 100, safety: 0, cost: 100 }
      };
    }

    // CASE: Safety or Backup
    if (usageType === 'backup' || priority === 'safety') {
      if (diskCount >= 4) return {
        level: RaidLevel.RAID6,
        reason: "الأمان هو غايتك. RAID 6 يضمن لك بقاء البيانات حتى لو تعطل قرصان في نفس الوقت.",
        suitability: "أقصى درجات الحماية للبيانات التي لا تعوض.",
        scores: { speed: 40, safety: 100, cost: 60 }
      };
      return {
        level: RaidLevel.RAID1,
        reason: "بقرصين أو ثلاثة، RAID 1 (Mirroring) هو الأبسط والأكثر أماناً لضمان وجود نسخة طبق الأصل.",
        suitability: "حماية ممتازة للمجموعات الصغيرة من الأقراص.",
        scores: { speed: 50, safety: 90, cost: 30 }
      };
    }

    // CASE: Cost Priority
    if (priority === 'cost') {
      if (diskCount >= 3) return {
        level: RaidLevel.RAID5,
        reason: "أفضل استغلال للمساحة مع وجود حماية. تفقد سعة قرص واحد فقط.",
        suitability: "مثالي للحصول على أقصى تيرابايت مقابل كل دولار.",
        scores: { speed: 60, safety: 60, cost: 90 }
      };
      return {
        level: RaidLevel.RAID1,
        reason: "بقرصين فقط، RAID 1 هو الخيار الوحيد لتوفير الحماية بالرغم من استهلاكه 50% من المساحة.",
        suitability: "بداية اقتصادية آمنة.",
        scores: { speed: 50, safety: 90, cost: 30 }
      };
    }

    // CASE: Default / Media / Balanced
    if (diskCount >= 3) return {
      level: RaidLevel.RAID5,
      reason: "توازن مثالي يناسب معظم مستخدمي NAS المنزلي؛ مساحة كبيرة، سرعة قراءة ممتازة لبث الأفلام، وحماية من فشل قرص واحد.",
      suitability: "المعيار الذهبي للاستخدام المنزلي المتوازن.",
      scores: { speed: 65, safety: 65, cost: 85 }
    };

    return {
      level: RaidLevel.RAID1,
      reason: "لعدد أقراص قليل، هذا التكوين يضمن عدم فقدان بياناتك بأسلوب بسيط ومباشر.",
      suitability: "بسيط وفعال.",
      scores: { speed: 50, safety: 90, cost: 30 }
    };
  }, [priority, usageType, diskCount]);

  const config = RAID_CONFIGS[recommendation.level];

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-fadeIn px-4 pb-12">
      <div className="bg-slate-800/40 backdrop-blur-md p-8 rounded-[2.5rem] border border-slate-700 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-3xl rounded-full"></div>
        
        <h2 className="text-3xl font-black mb-10 text-center bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">مستشار RAID الذكي</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 relative z-10">
          {/* Column 1: Usage */}
          <div className="space-y-6">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <i className="fas fa-briefcase text-blue-500"></i> 1. كيف ستستخدم الـ NAS؟
            </label>
            <div className="space-y-2">
              {usageOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setUsageType(opt.id)}
                  className={`w-full p-4 rounded-2xl border text-right flex items-center justify-between transition-all duration-300 group ${
                    usageType === opt.id 
                      ? 'bg-blue-600 border-blue-500 text-white shadow-xl shadow-blue-600/20 translate-x-[-4px]' 
                      : 'bg-slate-900/40 border-slate-700 text-slate-400 hover:border-slate-500 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <i className={`fas ${opt.icon} text-lg ${usageType === opt.id ? 'text-white' : 'text-slate-500 group-hover:text-blue-400'}`}></i>
                    <span className="text-sm font-bold">{opt.label}</span>
                  </div>
                  {usageType === opt.id && <i className="fas fa-check-circle animate-scaleIn"></i>}
                </button>
              ))}
            </div>
          </div>

          {/* Column 2: Priority */}
          <div className="space-y-6">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <i className="fas fa-bullseye text-emerald-500"></i> 2. ما هي أولويتك القصوى؟
            </label>
            <div className="grid grid-cols-1 gap-3">
              {[
                { id: 'balanced', label: 'توازن عام (شامل)', icon: 'fa-balance-scale', color: 'emerald' },
                { id: 'safety', label: 'أمان البيانات (قصوى)', icon: 'fa-shield-alt', color: 'blue' },
                { id: 'speed', label: 'الأداء والسرعة (فائقة)', icon: 'fa-bolt', color: 'orange' },
                { id: 'cost', label: 'توفير التكلفة (سعة أكبر)', icon: 'fa-dollar-sign', color: 'amber' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setPriority(item.id as any)}
                  className={`p-4 rounded-2xl border text-right flex items-center justify-between transition-all duration-300 ${
                    priority === item.id 
                      ? 'bg-emerald-600 border-emerald-500 text-white shadow-xl shadow-emerald-600/20 translate-x-[-4px]' 
                      : 'bg-slate-900/40 border-slate-700 text-slate-400 hover:border-slate-500 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <i className={`fas ${item.icon} text-lg ${priority === item.id ? 'text-white' : 'text-slate-500'}`}></i>
                    <span className="text-sm font-bold">{item.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Column 3: Disk Count */}
          <div className="space-y-6">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <i className="fas fa-hdd text-purple-500"></i> 3. كم قرصاً لديك؟
            </label>
            <div className="bg-slate-900/60 p-8 rounded-[2rem] border border-slate-700/50 flex flex-col items-center justify-center h-[calc(100%-2.5rem)]">
              <div className="relative mb-8">
                <div className="w-24 h-24 rounded-full border-4 border-slate-700 border-t-blue-500 flex items-center justify-center text-4xl font-black text-white shadow-2xl">
                  {diskCount}
                </div>
                <div className="absolute -bottom-2 -right-2 bg-blue-600 text-[10px] px-2 py-1 rounded-full font-bold">أقراص</div>
              </div>
              <input 
                type="range" min="2" max="12" value={diskCount} 
                onChange={(e) => setDiskCount(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500 mb-4"
              />
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">اسحب لتغيير العدد</p>
            </div>
          </div>
        </div>
      </div>

      {/* Result Section */}
      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 transition-all duration-500 ${isAnimating ? 'opacity-50 scale-[0.98] blur-sm' : 'opacity-100 scale-100 blur-0'}`}>
        <div className="lg:col-span-4 bg-gradient-to-br from-blue-600 to-indigo-800 p-10 rounded-[3rem] shadow-2xl flex flex-col items-center justify-center text-center relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <span className="text-blue-200 text-xs mb-4 font-black uppercase tracking-[0.3em] relative z-10">الخيار الأمثل</span>
          <h3 className="text-7xl font-black text-white mb-6 tracking-tighter relative z-10 group-hover:scale-110 transition-transform duration-500">{recommendation.level}</h3>
          <div className="w-20 h-1.5 bg-white/20 rounded-full mb-6 relative z-10"></div>
          <p className="text-blue-100 text-lg font-medium leading-relaxed relative z-10">{recommendation.suitability}</p>
        </div>

        <div className="lg:col-span-8 bg-slate-800/40 backdrop-blur-md p-10 rounded-[3rem] border border-slate-700 shadow-xl flex flex-col">
          <div className="flex flex-col md:flex-row gap-10">
            <div className="flex-1 space-y-6">
              <div>
                <h4 className="text-sm font-black text-blue-400 mb-4 flex items-center gap-2 uppercase tracking-widest">
                  <i className="fas fa-comment-dots"></i> تحليل الخبير
                </h4>
                <p className="text-slate-200 leading-relaxed text-lg font-medium">{recommendation.reason}</p>
              </div>

              {/* Analysis Scores */}
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(recommendation.scores).map(([key, val]) => (
                  <div key={key} className="bg-slate-900/50 p-4 rounded-2xl border border-slate-700/50">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-black text-slate-500 uppercase">{key === 'speed' ? 'السرعة' : key === 'safety' ? 'الأمان' : 'التكلفة'}</span>
                      <span className="text-xs font-bold text-blue-400">{val}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 transition-all duration-1000" style={{ width: `${val}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:w-64 space-y-4">
              <div className="bg-emerald-500/5 border border-emerald-500/20 p-5 rounded-3xl">
                <h5 className="emerald-400 font-black text-[10px] text-emerald-400 uppercase mb-4 tracking-widest">المكاسب</h5>
                <ul className="space-y-3">
                  {config.pros.map((pro: string, i: number) => (
                    <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                      <i className="fas fa-check text-emerald-500 mt-0.5"></i>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-red-500/5 border border-red-500/20 p-5 rounded-3xl">
                <h5 className="red-400 font-black text-[10px] text-red-400 uppercase mb-4 tracking-widest">التضحيات</h5>
                <ul className="space-y-3">
                  {config.cons.map((con: string, i: number) => (
                    <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                      <i className="fas fa-minus text-red-500 mt-1"></i>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RaidRecommender;
