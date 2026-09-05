import React from 'react';
import { 
  CheckSquare, 
  CalendarDays, 
  Briefcase, 
  Heart, 
  BookMarked, 
  FileText,
  AlertTriangle,
  Users
} from 'lucide-react';
import { TabId, NotebookData } from '../types';

interface NavbarProps {
  activeTab: TabId;
  onSelectTab: (tab: TabId) => void;
  data: NotebookData;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onSelectTab, data }) => {
  const pendingTodos = data.todos.filter(t => !t.completed).length;
  const urgentCount = (data.urgentTasks || []).filter(t => t.status !== 'completed').length;
  const totalWorkPlans = data.workPlan.length;
  const meetingsCount = (data.meetings || []).length;
  const activeProjects = data.projects.filter(p => p.status === 'in-progress').length;
  const readingBooks = data.books.filter(b => b.status === 'reading').length;

  const tabs = [
    {
      id: 'todo' as TabId,
      name: '每日待辦',
      icon: CheckSquare,
      badge: pendingTodos > 0 ? pendingTodos : undefined,
    },
    {
      id: 'urgent' as TabId,
      name: '老闆交辦',
      icon: AlertTriangle,
      badge: urgentCount > 0 ? urgentCount : undefined,
      badgeClass: 'bg-rose-100 text-rose-700 font-bold',
      highlight: urgentCount > 0,
    },
    {
      id: 'workplan' as TabId,
      name: '工作計劃',
      icon: CalendarDays,
      badge: totalWorkPlans > 0 ? totalWorkPlans : undefined,
    },
    {
      id: 'meetings' as TabId,
      name: '會議記錄',
      icon: Users,
      badge: meetingsCount > 0 ? meetingsCount : undefined,
    },
    {
      id: 'project' as TabId,
      name: '專案管理',
      icon: Briefcase,
      badge: activeProjects > 0 ? activeProjects : undefined,
    },
    {
      id: 'gratitude' as TabId,
      name: '感恩日誌',
      icon: Heart,
    },
    {
      id: 'reading' as TabId,
      name: '讀書記錄',
      icon: BookMarked,
      badge: readingBooks > 0 ? readingBooks : undefined,
    },
    {
      id: 'notes' as TabId,
      name: '隨手速記',
      icon: FileText,
    },
  ];

  return (
    <nav className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex space-x-1 sm:space-x-4 overflow-x-auto py-2 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-btn-${tab.id}`}
                onClick={() => onSelectTab(tab.id)}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-500'}`} />
                <span>{tab.name}</span>
                {tab.badge !== undefined && (
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
                      isActive
                        ? 'bg-blue-200 text-blue-800'
                        : tab.badgeClass || 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
