import React, { useRef } from 'react';
import { 
  BookOpen, 
  Download, 
  Upload, 
  RotateCcw, 
  CheckCircle2, 
  FileCode,
  FileDown
} from 'lucide-react';
import { NotebookData } from '../types';
import { exportDataAsJSON, importDataFromJSON } from '../utils/storage';
import { generateSingleFileHtml } from '../utils/standaloneHtmlGenerator';

interface HeaderProps {
  data: NotebookData;
  onDataChange: (newData: NotebookData) => void;
  onResetDefault: () => void;
  onOpenCodeModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  data,
  onDataChange,
  onResetDefault,
  onOpenCodeModal,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    exportDataAsJSON(data);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (window.confirm('確定要匯入此備份檔嗎？目前的資料將會被備份內容更新。')) {
      try {
        const importedData = await importDataFromJSON(file);
        onDataChange(importedData);
        alert('資料備份已成功還原！');
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : '未知錯誤';
        alert(`匯入失敗：${message}`);
      }
    }
    // reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDownloadSingleFileHtml = () => {
    const htmlContent = generateSingleFileHtml();
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'personal_notebook.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const formattedSaveTime = data.lastSaved
    ? new Date(data.lastSaved).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    : '剛才';

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-sm">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold text-slate-800 tracking-tight">
                全功能個人記事本
              </h1>
              <span className="hidden sm:inline-block text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md font-medium border border-blue-200">
                Single-File App
              </span>
            </div>
            <p className="text-xs text-slate-500">
              整合待辦 • 工作計劃 • 專案 • 感恩 • 讀書記錄 • 速記
            </p>
          </div>
        </div>

        {/* Actions & Save status */}
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 px-2 py-1 bg-slate-50 rounded-md border border-slate-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>已自動儲存 ({formattedSaveTime})</span>
          </div>

          {/* JSON Export */}
          <button
            id="btn-export-json"
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs"
            title="將所有資料打包下載為 JSON 檔案"
          >
            <Download className="w-3.5 h-3.5 text-slate-600" />
            <span>匯出備份 (JSON)</span>
          </button>

          {/* JSON Import */}
          <button
            id="btn-import-json"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs"
            title="上傳先前匯出的 JSON 檔進行還原"
          >
            <Upload className="w-3.5 h-3.5 text-slate-600" />
            <span>匯入備份</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            className="hidden"
            onChange={handleFileChange}
          />

          {/* Download Single-File HTML */}
          <button
            id="btn-download-single-html"
            onClick={handleDownloadSingleFileHtml}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-2xs"
            title="直接下載可離線獨立運行的 single-file HTML 檔案"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>下載單檔 HTML</span>
          </button>

          {/* View/Copy Single-File Code */}
          <button
            id="btn-view-code"
            onClick={onOpenCodeModal}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            title="檢視並一鍵複製完整的 Single-file HTML 程式碼"
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>複製單檔程式碼</span>
          </button>

          {/* Reset */}
          <button
            id="btn-reset-data"
            onClick={() => {
              if (window.confirm('確定要清除自訂內容並重設回預設範例資料嗎？')) {
                onResetDefault();
              }
            }}
            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition-colors"
            title="重設回預設範例"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
