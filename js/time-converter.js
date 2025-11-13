/**
 * 時間與時辰轉換共用函數
 * 支援24小時制時間轉換為傳統時辰
 */

// 地支時辰
const EARTHLY_BRANCHES = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

// 地支對應的英文名稱
const EARTHLY_BRANCHES_EN = ["Zi", "Chou", "Yin", "Mao", "Chen", "Si", "Wu", "Wei", "Shen", "You", "Xu", "Hai"];

// 地支對應的日文名稱
const EARTHLY_BRANCHES_JA = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

/**
 * 將24小時制時間轉換為時辰
 * @param {string} time - 格式 "HH:MM" 或 "HH:mm"
 * @returns {object} { branch: "午", branchEn: "Wu", branchJa: "午", timeRange: "11:00-12:59" }
 */
function timeToEarthlyBranch(time) {
    if (!time) return null;
    
    const [hourStr, minuteStr] = time.split(':');
    const hour = parseInt(hourStr);
    const minute = parseInt(minuteStr || 0);
    
    // 處理 23:00 之後算隔日子時
    let branchIndex;
    if (hour >= 23) {
        branchIndex = 0; // 子時
    } else {
        branchIndex = Math.floor((hour + 1) / 2) % 12;
    }
    
    return {
        branch: EARTHLY_BRANCHES[branchIndex],
        branchEn: EARTHLY_BRANCHES_EN[branchIndex],
        branchJa: EARTHLY_BRANCHES_JA[branchIndex],
        timeRange: getTimeRange(branchIndex),
        index: branchIndex
    };
}

/**
 * 取得時辰的時間範圍
 * @param {number} branchIndex - 時辰索引 (0-11)
 * @returns {string} 時間範圍，例如 "11:00-12:59"
 */
function getTimeRange(branchIndex) {
    const startHour = (branchIndex * 2 - 1 + 24) % 24;
    const endHour = (branchIndex * 2);
    
    return `${startHour.toString().padStart(2, '0')}:00-${endHour.toString().padStart(2, '0')}:59`;
}

/**
 * 取得當前時間對應的時辰
 * @returns {object} 時辰資訊
 */
function getCurrentEarthlyBranch() {
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    return timeToEarthlyBranch(time);
}

/**
 * 格式化時間顯示（加上前導零）
 * @param {number} hour - 小時
 * @param {number} minute - 分鐘
 * @returns {string} 格式化的時間 "HH:MM"
 */
function formatTime(hour, minute = 0) {
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
}

/**
 * 根據時辰取得建議的時間
 * @param {string} branch - 時辰（如"午"）
 * @returns {string} 建議時間 "HH:MM"
 */
function getTimeFromBranch(branch) {
    const index = EARTHLY_BRANCHES.indexOf(branch);
    if (index === -1) return "12:00";

    // 返回該時辰的中間時間
    let hour = (index * 2);
    if (hour === 0) hour = 23; // 子時
    return formatTime(hour, 30);
}

/**
 * 取得所有時辰選項（用於下拉選單）
 * @param {number} year - 年（可選）
 * @param {number} month - 月（可選）
 * @param {number} day - 日（可選）
 * @returns {Array} 時辰選項陣列 [{ value: "子", label: "子時 (23:00-00:59)", index: 0 }, ...]
 */
function getAllEarthlyBranches(year, month, day) {
    if (year && month && day) {
        // 如果提供了日期，顯示完整的日期時間範圍
        return EARTHLY_BRANCHES.map((branch, index) => ({
            value: branch,
            label: `${branch}時 ${getBranchDateTimeRange(year, month, day, index)}`,
            index: index
        }));
    } else {
        // 否則只顯示時間範圍
        return EARTHLY_BRANCHES.map((branch, index) => ({
            value: branch,
            label: `${branch}時 (${getTimeRange(index)})`,
            index: index
        }));
    }
}

/**
 * 取得時辰對應的完整日期時間範圍
 * @param {number} year - 年
 * @param {number} month - 月
 * @param {number} day - 日
 * @param {number} branchIndex - 時辰索引 (0-11)
 * @returns {string} 完整日期時間範圍，例如 "(11/13 23:00 - 11/14 00:59)"
 */
function getBranchDateTimeRange(year, month, day, branchIndex) {
    const date = new Date(year, month - 1, day);

    if (branchIndex === 0) {
        // 子時：前一天 23:00 - 當天 00:59
        const prevDate = new Date(date);
        prevDate.setDate(prevDate.getDate() - 1);
        return `(${prevDate.getMonth() + 1}/${prevDate.getDate()} 23:00 - ${month}/${day} 00:59)`;
    } else {
        // 其他時辰
        const startHour = (branchIndex * 2 - 1);
        const endHour = (branchIndex * 2);
        return `(${month}/${day} ${startHour.toString().padStart(2, '0')}:00 - ${month}/${day} ${endHour.toString().padStart(2, '0')}:59)`;
    }
}

/**
 * 檢查時間是否需要調整日期（23:00-23:59 需要日期+1）
 * @param {string} time - 格式 "HH:MM"
 * @returns {boolean} 如果需要調整日期返回 true
 */
function needsDateAdjustment(time) {
    if (!time) return false;
    const [hourStr] = time.split(':');
    const hour = parseInt(hourStr);
    return hour >= 23;
}

/**
 * 根據時間調整日期（處理 23:00-23:59 子時的日期問題）
 * @param {number} year - 年
 * @param {number} month - 月
 * @param {number} day - 日
 * @param {string} time - 時間 "HH:MM"
 * @returns {object} { year, month, day } 調整後的日期
 */
function adjustDateForTime(year, month, day, time) {
    if (needsDateAdjustment(time)) {
        const date = new Date(year, month - 1, day);
        date.setDate(date.getDate() + 1);
        return {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate()
        };
    }
    return { year: parseInt(year), month: parseInt(month), day: parseInt(day) };
}
