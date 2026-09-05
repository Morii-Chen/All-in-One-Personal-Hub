import React, { useState } from 'react';
import { 
  Briefcase, 
  Plus, 
  Trash2, 
  Check, 
  CheckCircle2, 
  Clock, 
  Calendar,
  Layers,
  ChevronDown
} from 'lucide-react';
import { ProjectItem, ProjectStage } from '../types';

interface ProjectSectionProps {
  projects: ProjectItem[];
  onChange: (projects: ProjectItem[]) => void;
}

export const ProjectSection: React.FC<ProjectSectionProps> = ({ projects, onChange }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [stagesInput, setStagesInput] = useState('');
  const [newStageTexts, setNewStageTexts] = useState<Record<string, string>>({});

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const stages: ProjectStage[] = stagesInput
      ? stagesInput
          .split(/[,，\n]/)
          .map((s, idx) => ({
            id: `stage-${Date.now()}-${idx}`,
            title: s.trim(),
            completed: false,
          }))
          .filter((s) => s.title.length > 0)
      : [];

    const newProject: ProjectItem = {
      id: `proj-${Date.now()}`,
      name: name.trim(),
      description: description.trim(),
      status: 'in-progress',
      stages,
      targetDate: targetDate || undefined,
      createdAt: new Date().toISOString(),
    };

    onChange([newProject, ...projects]);
    setName('');
    setDescription('');
    setTargetDate('');
    setStagesInput('');
  };

  const handleStatusChange = (id: string, status: 'not-started' | 'in-progress' | 'completed') => {
    const updated = projects.map((p) => (p.id === id ? { ...p, status } : p));
    onChange(updated);
  };

  const handleToggleStage = (projectId: string, stageId: string) => {
    const updated = projects.map((p) => {
      if (p.id === projectId) {
        const nextStages = p.stages.map((s) =>
          s.id === stageId ? { ...s, completed: !s.completed } : s
        );
        // If all stages complete, we can suggest completed status
        const allCompleted = nextStages.length > 0 && nextStages.every((s) => s.completed);
        return {
          ...p,
          stages: nextStages,
          status: allCompleted ? ('completed' as const) : p.status,
        };
      }
      return p;
    });
    onChange(updated);
  };

  const handleAddStageToProject = (projectId: string) => {
    const text = newStageTexts[projectId]?.trim();
    if (!text) return;

    const updated = projects.map((p) => {
      if (p.id === projectId) {
        return {
          ...p,
          stages: [
            ...p.stages,
            { id: `stage-${Date.now()}`, title: text, completed: false },
          ],
        };
      }
      return p;
    });

    onChange(updated);
    setNewStageTexts((prev) => ({ ...prev, [projectId]: '' }));
  };

  const handleDeleteStage = (projectId: string, stageId: string) => {
    const updated = projects.map((p) => {
      if (p.id === projectId) {
        return {
          ...p,
          stages: p.stages.filter((s) => s.id !== stageId),
        };
      }
      return p;
    });
    onChange(updated);
  };

  const handleDeleteProject = (id: string) => {
    if (window.confirm('確定要刪除此專案嗎？')) {
      onChange(projects.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Add Project Form */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
        <h2 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-blue-600" />
          建立新專案
        </h2>
        <form onSubmit={handleAddProject} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-slate-500 mb-1">
                專案名稱
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="例如：生活與工作數位系統重整、年度閱讀計劃..."
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500 focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">
                預計完成日期
              </label>
              <input
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">
                專案目標說明
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="簡述專案目標與願景..."
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500 focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">
                初始階段任務 (以逗號分開)
              </label>
              <input
                type="text"
                value={stagesInput}
                onChange={(e) => setStagesInput(e.target.value)}
                placeholder="例如：需求訪談, 介面原型設計, 程式開發, 測試發佈"
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500 focus:bg-white"
              />
            </div>
          </div>

          <div className="flex justify-end pt-1">
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>建立專案</span>
            </button>
          </div>
        </form>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {projects.length === 0 ? (
          <div className="bg-white p-8 rounded-xl border border-slate-200 text-center text-slate-400 text-sm">
            目前尚無進行中的專案，點擊上方按鈕建立第一個專案吧！
          </div>
        ) : (
          projects.map((project) => {
            const totalStages = project.stages.length;
            const completedStages = project.stages.filter((s) => s.completed).length;
            const pct =
              totalStages > 0
                ? Math.round((completedStages / totalStages) * 100)
                : project.status === 'completed'
                ? 100
                : 0;

            const isDone = project.status === 'completed';
            const isInProg = project.status === 'in-progress';

            return (
              <div
                key={project.id}
                className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden"
              >
                {/* Project Header */}
                <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h3 className="text-base font-bold text-slate-800">
                        {project.name}
                      </h3>
                      {/* Status Tag */}
                      <span
                        className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                          isDone
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : isInProg
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}
                      >
                        {isDone ? '已完成' : isInProg ? '進行中' : '未開始'}
                      </span>
                      {project.targetDate && (
                        <span className="text-xs text-slate-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          期限: {project.targetDate}
                        </span>
                      )}
                    </div>
                    {project.description && (
                      <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                        {project.description}
                      </p>
                    )}
                  </div>

                  {/* Actions & Status Dropdown */}
                  <div className="flex items-center gap-2 shrink-0">
                    <select
                      value={project.status}
                      onChange={(e) =>
                        handleStatusChange(
                          project.id,
                          e.target.value as 'not-started' | 'in-progress' | 'completed'
                        )
                      }
                      className="text-xs px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-700 font-medium focus:outline-hidden focus:border-blue-500"
                    >
                      <option value="not-started">未開始</option>
                      <option value="in-progress">進行中</option>
                      <option value="completed">已完成</option>
                    </select>

                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="刪除專案"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="px-5 py-3 bg-slate-50/70 border-b border-slate-100 flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex justify-between text-xs text-slate-600 mb-1 font-medium">
                      <span>階段完成進度: {completedStages} / {totalStages} 個任務</span>
                      <span className="text-blue-600 font-bold">{pct}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Stages List */}
                <div className="p-5">
                  <div className="text-xs font-semibold text-slate-500 mb-2.5 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-slate-400" />
                    階段任務拆解
                  </div>

                  <div className="space-y-2">
                    {project.stages.map((stage) => (
                      <div
                        key={stage.id}
                        className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100/70 border border-slate-200/60 transition-colors"
                      >
                        <label className="flex items-center gap-2.5 cursor-pointer flex-1 min-w-0">
                          <input
                            type="checkbox"
                            checked={stage.completed}
                            onChange={() => handleToggleStage(project.id, stage.id)}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                          />
                          <span
                            className={`text-xs sm:text-sm truncate ${
                              stage.completed
                                ? 'line-through text-slate-400'
                                : 'text-slate-800'
                            }`}
                          >
                            {stage.title}
                          </span>
                        </label>
                        <button
                          onClick={() => handleDeleteStage(project.id, stage.id)}
                          className="text-slate-400 hover:text-rose-500 p-1 text-xs"
                          title="刪除此階段"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Add Stage Inline */}
                  <div className="mt-3 flex gap-2">
                    <input
                      type="text"
                      value={newStageTexts[project.id] || ''}
                      onChange={(e) =>
                        setNewStageTexts((prev) => ({
                          ...prev,
                          [project.id]: e.target.value,
                        }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddStageToProject(project.id);
                        }
                      }}
                      placeholder="新增此專案的下一階段任務..."
                      className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-blue-500 focus:bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => handleAddStageToProject(project.id)}
                      className="px-3 py-1.5 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-colors cursor-pointer"
                    >
                      加入階段
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
