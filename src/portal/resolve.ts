/**
 * Pure, framework-agnostic helpers for consuming the resolved config overlay.
 * No React, no network — safe to use in any Nybian frontend or a test.
 */
import type {
  ResolvedSideMenu,
  ResolvedSideMenuItem,
  ResolvedWidget,
  ResolvedWidgets,
} from './types'

/** Max items the mobile bottom bar renders before collapsing into "More". */
export const MOBILE_BOTTOM_BAR_MAX = 4

export interface VisibilityContext {
  /** Returns true if the caller holds the given permission code (wildcards handled by the app). */
  hasPermission: (code: string) => boolean
  /** Feature codes accessible to the caller/tenant. */
  features: ReadonlySet<string> | string[]
}

/**
 * A side-menu item is visible when the caller holds ANY required permission
 * (or none are required). Mirrors the backend menu-filter semantics.
 *
 * Feature gating was deliberately REMOVED (menu-driven feature model): the
 * menu decides what a tenant sees — assigning a menu item auto-enables its
 * required features on the backend, so a feature check here would only hide
 * items on stale data. `ctx.features` is kept for signature compatibility.
 */
export function isSideMenuItemVisible(item: ResolvedSideMenuItem, ctx: VisibilityContext): boolean {
  if (
    item.requirePermissions.length > 0 &&
    !item.requirePermissions.some((p) => ctx.hasPermission(p))
  ) {
    return false
  }
  return true
}

/** Filter every axis of a resolved side menu by the caller's permissions/features. */
export function filterSideMenu(menu: ResolvedSideMenu, ctx: VisibilityContext): ResolvedSideMenu {
  const keep = (i: ResolvedSideMenuItem) => isSideMenuItemVisible(i, ctx)
  return {
    desktop: menu.desktop.filter(keep),
    mobile: menu.mobile.filter(keep),
    bottomBar: menu.bottomBar.filter(keep),
  }
}

export interface BottomBarLayout {
  /** Items rendered as direct bottom-bar tabs (capped at `max`). */
  primary: ResolvedSideMenuItem[]
  /** Items that overflow into a "More" sheet. */
  overflow: ResolvedSideMenuItem[]
  /** Whether a "More" affordance is needed. */
  hasMore: boolean
}

/**
 * Split the bottom-bar items into the primary tabs + a "More" overflow.
 * When there are more than `max` items, the last slot is reserved for "More".
 */
export function bottomBarLayout(
  items: ResolvedSideMenuItem[],
  max: number = MOBILE_BOTTOM_BAR_MAX
): BottomBarLayout {
  const ordered = [...items].sort((a, b) => a.bottomBarSortOrder - b.bottomBarSortOrder)
  if (ordered.length <= max) {
    return { primary: ordered, overflow: [], hasMore: false }
  }
  const primary = ordered.slice(0, max - 1)
  const overflow = ordered.slice(max - 1)
  return { primary, overflow, hasMore: true }
}

/**
 * Flatten a resolved widget layout into a single list ordered by a GLOBAL
 * `sortOrder`. The dashboard is a flat, top-to-bottom list of widgets; `slot`
 * is retained as descriptive metadata on each widget but does NOT affect order
 * (presets assign a monotonic sortOrder across the whole layout).
 */
export function flattenWidgets(widgets: ResolvedWidgets): ResolvedWidget[] {
  return Object.values(widgets.slots)
    .flat()
    .sort((a, b) => a.sortOrder - b.sortOrder)
}
