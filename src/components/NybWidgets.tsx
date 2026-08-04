import type { CSSProperties, ReactNode } from 'react'
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Bell,
  MoreHorizontal,
  TrendingDown,
  TrendingUp,
  X,
} from 'lucide-react'

/**
 * Presentational cores of the web-app dashboard widgets — §18 "preview =
 * production": ONE renderer for the widget visuals, imported by BOTH apps.
 *
 * The markup and classes here are the web-app's dashboard components,
 * verbatim; those components now delegate their rendering to these cores and
 * keep only data fetching / i18n / routing. The admin preview renders the
 * same cores with sample data, so the two apps cannot drift visually.
 *
 * Consumers must let Tailwind scan `common/src` (both apps do) — semantic
 * classes (bg-card, text-success, …) resolve through each app's own theme
 * variables, which is exactly right: widgets render in the host's palette.
 */

const cx = (...parts: Array<string | false | null | undefined>) => parts.filter(Boolean).join(' ')

/** web-app Card variant="elevated" — floating dashboard tile. */
const ELEVATED_CARD =
  'rounded-xl bg-card text-card-foreground shadow-[0_8px_24px_-12px_rgba(0,0,0,0.12)] dark:border dark:border-border/40 dark:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.5)]'

// ---------------------------------------------------------------------------
// KPI card — anatomy of web-app DashboardKpiCard
// ---------------------------------------------------------------------------

export interface NybKpiCardProps {
  title: string
  /** Whole-dollar portion of the value (or any string if not currency) */
  whole: string
  /** Cents portion, rendered superscript. Omit for non-currency values. */
  cents?: string
  /** Currency prefix, defaults to `$`. Pass empty string for non-currency. */
  prefix?: string
  subtitle?: string
  trend?: { direction: 'up' | 'down' | 'flat'; label: string }
  /** Footer "view all" — rendered through `renderLink` when provided. */
  viewAll?: { label: string; href: string }
  /** Hide the top-right "more options" (⋯) affordance (fuel/broker KPI rows). */
  hideMoreOptions?: boolean
  /**
   * Link renderer (web-app passes react-router's Link; admin preview omits it
   * and gets a non-navigating span with identical styling).
   */
  renderLink?: (props: { href: string; className: string; children: ReactNode }) => ReactNode
  className?: string
}

const TrendChip = ({ trend }: { trend: NonNullable<NybKpiCardProps['trend']> }) => (
  <span
    className={cx(
      'inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[11px] font-semibold',
      trend.direction === 'up' && 'bg-success/10 text-success',
      trend.direction === 'down' && 'bg-destructive/10 text-destructive',
      trend.direction === 'flat' && 'bg-muted text-muted-foreground'
    )}
  >
    {trend.direction === 'up' && <ArrowUp className="h-3 w-3" aria-hidden />}
    {trend.direction === 'down' && <ArrowDown className="h-3 w-3" aria-hidden />}
    {trend.label}
  </span>
)

