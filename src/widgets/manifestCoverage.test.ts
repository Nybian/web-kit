import { describe, it, expect } from 'vitest'
import { WIDGET_CODES, WIDGET_MANIFEST } from './manifest'
import { isSampleHandled } from '../components/NybWidgetPreview'

/**
 * Single-source anti-drift guarantee, now owned by the package itself: every
 * widget code in the manifest must have a real preview sample in NybWidgetPreview.
 * Consumers (admin config preview) render NybWidgetPreview, so a manifest code
 * added without a matching preview branch fails here instead of silently
 * falling back to the generic skeleton.
 */
describe('widget preview coverage', () => {
  it('renders a real preview for every manifest widget code', () => {
    for (const code of WIDGET_CODES) {
      expect(isSampleHandled(code), `${code} has no NybWidgetPreview branch`).toBe(true)
    }
  })

  it('WIDGET_CODES matches the manifest keys exactly', () => {
    expect(WIDGET_CODES.length).toBe(Object.keys(WIDGET_MANIFEST).length)
  })
})
