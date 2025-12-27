
import React from 'react';

const BackupStrategy: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-fadeIn pb-12">
      {/* Introduction Header */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-black text-white">إستراتيجية البقاء الرقمي</h2>
        <p className="text-slate-400 text-lg max-w-3xl mx-auto">
          RAID يحميك من تعطل الهاردسك، لكنه لا يحميك من الحذف بالخطأ، الفيروسات، أو الكوارث الطبيعية. 
          هنا دليلك لضمان أمان بياناتك للأجيال القادمة.
        </p>
      </div>

      {/* The 3-2-1-1-0 Rule Card */}
      <div className="bg-slate-800/40 rounded-[3rem] border border-slate-700 p-8 md:p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500"></div>
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2 space-y-6">
            <h3 className="text-3xl font-black text-emerald-400 flex items-center gap-3">
              <i className="fas fa-shield-heart"></i> قاعدة 3-2-1-1-0 الاحترافية
            </h3>
            <p className="text-slate-300 leading-relaxed">
              هذه هي القاعدة الذهبية التي تتبعها كبرى مراكز البيانات لضمان عدم فقدان بت واحد من المعلومات:
            </p>
            <div className="space-y-4">
              {[
                { n: '3', t: 'نسخ على الأقل', d: 'نسختك الأصلية + نسختين احتياطيتين.' },
                { n: '2', t: 'وسائط مختلفة', d: 'مثلاً هاردسك خارجي + NAS، لا تضع كل بيضك في سلة تقنية واحدة.' },
                { n: '1', t: 'خارج الموقع (Off-site)', d: 'نسخة في سحابة أو في منزل آخر للحماية من الكوارث المحلية.' },
                { n: '1', t: 'غير متصلة (Offline)', d: 'نسخة معزولة تماماً عن الكهرباء والإنترنت (Air-gapped) للحماية من الهجمات.' },
                { n: '0', t: 'أخطاء (Zero Errors)', d: 'التحقق الدوري من سلامة النسخة (Restore Testing) لضمان أنها تعمل فعلاً.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-2xl font-black text-blue-500 shrink-0 group-hover:border-blue-500 transition-colors">
                    {item.n}
                  </div>
                  <div>
                    <h4 className="text-white font-bold">{item.t}</h4>
                    <p className="text-sm text-slate-500">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 bg-slate-900/60 p-8 rounded-[2.5rem] border border-slate-700/50">
            <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
              <i className="fas fa-hourglass-half text-amber-400"></i> عمر وسائط التخزين
            </h4>
            <div className="space-y-6">
              {[
                { m: 'HDDs (Hard Drives)', y: '3 - 7 سنوات', c: 'تتأثر بالحركة والمغناطيس.', i: 'fa-disk-drive' },
                { m: 'SSDs / Flash', y: '5 - 10 سنوات', c: 'تفقد البيانات إذا تركت بدون كهرباء لسنوات.', i: 'fa-bolt' },
                { m: 'LTO Tapes (الشريط)', y: '30+ سنة', c: 'الأكثر أماناً للأرشفة الباردة.', i: 'fa-tape' },
                { m: 'M-Disc (Optical)', y: '1000 سنة', c: 'مخصص للأرشفة الأبدية، لا يتأثر بالرطوبة أو الحرارة.', i: 'fa-compact-disc' }
              ].map((m, i) => (
                <div key={i} className="flex justify-between items-center border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <i className={`fas ${m.i} text-slate-500`}></i>
                    <div>
                      <p className="text-sm font-bold text-slate-200">{m.m}</p>
                      <p className="text-[10px] text-slate-500">{m.c}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">{m.y}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-slate-800/40 p-8 rounded-[2rem] border border-slate-700 hover:border-emerald-500/50 transition-all group">
          <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 border border-emerald-500/20 group-hover:scale-110 transition-transform">
            <i className="fas fa-dna text-emerald-500 text-2xl"></i>
          </div>
          <h4 className="text-xl font-bold mb-4 text-white">محاربة "تحلل البتات" (Bit Rot)</h4>
          <p className="text-sm text-slate-400 leading-relaxed">
            مع مرور السنوات، قد تتغير قيمة بت واحد في هاردسك بسبب الإشعاع الكوني أو التحلل المغناطيسي. 
            استخدم أنظمة ملفات مثل <span className="text-emerald-400 font-mono">ZFS</span> أو <span className="text-emerald-400 font-mono">Btrfs</span> التي تقوم بـ "التصحيح الذاتي" (Self-Healing) للبيانات.
          </p>
        </div>

        <div className="bg-slate-800/40 p-8 rounded-[2rem] border border-slate-700 hover:border-blue-500/50 transition-all group">
          <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/20 group-hover:scale-110 transition-transform">
            <i className="fas fa-lock text-blue-500 text-2xl"></i>
          </div>
          <h4 className="text-xl font-bold mb-4 text-white">التشفير للأبد</h4>
          <p className="text-sm text-slate-400 leading-relaxed">
            إذا قمت بتشفير النسخة الاحتياطية، تأكد من طباعة "مفتاح الاستعادة" على ورق وحفظه في مكان آمن مادياً. 
            لو ضاع المفتاح الرقمي، حتى أحفادك لن يستطيعوا فتح الصور العائلية بعد 50 سنة.
          </p>
        </div>

        <div className="bg-slate-800/40 p-8 rounded-[2rem] border border-slate-700 hover:border-purple-500/50 transition-all group">
          <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 border border-purple-500/20 group-hover:scale-110 transition-transform">
            <i className="fas fa-sync text-purple-500 text-2xl"></i>
          </div>
          <h4 className="text-xl font-bold mb-4 text-white">التدوير الدوري (Rotation)</h4>
          <p className="text-sm text-slate-400 leading-relaxed">
            لا تترك الهاردسك الاحتياطي يعمل 24/7. قم بتوصيله، انسخ، ثم افصله. 
            كل 3 سنوات، قم بنقل البيانات إلى هاردسك جديد تماماً وتخلص من القديم، هكذا تضمن البقاء للأبد.
          </p>
        </div>
      </div>

      {/* Expert Quote */}
      <div className="bg-slate-900 border-2 border-dashed border-slate-700 p-8 rounded-[2rem] text-center italic">
        <p className="text-slate-300 text-lg">
          "الفرق بين الشخص المحظوظ والشخص الذي فقد بياناته هو أن المحظوظ يختبر قدرته على استعادة البيانات (Restore) مرة كل 6 أشهر."
        </p>
        <p className="mt-4 text-blue-400 font-bold not-italic">— حكمة من مديري الأنظمة</p>
      </div>
    </div>
  );
};

export default BackupStrategy;
