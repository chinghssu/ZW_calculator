# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**紫微斗數命盤計算系統** (Zi Wei Dou Shu Calculator) - A Chinese astrology chart calculation web application that converts birth date/time to traditional Chinese astrology charts.

- **Tech Stack**: Pure HTML/CSS/JavaScript (no frameworks, no build tools)
- **Languages**: Supports Traditional Chinese (default), English, and Japanese
- **Deployment**: Static website - can be deployed to GitHub Pages, Netlify, or any static hosting

## Development Commands

### Testing Locally

Since this is a static website with no build process:

```bash
# Option 1: Open HTML files directly in browser
# Simply open index.html or any HTML file in your browser

# Option 2: Run a local server (recommended for full functionality)
python3 -m http.server 8000
# Then visit: http://localhost:8000
```

### Version Control

```bash
# Current development branch
git checkout claude/init-project-011CUqpWaYXctMM7v2Ch5Abt

# Check status
git status

# Commit changes
git add .
git commit -m "feat: description of changes"

# Push to remote
git push -u origin claude/init-project-011CUqpWaYXctMM7v2Ch5Abt
```

### Testing

No automated test suite exists. Manual testing required:
- Test all 6 HTML pages (index.html, index-en.html, index-ja.html, result.html, result-en.html, result-ja.html)
- Verify calculations across different birth dates and times
- Test language switcher functionality
- Check responsive design on different screen sizes

## Architecture

### File Structure

```
/
├── index.html              # Chinese input page (default)
├── index-en.html           # English input page
├── index-ja.html           # Japanese input page
├── result.html             # Chinese result page
├── result-en.html          # English result page
├── result-ja.html          # Japanese result page
├── lunar.js                # Lunar/solar calendar conversion (critical!)
├── ziweicore.js           # Core astrology calculation engine
├── ziweistar.js           # Star positions and attributes data
├── ziweiui.js             # UI rendering functions
└── js/
    ├── ziwei.css          # Main stylesheet
    ├── language.js        # Language switching logic
    └── time-converter.js  # 24-hour to 時辰 (Chinese hour) conversion
```

### Core Components

#### 1. Calendar System (`lunar.js`)
- Converts Gregorian dates to Chinese lunar calendar
- Critical for astrology calculations - DO NOT modify the conversion logic unless absolutely necessary
- Covers years 1900-2049 with encoded data in `yearInfo` array
- Function: `Lunar(mode, year, month, day)` - mode 0 for solar to lunar

#### 2. Astrology Engine (`ziweicore.js`)
- Main function: `ziwei.computeZiWei(year, month, day, hour, gender)`
- Calculates star positions based on birth data
- Uses Five Elements (五行局), Heavenly Stems (天干), and Earthly Branches (地支)
- Returns `Place12` array with 12 palace positions
- Complex traditional Chinese astrology rules - modify with extreme care

#### 3. Time Conversion (`js/time-converter.js`)
- Converts 24-hour time format to traditional Chinese hours (時辰)
- **Critical rule**: 23:00-00:59 = 子時 (Zi hour), 01:00-02:59 = 丑時 (Chou hour), etc.
- Each 時辰 spans 2 hours
- Function: `timeToEarthlyBranch(time)` returns branch name in all three languages

#### 4. Multi-language System (`js/language.js`)
- Uses **separate HTML files** for each language (not i18n framework)
- Language preference stored in localStorage
- Functions:
  - `getCurrentLanguage()` - detects language from filename
  - `switchLanguage(lang)` - navigates to corresponding language page
  - `saveLanguagePreference(lang)` - persists choice

### Data Flow

1. User inputs birth date/time/location/gender on input page (index*.html)
2. Data stored in localStorage and passed to result page
3. Result page (result*.html) retrieves data and calls:
   - `Lunar()` to convert to lunar calendar
   - `ziwei.computeZiWei()` to calculate chart
4. Chart rendered with stars, palaces, and interpretations

## Critical Implementation Details

### Time/Hour Conversion Rules

The most error-prone aspect. Chinese astrology uses 12 two-hour periods:

```javascript
// 23:00-00:59 → 子 (Zi)
// 01:00-02:59 → 丑 (Chou)
// 03:00-04:59 → 寅 (Yin)
// 05:00-06:59 → 卯 (Mao)
// 07:00-08:59 → 辰 (Chen)
// 09:00-10:59 → 巳 (Si)
// 11:00-12:59 → 午 (Wu)
// 13:00-14:59 → 未 (Wei)
// 15:00-16:59 → 申 (Shen)
// 17:00-18:59 → 酉 (You)
// 19:00-20:59 → 戌 (Xu)
// 21:00-22:59 → 亥 (Hai)
```

**Special case**: 23:00+ counts as next day's 子時 for calendar purposes but same day for birth chart.

### Palace Calculation Logic

From `ziweicore.js:56-57`:
```javascript
l = EarthlyBranches[((12-hPos)+1+m*1.0)%12];      // 命宮 (Life Palace)
b = EarthlyBranches[(12-((22-hPos)+1-m*1.0)%12)%12];  // 身宮 (Body Palace)
```

