/**
 * Generates a 100% self-contained Single-File HTML application
 * containing HTML, embedded CSS, and vanilla JavaScript.
 * Can be saved as a single .html file and opened directly in any browser (offline).
 */
export function generateSingleFileHtml(): string {
  return `<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>全功能個人記事本</title>
  <style>
    :root {
      --bg: #f8fafc;
      --card-bg: #ffffff;
      --border: #e2e8f0;
      --border-focus: #94a3b8;
      --text-main: #1e293b;
      --text-muted: #64748b;
      --primary: #3b82f6;
      --primary-hover: #2563eb;
      --primary-light: #eff6ff;
      --success: #10b981;
      --warning: #f59e0b;
      --danger: #ef4444;
      --rose: #e11d48;
      --indigo: #4f46e5;
      --radius: 10px;
      --shadow: 0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.03);
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans TC", sans-serif;
      background-color: var(--bg);
      color: var(--text-main);
      line-height: 1.6;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    header {
      background: #ffffff;
      border-bottom: 1px solid var(--border);
      position: sticky;
      top: 0;
      z-index: 40;
      box-shadow: 0 1px 2px rgba(0,0,0,0.02);
    }
    .header-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 12px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .brand-icon {
      width: 36px;
      height: 36px;
      background: linear-gradient(135deg, #3b82f6, #1d4ed8);
      color: white;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 18px;
      box-shadow: 0 2px 4px rgba(59,130,246,0.3);
    }
    .brand-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: #0f172a;
    }
    .brand-subtitle {
      font-size: 0.8rem;
      color: var(--text-muted);
    }
    .header-actions {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    .save-indicator {
      font-size: 0.8rem;
      color: var(--text-muted);
      display: flex;
      align-items: center;
      gap: 4px;
      margin-right: 8px;
    }
    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: var(--success);
      display: inline-block;
    }
    .btn {
      padding: 6px 14px;
      border-radius: 6px;
      font-size: 0.85rem;
      font-weight: 500;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s ease;
      border: 1px solid var(--border);
      background: #ffffff;
      color: var(--text-main);
    }
    .btn:hover {
      background: #f1f5f9;
      border-color: var(--border-focus);
    }
    .btn-primary {
      background: var(--primary);
      border-color: var(--primary);
      color: white;
    }
    .btn-primary:hover {
      background: var(--primary-hover);
      border-color: var(--primary-hover);
    }
    .btn-danger {
      color: var(--danger);
    }
    .btn-danger:hover {
      background: #fef2f2;
      border-color: #fecaca;
    }
    .btn-urgent {
      background: #e11d48;
      border-color: #e11d48;
      color: white;
    }
    .btn-urgent:hover {
      background: #be123c;
    }
    .btn-sm {
      padding: 3px 8px;
      font-size: 0.75rem;
    }
    .nav-bar {
      background: #ffffff;
      border-bottom: 1px solid var(--border);
      overflow-x: auto;
    }
    .nav-container {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      padding: 0 16px;
      gap: 4px;
    }
    .tab-btn {
      padding: 12px 14px;
      font-size: 0.85rem;
      font-weight: 500;
      color: var(--text-muted);
      border: none;
      background: none;
      cursor: pointer;
      border-bottom: 2px solid transparent;
      display: flex;
      align-items: center;
      gap: 6px;
      white-space: nowrap;
      transition: all 0.15s;
    }
    .tab-btn:hover {
      color: var(--text-main);
    }
    .tab-btn.active {
      color: var(--primary);
      border-bottom-color: var(--primary);
      font-weight: 600;
    }
    .badge {
      background: #f1f5f9;
      color: var(--text-muted);
      padding: 2px 6px;
      border-radius: 9999px;
      font-size: 0.75rem;
    }
    .badge-rose {
      background: #ffe4e6;
      color: #be123c;
      font-weight: bold;
    }
    .tab-btn.active .badge {
      background: var(--primary-light);
      color: var(--primary);
    }
    .tab-btn.active .badge-rose {
      background: #f43f5e;
      color: #ffffff;
    }
    main {
      flex: 1;
      max-width: 1200px;
      width: 100%;
      margin: 20px auto;
      padding: 0 16px;
    }
    .tab-content {
      display: none;
    }
    .tab-content.active {
      display: block;
      animation: fadeIn 0.2s ease;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(4px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 20px;
      margin-bottom: 20px;
      box-shadow: var(--shadow);
    }
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      flex-wrap: wrap;
      gap: 8px;
    }
    .card-title {
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-main);
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .grid-2 {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 16px;
    }
    .grid-3 {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 16px;
    }
    .grid-4 {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 12px;
    }
    .stat-card {
      background: #ffffff;
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 16px;
      box-shadow: var(--shadow);
    }
    .stat-label {
      font-size: 0.75rem;
      color: var(--text-muted);
      font-weight: 600;
    }
    .stat-val {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--text-main);
      margin-top: 4px;
    }
    .input, .select, .textarea {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid var(--border);
      border-radius: 6px;
      font-size: 0.9rem;
      background: #f8fafc;
      color: var(--text-main);
      transition: all 0.15s;
    }
    .input:focus, .select:focus, .textarea:focus {
      outline: none;
      border-color: var(--primary);
      background: #ffffff;
      box-shadow: 0 0 0 3px rgba(59,130,246,0.1);
    }
    .form-group {
      margin-bottom: 12px;
    }
    .form-label {
      display: block;
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--text-main);
      margin-bottom: 4px;
    }
    .list-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 14px;
      border: 1px solid var(--border);
      border-radius: 8px;
      margin-bottom: 8px;
      background: #ffffff;
      transition: all 0.15s;
    }
    .list-item:hover {
      border-color: var(--border-focus);
    }
    .list-item.completed {
      background: #f8fafc;
      opacity: 0.75;
    }
    .list-item.completed .item-text {
      text-decoration: line-through;
      color: var(--text-muted);
    }
    .item-left {
      display: flex;
      align-items: center;
      gap: 10px;
      flex: 1;
    }
    .custom-checkbox {
      width: 18px;
      height: 18px;
      cursor: pointer;
      accent-color: var(--primary);
    }
    .priority-tag {
      font-size: 0.7rem;
      padding: 2px 6px;
      border-radius: 4px;
      font-weight: 600;
    }
    .priority-urgent { background: #fee2e2; color: #b91c1c; }
    .priority-high { background: #fee2e2; color: #ef4444; }
    .priority-medium { background: #fef3c7; color: #d97706; }
    .priority-low { background: #ecfdf5; color: #059669; }
    .progress-bar-container {
      width: 100%;
      height: 8px;
      background: #e2e8f0;
      border-radius: 9999px;
      overflow: hidden;
      margin: 6px 0;
    }
    .progress-fill {
      height: 100%;
      background: var(--primary);
      border-radius: 9999px;
      transition: width 0.3s ease;
    }
    .status-badge {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 600;
    }
    .status-pending { background: #fef2f2; color: #e11d48; }
    .status-in-progress { background: #eff6ff; color: #2563eb; }
    .status-completed { background: #ecfdf5; color: #059669; }
    .quote-box {
      border-left: 3px solid var(--primary);
      padding: 6px 12px;
      background: var(--primary-light);
      border-radius: 0 6px 6px 0;
      font-style: italic;
      font-size: 0.85rem;
      color: #1e3a8a;
      margin-top: 8px;
    }
    /* Modal Styles */
    .modal-overlay {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(15, 23, 42, 0.6);
      backdrop-filter: blur(2px);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 100;
      padding: 16px;
    }
    .modal-overlay.active {
      display: flex;
    }
    .modal-card {
      background: #ffffff;
      border-radius: 12px;
      max-width: 600px;
      width: 100%;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1);
      border: 1px solid var(--border);
    }
    .modal-header {
      padding: 16px 20px;
      border-bottom: 1px solid var(--border);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .modal-title {
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--text-main);
    }
    .modal-body {
      padding: 20px;
    }
    .modal-footer {
      padding: 12px 20px;
      border-top: 1px solid var(--border);
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }
    footer {
      background: #ffffff;
      border-top: 1px solid var(--border);
      padding: 16px;
      text-align: center;
      font-size: 0.8rem;
      color: var(--text-muted);
      margin-top: auto;
    }
  </style>
</head>
<body>

<header>
  <div class="header-container">
    <div class="brand">
      <div class="brand-icon">記</div>
      <div>
        <div class="brand-title">全功能個人記事本</div>
        <div class="brand-subtitle">待辦 • 老闆交辦 • 工作計劃 • 會議記錄 • 專案 • 感恩 • 讀書 • 速記</div>
      </div>
    </div>
    <div class="header-actions">
      <div class="save-indicator">
        <span class="dot"></span>
        <span id="save-status">已自動儲存</span>
      </div>
      <button class="btn btn-primary" onclick="exportData()">
        <span>匯出備份 (JSON)</span>
      </button>
      <label class="btn" style="cursor:pointer;">
        <span>匯入備份</span>
        <input type="file" id="import-file" style="display:none;" accept=".json" onchange="importData(event)">
      </label>
      <button class="btn btn-danger" onclick="resetToDefault()">
        <span>重置為預設</span>
      </button>
    </div>
  </div>
</header>

<div class="nav-bar">
  <div class="nav-container">
    <button class="tab-btn active" onclick="switchTab('todo')">
      <span>每日待辦</span>
      <span class="badge" id="badge-todo">0</span>
    </button>
    <button class="tab-btn" onclick="switchTab('urgent')">
      <span>⚡ 老闆交辦</span>
      <span class="badge badge-rose" id="badge-urgent">0</span>
    </button>
    <button class="tab-btn" onclick="switchTab('workplan')">
      <span>工作計劃</span>
      <span class="badge" id="badge-workplan">0</span>
    </button>
    <button class="tab-btn" onclick="switchTab('meetings')">
      <span>👥 會議記錄</span>
      <span class="badge" id="badge-meetings">0</span>
    </button>
    <button class="tab-btn" onclick="switchTab('project')">
      <span>專案管理</span>
      <span class="badge" id="badge-project">0</span>
    </button>
    <button class="tab-btn" onclick="switchTab('gratitude')">
      <span>感恩日誌</span>
    </button>
    <button class="tab-btn" onclick="switchTab('reading')">
      <span>讀書記錄</span>
      <span class="badge" id="badge-reading">0</span>
    </button>
    <button class="tab-btn" onclick="switchTab('notes')">
      <span>隨手速記</span>
    </button>
  </div>
</div>

<main>
  <!-- 1. 每日待辦事項 (To-Do List) -->
  <section id="tab-todo" class="tab-content active">
    <div class="card">
      <div class="card-header">
        <div class="card-title">新增待辦事項</div>
      </div>
      <form onsubmit="addTodo(event)" style="display:flex; gap:8px; flex-wrap:wrap;">
        <input type="text" id="todo-input" class="input" placeholder="請輸入待辦任務名稱..." required style="flex:2; min-width:200px;">
        <select id="todo-priority" class="select" style="flex:1; min-width:110px;">
          <option value="medium">中優先級</option>
          <option value="high">高優先級</option>
          <option value="low">低優先級</option>
        </select>
        <input type="date" id="todo-due" class="input" style="flex:1; min-width:130px;">
        <button type="submit" class="btn btn-primary" style="white-space:nowrap;">新增待辦</button>
      </form>
    </div>

    <div class="card">
      <div class="card-header">
        <div class="card-title">待辦清單</div>
        <div style="display:flex; gap:8px;">
          <button class="btn" onclick="clearCompletedTodos()">清除已完成</button>
        </div>
      </div>
      <div id="todo-list"></div>
    </div>
  </section>

  <!-- 2. 老闆臨時交辦事項 (Urgent Tasks) -->
  <section id="tab-urgent" class="tab-content">
    <div class="grid-4" style="margin-bottom:16px;">
      <div class="stat-card" style="border-left:4px solid #ef4444;">
        <div class="stat-label">🚨 待處理 (Pending)</div>
        <div class="stat-val" id="stat-urgent-pending" style="color:#ef4444;">0 件</div>
      </div>
      <div class="stat-card" style="border-left:4px solid #3b82f6;">
        <div class="stat-label">⚡ 處理中 (In Progress)</div>
        <div class="stat-val" id="stat-urgent-progress" style="color:#2563eb;">0 件</div>
      </div>
      <div class="stat-card" style="border-left:4px solid #10b981;">
        <div class="stat-label">✅ 已完成了結</div>
        <div class="stat-val" id="stat-urgent-completed" style="color:#059669;">0 件</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">總累積交辦</div>
        <div class="stat-val" id="stat-urgent-total">0 件</div>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <div class="card-title">🚨 一鍵記錄老闆 / 主管臨時交辦事項</div>
        <span style="font-size:0.8rem; color:var(--text-muted);">輸入時自動帶入當下精確日期與時間標記</span>
      </div>
      <form onsubmit="addUrgentTask(event)">
        <div class="grid-3">
          <div>
            <label class="form-label">交辦人</label>
            <input type="text" id="urgent-assigner" class="input" value="老闆" required>
            <div style="display:flex; gap:4px; margin-top:4px; flex-wrap:wrap;">
              <span class="btn btn-sm" onclick="document.getElementById('urgent-assigner').value='老闆'">老闆</span>
              <span class="btn btn-sm" onclick="document.getElementById('urgent-assigner').value='總經理'">總經理</span>
              <span class="btn btn-sm" onclick="document.getElementById('urgent-assigner').value='直屬主管'">直屬主管</span>
              <span class="btn btn-sm" onclick="document.getElementById('urgent-assigner').value='業務窗口'">業務窗口</span>
            </div>
          </div>
          <div>
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <label class="form-label">交辦時間標記 (自動帶入)</label>
              <span class="btn btn-sm" onclick="refreshUrgentTimestamp()" style="cursor:pointer; color:var(--primary);">重整當下</span>
            </div>
            <input type="text" id="urgent-assigned-at" class="input" style="background:#fffbeb; border-color:#fde68a; font-family:monospace;" required>
          </div>
          <div>
            <label class="form-label">緊急程度</label>
            <select id="urgent-priority" class="select">
              <option value="urgent">⚡ 特急件 (立刻辦理)</option>
              <option value="high">🔥 高度優先 (今日必達)</option>
              <option value="normal">📋 一般交辦 (依序處理)</option>
            </select>
          </div>
        </div>

        <div style="margin-top:10px;">
          <label class="form-label">交辦事項內容 *</label>
          <textarea id="urgent-content" class="textarea" rows="2" placeholder="詳細交辦任務、目標規格與對齊事項..." required onfocus="onUrgentContentFocus()"></textarea>
        </div>

        <div class="grid-2" style="margin-top:10px;">
          <div>
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <label class="form-label">完成期限 (Deadline)</label>
              <div style="display:flex; gap:4px;">
                <span class="btn btn-sm" onclick="setQuickDeadline('today')">今日下班</span>
                <span class="btn btn-sm" onclick="setQuickDeadline('tomorrow')">明日中午</span>
                <span class="btn btn-sm" onclick="setQuickDeadline('friday')">本週五</span>
              </div>
            </div>
            <input type="text" id="urgent-deadline" class="input" placeholder="例如：2026-09-05 18:00 (今日下班前)">
          </div>
          <div>
            <label class="form-label">備註說明 (選填)</label>
            <input type="text" id="urgent-notes" class="input" placeholder="傳閱對象、相關檔案或注意事項">
          </div>
        </div>

        <div style="margin-top:14px; text-align:right;">
          <button type="submit" class="btn btn-urgent">新增交辦事項</button>
        </div>
      </form>
    </div>

    <div class="card">
      <div class="card-header">
        <div class="card-title">交辦事項追蹤清單</div>
        <div style="display:flex; gap:6px;">
          <button class="btn btn-sm" onclick="setUrgentFilter('all')">全部</button>
          <button class="btn btn-sm" onclick="setUrgentFilter('pending')">待處理</button>
          <button class="btn btn-sm" onclick="setUrgentFilter('in-progress')">處理中</button>
          <button class="btn btn-sm" onclick="setUrgentFilter('completed')">已完成</button>
        </div>
      </div>
      <div id="urgent-task-list"></div>
    </div>
  </section>

  <!-- 3. 工作計劃 (Work Plan) -->
  <section id="tab-workplan" class="tab-content">
    <div class="card">
      <div class="card-header">
        <div class="card-title">擬定工作計劃目標</div>
      </div>
      <form onsubmit="addWorkPlan(event)">
        <div class="grid-2">
          <div>
            <label class="form-label">計劃重點名稱</label>
            <input type="text" id="plan-title" class="input" placeholder="例如：本日重點 / 本週關鍵里程碑" required>
          </div>
          <div>
            <label class="form-label">範疇分類</label>
            <select id="plan-category" class="select">
              <option value="daily">本日重點 (Daily)</option>
              <option value="weekly">本週重點 (Weekly)</option>
            </select>
          </div>
        </div>
        <div style="margin-top:8px;">
          <label class="form-label">執行備註或說明</label>
          <input type="text" id="plan-notes" class="input" placeholder="目標產出、對齊夥伴或關鍵交付時間">
        </div>
        <div style="margin-top:12px; text-align:right;">
          <button type="submit" class="btn btn-primary">加入工作計劃</button>
        </div>
      </form>
    </div>

    <div class="grid-2">
      <div class="card">
        <div class="card-title" style="margin-bottom:12px; color:#1e40af;">☀️ 本日重點目標</div>
        <div id="daily-plan-list"></div>
      </div>
      <div class="card">
        <div class="card-title" style="margin-bottom:12px; color:#4338ca;">🎯 本週關鍵進度</div>
        <div id="weekly-plan-list"></div>
      </div>
    </div>
  </section>

  <!-- 4. 會議記錄 (Meeting Notes) -->
  <section id="tab-meetings" class="tab-content">
    <div class="grid-3" style="margin-bottom:16px;">
      <div class="stat-card">
        <div class="stat-label">累積會議場次</div>
        <div class="stat-val" id="stat-meetings-total">0 場</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">決議行動指引 (Action Items)</div>
        <div class="stat-val" id="stat-meetings-actions" style="color:#4f46e5;">0 項</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">行動指引落實率</div>
        <div class="stat-val" id="stat-meetings-rate" style="color:#059669;">100%</div>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <div class="card-title">📝 建立會議記錄 (Meeting Notes)</div>
        <span style="font-size:0.8rem; color:var(--text-muted);">完整記錄主題、與會人員、核心紀要與行動指引</span>
      </div>
      <form onsubmit="addMeeting(event)">
        <div class="grid-2">
          <div>
            <label class="form-label">會議主題 *</label>
            <input type="text" id="meeting-title" class="input" placeholder="例如：Q3 專案進度追蹤週會、新客戶需求對齊..." required>
          </div>
          <div>
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <label class="form-label">會議日期時間</label>
              <span class="btn btn-sm" onclick="setMeetingNow()" style="cursor:pointer; color:var(--primary);">帶入現在時間</span>
            </div>
            <input type="text" id="meeting-datetime" class="input" style="font-family:monospace;" required>
          </div>
        </div>

        <div style="margin-top:10px;">
          <label class="form-label">與會人員</label>
          <input type="text" id="meeting-attendees" class="input" placeholder="例如：David (主持)、Sarah、Alex、Emily">
        </div>

        <div style="margin-top:10px;">
          <label class="form-label">討論重點與會議紀要內容 *</label>
          <textarea id="meeting-content" class="textarea" rows="4" placeholder="條列說明會議討論核心、共識、各方發言要點與結論..." required></textarea>
        </div>

        <!-- Action Items in form -->
        <div style="background:#f8fafc; border:1px solid var(--border); border-radius:8px; padding:12px; margin-top:12px;">
          <div style="font-size:0.85rem; font-weight:700; color:#3730a3; margin-bottom:8px;">
            📌 行動指引與決議事項 (Action Items)
          </div>
          <div id="form-meeting-actions-list" style="margin-bottom:8px;"></div>
          <div style="display:flex; gap:8px; flex-wrap:wrap;">
            <input type="text" id="form-action-task" class="input" placeholder="待執行任務內容（例：週五前產出規格書）" style="flex:2; min-width:180px;">
            <input type="text" id="form-action-assignee" class="input" placeholder="負責人（例：Alex）" style="flex:1; min-width:100px;">
            <button type="button" class="btn" onclick="addActionToMeetingForm()">+ 加入行動指引</button>
          </div>
        </div>

        <div style="margin-top:14px; text-align:right;">
          <button type="submit" class="btn btn-primary">儲存會議記錄</button>
        </div>
      </form>
    </div>

    <div class="card">
      <div class="card-header">
        <div class="card-title">歷史會議記錄列表</div>
        <div style="display:flex; align-items:center; gap:8px;">
          <input type="text" id="meeting-search" class="input" placeholder="搜尋主題、與會人員、決議..." style="width:240px;" oninput="renderMeetings()">
        </div>
      </div>
      <div id="meeting-list"></div>
    </div>
  </section>

  <!-- 5. 專案管理 (Project Management) -->
  <section id="tab-project" class="tab-content">
    <div class="card">
      <div class="card-header">
        <div class="card-title">建立新專案</div>
      </div>
      <form onsubmit="addProject(event)">
        <div class="grid-2">
          <div>
            <label class="form-label">專案名稱</label>
            <input type="text" id="proj-name" class="input" placeholder="輸入專案名稱" required>
          </div>
          <div>
            <label class="form-label">預計完成日</label>
            <input type="date" id="proj-date" class="input">
          </div>
        </div>
        <div style="margin-top:8px;">
          <label class="form-label">專案描述</label>
          <input type="text" id="proj-desc" class="input" placeholder="專案目標與背景說明">
        </div>
        <div style="margin-top:8px;">
          <label class="form-label">階段任務（用逗號分開各階段）</label>
          <input type="text" id="proj-stages" class="input" placeholder="需求規劃, 架構設計, 系統開發, 測試上線">
        </div>
        <div style="margin-top:12px; text-align:right;">
          <button type="submit" class="btn btn-primary">建立專案</button>
        </div>
      </form>
    </div>

    <div id="project-list"></div>
  </section>

  <!-- 6. 感恩日誌 (Gratitude Journal) -->
  <section id="tab-gratitude" class="tab-content">
    <div class="card">
      <div class="card-header">
        <div class="card-title">🌱 今日感恩三件事</div>
        <div style="display:flex; align-items:center; gap:8px;">
          <input type="date" id="gratitude-date" class="input" style="width:auto;" onchange="loadGratitudeForDate(this.value)">
          <button class="btn" onclick="setGratitudeToday()">今天</button>
        </div>
      </div>
      <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:16px;">
        每天靜心記錄三件微小但真實的感謝，培養知足與豐盈的正面心態。
      </p>
      <div class="form-group">
        <label class="form-label">第 1 件感謝的事：</label>
        <input type="text" id="gratitude-1" class="input" placeholder="例如：早晨陽光明媚、喝到順口的咖啡..." oninput="saveCurrentGratitude()">
      </div>
      <div class="form-group">
        <label class="form-label">第 2 件感謝的事：</label>
        <input type="text" id="gratitude-2" class="input" placeholder="例如：夥伴的及時協助、家人的貼心問候..." oninput="saveCurrentGratitude()">
      </div>
      <div class="form-group">
        <label class="form-label">第 3 件感謝的事：</label>
        <input type="text" id="gratitude-3" class="input" placeholder="例如：自己今天克服了拖延、專注完成了重要目標..." oninput="saveCurrentGratitude()">
      </div>
      <div style="text-align:right; margin-top:12px;">
        <button class="btn btn-primary" onclick="saveCurrentGratitude(true)">儲存日誌</button>
      </div>
    </div>

    <div class="card">
      <div class="card-title" style="margin-bottom:12px;">歷史感恩回顧</div>
      <div id="gratitude-history"></div>
    </div>
  </section>

  <!-- 7. 讀書記錄 (Reading Log) -->
  <section id="tab-reading" class="tab-content">
    <div class="card">
      <div class="card-header">
        <div class="card-title">新增讀書記錄</div>
      </div>
      <form onsubmit="addBook(event)">
        <div class="grid-2">
          <div>
            <label class="form-label">書名 *</label>
            <input type="text" id="book-title" class="input" placeholder="請輸入書名" required>
          </div>
          <div>
            <label class="form-label">作者</label>
            <input type="text" id="book-author" class="input" placeholder="作者名稱">
          </div>
        </div>
        <div class="grid-2" style="margin-top:8px;">
          <div>
            <label class="form-label">進度（當前頁數 / 總頁數）</label>
            <div style="display:flex; gap:8px; align-items:center;">
              <input type="number" id="book-curr-page" class="input" placeholder="目前頁" min="0" value="0">
              <span>/</span>
              <input type="number" id="book-total-page" class="input" placeholder="總頁數" min="1" value="300">
            </div>
          </div>
          <div>
            <label class="form-label">閱讀狀態</label>
            <select id="book-status" class="select">
              <option value="reading">📖 閱讀中</option>
              <option value="completed">✅ 已讀完</option>
              <option value="plan-to-read">⏳ 待閱讀</option>
            </select>
          </div>
        </div>
        <div style="margin-top:8px;">
          <label class="form-label">佳句選錄</label>
          <input type="text" id="book-quote" class="input" placeholder="觸動心靈的金句摘抄">
        </div>
        <div style="margin-top:8px;">
          <label class="form-label">心得或筆記</label>
          <textarea id="book-notes" class="textarea" rows="2" placeholder="閱讀觀點、應用想法或重點摘要"></textarea>
        </div>
        <div style="margin-top:12px; text-align:right;">
          <button type="submit" class="btn btn-primary">新增書籍</button>
        </div>
      </form>
    </div>

    <div class="card">
      <div class="card-header">
        <div class="card-title">我的書單庫</div>
        <span style="font-size:0.8rem; color:var(--text-muted);">點擊「編輯」可直接修改書名、進度、心得與佳句</span>
      </div>
      <div id="book-list"></div>
    </div>
  </section>

  <!-- 8. 隨手速記 (Quick Notes) -->
  <section id="tab-notes" class="tab-content">
    <div class="card">
      <div class="card-header">
        <div class="card-title">隨手速記</div>
        <div style="display:flex; gap:8px; align-items:center;">
          <span style="font-size:0.8rem; color:var(--text-muted);" id="notes-char-count">字數: 0</span>
          <button class="btn" onclick="insertTimestamp()">插入時間戳記</button>
          <button class="btn" onclick="copyQuickNotes()">複製全文</button>
        </div>
      </div>
      <textarea id="quick-notes-area" class="textarea" style="min-height:380px; font-size:0.95rem; line-height:1.7; resize:vertical;" placeholder="隨意寫下臨時想法、會議摘要、複製暫存的文字，隨打隨存..." oninput="onNotesInput()"></textarea>
    </div>
  </section>
</main>

<!-- Edit Book Modal -->
<div id="edit-book-modal" class="modal-overlay">
  <div class="modal-card">
    <div class="modal-header">
      <div class="modal-title">✏️ 編輯讀書記錄</div>
      <button class="btn btn-sm" onclick="closeEditBookModal()">✕</button>
    </div>
    <form onsubmit="saveEditBook(event)">
      <div class="modal-body">
        <input type="hidden" id="edit-book-id">
        <div class="grid-2">
          <div>
            <label class="form-label">書名 *</label>
            <input type="text" id="edit-book-title" class="input" required>
          </div>
          <div>
            <label class="form-label">作者</label>
            <input type="text" id="edit-book-author" class="input">
          </div>
        </div>

        <div class="grid-2" style="margin-top:10px;">
          <div>
            <label class="form-label">進度（當前頁數 / 總頁數）</label>
            <div style="display:flex; gap:8px; align-items:center;">
              <input type="number" id="edit-book-curr" class="input" min="0" required>
              <span>/</span>
              <input type="number" id="edit-book-total" class="input" min="1" required>
            </div>
          </div>
          <div>
            <label class="form-label">閱讀狀態</label>
            <select id="edit-book-status" class="select">
              <option value="reading">📖 閱讀中</option>
              <option value="completed">✅ 已讀完</option>
              <option value="plan-to-read">⏳ 待閱讀</option>
            </select>
          </div>
        </div>

        <div style="margin-top:10px;">
          <label class="form-label">佳句選錄</label>
          <input type="text" id="edit-book-quote" class="input">
        </div>

        <div style="margin-top:10px;">
          <label class="form-label">心得或筆記</label>
          <textarea id="edit-book-notes" class="textarea" rows="4"></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn" onclick="closeEditBookModal()">取消</button>
        <button type="submit" class="btn btn-primary">儲存修改</button>
      </div>
    </form>
  </div>
</div>

<!-- Edit Meeting Modal -->
<div id="edit-meeting-modal" class="modal-overlay">
  <div class="modal-card">
    <div class="modal-header">
      <div class="modal-title">✏️ 編輯會議記錄</div>
      <button class="btn btn-sm" onclick="closeEditMeetingModal()">✕</button>
    </div>
    <form onsubmit="saveEditMeeting(event)">
      <div class="modal-body">
        <input type="hidden" id="edit-meeting-id">
        <div class="grid-2">
          <div>
            <label class="form-label">會議主題 *</label>
            <input type="text" id="edit-meeting-title" class="input" required>
          </div>
          <div>
            <label class="form-label">會議日期時間</label>
            <input type="text" id="edit-meeting-datetime" class="input" required style="font-family:monospace;">
          </div>
        </div>

        <div style="margin-top:10px;">
          <label class="form-label">與會人員</label>
          <input type="text" id="edit-meeting-attendees" class="input">
        </div>

        <div style="margin-top:10px;">
          <label class="form-label">討論重點與內容</label>
          <textarea id="edit-meeting-content" class="textarea" rows="4" required></textarea>
        </div>

        <div style="background:#f8fafc; border:1px solid var(--border); border-radius:8px; padding:12px; margin-top:10px;">
          <div style="font-size:0.85rem; font-weight:700; color:#3730a3; margin-bottom:8px;">
            行動指引與決議事項
          </div>
          <div id="modal-meeting-actions-list" style="margin-bottom:8px;"></div>
          <div style="display:flex; gap:6px;">
            <input type="text" id="modal-action-task" class="input" placeholder="新任務內容" style="flex:2;">
            <input type="text" id="modal-action-assignee" class="input" placeholder="負責人" style="flex:1;">
            <button type="button" class="btn btn-sm" onclick="addActionInEditModal()">+ 加入</button>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn" onclick="closeEditMeetingModal()">取消</button>
        <button type="submit" class="btn btn-primary">儲存變更</button>
      </div>
    </form>
  </div>
</div>

<footer>
  全功能個人記事本 • 所有資料自動保存在本機瀏覽器 (localStorage) • 離線完全可用 • 支援 JSON 匯出匯入
</footer>

<script>
  // 核心資料結構與持久化儲存
  const STORAGE_KEY = 'personal_notebook_data_v1';
  let appData = {
    todos: [
      { id: '1', text: '規劃本週工作排程與產出目標', completed: true, priority: 'high', dueDate: new Date().toISOString().split('T')[0] },
      { id: '2', text: '完成專案階段任務清單與進度更新', completed: false, priority: 'medium', dueDate: new Date().toISOString().split('T')[0] },
      { id: '3', text: '閱讀好書 20 頁並記錄佳句', completed: false, priority: 'low', dueDate: new Date().toISOString().split('T')[0] }
    ],
    urgentTasks: [
      {
        id: '1',
        assigner: '老闆',
        content: '立刻統整本季業務與客戶回饋分析簡報，準備明天上午董事會前向總裁匯報',
        assignedAt: '2026-09-05 14:30',
        deadline: '2026-09-05 18:00 (今日下班前)',
        status: 'pending',
        priority: 'urgent',
        notes: '附上營收成長對比圖與關鍵客戶續約狀態'
      },
      {
        id: '2',
        assigner: '直屬主管',
        content: '確認新進人員工作環境與專案權限開通進度',
        assignedAt: '2026-09-05 10:15',
        deadline: '2026-09-06 12:00 (明日中午前)',
        status: 'in-progress',
        priority: 'high'
      }
    ],
    workPlan: [
      { id: '1', title: '本日核心：梳理業務流程並確認排程', completed: true, progress: 100, category: 'daily', notes: '已與相關同仁對齊完畢' },
      { id: '2', title: '本日核心：優化使用者體驗與互動流暢度', completed: false, progress: 60, category: 'daily', notes: '微調邊界留白與對比度' },
      { id: '3', title: '本週里程碑：完成第一階段交付與進度報告', completed: false, progress: 40, category: 'weekly', notes: '週五前統整匯報' }
    ],
    meetings: [
      {
        id: '1',
        title: 'Q3 業務專案進度追蹤週會',
        dateTime: '2026-09-05 10:00',
        attendees: 'David (主持), Sarah, Alex, Emily',
        content: '1. 回顧各組進度，前端進度如期進行。\\n2. 後端資料庫索引優化預計週三前完成上線。\\n3. 客戶反饋體驗良好，重點持續維持穩定性。',
        actionItems: [
          { id: 'a1', task: '週五前產出初版規格說明書', assignee: 'Alex', completed: false },
          { id: 'a2', task: '寄出會議記錄與追蹤項目至團隊信箱', assignee: 'Sarah', completed: true }
        ],
        createdAt: '2026-09-05T02:00:00.000Z'
      }
    ],
    projects: [
      {
        id: '1',
        name: '個人工作與生活數位系統重整',
        description: '建立清晰俐落的個人數位中樞，隨手記事、隨時回顧。',
        status: 'in-progress',
        targetDate: '2026-09-30',
        stages: [
          { id: 's1', title: '規劃架構規格', completed: true },
          { id: 's2', title: '測試自動存檔與匯出入', completed: true },
          { id: 's3', title: '長期規律應用', completed: false }
        ]
      }
    ],
    gratitude: {},
    books: [
      {
        id: '1',
        title: '原子習慣 (Atomic Habits)',
        author: 'James Clear',
        currentPage: 180,
        totalPages: 320,
        status: 'reading',
        rating: 5,
        quotes: '你不會躍升到你設定的目標水準，而是會沉淪到你設定的系統水準。',
        notes: '重點在於每天持續進步 1%，建立穩定微小的正向反饋循環。'
      }
    ],
    quickNotes: '📌 隨手速記區：\\n- 下週二上午 10:00 與小組開會\\n- 記事本具備即時自動存檔，重新整理頁面後資料不丟失\\n- 點擊右上角「匯出備份 (JSON)」可輕鬆備份所有資料！'
  };

  // 輔助函式：取得目前時間格式 YYYY-MM-DD HH:mm
  function getNowDateTime() {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const hh = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');
    return yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + min;
  }

  // 暫存會議表單中的行動指引
  let currentMeetingFormActions = [];
  let currentModalMeetingActions = [];
  let urgentFilter = 'all';

  // 初始化載入
  function init() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        appData = Object.assign(appData, parsed);
        if (!Array.isArray(appData.urgentTasks)) appData.urgentTasks = [];
        if (!Array.isArray(appData.meetings)) appData.meetings = [];
      } catch (e) {
        console.error(e);
      }
    }
    
    // 初始化時間輸入框
    refreshUrgentTimestamp();
    setMeetingNow();

    // 初始化感恩日誌今天日期
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('gratitude-date').value = today;
    if (!appData.gratitude[today]) {
      appData.gratitude[today] = {
        date: today,
        items: ['早晨品嚐到香濃咖啡', '團隊齊心克服難題', '擁有充實專注的個人時光']
      };
    }
    
    // 渲染各模組
    renderTodos();
    renderUrgentTasks();
    renderWorkPlan();
    renderMeetings();
    renderProjects();
    loadGratitudeForDate(today);
    renderBooks();
    renderQuickNotes();
    updateBadges();
  }

  function saveToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
    const statusEl = document.getElementById('save-status');
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0].substring(0, 5);
    statusEl.innerText = '已自動儲存 (' + timeStr + ')';
    updateBadges();
  }

  // 分頁切換
  function switchTab(tabId) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    
    const targetContent = document.getElementById('tab-' + tabId);
    if (targetContent) targetContent.classList.add('active');
    
    const buttons = document.querySelectorAll('.tab-btn');
    const tabOrder = ['todo', 'urgent', 'workplan', 'meetings', 'project', 'gratitude', 'reading', 'notes'];
    const idx = tabOrder.indexOf(tabId);
    if (idx !== -1 && buttons[idx]) {
      buttons[idx].classList.add('active');
    }
  }

  function updateBadges() {
    const uncompletedTodos = appData.todos.filter(t => !t.completed).length;
    const pendingUrgent = appData.urgentTasks.filter(t => t.status !== 'completed').length;
    
    document.getElementById('badge-todo').innerText = uncompletedTodos;
    document.getElementById('badge-urgent').innerText = pendingUrgent;
    document.getElementById('badge-workplan').innerText = appData.workPlan.length;
    document.getElementById('badge-meetings').innerText = appData.meetings.length;
    document.getElementById('badge-project').innerText = appData.projects.length;
    document.getElementById('badge-reading').innerText = appData.books.length;
  }

  // --- 1. 待辦事項 ---
  function renderTodos() {
    const listEl = document.getElementById('todo-list');
    if (!appData.todos.length) {
      listEl.innerHTML = '<div style="color:var(--text-muted); font-size:0.9rem; text-align:center; padding:20px;">目前無待辦事項</div>';
      return;
    }
    listEl.innerHTML = appData.todos.map((todo) => \`
      <div class="list-item \${todo.completed ? 'completed' : ''}">
        <div class="item-left">
          <input type="checkbox" class="custom-checkbox" \${todo.completed ? 'checked' : ''} onchange="toggleTodo('\${todo.id}')">
          <span class="priority-tag priority-\${todo.priority}">\${todo.priority === 'high' ? '高' : todo.priority === 'medium' ? '中' : '低'}</span>
          <span class="item-text">\${escapeHtml(todo.text)}</span>
          \${todo.dueDate ? '<span style="font-size:0.75rem; color:var(--text-muted); margin-left:4px;">📅 ' + todo.dueDate + '</span>' : ''}
        </div>
        <button class="btn btn-danger btn-sm" onclick="deleteTodo('\${todo.id}')">刪除</button>
      </div>
    \`).join('');
  }

  function addTodo(e) {
    e.preventDefault();
    const input = document.getElementById('todo-input');
    const priority = document.getElementById('todo-priority').value;
    const dueDate = document.getElementById('todo-due').value;
    const text = input.value.trim();
    if (!text) return;

    appData.todos.unshift({
      id: Date.now().toString(),
      text,
      completed: false,
      priority,
      dueDate
    });
    input.value = '';
    renderTodos();
    saveToStorage();
  }

  function toggleTodo(id) {
    const todo = appData.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      renderTodos();
      saveToStorage();
    }
  }

  function deleteTodo(id) {
    appData.todos = appData.todos.filter(t => t.id !== id);
    renderTodos();
    saveToStorage();
  }

  function clearCompletedTodos() {
    appData.todos = appData.todos.filter(t => !t.completed);
    renderTodos();
    saveToStorage();
  }

  // --- 2. 老闆交辦事項 ---
  function refreshUrgentTimestamp() {
    document.getElementById('urgent-assigned-at').value = getNowDateTime();
  }

  function onUrgentContentFocus() {
    const input = document.getElementById('urgent-assigned-at');
    if (!document.getElementById('urgent-content').value.trim()) {
      input.value = getNowDateTime();
    }
  }

  function setQuickDeadline(type) {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    if (type === 'today') {
      document.getElementById('urgent-deadline').value = yyyy + '-' + mm + '-' + dd + ' 18:00 (今日下班前)';
    } else if (type === 'tomorrow') {
      const tomorrow = new Date(now.getTime() + 24*3600*1000);
      const ty = tomorrow.getFullYear();
      const tm = String(tomorrow.getMonth() + 1).padStart(2, '0');
      const td = String(tomorrow.getDate()).padStart(2, '0');
      document.getElementById('urgent-deadline').value = ty + '-' + tm + '-' + td + ' 12:00 (明日中午前)';
    } else if (type === 'friday') {
      const day = now.getDay();
      const diff = (5 - day + 7) % 7;
      const fri = new Date(now.getTime() + (diff || 7) * 24 * 3600 * 1000);
      const fy = fri.getFullYear();
      const fm = String(fri.getMonth() + 1).padStart(2, '0');
      const fd = String(fri.getDate()).padStart(2, '0');
      document.getElementById('urgent-deadline').value = fy + '-' + fm + '-' + fd + ' 17:00 (本週五前)';
    }
  }

  function addUrgentTask(e) {
    e.preventDefault();
    const assigner = document.getElementById('urgent-assigner').value.trim() || '主管/老闆';
    const content = document.getElementById('urgent-content').value.trim();
    const assignedAt = document.getElementById('urgent-assigned-at').value.trim() || getNowDateTime();
    const priority = document.getElementById('urgent-priority').value;
    const deadline = document.getElementById('urgent-deadline').value.trim();
    const notes = document.getElementById('urgent-notes').value.trim();
    if (!content) return;

    appData.urgentTasks.unshift({
      id: Date.now().toString(),
      assigner,
      content,
      assignedAt,
      priority,
      deadline: deadline || undefined,
      notes: notes || undefined,
      status: 'pending'
    });

    document.getElementById('urgent-content').value = '';
    document.getElementById('urgent-deadline').value = '';
    document.getElementById('urgent-notes').value = '';
    refreshUrgentTimestamp();
    renderUrgentTasks();
    saveToStorage();
  }

  function setUrgentFilter(filter) {
    urgentFilter = filter;
    renderUrgentTasks();
  }

  function setUrgentTaskStatus(id, newStatus) {
    const task = appData.urgentTasks.find(t => t.id === id);
    if (task) {
      task.status = newStatus;
      if (newStatus === 'completed') {
        task.completedAt = getNowDateTime();
      }
      renderUrgentTasks();
      saveToStorage();
    }
  }

  function copyUrgentTask(id) {
    const task = appData.urgentTasks.find(t => t.id === id);
    if (!task) return;
    const text = '【老闆/主管臨時交辦事項】\\n交辦人：' + task.assigner + '\\n接獲時間：' + task.assignedAt + '\\n內容：' + task.content + '\\n完成期限：' + (task.deadline || '未指定') + '\\n目前狀態：' + (task.status === 'completed' ? '已完成了結' : task.status === 'in-progress' ? '處理中' : '待處理');
    navigator.clipboard.writeText(text).then(() => {
      alert('已複製交辦事項到剪貼簿！');
    });
  }

  function deleteUrgentTask(id) {
    if (confirm('確定要刪除這筆交辦事項嗎？')) {
      appData.urgentTasks = appData.urgentTasks.filter(t => t.id !== id);
      renderUrgentTasks();
      saveToStorage();
    }
  }

  function renderUrgentTasks() {
    const listEl = document.getElementById('urgent-task-list');
    const pendingCount = appData.urgentTasks.filter(t => t.status === 'pending').length;
    const progressCount = appData.urgentTasks.filter(t => t.status === 'in-progress').length;
    const completedCount = appData.urgentTasks.filter(t => t.status === 'completed').length;

    document.getElementById('stat-urgent-pending').innerText = pendingCount + ' 件';
    document.getElementById('stat-urgent-progress').innerText = progressCount + ' 件';
    document.getElementById('stat-urgent-completed').innerText = completedCount + ' 件';
    document.getElementById('stat-urgent-total').innerText = appData.urgentTasks.length + ' 件';

    const filtered = appData.urgentTasks.filter(t => {
      if (urgentFilter === 'pending') return t.status === 'pending';
      if (urgentFilter === 'in-progress') return t.status === 'in-progress';
      if (urgentFilter === 'completed') return t.status === 'completed';
      return true;
    });

    if (!filtered.length) {
      listEl.innerHTML = '<div style="color:var(--text-muted); font-size:0.9rem; text-align:center; padding:24px;">目前沒有符合條件的交辦事項</div>';
      return;
    }

    listEl.innerHTML = filtered.map(t => {
      const isCompleted = t.status === 'completed';
      const isInProgress = t.status === 'in-progress';
      const isPending = t.status === 'pending';

      const statusTag = isCompleted
        ? '<span class="status-badge status-completed">✅ 已完成</span>'
        : isInProgress
        ? '<span class="status-badge status-in-progress">⚡ 處理中</span>'
        : '<span class="status-badge status-pending">🚨 待處理</span>';

      return \`
        <div style="border:1px solid \${isPending ? '#fecdd3' : '#e2e8f0'}; border-radius:8px; padding:14px; margin-bottom:12px; background:\${isCompleted ? '#f8fafc' : '#ffffff'};">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px; flex-wrap:wrap;">
            <div style="display:flex; gap:6px; align-items:center; flex-wrap:wrap; font-size:0.8rem;">
              <span style="background:#0f172a; color:#fff; padding:2px 8px; border-radius:4px; font-weight:bold;">\${escapeHtml(t.assigner)}</span>
              <span style="background:#fef3c7; color:#92400e; padding:2px 6px; border-radius:4px; font-family:monospace;">🕒 \${escapeHtml(t.assignedAt)}</span>
              \${t.deadline ? '<span style="background:#ffe4e6; color:#9f1239; padding:2px 6px; border-radius:4px;">⏳ 期限: ' + escapeHtml(t.deadline) + '</span>' : ''}
              \${statusTag}
            </div>
            <div style="display:flex; gap:4px;">
              \${isPending ? '<button class="btn btn-sm" style="color:#2563eb; background:#eff6ff;" onclick="setUrgentTaskStatus(\\'' + t.id + '\\', \\'in-progress\\')">⚡ 開始處理</button>' : ''}
              \${!isCompleted ? '<button class="btn btn-sm" style="color:#059669; background:#ecfdf5;" onclick="setUrgentTaskStatus(\\'' + t.id + '\\', \\'completed\\')">✅ 完結交差</button>' : ''}
              \${isCompleted ? '<button class="btn btn-sm" onclick="setUrgentTaskStatus(\\'' + t.id + '\\', \\'pending\\')">重啟</button>' : ''}
              <button class="btn btn-sm" onclick="copyUrgentTask('\${t.id}')">複製</button>
              <button class="btn btn-danger btn-sm" onclick="deleteUrgentTask('\${t.id}')">刪除</button>
            </div>
          </div>
          <div style="font-size:0.95rem; margin:10px 0 6px 0; font-weight:600; line-height:1.5; color:\${isCompleted ? 'var(--text-muted)' : 'var(--text-main)'}; text-decoration:\${isCompleted ? 'line-through' : 'none'};">
            \${escapeHtml(t.content)}
          </div>
          \${t.notes ? '<div style="font-size:0.8rem; color:var(--text-muted); background:#f1f5f9; padding:4px 8px; border-radius:4px; display:inline-block;">備註：' + escapeHtml(t.notes) + '</div>' : ''}
          \${t.completedAt ? '<div style="font-size:0.75rem; color:#059669; margin-top:4px;">完成於：' + escapeHtml(t.completedAt) + '</div>' : ''}
        </div>
      \`;
    }).join('');
  }

  // --- 3. 工作計劃 ---
  function renderWorkPlan() {
    const dailyEl = document.getElementById('daily-plan-list');
    const weeklyEl = document.getElementById('weekly-plan-list');
    
    const dailyItems = appData.workPlan.filter(p => p.category === 'daily');
    const weeklyItems = appData.workPlan.filter(p => p.category === 'weekly');

    const renderItem = (plan) => \`
      <div style="border:1px solid var(--border); border-radius:8px; padding:12px; margin-bottom:10px; background:#ffffff;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start;">
          <div style="display:flex; align-items:center; gap:8px;">
            <input type="checkbox" class="custom-checkbox" \${plan.completed ? 'checked' : ''} onchange="toggleWorkPlan('\${plan.id}')">
            <span style="font-weight:600; font-size:0.9rem; text-decoration:\${plan.completed ? 'line-through' : 'none'}; color:\${plan.completed ? 'var(--text-muted)' : 'var(--text-main)'};">
              \${escapeHtml(plan.title)}
            </span>
          </div>
          <button class="btn btn-danger btn-sm" onclick="deleteWorkPlan('\${plan.id}')">刪除</button>
        </div>
        <div style="margin-top:8px;">
          <div style="display:flex; justify-content:space-between; font-size:0.75rem; color:var(--text-muted);">
            <span>進度：\${plan.progress}%</span>
            <div style="display:flex; gap:4px;">
              <span class="btn btn-sm" onclick="updatePlanProgress('\${plan.id}', 25)">+25%</span>
              <span class="btn btn-sm" onclick="updatePlanProgress('\${plan.id}', 100)">100%</span>
            </div>
          </div>
          <div class="progress-bar-container">
            <div class="progress-fill" style="width:\${plan.progress}%"></div>
          </div>
        </div>
        \${plan.notes ? '<div style="font-size:0.8rem; color:var(--text-muted); margin-top:6px;">' + escapeHtml(plan.notes) + '</div>' : ''}
      </div>
    \`;

    dailyEl.innerHTML = dailyItems.length ? dailyItems.map(renderItem).join('') : '<div style="color:var(--text-muted); font-size:0.85rem; text-align:center; padding:12px;">無本日工作重點</div>';
    weeklyEl.innerHTML = weeklyItems.length ? weeklyItems.map(renderItem).join('') : '<div style="color:var(--text-muted); font-size:0.85rem; text-align:center; padding:12px;">無本週工作重點</div>';
  }

  function addWorkPlan(e) {
    e.preventDefault();
    const title = document.getElementById('plan-title').value.trim();
    const category = document.getElementById('plan-category').value;
    const notes = document.getElementById('plan-notes').value.trim();
    if (!title) return;

    appData.workPlan.unshift({
      id: Date.now().toString(),
      title,
      category,
      completed: false,
      progress: 0,
      notes
    });

    document.getElementById('plan-title').value = '';
    document.getElementById('plan-notes').value = '';
    renderWorkPlan();
    saveToStorage();
  }

  function toggleWorkPlan(id) {
    const p = appData.workPlan.find(item => item.id === id);
    if (p) {
      p.completed = !p.completed;
      p.progress = p.completed ? 100 : 0;
      renderWorkPlan();
      saveToStorage();
    }
  }

  function updatePlanProgress(id, val) {
    const p = appData.workPlan.find(item => item.id === id);
    if (p) {
      p.progress = Math.min(100, Math.max(0, val === 25 ? p.progress + 25 : val));
      p.completed = p.progress >= 100;
      renderWorkPlan();
      saveToStorage();
    }
  }

  function deleteWorkPlan(id) {
    appData.workPlan = appData.workPlan.filter(p => p.id !== id);
    renderWorkPlan();
    saveToStorage();
  }

  // --- 4. 會議記錄 (Meeting Notes) ---
  function setMeetingNow() {
    document.getElementById('meeting-datetime').value = getNowDateTime();
  }

  function addActionToMeetingForm() {
    const task = document.getElementById('form-action-task').value.trim();
    const assignee = document.getElementById('form-action-assignee').value.trim() || '未指定';
    if (!task) return;
    currentMeetingFormActions.push({
      id: 'act-' + Date.now(),
      task,
      assignee,
      completed: false
    });
    document.getElementById('form-action-task').value = '';
    document.getElementById('form-action-assignee').value = '';
    renderMeetingFormActions();
  }

  function removeActionFromMeetingForm(id) {
    currentMeetingFormActions = currentMeetingFormActions.filter(a => a.id !== id);
    renderMeetingFormActions();
  }

  function renderMeetingFormActions() {
    const container = document.getElementById('form-meeting-actions-list');
    if (!currentMeetingFormActions.length) {
      container.innerHTML = '<div style="font-size:0.75rem; color:var(--text-muted);">尚無行動指引</div>';
      return;
    }
    container.innerHTML = currentMeetingFormActions.map((a, i) => \`
      <div style="display:flex; justify-content:space-between; align-items:center; background:#ffffff; border:1px solid var(--border); padding:6px 10px; border-radius:6px; margin-bottom:4px; font-size:0.8rem;">
        <div>
          <span style="font-weight:bold; margin-right:4px;">\${i + 1}.</span>
          <span>\${escapeHtml(a.task)}</span>
          <span style="background:#f1f5f9; padding:2px 6px; border-radius:4px; margin-left:6px; color:var(--text-muted);">負責人: \${escapeHtml(a.assignee)}</span>
        </div>
        <button type="button" class="btn btn-sm btn-danger" onclick="removeActionFromMeetingForm('\${a.id}')">✕</button>
      </div>
    \`).join('');
  }

  function addMeeting(e) {
    e.preventDefault();
    const title = document.getElementById('meeting-title').value.trim();
    const dateTime = document.getElementById('meeting-datetime').value.trim() || getNowDateTime();
    const attendees = document.getElementById('meeting-attendees').value.trim() || '無紀錄';
    const content = document.getElementById('meeting-content').value.trim();
    if (!title) return;

    appData.meetings.unshift({
      id: Date.now().toString(),
      title,
      dateTime,
      attendees,
      content,
      actionItems: [...currentMeetingFormActions],
      createdAt: new Date().toISOString()
    });

    document.getElementById('meeting-title').value = '';
    document.getElementById('meeting-attendees').value = '';
    document.getElementById('meeting-content').value = '';
    currentMeetingFormActions = [];
    renderMeetingFormActions();
    setMeetingNow();
    renderMeetings();
    saveToStorage();
  }

  function toggleMeetingAction(meetingId, actionId) {
    const meeting = appData.meetings.find(m => m.id === meetingId);
    if (meeting) {
      const act = meeting.actionItems.find(a => a.id === actionId);
      if (act) {
        act.completed = !act.completed;
        renderMeetings();
        saveToStorage();
      }
    }
  }

  function copyMeeting(id) {
    const m = appData.meetings.find(item => item.id === id);
    if (!m) return;
    const actionLines = m.actionItems.length
      ? '\\n\\n【行動指引與決議】\\n' + m.actionItems.map((a, i) => (i+1) + '. [' + (a.completed ? '已落實' : '待執行') + '] ' + a.task + ' (負責人: ' + a.assignee + ')').join('\\n')
      : '';
    const text = '【會議記錄】' + m.title + '\\n時間：' + m.dateTime + '\\n與會人員：' + m.attendees + '\\n\\n【討論重點】\\n' + m.content + actionLines;
    navigator.clipboard.writeText(text).then(() => {
      alert('已複製會議記錄全文摘要！');
    });
  }

  function deleteMeeting(id) {
    if (confirm('確定要刪除這筆會議記錄嗎？')) {
      appData.meetings = appData.meetings.filter(m => m.id !== id);
      renderMeetings();
      saveToStorage();
    }
  }

  function renderMeetings() {
    const listEl = document.getElementById('meeting-list');
    const query = (document.getElementById('meeting-search').value || '').toLowerCase().trim();

    const totalActions = appData.meetings.reduce((acc, m) => acc + m.actionItems.length, 0);
    const completedActions = appData.meetings.reduce((acc, m) => acc + m.actionItems.filter(a => a.completed).length, 0);

    document.getElementById('stat-meetings-total').innerText = appData.meetings.length + ' 場';
    document.getElementById('stat-meetings-actions').innerText = totalActions + ' 項';
    document.getElementById('stat-meetings-rate').innerText = totalActions > 0 ? Math.round((completedActions / totalActions) * 100) + '%' : '100%';

    const filtered = appData.meetings.filter(m => {
      if (!query) return true;
      return m.title.toLowerCase().includes(query) ||
             m.attendees.toLowerCase().includes(query) ||
             m.content.toLowerCase().includes(query) ||
             m.actionItems.some(a => a.task.toLowerCase().includes(query) || a.assignee.toLowerCase().includes(query));
    });

    if (!filtered.length) {
      listEl.innerHTML = '<div style="color:var(--text-muted); font-size:0.9rem; text-align:center; padding:24px;">' + (query ? '查無相符的會議記錄' : '目前尚無任何會議記錄') + '</div>';
      return;
    }

    listEl.innerHTML = filtered.map(m => {
      const actionsCount = m.actionItems.length;
      const actionsDone = m.actionItems.filter(a => a.completed).length;

      return \`
        <div style="border:1px solid var(--border); border-radius:10px; padding:16px; margin-bottom:14px; background:#ffffff; box-shadow:var(--shadow);">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; border-bottom:1px solid #f1f5f9; pb:8px; margin-bottom:10px; flex-wrap:wrap; gap:8px;">
            <div>
              <div style="font-weight:700; font-size:1.1rem; color:var(--text-main);">\${escapeHtml(m.title)}</div>
              <div style="font-size:0.8rem; color:var(--text-muted); margin-top:2px;">
                <span>📅 \${escapeHtml(m.dateTime)}</span> • <span>👥 與會：\${escapeHtml(m.attendees)}</span>
              </div>
            </div>
            <div style="display:flex; gap:6px;">
              <button class="btn btn-sm" onclick="openEditMeetingModal('\${m.id}')">✏️ 編輯</button>
              <button class="btn btn-sm" onclick="copyMeeting('\${m.id}')">複製</button>
              <button class="btn btn-danger btn-sm" onclick="deleteMeeting('\${m.id}')">刪除</button>
            </div>
          </div>

          <div style="font-size:0.9rem; line-height:1.6; white-space:pre-line; background:#f8fafc; padding:12px; border-radius:8px; border:1px solid #f1f5f9; margin-bottom:10px;">
            \${escapeHtml(m.content)}
          </div>

          \${actionsCount > 0 ? \`
            <div style="background:#eef2ff; border:1px solid #e0e7ff; border-radius:8px; padding:10px;">
              <div style="display:flex; justify-content:space-between; font-size:0.8rem; font-weight:bold; color:#3730a3; margin-bottom:6px;">
                <span>決議與行動指引 (\${actionsDone}/\${actionsCount} 完成)</span>
                <span style="font-size:0.75rem; font-weight:normal; color:#4338ca;">點擊核取方塊可直接更新狀態</span>
              </div>
              \${m.actionItems.map(a => \`
                <div onclick="toggleMeetingAction('\${m.id}', '\${a.id}')" style="display:flex; justify-content:space-between; align-items:center; background:#ffffff; border:1px solid \${a.completed ? '#a7f3d0' : '#c7d2fe'}; padding:6px 10px; border-radius:6px; margin-bottom:4px; font-size:0.8rem; cursor:pointer;">
                  <div style="display:flex; align-items:center; gap:6px;">
                    <input type="checkbox" class="custom-checkbox" \${a.completed ? 'checked' : ''} onclick="event.stopPropagation(); toggleMeetingAction('\${m.id}', '\${a.id}')">
                    <span style="text-decoration:\${a.completed ? 'line-through' : 'none'}; color:\${a.completed ? 'var(--text-muted)' : 'var(--text-main)'};">\${escapeHtml(a.task)}</span>
                  </div>
                  <span style="font-size:0.75rem; background:\${a.completed ? '#d1fae5' : '#e0e7ff'}; color:\${a.completed ? '#065f46' : '#3730a3'}; padding:1px 6px; border-radius:9999px;">\${escapeHtml(a.assignee)}</span>
                </div>
              \`).join('')}
            </div>
          \` : ''}
        </div>
      \`;
    }).join('');
  }

  // 會議編輯 Modal
  function openEditMeetingModal(id) {
    const m = appData.meetings.find(item => item.id === id);
    if (!m) return;
    document.getElementById('edit-meeting-id').value = m.id;
    document.getElementById('edit-meeting-title').value = m.title;
    document.getElementById('edit-meeting-datetime').value = m.dateTime;
    document.getElementById('edit-meeting-attendees').value = m.attendees;
    document.getElementById('edit-meeting-content').value = m.content;
    currentModalMeetingActions = JSON.parse(JSON.stringify(m.actionItems || []));
    renderModalMeetingActions();
    document.getElementById('edit-meeting-modal').classList.add('active');
  }

  function closeEditMeetingModal() {
    document.getElementById('edit-meeting-modal').classList.remove('active');
  }

  function addActionInEditModal() {
    const task = document.getElementById('modal-action-task').value.trim();
    const assignee = document.getElementById('modal-action-assignee').value.trim() || '未指定';
    if (!task) return;
    currentModalMeetingActions.push({
      id: 'act-' + Date.now(),
      task,
      assignee,
      completed: false
    });
    document.getElementById('modal-action-task').value = '';
    document.getElementById('modal-action-assignee').value = '';
    renderModalMeetingActions();
  }

  function renderModalMeetingActions() {
    const container = document.getElementById('modal-meeting-actions-list');
    container.innerHTML = currentModalMeetingActions.map((a, i) => \`
      <div style="display:flex; gap:6px; align-items:center; margin-bottom:4px;">
        <input type="checkbox" class="custom-checkbox" \${a.completed ? 'checked' : ''} onchange="currentModalMeetingActions[\${i}].completed = this.checked">
        <input type="text" class="input" value="\${escapeHtml(a.task)}" oninput="currentModalMeetingActions[\${i}].task = this.value" style="flex:2; font-size:0.8rem; padding:4px 8px;">
        <input type="text" class="input" value="\${escapeHtml(a.assignee)}" oninput="currentModalMeetingActions[\${i}].assignee = this.value" style="flex:1; font-size:0.8rem; padding:4px 8px;">
        <button type="button" class="btn btn-sm btn-danger" onclick="currentModalMeetingActions.splice(\${i}, 1); renderModalMeetingActions();">✕</button>
      </div>
    \`).join('');
  }

  function saveEditMeeting(e) {
    e.preventDefault();
    const id = document.getElementById('edit-meeting-id').value;
    const m = appData.meetings.find(item => item.id === id);
    if (!m) return;
    m.title = document.getElementById('edit-meeting-title').value.trim();
    m.dateTime = document.getElementById('edit-meeting-datetime').value.trim();
    m.attendees = document.getElementById('edit-meeting-attendees').value.trim();
    m.content = document.getElementById('edit-meeting-content').value.trim();
    m.actionItems = currentModalMeetingActions;
    closeEditMeetingModal();
    renderMeetings();
    saveToStorage();
  }

  // --- 5. 專案管理 ---
  function renderProjects() {
    const el = document.getElementById('project-list');
    if (!appData.projects.length) {
      el.innerHTML = '<div style="color:var(--text-muted); font-size:0.9rem; text-align:center; padding:20px;">尚無專案</div>';
      return;
    }
    el.innerHTML = appData.projects.map(proj => {
      const totalStages = proj.stages ? proj.stages.length : 0;
      const completedStages = proj.stages ? proj.stages.filter(s => s.completed).length : 0;
      const pct = totalStages > 0 ? Math.round((completedStages / totalStages) * 100) : 0;

      return \`
        <div class="card">
          <div class="card-header">
            <div>
              <span class="card-title">\${escapeHtml(proj.name)}</span>
              \${proj.targetDate ? '<span style="font-size:0.8rem; color:var(--text-muted); margin-left:8px;">📅 預計目標: ' + proj.targetDate + '</span>' : ''}
              <span class="status-badge \${proj.status === 'completed' ? 'status-completed' : 'status-in-progress'}" style="margin-left:8px;">
                \${proj.status === 'completed' ? '已完成' : '進行中'}
              </span>
            </div>
            <div style="display:flex; gap:6px;">
              <button class="btn btn-sm" onclick="toggleProjectStatus('\${proj.id}')">\${proj.status === 'completed' ? '標記進行中' : '標記完成'}</button>
              <button class="btn btn-danger btn-sm" onclick="deleteProject('\${proj.id}')">刪除專案</button>
            </div>
          </div>
          \${proj.description ? '<p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:12px;">' + escapeHtml(proj.description) + '</p>' : ''}

          <div style="margin-bottom:14px;">
            <div style="display:flex; justify-content:space-between; font-size:0.8rem; color:var(--text-muted);">
              <span>階段任務完成度：\${completedStages} / \${totalStages}</span>
              <span>\${pct}%</span>
            </div>
            <div class="progress-bar-container">
              <div class="progress-fill" style="width:\${pct}%"></div>
            </div>
          </div>

          <div style="border-top:1px solid var(--border); padding-top:10px;">
            <div style="font-size:0.85rem; font-weight:600; margin-bottom:8px;">階段任務：</div>
            \${proj.stages.map(stage => \`
              <div style="display:flex; justify-content:space-between; align-items:center; padding:6px 0; border-bottom:1px dashed #f1f5f9; font-size:0.85rem;">
                <div style="display:flex; align-items:center; gap:8px;">
                  <input type="checkbox" class="custom-checkbox" \${stage.completed ? 'checked' : ''} onchange="toggleStage('\${proj.id}', '\${stage.id}')">
                  <span style="text-decoration:\${stage.completed ? 'line-through' : 'none'}; color:\${stage.completed ? 'var(--text-muted)' : 'var(--text-main)'};">\${escapeHtml(stage.title)}</span>
                </div>
                <button class="btn btn-danger btn-sm" onclick="deleteStage('\${proj.id}', '\${stage.id}')">✕</button>
              </div>
            \`).join('')}

            <div style="display:flex; gap:8px; margin-top:10px;">
              <input type="text" id="new-stage-\${proj.id}" class="input" placeholder="新增下一個階段任務..." style="font-size:0.8rem;">
              <button class="btn btn-sm" onclick="addStage('\${proj.id}')">加入階段</button>
            </div>
          </div>
        </div>
      \`;
    }).join('');
  }

  function addProject(e) {
    e.preventDefault();
    const name = document.getElementById('proj-name').value.trim();
    const targetDate = document.getElementById('proj-date').value;
    const desc = document.getElementById('proj-desc').value.trim();
    const stagesInput = document.getElementById('proj-stages').value.trim();
    if (!name) return;

    const stages = stagesInput
      ? stagesInput.split(',').map((s, i) => ({ id: 'stg-' + Date.now() + '-' + i, title: s.trim(), completed: false })).filter(s => s.title)
      : [];

    appData.projects.unshift({
      id: Date.now().toString(),
      name,
      description: desc,
      status: 'in-progress',
      targetDate,
      stages
    });

    document.getElementById('proj-name').value = '';
    document.getElementById('proj-date').value = '';
    document.getElementById('proj-desc').value = '';
    document.getElementById('proj-stages').value = '';
    renderProjects();
    saveToStorage();
  }

  function toggleProjectStatus(id) {
    const proj = appData.projects.find(p => p.id === id);
    if (proj) {
      proj.status = proj.status === 'completed' ? 'in-progress' : 'completed';
      renderProjects();
      saveToStorage();
    }
  }

  function toggleStage(projId, stageId) {
    const proj = appData.projects.find(p => p.id === projId);
    if (proj) {
      const stg = proj.stages.find(s => s.id === stageId);
      if (stg) {
        stg.completed = !stg.completed;
        renderProjects();
        saveToStorage();
      }
    }
  }

  function addStage(projId) {
    const input = document.getElementById('new-stage-' + projId);
    const proj = appData.projects.find(p => p.id === projId);
    if (input && input.value.trim() && proj) {
      proj.stages.push({
        id: 'stg-' + Date.now(),
        title: input.value.trim(),
        completed: false
      });
      input.value = '';
      renderProjects();
      saveToStorage();
    }
  }

  function deleteStage(projId, stageId) {
    const proj = appData.projects.find(p => p.id === projId);
    if (proj) {
      proj.stages = proj.stages.filter(s => s.id !== stageId);
      renderProjects();
      saveToStorage();
    }
  }

  function deleteProject(id) {
    if (confirm('確定要刪除這個專案嗎？')) {
      appData.projects = appData.projects.filter(p => p.id !== id);
      renderProjects();
      saveToStorage();
    }
  }

  // --- 6. 感恩日誌 ---
  function loadGratitudeForDate(dateStr) {
    if (!dateStr) return;
    document.getElementById('gratitude-date').value = dateStr;
    const entry = appData.gratitude[dateStr] || { items: ['', '', ''] };
    document.getElementById('gratitude-1').value = entry.items[0] || '';
    document.getElementById('gratitude-2').value = entry.items[1] || '';
    document.getElementById('gratitude-3').value = entry.items[2] || '';
    renderGratitudeHistory();
  }

  function setGratitudeToday() {
    const today = new Date().toISOString().split('T')[0];
    loadGratitudeForDate(today);
  }

  function saveCurrentGratitude(notify) {
    const dateStr = document.getElementById('gratitude-date').value;
    if (!dateStr) return;
    const item1 = document.getElementById('gratitude-1').value;
    const item2 = document.getElementById('gratitude-2').value;
    const item3 = document.getElementById('gratitude-3').value;
    
    appData.gratitude[dateStr] = {
      date: dateStr,
      items: [item1, item2, item3]
    };
    saveToStorage();
    renderGratitudeHistory();
    if (notify) {
      alert('已成功儲存 ' + dateStr + ' 的感恩日誌！');
    }
  }

  function renderGratitudeHistory() {
    const el = document.getElementById('gratitude-history');
    const dates = Object.keys(appData.gratitude).sort().reverse();
    if (!dates.length) {
      el.innerHTML = '<div style="color:var(--text-muted); font-size:0.85rem;">尚無歷史記錄</div>';
      return;
    }
    el.innerHTML = dates.slice(0, 7).map(date => {
      const entry = appData.gratitude[date];
      const validItems = entry.items.filter(i => i.trim());
      return \`
        <div style="border:1px solid var(--border); border-radius:6px; padding:10px; margin-bottom:8px; cursor:pointer;" onclick="loadGratitudeForDate('\${date}')">
          <div style="display:flex; justify-content:space-between; font-weight:600; font-size:0.85rem; color:#2563eb;">
            <span>📅 \${date}</span>
            <span style="color:var(--text-muted); font-size:0.75rem;">\${validItems.length} 則感謝</span>
          </div>
          <ul style="padding-left:20px; font-size:0.8rem; color:var(--text-main); margin-top:4px;">
            \${validItems.map(item => '<li>' + escapeHtml(item) + '</li>').join('')}
          </ul>
        </div>
      \`;
    }).join('');
  }

  // --- 7. 讀書記錄 (含編輯功能) ---
  function renderBooks() {
    const el = document.getElementById('book-list');
    if (!appData.books.length) {
      el.innerHTML = '<div style="color:var(--text-muted); font-size:0.85rem; text-align:center; padding:20px;">書單目前為空</div>';
      return;
    }
    el.innerHTML = appData.books.map(book => {
      const pct = book.totalPages > 0 ? Math.min(100, Math.round((book.currentPage / book.totalPages) * 100)) : 0;
      const statusLabel = book.status === 'completed' ? '已讀完' : book.status === 'reading' ? '閱讀中' : '待閱讀';
      return \`
        <div style="border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px; background:#fff;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:8px;">
            <div>
              <span style="font-weight:700; font-size:1.05rem;">\${escapeHtml(book.title)}</span>
              \${book.author ? '<span style="color:var(--text-muted); font-size:0.85rem; margin-left:6px;">/ ' + escapeHtml(book.author) + '</span>' : ''}
              <span class="status-badge \${book.status === 'completed' ? 'status-completed' : 'status-in-progress'}" style="margin-left:8px;">\${statusLabel}</span>
            </div>
            <div style="display:flex; gap:6px;">
              <button class="btn btn-sm" style="color:#2563eb; background:#eff6ff;" onclick="openEditBookModal('\${book.id}')">✏️ 編輯</button>
              <button class="btn btn-danger btn-sm" onclick="deleteBook('\${book.id}')">刪除</button>
            </div>
          </div>

          <div style="margin:8px 0;">
            <div style="display:flex; justify-content:space-between; font-size:0.8rem; color:var(--text-muted);">
              <span>進度: 第 \${book.currentPage} / \${book.totalPages} 頁</span>
              <span style="font-weight:bold; color:#2563eb;">\${pct}%</span>
            </div>
            <div class="progress-bar-container">
              <div class="progress-fill" style="width:\${pct}%"></div>
            </div>
            <div style="display:flex; gap:6px; align-items:center; margin-top:6px;">
              <button class="btn btn-sm" onclick="updateBookPage('\${book.id}', 10)">+10 頁</button>
              <button class="btn btn-sm" onclick="updateBookPage('\${book.id}', 1)">+1 頁</button>
              \${book.status !== 'completed' ? '<button class="btn btn-sm" style="color:#059669; background:#ecfdf5;" onclick="markBookFinished(\\'' + book.id + '\\')">完讀</button>' : ''}
            </div>
          </div>

          \${book.quotes ? '<div class="quote-box">“ ' + escapeHtml(book.quotes) + ' ”</div>' : ''}
          \${book.notes ? '<div style="font-size:0.85rem; color:var(--text-muted); margin-top:6px; line-height:1.5;">' + escapeHtml(book.notes) + '</div>' : ''}
        </div>
      \`;
    }).join('');
  }

  function addBook(e) {
    e.preventDefault();
    const title = document.getElementById('book-title').value.trim();
    const author = document.getElementById('book-author').value.trim();
    const currentPage = parseInt(document.getElementById('book-curr-page').value) || 0;
    const totalPages = parseInt(document.getElementById('book-total-page').value) || 100;
    const status = document.getElementById('book-status').value;
    const quote = document.getElementById('book-quote').value.trim();
    const notes = document.getElementById('book-notes').value.trim();
    if (!title) return;

    appData.books.unshift({
      id: Date.now().toString(),
      title,
      author,
      currentPage,
      totalPages,
      status: currentPage >= totalPages ? 'completed' : status,
      quotes: quote,
      notes
    });

    document.getElementById('book-title').value = '';
    document.getElementById('book-author').value = '';
    document.getElementById('book-quote').value = '';
    document.getElementById('book-notes').value = '';
    renderBooks();
    saveToStorage();
  }

  function openEditBookModal(id) {
    const book = appData.books.find(b => b.id === id);
    if (!book) return;
    document.getElementById('edit-book-id').value = book.id;
    document.getElementById('edit-book-title').value = book.title;
    document.getElementById('edit-book-author').value = book.author || '';
    document.getElementById('edit-book-curr').value = book.currentPage;
    document.getElementById('edit-book-total').value = book.totalPages;
    document.getElementById('edit-book-status').value = book.status;
    document.getElementById('edit-book-quote').value = book.quotes || '';
    document.getElementById('edit-book-notes').value = book.notes || '';
    document.getElementById('edit-book-modal').classList.add('active');
  }

  function closeEditBookModal() {
    document.getElementById('edit-book-modal').classList.remove('active');
  }

  function saveEditBook(e) {
    e.preventDefault();
    const id = document.getElementById('edit-book-id').value;
    const book = appData.books.find(b => b.id === id);
    if (!book) return;

    const title = document.getElementById('edit-book-title').value.trim();
    const author = document.getElementById('edit-book-author').value.trim();
    const curr = parseInt(document.getElementById('edit-book-curr').value) || 0;
    const total = parseInt(document.getElementById('edit-book-total').value) || 1;
    const status = document.getElementById('edit-book-status').value;
    const quote = document.getElementById('edit-book-quote').value.trim();
    const notes = document.getElementById('edit-book-notes').value.trim();
    if (!title) return;

    book.title = title;
    book.author = author;
    book.currentPage = curr;
    book.totalPages = total;
    book.status = curr >= total ? 'completed' : status;
    book.quotes = quote;
    book.notes = notes;

    closeEditBookModal();
    renderBooks();
    saveToStorage();
  }

  function updateBookPage(id, delta) {
    const book = appData.books.find(b => b.id === id);
    if (book) {
      book.currentPage = Math.min(book.totalPages, book.currentPage + delta);
      if (book.currentPage >= book.totalPages) {
        book.status = 'completed';
      }
      renderBooks();
      saveToStorage();
    }
  }

  function markBookFinished(id) {
    const book = appData.books.find(b => b.id === id);
    if (book) {
      book.currentPage = book.totalPages;
      book.status = 'completed';
      renderBooks();
      saveToStorage();
    }
  }

  function deleteBook(id) {
    if (confirm('確定要刪除這本書的記錄嗎？')) {
      appData.books = appData.books.filter(b => b.id !== id);
      renderBooks();
      saveToStorage();
    }
  }

  // --- 8. 隨手速記 ---
  function renderQuickNotes() {
    const area = document.getElementById('quick-notes-area');
    area.value = appData.quickNotes || '';
    updateNotesCount();
  }

  function onNotesInput() {
    const area = document.getElementById('quick-notes-area');
    appData.quickNotes = area.value;
    updateNotesCount();
    saveToStorage();
  }

  function updateNotesCount() {
    const area = document.getElementById('quick-notes-area');
    const chars = area.value.length;
    document.getElementById('notes-char-count').innerText = '字數: ' + chars;
  }

  function insertTimestamp() {
    const area = document.getElementById('quick-notes-area');
    const now = new Date();
    const stamp = '\\n[' + now.getFullYear() + '/' + (now.getMonth()+1) + '/' + now.getDate() + ' ' + now.toTimeString().split(' ')[0] + '] ';
    const start = area.selectionStart;
    const end = area.selectionEnd;
    area.value = area.value.substring(0, start) + stamp + area.value.substring(end);
    area.focus();
    area.selectionStart = area.selectionEnd = start + stamp.length;
    onNotesInput();
  }

  function copyQuickNotes() {
    const area = document.getElementById('quick-notes-area');
    navigator.clipboard.writeText(area.value).then(() => {
      alert('已複製速記內容到剪貼簿！');
    }).catch(() => {
      area.select();
      document.execCommand('copy');
      alert('已複製速記內容！');
    });
  }

  // --- 9. 匯出與匯入 ---
  function exportData() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(appData, null, 2));
    const dlAnchor = document.createElement('a');
    const today = new Date().toISOString().split('T')[0];
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", "personal_notebook_backup_" + today + ".json");
    dlAnchor.click();
  }

  function importData(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        const json = JSON.parse(e.target.result);
        if (confirm('確定要從備份檔還原資料嗎？這將會更新您目前的記事本資料。')) {
          appData = Object.assign(appData, json);
          if (!Array.isArray(appData.urgentTasks)) appData.urgentTasks = [];
          if (!Array.isArray(appData.meetings)) appData.meetings = [];
          saveToStorage();
          init();
          alert('資料還原成功！所有待辦、交辦、會議、專案與讀書筆記均已完整復原。');
        }
      } catch (err) {
        alert('匯入失敗：請確認選擇正確的 JSON 備份檔案！');
      }
    };
    reader.readAsText(file);
  }

  function resetToDefault() {
    if (confirm('確定要清除自訂內容並重設為範例初始資料嗎？')) {
      localStorage.removeItem(STORAGE_KEY);
      location.reload();
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }

  // 網頁啟動
  window.addEventListener('DOMContentLoaded', init);
</script>

</body>
</html>`;
}
