import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Check, 
  Calendar, 
  AlertCircle,
  CheckCircle,
  Filter
} from 'lucide-react';
import { TodoItem } from '../types';

interface TodoSectionProps {
  todos: TodoItem[];
  onChange: (todos: TodoItem[]) => void;
}

export const TodoSection: React.FC<TodoSectionProps> = ({ todos, onChange }) => {
  const [inputText, setInputText] = useState('');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newTodo: TodoItem = {
      id: `todo-${Date.now()}`,
      text: inputText.trim(),
      completed: false,
      priority,
      dueDate: dueDate || undefined,
      createdAt: new Date().toISOString(),
    };

    onChange([newTodo, ...todos]);
    setInputText('');
  };

  const handleToggle = (id: string) => {
    const updated = todos.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    onChange(updated);
  };

  const handleDelete = (id: string) => {
    const updated = todos.filter((t) => t.id !== id);
    onChange(updated);
  };

  const handleClearCompleted = () => {
    const updated = todos.filter((t) => !t.completed);
    onChange(updated);
  };

  const filteredTodos = todos.filter((t) => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const totalCount = todos.length;
  const completedCount = todos.filter((t) => t.completed).length;
  const progressPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Overview & Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-medium text-slate-500">待辦總計</span>
          <div className="text-2xl font-bold text-slate-800 mt-1">{totalCount} 項</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-medium text-slate-500">已完成</span>
          <div className="text-2xl font-bold text-emerald-600 mt-1">{completedCount} 項</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-slate-500">完成進度</span>
            <span className="text-xs font-bold text-blue-600">{progressPct}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5 mt-3 overflow-hidden">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Add Todo Form */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
        <h2 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
          <Plus className="w-4 h-4 text-blue-600" />
          新增待辦事項
        </h2>
        <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-3">
          <input
            id="input-new-todo"
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="請輸入今天需要處理的待辦任務..."
            className="flex-1 px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500 focus:bg-white transition-all"
          />
          <div className="flex gap-2">
            <select
              id="select-todo-priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as 'high' | 'medium' | 'low')}
              className="px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500 text-slate-700"
            >
              <option value="high">🔥 高優先級</option>
              <option value="medium">⚡ 中優先級</option>
              <option value="low">🌱 低優先級</option>
            </select>
            <input
              id="input-todo-due"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500 text-slate-700"
            />
            <button
              id="btn-add-todo"
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs whitespace-nowrap cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>新增</span>
            </button>
          </div>
        </form>
      </div>

      {/* Todo List Header & Filter */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  filter === 'all' ? 'bg-white text-slate-800 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                全部 ({todos.length})
              </button>
              <button
                onClick={() => setFilter('active')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  filter === 'active' ? 'bg-white text-slate-800 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                待處理 ({todos.filter(t => !t.completed).length})
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  filter === 'completed' ? 'bg-white text-slate-800 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                已完成 ({completedCount})
              </button>
            </div>
          </div>

          {completedCount > 0 && (
            <button
              id="btn-clear-completed-todos"
              onClick={handleClearCompleted}
              className="text-xs text-rose-600 hover:text-rose-700 font-medium hover:underline cursor-pointer"
            >
              清除所有已完成
            </button>
          )}
        </div>

        {/* List Items */}
        <div className="divide-y divide-slate-100">
          {filteredTodos.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-sm">
              <CheckCircle className="w-8 h-8 mx-auto text-slate-300 mb-2" />
              沒有符合條件的待辦事項
            </div>
          ) : (
            filteredTodos.map((todo) => {
              const isHigh = todo.priority === 'high';
              const isMed = todo.priority === 'medium';
              return (
                <div
                  key={todo.id}
                  className={`p-4 flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors ${
                    todo.completed ? 'bg-slate-50/60' : ''
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <button
                      onClick={() => handleToggle(todo.id)}
                      className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                        todo.completed
                          ? 'bg-emerald-500 border-emerald-500 text-white'
                          : 'border-slate-300 hover:border-blue-500 bg-white'
                      }`}
                    >
                      {todo.completed && <Check className="w-3.5 h-3.5" />}
                    </button>

                    <div className="flex items-center gap-2 flex-wrap min-w-0">
                      <span
                        className={`text-sm break-all ${
                          todo.completed
                            ? 'line-through text-slate-400'
                            : 'text-slate-800 font-normal'
                        }`}
                      >
                        {todo.text}
                      </span>

                      {/* Priority Tag */}
                      <span
                        className={`text-[11px] px-2 py-0.5 rounded-md font-medium shrink-0 ${
                          isHigh
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : isMed
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}
                      >
                        {isHigh ? '高優先' : isMed ? '中優先' : '低優先'}
                      </span>

                      {/* Due Date */}
                      {todo.dueDate && (
                        <span className="text-[11px] text-slate-500 flex items-center gap-1 shrink-0 bg-slate-100 px-2 py-0.5 rounded-md">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          {todo.dueDate}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer shrink-0"
                    title="刪除"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
