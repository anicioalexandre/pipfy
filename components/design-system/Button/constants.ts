import type { ButtonVariant } from './types'

export const BACKGROUND_VARIANT_MAP: Record<ButtonVariant, string> = {
  contained: 'var(--pipfy-primary)',
  outlined: 'var(--pipfy-secondary)',
}

export const BORDER_VARIANT_MAP: Record<ButtonVariant, string> = {
  contained: 'none',
  outlined: '1px solid var(--pipfy-primary)',
}

export const COLOR_VARIANT_MAP: Record<ButtonVariant, string> = {
  contained: 'var(--pipfy-secondary)',
  outlined: 'var(--pipfy-primary)',
}
