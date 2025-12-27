
import React, { useState, useMemo } from 'react';
import { RaidLevel, RaidStats } from '../types';
import { RAID_CONFIGS } from '../constants';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const RaidCalculator: React.FC = () => {
  const [diskCount, setDiskCount] = useState<number>(4);
  const [diskSize, setDiskSize] = useState<number>(8); // In TB
  const [selectedRaid, setSelectedRaid] = useState<RaidLevel>(RaidLevel.RAID5);

  const stats: RaidStats = useMemo(() => {
    const total = diskCount * diskSize;
    let usable = 0;
    let protection = 0;
    let faultTolerance = 0;
    let readSpeed = "متوسط";
    let writeSpeed = "متوسط";

    switch (selectedRaid) {
      case RaidLevel.RAID0:
        usable = total;
        protection = 0;
        faultTolerance = 0;
        readSpeed = "عالية جداً (N)";
        writeSpeed = "عالية جداً (N)";
        break;
      case RaidLevel.RAID1:
        usable = diskSize; // Common interpretation for mirror
        protection = total - usable;
        faultTolerance = diskCount - 1;
        readSpeed = `عالية (${diskCount}x)`;
        writeSpeed = "عادية (1x)";
        break;
      case RaidLevel.RAID5:
        usable = (diskCount - 1) * diskSize;
        protection = diskSize;
        faultTolerance = 1;
        readSpeed = `عالية (${diskCount - 1}x)`;
        writeSpeed = "منخفضة (Parity overhead)";
        break;
      case RaidLevel.RAID6:
        usable = (diskCount - 2) * diskSize;
        protection = 2 * diskSize;
        faultTolerance = 2;
        readSpeed = `عالية (${diskCount - 2}x)`;
        writeSpeed = "منخفضة جداً (Dual Parity)";
        break;
      case RaidLevel.RAID10:
        usable = (diskCount / 2) * diskSize;
        protection = total / 2;
        faultTolerance = 1; // Can be more if lucky, but safe is 1 per set
        readSpeed = `ممتازة (${diskCount}x)`;
        writeSpeed = `جيدة (${diskCount / 2}x)`;
        break;
    }

    return {
      level: selectedRaid,
      totalCapacity: total,
      usableCapacity: usable,
      protectionCapacity: protection,
      unusableCapacity: 0,
      faultTolerance,
      readSpeed,
      writeSpeed,
      minDisks: RAID_CONFIGS[selectedRaid].minDisks,
      description: RAID_CONFIGS[selectedRaid].description
    };
  }, [diskCount, diskSize, selectedRaid]);

  // Logic for smart warnings and optimality checks
  const optimalityWarnings = useMemo(() => {
    const warnings: { type: 'warning' | 'info'; message: string; icon: string }[] = [];

    if (selectedRaid === RaidLevel.RAID0 && diskCount > 2) {
      warnings.push({
        type: 'warning',
        icon: 'fa-radiation',
        message: `خطر مرتفع: استخدام ${diskCount} أقراص في RAID 0 يزيد احتمالية فقدان البيانات بالكامل بمقدار ${diskCount} أضعاف. لا يُنصح به للبيانات الهامة.`
      });
    }

    if (selectedRaid === RaidLevel.RAID1 && diskCount > 2) {
      warnings.push({
        type: 'info',
        icon: 'fa-lightbulb',
        message: 'هدر في المساحة: استخدام أكثر من قرصين في RAID 1 يقلل السعة المتاحة بشكل كبير دون فائدة إضافية تذكر مقارنة بالأنواع الأخرى.'
      });
    }

    if (selectedRaid === RaidLevel.RAID5) {
      if (diskSize >= 12) {
        warnings.push({
          type: 'warning',
          icon: 'fa-exclamation-triangle',
          message: `خطر إعادة البناء: مع أقراص بحجم ${diskSize}TB، عملية إعادة بناء المصفوفة قد تستغرق أياماً، مما يزيد فرصة فشل قرص آخر وضياع البيانات. فكر في RAID 6.`
        });
      }
      if (diskCount >= 8) {
        warnings.push({
          type: 'info',
          icon: 'fa-shield-virus',
          message: 'توصية أمان: مع 8 أقراص أو أكثر، يُفضل استخدام RAID 6 لتوفير حماية ضد فشل قرصين متتاليين.'
        });
      }
    }

    if (selectedRaid === RaidLevel.RAID10 && diskCount === 4) {
      warnings.push({
        type: 'info',
        icon: 'fa-info-circle',
        message: 'ملاحظة: لـ 4 أقراص، RAID 10 ممتاز للأداء، لكن RAID 6 سيعطيك نفس السعة مع أمان أعلى بكثير ضد فشل أي قرصين.'
      });
    }

    return warnings;
  }, [selectedRaid, diskCount, diskSize]);

  const chartData = [
    { name: 'مساحة فعلية', value: stats.usableCapacity, color: '#10b981' },
    { name: 'مساحة حماية', value: stats.protectionCapacity, color: '#3b82f6' },
  ];

  const handleDiskCountChange = (val: number) => {
    setDiskCount(Math.max(2, Math.min(24, val)));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fadeIn">
      <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <i className="fas fa-sliders-h text-blue-400"></i> إعدادات الأقراص
        </h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">عدد الأقراص: {diskCount}</label>
            <input 
              type="range" min="2" max="24" value={diskCount} 
              onChange={(e) => handleDiskCountChange(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>2</span>
              <span>24</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">حجم القرص الواحد (TB): {diskSize}</label>
            <input 
              type="range" min="1" max="22" step="1" value={diskSize}
              onChange={(e) => setDiskSize(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>1 TB</span>
              <span>22 TB</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">نوع الـ RAID</label>
            <div className="grid grid-cols-3 gap-2">
              {Object.values(RaidLevel).map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedRaid(level)}
                  disabled={diskCount < RAID_CONFIGS[level].minDisks || (level === RaidLevel.RAID10 && diskCount % 2 !== 0)}
                  className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                    selectedRaid === level 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600 disabled:opacity-30 disabled:cursor-not-allowed'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
            {diskCount < RAID_CONFIGS[selectedRaid].minDisks && (
              <div className="mt-3 flex items-center gap-2 p-2 bg-red-500/10 border border-red-500/20 rounded-lg">
                <i className="fas fa-exclamation-circle text-red-400 text-xs"></i>
                <p className="text-red-400 text-xs font-bold">
                  {selectedRaid} يتطلب {RAID_CONFIGS[selectedRaid].minDisks} أقراص على الأقل.
                </p>
              </div>
            )}
            {selectedRaid === RaidLevel.RAID10 && diskCount % 2 !== 0 && (
              <div className="mt-3 flex items-center gap-2 p-2 bg-red-500/10 border border-red-500/20 rounded-lg">
                <i className="fas fa-exclamation-circle text-red-400 text-xs"></i>
                <p className="text-red-400 text-xs font-bold">
                  RAID 10 يتطلب عدداً زوجياً من الأقراص.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Optimality Warnings Section */}
        {optimalityWarnings.length > 0 && (
          <div className="mt-6 space-y-3">
            {optimalityWarnings.map((warn, i) => (
              <div 
                key={i} 
                className={`p-3 rounded-xl border flex gap-3 animate-slideDown ${
                  warn.type === 'warning' 
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' 
                  : 'bg-blue-500/10 border-blue-500/30 text-blue-300'
                }`}
              >
                <i className={`fas ${warn.icon} mt-1`}></i>
                <p className="text-xs leading-relaxed font-medium">{warn.message}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 p-4 bg-slate-900/50 rounded-xl border border-slate-700">
          <h3 className="font-bold text-blue-400 mb-2">عن {selectedRaid}:</h3>
          <p className="text-sm text-slate-300 leading-relaxed">{stats.description}</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <i className="fas fa-chart-pie text-emerald-400"></i> تحليل السعة
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                  formatter={(value: number) => [`${value} TB`, '']}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-slate-900/50 p-3 rounded-lg text-center">
              <span className="text-xs text-slate-400 block">سعة إجمالية</span>
              <span className="text-xl font-bold">{stats.totalCapacity} TB</span>
            </div>
            <div className="bg-slate-900/50 p-3 rounded-lg text-center">
              <span className="text-xs text-emerald-400 block">سعة قابلة للاستخدام</span>
              <span className="text-xl font-bold text-emerald-400">{stats.usableCapacity} TB</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <i className="fas fa-bolt text-yellow-400"></i> الأداء والحماية
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-slate-900/30 rounded-lg">
              <div className="flex items-center gap-3">
                <i className="fas fa-shield-alt text-blue-400"></i>
                <span>تحمل فشل الأقراص</span>
              </div>
              <span className={`font-bold px-2 py-1 rounded ${stats.faultTolerance > 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                {stats.faultTolerance} {stats.faultTolerance === 1 ? 'قرص واحد' : stats.faultTolerance === 2 ? 'قرصين' : 'أقراص'}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-900/30 rounded-lg">
              <div className="flex items-center gap-3">
                <i className="fas fa-tachometer-alt text-orange-400"></i>
                <span>سرعة القراءة</span>
              </div>
              <span className="font-bold">{stats.readSpeed}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-900/30 rounded-lg">
              <div className="flex items-center gap-3">
                <i className="fas fa-pen-nib text-purple-400"></i>
                <span>سرعة الكتابة</span>
              </div>
              <span className="font-bold">{stats.writeSpeed}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RaidCalculator;
