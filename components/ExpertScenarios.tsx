
import React from 'react';
import { EXPERT_SCENARIOS } from '../constants';

const ExpertScenarios: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto animate-fadeIn px-4 pb-12">
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-8">
        <div>
          <h2 className="text-4xl font-black text-white mb-3">تحليلات استراتيجية</h2>
          <p className="text-slate-400 text-lg max-w-xl">
            تعرف على الأثر الحقيقي لقرارات الـ RAID في بيئات العمل الواقعية، ولماذا نختار بعض العيوب أحياناً.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-emerald-500/10 px-4 py-2 rounded-2xl border border-emerald-500/20">
          <i className="fas fa-check-double text-emerald-400"></i>
          <span className="text-emerald-400 font-bold text-sm">تمت المراجعة من قبل مهندسي الأنظمة</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {EXPERT_SCENARIOS.map((scenario) => (
          <div 
            key={scenario.id} 
            className="group relative bg-slate-800/40 rounded-[2.5rem] border border-slate-700/50 hover:border-blue-500/30 transition-all duration-500 flex flex-col shadow-2xl"
          >
            {/* Top accent bar */}
            <div className={`h-4 bg-gradient-to-r ${scenario.color} rounded-t-[2.5rem]`}></div>
            
            <div className="p-8 flex-1 flex flex-col">
              {/* Header */}
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${scenario.color} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                    <i className={`fas ${scenario.icon} text-white text-2xl`}></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white">{scenario.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-0.5 bg-blue-600 rounded text-[10px] font-bold text-white uppercase tracking-tighter">{scenario.solution}</span>
                      <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">CASE {scenario.id}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Challenge Box */}
              <div className="mb-8 p-5 bg-slate-900/60 rounded-3xl border border-slate-700/50">
                <h4 className="text-[10px] font-bold text-orange-400 uppercase mb-3 flex items-center gap-2 tracking-widest">
                  <i className="fas fa-exclamation-triangle"></i> التحدي التشغيلي
                </h4>
                <p className="text-sm text-slate-200 leading-relaxed font-medium">{scenario.challenge}</p>
              </div>

              {/* Impact Analysis - THE NEW CORE PART */}
              <div className="space-y-4 mb-8">
                <h4 className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-2 tracking-widest mb-4">
                  <i className="fas fa-microchip"></i> تحليل الأثر التقني
                </h4>
                
                {scenario.impactAnalysis.map((impact, idx) => (
                  <div key={idx} className={`p-4 rounded-2xl border ${
                    impact.type === 'positive' 
                    ? 'bg-emerald-500/5 border-emerald-500/20' 
                    : 'bg-red-500/5 border-red-500/20'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      <i className={`fas ${impact.type === 'positive' ? 'fa-arrow-up text-emerald-400' : 'fa-arrow-down text-red-400'} text-xs`}></i>
                      <span className={`text-xs font-black ${impact.type === 'positive' ? 'text-emerald-400' : 'text-red-400'}`}>
                        {impact.label}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed leading-4">
                      <span className="text-slate-200 font-bold block mb-1">الأثر:</span>
                      {impact.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Footer Specs */}
              <div className="mt-auto pt-6 border-t border-slate-700/50">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">التكوين المقترح</span>
                  <span className="text-xs text-white font-mono bg-slate-700 px-2 py-1 rounded-lg">{scenario.setup}</span>
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  {Object.entries(scenario.stats).map(([key, val]) => (
                    <div key={key} className="text-center bg-slate-900/40 p-2 rounded-xl border border-slate-700/30">
                      <span className="text-[8px] uppercase text-slate-500 block mb-1">{key === 'speed' ? 'سرعة' : key === 'safety' ? 'أمان' : 'تكلفة'}</span>
                      <span className="text-xs text-blue-400">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modern Banner */}
      <div className="mt-16 bg-slate-800/80 p-1 rounded-[3rem] border border-slate-700 shadow-2xl shadow-blue-500/5">
        <div className="bg-slate-900 rounded-[2.8rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex items-center gap-8">
            <div className="w-20 h-20 bg-blue-600/10 rounded-3xl flex items-center justify-center border border-blue-600/20 shrink-0">
              <i className="fas fa-graduation-cap text-blue-500 text-4xl"></i>
            </div>
            <div>
              <h4 className="text-3xl font-black text-white mb-3">هل تعلم؟</h4>
              <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
                في أنظمة <span className="text-blue-400 font-bold">RAID 5 & 6</span>، يتم توزيع الـ "Parity" على كل الأقراص وليس قرصاً واحداً فقط. هذا يمنع وجود نقطة فشل واحدة ويحسن سرعة القراءة المتزامنة.
              </p>
            </div>
          </div>
          <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700">
            <p className="text-xs text-slate-400 mb-4 font-medium">نصيحة الخبير لهذا الأسبوع:</p>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-1.5 shrink-0"></div>
              <p className="text-sm text-slate-200 italic leading-relaxed">
                "دائماً استخدم أقراصاً من دفعات إنتاج (Batches) مختلفة لتجنب تعطلها جميعاً في نفس الوقت بسبب عيب مصنعي مشترك."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertScenarios;
