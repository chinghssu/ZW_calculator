/**
 * Google Apps Script 程式碼
 * 請將此檔案的內容複製到 Google Apps Script 編輯器中
 *
 * 設定步驟：
 * 1. 前往 https://script.google.com/
 * 2. 建立新專案
 * 3. 將此檔案的全部內容貼上
 * 4. 修改下方的 SHEET_ID（您的 Google Sheet ID）
 * 5. 點選「部署」→「新增部署」→「網頁應用程式」
 * 6. 「執行身分」選擇「我」
 * 7. 「誰可以存取」選擇「所有人」
 * 8. 複製產生的網址，貼到 google-sheets-integration.js 的 webAppUrl 中
 */

// ============ 請在這裡設定您的 Google Sheet ID ============
// Sheet ID 可以從試算表網址中取得
// 例如：https://docs.google.com/spreadsheets/d/[這裡是SHEET_ID]/edit
const SHEET_ID = 'YOUR_SHEET_ID_HERE';
const SHEET_NAME = '紫微斗數資料';  // 工作表名稱，可自訂
// =========================================================

/**
 * 處理 POST 請求（從網頁傳來的資料）
 */
function doPost(e) {
  try {
    // 解析傳來的 JSON 資料
    const data = JSON.parse(e.postData.contents);

    // 開啟 Google Sheet
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);

    // 如果工作表不存在，建立新的
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      // 設定標題列
      sheet.appendRow(['時間戳記', '西元年', '月', '日', '時辰', '性別']);
      sheet.getRange(1, 1, 1, 6).setFontWeight('bold');
    }

    // 新增資料列
    sheet.appendRow([
      data.timestamp,
      data.year,
      data.month,
      data.day,
      data.hour,
      data.gender
    ]);

    // 回傳成功訊息
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: '資料已成功儲存'
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // 回傳錯誤訊息
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * 處理 GET 請求（測試用）
 */
function doGet(e) {
  return ContentService
    .createTextOutput('Google Sheets 整合服務運作正常！')
    .setMimeType(ContentService.MimeType.TEXT);
}

/**
 * 測試函數 - 在 Apps Script 編輯器中可以直接執行此函數來測試
 */
function testAddData() {
  const testData = {
    timestamp: new Date().toISOString(),
    year: '2024',
    month: '1',
    day: '1',
    hour: '子',
    gender: '男'
  };

  const e = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };

  const result = doPost(e);
  Logger.log(result.getContent());
}
