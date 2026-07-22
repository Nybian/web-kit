import { d as ResolvedSideMenuItem, c as ResolvedSideMenu, f as ResolvedWidgets, e as ResolvedWidget, a as ResolvedConfig } from '../types-BW9qDc_X.js';
export { R as ResolvedBrand, b as ResolvedOnboarding } from '../types-BW9qDc_X.js';

/**
 * Pure, framework-agnostic helpers for consuming the resolved config overlay.
 * No React, no network — safe to use in any Nybian frontend or a test.
 */

/** Max items the mobile bottom bar renders before collapsing into "More". */
declare const MOBILE_BOTTOM_BAR_MAX = 4;
interface VisibilityContext {
    /** Returns true if the caller holds the given permission code (wildcards handled by the app). */
    hasPermission: (code: string) => boolean;
    /** Feature codes accessible to the caller/tenant. */
    features: ReadonlySet<string> | string[];
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
declare function isSideMenuItemVisible(item: ResolvedSideMenuItem, ctx: VisibilityContext): boolean;
/** Filter every axis of a resolved side menu by the caller's permissions/features. */
declare function filterSideMenu(menu: ResolvedSideMenu, ctx: VisibilityContext): ResolvedSideMenu;
interface BottomBarLayout {
    /** Items rendered as direct bottom-bar tabs (capped at `max`). */
    primary: ResolvedSideMenuItem[];
    /** Items that overflow into a "More" sheet. */
    overflow: ResolvedSideMenuItem[];
    /** Whether a "More" affordance is needed. */
    hasMore: boolean;
}
/**
 * Split the bottom-bar items into the primary tabs + a "More" overflow.
 * When there are more than `max` items, the last slot is reserved for "More".
 */
declare function bottomBarLayout(items: ResolvedSideMenuItem[], max?: number): BottomBarLayout;
/**
 * Flatten a resolved widget layout into a single list ordered by a GLOBAL
 * `sortOrder`. The dashboard is a flat, top-to-bottom list of widgets; `slot`
 * is retained as descriptive metadata on each widget but does NOT affect order
 * (presets assign a monotonic sortOrder across the whole layout).
 */
declare function flattenWidgets(widgets: ResolvedWidgets): ResolvedWidget[];

/**
 * Pure snake_case → camelCase mapper for the backend `resolved_config` payload.
 * Framework-agnostic and defensive (no zod) — apps that validate with zod can
 * keep doing so; apps without a validation layer map directly with this.
 */

interface RawSideMenuItem {
    key: string;
    label: string;
    path: string;
    icon: string;
    section: string;
    sort_order?: number;
    show_on_mobile?: boolean;
    mobile_sort_order?: number;
    show_in_bottom_bar?: boolean;
    bottom_bar_sort_order?: number;
    require_permissions?: string[];
    require_features?: string[];
}
interface RawWidget {
    widget_id: string;
    slot: string;
    is_enabled?: boolean;
    config?: Record<string, unknown> | null;
    sort_order?: number;
    col_span?: number | null;
    row_span?: number | null;
    show_on_mobile?: boolean;
    mobile_sort_order?: number;
    code?: string | null;
    name?: string | null;
    type?: string | null;
}
interface RawBrand {
    display_name?: string | null;
    show_company_name?: boolean;
    logo_url?: string | null;
    login_logo_light_url?: string | null;
    login_logo_dark_url?: string | null;
    dashboard_logo_light_url?: string | null;
    dashboard_logo_dark_url?: string | null;
    favicon_url?: string | null;
    support_email?: string | null;
    theme_name?: string | null;
    theme_tokens?: Record<string, string> | null;
    theme_tokens_dark?: Record<string, string> | null;
    show_nybian_logo?: boolean | null;
    backdrop_light_url?: string | null;
    backdrop_dark_url?: string | null;
    footer_text?: string | null;
    scope?: string;
}
interface RawResolvedConfig {
    side_menu?: {
        desktop?: RawSideMenuItem[];
        mobile?: RawSideMenuItem[];
        bottom_bar?: RawSideMenuItem[];
    } | null;
    widgets?: {
        source?: string;
        slots?: Record<string, RawWidget[]>;
    } | null;
    term_overrides?: Record<string, string> | null;
    brand?: RawBrand | null;
    onboarding?: {
        onboarding_status?: string | null;
        is_onboarded?: boolean;
        feature_behaviors?: Record<string, string> | null;
    } | null;
}
/** Map the raw backend `resolved_config` object into the canonical camelCase shape. */
declare function mapResolvedConfig(raw: RawResolvedConfig | null | undefined): ResolvedConfig | null;

export { type BottomBarLayout, MOBILE_BOTTOM_BAR_MAX, type RawBrand, type RawResolvedConfig, type RawSideMenuItem, type RawWidget, ResolvedConfig, ResolvedSideMenu, ResolvedSideMenuItem, ResolvedWidget, ResolvedWidgets, type VisibilityContext, bottomBarLayout, filterSideMenu, flattenWidgets, isSideMenuItemVisible, mapResolvedConfig };
