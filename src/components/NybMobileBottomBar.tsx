import type { ReactNode } from 'react'

import { bottomBarLayout, type ResolvedSideMenuItem } from '../portal'

export interface NybMobileBottomBarProps {
  /** Bottom-bar items from the resolved config (already permission-filtered). */
  items: ResolvedSideMenuItem[]
  /** The currently active route path, used to highlight the active tab. */
  activePath: string
  /** Navigate to a menu item's path. */
  onNavigate: (path: string) => void
  /** Render an icon node for a menu item's icon key. */
  renderIcon: (iconKey: string) => ReactNode
  /** Resolve the display label for an item (e.g. i18n). Defaults to `item.label`. */
  resolveLabel?: (item: ResolvedSideMenuItem) => string
  /** Label for the overflow ("More") tab. */
  moreLabel?: string
  /** Icon key for the overflow tab. */
  moreIconKey?: string
  /** Open the "More" sheet when overflow items exist. */
  onOpenMore?: (overflow: ResolvedSideMenuItem[]) => void
  className?: string
}

/**
 * Presentational mobile bottom navigation bar driven by the resolved per-tenant
 * side menu. Renders up to 4 tabs; extra items collapse into a "More" tab.
 * Framework-agnostic beyond React — the host supplies navigation + icons.
 */
export function NybMobileBottomBar({
  items,
  activePath,
  onNavigate,
  renderIcon,
  resolveLabel,
  moreLabel = 'More',
  moreIconKey = 'menu',
  onOpenMore,
  className,
}: NybMobileBottomBarProps) {
  const { primary, overflow, hasMore } = bottomBarLayout(items)
  const label = (item: ResolvedSideMenuItem) => (resolveLabel ? resolveLabel(item) : item.label)

  return (
    <nav
      className={className}
      role="navigation"
      aria-label="Primary mobile navigation"
      data-testid="mobile-bottom-bar"
    >
      {primary.map((item) => {
        const active = item.path === activePath
        return (
          <button
            key={item.key}
            type="button"
            aria-current={active ? 'page' : undefined}
            data-active={active || undefined}
            onClick={() => onNavigate(item.path)}
          >
            <span aria-hidden="true">{renderIcon(item.icon)}</span>
            <span>{label(item)}</span>
          </button>
        )
      })}
      {hasMore && (
        <button
          key="__more__"
          type="button"
          data-testid="mobile-bottom-bar-more"
          onClick={() => onOpenMore?.(overflow)}
        >
          <span aria-hidden="true">{renderIcon(moreIconKey)}</span>
          <span>{moreLabel}</span>
        </button>
      )}
    </nav>
  )
}
