import { ArrowDownLeft, ArrowUpRight, Zap } from 'lucide-react'
import { NybAccountsPanel, NybHeroBalance } from './NybDashboardCards'
import type { NybAccountRow } from './NybDashboardCards'
import {
  NybKpiCard,
  NybListRow,
  NybMoneyFlowStats,
  NybPendingBanner,
  NybWidgetCard,
} from './NybWidgets'
import type { ResolvedWidget } from '../portal/types'

/**
 * Renders a resolved widget with the SAME components the web-app dashboard
 * uses (@nybian/common NybWidgets) — §18 "preview = production" — fed
 * with sample data, since the admin has no tenant data to query.
 */

interface KpiSample {
  whole: string
  cents?: string
  prefix?: string
  subtitle?: string
  trend?: { direction: 'up' | 'down' | 'flat'; label: string }
}

const KPI_SAMPLES: Record<string, KpiSample> = {
  balance: { whole: '12,480', cents: '00', subtitle: '3 active wallets', trend: { direction: 'up', label: '12%' } },
  connections: { whole: '18', prefix: '', subtitle: '2 pending invites' },
  beneficiaries: { whole: '7', prefix: '', subtitle: '1 awaiting review' },
  pending_invitations: { whole: '3', prefix: '', subtitle: 'sent this week' },
  fuel_pending: { whole: '5', prefix: '', subtitle: 'orders awaiting confirmation' },
  fuel_variance: { whole: '2', prefix: '', subtitle: 'uplifts above tolerance', trend: { direction: 'down', label: '1' } },
  fbo_awaiting_invoice: { whole: '4', prefix: '', subtitle: 'uplifts to invoice' },
  today_volume: { whole: '12,400', prefix: '', subtitle: 'litres across 6 uplifts' },
  margin_30d: { whole: '8.2%', prefix: '', subtitle: 'rolling 30 days', trend: { direction: 'up', label: '0.4%' } },
  pilot_pending: { whole: '2', prefix: '', subtitle: 'one-tap confirmations' },
}

const LIST_SAMPLES: Record<
  string,
  { rows: { primary: string; secondary: string; value: string; tone?: 'success' | 'destructive' }[] }
> = {
  overdue_payment_requests: {
    rows: [
      { primary: 'Falcon Charter', secondary: 'Due 12 days ago', value: '$8,400' },
      { primary: 'Skyline Ops', secondary: 'Due 3 days ago', value: '$2,150' },
    ],
  },
  // Broker pipeline — one row per deal status, count on the left, bucket value
  // on the right (web-app's WidgetBrokerPipeline renders the live equivalent).
  broker_pipeline: {
    rows: [
      { primary: 'Quoted', secondary: '4 deals', value: '$96,500' },
      { primary: 'Booked', secondary: '2 deals', value: '$54,000' },
      { primary: 'In review', secondary: '3 deals', value: '$35,500' },
    ],
  },
  // Broker upcoming flights — route on the left, departure date as the value.
  broker_upcoming_flights: {
    rows: [
      { primary: 'KTEB → KMIA', secondary: 'Meridian Group', value: 'Aug 12' },
      { primary: 'EGLL → LFPB', secondary: 'Ardent Capital', value: 'Aug 15' },
      { primary: 'KVNY → KLAS', secondary: 'Cobalt Air', value: 'Aug 19' },
    ],
  },
  received_payment_requests: {
    rows: [
      { primary: 'Acme Corp', secondary: 'Jul 2, 2026', value: '$4,200' },
      { primary: 'Globex', secondary: 'Jun 30, 2026', value: '$8,900' },
    ],
  },
  recent_fuel_orders: {
    rows: [
      { primary: 'KTEB · Jet-A 900 gal', secondary: 'Confirmed', value: '$5,310', tone: 'success' },
      { primary: 'KVNY · Jet-A 450 gal', secondary: 'Pending', value: '$2,655' },
    ],
  },
  variance_needs_attention: {
    rows: [
      { primary: 'KJFK uplift · Gulf Jet', secondary: 'Above tolerance', value: '+310 L', tone: 'destructive' },
      { primary: 'KTEB uplift · Skyline', secondary: 'Below tolerance', value: '−120 L', tone: 'destructive' },
    ],
  },
  broker_recent_deals: {
    rows: [
      { primary: 'KTEB → KMIA · Gulfstream G550', secondary: 'Confirmed', value: '$48,500', tone: 'success' },
      { primary: 'KVNY → KLAS · Citation X', secondary: 'In review', value: '$32,900' },
    ],
  },
  flyer_upcoming_trips_list: {
    rows: [
      { primary: 'KTEB → KMIA · Gulfstream G550', secondary: 'Jul 14, 2026 · Confirmed', value: '$48,500', tone: 'success' },
      { primary: 'KVNY → KLAS · Citation X', secondary: 'Jul 18, 2026 · Booked', value: '$32,900' },
    ],
  },
  flyer_requests_list: {
    rows: [
      { primary: 'KMIA → KTEB · Falcon 2000', secondary: 'Awaiting your approval', value: '$41,200' },
      { primary: 'KLAS → KSFO · Phenom 300', secondary: 'Quote requested', value: '$18,750' },
    ],
  },
}

