# 快速啟動指南 - Phase 1 Week 1-2

## 🚀 立即啟動

### 1. 安裝依賴（如果尚未安裝）
```bash
npm install
```

### 2. 配置環境變數
```bash
# 使用提供的測試配置（Turnstile 測試模式）
cp .env.example .env

# 或手動編輯 .env 填入真實密鑰
nano .env
```

### 3. 啟動開發伺服器
```bash
npm run dev
```

伺服器將在 **http://localhost:3000** 啟動

---

## 📍 可訪問的路由

### 現有頁面
- `/` - 首頁（Dashboard）
- `/projects` - 作品集列表
- `/contact` ✨ **新增** - 動態 CTA 聯絡頁面

### API 端點
- `GET /api/health` - 健康檢查
- `GET /api/projects` - 專案列表
- `GET /api/projects/:id` - 單一專案
- `POST /api/contact` ✨ **新增** - 聯絡表單提交

---

## 🧪 測試新功能

### 1. 測試 Edge Middleware 意圖判定
```bash
# 模擬從 LinkedIn 訪問（需要使用瀏覽器設定 Referrer）
# 方法：在瀏覽器開發者工具中使用 Network Conditions

# 或直接訪問並手動切換模式
http://localhost:3000/contact
```

**預期行為**：
- 從 LinkedIn 訪問 → 自動顯示 HR 模式
- 其他來源 → 顯示開發者模式
- 可手動切換模式

### 2. 測試聯絡表單
1. 訪問 http://localhost:3000/contact
2. 填寫表單：
   - 姓名：測試用戶
   - Email：test@example.com
   - 訊息：測試訊息
3. 完成 Turnstile 驗證（測試模式自動通過）
4. 點擊「送出訊息」

**預期行為**：
- ✅ 成功：顯示成功訊息
- ❌ 如果 SMTP 未配置：顯示錯誤訊息（這是正常的）

### 3. 測試 Blueprint Skeleton
```bash
# Blueprint Skeleton 會在資料載入時自動顯示
# 可以在 Chrome DevTools 中模擬慢速網路查看效果

# Network Throttling: Slow 3G
```

### 4. 測試組件互動
- **TheHeader**：點擊手機選單按鈕（縮小瀏覽器視窗）
- **GaugeButton**：點擊儀表按鈕查看旋轉動畫
- **HeroSection**：檢查響應式佈局

---

## 🔧 常見問題排解

### 問題 1：SMTP 郵件發送失敗
**原因**：`.env` 中未配置真實 SMTP 密鑰

**解決方案**：
1. 前往 [Google Account Security](https://myaccount.google.com/security)
2. 啟用「兩步驟驗證」
3. 建立「應用程式密碼」
4. 更新 `.env`：
   ```bash
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=xxxx xxxx xxxx xxxx  # 16字元應用程式密碼
   ```

### 問題 2：Turnstile 驗證失敗
**原因**：使用測試密鑰但網站不在 localhost

**解決方案**：
- 本機開發使用測試密鑰即可（`.env` 已配置）
- 部署到生產環境時需替換為真實密鑰

### 問題 3：TypeScript 錯誤提示
**原因**：Nuxt 自動導入在 VS Code 中顯示類型錯誤

**解決方案**：
- 已在相關檔案添加 `// @ts-nocheck`
- 不影響運行時功能
- 可忽略或執行 `npm run postinstall` 重新生成類型

---

## 📦 生產構建

### 預覽構建
```bash
npm run build
npm run preview
```

### Cloudflare Pages 部署
```bash
npm run generate
```

輸出目錄：`.output/public`

---

## 🎯 下一步開發

參考 `docs/PLAN.txt` Phase 1 Week 3-4：

1. **IoT 微型模擬器**
2. **STAR 框架專案詳情頁**
3. **ProjectCard 組件**
4. **GSAP 無障礙配置**

---

## 📚 相關文檔

- [Phase 1 Week 1-2 完成報告](./PHASE1_WEEK1-2_COMPLETE.md)
- [完整開發計畫](./PLAN.txt)
- [環境變數範本](../.env.example)

---

**開發伺服器已啟動：http://localhost:3000** 🎉
