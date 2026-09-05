import React, { useState } from 'react';
import { X, Copy, Check, Download, ExternalLink, Code } from 'lucide-react';
import { generateSingleFileHtml } from '../utils/standaloneHtmlGenerator';

interface SingleFileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SingleFileModal: React.FC<SingleFileModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  if (!isOpen) return null;

  const htmlCode = generateSingleFileHtml();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(htmlCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      alert('複製失敗，請手動全選下方文字框進行複製。');
    }
  };

  const handleDownload = () => {
    const blob = new Blob([htmlCode], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'personal_notebook.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in duration-150">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Code className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">
                單檔式 HTML 原始碼 (Single-file HTML App)
              </h3>
              <p className="text-xs text-slate-500">
                HTML + CSS + JavaScript 全部封裝在同一個檔案內，可直接存檔離線使用
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1 text-sm text-slate-700">
          {/* Quick instructions banner */}
          <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4 text-xs text-blue-900 space-y-1.5">
            <div className="font-bold flex items-center gap-1.5">
              <span>💡 如何存檔與使用？</span>
            </div>
            <ol className="list-decimal pl-4 space-y-1 text-blue-800">
              <li>
                點擊下方<strong>「下載 notebook.html」</strong>按鈕直接儲存到電腦；或是點擊<strong>「複製完整代碼」</strong>。
              </li>
              <li>
                若複製代碼：在電腦上新增一個文字文件，副檔名命名為 <code>notebook.html</code>，將程式碼貼上並存檔。
              </li>
              <li>
                雙擊開啟 <code>notebook.html</code>，即可在任何瀏覽器（Chrome、Edge、Safari）中直接運行！
              </li>
              <li>
                所有資料自動儲存在瀏覽器的 <code>localStorage</code>，重新整理或重啟電腦資料均完好保存。
              </li>
            </ol>
          </div>

          {/* Code Preview */}
          <div className="relative">
            <div className="flex justify-between items-center bg-slate-800 text-slate-300 text-xs px-4 py-2 rounded-t-lg font-mono">
              <span>personal_notebook.html (約 18 KB)</span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? '已複製到剪貼簿！' : '複製代碼'}</span>
              </button>
            </div>
            <textarea
              readOnly
              value={htmlCode}
              className="w-full h-64 p-3 bg-slate-900 text-slate-200 font-mono text-xs rounded-b-lg border-x border-b border-slate-800 resize-none select-all focus:outline-hidden"
              onClick={(e) => (e.target as HTMLTextAreaElement).select()}
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            包含 6 大功能模組與本機備份匯出入
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-600 font-bold">代碼已複製</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>複製完整代碼</span>
                </>
              )}
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-2 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Download className="w-4 h-4" />
              <span>直接下載 notebook.html</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