export function NybKpiCard({
  title,
  whole,
  cents,
  prefix = '$',
  subtitle,
  trend,
  viewAll,
  hideMoreOptions,
  renderLink,
  className,
}: Readonly<NybKpiCardProps>) {
  const footerClass =
    'inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline'
  return (
    <div className={cx(ELEVATED_CARD, 'flex h-full flex-col gap-3 p-5', className)}>
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-foreground">{title}</p>
        {!hideMoreOptions && (
          <MoreHorizontal className="h-4 w-4 text-muted-foreground/60" aria-hidden />
        )}
      </div>

      <div className="leading-none">
        <span className="text-3xl font-bold tracking-tight text-foreground">
          {prefix}
          {whole}
        </span>
        {cents !== undefined && (
          <span className="ml-0.5 align-top text-base font-bold tracking-tight text-foreground">
            {cents}
          </span>
        )}
      </div>

      {(subtitle || trend) && (
        <div className="flex items-center gap-2">
          {trend && <TrendChip trend={trend} />}
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
      )}

      {viewAll && (
        <div className="mt-auto pt-2">
          {renderLink ? (
            renderLink({
              href: viewAll.href,
              className: footerClass,
              children: (
                <>
                  {viewAll.label}
                  <ArrowRight className="h-3 w-3" aria-hidden />
                </>
              ),
            })
          ) : (
            <span className={footerClass}>
              {viewAll.label}
              <ArrowRight className="h-3 w-3" aria-hidden />
            </span>
          )}
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// List widget frame + rows — anatomy of the web-app list widgets
// (recent transactions / payment requests / fuel orders)
// ---------------------------------------------------------------------------

export interface NybWidgetCardProps {
  title: string
  /** Right side of the header — "View all" link, badge, etc. */
  headerAction?: ReactNode
  children: ReactNode
  className?: string
  style?: CSSProperties
}

export function NybWidgetCard({
  title,
  headerAction,
  children,
  className,
  style,
}: Readonly<NybWidgetCardProps>) {
  // `.app-card` already supplies rounded-xl + bg-card + shadow and forces
  // `border: none`. Re-declaring `rounded-lg`/`border` here was wrong: the
  // utilities layer beats the components layer, so `rounded-lg` silently
  // downgraded the radius to 8px (production tiles are 12px) while `border`
  // rendered nothing at all. Let app-card own the frame.
  return (
    <div
      className={cx('app-card bg-card text-card-foreground !p-5 sm:!p-6', className)}
      style={style}
    >
      <div className="mb-4 flex items-center justify-between gap-2">
        {/* text-foreground is explicit, not inherited. This heading previously
            carried no colour class and fell through to the card's
            `text-card-foreground`. That works in web-app, whose :root defines
            --card-foreground — but the admin config preview scopes a theme by
            injecting a small set of vars inline (--card, --background,
            --foreground, --primary, --border, --input, --muted, --accent,
            --ring) and does NOT inject --card-foreground, so the title resolved
            against whatever cascaded in and read as invisible. Every heading
            that renders correctly in that preview uses --foreground, so bind to
            it directly rather than depending on a var the host may not set. */}
        <h3 className="text-base font-semibold text-foreground sm:text-lg">{title}</h3>
        {headerAction}
      </div>
      {children}
    </div>
  )
}

export interface NybListRowProps {
  /** Icon chip on the left; `tone` tints its circle (success/destructive). */
  icon?: ReactNode
  iconTone?: 'success' | 'destructive' | 'muted'
  primary: ReactNode
  secondary?: ReactNode
  /** Extra faint monospace line (e.g. a reference number). */
  tertiary?: ReactNode
  /** Right-aligned value; `valueTone` colors it (e.g. +/− money). */
  value?: ReactNode
  valueTone?: 'success' | 'destructive' | 'default'
  /** Trailing interactive slot (dropdown menu etc.) — web-app only. */
  action?: ReactNode
  /**
   * Spacing between the value and the trailing slot. The release surfaces this
   * presenter replaced were not uniform: the transaction list paired the amount
   * with a kebab menu at `gap-2` ('tight'), while the broker deal list paired it
   * with a status pill at `gap-3` ('roomy') — a pill needs the extra air to read
   * as a separate object rather than a suffix on the number. Defaults to
   * 'tight', so existing callers are unchanged.
   */
  valueGap?: 'tight' | 'roomy'
}

export function NybListRow({
  icon,
  iconTone = 'muted',
  primary,
  secondary,
  tertiary,
  value,
  valueTone = 'default',
  action,
  valueGap = 'tight',
}: Readonly<NybListRowProps>) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-3">
        {icon && (
          <div
            className={cx(
              'shrink-0 rounded-full p-2',
              iconTone === 'success' && 'bg-success/10 text-success',
              iconTone === 'destructive' && 'bg-destructive/10 text-destructive',
              iconTone === 'muted' && 'bg-muted text-muted-foreground'
            )}
          >
            {icon}
          </div>
        )}
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-foreground">{primary}</p>
          {secondary && <p className="text-xs text-muted-foreground">{secondary}</p>}
          {tertiary && (
            <p className="truncate font-mono text-xs text-muted-foreground/60">{tertiary}</p>
          )}
        </div>
      </div>
      <div className={cx('flex shrink-0 items-center', valueGap === 'roomy' ? 'gap-3' : 'gap-2')}>
        {value !== undefined && (
          // tabular-nums: this slot renders money (transaction amounts, payment
          // request totals, deal values) but is NOT one of the numeric-* type
          // tokens that bake tabular figures in, so it has to be explicit —
          // web-app docs/typography.md rule 1. Without it, digits shift width
          // between rows and the right-aligned column visibly ragged.
          <span
            className={cx(
              'text-sm font-semibold tabular-nums',
              valueTone === 'success' && 'text-success',
              valueTone === 'destructive' && 'text-destructive'
            )}
          >
            {value}
          </span>
        )}
        {action}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Pending-actions banner — anatomy of DashboardPendingPaymentsBanner
// ---------------------------------------------------------------------------

export interface NybPendingBannerProps {
  icon?: ReactNode
  message: ReactNode
  /** Action link/button slot on the right (web-app passes its router link). */
  action?: ReactNode
  onDismiss?: () => void
  dismissLabel?: string
}

export function NybPendingBanner({
  icon,
  message,
  action,
  onDismiss,
  dismissLabel = 'Dismiss',
}: Readonly<NybPendingBannerProps>) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3">
      {icon ?? <Bell className="h-4 w-4 shrink-0 animate-bounce text-primary" aria-hidden />}
      <p className="flex-1 text-sm text-foreground">{message}</p>
      {action}
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
          aria-label={dismissLabel}
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Money-flow stat rows — anatomy of DashboardSpendChart's received/spent rows
// (the donut plot itself stays a slot: web-app passes recharts, admin a mock)
// ---------------------------------------------------------------------------

export interface NybMoneyFlowStatsProps {
  receivedLabel: string
  receivedValue: string
  spentLabel: string
  spentValue: string
  /** The plot (recharts donut in web-app; a static ring in previews). */
  chart?: ReactNode
}

export function NybMoneyFlowStats({
  receivedLabel,
  receivedValue,
  spentLabel,
  spentValue,
  chart,
}: Readonly<NybMoneyFlowStatsProps>) {
  return (
    <div className="flex items-center gap-4 sm:gap-6 lg:flex-col lg:items-center xl:flex-row">
      {chart && <div className="h-36 w-36 shrink-0">{chart}</div>}
      <div className="flex min-w-0 flex-1 flex-col gap-2.5 lg:w-full xl:flex-1">
        <div className="flex items-center gap-2.5 rounded-lg bg-success/5 p-2.5">
          <div className="shrink-0 rounded-full bg-success/10 p-1.5">
            <TrendingUp className="h-3.5 w-3.5 text-success" aria-hidden />
          </div>
          <div className="min-w-0">
            <p className="mb-0.5 text-xs leading-none text-muted-foreground">{receivedLabel}</p>
            <p className="truncate text-sm font-bold text-success">{receivedValue}</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 rounded-lg bg-destructive/5 p-2.5">
          <div className="shrink-0 rounded-full bg-destructive/10 p-1.5">
            <TrendingDown className="h-3.5 w-3.5 text-destructive" aria-hidden />
          </div>
          <div className="min-w-0">
            <p className="mb-0.5 text-xs leading-none text-muted-foreground">{spentLabel}</p>
            <p className="truncate text-sm font-bold text-destructive">{spentValue}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
