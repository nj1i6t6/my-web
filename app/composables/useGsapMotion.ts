/**
 * GSAP 無障礙動畫 Composable
 * 
 * 自動偵測 prefers-reduced-motion 並調整 GSAP 動畫行為
 * 確保無障礙訪問性
 */

import { gsap } from 'gsap'

export const useGsapMotion = () => {
  const prefersReducedMotion = ref(false)

  // 偵測使用者偏好設定
  if (process.client) {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    prefersReducedMotion.value = mediaQuery.matches

    // 監聽變更
    mediaQuery.addEventListener('change', (e) => {
      prefersReducedMotion.value = e.matches
    })
  }

  /**
   * 建立考慮無障礙的 GSAP 動畫
   * @param target - 動畫目標
   * @param vars - GSAP 動畫參數
   * @returns GSAP Tween
   */
  const gsapTo = (target: gsap.TweenTarget, vars: gsap.TweenVars) => {
    if (prefersReducedMotion.value) {
      // 如果使用者偏好減少動畫，立即設定最終狀態
      return gsap.set(target, vars)
    }
    return gsap.to(target, vars)
  }

  /**
   * 建立考慮無障礙的 GSAP from 動畫
   */
  const gsapFrom = (target: gsap.TweenTarget, vars: gsap.TweenVars) => {
    if (prefersReducedMotion.value) {
      return gsap.set(target, vars)
    }
    return gsap.from(target, vars)
  }

  /**
   * 建立考慮無障礙的 GSAP fromTo 動畫
   */
  const gsapFromTo = (
    target: gsap.TweenTarget,
    fromVars: gsap.TweenVars,
    toVars: gsap.TweenVars
  ) => {
    if (prefersReducedMotion.value) {
      return gsap.set(target, toVars)
    }
    return gsap.fromTo(target, fromVars, toVars)
  }

  /**
   * 建立考慮無障礙的 GSAP timeline
   */
  const gsapTimeline = (vars?: gsap.TimelineVars) => {
    const tl = gsap.timeline(vars)
    
    if (prefersReducedMotion.value) {
      // 如果偏好減少動畫，將 timeline 設為立即完成
      tl.timeScale(1000)
    }
    
    return tl
  }

  /**
   * 取得動畫持續時間（考慮無障礙）
   * @param duration - 原始持續時間
   * @returns 調整後的持續時間
   */
  const getAnimationDuration = (duration: number) => {
    return prefersReducedMotion.value ? 0 : duration
  }

  return {
    prefersReducedMotion: readonly(prefersReducedMotion),
    gsapTo,
    gsapFrom,
    gsapFromTo,
    gsapTimeline,
    getAnimationDuration,
  }
}
