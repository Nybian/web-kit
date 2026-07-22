/**
 * Pure snake_case → camelCase mapper for the backend `resolved_config` payload.
 * Framework-agnostic and defensive (no zod) — apps that validate with zod can
 * keep doing so; apps without a validation layer map directly with this.
 */
import type { ResolvedBrand, ResolvedConfig, ResolvedSideMenuItem, ResolvedWidget } from './types'

export interface RawSideMenuItem {
  key: string
  label: string
  path: string
  icon: string
  section: string
  sort_order?: number
  show_on_mobile?: boolean
  mobile_sort_order?: number
  show_in_bottom_bar?: boolean
  bottom_bar_sort_order?: number
  require_permissions?: string[]
  require_features?: string[]
}

export interface RawWidget {
  widget_id: string
  slot: string
  is_enabled?: boolean
  config?: Record<string, unknown> | null
  sort_order?: number
  col_span?: number | null
  row_span?: number | null
  show_on_mobile?: boolean
  mobile_sort_order?: number
  code?: string | null
  name?: string | null
  type?: string | null
}

export interface RawBrand {
  display_name?: string | null
  show_company_name?: boolean
  logo_url?: string | null
  login_logo_light_url?: string | null
  login_logo_dark_url?: string | null
  dashboard_logo_light_url?: string | null
  dashboard_logo_dark_url?: string | null
  favicon_url?: string | null
  support_email?: string | null
  theme_name?: string | null
  theme_tokens?: Record<string, string> | null
  theme_tokens_dark?: Record<string, string> | null
  show_nybian_logo?: boolean | null
  backdrop_light_url?: string | null
  backdrop_dark_url?: string | null
  footer_text?: string | null
  scope?: string
}

export interface RawResolvedConfig {
  side_menu?: {
    desktop?: RawSideMenuItem[]
    mobile?: RawSideMenuItem[]
    bottom_bar?: RawSideMenuItem[]
  } | null
  widgets?: { source?: string; slots?: Record<string, RawWidget[]> } | null
  term_overrides?: Record<string, string> | null
  brand?: RawBrand | null
  onboarding?: {
    onboarding_status?: string | null
    is_onboarded?: boolean
    feature_behaviors?: Record<string, string> | null
  } | null
}

const mapItem = (i: RawSideMenuItem): ResolvedSideMenuItem => ({
  key: i.key,
  label: i.label,
  path: i.path,
  icon: i.icon,
  section: i.section,
  sortOrder: i.sort_order ?? 0,
  showOnMobile: i.show_on_mobile ?? true,
  mobileSortOrder: i.mobile_sort_order ?? 0,
  showInBottomBar: i.show_in_bottom_bar ?? false,
  bottomBarSortOrder: i.bottom_bar_sort_order ?? 0,
  requirePermissions: i.require_permissions ?? [],
  requireFeatures: i.require_features ?? [],
})

const mapWidget = (w: RawWidget): ResolvedWidget => ({
  widgetId: w.widget_id,
  slot: w.slot,
  isEnabled: w.is_enabled ?? true,
  config: w.config ?? null,
  sortOrder: w.sort_order ?? 0,
  colSpan: w.col_span ?? null,
  rowSpan: w.row_span ?? null,
  showOnMobile: w.show_on_mobile ?? true,
  mobileSortOrder: w.mobile_sort_order ?? 0,
  code: w.code ?? null,
  name: w.name ?? null,
  type: w.type ?? null,
})

const mapBrand = (b: RawBrand): ResolvedBrand => ({
  displayName: b.display_name ?? null,
  showCompanyName: b.show_company_name ?? true,
  logoUrl: b.logo_url ?? null,
  loginLogoLightUrl: b.login_logo_light_url ?? null,
  loginLogoDarkUrl: b.login_logo_dark_url ?? null,
  dashboardLogoLightUrl: b.dashboard_logo_light_url ?? null,
  dashboardLogoDarkUrl: b.dashboard_logo_dark_url ?? null,
  faviconUrl: b.favicon_url ?? null,
  supportEmail: b.support_email ?? null,
  themeName: b.theme_name ?? null,
  themeTokens: b.theme_tokens ?? {},
  themeTokensDark: b.theme_tokens_dark ?? {},
  showNybianLogo: b.show_nybian_logo ?? false,
  backdropLightUrl: b.backdrop_light_url ?? null,
  backdropDarkUrl: b.backdrop_dark_url ?? null,
  footerText: b.footer_text ?? null,
  scope: b.scope ?? 'unknown',
})

/** Map the raw backend `resolved_config` object into the canonical camelCase shape. */
export function mapResolvedConfig(
  raw: RawResolvedConfig | null | undefined
): ResolvedConfig | null {
  if (!raw) return null
  const sm = raw.side_menu
  const widgets = raw.widgets
  return {
    sideMenu: sm
      ? {
          desktop: (sm.desktop ?? []).map(mapItem),
          mobile: (sm.mobile ?? []).map(mapItem),
          bottomBar: (sm.bottom_bar ?? []).map(mapItem),
        }
      : null,
    widgets: widgets
      ? {
          source: widgets.source ?? 'unknown',
          slots: Object.fromEntries(
            Object.entries(widgets.slots ?? {}).map(([slot, list]) => [slot, list.map(mapWidget)])
          ),
        }
      : null,
    termOverrides: raw.term_overrides ?? {},
    brand: raw.brand ? mapBrand(raw.brand) : null,
    onboarding: {
      onboardingStatus: raw.onboarding?.onboarding_status ?? null,
      isOnboarded: raw.onboarding?.is_onboarded ?? false,
      featureBehaviors: raw.onboarding?.feature_behaviors ?? {},
    },
  }
}
