---
title: '從 Vue 2 到 Nuxt 4：前端遷移完整指南'
description: '詳細記錄從 Vue 2 Options API 遷移到 Nuxt 4 Composition API 的實戰經驗'
date: 2024-11-20
category: 'Frontend'
tags: ['Vue 3', 'Nuxt 4', 'TypeScript', 'Migration']
image: '/images/blog/vue-nuxt.jpg'
author: 'Simon Su'
---

# 從 Vue 2 到 Nuxt 4：前端遷移完整指南

## 為什麼遷移？

Vue 2 將於 2023 年底停止維護，加上 Nuxt 4 提供的 SSR、SEO 優化與開發體驗，遷移是必然選擇。

## 遷移策略

### 階段一：組件轉換

```vue
<!-- Before: Options API -->
<script>
export default {
  data() {
    return { count: 0 }
  },
  methods: {
    increment() {
      this.count++
    }
  }
}
</script>

<!-- After: Composition API -->
<script setup lang="ts">
const count = ref(0)
const increment = () => count.value++
</script>
```

### 階段二：狀態管理

從 Vuex 遷移到 Pinia，享受更好的 TypeScript 支援。

### 階段三：路由與 SSR

Nuxt 4 的檔案系統路由簡化了配置，同時提供完整 SSR 支援。

## 踩坑紀錄

1. **Reactive 解構問題**：使用 `toRefs()` 保持響應性
2. **生命週期差異**：`created` → `onMounted`
3. **Plugin 兼容性**：部分插件需要重新尋找替代方案

## 效能對比

| 指標 | Vue 2 | Nuxt 4 |
|------|-------|--------|
| FCP | 2.3s | 0.8s |
| LCP | 3.1s | 1.2s |
| Bundle Size | 180kb | 95kb |

## 結論

遷移過程雖然耗時，但成果顯著。建議團隊分階段進行，確保穩定過渡。

---

*更多前端技術分享，請追蹤[部落格](/blog)！*
