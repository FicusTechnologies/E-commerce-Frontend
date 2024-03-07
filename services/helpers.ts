// Helpers for grid properties
import type { PropWithBreakpoint } from '~/models/types'

const breakpoints = ['sm', 'md', 'lg', 'xl', '2xl']

export function getResponsiveClasses<T extends PropWithBreakpoint<number>>(classPrefix: string, props: T): string {
  if (typeof props === 'number') {
    return `${classPrefix}-${props}`
  }

  const responsiveClasses: string[] = []

  for (const key in props) {
    if (breakpoints.includes(key)) {
      responsiveClasses.push(`${key}:${classPrefix}-${props[key]}`)
    }
  }

  return responsiveClasses.join(' ').trim()
}
