/**
 * Widget manifest — the SINGLE registry of every dashboard widget code.
 *
 * This is the source of truth both apps build against:
 *   - web-app maps each code to a data container (fetch → common presenter)
 *   - admin maps each code to sample data (→ same common presenter)
 * Both registries are typed `Record<WidgetCode, …>`, so a code added here
 * that either app doesn't handle is a TYPE error — never a silent skip.
 *
 * Framework-light: metadata only, no React. Presenters live in
 * `@nybian/common/components`; the code→presenter binding lives in each app.
 */

export type WidgetSlot = 'kpi' | 'attention' | 'money' | 'activity'
export type WidgetKind = 'kpi' | 'widget'

export interface WidgetMeta {
  /** 'kpi' collapses into the shared KPI row; 'widget' renders standalone. */
  kind: WidgetKind
  /** Dashboard zone the widget belongs to when the preset omits a slot. */
  slot: WidgetSlot
  /** Default 12-col span when the org/preset row leaves col_span null. */
  defaultColSpan: number
  defaultRowSpan: number
  /** Backend permission code required to render (gating stays app-side). */
  permissionCode: string
  /**
   * Page-chrome widget (a greeting/quick-actions header). When a resolved layout
   * contains one, the dashboard renders full-bleed and suppresses the shared
   * PageHeader — the widget carries its own greeting.
   */
  chrome?: boolean
}

/**
 * Every code the presets emit or an app renders. Adding a code here forces
 * both apps to handle it (typed registries) — that's the anti-drift contract.
 */
