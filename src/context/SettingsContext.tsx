import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Settings } from '../types'
import { KEYS, loadJSON, saveJSON } from '../lib/storage'
import { setHapticsEnabled } from '../lib/haptics'

const DEFAULTS: Settings = {
  theme: 'sistem',
  arabicSize: 30,
  arabicLeading: 2.15,
  haptics: true,
  shakeToCount: false,
  keepAwake: true,
  showLatin: true,
  showTranslation: true,
  autoAdvance: true,
  airplaneReminder: true,
}

interface SettingsContextValue {
  settings: Settings
  update: <K extends keyof Settings>(key: K, value: Settings[K]) => void
  reset: () => void
  resolvedTheme: 'terang' | 'gelap'
}

const SettingsContext = createContext<SettingsContextValue | null>(null)

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(() => ({
    ...DEFAULTS,
    ...loadJSON<Partial<Settings>>(KEYS.settings, {}),
  }))
  const [systemDark, setSystemDark] = useState(
    () => typeof matchMedia !== 'undefined' && matchMedia('(prefers-color-scheme: dark)').matches,
  )

  useEffect(() => {
    const mq = matchMedia('(prefers-color-scheme: dark)')
    const onChange = (e: MediaQueryListEvent) => setSystemDark(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const resolvedTheme: 'terang' | 'gelap' =
    settings.theme === 'sistem' ? (systemDark ? 'gelap' : 'terang') : settings.theme

  useEffect(() => {
    saveJSON(KEYS.settings, settings)
    setHapticsEnabled(settings.haptics)
  }, [settings])

  useEffect(() => {
    const root = document.documentElement
    root.dataset.theme = resolvedTheme === 'gelap' ? 'dark' : 'light'
    root.style.setProperty('--arabic-size', `${settings.arabicSize}px`)
    root.style.setProperty('--arabic-leading', String(settings.arabicLeading))
    const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]:not([media])')
    if (meta) meta.content = resolvedTheme === 'gelap' ? '#0b0f0d' : '#f2f4f3'
  }, [resolvedTheme, settings.arabicSize, settings.arabicLeading])

  const update = useCallback<SettingsContextValue['update']>((key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }, [])

  const reset = useCallback(() => setSettings(DEFAULTS), [])

  const value = useMemo(
    () => ({ settings, update, reset, resolvedTheme }),
    [settings, update, reset, resolvedTheme],
  )

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}

export function useSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext)
  if (!ctx) throw new Error('useSettings harus dipakai di dalam SettingsProvider')
  return ctx
}
