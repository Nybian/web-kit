import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { BadgeCheck, ArrowUpRight, ArrowDownRight, ArrowRight, MoreHorizontal, Bell, X, TrendingUp, TrendingDown, ArrowDownLeft, Wallet, Star, ArrowUp, ArrowDown } from 'lucide-react';

// src/portal/resolve.ts
var MOBILE_BOTTOM_BAR_MAX = 4;
function bottomBarLayout(items, max = MOBILE_BOTTOM_BAR_MAX) {
  const ordered = [...items].sort((a, b) => a.bottomBarSortOrder - b.bottomBarSortOrder);
  if (ordered.length <= max) {
    return { primary: ordered, overflow: [], hasMore: false };
  }
  const primary = ordered.slice(0, max - 1);
  const overflow = ordered.slice(max - 1);
  return { primary, overflow, hasMore: true };
}
function NybMobileBottomBar({
  items,
  activePath,
  onNavigate,
  renderIcon,
  resolveLabel,
  moreLabel = "More",
  moreIconKey = "menu",
  onOpenMore,
  className
}) {
  const { primary, overflow, hasMore } = bottomBarLayout(items);
  const label = (item) => resolveLabel ? resolveLabel(item) : item.label;
  return /* @__PURE__ */ jsxs(
    "nav",
    {
      className,
      role: "navigation",
      "aria-label": "Primary mobile navigation",
      "data-testid": "mobile-bottom-bar",
      children: [
        primary.map((item) => {
          const active = item.path === activePath;
          return /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              "aria-current": active ? "page" : void 0,
              "data-active": active || void 0,
              onClick: () => onNavigate(item.path),
              children: [
                /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: renderIcon(item.icon) }),
                /* @__PURE__ */ jsx("span", { children: label(item) })
              ]
            },
            item.key
          );
        }),
        hasMore && /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            "data-testid": "mobile-bottom-bar-more",
            onClick: () => onOpenMore?.(overflow),
            children: [
              /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: renderIcon(moreIconKey) }),
              /* @__PURE__ */ jsx("span", { children: moreLabel })
            ]
          },
          "__more__"
        )
      ]
    }
  );
}
var NYB_WIDGET_PREVIEW_SAMPLES = {
  // KPI row
  balance: { value: "$12,480", sub: "3 active wallets" },
  connections: { value: "18", sub: "2 pending invites" },
  beneficiaries: { value: "7", sub: "1 awaiting review" },
  pending_invitations: { value: "3", sub: "sent this week" },
  fuel_pending: { value: "5", sub: "orders awaiting confirmation" },
  fuel_variance: { value: "2", sub: "uplifts above tolerance" },
  fbo_awaiting_invoice: { value: "4", sub: "uplifts to invoice" },
  today_volume: { value: "12,400 L", sub: "across 6 uplifts" },
  margin_30d: { value: "8.2%", sub: "rolling 30 days" },
  pilot_pending: { value: "2", sub: "one-tap confirmations" },
  // Attention
  pending_banner: { sub: "Complete bank onboarding to unlock payments" },
  overdue_payment_requests: {
    rows: [
      ["Falcon Charter \xB7 KTEB \u2192 KMIA", "12d overdue"],
      ["Skyline Ops \xB7 retainer", "3d overdue"]
    ]
  },
  variance_needs_attention: {
    rows: [
      ["KJFK uplift \xB7 Gulf Jet", "+310 L"],
      ["KTEB uplift \xB7 Skyline", "\u2212120 L"]
    ]
  },
  // Money
  money_flow: { value: "+$4,200 / \u2212$2,590", sub: "this month" },
  received_payment_requests: {
    rows: [
      ["Acme Corp", "$4,200"],
      ["Globex", "$8,900"]
    ]
  },
  // Activity
  recent_transactions: {
    rows: [
      ["Acme Corp \xB7 Jul 2", "+$4,200"],
      ["Jet Fuel Ltd \xB7 Jul 1", "\u2212$1,120"],
      ["Globex \xB7 Jun 30", "+$8,900"]
    ]
  },
  recent_fuel_orders: {
    rows: [
      ["KTEB \xB7 Jet-A 900 gal", "Confirmed"],
      ["KVNY \xB7 Jet-A 450 gal", "Pending"]
    ]
  }
};
var COLORS = {
  border: "#CCD6DF",
  mutedBg: "#EDEFF1",
  mutedFg: "#595959",
  fg: "#282828"
};
var cardStyle = {
  borderRadius: 6,
  border: `1px solid ${COLORS.border}`,
  background: "#fff",
  padding: 6,
  minWidth: 0,
  overflow: "hidden"
};
var titleStyle = {
  fontSize: 9,
  fontWeight: 600,
  color: COLORS.mutedFg,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  margin: 0
};
var valueStyle = { fontSize: 11, fontWeight: 700, color: COLORS.fg, margin: 0 };
var subStyle = {
  fontSize: 8,
  color: COLORS.mutedFg,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  margin: 0
};
var rowStyle = {
  display: "flex",
  justifyContent: "space-between",
  gap: 4,
  fontSize: 8,
  color: COLORS.mutedFg
};
var skeletonStyle = {
  height: 6,
  borderRadius: 3,
  background: COLORS.mutedBg,
  marginTop: 4
};
function NybWidgetPreviewCard({ widget, style }) {
  const span = Math.min(Math.max(widget.colSpan ?? 6, 3), 12);
  const sample = widget.code ? NYB_WIDGET_PREVIEW_SAMPLES[widget.code] : void 0;
  const title = widget.name ?? widget.code ?? "Widget";
  return /* @__PURE__ */ jsxs("div", { style: { ...cardStyle, gridColumn: `span ${span} / span ${span}`, ...style }, children: [
    /* @__PURE__ */ jsx("p", { style: titleStyle, children: title }),
    sample?.value && /* @__PURE__ */ jsx("p", { style: valueStyle, children: sample.value }),
    sample?.sub && /* @__PURE__ */ jsx("p", { style: subStyle, children: sample.sub }),
    sample?.rows && /* @__PURE__ */ jsx("div", { style: { marginTop: 2, display: "grid", rowGap: 2 }, children: sample.rows.map(([left, right]) => /* @__PURE__ */ jsxs("div", { style: rowStyle, children: [
      /* @__PURE__ */ jsx("span", { style: { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: left }),
      /* @__PURE__ */ jsx("span", { style: { flexShrink: 0, fontWeight: 500, color: COLORS.fg }, children: right })
    ] }, left)) }),
    !sample && /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { style: { ...skeletonStyle, width: "75%" } }),
      /* @__PURE__ */ jsx("div", { style: { ...skeletonStyle, width: "50%" } })
    ] })
  ] });
}
var cx = (...parts) => parts.filter(Boolean).join(" ");
var ELEVATED_CARD = "rounded-xl bg-card text-card-foreground shadow-[0_8px_24px_-12px_rgba(0,0,0,0.12)] dark:border dark:border-border/40 dark:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.5)]";
function NybHeroBalance({
  title,
  whole,
  cents,
  currencyCode,
  inflow,
  outflow,
  periodLabel = "Last 30 days",
  periodControl,
  verified = true,
  chart,
  emptyChartLabel = "No trend data yet"
}) {
  return /* @__PURE__ */ jsxs("div", { className: cx(ELEVATED_CARD, "flex h-full flex-col gap-4 p-6"), children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xs font-semibold uppercase tracking-wide text-foreground", children: title }),
        verified && /* @__PURE__ */ jsx(BadgeCheck, { className: "h-4 w-4 text-info", "aria-hidden": true })
      ] }),
      currencyCode && /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-muted-foreground", children: currencyCode })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "leading-none", children: [
      /* @__PURE__ */ jsxs("span", { className: "text-5xl font-bold tracking-tight text-foreground sm:text-6xl", children: [
        "$",
        whole
      ] }),
      /* @__PURE__ */ jsx("span", { className: "ml-0.5 align-top text-2xl font-bold tracking-tight text-foreground sm:text-3xl", children: cents })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-4", children: [
      periodControl ?? /* @__PURE__ */ jsx("span", { className: "inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground", children: periodLabel }),
      inflow && /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 text-xs font-medium text-success", children: [
        /* @__PURE__ */ jsx(ArrowUpRight, { className: "h-3.5 w-3.5", "aria-hidden": true }),
        inflow
      ] }),
      outflow && /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 text-xs font-medium text-destructive", children: [
        /* @__PURE__ */ jsx(ArrowDownRight, { className: "h-3.5 w-3.5", "aria-hidden": true }),
        outflow
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "-mx-2 mt-auto h-44 sm:h-48 select-none [&_.recharts-wrapper]:outline-none [&_.recharts-surface]:outline-none [&_[tabindex]]:outline-none [&_.recharts-cartesian-axis-tick-value]:pointer-events-none [&_.recharts-cartesian-axis-tick-value]:[font-variant-numeric:tabular-nums]", children: chart ?? /* @__PURE__ */ jsx("div", { className: "flex h-full items-center justify-center text-xs text-muted-foreground", children: emptyChartLabel }) })
  ] });
}
function NybAccountsPanel({
  title,
  activeLabel,
  accounts,
  maxRows = 4,
  emptyLabel,
  defaultLabel,
  moreLabel = (n) => `+ ${n} more`,
  viewAllLabel,
  viewAllHref,
  renderLink
}) {
  const shown = [...accounts].sort((a, b) => Number(b.isDefault) - Number(a.isDefault)).slice(0, maxRows);
  const extra = accounts.length - maxRows;
  const rowInner = (bal) => /* @__PURE__ */ jsxs("div", { className: "p-3 shadow-sm rounded-lg border bg-card transition-all hover:border-2 hover:border-primary hover:shadow-md", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "min-w-0 overflow-hidden flex-1", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[10px] font-semibold text-muted-foreground tracking-widest uppercase truncate", children: bal.title }),
        /* @__PURE__ */ jsxs("p", { className: "text-base font-bold text-foreground tracking-tight truncate leading-tight mt-0.5", children: [
          "$",
          bal.whole,
          /* @__PURE__ */ jsx("span", { className: "ml-0.5 align-top text-xs font-normal text-muted-foreground", children: bal.cents })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex h-7 w-7 items-center justify-center rounded-full flex-shrink-0 bg-muted", children: /* @__PURE__ */ jsx(Wallet, { className: "h-3.5 w-3.5 text-muted-foreground", "aria-hidden": true }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-2 pt-2 border-t border-border flex items-center gap-1.5 flex-wrap", children: [
      /* @__PURE__ */ jsx("span", { className: "inline-flex items-center rounded-full bg-secondary px-1.5 py-0 text-[10px] font-medium uppercase text-secondary-foreground", children: bal.currency }),
      bal.isDefault && /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-0.5 rounded-full bg-primary px-1.5 py-0 text-[10px] font-medium text-primary-foreground", children: [
        /* @__PURE__ */ jsx(Star, { className: "h-2.5 w-2.5 fill-current", "aria-hidden": true }),
        defaultLabel
      ] })
    ] })
  ] });
  const footerClass = "mt-auto inline-flex items-center justify-center gap-1 rounded-md border border-border bg-background px-3 py-2 text-xs font-medium text-foreground hover:bg-muted";
  return /* @__PURE__ */ jsxs("div", { className: cx(ELEVATED_CARD, "flex h-full flex-col gap-3 p-5"), children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xs font-semibold uppercase tracking-wide text-foreground", children: title }),
      /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: activeLabel })
    ] }),
    accounts.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: emptyLabel }) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
      shown.map(
        (bal) => renderLink && viewAllHref ? /* @__PURE__ */ jsx("span", { className: "block", children: renderLink({ href: viewAllHref, className: "block", children: rowInner(bal) }) }, bal.walletId) : /* @__PURE__ */ jsx("div", { children: rowInner(bal) }, bal.walletId)
      ),
      extra > 0 && /* @__PURE__ */ jsx("p", { className: "px-1 text-xs text-muted-foreground", children: moreLabel(extra) })
    ] }),
    viewAllLabel && viewAllHref && (renderLink ? renderLink({
      href: viewAllHref,
      className: footerClass,
      children: /* @__PURE__ */ jsxs(Fragment, { children: [
        viewAllLabel,
        /* @__PURE__ */ jsx(ArrowRight, { className: "h-3 w-3", "aria-hidden": true })
      ] })
    }) : /* @__PURE__ */ jsxs("span", { className: footerClass, children: [
      viewAllLabel,
      /* @__PURE__ */ jsx(ArrowRight, { className: "h-3 w-3", "aria-hidden": true })
    ] }))
  ] });
}
var cx2 = (...parts) => parts.filter(Boolean).join(" ");
var ELEVATED_CARD2 = "rounded-xl bg-card text-card-foreground shadow-[0_8px_24px_-12px_rgba(0,0,0,0.12)] dark:border dark:border-border/40 dark:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.5)]";
var TrendChip = ({ trend }) => /* @__PURE__ */ jsxs(
  "span",
  {
    className: cx2(
      "inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[11px] font-semibold",
      trend.direction === "up" && "bg-success/10 text-success",
      trend.direction === "down" && "bg-destructive/10 text-destructive",
      trend.direction === "flat" && "bg-muted text-muted-foreground"
    ),
    children: [
      trend.direction === "up" && /* @__PURE__ */ jsx(ArrowUp, { className: "h-3 w-3", "aria-hidden": true }),
      trend.direction === "down" && /* @__PURE__ */ jsx(ArrowDown, { className: "h-3 w-3", "aria-hidden": true }),
      trend.label
    ]
  }
);
function NybKpiCard({
  title,
  whole,
  cents,
  prefix = "$",
  subtitle,
  trend,
  viewAll,
  hideMoreOptions,
  renderLink,
  className
}) {
  const footerClass = "inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline";
  return /* @__PURE__ */ jsxs("div", { className: cx2(ELEVATED_CARD2, "flex h-full flex-col gap-3 p-5", className), children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-2", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold uppercase tracking-wide text-foreground", children: title }),
      !hideMoreOptions && /* @__PURE__ */ jsx(MoreHorizontal, { className: "h-4 w-4 text-muted-foreground/60", "aria-hidden": true })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "leading-none", children: [
      /* @__PURE__ */ jsxs("span", { className: "text-3xl font-bold tracking-tight text-foreground", children: [
        prefix,
        whole
      ] }),
      cents !== void 0 && /* @__PURE__ */ jsx("span", { className: "ml-0.5 align-top text-base font-bold tracking-tight text-foreground", children: cents })
    ] }),
    (subtitle || trend) && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      trend && /* @__PURE__ */ jsx(TrendChip, { trend }),
      subtitle && /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: subtitle })
    ] }),
    viewAll && /* @__PURE__ */ jsx("div", { className: "mt-auto pt-2", children: renderLink ? renderLink({
      href: viewAll.href,
      className: footerClass,
      children: /* @__PURE__ */ jsxs(Fragment, { children: [
        viewAll.label,
        /* @__PURE__ */ jsx(ArrowRight, { className: "h-3 w-3", "aria-hidden": true })
      ] })
    }) : /* @__PURE__ */ jsxs("span", { className: footerClass, children: [
      viewAll.label,
      /* @__PURE__ */ jsx(ArrowRight, { className: "h-3 w-3", "aria-hidden": true })
    ] }) })
  ] });
}
function NybWidgetCard({
  title,
  headerAction,
  children,
  className,
  style
}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cx2("app-card bg-card text-card-foreground !p-5 sm:!p-6", className),
      style,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-base font-semibold sm:text-lg", children: title }),
          headerAction
        ] }),
        children
      ]
    }
  );
}
function NybListRow({
  icon,
  iconTone = "muted",
  primary,
  secondary,
  tertiary,
  value,
  valueTone = "default",
  action,
  valueGap = "tight"
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex min-w-0 items-center gap-3", children: [
      icon && /* @__PURE__ */ jsx(
        "div",
        {
          className: cx2(
            "shrink-0 rounded-full p-2",
            iconTone === "success" && "bg-success/10 text-success",
            iconTone === "destructive" && "bg-destructive/10 text-destructive",
            iconTone === "muted" && "bg-muted text-muted-foreground"
          ),
          children: icon
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsx("p", { className: "truncate text-sm font-medium text-foreground", children: primary }),
        secondary && /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: secondary }),
        tertiary && /* @__PURE__ */ jsx("p", { className: "truncate font-mono text-xs text-muted-foreground/60", children: tertiary })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: cx2("flex shrink-0 items-center", valueGap === "roomy" ? "gap-3" : "gap-2"), children: [
      value !== void 0 && // tabular-nums: this slot renders money (transaction amounts, payment
      // request totals, deal values) but is NOT one of the numeric-* type
      // tokens that bake tabular figures in, so it has to be explicit —
      // web-app docs/typography.md rule 1. Without it, digits shift width
      // between rows and the right-aligned column visibly ragged.
      /* @__PURE__ */ jsx(
        "span",
        {
          className: cx2(
            "text-sm font-semibold tabular-nums",
            valueTone === "success" && "text-success",
            valueTone === "destructive" && "text-destructive"
          ),
          children: value
        }
      ),
      action
    ] })
  ] });
}
function NybPendingBanner({
  icon,
  message,
  action,
  onDismiss,
  dismissLabel = "Dismiss"
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3", children: [
    icon ?? /* @__PURE__ */ jsx(Bell, { className: "h-4 w-4 shrink-0 animate-bounce text-primary", "aria-hidden": true }),
    /* @__PURE__ */ jsx("p", { className: "flex-1 text-sm text-foreground", children: message }),
    action,
    onDismiss && /* @__PURE__ */ jsx(
      "button",
      {
        onClick: onDismiss,
        className: "shrink-0 text-muted-foreground transition-colors hover:text-foreground",
        "aria-label": dismissLabel,
        children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
      }
    )
  ] });
}
function NybMoneyFlowStats({
  receivedLabel,
  receivedValue,
  spentLabel,
  spentValue,
  chart
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 sm:gap-6 lg:flex-col lg:items-center xl:flex-row", children: [
    chart && /* @__PURE__ */ jsx("div", { className: "h-36 w-36 shrink-0", children: chart }),
    /* @__PURE__ */ jsxs("div", { className: "flex min-w-0 flex-1 flex-col gap-2.5 lg:w-full xl:flex-1", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5 rounded-lg bg-success/5 p-2.5", children: [
        /* @__PURE__ */ jsx("div", { className: "shrink-0 rounded-full bg-success/10 p-1.5", children: /* @__PURE__ */ jsx(TrendingUp, { className: "h-3.5 w-3.5 text-success", "aria-hidden": true }) }),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsx("p", { className: "mb-0.5 text-xs leading-none text-muted-foreground", children: receivedLabel }),
          /* @__PURE__ */ jsx("p", { className: "truncate text-sm font-bold text-success", children: receivedValue })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5 rounded-lg bg-destructive/5 p-2.5", children: [
        /* @__PURE__ */ jsx("div", { className: "shrink-0 rounded-full bg-destructive/10 p-1.5", children: /* @__PURE__ */ jsx(TrendingDown, { className: "h-3.5 w-3.5 text-destructive", "aria-hidden": true }) }),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsx("p", { className: "mb-0.5 text-xs leading-none text-muted-foreground", children: spentLabel }),
          /* @__PURE__ */ jsx("p", { className: "truncate text-sm font-bold text-destructive", children: spentValue })
        ] })
      ] })
    ] })
  ] });
}
var KPI_SAMPLES = {
  balance: { whole: "12,480", cents: "00", subtitle: "3 active wallets", trend: { direction: "up", label: "12%" } },
  connections: { whole: "18", prefix: "", subtitle: "2 pending invites" },
  beneficiaries: { whole: "7", prefix: "", subtitle: "1 awaiting review" },
  pending_invitations: { whole: "3", prefix: "", subtitle: "sent this week" },
  fuel_pending: { whole: "5", prefix: "", subtitle: "orders awaiting confirmation" },
  fuel_variance: { whole: "2", prefix: "", subtitle: "uplifts above tolerance", trend: { direction: "down", label: "1" } },
  fbo_awaiting_invoice: { whole: "4", prefix: "", subtitle: "uplifts to invoice" },
  today_volume: { whole: "12,400", prefix: "", subtitle: "litres across 6 uplifts" },
  margin_30d: { whole: "8.2%", prefix: "", subtitle: "rolling 30 days", trend: { direction: "up", label: "0.4%" } },
  pilot_pending: { whole: "2", prefix: "", subtitle: "one-tap confirmations" }
};
var LIST_SAMPLES = {
  overdue_payment_requests: {
    rows: [
      { primary: "Falcon Charter", secondary: "Due 12 days ago", value: "$8,400" },
      { primary: "Skyline Ops", secondary: "Due 3 days ago", value: "$2,150" }
    ]
  },
  received_payment_requests: {
    rows: [
      { primary: "Acme Corp", secondary: "Jul 2, 2026", value: "$4,200" },
      { primary: "Globex", secondary: "Jun 30, 2026", value: "$8,900" }
    ]
  },
  recent_fuel_orders: {
    rows: [
      { primary: "KTEB \xB7 Jet-A 900 gal", secondary: "Confirmed", value: "$5,310", tone: "success" },
      { primary: "KVNY \xB7 Jet-A 450 gal", secondary: "Pending", value: "$2,655" }
    ]
  },
  variance_needs_attention: {
    rows: [
      { primary: "KJFK uplift \xB7 Gulf Jet", secondary: "Above tolerance", value: "+310 L", tone: "destructive" },
      { primary: "KTEB uplift \xB7 Skyline", secondary: "Below tolerance", value: "\u2212120 L", tone: "destructive" }
    ]
  },
  broker_recent_deals: {
    rows: [
      { primary: "KTEB \u2192 KMIA \xB7 Gulfstream G550", secondary: "Confirmed", value: "$48,500", tone: "success" },
      { primary: "KVNY \u2192 KLAS \xB7 Citation X", secondary: "In review", value: "$32,900" }
    ]
  },
  flyer_upcoming_trips_list: {
    rows: [
      { primary: "KTEB \u2192 KMIA \xB7 Gulfstream G550", secondary: "Jul 14, 2026 \xB7 Confirmed", value: "$48,500", tone: "success" },
      { primary: "KVNY \u2192 KLAS \xB7 Citation X", secondary: "Jul 18, 2026 \xB7 Booked", value: "$32,900" }
    ]
  },
  flyer_requests_list: {
    rows: [
      { primary: "KMIA \u2192 KTEB \xB7 Falcon 2000", secondary: "Awaiting your approval", value: "$41,200" },
      { primary: "KLAS \u2192 KSFO \xB7 Phenom 300", secondary: "Quote requested", value: "$18,750" }
    ]
  }
};
var ACCOUNT_SAMPLES = [
  { walletId: "w-usd", title: "USD wallet", whole: "12,480", cents: "00", currency: "USD", isDefault: true },
  { walletId: "w-eur", title: "EUR wallet", whole: "2,150", cents: "00", currency: "EUR", isDefault: false }
];
function MockSparkline() {
  return /* @__PURE__ */ jsx("div", { className: "flex h-full items-end gap-1", children: [40, 55, 48, 62, 70, 58, 66, 78, 72, 84].map((h, i) => /* @__PURE__ */ jsx(
    "div",
    {
      style: { height: `${h}%` },
      className: "flex-1 rounded-sm bg-primary/25"
    },
    i
  )) });
}
var TX_ROWS = [
  { primary: "Acme Corp", secondary: "Jul 2, 2026", value: "+$4,200.00", incoming: true },
  { primary: "Jet Fuel Ltd", secondary: "Jul 1, 2026", value: "-$1,120.00", incoming: false },
  { primary: "Globex", secondary: "Jun 30, 2026", value: "+$8,900.00", incoming: true }
];
function MockDonut() {
  return /* @__PURE__ */ jsx("div", { className: "grid h-full w-full place-items-center", children: /* @__PURE__ */ jsx("div", { className: "h-28 w-28 rounded-full border-[14px] border-success/70 [border-bottom-color:hsl(var(--destructive)/0.6)] [border-left-color:hsl(var(--destructive)/0.6)]" }) });
}
function NybWidgetPreview({ widget }) {
  const code = widget.code ?? "";
  const title = widget.name ?? code ?? "Widget";
  if (KPI_SAMPLES[code]) {
    return /* @__PURE__ */ jsx(
      NybKpiCard,
      {
        title,
        ...KPI_SAMPLES[code],
        viewAll: { label: "View", href: "#" }
      }
    );
  }
  if (code === "greeting_quick_actions") {
    return /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx("p", { className: "text-lg font-semibold text-foreground", children: "Welcome back, Alex" }),
      /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: ["New Deal", "Send", "Top Up"].map((label, i) => /* @__PURE__ */ jsx(
        "span",
        {
          className: i === 0 ? "rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground" : "rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground",
          children: label
        },
        label
      )) })
    ] });
  }
  if (code === "notification_bar") {
    return /* @__PURE__ */ jsx(
      NybPendingBanner,
      {
        message: "2 new items since your last visit \u2014 1 payment request, 1 fuel order.",
        action: /* @__PURE__ */ jsx("span", { className: "shrink-0 text-xs font-medium text-primary", children: "Open" })
      }
    );
  }
  if (code === "hero_balance") {
    return /* @__PURE__ */ jsx(
      NybHeroBalance,
      {
        title: "Available funds",
        whole: "24,180",
        cents: "55",
        currencyCode: "USD",
        inflow: "$6.4K",
        outflow: "-$2.6K",
        chart: /* @__PURE__ */ jsx(MockSparkline, {}),
        verified: true
      }
    );
  }
  if (code === "accounts_panel") {
    return /* @__PURE__ */ jsx(
      NybAccountsPanel,
      {
        title: "Wallets",
        activeLabel: "2 Active",
        accounts: ACCOUNT_SAMPLES,
        emptyLabel: "No active wallets.",
        defaultLabel: "Default",
        viewAllLabel: "View All Wallets",
        viewAllHref: "#"
      }
    );
  }
  if (code === "flyer_greeting") {
    return /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx("p", { className: "text-lg font-semibold text-foreground", children: "Welcome back, Alex" }),
      /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: ["New Trip", "Send", "Top Up"].map((label, i) => /* @__PURE__ */ jsx(
        "span",
        {
          className: i === 0 ? "rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground" : "rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground",
          children: label
        },
        label
      )) })
    ] });
  }
  if (code === "flyer_hero_balance") {
    return /* @__PURE__ */ jsx(
      NybHeroBalance,
      {
        title: "Available funds",
        whole: "12,480",
        cents: "00",
        currencyCode: "USD",
        chart: /* @__PURE__ */ jsx(MockSparkline, {}),
        verified: true
      }
    );
  }
  if (code === "flyer_accounts_panel") {
    return /* @__PURE__ */ jsx(
      NybAccountsPanel,
      {
        title: "Accounts",
        activeLabel: "2 active",
        accounts: ACCOUNT_SAMPLES,
        emptyLabel: "No active accounts.",
        defaultLabel: "Default",
        viewAllLabel: "View all",
        viewAllHref: "#"
      }
    );
  }
  if (code === "flyer_kpis") {
    return /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3 lg:grid-cols-4", children: [
      /* @__PURE__ */ jsx(NybKpiCard, { title: "Upcoming", whole: "2", prefix: "", subtitle: "Booked & confirmed", viewAll: { label: "Plan", href: "#" } }),
      /* @__PURE__ */ jsx(NybKpiCard, { title: "Action needed", whole: "1", prefix: "", subtitle: "Awaiting your review", trend: { direction: "down", label: "review" }, viewAll: { label: "Review", href: "#" } }),
      /* @__PURE__ */ jsx(NybKpiCard, { title: "Total spend", whole: "48,500", cents: "00", subtitle: "Across 8 completed", viewAll: { label: "History", href: "#" } }),
      /* @__PURE__ */ jsx(NybKpiCard, { title: "Completed", whole: "8", prefix: "", subtitle: "Trips flown", viewAll: { label: "View", href: "#" } })
    ] });
  }
  if (code === "flyer_money_movement") {
    return /* @__PURE__ */ jsx(NybWidgetCard, { title: "Money movement (30d)", children: /* @__PURE__ */ jsxs("dl", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("dt", { className: "text-xs text-muted-foreground", children: "Money in" }),
        /* @__PURE__ */ jsx("dd", { className: "text-2xl font-bold tracking-tight text-muted-foreground", children: "\u2014" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("dt", { className: "text-xs text-muted-foreground", children: "Money out" }),
        /* @__PURE__ */ jsx("dd", { className: "text-2xl font-bold tracking-tight text-muted-foreground", children: "\u2014" })
      ] })
    ] }) });
  }
  if (code === "fuel_kpis") {
    return /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3 lg:grid-cols-4", children: [
      /* @__PURE__ */ jsx(NybKpiCard, { title: "Open fuel orders", whole: "5", prefix: "", subtitle: "Pending", trend: { direction: "up", label: "5 active" }, hideMoreOptions: true, viewAll: { label: "Open Dispatch", href: "#" } }),
      /* @__PURE__ */ jsx(NybKpiCard, { title: "Variance queue", whole: "2", prefix: "", subtitle: "Needs Ops Attention", trend: { direction: "down", label: "attention" }, hideMoreOptions: true, viewAll: { label: "Resolve", href: "#" } }),
      /* @__PURE__ */ jsx(NybKpiCard, { title: "Today's volume", whole: "12,400", prefix: "", subtitle: "litres across 6 uplifts", hideMoreOptions: true, viewAll: { label: "Order History", href: "#" } }),
      /* @__PURE__ */ jsx(NybKpiCard, { title: "Connections", whole: "18", prefix: "", subtitle: "Active Relationships", hideMoreOptions: true, viewAll: { label: "Manage", href: "#" } })
    ] });
  }
  if (code === "broker_kpis") {
    return /* @__PURE__ */ jsx("div", { className: "grid grid-cols-4 gap-3", children: [
      ["Pipeline", "$186K"],
      ["Revenue", "$42K"],
      ["Action needed", "3"],
      ["Upcoming", "5"]
    ].map(([label, value]) => /* @__PURE__ */ jsx(NybKpiCard, { title: label, whole: value, subtitle: "30 days" }, label)) });
  }
  if (code === "pending_banner") {
    return /* @__PURE__ */ jsx(
      NybPendingBanner,
      {
        message: "You have 3 payment requests waiting for review.",
        action: /* @__PURE__ */ jsx("span", { className: "shrink-0 text-xs font-medium text-primary", children: "Review" })
      }
    );
  }
  if (code === "money_flow") {
    return /* @__PURE__ */ jsx(NybWidgetCard, { title, children: /* @__PURE__ */ jsx(
      NybMoneyFlowStats,
      {
        receivedLabel: "Received",
        receivedValue: "$4,200.00",
        spentLabel: "Spent",
        spentValue: "$2,590.00",
        chart: /* @__PURE__ */ jsx(MockDonut, {})
      }
    ) });
  }
  if (code === "recent_transactions") {
    return /* @__PURE__ */ jsx(
      NybWidgetCard,
      {
        title,
        headerAction: /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-primary", children: "View all" }),
        children: /* @__PURE__ */ jsx("div", { className: "space-y-3 sm:space-y-4", children: TX_ROWS.map((row) => /* @__PURE__ */ jsx(
          NybListRow,
          {
            icon: row.incoming ? /* @__PURE__ */ jsx(ArrowDownLeft, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(ArrowUpRight, { className: "h-4 w-4" }),
            iconTone: row.incoming ? "success" : "destructive",
            primary: row.primary,
            secondary: row.secondary,
            value: row.value,
            valueTone: row.incoming ? "success" : "destructive"
          },
          row.primary
        )) })
      }
    );
  }
  if (LIST_SAMPLES[code]) {
    return /* @__PURE__ */ jsx(
      NybWidgetCard,
      {
        title,
        headerAction: /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-primary", children: "View all" }),
        children: /* @__PURE__ */ jsx("div", { className: "space-y-4", children: LIST_SAMPLES[code].rows.map((row) => /* @__PURE__ */ jsx(
          NybListRow,
          {
            primary: row.primary,
            secondary: row.secondary,
            value: row.value,
            valueTone: row.tone
          },
          row.primary
        )) })
      }
    );
  }
  return /* @__PURE__ */ jsx(NybWidgetCard, { title, children: /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsx("div", { className: "h-2 w-3/4 rounded bg-muted" }),
    /* @__PURE__ */ jsx("div", { className: "h-2 w-1/2 rounded bg-muted" })
  ] }) });
}
var SAMPLE_SPECIAL_CODES = [
  "greeting_quick_actions",
  "notification_bar",
  "hero_balance",
  "accounts_panel",
  "broker_kpis",
  "fuel_kpis",
  "pending_banner",
  "money_flow",
  "recent_transactions",
  "flyer_greeting",
  "flyer_hero_balance",
  "flyer_accounts_panel",
  "flyer_kpis",
  "flyer_money_movement"
];
var HANDLED_CODES = /* @__PURE__ */ new Set([
  ...Object.keys(KPI_SAMPLES),
  ...Object.keys(LIST_SAMPLES),
  ...SAMPLE_SPECIAL_CODES
]);
function isSampleHandled(code) {
  return HANDLED_CODES.has(code);
}

export { NYB_WIDGET_PREVIEW_SAMPLES, NybAccountsPanel, NybHeroBalance, NybKpiCard, NybListRow, NybMobileBottomBar, NybMoneyFlowStats, NybPendingBanner, NybWidgetCard, NybWidgetPreview, NybWidgetPreviewCard, isSampleHandled };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map