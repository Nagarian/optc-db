export function numberToString(num?: number): string {
  return num ? new Intl.NumberFormat().format(num) : ''
}

export function arrayToString(array?: any[]): string {
  //@ts-ignore
  return array ? new Intl.ListFormat().format(array) : ''
}
