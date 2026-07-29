import type { ReactNode } from 'react'
import { ArrowDownRight, ArrowRight, ArrowUpRight, BadgeCheck, ChevronDown, Star, Wallet } from 'lucide-react'

/**
 * Presentational cores for the hero balance + accounts panel — the last two
 * dashboard tiles that lived only in web-app. §18 "preview = production":
 * both apps render THESE, so hero/accounts can no longer drift.
 *
 * Framework-light: no recharts, no router. The trend chart is an injected
 * `chart` slot (web-app passes its recharts area; admin a static mock), and
 * links go through `renderLink` (web-app passes react-router's Link).
 */

const cx = (...parts: Array<string | false | null | undefined>) => parts.filter(Boolean).join(' ')

const ELEVATED_CARD =
  'rounded-xl bg-card text-card-foreground shadow-[0_8px_24px_-12px_rgba(0,0,0,0.12)] dark:border dark:border-border/40 dark:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.5)]'

// ---------------------------------------------------------------------------
// Hero balance — anatomy of web-app DashboardHeroBalance
// ---------------------------------------------------------------------------

export interface NybHeroBalanceProps {
  title: string
  whole: string
  cents: string
  currencyCode?: string
  inflow?: string
  outflow?: string
  periodLabel?: string
  /**
   * Interactive period selector (web-app injects a shadcn dropdown; admin
   * preview omits it and the static `periodLabel` chip shows instead). Kept as
   * a slot so common stays framework-light.
   */
  periodControl?: ReactNode
  verified?: boolean
  /** 30-day trend plot (recharts area in web-app; a static mock in previews). */
  chart?: ReactNode
  emptyChartLabel?: string
}

export function NybHeroBalance({
  title,
  whole,
  cents,
  currencyCode,
  inflow,
  outflow,
  periodLabel = 'Last 30 days',
  periodControl,
  verified = true,
  chart,
  emptyChartLabel = 'No trend data yet',
}: Readonly<NybHeroBalanceProps>) {
  return (
    <div className={cx(ELEVATED_CARD, 'flex h-full flex-col gap-4 p-6')}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-1.5">
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          {verified && <BadgeCheck className="h-4 w-4 text-info" aria-hidden />}
        </div>
        {currencyCode && (
          <span className="text-xs font-medium text-muted-foreground">{currencyCode}</span>
        )}
      </div>

      <div className="leading-none">
        <span className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
          ${whole}
        </span>
        {/* Superscript cents with no decimal point — $1,498¹⁰, not $1,498.¹⁰ (NYB QA). */}
        <span className="ml-0.5 align-top text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {cents}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        {periodControl ?? (
          <span className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground">
            {periodLabel}
            <ChevronDown className="h-3 w-3" aria-hidden />
          </span>
        )}
        {inflow && (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-success">
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            {inflow}
          </span>
        )}
        {outflow && (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-destructive">
            <ArrowDownRight className="h-3.5 w-3.5" aria-hidden />
            {outflow}
          </span>
        )}
      </div>

      {/* select-none — a click/drag on the SVG otherwise triggers native text
          selection across the axis labels (NYB-528). */}
      <div className="-mx-2 mt-auto h-44 sm:h-48 select-none">
        {chart ?? (
          <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
            {emptyChartLabel}
          </div>
        )}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Accounts panel — anatomy of the FlyerDashboard / WidgetHeroAccounts panel
// ---------------------------------------------------------------------------

export interface NybAccountRow {
  walletId: string
  /** Display title (wallet name or a "<currency> wallet" fallback). */
  title: string
  whole: string
  cents: string
  currency: string
  isDefault: boolean
}

export interface NybAccountsPanelProps {
  title: string
  /** e.g. "3 active" — already localized by the caller. */
  activeLabel: string
  accounts: NybAccountRow[]
  maxRows?: number
  emptyLabel: string
  defaultLabel: string
  moreLabel?: (extra: number) => string
  /** Optional "View all" footer link label; omit to hide the footer. */
  viewAllLabel?: string
  viewAllHref?: string
  /** Wraps a wallet row / footer with the host router link. */
  renderLink?: (props: { href: string; className: string; children: ReactNode }) => ReactNode
}

export function NybAccountsPanel({
  title,
  activeLabel,
  accounts,
  maxRows = 4,
  emptyLabel,
  defaultLabel,
  moreLabel = (n) => `+ ${n} more`,
  viewAllLabel,
  viewAllHref,
  renderLink,
}: Readonly<NybAccountsPanelProps>) {
  const shown = [...accounts]
    .sort((a, b) => Number(b.isDefault) - Number(a.isDefault))
    .slice(0, maxRows)
  const extra = accounts.length - maxRows

  const rowInner = (bal: NybAccountRow) => (
    <div className="p-3 shadow-sm rounded-lg border bg-card transition-all hover:border-2 hover:border-primary hover:shadow-md">
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0 overflow-hidden flex-1">
          <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase truncate">
            {bal.title}
          </p>
          <p className="text-base font-bold text-foreground tracking-tight truncate leading-tight mt-0.5">
            ${bal.whole}
            <span className="text-xs font-normal text-muted-foreground">.{bal.cents}</span>
          </p>
        </div>
        <div className="flex h-7 w-7 items-center justify-center rounded-full flex-shrink-0 bg-muted">
          <Wallet className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
        </div>
      </div>
      <div className="mt-2 pt-2 border-t border-border flex items-center gap-1.5 flex-wrap">
        <span className="rounded-full bg-secondary px-1.5 py-0 text-[10px] uppercase text-secondary-foreground">
          {bal.currency}
        </span>
        {bal.isDefault && (
          <span className="inline-flex items-center gap-0.5 rounded-full bg-primary px-1.5 py-0 text-[10px] text-primary-foreground">
            <Star className="h-2.5 w-2.5 fill-current" aria-hidden />
            {defaultLabel}
          </span>
        )}
      </div>
    </div>
  )

  const footerClass =
    'mt-auto inline-flex items-center justify-center gap-1 rounded-md border border-border bg-background px-3 py-2 text-xs font-medium text-foreground hover:bg-muted'

  return (
    <div className={cx(ELEVATED_CARD, 'flex h-full flex-col gap-3 p-5')}>
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {title}
        </h3>
        <span className="text-xs text-muted-foreground">{activeLabel}</span>
      </div>

      {accounts.length === 0 ? (
        <p className="text-sm text-muted-foreground">{emptyLabel}</p>
      ) : (
        <div className="flex flex-col gap-2">
          {shown.map((bal) =>
            renderLink && viewAllHref ? (
              <span key={bal.walletId} className="block">
                {renderLink({ href: viewAllHref, className: 'block', children: rowInner(bal) })}
              </span>
            ) : (
              <div key={bal.walletId}>{rowInner(bal)}</div>
            )
          )}
          {extra > 0 && <p className="px-1 text-xs text-muted-foreground">{moreLabel(extra)}</p>}
        </div>
      )}

      {viewAllLabel &&
        viewAllHref &&
        (renderLink ? (
          renderLink({
            href: viewAllHref,
            className: footerClass,
            children: (
              <>
                {viewAllLabel}
                <ArrowRight className="h-3 w-3" aria-hidden />
              </>
            ),
          })
        ) : (
          <span className={footerClass}>
            {viewAllLabel}
            <ArrowRight className="h-3 w-3" aria-hidden />
          </span>
        ))}
    </div>
  )
}
