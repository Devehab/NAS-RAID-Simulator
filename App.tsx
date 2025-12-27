
import React, { useState } from 'react';
import RaidCalculator from './components/RaidCalculator';
import RaidRecommender from './components/RaidRecommender';
import ExpertScenarios from './components/ExpertScenarios';
import BackupStrategy from './components/BackupStrategy';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'calc' | 'recommend' | 'expert' | 'backup'>('calc');

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 backdrop-blur-md bg-opacity-80">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <i className="fas fa-hdd text-white text-xl"></i>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              NAS RAID Simulator
            </h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <div className="text-xs font-mono text-blue-400 bg-blue-400/10 px-2 py-1 rounded">v2.5 ARCHIVE</div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-slate-900 py-12 px-4 border-b border-slate-800 mb-12 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">إدارة مصفوفات التخزين باحترافية</h2>
          <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed text-lg">
            أدوات متطورة لمحاكاة وتحليل أنظمة RAID، مصممة للمهندسين والمصورين وأصحاب المختبرات المنزلية.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4">
        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="bg-slate-800/50 p-1.5 rounded-2xl border border-slate-700/50 flex flex-wrap justify-center backdrop-blur-xl gap-1">
            <button
              onClick={() => setActiveTab('calc')}
              className={`px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'calc' ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <i className="fas fa-calculator"></i>
              الحاسبة
            </button>
            <button
              onClick={() => setActiveTab('recommend')}
              className={`px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'recommend' ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <i className="fas fa-lightbulb"></i>
              توصيات ذكية
            </button>
            <button
              onClick={() => setActiveTab('expert')}
              className={`px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'expert' ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <i className="fas fa-user-shield"></i>
              سيناريوهات
            </button>
            <button
              onClick={() => setActiveTab('backup')}
              className={`px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'backup' ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-600/20' : 'text-slate-400 hover:text-emerald-400'
              }`}
            >
              <i className="fas fa-shield-virus"></i>
              دليل الأرشفة
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="min-h-[500px]">
          {activeTab === 'calc' && <RaidCalculator />}
          {activeTab === 'recommend' && <RaidRecommender />}
          {activeTab === 'expert' && <ExpertScenarios />}
          {activeTab === 'backup' && <BackupStrategy />}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-800 pt-8 pb-12 text-center text-slate-500 text-sm">
        <p className="mb-4">تم التطوير كأداة تعليمية لمحاكاة أنظمة RAID المتقدمة</p>
        <div className="flex justify-center gap-6 mt-4">
          <a href="#" className="hover:text-blue-400 transition-colors"><i className="fab fa-github text-lg"></i></a>
          <a href="#" className="hover:text-blue-400 transition-colors"><i className="fab fa-twitter text-lg"></i></a>
          <a href="#" className="hover:text-blue-400 transition-colors"><i className="fab fa-discord text-lg"></i></a>
        </div>
      </footer>
    </div>
  );
};

export default App;
