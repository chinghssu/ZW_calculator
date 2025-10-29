# Google Sheets 整合設定說明

本文件說明如何將紫微斗數計算網頁與 Google Sheets 整合，自動儲存使用者輸入的資料。

## 設定步驟

### 第一步：建立 Google Sheet

1. 前往 [Google Sheets](https://sheets.google.com/)
2. 建立一個新的試算表
3. 將試算表命名為「紫微斗數資料」（或您喜歡的名稱）
4. 從網址列複製 **Sheet ID**
   - 網址格式：`https://docs.google.com/spreadsheets/d/[這裡是SHEET_ID]/edit`
   - 例如：`1a2b3c4d5e6f7g8h9i0j`

### 第二步：建立 Google Apps Script

1. 前往 [Google Apps Script](https://script.google.com/)
2. 點選「新專案」
3. 將專案命名為「紫微斗數 API」
4. 將 `GoogleAppsScript.gs` 檔案的**全部內容**複製貼上到編輯器中
5. **修改設定**：
   ```javascript
   const SHEET_ID = 'YOUR_SHEET_ID_HERE';  // 改成您的 Sheet ID
   const SHEET_NAME = '紫微斗數資料';  // 可自訂工作表名稱
   ```

### 第三步：部署 Web App

1. 在 Google Apps Script 編輯器中，點選右上角「部署」→「新增部署」
2. 選擇類型：**「網頁應用程式」**
3. 設定如下：
   - **說明**：紫微斗數資料收集（可自訂）
   - **執行身分**：**我**
   - **誰可以存取**：**所有人**（重要！否則網頁無法存取）
4. 點選「部署」
5. 授權存取（第一次會需要授權）
6. 複製產生的 **Web App URL**（例如：`https://script.google.com/macros/s/AKfycbz.../exec`）

### 第四步：設定網頁

1. 開啟 `google-sheets-integration.js` 檔案
2. 修改設定：
   ```javascript
   const GOOGLE_SHEETS_CONFIG = {
       webAppUrl: '貼上您的Web App URL',  // 貼上第三步複製的 URL
       enabled: true  // 改為 true 啟用功能
   };
   ```

## 測試整合

### 方法一：在網頁上測試

1. 開啟 `index.html`
2. 按 F12 開啟開發者工具
3. 在 Console 中輸入：
   ```javascript
   testGoogleSheetsConnection()
   ```
4. 如果成功，會看到「測試成功！」的訊息
5. 檢查您的 Google Sheet，應該會看到測試資料

### 方法二：在 Apps Script 中測試

1. 在 Google Apps Script 編輯器中
2. 選擇函數「testAddData」
3. 點選「執行」
4. 檢查執行記錄檔和您的 Google Sheet

## 資料格式

儲存到 Google Sheets 的資料包含：

| 欄位 | 說明 | 範例 |
|------|------|------|
| 時間戳記 | 資料輸入時間 | 2024-01-15T10:30:00.000Z |
| 西元年 | 出生年份 | 1990 |
| 月 | 出生月份 | 3 |
| 日 | 出生日期 | 15 |
| 時辰 | 出生時辰 | 子 |
| 性別 | 性別 | 男/女 |

## 常見問題

### Q1: 為什麼資料沒有儲存到 Google Sheet？

**檢查清單：**
- [ ] `google-sheets-integration.js` 中的 `enabled` 是否設為 `true`
- [ ] Web App URL 是否正確貼上
- [ ] Google Apps Script 部署時「誰可以存取」是否選擇「所有人」
- [ ] Sheet ID 是否正確
- [ ] 開啟瀏覽器的開發者工具 Console，檢查是否有錯誤訊息

### Q2: 出現授權錯誤

重新部署 Web App：
1. 前往 Google Apps Script
2. 點選「部署」→「管理部署」
3. 編輯現有部署
4. 重新授權

### Q3: 想要修改儲存的欄位

修改 `GoogleAppsScript.gs` 中的 `doPost` 函數：
```javascript
sheet.appendRow([
    data.timestamp,
    data.year,
    data.month,
    data.day,
    data.hour,
    data.gender,
    // 在這裡新增更多欄位
]);
```

### Q4: 想要在多個網站使用同一個 Google Sheet

可以！只要在所有網站的 `google-sheets-integration.js` 中使用相同的 Web App URL 即可。

## 隱私與安全

- ⚠️ Web App URL 應該保密，避免被他人濫用
- 資料會儲存在您的 Google Sheet 中，僅您可以存取
- 如果不需要此功能，將 `enabled` 設為 `false` 即可停用

## 進階功能

### 停用 Google Sheets 整合

在 `google-sheets-integration.js` 中：
```javascript
enabled: false
```

### 僅在本機記錄，不上傳

註解掉 `index.html` 中的這一行：
```javascript
// saveToGoogleSheets(data);
```

## 需要協助？

如果遇到問題：
1. 檢查瀏覽器 Console 的錯誤訊息
2. 檢查 Google Apps Script 的執行記錄檔
3. 確認所有設定步驟都正確完成
