export function numberToString(num?: number): string {
  return num ? new Intl.NumberFormat().format(num) : ''
}

export function arrayToString(array?: any[]): string {
  //@ts-ignore
  return array ? new Intl.ListFormat('en').format(array) : ''
}

export function arrayToStringOr(array?: any[]): string {
  return array
    ? //@ts-ignore
      new Intl.ListFormat('en', { type: 'disjunction' }).format(array)
    : ''
}