/** Sample wallet rows for the shared NybAccountsPanel presenter. */
const ACCOUNT_SAMPLES: NybAccountRow[] = [
  { walletId: 'w-usd', title: 'USD wallet', whole: '12,480', cents: '00', currency: 'USD', isDefault: true },
  { walletId: 'w-eur', title: 'EUR wallet', whole: '2,150', cents: '00', currency: 'EUR', isDefault: false },
]

/** Static sparkline stand-in for the recharts trend web-app injects. */
function MockSparkline() {
  return (
    <div className="flex h-full items-end gap-1">
      {[40, 55, 48, 62, 70, 58, 66, 78, 72, 84].map((h, i) => (
        <div
          key={i}
          style={{ height: `${h}%` }}
          className="flex-1 rounded-sm bg-primary/25"
        />
      ))}
    </div>
  )
}

const TX_ROWS = [
  { primary: 'Acme Corp', secondary: 'Jul 2, 2026', value: '+$4,200.00', incoming: true },
  { primary: 'Jet Fuel Ltd', secondary: 'Jul 1, 2026', value: '-$1,120.00', incoming: false },
  { primary: 'Globex', secondary: 'Jun 30, 2026', value: '+$8,900.00', incoming: true },
]

function MockDonut() {
  return (
    <div className="grid h-full w-full place-items-center">
      <div className="h-28 w-28 rounded-full border-[14px] border-success/70 [border-bottom-color:hsl(var(--destructive)/0.6)] [border-left-color:hsl(var(--destructive)/0.6)]" />
    </div>
  )
}

/**
 * Primary-CTA labels for the greeting sample, keyed by the `primary_cta` value a
 * preset sets in `config_override`. Must stay in step with web-app's
 * WidgetGreetingBar — the preview's whole job is to show what the dashboard will
 * actually render.
 */
const PRIMARY_CTA_LABELS: Record<string, string> = {
  new_deal: 'New Deal',
  new_fuel_order: 'New Fuel Order',
  fbo_delivery_queue: 'Open Delivery Queue',
}

/**
 * Resolve the greeting sample's primary CTA from the widget's config.
 *
 * This used to be the hardcoded string 'New Deal', which made the preview lie
 * for every non-broker category: a fuel_reseller or FBO preset still previewed a
 * broker CTA, and no amount of changing the category could alter it. The config
 * is already on the widget (`ResolvedWidget.config`) and already populated by
 * both callers — the wizard reads it from the real resolved config, and the
 * by-category editor passes `config_override` — so nothing new needs plumbing.
 *
 * 'New Deal' remains the fallback for an unset/unknown value, matching the
 * dashboard's own behavior when a preset predates `primary_cta`.
 */
function primaryCtaLabel(config: Record<string, unknown> | null): string {
  const key = typeof config?.primary_cta === 'string' ? config.primary_cta : ''
  return PRIMARY_CTA_LABELS[key] ?? 'New Deal'
}

