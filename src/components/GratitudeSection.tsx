import React, { useState } from 'react';
import { 
  Heart, 
  Calendar, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  Clock,
  Trash2
} from 'lucide-react';
import { GratitudeEntry } from '../types';

interface GratitudeSectionProps {
  gratitudeEntries: Record<string, GratitudeEntry>;
  onChange: (entries: Record<string, GratitudeEntry>) => void;
}

export const GratitudeSection: React.FC<GratitudeSectionProps> = ({
  gratitudeEntries,
  onChange,
}) => {
  const todayStr = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(todayStr);

  const currentEntry = gratitudeEntries[selectedDate] || {
    date: selectedDate,
    items: ['', '', ''],
    updatedAt: new Date().toISOString(),
  };

  const handleItemChange = (index: number, value: string) => {
    const updatedItems = [...currentEntry.items] as [string, string, string];
    updatedItems[index] = value;

    const newEntry: GratitudeEntry = {
      ...currentEntry,
      date: selectedDate,
      items: updatedItems,
      updatedAt: new Date().toISOString(),
    };

    onChange({
      ...gratitudeEntries,
      [selectedDate]: newEntry,
    });
  };

  const changeDateByOffset = (offset: number) => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + offset);
    setSelectedDate(d.toISOString().split('T')[0]);
  };

  const handleDeleteHistory = (date: string) => {
    if (window.confirm(`確定要刪除 ${date} 的感恩日誌嗎？`)) {
      const copy = { ...gratitudeEntries };
      delete copy[date];
      onChange(copy);
    }
  };

  // Sort dates descending
  const sortedDates = Object.keys(gratitudeEntries)
    .filter((d) => {
      const entry = gratitudeEntries[d];
      return entry.items.some((item) => item && item.trim().length > 0);
    })
    .sort()
    .reverse();

  return (
    <div className="space-y-6">
      {/* Date Header & Inspiration */}
      <div className="bg-gradient-to-r from-rose-50 to-orange-50 p-6 rounded-xl border border-rose-100 shadow-2xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-rose-600 mb-1">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">
                Daily Gratitude Reflection
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-800">
              心懷感恩，發現身邊美好的三件事
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              每天花兩分鐘記錄生活中的小確幸、給予我們支持的夥伴，或是值得嘉許的自己。
            </p>
          </div>

          {/* Date Picker Controls */}
          <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-xl border border-slate-200 shadow-2xs">
            <button
              onClick={() => changeDateByOffset(-1)}
              className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors"
              title="前一天"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="text-xs font-medium px-2 py-1 border border-transparent hover:border-slate-300 rounded-md focus:outline-hidden focus:border-blue-500"
            />
            <button
              onClick={() => changeDateByOffset(1)}
              className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors"
              title="後一天"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            {selectedDate !== todayStr && (
              <button
                onClick={() => setSelectedDate(todayStr)}
                className="text-[11px] font-medium text-rose-600 bg-rose-50 hover:bg-rose-100 px-2 py-1 rounded-md transition-colors ml-1"
              >
                回到今天
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3 Prompts for the Day */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-rose-500" />
            <h3 className="text-sm font-bold text-slate-800">
              {selectedDate} 的感恩日誌
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            即時自動儲存
          </span>
        </div>

        {/* Prompt 1 */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 text-xs font-bold flex items-center justify-center">
              1
            </span>
            今天我感謝的一個人或善意的舉動：
          </label>
          <textarea
            value={currentEntry.items[0]}
            onChange={(e) => handleItemChange(0, e.target.value)}
            rows={2}
            placeholder="例如：同事耐心為我解說流程、店員溫暖的問候、家人留的一盞燈..."
            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-rose-400 focus:bg-white leading-relaxed resize-none"
          />
        </div>

        {/* Prompt 2 */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 text-xs font-bold flex items-center justify-center">
              2
            </span>
            今天讓我感到舒適、放鬆或愉悅的一刻：
          </label>
          <textarea
            value={currentEntry.items[1]}
            onChange={(e) => handleItemChange(1, e.target.value)}
            rows={2}
            placeholder="例如：午休時散步享受午後陽光、喝到一杯口感滑順的好茶、聽見喜愛的音樂..."
            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-amber-400 focus:bg-white leading-relaxed resize-none"
          />
        </div>

        {/* Prompt 3 */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center">
              3
            </span>
            今天值得為自己喝采或感到欣慰的一件事：
          </label>
          <textarea
            value={currentEntry.items[2]}
            onChange={(e) => handleItemChange(2, e.target.value)}
            rows={2}
            placeholder="例如：即使遇到挫折依然保持平靜、按時完成了原本拖延的待辦、善待了自己的身體..."
            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-emerald-400 focus:bg-white leading-relaxed resize-none"
          />
        </div>
      </div>

      {/* History Review */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-500" />
            <h3 className="text-sm font-bold text-slate-800">歷史感恩時光軸</h3>
          </div>
          <span className="text-xs text-slate-500">
            共記錄了 {sortedDates.length} 天的美好
          </span>
        </div>

        <div className="divide-y divide-slate-100 p-2">
          {sortedDates.length === 0 ? (
            <p className="text-center text-slate-400 text-sm py-8">
              尚未有歷史紀錄，在上方寫下今天的感恩三件事吧！
            </p>
          ) : (
            sortedDates.map((date) => {
              const entry = gratitudeEntries[date];
              const validItems = entry.items.filter((i) => i.trim().length > 0);
              const isCurrent = date === selectedDate;

              return (
                <div
                  key={date}
                  className={`p-4 rounded-lg transition-colors cursor-pointer ${
                    isCurrent ? 'bg-rose-50/40 border border-rose-200' : 'hover:bg-slate-50'
                  }`}
                  onClick={() => setSelectedDate(date)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-rose-700 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {date} {date === todayStr && '(今天)'}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteHistory(date);
                      }}
                      className="text-slate-400 hover:text-rose-600 p-1 rounded-md"
                      title="刪除此天記錄"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <ul className="space-y-1 pl-4 list-disc text-xs text-slate-700">
                    {validItems.map((item, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
