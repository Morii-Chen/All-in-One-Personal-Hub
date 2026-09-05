import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  Plus, 
  Trash2, 
  Clock, 
  CheckCircle2, 
  RotateCcw, 
  PlayCircle, 
  Copy, 
  Check, 
  UserCheck, 
  Calendar,
  Sparkles,
  Flame
} from 'lucide-react';
import { UrgentTaskItem } from '../types';

interface UrgentTaskSectionProps {
  urgentTasks: UrgentTaskItem[];
  onChange: (tasks: UrgentTaskItem[]) => void;
}

const getCurrentDateTimeString = (): string => {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const hh = String(now.getHours()).padStart(2, '0');
  const min = String(now.getMinutes()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
};

export const UrgentTaskSection: React.FC<UrgentTaskSectionProps> = ({
  urgentTasks,
  onChange,
}) => {
  const [assigner, setAssigner] = useState('老闆');
  const [content, setContent] = useState('');
  const [assignedAt, setAssignedAt] = useState(() => getCurrentDateTimeString());
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState<'urgent' | 'high' | 'normal'>('urgent');
  const [notes, setNotes] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Auto-refresh timestamp if content was empty and user begins typing
  const handleContentFocus = () => {
    if (!content.trim()) {
      setAssignedAt(getCurrentDateTimeString());
    }
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const newTask: UrgentTaskItem = {
      id: `urgent-${Date.now()}`,
      assigner: assigner.trim() || '主管/老闆',
      content: content.trim(),
      assignedAt: assignedAt.trim() || getCurrentDateTimeString(),
      deadline: deadline.trim() || undefined,
      status: 'pending',
      priority,
      notes: notes.trim() || undefined,
    };

    onChange([newTask, ...urgentTasks]);
    setContent('');
    setDeadline('');
    setNotes('');
    setAssignedAt(getCurrentDateTimeString());
  };

  const handleUpdateStatus = (id: string, newStatus: 'pending' | 'in-progress' | 'completed') => {
    const updated = urgentTasks.map((t) => {
      if (t.id === id) {
        return {
          ...t,
          status: newStatus,
          completedAt: newStatus === 'completed' ? getCurrentDateTimeString() : undefined,
        };
      }
      return t;
    });
    onChange(updated);
  };

  const handleDeleteTask = (id: string) => {
    if (window.confirm('確定要刪除這筆交辦事項嗎？')) {
      onChange(urgentTasks.filter((t) => t.id !== id));
    }
  };

  const handleCopyTask = (task: UrgentTaskItem) => {
    const text = `【交辦事項】\n交辦人：${task.assigner}\n交辦時間：${task.assignedAt}\n內容：${task.content}\n完成期限：${task.deadline || '未指定'}\n目前狀態：${
      task.status === 'completed' ? '已完成了結' : task.status === 'in-progress' ? '處理中' : '待處理'
    }`;
    navigator.clipboard.writeText(text);
    setCopiedId(task.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleQuickDeadline = (type: 'today' | 'tomorrow' | 'friday') => {
    const now = new Date();
    if (type === 'today') {
      const yyyy = now.getFullYear();
      const mm = String(now.getMonth() + 1).padStart(2, '0');
      const dd = String(now.getDate()).padStart(2, '0');
      setDeadline(`${yyyy}-${mm}-${dd} 18:00 (今日下班前)`);
    } else if (type === 'tomorrow') {
      const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      const yyyy = tomorrow.getFullYear();
      const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
      const dd = String(tomorrow.getDate()).padStart(2, '0');
      setDeadline(`${yyyy}-${mm}-${dd} 12:00 (明日中午前)`);
    } else if (type === 'friday') {
      const day = now.getDay();
      const diffToFriday = (5 - day + 7) % 7;
      const friday = new Date(now.getTime() + (diffToFriday || 7) * 24 * 60 * 60 * 1000);
      const yyyy = friday.getFullYear();
      const mm = String(friday.getMonth() + 1).padStart(2, '0');
      const dd = String(friday.getDate()).padStart(2, '0');
      setDeadline(`${yyyy}-${mm}-${dd} 17:00 (本週五前)`);
    }
  };

  const pendingCount = urgentTasks.filter((t) => t.status === 'pending').length;
  const inProgressCount = urgentTasks.filter((t) => t.status === 'in-progress').length;
  const completedCount = urgentTasks.filter((t) => t.status === 'completed').length;

  const filteredTasks = urgentTasks.filter((t) => {
    if (filter === 'pending') return t.status === 'pending';
    if (filter === 'in-progress') return t.status === 'in-progress';
    if (filter === 'completed') return t.status === 'completed';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Alert Header & Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-amber-500 to-rose-500 p-4 rounded-xl text-white shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-100">
              臨時交辦總數
            </span>
            <AlertTriangle className="w-5 h-5 text-amber-200" />
          </div>
          <div className="text-2xl font-black mt-1">{urgentTasks.length} 件</div>
          <div className="text-xs text-amber-100 mt-1">自動記錄接收時間戳記</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-rose-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-rose-600">🚨 待處理 (Pending)</span>
            <Flame className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-bold text-rose-700 mt-1">{pendingCount} 件</div>
          <div className="text-xs text-slate-400 mt-1">需即刻排入時程</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-blue-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-blue-600">⚡ 處理中 (In Progress)</span>
            <PlayCircle className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-blue-700 mt-1">{inProgressCount} 件</div>
          <div className="text-xs text-slate-400 mt-1">積極推展執行中</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-emerald-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-emerald-600">✅ 已完成了結</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-emerald-700 mt-1">{completedCount} 件</div>
          <div className="text-xs text-slate-400 mt-1">已回報交差事項</div>
        </div>
      </div>

      {/* Quick Add Form */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-500" />
            一鍵記錄老闆 / 主管臨時交辦事項
          </h2>
          <span className="text-xs text-slate-500">
            自動帶入當下精確日期與時間標記
          </span>
        </div>

        <form onSubmit={handleAddTask} className="space-y-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            {/* Assigner */}
            <div className="sm:col-span-4">
              <label className="block text-xs font-medium text-slate-600 mb-1">
                交辦人
              </label>
              <div className="flex gap-1.5">
                <input
                  type="text"
                  required
                  value={assigner}
                  onChange={(e) => setAssigner(e.target.value)}
                  placeholder="交辦人（如：老闆、總經理、處長）"
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-rose-500 focus:bg-white font-medium"
                />
              </div>
              {/* Quick tags */}
              <div className="flex gap-1 mt-1.5 flex-wrap">
                {['老闆', '總經理', '直屬主管', '業務窗口', '客戶'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setAssigner(tag)}
                    className="text-2xs px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Assigned Timestamp */}
            <div className="sm:col-span-4">
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-medium text-slate-600">
                  交辦時間標記 (自動帶入)
                </label>
                <button
                  type="button"
                  onClick={() => setAssignedAt(getCurrentDateTimeString())}
                  className="text-2xs text-blue-600 hover:underline flex items-center gap-0.5"
                  title="重新帶入現在時間"
                >
                  <RotateCcw className="w-2.5 h-2.5" />
                  重整
                </button>
              </div>
              <div className="relative">
                <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={assignedAt}
                  onChange={(e) => setAssignedAt(e.target.value)}
                  placeholder="YYYY-MM-DD HH:mm"
                  className="w-full pl-9 pr-3 py-2 text-sm bg-amber-50/60 border border-amber-300 text-amber-900 rounded-lg focus:outline-hidden focus:border-amber-500 font-mono text-xs"
                />
              </div>
              <div className="text-2xs text-slate-400 mt-1">
                記錄當下接獲交辦的時間
              </div>
            </div>

            {/* Priority & Deadline */}
            <div className="sm:col-span-4">
              <label className="block text-xs font-medium text-slate-600 mb-1">
                緊急程度
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as 'urgent' | 'high' | 'normal')}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-rose-500 font-medium"
              >
                <option value="urgent">⚡ 特急件 (立刻辦理)</option>
                <option value="high">🔥 高度優先 (今日必達)</option>
                <option value="normal">📋 一般交辦 (依序處理)</option>
              </select>
            </div>
          </div>

          {/* Task Content */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              交辦事項內容 <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={2}
              value={content}
              onFocus={handleContentFocus}
              onChange={(e) => setContent(e.target.value)}
              placeholder="請詳細記錄交辦內容、具體產出目標、對齊關鍵..."
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-rose-500 focus:bg-white resize-none"
            />
          </div>

          {/* Deadline & Notes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-medium text-slate-600">
                  完成期限 (Deadline)
                </label>
                <div className="flex gap-1 text-2xs">
                  <button
                    type="button"
                    onClick={() => handleQuickDeadline('today')}
                    className="text-rose-600 hover:underline"
                  >
                    今日下班
                  </button>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={() => handleQuickDeadline('tomorrow')}
                    className="text-blue-600 hover:underline"
                  >
                    明日中午
                  </button>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={() => handleQuickDeadline('friday')}
                    className="text-indigo-600 hover:underline"
                  >
                    本週五
                  </button>
                </div>
              </div>
              <input
                type="text"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                placeholder="例如：2026-09-05 18:00 (今日下班前)"
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-rose-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                備註說明 (選填)
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="相關對象、傳閱附件或注意細節"
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-rose-500 focus:bg-white"
              />
            </div>
          </div>

          <div className="flex justify-end pt-1">
            <button
              type="submit"
              className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>新增交辦事項</span>
            </button>
          </div>
        </form>
      </div>

      {/* Task List Header & Filter */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-500" />
            <h3 className="text-sm font-bold text-slate-800">交辦事項清單</h3>
          </div>
          <div className="flex gap-1 bg-slate-100 p-1 rounded-lg text-xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                filter === 'all' ? 'bg-white text-slate-800 shadow-2xs' : 'text-slate-600'
              }`}
            >
              全部 ({urgentTasks.length})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                filter === 'pending' ? 'bg-rose-50 text-rose-700 font-bold shadow-2xs' : 'text-slate-600'
              }`}
            >
              待處理 ({pendingCount})
            </button>
            <button
              onClick={() => setFilter('in-progress')}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                filter === 'in-progress' ? 'bg-blue-50 text-blue-700 font-bold shadow-2xs' : 'text-slate-600'
              }`}
            >
              處理中 ({inProgressCount})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                filter === 'completed' ? 'bg-emerald-50 text-emerald-700 font-bold shadow-2xs' : 'text-slate-600'
              }`}
            >
              已完成了結 ({completedCount})
            </button>
          </div>
        </div>

        {/* Task Cards */}
        <div className="p-5 space-y-3 divide-y divide-slate-100">
          {filteredTasks.length === 0 ? (
            <div className="py-10 text-center text-slate-400 text-sm">
              目前沒有符合條件的交辦事項
            </div>
          ) : (
            filteredTasks.map((task) => {
              const isCompleted = task.status === 'completed';
              const isInProgress = task.status === 'in-progress';
              const isPending = task.status === 'pending';

              return (
                <div
                  key={task.id}
                  className={`pt-3 first:pt-0 rounded-xl p-4 transition-all border ${
                    isCompleted
                      ? 'bg-slate-50/70 border-slate-200 opacity-80'
                      : isInProgress
                      ? 'bg-blue-50/30 border-blue-200 shadow-2xs'
                      : 'bg-white border-rose-200/90 shadow-2xs'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-1.5 flex-1">
                      {/* Top tags row */}
                      <div className="flex items-center gap-2 flex-wrap text-xs">
                        <span className="px-2 py-0.5 rounded-md font-bold bg-slate-800 text-white flex items-center gap-1">
                          <UserCheck className="w-3 h-3 text-amber-300" />
                          {task.assigner}
                        </span>

                        <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 font-mono text-2xs font-semibold flex items-center gap-1">
                          <Clock className="w-3 h-3 text-amber-600" />
                          接獲：{task.assignedAt}
                        </span>

                        {task.deadline && (
                          <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200 font-medium flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-rose-500" />
                            期限：{task.deadline}
                          </span>
                        )}

                        <span
                          className={`px-2 py-0.5 rounded-full font-semibold ${
                            isCompleted
                              ? 'bg-emerald-100 text-emerald-800'
                              : isInProgress
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-rose-100 text-rose-800 animate-pulse'
                          }`}
                        >
                          {isCompleted
                            ? '✅ 已完成'
                            : isInProgress
                            ? '⚡ 處理中'
                            : '🚨 待處理'}
                        </span>
                      </div>

                      {/* Content */}
                      <p
                        className={`text-sm leading-relaxed ${
                          isCompleted
                            ? 'line-through text-slate-400'
                            : 'font-medium text-slate-800'
                        }`}
                      >
                        {task.content}
                      </p>

                      {/* Notes & Completed time */}
                      <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap">
                        {task.notes && (
                          <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                            備註：{task.notes}
                          </span>
                        )}
                        {task.completedAt && (
                          <span className="text-emerald-600">
                            完成於：{task.completedAt}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-start">
                      {isPending && (
                        <button
                          onClick={() => handleUpdateStatus(task.id, 'in-progress')}
                          className="px-2.5 py-1 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-md transition-colors flex items-center gap-1"
                        >
                          <PlayCircle className="w-3.5 h-3.5" />
                          <span>開始處理</span>
                        </button>
                      )}

                      {!isCompleted && (
                        <button
                          onClick={() => handleUpdateStatus(task.id, 'completed')}
                          className="px-2.5 py-1 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-md transition-colors flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>完結交差</span>
                        </button>
                      )}

                      {isCompleted && (
                        <button
                          onClick={() => handleUpdateStatus(task.id, 'pending')}
                          className="px-2 py-1 text-xs text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                        >
                          重啟
                        </button>
                      )}

                      <button
                        onClick={() => handleCopyTask(task)}
                        className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-100 transition-colors"
                        title="複製事項內容"
                      >
                        {copiedId === task.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>

                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-md hover:bg-rose-50 transition-colors"
                        title="刪除"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