These formulas are based on traditional Chinese astrology rules - do not modify without domain expertise.

### Multi-language Architecture

Unlike typical i18n approaches, this project uses **separate HTML files**:

**Pros:**
- Better SEO (each language has unique URL)
- No JavaScript bundle overhead
- Simple to maintain for small projects
- Can customize per-language market

**Cons:**
- Content duplication
- Updates must be made to all files
- No dynamic language switching on same page

When updating UI text:
1. Update all 3 input pages (index.html, index-en.html, index-ja.html)
2. Update all 3 result pages (result.html, result-en.html, result-ja.html)
3. Check `翻譯對照表.md` for translation reference

## Development Context

### Current State

The project recently completed Phase 1 of v2.0 development:
- ✅ Multi-language support implemented
- ✅ 24-hour time input with automatic 時辰 conversion
- ✅ Location input field added
- ✅ Language switcher in top-right corner
- 🟡 Buy Me a Coffee integration (planned)
- 🟡 Google Sheets data collection (optional)

### Planning Documents

Reference these Chinese-language planning docs (in project root):
- `開發啟動指南.md` - Development startup guide with phased approach
- `開發規劃文件.md` - Detailed architecture and feature planning
- `開發Tickets.md` - 16 detailed development tickets with acceptance criteria
- `翻譯對照表.md` - Translation reference table for all UI text
- `部署教學.md` - Deployment instructions

### Known Design Decisions

1. **No frameworks**: Intentionally kept simple for easy deployment and maintenance
2. **No backend**: All calculations done client-side for privacy
3. **Separate language files**: Chosen over i18n library for SEO and simplicity
4. **localStorage**: Used for language preference and passing data between pages
5. **Buy Me a Coffee location**: https://buymeacoffee.com/jinhssu (username: jinhssu)

## Common Tasks

### Adding New UI Text

1. Update Chinese version in `index.html` or `result.html`
2. Update English version in `index-en.html` or `result-en.html`
3. Update Japanese version in `index-ja.html` or `result-ja.html`
4. If adding new translatable content, add to `翻譯對照表.md`

### Modifying Calculation Logic

⚠️ **Warning**: Astrology calculations follow traditional rules. Changes may affect accuracy.

1. Core calculations: `ziweicore.js`
2. Star data: `ziweistar.js` (arrays of positions)
3. Calendar conversion: `lunar.js` (only modify if year range needs expansion)

### Changing Styling

1. Main styles: `js/ziwei.css`
2. Page-specific styles: inline `<style>` blocks in each HTML file
3. Remember responsive design - test on mobile

### Testing Changes

```bash
# Start local server
python3 -m http.server 8000

# Test checklist:
# 1. All 6 pages load without errors (check browser console)
# 2. Language switcher works in both directions
# 3. Enter test birth data: 1990-03-15 12:30 台北市 Male
# 4. Verify lunar date conversion is correct
# 5. Verify chart displays with stars and palaces
# 6. Test on mobile viewport (toggle device toolbar in DevTools)
```

## Important Conventions

### Code Style

- Uses ES5 and ES6 JavaScript (no TypeScript, no transpilation)
- Variable names mix Chinese and English
- Chinese names used for domain concepts (命宮, 身宮, etc.)
- Comments primarily in Chinese

### Data Format

Birth data object structure:
```javascript
{
    year: "1990",           // 西元年
    month: "3",             // 月
    day: "15",              // 日
    birthTime: "12:30",     // 24小時制時間
    hour: "午",             // 時辰 (derived)
    location: "台北市",      // 地點
    gender: "M",            // M/F
    language: "zh"          // zh/en/ja
}
```

### Git Workflow

- Main development branch: `claude/init-project-011CUqpWaYXctMM7v2Ch5Abt`
- Commit messages: Use `feat:`, `fix:`, `docs:`, etc. prefixes
- Push with: `git push -u origin <branch-name>`
- Branch name must start with `claude/` and end with session ID

## Gotchas and Pitfalls

1. **Lunar calendar encoding**: The `yearInfo` array in `lunar.js` uses bit encoding. Don't try to decode manually - use existing functions.

2. **Time zone assumptions**: System assumes local time zone. No explicit timezone conversion implemented.

3. **Browser compatibility**: HTML5 `<input type="time">` used - may not work on very old browsers.

4. **LocalStorage limits**: Birth data passed between pages via localStorage. Won't work if localStorage disabled.

5. **Star calculation order**: In `ziweicore.js`, stars must be calculated in specific sequence (紫微 first, then 天府, etc.) - order matters!

6. **Language file sync**: When updating one HTML file, remember to update corresponding translations in other language versions.

7. **Console errors**: Check browser console. Common issues:
   - Missing or incorrect file paths for JS/CSS
   - LocalStorage access errors (if testing via `file://` protocol)
   - Undefined variables if calculation functions called before data loaded

## Contact and Resources

- **Project Owner**: chinghssu@gmail.com
- **Buy Me a Coffee**: https://buymeacoffee.com/jinhssu
- **Original Author**: cubshuang (noted in README.md)
- **Deployment**: Designed for GitHub Pages or any static hosting
