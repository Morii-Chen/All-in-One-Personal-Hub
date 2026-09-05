import { NotebookData } from '../types';

const getTodayDateString = (): string => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

export const defaultNotebookData: NotebookData = {
  todos: [
    {
      id: 'todo-1',
      text: '檢視今日工作計劃與優先代辦事項',
      completed: true,
      priority: 'high',
      dueDate: getTodayDateString(),
      createdAt: new Date().toISOString(),
    },
    {
      id: 'todo-2',
      text: '完成專案階段任務與進度整理',
      completed: false,
      priority: 'medium',
      dueDate: getTodayDateString(),
      createdAt: new Date().toISOString(),
    },
    {
      id: 'todo-3',
      text: '閱讀 20 頁書並記錄一段佳句',
      completed: false,
      priority: 'low',
      dueDate: getTodayDateString(),
      createdAt: new Date().toISOString(),
    }
  ],
  urgentTasks: [
    {
      id: 'urgent-1',
      assigner: '老闆',
      content: '下週二業務季度匯報投影片初稿，先整理出 Q3 關鍵數據與重點成果亮點',
      assignedAt: '2026-09-04 14:30',
      deadline: '2026-09-08 18:00',
      status: 'in-progress',
      priority: 'urgent',
      notes: '老闆強調排版需簡潔清晰，重點數據以圖表呈現。',
    },
    {
      id: 'urgent-2',
      assigner: '李總監',
      content: '確認新客戶提案合作合約細節與法律條款審核進度',
      assignedAt: '2026-09-04 16:15',
      deadline: '2026-09-05 12:00',
      status: 'pending',
      priority: 'high',
      notes: '需與法務同仁進行快速線上對齊。',
    },
    {
      id: 'urgent-3',
      assigner: '處長',
      content: '回覆供應商最新的報價調整方案與交期確認信函',
      assignedAt: '2026-09-03 10:00',
      deadline: '2026-09-03 17:00',
      status: 'completed',
      priority: 'normal',
      completedAt: '2026-09-03 16:20',
      notes: '已寄送正式確認信並副知採購部門。',
    }
  ],
  workPlan: [
    {
      id: 'plan-1',
      title: '本日重點：梳理核心業務流程與跨部門確認',
      completed: true,
      progress: 100,
      category: 'daily',
      notes: '已與團隊對齊主要目標與交付時間',
      targetDate: getTodayDateString(),
    },
    {
      id: 'plan-2',
      title: '本日重點：整理使用者反饋並優化介面體驗',
      completed: false,
      progress: 60,
      category: 'daily',
      notes: '針對易用性做細部微調',
      targetDate: getTodayDateString(),
    },
    {
      id: 'plan-3',
      title: '本週里程碑：完成第一階段成果驗收與進度報告',
      completed: false,
      progress: 45,
      category: 'weekly',
      notes: '週五前需繳交統整報告',
      targetDate: '',
    },
    {
      id: 'plan-4',
      title: '本週重點：建立日常知識庫與常用模板整理',
      completed: false,
      progress: 20,
      category: 'weekly',
      notes: '提高下週工作自動化與執行效率',
      targetDate: '',
    }
  ],
  meetings: [
    {
      id: 'meeting-1',
      title: 'Q3 業務專案進度追蹤與跨部門協作週會',
      dateTime: '2026-09-04 10:00',
      attendees: 'David (主持)、Sarah (設計)、Alex (研發)、Emily (行銷)',
      content: `1. 審視各模組當前開發狀態，前端介面已達成 85% 完整度。
2. 針對離線儲存機制 (localStorage) 與單檔輸出進行跨瀏覽器相容性驗證。
3. 行銷團隊將於下週啟動內部測試問卷，收集首批同仁回饋。
4. 下次會議時間訂於 9/11 (週五) 上午 10:00。`,
      actionItems: [
        { id: 'act-1-1', task: '完成讀書記錄模組的即時編輯視窗 (Modal)', assignee: 'Alex', completed: true, dueDate: '2026-09-05' },
        { id: 'act-1-2', task: '設計老闆臨時交辦事項專屬清單與時間標籤樣式', assignee: 'Sarah', completed: true, dueDate: '2026-09-05' },
        { id: 'act-1-3', task: '統整 Q3 業務數據指標投影片初版', assignee: 'David', completed: false, dueDate: '2026-09-08' },
        { id: 'act-1-4', task: '發送測試問卷與收集各組回饋意見', assignee: 'Emily', completed: false, dueDate: '2026-09-10' }
      ],
      createdAt: new Date().toISOString(),
    },
    {
      id: 'meeting-2',
      title: '新年度技術架構規劃與備份機制討論',
      dateTime: '2026-09-02 15:30',
      attendees: 'Alex、Michael (架構師)',
      content: `討論單一檔案離線架構與本機 JSON 備份規範：
- 優先確保無外部網路依賴時，所有核心讀寫與樣式均正常渲染。
- 備份檔案應具備版本相容機制，避免舊版結構在匯入時解析失敗。`,
      actionItems: [
        { id: 'act-2-1', task: '驗證 JSON 匯出與匯入的資料完整性容錯測試', assignee: 'Alex', completed: true, dueDate: '2026-09-03' }
      ],
      createdAt: new Date().toISOString(),
    }
  ],
  projects: [
    {
      id: 'proj-1',
      name: '個人工作與生活數位系統重整',
      description: '整合日常待辦、專案進度、感恩日誌與讀書筆記，建立清晰不混亂的數位工作台。',
      status: 'in-progress',
      targetDate: '2026-09-30',
      createdAt: new Date().toISOString(),
      stages: [
        { id: 'stg-1-1', title: '規劃模組結構與資料規格', completed: true },
        { id: 'stg-1-2', title: '建立各功能頁籤與互動體驗', completed: true },
        { id: 'stg-1-3', title: '實作本機持久化與備份匯出入', completed: true },
        { id: 'stg-1-4', title: '日常實際上線使用並持續迭代', completed: false }
      ]
    },
    {
      id: 'proj-2',
      name: '年度閱讀精讀計劃',
      description: '每個月挑選 2 本深度思維好書，撰寫關鍵觀點心得並實踐於生活中。',
      status: 'in-progress',
      targetDate: '2026-12-31',
      createdAt: new Date().toISOString(),
      stages: [
        { id: 'stg-2-1', title: '挑選本季推薦書單', completed: true },
        { id: 'stg-2-2', title: '建立各書章節卡片與摘錄', completed: false },
        { id: 'stg-2-3', title: '撰寫季度總結專題文章', completed: false }
      ]
    }
  ],
  gratitude: {
    [getTodayDateString()]: {
      date: getTodayDateString(),
      items: [
        '早晨喝到一杯香氣濃郁的熱咖啡，頭腦清醒。',
        '團隊夥伴即時給予熱心回饋，順利解決難題。',
        '擁有專注不受打擾的一小時，完成了重要待辦。'
      ],
      updatedAt: new Date().toISOString()
    }
  },
  books: [
    {
      id: 'book-1',
      title: '原子習慣 (Atomic Habits)',
      author: 'James Clear',
      currentPage: 180,
      totalPages: 320,
      status: 'reading',
      rating: 5,
      notes: '細微改變能帶來巨大成就。養成好習慣的四步法則：提示、渴望、回應、獎賞。重點不在於目標有多偉大，而在於建立每天能持續執行的系統。',
      quotes: '「你不會躍升到你設定的目標水準，而是會沉淪到你設定的系統水準。」',
      lastUpdated: new Date().toISOString()
    },
    {
      id: 'book-2',
      title: '深度工作力 (Deep Work)',
      author: 'Cal Newport',
      currentPage: 290,
      totalPages: 290,
      status: 'completed',
      rating: 5,
      notes: '深度專注是未來經濟中極具稀缺性與價值的核心技能。學會阻隔無效社交分心，保留黃金專注時間區塊。',
      quotes: '「想要在任何領域產出頂尖價值，你必須沉浸在不受干擾的深度專注狀態中。」',
      lastUpdated: new Date().toISOString()
    }
  ],
  quickNotes: `📌 臨時想法與速記備忘：
- 下週二上午 10:00 與專案小組開會，記得準備展示投影片
- 觀察到的優秀設計原則：留白恰到好處、資訊層級清晰、操作直覺不繁瑣
- 推薦閱讀清單追加：《思考的技術》、《反脆弱》
- 記得每週日晚上做資料備份（點擊右上角「匯出資料」存成 JSON 檔）`,
  lastSaved: new Date().toISOString()
};
