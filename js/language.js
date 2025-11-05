/**
 * 語言切換共用邏輯
 * 處理語言偏好記憶和切換
 */

// 語言配置
const LANGUAGE_CONFIG = {
    'zh': { name: '中文', code: 'zh-TW' },
    'en': { name: 'English', code: 'en' },
    'ja': { name: '日本語', code: 'ja' }
};

/**
 * 取得當前頁面的語言
 */
function getCurrentLanguage() {
    const path = window.location.pathname;
    if (path.includes('-en.html')) return 'en';
    if (path.includes('-ja.html')) return 'ja';
    return 'zh';
}

/**
 * 取得對應語言的頁面URL
 */
function getLanguageUrl(lang, isResultPage = false) {
    const baseName = isResultPage ? 'result' : 'index';
    
    if (lang === 'zh') {
        return `${baseName}.html`;
    }
    return `${baseName}-${lang}.html`;
}

/**
 * 儲存語言偏好
 */
function saveLanguagePreference(lang) {
    localStorage.setItem('preferredLanguage', lang);
}

/**
 * 讀取語言偏好
 */
function getLanguagePreference() {
    return localStorage.getItem('preferredLanguage') || 'zh';
}

/**
 * 切換語言
 */
function switchLanguage(lang) {
    saveLanguagePreference(lang);
    const isResultPage = window.location.pathname.includes('result');
    window.location.href = getLanguageUrl(lang, isResultPage);
}
