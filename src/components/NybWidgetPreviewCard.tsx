import type { CSSProperties } from 'react'
import type { ResolvedWidget } from '../portal/types'

/**
 * Mock content per widget catalog code — the "production-fidelity mock data"
 * the tenant-config doc specifies for admin previews (§06): real card anatomy
 * and plausible sample numbers, since preview surfaces have no tenant data.
 * Codes mirror the s027 widget catalog / web-app dashboard registry.
 */
export interface NybWidgetPreviewSample {
  value?: string
  sub?: string
  rows?: [string, string][]
}

export const NYB_WIDGET_PREVIEW_SAMPLES: Record<string, NybWidgetPreviewSample> = {
  // KPI row
  balance: { value: '$12,480', sub: '3 active wallets' },
  connections: { value: '18', sub: '2 pending invites' },
  beneficiaries: { value: '7', sub: '1 awaiting review' },
  pending_invitations: { value: '3', sub: 'sent this week' },
  fuel_pending: { value: '5', sub: 'orders awaiting confirmation' },
  fuel_variance: { value: '2', sub: 'uplifts above tolerance' },
  fbo_awaiting_invoice: { value: '4', sub: 'uplifts to invoice' },
  today_volume: { value: '12,400 L', sub: 'across 6 uplifts' },
  margin_30d: { value: '8.2%', sub: 'rolling 30 days' },
  pilot_pending: { value: '2', sub: 'one-tap confirmations' },
  // Attention
  pending_banner: { sub: 'Complete bank onboarding to unlock payments' },
  overdue_payment_requests: {
    rows: [
      ['Falcon Charter · KTEB → KMIA', '12d overdue'],
      ['Skyline Ops · retainer', '3d overdue'],
    ],
  },
  variance_needs_attention: {
    rows: [
      ['KJFK uplift · Gulf Jet', '+310 L'],
      ['KTEB uplift · Skyline', '−120 L'],
    ],
  },
  // Money
  money_flow: { value: '+$4,200 / −$2,590', sub: 'this month' },
  received_payment_requests: {
    rows: [
      ['Acme Corp', '$4,200'],
      ['Globex', '$8,900'],
    ],
  },
  // Activity
  recent_transactions: {
    rows: [
      ['Acme Corp · Jul 2', '+$4,200'],
      ['Jet Fuel Ltd · Jul 1', '−$1,120'],
      ['Globex · Jun 30', '+$8,900'],
    ],
  },
  recent_fuel_orders: {
    rows: [
      ['KTEB · Jet-A 900 gal', 'Confirmed'],
      ['KVNY · Jet-A 450 gal', 'Pending'],
    ],
  },
}

// Fixed light-portal palette (the doc's mock palette) — inline styles, not
// Tailwind, so the card renders identically in any consumer regardless of
// that app's Tailwind content scanning.
const COLORS = {
  border: '#CCD6DF',
  mutedBg: '#EDEFF1',
  mutedFg: '#595959',
  fg: '#282828',
}

const cardStyle: CSSProperties = {
  borderRadius: 6,
  border: `1px solid ${COLORS.border}`,
  background: '#fff',
  padding: 6,
  minWidth: 0,
  overflow: 'hidden',
}
const titleStyle: CSSProperties = {
  fontSize: 9,
  fontWeight: 600,
  color: COLORS.mutedFg,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  margin: 0,
}
const valueStyle: CSSProperties = { fontSize: 11, fontWeight: 700, color: COLORS.fg, margin: 0 }
const subStyle: CSSProperties = {
  fontSize: 8,
  color: COLORS.mutedFg,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  margin: 0,
}
const rowStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: 4,
  fontSize: 8,
  color: COLORS.mutedFg,
}
const skeletonStyle: CSSProperties = {
  height: 6,
  borderRadius: 3,
  background: COLORS.mutedBg,
  marginTop: 4,
}

export interface NybWidgetPreviewCardProps {
  widget: ResolvedWidget
  style?: CSSProperties
}

/**
 * A single dashboard widget rendered as a preview card with mock data. Spans
 * its `colSpan` on the consumer's 12-column grid (clamped to 3–12 so cards
 * stay legible in narrow preview panes).
 */
export function NybWidgetPreviewCard({ widget, style }: NybWidgetPreviewCardProps) {
  const span = Math.min(Math.max(widget.colSpan ?? 6, 3), 12)
  const sample = widget.code ? NYB_WIDGET_PREVIEW_SAMPLES[widget.code] : undefined
  const title = widget.name ?? widget.code ?? 'Widget'

  return (
    <div style={{ ...cardStyle, gridColumn: `span ${span} / span ${span}`, ...style }}>
      <p style={titleStyle}>{title}</p>
      {sample?.value && <p style={valueStyle}>{sample.value}</p>}
      {sample?.sub && <p style={subStyle}>{sample.sub}</p>}
      {sample?.rows && (
        <div style={{ marginTop: 2, display: 'grid', rowGap: 2 }}>
          {sample.rows.map(([left, right]) => (
            <div key={left} style={rowStyle}>
              <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {left}
              </span>
              <span style={{ flexShrink: 0, fontWeight: 500, color: COLORS.fg }}>{right}</span>
            </div>
          ))}
        </div>
      )}
      {!sample && (
        <div>
          <div style={{ ...skeletonStyle, width: '75%' }} />
          <div style={{ ...skeletonStyle, width: '50%' }} />
        </div>
      )}
    </div>
  )
}
