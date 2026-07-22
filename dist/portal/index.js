// src/portal/resolve.ts
var MOBILE_BOTTOM_BAR_MAX = 4;
function isSideMenuItemVisible(item, ctx) {
  if (item.requirePermissions.length > 0 && !item.requirePermissions.some((p) => ctx.hasPermission(p))) {
    return false;
  }
  return true;
}
function filterSideMenu(menu, ctx) {
  const keep = (i) => isSideMenuItemVisible(i, ctx);
  return {
    desktop: menu.desktop.filter(keep),
    mobile: menu.mobile.filter(keep),
    bottomBar: menu.bottomBar.filter(keep)
  };
}
function bottomBarLayout(items, max = MOBILE_BOTTOM_BAR_MAX) {
  const ordered = [...items].sort((a, b) => a.bottomBarSortOrder - b.bottomBarSortOrder);
  if (ordered.length <= max) {
    return { primary: ordered, overflow: [], hasMore: false };
  }
  const primary = ordered.slice(0, max - 1);
  const overflow = ordered.slice(max - 1);
  return { primary, overflow, hasMore: true };
}
function flattenWidgets(widgets) {
  return Object.values(widgets.slots).flat().sort((a, b) => a.sortOrder - b.sortOrder);
}

// src/portal/map.ts
var mapItem = (i) => ({
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
  requireFeatures: i.require_features ?? []
});
var mapWidget = (w) => ({
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
  type: w.type ?? null
});
var mapBrand = (b) => ({
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
  scope: b.scope ?? "unknown"
});
function mapResolvedConfig(raw) {
  if (!raw) return null;
  const sm = raw.side_menu;
  const widgets = raw.widgets;
  return {
    sideMenu: sm ? {
      desktop: (sm.desktop ?? []).map(mapItem),
      mobile: (sm.mobile ?? []).map(mapItem),
      bottomBar: (sm.bottom_bar ?? []).map(mapItem)
    } : null,
    widgets: widgets ? {
      source: widgets.source ?? "unknown",
      slots: Object.fromEntries(
        Object.entries(widgets.slots ?? {}).map(([slot, list]) => [slot, list.map(mapWidget)])
      )
    } : null,
    termOverrides: raw.term_overrides ?? {},
    brand: raw.brand ? mapBrand(raw.brand) : null,
    onboarding: {
      onboardingStatus: raw.onboarding?.onboarding_status ?? null,
      isOnboarded: raw.onboarding?.is_onboarded ?? false,
      featureBehaviors: raw.onboarding?.feature_behaviors ?? {}
    }
  };
}

export { MOBILE_BOTTOM_BAR_MAX, bottomBarLayout, filterSideMenu, flattenWidgets, isSideMenuItemVisible, mapResolvedConfig };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map