export function NybWidgetPreview({ widget }: { widget: ResolvedWidget }) {
  const code = widget.code ?? ''
  const title = widget.name ?? code ?? 'Widget'

  if (KPI_SAMPLES[code]) {
    return (
      <NybKpiCard
        title={title}
        {...KPI_SAMPLES[code]}
        viewAll={{ label: 'View', href: '#' }}
      />
    )
  }

  if (code === 'greeting_quick_actions') {
    return (
      <div className="space-y-2">
        <p className="text-lg font-semibold text-foreground">Welcome back, Alex</p>
        <div className="flex gap-2">
          {[primaryCtaLabel(widget.config), 'Send', 'Top Up'].map((label, i) => (
            <span
              key={label}
              className={
                i === 0
                  ? 'rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground'
                  : 'rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground'
              }
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    )
  }

  if (code === 'notification_bar') {
    return (
      <NybPendingBanner
        message="2 new items since your last visit — 1 payment request, 1 fuel order."
        action={<span className="shrink-0 text-xs font-medium text-primary">Open</span>}
      />
    )
  }

  if (code === 'hero_balance') {
    // Same shared presenter the web-app WidgetHeroBalance renders (⅔ of the top
    // row) — preview = production. The period selector is a static chip here
    // (the live dropdown needs the wallet data endpoints).
    return (
      <NybHeroBalance
        title="Available funds"
        whole="24,180"
        cents="55"
        currencyCode="USD"
        inflow="$6.4K"
        outflow="-$2.6K"
        chart={<MockSparkline />}
        verified
      />
    )
  }

  if (code === 'accounts_panel') {
    // Same shared presenter the web-app WidgetAccountsPanel renders (⅓ of the
    // top row).
    return (
      <NybAccountsPanel
        title="Wallets"
        activeLabel="2 Active"
        accounts={ACCOUNT_SAMPLES}
        emptyLabel="No active wallets."
        defaultLabel="Default"
        viewAllLabel="View All Wallets"
        viewAllHref="#"
      />
    )
  }

  if (code === 'flyer_greeting') {
    return (
      <div className="space-y-2">
        <p className="text-lg font-semibold text-foreground">Welcome back, Alex</p>
        <div className="flex gap-2">
          {['New Trip', 'Send', 'Top Up'].map((label, i) => (
            <span
              key={label}
              className={
                i === 0
                  ? 'rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground'
                  : 'rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground'
              }
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    )
  }

  if (code === 'flyer_hero_balance') {
    // Same shared presenter the web-app WidgetFlyerHeroBalance renders (⅔ of the
    // top row). The flyer hero has no inflow/outflow chips.
    return (
      <NybHeroBalance
        title="Available funds"
        whole="12,480"
        cents="00"
        currencyCode="USD"
        chart={<MockSparkline />}
        verified
      />
    )
  }

  if (code === 'flyer_accounts_panel') {
    // Same shared presenter the web-app WidgetFlyerAccountsPanel renders (⅓).
    return (
      <NybAccountsPanel
        title="Accounts"
        activeLabel="2 active"
        accounts={ACCOUNT_SAMPLES}
        emptyLabel="No active accounts."
        defaultLabel="Default"
        viewAllLabel="View all"
        viewAllHref="#"
      />
    )
  }

  if (code === 'flyer_kpis') {
    return (
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <NybKpiCard title="Upcoming" whole="2" prefix="" subtitle="Booked & confirmed" viewAll={{ label: 'Plan', href: '#' }} />
        <NybKpiCard title="Action needed" whole="1" prefix="" subtitle="Awaiting your review" trend={{ direction: 'down', label: 'review' }} viewAll={{ label: 'Review', href: '#' }} />
        <NybKpiCard title="Total spend" whole="48,500" cents="00" subtitle="Across 8 completed" viewAll={{ label: 'History', href: '#' }} />
        <NybKpiCard title="Completed" whole="8" prefix="" subtitle="Trips flown" viewAll={{ label: 'View', href: '#' }} />
      </div>
    )
  }

  if (code === 'flyer_money_movement') {
    return (
      <NybWidgetCard title="Money movement (30d)">
        <dl className="grid grid-cols-2 gap-4">
          <div>
            <dt className="text-xs text-muted-foreground">Money in</dt>
            <dd className="text-2xl font-bold tracking-tight text-muted-foreground">—</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Money out</dt>
            <dd className="text-2xl font-bold tracking-tight text-muted-foreground">—</dd>
          </div>
        </dl>
      </NybWidgetCard>
    )
  }

  if (code === 'fuel_kpis') {
    return (
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <NybKpiCard title="Open fuel orders" whole="5" prefix="" subtitle="Pending" trend={{ direction: 'up', label: '5 active' }} hideMoreOptions viewAll={{ label: 'Open Dispatch', href: '#' }} />
        <NybKpiCard title="Variance queue" whole="2" prefix="" subtitle="Needs Ops Attention" trend={{ direction: 'down', label: 'attention' }} hideMoreOptions viewAll={{ label: 'Resolve', href: '#' }} />
        <NybKpiCard title="Today's volume" whole="12,400" prefix="" subtitle="litres across 6 uplifts" hideMoreOptions viewAll={{ label: 'Order History', href: '#' }} />
        <NybKpiCard title="Connections" whole="18" prefix="" subtitle="Active Relationships" hideMoreOptions viewAll={{ label: 'Manage', href: '#' }} />
      </div>
    )
  }

  if (code === 'broker_kpis') {
    // Same DashboardKpiCard family the web-app WidgetBrokerKpis renders — the
    // deal-pipeline tile row. The recent-deals list is a separate widget
    // (broker_recent_deals) handled by the generic LIST_SAMPLES branch below.
    return (
      <div className="grid grid-cols-4 gap-3">
        {(
          [
            ['Pipeline', '$186K'],
            ['Revenue', '$42K'],
            ['Action needed', '3'],
            ['Upcoming', '5'],
          ] as [string, string][]
        ).map(([label, value]) => (
          <NybKpiCard key={label} title={label} whole={value} subtitle="30 days" />
        ))}
      </div>
    )
  }

  if (code === 'broker_action_items') {
    // Attention banner: warning-tinted surface, one chip per deal awaiting the
    // broker's review. Mirrors web-app's WidgetBrokerActionItems, which also
    // renders no heading — production shows the count sentence, not a title.
    return (
      <div className="rounded-lg border border-warning/30 bg-warning/10 p-4">
        <div className="flex items-start gap-3">
          <Zap className="mt-0.5 h-5 w-5 shrink-0 text-warning" aria-hidden />
          <div className="flex-1 space-y-2">
            <p className="text-sm font-semibold text-foreground">3 deals need your attention</p>
            <div className="flex flex-wrap gap-2">
              {['KTEB → KMIA', 'EGLL → LFPB', 'KVNY → KLAS'].map((route) => (
                <span
                  key={route}
                  className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-2 py-1 text-xs font-medium text-foreground"
                >
                  {route}
                  <span className="rounded-full bg-secondary px-1.5 text-[10px] uppercase text-secondary-foreground">
                    In review
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (code === 'pending_banner') {
    return (
      <NybPendingBanner
        message="You have 3 payment requests waiting for review."
        action={<span className="shrink-0 text-xs font-medium text-primary">Review</span>}
      />
    )
  }

  if (code === 'money_flow') {
    return (
      <NybWidgetCard title={title}>
        <NybMoneyFlowStats
          receivedLabel="Received"
          receivedValue="$4,200.00"
          spentLabel="Spent"
          spentValue="$2,590.00"
          chart={<MockDonut />}
        />
      </NybWidgetCard>
    )
  }

  if (code === 'recent_transactions') {
    return (
      <NybWidgetCard
        title={title}
        headerAction={<span className="text-xs font-medium text-primary">View all</span>}
      >
        <div className="space-y-3 sm:space-y-4">
          {TX_ROWS.map((row) => (
            <NybListRow
              key={row.primary}
              icon={
                row.incoming ? (
                  <ArrowDownLeft className="h-4 w-4" />
                ) : (
                  <ArrowUpRight className="h-4 w-4" />
                )
              }
              iconTone={row.incoming ? 'success' : 'destructive'}
              primary={row.primary}
              secondary={row.secondary}
              value={row.value}
              valueTone={row.incoming ? 'success' : 'destructive'}
            />
          ))}
        </div>
      </NybWidgetCard>
    )
  }

  if (LIST_SAMPLES[code]) {
    return (
      <NybWidgetCard
        title={title}
        headerAction={<span className="text-xs font-medium text-primary">View all</span>}
      >
        <div className="space-y-4">
          {LIST_SAMPLES[code].rows.map((row) => (
            <NybListRow
              key={row.primary}
              primary={row.primary}
              secondary={row.secondary}
              value={row.value}
              valueTone={row.tone}
            />
          ))}
        </div>
      </NybWidgetCard>
    )
  }

  return (
    <NybWidgetCard title={title}>
      <div className="space-y-2">
        <div className="h-2 w-3/4 rounded bg-muted" />
        <div className="h-2 w-1/2 rounded bg-muted" />
      </div>
    </NybWidgetCard>
  )
}

/**
 * Codes SampleWidget renders a real (non-skeleton) preview for. This is the
 * admin side of the single-source contract: the completeness test asserts every
 * manifest WidgetCode is in this set, so a code added to the manifest that the
 * admin preview would silently skeleton-render fails CI instead.
 */
const SAMPLE_SPECIAL_CODES = [
  'greeting_quick_actions',
  'notification_bar',
  'hero_balance',
  'accounts_panel',
  'broker_kpis',
  'fuel_kpis',
  'pending_banner',
  'money_flow',
  'recent_transactions',
  'flyer_greeting',
  'flyer_hero_balance',
  'flyer_accounts_panel',
  'flyer_kpis',
  'flyer_money_movement',
  'broker_action_items',
] as const

const HANDLED_CODES = new Set<string>([
  ...Object.keys(KPI_SAMPLES),
  ...Object.keys(LIST_SAMPLES),
  ...SAMPLE_SPECIAL_CODES,
])

/** True iff NybWidgetPreview renders a real preview (not the generic skeleton). */
export function isSampleHandled(code: string): boolean {
  return HANDLED_CODES.has(code)
}