export const WIDGET_MANIFEST = {
  // ── KPI codes (collapse into the shared KPI row) ──────────────────────
  balance: {
    kind: 'kpi',
    slot: 'kpi',
    defaultColSpan: 3,
    defaultRowSpan: 1,
    permissionCode: 'wallets:read',
  },
  connections: {
    kind: 'kpi',
    slot: 'kpi',
    defaultColSpan: 3,
    defaultRowSpan: 1,
    permissionCode: 'members:read',
  },
  beneficiaries: {
    kind: 'kpi',
    slot: 'kpi',
    defaultColSpan: 3,
    defaultRowSpan: 1,
    permissionCode: 'beneficiaries:read',
  },
  pending_invitations: {
    kind: 'kpi',
    slot: 'kpi',
    defaultColSpan: 3,
    defaultRowSpan: 1,
    permissionCode: 'invitations:read',
  },
  fuel_pending: {
    kind: 'kpi',
    slot: 'kpi',
    defaultColSpan: 3,
    defaultRowSpan: 1,
    permissionCode: 'fuel:deals.read',
  },
  fuel_variance: {
    kind: 'kpi',
    slot: 'kpi',
    defaultColSpan: 3,
    defaultRowSpan: 1,
    permissionCode: 'fuel:admin.read',
  },
  fbo_awaiting_invoice: {
    kind: 'kpi',
    slot: 'kpi',
    defaultColSpan: 3,
    defaultRowSpan: 1,
    permissionCode: 'fbo:deals.read',
  },
  today_volume: {
    kind: 'kpi',
    slot: 'kpi',
    defaultColSpan: 3,
    defaultRowSpan: 1,
    permissionCode: 'fuel:deals.read',
  },
  margin_30d: {
    kind: 'kpi',
    slot: 'kpi',
    defaultColSpan: 3,
    defaultRowSpan: 1,
    permissionCode: 'fuel:deals.read',
  },
  pilot_pending: {
    kind: 'kpi',
    slot: 'kpi',
    defaultColSpan: 3,
    defaultRowSpan: 1,
    permissionCode: 'fuel:deals.read',
  },
  // ── Standalone widgets ────────────────────────────────────────────────
  // Bank-style page chrome (broker/fuel presets). Everything on those
  // dashboards is a full-width section widget in a single slot, so the preset's
  // sort order is the exact top-to-bottom page order (flattenWidgets keeps one
  // slot's arrangement intact).
  greeting_quick_actions: {
    kind: 'widget',
    slot: 'kpi',
    defaultColSpan: 12,
    defaultRowSpan: 1,
    permissionCode: 'dashboard:read',
    chrome: true,
  },
  notification_bar: {
    kind: 'widget',
    slot: 'kpi',
    defaultColSpan: 12,
    defaultRowSpan: 1,
    permissionCode: 'dashboard:read',
  },
  // Hero balance (⅔) + Wallets accounts panel (⅓) — split so each toggles
  // independently. transfers:read gates both (the release hero_accounts hid
  // the whole row from ops personas without it).
  hero_balance: {
    kind: 'widget',
    slot: 'kpi',
    defaultColSpan: 8,
    defaultRowSpan: 2,
    permissionCode: 'transfers:read',
  },
  accounts_panel: {
    kind: 'widget',
    slot: 'kpi',
    defaultColSpan: 4,
    defaultRowSpan: 2,
    permissionCode: 'transfers:read',
  },
  // Broker deal cards — the KPI tile row and the recent-deals list toggle
  // independently.
  broker_kpis: {
    kind: 'widget',
    slot: 'kpi',
    defaultColSpan: 12,
    defaultRowSpan: 1,
    permissionCode: 'dashboard:read',
  },
  broker_recent_deals: {
    kind: 'widget',
    slot: 'kpi',
    defaultColSpan: 12,
    defaultRowSpan: 1,
    permissionCode: 'dashboard:read',
  },
  // The three deal-pipeline sections the release/1.0.6 BrokerDashboard carried
  // that had no widget equivalent when the dashboard became config-driven. All
  // three read from the same `useDeals` fetch the KPI row already does, so
  // enabling them costs no extra request.
  //
  // `broker_action_items` is an attention surface — full width and meant to sit
  // high in the order (a banner below the fold is pointless). The other two are
  // a ⅔+⅓-style pair of half-width lists, matching the release two-column row.
  broker_action_items: {
    kind: 'widget',
    slot: 'kpi',
    defaultColSpan: 12,
    defaultRowSpan: 1,
    permissionCode: 'dashboard:read',
  },
  broker_pipeline: {
    kind: 'widget',
    slot: 'kpi',
    defaultColSpan: 6,
    defaultRowSpan: 2,
    permissionCode: 'dashboard:read',
  },
  broker_upcoming_flights: {
    kind: 'widget',
    slot: 'kpi',
    defaultColSpan: 6,
    defaultRowSpan: 2,
    permissionCode: 'dashboard:read',
  },
  fuel_kpis: {
    kind: 'widget',
    slot: 'kpi',
    defaultColSpan: 12,
    defaultRowSpan: 1,
    permissionCode: 'dashboard:read',
  },
  money_flow: {
    kind: 'widget',
    slot: 'money',
    defaultColSpan: 6,
    defaultRowSpan: 2,
    permissionCode: 'transfers:read',
  },
  recent_fuel_orders: {
    kind: 'widget',
    slot: 'activity',
    defaultColSpan: 6,
    defaultRowSpan: 2,
    permissionCode: 'fuel:deals.read',
  },
  pending_banner: {
    kind: 'widget',
    slot: 'attention',
    defaultColSpan: 12,
    defaultRowSpan: 1,
    permissionCode: 'payment_requests:read',
  },
  overdue_payment_requests: {
    kind: 'widget',
    slot: 'attention',
    defaultColSpan: 6,
    defaultRowSpan: 2,
    permissionCode: 'payment_requests:read',
  },
  received_payment_requests: {
    kind: 'widget',
    slot: 'money',
    defaultColSpan: 6,
    defaultRowSpan: 2,
    permissionCode: 'payment_requests:read',
  },
  recent_transactions: {
    kind: 'widget',
    slot: 'activity',
    defaultColSpan: 6,
    defaultRowSpan: 2,
    permissionCode: 'transfers:read',
  },
  variance_needs_attention: {
    kind: 'widget',
    slot: 'attention',
    defaultColSpan: 6,
    defaultRowSpan: 2,
    permissionCode: 'fuel:admin.read',
  },
  // Flyer dashboard — full-width section widgets (one slot, ordered) that
  // reproduce the release FlyerDashboard sections top-to-bottom.
  flyer_greeting: {
    kind: 'widget',
    slot: 'kpi',
    defaultColSpan: 12,
    defaultRowSpan: 1,
    permissionCode: 'dashboard:read',
    chrome: true,
  },
  // Flyer hero balance (⅔) + accounts panel (⅓) — split for independent toggles.
  flyer_hero_balance: {
    kind: 'widget',
    slot: 'kpi',
    defaultColSpan: 8,
    defaultRowSpan: 2,
    permissionCode: 'dashboard:read',
  },
  flyer_accounts_panel: {
    kind: 'widget',
    slot: 'kpi',
    defaultColSpan: 4,
    defaultRowSpan: 2,
    permissionCode: 'dashboard:read',
  },
  flyer_kpis: {
    kind: 'widget',
    slot: 'kpi',
    defaultColSpan: 12,
    defaultRowSpan: 1,
    permissionCode: 'dashboard:read',
  },
  // Flyer trip lists — Upcoming trips + Current requests as independent cards.
  flyer_upcoming_trips_list: {
    kind: 'widget',
    slot: 'kpi',
    defaultColSpan: 6,
    defaultRowSpan: 2,
    permissionCode: 'dashboard:read',
  },
  flyer_requests_list: {
    kind: 'widget',
    slot: 'kpi',
    defaultColSpan: 6,
    defaultRowSpan: 2,
    permissionCode: 'dashboard:read',
  },
  flyer_money_movement: {
    kind: 'widget',
    slot: 'kpi',
    defaultColSpan: 12,
    defaultRowSpan: 1,
    permissionCode: 'dashboard:read',
  },
} as const satisfies Record<string, WidgetMeta>

export type WidgetCode = keyof typeof WIDGET_MANIFEST

export const WIDGET_CODES = Object.keys(WIDGET_MANIFEST) as WidgetCode[]

export function isWidgetCode(code: string): code is WidgetCode {
  return code in WIDGET_MANIFEST
}

/** True for page-chrome widgets (greeting headers) that suppress the PageHeader. */
export function isChromeWidget(code: string): boolean {
  return isWidgetCode(code) && (WIDGET_MANIFEST[code] as WidgetMeta).chrome === true
}
