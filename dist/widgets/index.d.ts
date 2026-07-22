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
type WidgetSlot = 'kpi' | 'attention' | 'money' | 'activity';
type WidgetKind = 'kpi' | 'widget';
interface WidgetMeta {
    /** 'kpi' collapses into the shared KPI row; 'widget' renders standalone. */
    kind: WidgetKind;
    /** Dashboard zone the widget belongs to when the preset omits a slot. */
    slot: WidgetSlot;
    /** Default 12-col span when the org/preset row leaves col_span null. */
    defaultColSpan: number;
    defaultRowSpan: number;
    /** Backend permission code required to render (gating stays app-side). */
    permissionCode: string;
    /**
     * Page-chrome widget (a greeting/quick-actions header). When a resolved layout
     * contains one, the dashboard renders full-bleed and suppresses the shared
     * PageHeader — the widget carries its own greeting.
     */
    chrome?: boolean;
}
/**
 * Every code the presets emit or an app renders. Adding a code here forces
 * both apps to handle it (typed registries) — that's the anti-drift contract.
 */
declare const WIDGET_MANIFEST: {
    readonly balance: {
        readonly kind: "kpi";
        readonly slot: "kpi";
        readonly defaultColSpan: 3;
        readonly defaultRowSpan: 1;
        readonly permissionCode: "wallets:read";
    };
    readonly connections: {
        readonly kind: "kpi";
        readonly slot: "kpi";
        readonly defaultColSpan: 3;
        readonly defaultRowSpan: 1;
        readonly permissionCode: "members:read";
    };
    readonly beneficiaries: {
        readonly kind: "kpi";
        readonly slot: "kpi";
        readonly defaultColSpan: 3;
        readonly defaultRowSpan: 1;
        readonly permissionCode: "beneficiaries:read";
    };
    readonly pending_invitations: {
        readonly kind: "kpi";
        readonly slot: "kpi";
        readonly defaultColSpan: 3;
        readonly defaultRowSpan: 1;
        readonly permissionCode: "invitations:read";
    };
    readonly fuel_pending: {
        readonly kind: "kpi";
        readonly slot: "kpi";
        readonly defaultColSpan: 3;
        readonly defaultRowSpan: 1;
        readonly permissionCode: "fuel:deals.read";
    };
    readonly fuel_variance: {
        readonly kind: "kpi";
        readonly slot: "kpi";
        readonly defaultColSpan: 3;
        readonly defaultRowSpan: 1;
        readonly permissionCode: "fuel:admin.read";
    };
    readonly fbo_awaiting_invoice: {
        readonly kind: "kpi";
        readonly slot: "kpi";
        readonly defaultColSpan: 3;
        readonly defaultRowSpan: 1;
        readonly permissionCode: "fbo:deals.read";
    };
    readonly today_volume: {
        readonly kind: "kpi";
        readonly slot: "kpi";
        readonly defaultColSpan: 3;
        readonly defaultRowSpan: 1;
        readonly permissionCode: "fuel:deals.read";
    };
    readonly margin_30d: {
        readonly kind: "kpi";
        readonly slot: "kpi";
        readonly defaultColSpan: 3;
        readonly defaultRowSpan: 1;
        readonly permissionCode: "fuel:deals.read";
    };
    readonly pilot_pending: {
        readonly kind: "kpi";
        readonly slot: "kpi";
        readonly defaultColSpan: 3;
        readonly defaultRowSpan: 1;
        readonly permissionCode: "fuel:deals.read";
    };
    readonly greeting_quick_actions: {
        readonly kind: "widget";
        readonly slot: "kpi";
        readonly defaultColSpan: 12;
        readonly defaultRowSpan: 1;
        readonly permissionCode: "dashboard:read";
        readonly chrome: true;
    };
    readonly notification_bar: {
        readonly kind: "widget";
        readonly slot: "kpi";
        readonly defaultColSpan: 12;
        readonly defaultRowSpan: 1;
        readonly permissionCode: "dashboard:read";
    };
    readonly hero_balance: {
        readonly kind: "widget";
        readonly slot: "kpi";
        readonly defaultColSpan: 8;
        readonly defaultRowSpan: 2;
        readonly permissionCode: "transfers:read";
    };
    readonly accounts_panel: {
        readonly kind: "widget";
        readonly slot: "kpi";
        readonly defaultColSpan: 4;
        readonly defaultRowSpan: 2;
        readonly permissionCode: "transfers:read";
    };
    readonly broker_kpis: {
        readonly kind: "widget";
        readonly slot: "kpi";
        readonly defaultColSpan: 12;
        readonly defaultRowSpan: 1;
        readonly permissionCode: "dashboard:read";
    };
    readonly broker_recent_deals: {
        readonly kind: "widget";
        readonly slot: "kpi";
        readonly defaultColSpan: 12;
        readonly defaultRowSpan: 1;
        readonly permissionCode: "dashboard:read";
    };
    readonly fuel_kpis: {
        readonly kind: "widget";
        readonly slot: "kpi";
        readonly defaultColSpan: 12;
        readonly defaultRowSpan: 1;
        readonly permissionCode: "dashboard:read";
    };
    readonly money_flow: {
        readonly kind: "widget";
        readonly slot: "money";
        readonly defaultColSpan: 6;
        readonly defaultRowSpan: 2;
        readonly permissionCode: "transfers:read";
    };
    readonly recent_fuel_orders: {
        readonly kind: "widget";
        readonly slot: "activity";
        readonly defaultColSpan: 6;
        readonly defaultRowSpan: 2;
        readonly permissionCode: "fuel:deals.read";
    };
    readonly pending_banner: {
        readonly kind: "widget";
        readonly slot: "attention";
        readonly defaultColSpan: 12;
        readonly defaultRowSpan: 1;
        readonly permissionCode: "payment_requests:read";
    };
    readonly overdue_payment_requests: {
        readonly kind: "widget";
        readonly slot: "attention";
        readonly defaultColSpan: 6;
        readonly defaultRowSpan: 2;
        readonly permissionCode: "payment_requests:read";
    };
    readonly received_payment_requests: {
        readonly kind: "widget";
        readonly slot: "money";
        readonly defaultColSpan: 6;
        readonly defaultRowSpan: 2;
        readonly permissionCode: "payment_requests:read";
    };
    readonly recent_transactions: {
        readonly kind: "widget";
        readonly slot: "activity";
        readonly defaultColSpan: 6;
        readonly defaultRowSpan: 2;
        readonly permissionCode: "transfers:read";
    };
    readonly variance_needs_attention: {
        readonly kind: "widget";
        readonly slot: "attention";
        readonly defaultColSpan: 6;
        readonly defaultRowSpan: 2;
        readonly permissionCode: "fuel:admin.read";
    };
    readonly flyer_greeting: {
        readonly kind: "widget";
        readonly slot: "kpi";
        readonly defaultColSpan: 12;
        readonly defaultRowSpan: 1;
        readonly permissionCode: "dashboard:read";
        readonly chrome: true;
    };
    readonly flyer_hero_balance: {
        readonly kind: "widget";
        readonly slot: "kpi";
        readonly defaultColSpan: 8;
        readonly defaultRowSpan: 2;
        readonly permissionCode: "dashboard:read";
    };
    readonly flyer_accounts_panel: {
        readonly kind: "widget";
        readonly slot: "kpi";
        readonly defaultColSpan: 4;
        readonly defaultRowSpan: 2;
        readonly permissionCode: "dashboard:read";
    };
    readonly flyer_kpis: {
        readonly kind: "widget";
        readonly slot: "kpi";
        readonly defaultColSpan: 12;
        readonly defaultRowSpan: 1;
        readonly permissionCode: "dashboard:read";
    };
    readonly flyer_upcoming_trips_list: {
        readonly kind: "widget";
        readonly slot: "kpi";
        readonly defaultColSpan: 6;
        readonly defaultRowSpan: 2;
        readonly permissionCode: "dashboard:read";
    };
    readonly flyer_requests_list: {
        readonly kind: "widget";
        readonly slot: "kpi";
        readonly defaultColSpan: 6;
        readonly defaultRowSpan: 2;
        readonly permissionCode: "dashboard:read";
    };
    readonly flyer_money_movement: {
        readonly kind: "widget";
        readonly slot: "kpi";
        readonly defaultColSpan: 12;
        readonly defaultRowSpan: 1;
        readonly permissionCode: "dashboard:read";
    };
};
type WidgetCode = keyof typeof WIDGET_MANIFEST;
declare const WIDGET_CODES: WidgetCode[];
declare function isWidgetCode(code: string): code is WidgetCode;
/** True for page-chrome widgets (greeting headers) that suppress the PageHeader. */
declare function isChromeWidget(code: string): boolean;

export { WIDGET_CODES, WIDGET_MANIFEST, type WidgetCode, type WidgetKind, type WidgetMeta, type WidgetSlot, isChromeWidget, isWidgetCode };
