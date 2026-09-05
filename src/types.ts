export type TabId = 
  | 'todo' 
  | 'urgent'
  | 'workplan' 
  | 'meetings'
  | 'project' 
  | 'gratitude' 
  | 'reading' 
  | 'notes';

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  dueDate?: string;
  createdAt: string;
}

export interface UrgentTaskItem {
  id: string;
  assigner: string; // 交辦人 (例如：老闆、李總、處長、窗口)
  content: string; // 交辦事項內容
  assignedAt: string; // 接收/交辦時間標記 (如：2026-09-05 14:30)
  deadline?: string; // 完成期限 (Deadline)
  status: 'pending' | 'in-progress' | 'completed'; // 待處理 / 處理中 / 已完成了結
  priority?: 'urgent' | 'high' | 'normal';
  notes?: string;
  completedAt?: string;
}

export interface WorkPlanItem {
  id: string;
  title: string;
  completed: boolean;
  progress: number; // 0 - 100
  category: 'daily' | 'weekly'; // 本日重點 vs 本週重點
  notes?: string;
  targetDate?: string;
}

export interface MeetingActionItem {
  id: string;
  task: string; // 行動任務
  assignee: string; // 負責人
  completed: boolean;
  dueDate?: string;
}

export interface MeetingItem {
  id: string;
  title: string; // 會議主題
  dateTime: string; // 日期時間 (如 2026-09-05 10:00)
  attendees: string; // 與會人員
  content: string; // 討論重點內容
  actionItems: MeetingActionItem[]; // 行動指引 / 決議事項
  createdAt: string;
}

export interface ProjectStage {
  id: string;
  title: string;
  completed: boolean;
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  status: 'not-started' | 'in-progress' | 'completed';
  stages: ProjectStage[];
  targetDate?: string;
  createdAt: string;
}

export interface GratitudeEntry {
  date: string; // YYYY-MM-DD
  items: [string, string, string]; // 3 gratitude items
  updatedAt: string;
}

export interface BookItem {
  id: string;
  title: string;
  author: string;
  currentPage: number;
  totalPages: number;
  status: 'reading' | 'completed' | 'plan-to-read';
  rating: number; // 1-5
  notes: string;
  quotes: string;
  lastUpdated: string;
}

export interface NotebookData {
  todos: TodoItem[];
  urgentTasks: UrgentTaskItem[];
  workPlan: WorkPlanItem[];
  meetings: MeetingItem[];
  projects: ProjectItem[];
  gratitude: Record<string, GratitudeEntry>; // keyed by YYYY-MM-DD
  books: BookItem[];
  quickNotes: string;
  lastSaved?: string;
}
