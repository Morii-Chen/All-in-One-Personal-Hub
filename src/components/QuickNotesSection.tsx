import React, { useRef, useState } from 'react';
import { 
  FileText, 
  Copy, 
  Check, 
  Clock, 
  Trash2, 
  Save, 
  Sparkles,
  Maximize2
} from 'lucide-react';

interface QuickNotesSectionProps {
  notes: string;
  onChange: (notes: string) => void;
}

export const QuickNotesSection: React.FC<QuickNotesSectionProps> = ({ notes, onChange }) => {
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(notes);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      if (textareaRef.current) {
        textareaRef.current.select();
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  const handleInsertTimestamp = () => {
    const now = new Date();
    const timeStr = `\n[${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
      now.getDate()
    ).padStart(2, '0')} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}] `;

    if (textareaRef.current) {
      const el = textareaRef.current;
      const start = el.selectionStart;
      const end = el.selectionEnd;
      const updated = notes.substring(0, start) + timeStr + notes.substring(end);
      onChange(updated);
      setTimeout(() => {
        el.focus();
        el.selectionStart = el.selectionEnd = start + timeStr.length;
      }, 0);
    } else {
      onChange(notes + timeStr);
    }
  };

  const handleClear = () => {
    if (window.confirm('確定要清空隨手速記的所有內容嗎？')) {
      onChange('');
    }
  };

  const charCount = notes.length;
  const lineCount = notes ? notes.split('\n').length : 0;

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="px-5 py-3 border-b border-slate-200 bg-slate-50/50 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-800">隨手速記與想法備忘</h3>
            <span className="text-xs bg-slate-200/70 text-slate-600 px-2 py-0.5 rounded-md font-mono">
              無格式限制
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Timestamp */}
            <button
              onClick={handleInsertTimestamp}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg transition-colors cursor-pointer shadow-2xs"
              title="在游標處插入當前日期與時間"
            >
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>插入時間戳</span>
            </button>

            {/* Copy */}
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg transition-colors cursor-pointer shadow-2xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600 font-semibold">已複製</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>複製全文</span>
                </>
              )}
            </button>

            {/* Clear */}
            <button
              onClick={handleClear}
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
              title="清空速記"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Textarea */}
        <div className="p-4 flex-1">
          <textarea
            ref={textareaRef}
            value={notes}
            onChange={(e) => onChange(e.target.value)}
            placeholder="在這裡自由貼上會議紀錄、臨時網址、靈感點子、購物清單或代辦備忘... (隨打隨自動存檔)"
            className="w-full h-[450px] p-4 text-sm text-slate-800 bg-slate-50/40 border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-500 focus:bg-white resize-y font-normal leading-relaxed tracking-wide placeholder:text-slate-400"
          />
        </div>

        {/* Status bar */}
        <div className="px-5 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
          <div className="flex items-center gap-4">
            <span>{charCount} 個字元</span>
            <span>{lineCount} 行</span>
          </div>
          <div className="text-[11px] text-slate-400 flex items-center gap-1 font-sans">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            所有編輯即時同步至本機 localStorage
          </div>
        </div>
      </div>
    </div>
  );
};
