# 紫微斗數命盤計算系統

這是一個紫微斗數命盤計算網頁系統，支援輸入出生資料並顯示完整命盤結果。

## 📋 功能特色

✅ **純白色背景** - 簡潔清爽的介面設計
✅ **雙頁面架構** - 輸入與結果分離，使用體驗更佳
✅ **Google Sheets 整合** - 自動儲存使用者輸入資料（可選）
✅ **響應式設計** - 支援桌面與行動裝置

## 🚀 快速開始

### 基本使用

1. 開啟 `index.html`
2. 輸入出生年月日時和性別
3. 點選「開始計算」按鈕
4. 查看完整的紫微斗數命盤結果

### 網頁檔案說明

| 檔案 | 用途 |
|------|------|
| `index.html` | **輸入頁面** - 使用者輸入出生資料 |
| `result.html` | **結果頁面** - 顯示紫微斗數命盤結果 |
| `main.html` | 原始的單頁面版本（保留） |

### JavaScript 模組

| 檔案 | 功能 |
|------|------|
| `lunar.js` | 農曆轉換功能 |
| `ziweistar.js` | 星曜資料 |
| `ziweicore.js` | 紫微斗數核心計算邏輯 |
| `ziweiui.js` | UI 渲染（原版使用） |
| `google-sheets-integration.js` | Google Sheets 整合模組 |

### 樣式

| 檔案 | 說明 |
|------|------|
| `js/ziwei.css` | 紫微斗數命盤樣式表 |

## 🔧 Google Sheets 整合設定

如果您想要自動儲存使用者輸入的資料到 Google Sheets，請參考：

📖 **[GOOGLE_SHEETS_設定說明.md](./GOOGLE_SHEETS_設定說明.md)**

> 💡 提示：Google Sheets 整合是選用功能，不設定也能正常使用網頁。

## 📱 使用說明

### 輸入頁面 (index.html)

1. **選擇出生日期**
   - 西元年份（1900-2049）
   - 月份（1-12）
   - 日期（1-31）

2. **選擇出生時辰**
   - 子時【23~1】
   - 丑時【1~3】
   - （依此類推...）

3. **選擇性別**
   - 男 / 女

4. **功能按鈕**
   - 「使用現在時間」：自動填入當前日期時間
   - 「開始計算」：前往結果頁面

### 結果頁面 (result.html)

- 顯示完整的紫微斗數命盤
- 包含：國曆、農曆、生肖、五行、陰陽、十二宮位、主星、副星、大小限等資訊
- 點選「返回輸入頁面」可重新輸入資料

## 🎨 樣式客製化

### 修改背景顏色

**輸入頁面** (`index.html`)：
```css
body {
    background-color: #FFFFFF;  /* 修改此處 */
}
```

**結果頁面** (`result.html`)：
```css
body {
    background-color: #FFFFFF !important;  /* 修改此處 */
}
```

### 修改按鈕顏色

在 `index.html` 的 `<style>` 區塊中：
```css
input[type="button"] {
    background-color: #4CAF50;  /* 計算按鈕顏色 */
}

.btn-secondary {
    background-color: #008CBA;  /* 現在時間按鈕顏色 */
}
```

## 📂 專案結構

```
ZW_Cal/
├── index.html                      # 輸入頁面（新）
├── result.html                     # 結果頁面（新）
├── main.html                       # 原始單頁版本
├── lunar.js                        # 農曆轉換
├── ziweistar.js                    # 星曜資料
├── ziweicore.js                    # 計算核心
├── ziweiui.js                      # UI 渲染
├── google-sheets-integration.js    # Google Sheets 整合（新）
├── GoogleAppsScript.gs            # Apps Script 程式碼範本（新）
├── GOOGLE_SHEETS_設定說明.md       # Google Sheets 設定文件（新）
├── README.md                       # 本文件（新）
└── js/
    └── ziwei.css                   # 命盤樣式
```

## 🔄 版本差異

### 新版（雙頁面）
- ✅ 輸入與結果分離
- ✅ 純白色背景
- ✅ Google Sheets 整合
- ✅ 現代化介面設計
- 檔案：`index.html` + `result.html`

### 舊版（單頁面）
- 輸入與結果在同一頁
- 淺黃色背景 (#FFFAF0)
- 檔案：`main.html`

> 💡 兩個版本都可以正常使用，您可以選擇喜歡的版本。

## 🌐 部署說明

### 本機測試

直接用瀏覽器開啟 `index.html` 即可。

### 網站部署

可以部署到以下平台：
- GitHub Pages
- Netlify
- Vercel
- 一般網站主機

只需上傳所有檔案到網站根目錄即可。

## ⚠️ 注意事項

1. **時辰計算**：以出生地當地時間為準
2. **子時規則**：23:00 後算隔日子時
3. **瀏覽器支援**：建議使用現代瀏覽器（Chrome、Firefox、Safari、Edge）
4. **Google Sheets**：需要網路連線才能儲存資料

## 📝 授權

原作者：cubshuang

## 🤝 貢獻

如有問題或建議，歡迎提出 Issue 或 Pull Request。
