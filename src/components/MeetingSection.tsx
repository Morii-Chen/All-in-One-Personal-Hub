import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Trash2, 
  Calendar, 
  Clock, 
  Search, 
  CheckSquare, 
  Square, 
  Edit3, 
  Copy, 
  Check, 
  X, 
  ListChecks,
  ChevronDown,
  ChevronUp,
  FileText,
  RotateCcw,
  Save
} from 'lucide-react';
import { MeetingItem, MeetingActionItem } from '../types';

interface MeetingSectionProps {
  meetings: MeetingItem[];
  onChange: (meetings: MeetingItem[]) => void;
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

export const MeetingSection: React.FC<MeetingSectionProps> = ({
  meetings,
  onChange,
}) => {
  // New/Edit meeting form state
  const [title, setTitle] = useState('');
  const [dateTime, setDateTime] = useState(() => getCurrentDateTimeString());
  const [attendees, setAttendees] = useState('');
  const [content, setContent] = useState('');
  
  // Pending action items in form
  const [formActionItems, setFormActionItems] = useState<MeetingActionItem[]>([]);
  const [newActionTask, setNewActionTask] = useState('');
  const [newActionAssignee, setNewActionAssignee] = useState('');

  // Editing existing meeting state
  const [editingMeeting, setEditingMeeting] = useState<MeetingItem | null>(null);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleAddActionItemToForm = () => {
    if (!newActionTask.trim()) return;
    const newItem: MeetingActionItem = {
      id: `act-${Date.now()}`,
      task: newActionTask.trim(),
      assignee: newActionAssignee.trim() || '未指定',
      completed: false,
    };
    setFormActionItems([...formActionItems, newItem]);
    setNewActionTask('');
    setNewActionAssignee('');
  };

  const handleRemoveActionItemFromForm = (id: string) => {
    setFormActionItems(formActionItems.filter((item) => item.id !== id));
  };

  const handleCreateMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newMeeting: MeetingItem = {
      id: `meeting-${Date.now()}`,
      title: title.trim(),
      dateTime: dateTime.trim() || getCurrentDateTimeString(),
      attendees: attendees.trim() || '無記錄',
      content: content.trim(),
      actionItems: formActionItems,
      createdAt: new Date().toISOString(),
    };

    onChange([newMeeting, ...meetings]);
    setTitle('');
    setAttendees('');
    setContent('');
    setFormActionItems([]);
    setDateTime(getCurrentDateTimeString());
  };

  const handleStartEdit = (meeting: MeetingItem) => {
    setEditingMeeting(JSON.parse(JSON.stringify(meeting)));
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMeeting || !editingMeeting.title.trim()) return;

    const updated = meetings.map((m) => {
      if (m.id === editingMeeting.id) {
        return editingMeeting;
      }
      return m;
    });

