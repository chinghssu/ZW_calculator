/**
 * 紫微斗數 Google Sheets 整合模組
 * 使用 Google Apps Script Web App 作為中介來儲存資料
 */

// 設定檔 - 請在這裡填入您的 Google Apps Script Web App URL
const GOOGLE_SHEETS_CONFIG = {
    // 步驟完成後，將您的 Google Apps Script Web App URL 貼在這裡
    webAppUrl: 'https://script.google.com/macros/s/AKfycbwvXLCj6ip-7V4S1Ze5-SHWyt8q7mn5kugvPvH6n2SyX576JNokeD7t1htErNsrnmqptw/exec',
    enabled: true  // 設定完成後改為 true
};

/**
 * 儲存資料到 Google Sheets
 * @param {Object} data - 包含年月日時性別的資料物件
 */
async function saveToGoogleSheets(data) {
    // 如果未啟用，則只在控制台記錄
    if (!GOOGLE_SHEETS_CONFIG.enabled || GOOGLE_SHEETS_CONFIG.webAppUrl === 'YOUR_WEB_APP_URL_HERE') {
        console.log('Google Sheets 整合未啟用，資料：', data);
        return;
    }

    try {
        // 準備要傳送的資料
        const payload = {
            timestamp: data.timestamp || new Date().toISOString(),
            year: data.year,
            month: data.month,
            day: data.day,
            hour: data.hour,
            gender: data.gender === 'M' ? '男' : '女'
        };

        // 發送 POST 請求到 Google Apps Script
        const response = await fetch(GOOGLE_SHEETS_CONFIG.webAppUrl, {
            method: 'POST',
            mode: 'no-cors',  // Google Apps Script 需要這個設定
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        console.log('資料已成功傳送到 Google Sheets');
        return true;

    } catch (error) {
        console.error('儲存到 Google Sheets 時發生錯誤：', error);
        // 即使失敗也不阻止使用者繼續使用
        return false;
    }
}

/**
 * 測試 Google Sheets 連線
 */
async function testGoogleSheetsConnection() {
    if (!GOOGLE_SHEETS_CONFIG.enabled) {
        alert('Google Sheets 整合未啟用。請先完成設定。');
        return;
    }

    const testData = {
        timestamp: new Date().toISOString(),
        year: '2024',
        month: '1',
        day: '1',
        hour: '子',
        gender: 'M'
    };

    const result = await saveToGoogleSheets(testData);
    if (result) {
        alert('測試成功！資料已儲存到 Google Sheets。');
    } else {
        alert('測試失敗。請檢查控制台錯誤訊息。');
    }
}
