/**
 * Canonical per-tenant config overlay types, shared across Nybian frontends.
 *
 * These mirror the camelCase shape produced by each app's `/me/config`
 * transform from the backend `resolved_config` object (api-service
 * ConfigResolverService). Validation (zod, etc.) stays per-app; only the
 * resolved TypeScript shape and pure helpers live here.
 */

export interface ResolvedSideMenuItem {
  key: string
  label: string
  path: string
  icon: string
  section: string
  sortOrder: number
  showOnMobile: boolean
  mobileSortOrder: number
  showInBottomBar: boolean
  bottomBarSortOrder: number
  requirePermissions: string[]
  requireFeatures: string[]
}

export interface ResolvedSideMenu {
  desktop: ResolvedSideMenuItem[]
  mobile: ResolvedSideMenuItem[]
  bottomBar: ResolvedSideMenuItem[]
}

export interface ResolvedWidget {
  widgetId: string
  slot: string
  isEnabled: boolean
  config: Record<string, unknown> | null
  sortOrder: number
  colSpan: number | null
  rowSpan: number | null
  showOnMobile: boolean
  mobileSortOrder: number
  code: string | null
  name: string | null
  type: string | null
}

export interface ResolvedWidgets {
  source: string
  slots: Record<string, ResolvedWidget[]>
}

export interface ResolvedBrand {
  displayName: string | null
  showCompanyName: boolean
  logoUrl: string | null
  loginLogoLightUrl: string | null
  loginLogoDarkUrl: string | null
  dashboardLogoLightUrl: string | null
  dashboardLogoDarkUrl: string | null
  faviconUrl: string | null
  supportEmail: string | null
  themeName: string | null
  themeTokens: Record<string, string>
  /** Dark palette from the brand bundle; empty when the brand has none. */
  themeTokensDark: Record<string, string>
  /** "powered by Nybian" co-brand mark (assigned shared brands only). */
  showNybianLogo: boolean
  backdropLightUrl: string | null
  backdropDarkUrl: string | null
  footerText: string | null
  scope: string
}

export interface ResolvedOnboarding {
  onboardingStatus: string | null
  isOnboarded: boolean
  /**
   * Per-feature pre-onboarding behavior (feature code → hidden|locked|read_only),
   * emitted only while the org is NOT onboarded. 'visible' features are omitted.
   */
  featureBehaviors: Record<string, string>
}

export interface ResolvedConfig {
  sideMenu: ResolvedSideMenu | null
  widgets: ResolvedWidgets | null
  termOverrides: Record<string, string>
  brand: ResolvedBrand | null
  onboarding: ResolvedOnboarding
}
