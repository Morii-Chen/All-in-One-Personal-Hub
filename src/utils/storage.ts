import { NotebookData } from '../types';
import { defaultNotebookData } from '../data/defaultData';

const STORAGE_KEY = 'personal_notebook_data_v1';

export function loadDataFromStorage(): NotebookData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return defaultNotebookData;
    }
    const parsed = JSON.parse(raw);
    return {
      todos: Array.isArray(parsed.todos) ? parsed.todos : defaultNotebookData.todos,
      urgentTasks: Array.isArray(parsed.urgentTasks) ? parsed.urgentTasks : defaultNotebookData.urgentTasks,
      workPlan: Array.isArray(parsed.workPlan) ? parsed.workPlan : defaultNotebookData.workPlan,
      meetings: Array.isArray(parsed.meetings) ? parsed.meetings : defaultNotebookData.meetings,
      projects: Array.isArray(parsed.projects) ? parsed.projects : defaultNotebookData.projects,
      gratitude: (parsed.gratitude && typeof parsed.gratitude === 'object') ? parsed.gratitude : defaultNotebookData.gratitude,
      books: Array.isArray(parsed.books) ? parsed.books : defaultNotebookData.books,
      quickNotes: typeof parsed.quickNotes === 'string' ? parsed.quickNotes : defaultNotebookData.quickNotes,
      lastSaved: parsed.lastSaved || new Date().toISOString(),
    };
  } catch (err) {
    console.error('Failed to parse localStorage data:', err);
    return defaultNotebookData;
  }
}

export function saveDataToStorage(data: NotebookData): NotebookData {
  const updatedData: NotebookData = {
    ...data,
    lastSaved: new Date().toISOString(),
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
  } catch (err) {
    console.error('Failed to save to localStorage:', err);
  }
  return updatedData;
}

export function exportDataAsJSON(data: NotebookData): void {
  const dateStr = new Date().toISOString().split('T')[0];
  const filename = `personal_notebook_backup_${dateStr}.json`;
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function importDataFromJSON(file: File): Promise<NotebookData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const parsed = JSON.parse(text);
        if (!parsed || typeof parsed !== 'object') {
          throw new Error('無效的 JSON 備份檔格式');
        }
        const validated: NotebookData = {
          todos: Array.isArray(parsed.todos) ? parsed.todos : [],
          urgentTasks: Array.isArray(parsed.urgentTasks) ? parsed.urgentTasks : [],
          workPlan: Array.isArray(parsed.workPlan) ? parsed.workPlan : [],
          meetings: Array.isArray(parsed.meetings) ? parsed.meetings : [],
          projects: Array.isArray(parsed.projects) ? parsed.projects : [],
          gratitude: (parsed.gratitude && typeof parsed.gratitude === 'object') ? parsed.gratitude : {},
          books: Array.isArray(parsed.books) ? parsed.books : [],
          quickNotes: typeof parsed.quickNotes === 'string' ? parsed.quickNotes : '',
          lastSaved: new Date().toISOString(),
        };
        resolve(validated);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(new Error('讀取檔案失敗'));
    reader.readAsText(file);
  });
}
