import * as react from 'react';
import { ReactNode, CSSProperties } from 'react';
import { d as ResolvedSideMenuItem, e as ResolvedWidget } from '../types-BW9qDc_X.js';

interface NybMobileBottomBarProps {
    /** Bottom-bar items from the resolved config (already permission-filtered). */
    items: ResolvedSideMenuItem[];
    /** The currently active route path, used to highlight the active tab. */
    activePath: string;
    /** Navigate to a menu item's path. */
    onNavigate: (path: string) => void;
    /** Render an icon node for a menu item's icon key. */
    renderIcon: (iconKey: string) => ReactNode;
    /** Resolve the display label for an item (e.g. i18n). Defaults to `item.label`. */
    resolveLabel?: (item: ResolvedSideMenuItem) => string;
    /** Label for the overflow ("More") tab. */
    moreLabel?: string;
    /** Icon key for the overflow tab. */
    moreIconKey?: string;
    /** Open the "More" sheet when overflow items exist. */
    onOpenMore?: (overflow: ResolvedSideMenuItem[]) => void;
    className?: string;
}
/**
 * Presentational mobile bottom navigation bar driven by the resolved per-tenant
 * side menu. Renders up to 4 tabs; extra items collapse into a "More" tab.
 * Framework-agnostic beyond React — the host supplies navigation + icons.
 */
declare function NybMobileBottomBar({ items, activePath, onNavigate, renderIcon, resolveLabel, moreLabel, moreIconKey, onOpenMore, className, }: NybMobileBottomBarProps): react.JSX.Element;

/**
 * Mock content per widget catalog code — the "production-fidelity mock data"
 * the tenant-config doc specifies for admin previews (§06): real card anatomy
 * and plausible sample numbers, since preview surfaces have no tenant data.
 * Codes mirror the s027 widget catalog / web-app dashboard registry.
 */
interface NybWidgetPreviewSample {
    value?: string;
    sub?: string;
    rows?: [string, string][];
}
declare const NYB_WIDGET_PREVIEW_SAMPLES: Record<string, NybWidgetPreviewSample>;
interface NybWidgetPreviewCardProps {
    widget: ResolvedWidget;
    style?: CSSProperties;
}
/**
 * A single dashboard widget rendered as a preview card with mock data. Spans
 * its `colSpan` on the consumer's 12-column grid (clamped to 3–12 so cards
 * stay legible in narrow preview panes).
 */
declare function NybWidgetPreviewCard({ widget, style }: NybWidgetPreviewCardProps): react.JSX.Element;

declare function NybWidgetPreview({ widget }: {
    widget: ResolvedWidget;
}): react.JSX.Element;
/** True iff NybWidgetPreview renders a real preview (not the generic skeleton). */
declare function isSampleHandled(code: string): boolean;

