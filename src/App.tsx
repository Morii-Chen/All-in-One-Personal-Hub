import React, { useState, useEffect } from 'react';
import { TabId, NotebookData } from './types';
import { loadDataFromStorage, saveDataToStorage } from './utils/storage';
import { defaultNotebookData } from './data/defaultData';
import { Header } from './components/Header';
import { Navbar } from './components/Navbar';
import { TodoSection } from './components/TodoSection';
import { UrgentTaskSection } from './components/UrgentTaskSection';
import { WorkPlanSection } from './components/WorkPlanSection';
import { MeetingSection } from './components/MeetingSection';
import { ProjectSection } from './components/ProjectSection';
import { GratitudeSection } from './components/GratitudeSection';
import { ReadingSection } from './components/ReadingSection';
import { QuickNotesSection } from './components/QuickNotesSection';
import { SingleFileModal } from './components/SingleFileModal';

export default function App() {
  const [data, setData] = useState<NotebookData>(() => loadDataFromStorage());
  const [activeTab, setActiveTab] = useState<TabId>('todo');
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);

  // Sync to localStorage whenever data changes
  useEffect(() => {
    saveDataToStorage(data);
  }, [data]);

  const handleDataChange = (newData: NotebookData) => {
    setData(newData);
    saveDataToStorage(newData);
  };

  const handleResetDefault = () => {
    setData(defaultNotebookData);
    saveDataToStorage(defaultNotebookData);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Top Header */}
      <Header
        data={data}
        onDataChange={handleDataChange}
        onResetDefault={handleResetDefault}
        onOpenCodeModal={() => setIsCodeModalOpen(true)}
      />

      {/* Navigation Tabs */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        data={data}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {activeTab === 'todo' && (
          <TodoSection
            todos={data.todos}
            onChange={(todos) => handleDataChange({ ...data, todos })}
          />
        )}

        {activeTab === 'urgent' && (
          <UrgentTaskSection
            urgentTasks={data.urgentTasks || []}
            onChange={(urgentTasks) => handleDataChange({ ...data, urgentTasks })}
          />
        )}

        {activeTab === 'workplan' && (
          <WorkPlanSection
            workPlans={data.workPlan}
            onChange={(workPlan) => handleDataChange({ ...data, workPlan })}
          />
        )}

        {activeTab === 'meetings' && (
          <MeetingSection
            meetings={data.meetings || []}
            onChange={(meetings) => handleDataChange({ ...data, meetings })}
          />
        )}

        {activeTab === 'project' && (
          <ProjectSection
            projects={data.projects}
            onChange={(projects) => handleDataChange({ ...data, projects })}
          />
        )}

        {activeTab === 'gratitude' && (
          <GratitudeSection
            gratitudeEntries={data.gratitude}
            onChange={(gratitude) => handleDataChange({ ...data, gratitude })}
          />
        )}

        {activeTab === 'reading' && (
          <ReadingSection
            books={data.books}
            onChange={(books) => handleDataChange({ ...data, books })}
          />
        )}

        {activeTab === 'notes' && (
          <QuickNotesSection
            notes={data.quickNotes}
            onChange={(quickNotes) => handleDataChange({ ...data, quickNotes })}
          />
        )}
      </main>

      {/* Clean Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>全功能個人記事本 • 所有資料自動保存在本機瀏覽器 (localStorage)</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCodeModalOpen(true)}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              獲取單檔 HTML 代碼
            </button>
            <span>•</span>
            <span>支援離線使用與 JSON 雙向備份</span>
          </div>
        </div>
      </footer>

      {/* Modal for viewing & copying standalone single-file HTML */}
      <SingleFileModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
      />
    </div>
  );
}
