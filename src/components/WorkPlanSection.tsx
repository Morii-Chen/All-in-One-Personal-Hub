import React, { useState } from 'react';
import { 
  CalendarDays, 
  Target, 
  Plus, 
  Trash2, 
  Check, 
  Sun, 
  CalendarRange,
  Edit2
} from 'lucide-react';
import { WorkPlanItem } from '../types';

interface WorkPlanSectionProps {
  workPlans: WorkPlanItem[];
  onChange: (plans: WorkPlanItem[]) => void;
}

export const WorkPlanSection: React.FC<WorkPlanSectionProps> = ({ workPlans, onChange }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'daily' | 'weekly'>('daily');
  const [notes, setNotes] = useState('');
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split('T')[0]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newItem: WorkPlanItem = {
      id: `plan-${Date.now()}`,
      title: title.trim(),
      completed: false,
      progress: 0,
      category,
      notes: notes.trim() || undefined,
      targetDate: category === 'daily' ? targetDate : undefined,
    };

    onChange([...workPlans, newItem]);
    setTitle('');
    setNotes('');
  };

  const handleToggleComplete = (id: string) => {
    const updated = workPlans.map((p) => {
      if (p.id === id) {
        const nextCompleted = !p.completed;
        return {
          ...p,
          completed: nextCompleted,
          progress: nextCompleted ? 100 : 0,
        };
      }
      return p;
    });
    onChange(updated);
  };

  const handleSetProgress = (id: string, progress: number) => {
    const updated = workPlans.map((p) => {
      if (p.id === id) {
        return {
          ...p,
          progress,
          completed: progress >= 100,
        };
      }
      return p;
    });
    onChange(updated);
  };

  const handleDelete = (id: string) => {
    onChange(workPlans.filter((p) => p.id !== id));
  };

  const dailyPlans = workPlans.filter((p) => p.category === 'daily');
  const weeklyPlans = workPlans.filter((p) => p.category === 'weekly');

  const calcProgress = (items: WorkPlanItem[]) => {
    if (!items.length) return 0;
    const sum = items.reduce((acc, cur) => acc + (cur.progress || 0), 0);
    return Math.round(sum / items.length);
  };

  const dailyAvg = calcProgress(dailyPlans);
  const weeklyAvg = calcProgress(weeklyPlans);

  return (
    <div className="space-y-6">
      {/* Target Progress Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Daily Summary */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <Sun className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800">本日工作重點進度</h3>
                <span className="text-xs text-slate-500">{dailyPlans.length} 個重點目標</span>
              </div>
            </div>
            <span className="text-xl font-bold text-amber-600">{dailyAvg}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 mt-4 overflow-hidden">
            <div
              className="bg-amber-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${dailyAvg}%` }}
            />
          </div>
        </div>

        {/* Weekly Summary */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <CalendarRange className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800">本週關鍵里程碑進度</h3>
                <span className="text-xs text-slate-500">{weeklyPlans.length} 個週目標</span>
              </div>
            </div>
            <span className="text-xl font-bold text-indigo-600">{weeklyAvg}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 mt-4 overflow-hidden">
            <div
              className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${weeklyAvg}%` }}
            />
          </div>
        </div>
      </div>

      {/* Add Plan Form */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
        <h2 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
          <Target className="w-4 h-4 text-blue-600" />
          擬定目標與工作計劃
        </h2>
        <form onSubmit={handleAdd} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-slate-500 mb-1">
                計劃或目標名稱
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="例如：整理使用者研究回饋、交付第一版展示雛形..."
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500 focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">
                範疇分類
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as 'daily' | 'weekly')}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500"
              >
                <option value="daily">☀️ 本日重點 (Daily)</option>
                <option value="weekly">🎯 本週重點 (Weekly)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-slate-500 mb-1">
                備註說明或關鍵成果指標 (可選)
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="例如：需跨部門對齊交付標準、包含 3 項核心案例"
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500 focus:bg-white"
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>加入計劃</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Lists Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Focus List */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="px-5 py-3.5 bg-amber-50/50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4 text-amber-600" />
              <h3 className="text-sm font-bold text-slate-800">本日重點 (Daily Focus)</h3>
            </div>
            <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-medium">
              {dailyPlans.length} 項
            </span>
          </div>

          <div className="p-4 space-y-3">
            {dailyPlans.length === 0 ? (
              <p className="text-center text-slate-400 text-sm py-6">今天尚無重點目標，歡迎新增！</p>
            ) : (
              dailyPlans.map((plan) => (
                <div
                  key={plan.id}
                  className="p-3.5 rounded-lg border border-slate-200 hover:border-slate-300 transition-all bg-white"
                >
                  <div className="flex items-start justify-between gap-2">
                    <label className="flex items-center gap-2.5 cursor-pointer flex-1">
                      <input
                        type="checkbox"
                        checked={plan.completed}
                        onChange={() => handleToggleComplete(plan.id)}
                        className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                      />
                      <span
                        className={`text-sm font-medium ${
                          plan.completed ? 'line-through text-slate-400' : 'text-slate-800'
                        }`}
                      >
                        {plan.title}
                      </span>
                    </label>
                    <button
                      onClick={() => handleDelete(plan.id)}
                      className="text-slate-400 hover:text-rose-600 p-1 rounded-md transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {plan.notes && (
                    <p className="text-xs text-slate-500 mt-1 pl-6.5">{plan.notes}</p>
                  )}

                  {/* Progress Controls */}
                  <div className="mt-3 pl-6.5 flex flex-wrap items-center gap-2">
                    <div className="flex-1 min-w-[120px]">
                      <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                        <span>進度</span>
                        <span className="font-semibold text-slate-700">{plan.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-blue-600 h-1.5 rounded-full"
                          style={{ width: `${plan.progress}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {[25, 50, 75, 100].map((val) => (
                        <button
                          key={val}
                          onClick={() => handleSetProgress(plan.id, val)}
                          className={`text-[10px] px-1.5 py-0.5 rounded border transition-colors ${
                            plan.progress === val
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {val}%
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Weekly Milestones List */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="px-5 py-3.5 bg-indigo-50/50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarRange className="w-4 h-4 text-indigo-600" />
              <h3 className="text-sm font-bold text-slate-800">本週重點 (Weekly Goals)</h3>
            </div>
            <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full font-medium">
              {weeklyPlans.length} 項
            </span>
          </div>

          <div className="p-4 space-y-3">
            {weeklyPlans.length === 0 ? (
              <p className="text-center text-slate-400 text-sm py-6">本週尚無重點目標，歡迎擬定！</p>
            ) : (
              weeklyPlans.map((plan) => (
                <div
                  key={plan.id}
                  className="p-3.5 rounded-lg border border-slate-200 hover:border-slate-300 transition-all bg-white"
                >
                  <div className="flex items-start justify-between gap-2">
                    <label className="flex items-center gap-2.5 cursor-pointer flex-1">
                      <input
                        type="checkbox"
                        checked={plan.completed}
                        onChange={() => handleToggleComplete(plan.id)}
                        className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                      />
                      <span
                        className={`text-sm font-medium ${
                          plan.completed ? 'line-through text-slate-400' : 'text-slate-800'
                        }`}
                      >
                        {plan.title}
                      </span>
                    </label>
                    <button
                      onClick={() => handleDelete(plan.id)}
                      className="text-slate-400 hover:text-rose-600 p-1 rounded-md transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {plan.notes && (
                    <p className="text-xs text-slate-500 mt-1 pl-6.5">{plan.notes}</p>
                  )}

                  {/* Progress Controls */}
                  <div className="mt-3 pl-6.5 flex flex-wrap items-center gap-2">
                    <div className="flex-1 min-w-[120px]">
                      <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                        <span>進度</span>
                        <span className="font-semibold text-slate-700">{plan.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-indigo-600 h-1.5 rounded-full"
                          style={{ width: `${plan.progress}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {[25, 50, 75, 100].map((val) => (
                        <button
                          key={val}
                          onClick={() => handleSetProgress(plan.id, val)}
                          className={`text-[10px] px-1.5 py-0.5 rounded border transition-colors ${
                            plan.progress === val
                              ? 'bg-indigo-600 text-white border-indigo-600'
                              : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {val}%
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