interface NybKpiCardProps {
    title: string;
    /** Whole-dollar portion of the value (or any string if not currency) */
    whole: string;
    /** Cents portion, rendered superscript. Omit for non-currency values. */
    cents?: string;
    /** Currency prefix, defaults to `$`. Pass empty string for non-currency. */
    prefix?: string;
    subtitle?: string;
    trend?: {
        direction: 'up' | 'down' | 'flat';
        label: string;
    };
    /** Footer "view all" — rendered through `renderLink` when provided. */
    viewAll?: {
        label: string;
        href: string;
    };
    /** Hide the top-right "more options" (⋯) affordance (fuel/broker KPI rows). */
    hideMoreOptions?: boolean;
    /**
     * Link renderer (web-app passes react-router's Link; admin preview omits it
     * and gets a non-navigating span with identical styling).
     */
    renderLink?: (props: {
        href: string;
        className: string;
        children: ReactNode;
    }) => ReactNode;
    className?: string;
}
declare function NybKpiCard({ title, whole, cents, prefix, subtitle, trend, viewAll, hideMoreOptions, renderLink, className, }: Readonly<NybKpiCardProps>): react.JSX.Element;
interface NybWidgetCardProps {
    title: string;
    /** Right side of the header — "View all" link, badge, etc. */
    headerAction?: ReactNode;
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
}
declare function NybWidgetCard({ title, headerAction, children, className, style, }: Readonly<NybWidgetCardProps>): react.JSX.Element;
interface NybListRowProps {
    /** Icon chip on the left; `tone` tints its circle (success/destructive). */
    icon?: ReactNode;
    iconTone?: 'success' | 'destructive' | 'muted';
    primary: ReactNode;
    secondary?: ReactNode;
    /** Extra faint monospace line (e.g. a reference number). */
    tertiary?: ReactNode;
    /** Right-aligned value; `valueTone` colors it (e.g. +/− money). */
    value?: ReactNode;
    valueTone?: 'success' | 'destructive' | 'default';
    /** Trailing interactive slot (dropdown menu etc.) — web-app only. */
    action?: ReactNode;
    /**
     * Spacing between the value and the trailing slot. The release surfaces this
     * presenter replaced were not uniform: the transaction list paired the amount
     * with a kebab menu at `gap-2` ('tight'), while the broker deal list paired it
     * with a status pill at `gap-3` ('roomy') — a pill needs the extra air to read
     * as a separate object rather than a suffix on the number. Defaults to
     * 'tight', so existing callers are unchanged.
     */
    valueGap?: 'tight' | 'roomy';
}
declare function NybListRow({ icon, iconTone, primary, secondary, tertiary, value, valueTone, action, valueGap, }: Readonly<NybListRowProps>): react.JSX.Element;
interface NybPendingBannerProps {
    icon?: ReactNode;
    message: ReactNode;
    /** Action link/button slot on the right (web-app passes its router link). */
    action?: ReactNode;
    onDismiss?: () => void;
    dismissLabel?: string;
}
declare function NybPendingBanner({ icon, message, action, onDismiss, dismissLabel, }: Readonly<NybPendingBannerProps>): react.JSX.Element;
interface NybMoneyFlowStatsProps {
    receivedLabel: string;
    receivedValue: string;
    spentLabel: string;
    spentValue: string;
    /** The plot (recharts donut in web-app; a static ring in previews). */
    chart?: ReactNode;
}
declare function NybMoneyFlowStats({ receivedLabel, receivedValue, spentLabel, spentValue, chart, }: Readonly<NybMoneyFlowStatsProps>): react.JSX.Element;

interface NybHeroBalanceProps {
    title: string;
    whole: string;
    cents: string;
    currencyCode?: string;
    inflow?: string;
    outflow?: string;
    periodLabel?: string;
    /**
     * Interactive period selector (web-app injects a shadcn dropdown; admin
     * preview omits it and the static `periodLabel` chip shows instead). Kept as
     * a slot so common stays framework-light.
     */
    periodControl?: ReactNode;
    verified?: boolean;
    /** 30-day trend plot (recharts area in web-app; a static mock in previews). */
    chart?: ReactNode;
    emptyChartLabel?: string;
}
declare function NybHeroBalance({ title, whole, cents, currencyCode, inflow, outflow, periodLabel, periodControl, verified, chart, emptyChartLabel, }: Readonly<NybHeroBalanceProps>): react.JSX.Element;
interface NybAccountRow {
    walletId: string;
    /** Display title (wallet name or a "<currency> wallet" fallback). */
    title: string;
    whole: string;
    cents: string;
    currency: string;
    isDefault: boolean;
}
interface NybAccountsPanelProps {
    title: string;
    /** e.g. "3 active" — already localized by the caller. */
    activeLabel: string;
    accounts: NybAccountRow[];
    maxRows?: number;
    emptyLabel: string;
    defaultLabel: string;
    moreLabel?: (extra: number) => string;
    /** Optional "View all" footer link label; omit to hide the footer. */
    viewAllLabel?: string;
    viewAllHref?: string;
    /** Wraps a wallet row / footer with the host router link. */
    renderLink?: (props: {
        href: string;
        className: string;
        children: ReactNode;
    }) => ReactNode;
}
declare function NybAccountsPanel({ title, activeLabel, accounts, maxRows, emptyLabel, defaultLabel, moreLabel, viewAllLabel, viewAllHref, renderLink, }: Readonly<NybAccountsPanelProps>): react.JSX.Element;

export { NYB_WIDGET_PREVIEW_SAMPLES, type NybAccountRow, NybAccountsPanel, type NybAccountsPanelProps, NybHeroBalance, type NybHeroBalanceProps, NybKpiCard, type NybKpiCardProps, NybListRow, type NybListRowProps, NybMobileBottomBar, type NybMobileBottomBarProps, NybMoneyFlowStats, type NybMoneyFlowStatsProps, NybPendingBanner, type NybPendingBannerProps, NybWidgetCard, type NybWidgetCardProps, NybWidgetPreview, NybWidgetPreviewCard, type NybWidgetPreviewCardProps, type NybWidgetPreviewSample, isSampleHandled };