    onChange(updated);
    setEditingMeeting(null);
  };

  const handleDeleteMeeting = (id: string) => {
    if (window.confirm('確定要刪除這筆會議記錄嗎？')) {
      onChange(meetings.filter((m) => m.id !== id));
    }
  };

  const handleToggleCardAction = (meetingId: string, actionId: string) => {
    const updated = meetings.map((m) => {
      if (m.id === meetingId) {
        return {
          ...m,
          actionItems: m.actionItems.map((a) =>
            a.id === actionId ? { ...a, completed: !a.completed } : a
          ),
        };
      }
      return m;
    });
    onChange(updated);
  };

  const handleCopyMeeting = (meeting: MeetingItem) => {
    const actionLines = meeting.actionItems.length
      ? '\n\n【行動指引與決議】\n' +
        meeting.actionItems
          .map((a, i) => `${i + 1}. [${a.completed ? '已落實' : '待執行'}] ${a.task} (負責人: ${a.assignee})`)
          .join('\n')
      : '';

    const text = `【會議記錄】${meeting.title}
時間：${meeting.dateTime}
與會人員：${meeting.attendees}

【討論重點】
${meeting.content}${actionLines}`;

    navigator.clipboard.writeText(text);
    setCopiedId(meeting.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filtered by search
  const filteredMeetings = meetings.filter((m) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const matchTitle = m.title.toLowerCase().includes(q);
    const matchAttendees = m.attendees.toLowerCase().includes(q);
    const matchContent = m.content.toLowerCase().includes(q);
    const matchActions = m.actionItems.some((a) =>
      a.task.toLowerCase().includes(q) || a.assignee.toLowerCase().includes(q)
    );
    return matchTitle || matchAttendees || matchContent || matchActions;
  });

  const totalActions = meetings.reduce((acc, m) => acc + m.actionItems.length, 0);
  const completedActions = meetings.reduce(
    (acc, m) => acc + m.actionItems.filter((a) => a.completed).length,
    0
  );

  return (
    <div className="space-y-6">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">已歸檔會議次數</span>
            <Users className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-slate-800 mt-1">{meetings.length} 場</div>
          <div className="text-xs text-slate-400 mt-1">累積會議紀要與討論</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">行動指引 (Action Items)</span>
            <ListChecks className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-bold text-indigo-600 mt-1">{totalActions} 項</div>
          <div className="text-xs text-slate-400 mt-1">會議決議待落實事項</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">行動指引達成率</span>
            <CheckSquare className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-emerald-600 mt-1">
            {totalActions > 0 ? Math.round((completedActions / totalActions) * 100) : 100}%
          </div>
          <div className="text-xs text-slate-400 mt-1">已落實 {completedActions} / {totalActions} 項</div>
        </div>
      </div>

      {/* New Meeting Form */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-600" />
            建立新會議記錄 (Meeting Notes)
          </h2>
          <span className="text-xs text-slate-500">
            記錄會議主題、人員、討論重點與行動指引
          </span>
        </div>

        <form onSubmit={handleCreateMeeting} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            {/* Title */}
            <div className="sm:col-span-7">
              <label className="block text-xs font-medium text-slate-600 mb-1">
                會議主題 <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="例如：Q3 業務專案進度追蹤週會、新客戶需求對齊..."
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500 focus:bg-white font-medium"
              />
            </div>

            {/* Date Time */}
            <div className="sm:col-span-5">
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-medium text-slate-600">
                  會議日期與時間
                </label>
                <button
                  type="button"
                  onClick={() => setDateTime(getCurrentDateTimeString())}
                  className="text-2xs text-blue-600 hover:underline flex items-center gap-0.5"
                >
                  <RotateCcw className="w-2.5 h-2.5" />
                  帶入現在時間
                </button>
              </div>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={dateTime}
                  onChange={(e) => setDateTime(e.target.value)}
                  placeholder="YYYY-MM-DD HH:mm"
                  className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500 focus:bg-white font-mono text-xs"
                />
              </div>
            </div>
          </div>

          {/* Attendees */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              與會人員
            </label>
            <input
              type="text"
              value={attendees}
              onChange={(e) => setAttendees(e.target.value)}
              placeholder="例如：David (主持)、Sarah、Alex、Emily"
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500 focus:bg-white"
            />
          </div>

          {/* Discussion Content */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              討論重點與會議紀要內容 <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="條列說明會議討論核心、共識、各方發言要點與備註..."
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500 focus:bg-white resize-vertical font-sans leading-relaxed"
            />
          </div>

          {/* Action Items Builder */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
              <ListChecks className="w-4 h-4 text-indigo-600" />
              行動指引 / 決議事項 (Action Items)
            </label>

            {/* Existing in form */}
            {formActionItems.length > 0 && (
              <div className="space-y-2 mb-3">
                {formActionItems.map((item, idx) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-800"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-2xs">
                        {idx + 1}
                      </span>
                      <span className="font-medium">{item.task}</span>
                      <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-normal">
                        負責人: {item.assignee}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveActionItemFromForm(item.id)}
                      className="text-slate-400 hover:text-rose-600 p-1 rounded"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Inputs to add new action item */}
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={newActionTask}
                onChange={(e) => setNewActionTask(e.target.value)}
                placeholder="待執行任務內容（例如：週五前產出初版規格）"
                className="flex-2 px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-indigo-500"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddActionItemToForm();
                  }
                }}
              />
              <input
                type="text"
                value={newActionAssignee}
                onChange={(e) => setNewActionAssignee(e.target.value)}
                placeholder="負責人（如：Alex）"
                className="flex-1 px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-indigo-500"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddActionItemToForm();
                  }
                }}
              />
              <button
                type="button"
                onClick={handleAddActionItemToForm}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1 shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>加入行動任務</span>
              </button>
            </div>
          </div>

          <div className="flex justify-end pt-1">
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>儲存會議記錄</span>
            </button>
          </div>
        </form>
      </div>

      {/* Meeting History List & Search */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-800">歷史會議記錄列表</h3>
            <span className="text-xs text-slate-400">({meetings.length} 筆)</span>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜尋主題、與會人員、決議..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500 focus:bg-white"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* List of Meetings */}
        <div className="p-5 space-y-4">
          {filteredMeetings.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-sm">
              {searchQuery ? `找不到與「${searchQuery}」相符的會議記錄` : '目前尚無任何會議記錄'}
            </div>
          ) : (
            filteredMeetings.map((meeting) => {
              const totalMAction = meeting.actionItems.length;
              const completedMAction = meeting.actionItems.filter((a) => a.completed).length;

              return (
                <div
                  key={meeting.id}
                  className="rounded-xl border border-slate-200 p-5 bg-white hover:border-slate-300 transition-all space-y-3.5 shadow-2xs"
                >
                  {/* Meeting Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div>
                      <h4 className="text-base font-bold text-slate-800">
                        {meeting.title}
                      </h4>
                      <div className="flex items-center gap-3 text-xs text-slate-500 mt-1 flex-wrap">
                        <span className="flex items-center gap-1 font-mono text-slate-600">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {meeting.dateTime}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-slate-400" />
                          與會：{meeting.attendees}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto">
                      <button
                        onClick={() => handleStartEdit(meeting)}
                        className="px-2.5 py-1 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-md transition-colors flex items-center gap-1 cursor-pointer"
                        title="編輯會議內容"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>編輯</span>
                      </button>

                      <button
                        onClick={() => handleCopyMeeting(meeting)}
                        className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-100 transition-colors"
                        title="複製完整會議摘要"
                      >
                        {copiedId === meeting.id ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>

                      <button
                        onClick={() => handleDeleteMeeting(meeting.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-md hover:bg-rose-50 transition-colors"
                        title="刪除會議"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Meeting Content */}
                  <div className="text-sm text-slate-700 whitespace-pre-line leading-relaxed bg-slate-50/70 p-3.5 rounded-lg border border-slate-100 font-sans">
                    {meeting.content}
                  </div>

                  {/* Action Items List */}
                  {meeting.actionItems.length > 0 && (
                    <div className="bg-indigo-50/40 border border-indigo-100 rounded-lg p-3 space-y-2">
                      <div className="flex items-center justify-between text-xs font-semibold text-indigo-900">
                        <span className="flex items-center gap-1.5">
                          <ListChecks className="w-4 h-4 text-indigo-600" />
                          行動指引與決議事項 ({completedMAction}/{totalMAction} 完成)
                        </span>
                        <span className="text-indigo-600 font-normal">
                          點擊核取方塊可直接更新狀態
                        </span>
                      </div>

                      <div className="space-y-1.5 pt-1">
                        {meeting.actionItems.map((action) => (
                          <div
                            key={action.id}
                            onClick={() => handleToggleCardAction(meeting.id, action.id)}
                            className={`flex items-center justify-between p-2 rounded-md border text-xs cursor-pointer transition-colors ${
                              action.completed
                                ? 'bg-emerald-50/60 border-emerald-200 text-slate-400'
                                : 'bg-white border-indigo-200/70 text-slate-800 hover:border-indigo-400'
                            }`}
                          >
                            <div className="flex items-center gap-2 flex-1">
                              {action.completed ? (
                                <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                              ) : (
                                <Square className="w-4 h-4 text-slate-400 shrink-0" />
                              )}
                              <span className={action.completed ? 'line-through' : 'font-medium'}>
                                {action.task}
                              </span>
                            </div>

                            <span
                              className={`text-2xs px-2 py-0.5 rounded-full font-medium shrink-0 ml-2 ${
                                action.completed
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-indigo-100 text-indigo-800'
                              }`}
                            >
                              負責人: {action.assignee}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Edit Meeting Modal */}
      {editingMeeting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in duration-150">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Edit3 className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-800">
                  編輯會議記錄
                </h3>
              </div>
              <button
                onClick={() => setEditingMeeting(null)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-6 space-y-4 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-7">
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    會議主題
                  </label>
                  <input
                    type="text"
                    required
                    value={editingMeeting.title}
                    onChange={(e) => setEditingMeeting({ ...editingMeeting, title: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500 focus:bg-white font-medium"
                  />
                </div>
                <div className="sm:col-span-5">
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    會議日期與時間
                  </label>
                  <input
                    type="text"
                    required
                    value={editingMeeting.dateTime}
                    onChange={(e) => setEditingMeeting({ ...editingMeeting, dateTime: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500 focus:bg-white font-mono text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  與會人員
                </label>
                <input
                  type="text"
                  value={editingMeeting.attendees}
                  onChange={(e) => setEditingMeeting({ ...editingMeeting, attendees: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  討論重點內容
                </label>
                <textarea
                  required
                  rows={5}
                  value={editingMeeting.content}
                  onChange={(e) => setEditingMeeting({ ...editingMeeting, content: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500 focus:bg-white resize-vertical leading-relaxed"
                />
              </div>

              {/* Action items in editing modal */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
                <label className="block text-xs font-bold text-slate-700">
                  行動指引與決議
                </label>
                {editingMeeting.actionItems.map((action, idx) => (
                  <div key={action.id} className="flex items-center gap-2 bg-white p-2 rounded border border-slate-200 text-xs">
                    <input
                      type="checkbox"
                      checked={action.completed}
                      onChange={(e) => {
                        const updatedActions = editingMeeting.actionItems.map((a, i) =>
                          i === idx ? { ...a, completed: e.target.checked } : a
                        );
                        setEditingMeeting({ ...editingMeeting, actionItems: updatedActions });
                      }}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <input
                      type="text"
                      value={action.task}
                      onChange={(e) => {
                        const updatedActions = editingMeeting.actionItems.map((a, i) =>
                          i === idx ? { ...a, task: e.target.value } : a
                        );
                        setEditingMeeting({ ...editingMeeting, actionItems: updatedActions });
                      }}
                      className="flex-1 px-2 py-1 bg-slate-50 border border-slate-200 rounded text-xs"
                      placeholder="任務內容"
                    />
                    <input
                      type="text"
                      value={action.assignee}
                      onChange={(e) => {
                        const updatedActions = editingMeeting.actionItems.map((a, i) =>
                          i === idx ? { ...a, assignee: e.target.value } : a
                        );
                        setEditingMeeting({ ...editingMeeting, actionItems: updatedActions });
                      }}
                      className="w-24 px-2 py-1 bg-slate-50 border border-slate-200 rounded text-xs"
                      placeholder="負責人"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updatedActions = editingMeeting.actionItems.filter((_, i) => i !== idx);
                        setEditingMeeting({ ...editingMeeting, actionItems: updatedActions });
                      }}
                      className="text-slate-400 hover:text-rose-600 p-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => {
                    const newItem: MeetingActionItem = {
                      id: `act-${Date.now()}`,
                      task: '新行動任務',
                      assignee: '未指定',
                      completed: false,
                    };
                    setEditingMeeting({
                      ...editingMeeting,
                      actionItems: [...editingMeeting.actionItems, newItem],
                    });
                  }}
                  className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-medium pt-1"
                >
                  <Plus className="w-3 h-3" />
                  新增一項行動指引
                </button>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setEditingMeeting(null)}
                  className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>儲存變更</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
