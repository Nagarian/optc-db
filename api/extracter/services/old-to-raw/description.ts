import { cleanHmtl } from './old-db-helper'

export function extractDescription(description?: string): string {
  if (!description) return ''

  return cleanHmtl(description)
}
