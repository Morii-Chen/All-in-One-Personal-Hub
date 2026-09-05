import React, { useState } from 'react';
import { 
  BookMarked, 
  Plus, 
  Trash2, 
  Quote, 
  CheckCircle, 
  BookOpen, 
  Star,
  Sparkles,
  Edit3,
  X,
  Save
} from 'lucide-react';
import { BookItem } from '../types';

interface ReadingSectionProps {
  books: BookItem[];
  onChange: (books: BookItem[]) => void;
}

export const ReadingSection: React.FC<ReadingSectionProps> = ({ books, onChange }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(300);
  const [status, setStatus] = useState<'reading' | 'completed' | 'plan-to-read'>('reading');
  const [quotes, setQuotes] = useState('');
  const [notes, setNotes] = useState('');
  const [filter, setFilter] = useState<'all' | 'reading' | 'completed' | 'plan-to-read'>('all');
  
  // Edit Modal state
  const [editingBook, setEditingBook] = useState<BookItem | null>(null);

  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newBook: BookItem = {
      id: `book-${Date.now()}`,
      title: title.trim(),
      author: author.trim() || '佚名',
      currentPage: Math.max(0, currentPage),
      totalPages: Math.max(1, totalPages),
      status: currentPage >= totalPages ? 'completed' : status,
      rating: 5,
      notes: notes.trim(),
      quotes: quotes.trim(),
      lastUpdated: new Date().toISOString(),
    };

    onChange([newBook, ...books]);
    setTitle('');
    setAuthor('');
    setCurrentPage(0);
    setTotalPages(300);
    setQuotes('');
    setNotes('');
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBook || !editingBook.title.trim()) return;

    const updated = books.map((b) => {
      if (b.id === editingBook.id) {
        return {
          ...editingBook,
          title: editingBook.title.trim(),
          author: editingBook.author.trim() || '佚名',
          currentPage: Math.max(0, editingBook.currentPage),
          totalPages: Math.max(1, editingBook.totalPages),
          status: editingBook.currentPage >= editingBook.totalPages ? ('completed' as const) : editingBook.status,
          lastUpdated: new Date().toISOString(),
        };
      }
      return b;
    });

    onChange(updated);
    setEditingBook(null);
  };

  const handleUpdatePage = (id: string, delta: number) => {
    const updated = books.map((b) => {
      if (b.id === id) {
        const nextCurrent = Math.min(b.totalPages, Math.max(0, b.currentPage + delta));
        return {
          ...b,
          currentPage: nextCurrent,
          status: nextCurrent >= b.totalPages ? ('completed' as const) : b.status,
          lastUpdated: new Date().toISOString(),
        };
      }
      return b;
    });
    onChange(updated);
  };

  const handleSetStatus = (id: string, newStatus: 'reading' | 'completed' | 'plan-to-read') => {
    const updated = books.map((b) => {
      if (b.id === id) {
        return {
          ...b,
          status: newStatus,
          currentPage: newStatus === 'completed' ? b.totalPages : b.currentPage,
          lastUpdated: new Date().toISOString(),
        };
      }
      return b;
    });
    onChange(updated);
  };

  const handleDeleteBook = (id: string) => {
    if (window.confirm('確定要刪除這本書的記錄嗎？')) {
      onChange(books.filter((b) => b.id !== id));
    }
  };

  const filteredBooks = books.filter((b) => {
    if (filter === 'reading') return b.status === 'reading';
    if (filter === 'completed') return b.status === 'completed';
    if (filter === 'plan-to-read') return b.status === 'plan-to-read';
    return true;
  });

  const readingCount = books.filter((b) => b.status === 'reading').length;
  const completedCount = books.filter((b) => b.status === 'completed').length;

  return (
    <div className="space-y-6">
      {/* Overview stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-medium text-slate-500">藏書與閱讀總計</span>
          <div className="text-2xl font-bold text-slate-800 mt-1">{books.length} 本</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-medium text-slate-500">正在閱讀中</span>
          <div className="text-2xl font-bold text-blue-600 mt-1">{readingCount} 本</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-medium text-slate-500">已完讀好書</span>
          <div className="text-2xl font-bold text-emerald-600 mt-1">{completedCount} 本</div>
        </div>
      </div>

      {/* Add Book Form */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
        <h2 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-blue-600" />
          新增讀書記錄
        </h2>
        <form onSubmit={handleAddBook} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-slate-500 mb-1">書名</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="例如：原子習慣、深度工作力、原則..."
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500 focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">作者</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="作者姓名"
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500 focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">目前進度頁數</label>
              <input
                type="number"
                min={0}
                value={currentPage}
                onChange={(e) => setCurrentPage(parseInt(e.target.value) || 0)}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">書籍總頁數</label>
              <input
                type="number"
                min={1}
                value={totalPages}
                onChange={(e) => setTotalPages(parseInt(e.target.value) || 1)}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">閱讀狀態</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as 'reading' | 'completed' | 'plan-to-read')}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500"
              >
                <option value="reading">📖 閱讀中</option>
                <option value="completed">✅ 已讀完</option>
                <option value="plan-to-read">⏳ 待閱讀</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">觸動心靈的佳句選錄</label>
            <input
              type="text"
              value={quotes}
              onChange={(e) => setQuotes(e.target.value)}
              placeholder="例如：「你不會躍升到你設定的目標水準，而是會沉淪到你設定的系統水準。」"
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">閱讀心得與重點思考</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              placeholder="寫下這本書帶給你的核心洞察、反思或可在日常實踐的行動..."
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500 focus:bg-white resize-none"
            />
          </div>

          <div className="flex justify-end pt-1">
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>加入書單</span>
            </button>
          </div>
        </form>
      </div>

      {/* Book List Header & Filter */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <BookMarked className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-800">閱讀清單庫</h3>
          </div>
          <div className="flex gap-1 bg-slate-100 p-1 rounded-lg text-xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                filter === 'all' ? 'bg-white text-slate-800 shadow-2xs' : 'text-slate-600'
              }`}
            >
              全部 ({books.length})
            </button>
            <button
              onClick={() => setFilter('reading')}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                filter === 'reading' ? 'bg-white text-slate-800 shadow-2xs' : 'text-slate-600'
              }`}
            >
              閱讀中 ({readingCount})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                filter === 'completed' ? 'bg-white text-slate-800 shadow-2xs' : 'text-slate-600'
              }`}
            >
              已讀完 ({completedCount})
            </button>
          </div>
        </div>

        {/* Book Cards */}
        <div className="divide-y divide-slate-100 p-5 space-y-4">
          {filteredBooks.length === 0 ? (
            <div className="py-8 text-center text-slate-400 text-sm">
              沒有符合條件的書籍記錄
            </div>
          ) : (
            filteredBooks.map((book) => {
              const pct =
                book.totalPages > 0
                  ? Math.min(100, Math.round((book.currentPage / book.totalPages) * 100))
                  : 0;

              return (
                <div
                  key={book.id}
                  className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-base font-bold text-slate-800">
                          {book.title}
                        </h4>
                        <span className="text-xs text-slate-500">
                          / {book.author}
                        </span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            book.status === 'completed'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : book.status === 'reading'
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {book.status === 'completed'
                            ? '已讀完'
                            : book.status === 'reading'
                            ? '閱讀中'
                            : '待閱讀'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleUpdatePage(book.id, 10)}
                        className="text-xs px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-medium transition-colors"
                        title="增加 10 頁進度"
                      >
                        +10 頁
                      </button>
                      <button
                        onClick={() => handleUpdatePage(book.id, 1)}
                        className="text-xs px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-medium transition-colors"
                        title="增加 1 頁進度"
                      >
                        +1 頁
                      </button>
                      {book.status !== 'completed' && (
                        <button
                          onClick={() => handleSetStatus(book.id, 'completed')}
                          className="text-xs px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-md font-medium transition-colors"
                        >
                          完讀
                        </button>
                      )}
                      <button
                        onClick={() => setEditingBook(book)}
                        className="flex items-center gap-1 text-xs px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-md font-medium transition-colors cursor-pointer"
                        title="編輯書名、進度、心得與佳句"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>編輯</span>
                      </button>
                      <button
                        onClick={() => handleDeleteBook(book.id)}
                        className="p-1 text-slate-400 hover:text-rose-600 rounded-md transition-colors"
                        title="刪除此書"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div>
                    <div className="flex justify-between text-xs text-slate-600 mb-1">
                      <span>
                        進度：第 {book.currentPage} / {book.totalPages} 頁
                      </span>
                      <span className="font-bold text-blue-600">{pct}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>

                  {/* Quote */}
                  {book.quotes && (
                    <div className="p-3 bg-blue-50/70 border-l-3 border-blue-500 rounded-r-lg">
                      <p className="text-xs text-blue-900 italic flex items-start gap-1.5 leading-relaxed">
                        <Quote className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                        <span>{book.quotes}</span>
                      </p>
                    </div>
                  )}

                  {/* Notes */}
                  {book.notes && (
                    <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg leading-relaxed">
                      <span className="font-semibold text-slate-700 block mb-1">
                        閱讀筆記心得：
                      </span>
                      {book.notes}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Edit Book Modal */}
      {editingBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in duration-150">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Edit3 className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-800">
                  編輯讀書記錄
                </h3>
              </div>
              <button
                onClick={() => setEditingBook(null)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-6 space-y-4 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-600 mb-1">書名</label>
                  <input
                    type="text"
                    required
                    value={editingBook.title}
                    onChange={(e) => setEditingBook({ ...editingBook, title: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">作者</label>
                  <input
                    type="text"
                    value={editingBook.author}
                    onChange={(e) => setEditingBook({ ...editingBook, author: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">目前進度頁數</label>
                  <input
                    type="number"
                    min={0}
                    value={editingBook.currentPage}
                    onChange={(e) => setEditingBook({ ...editingBook, currentPage: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">書籍總頁數</label>
                  <input
                    type="number"
                    min={1}
                    value={editingBook.totalPages}
                    onChange={(e) => setEditingBook({ ...editingBook, totalPages: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">閱讀狀態</label>
                  <select
                    value={editingBook.status}
                    onChange={(e) => setEditingBook({ ...editingBook, status: e.target.value as 'reading' | 'completed' | 'plan-to-read' })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500"
                  >
                    <option value="reading">📖 閱讀中</option>
                    <option value="completed">✅ 已讀完</option>
                    <option value="plan-to-read">⏳ 待閱讀</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">佳句選錄</label>
                <input
                  type="text"
                  value={editingBook.quotes}
                  onChange={(e) => setEditingBook({ ...editingBook, quotes: e.target.value })}
                  placeholder="金句摘抄"
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">閱讀心得與重點思考</label>
                <textarea
                  value={editingBook.notes}
                  onChange={(e) => setEditingBook({ ...editingBook, notes: e.target.value })}
                  rows={4}
                  placeholder="閱讀筆記與反思應用..."
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500 focus:bg-white resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setEditingBook(null)}
                  className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>儲存修改</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
