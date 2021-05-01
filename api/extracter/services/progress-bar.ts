export class ProgressBar {
  total: number
  current: number
  bar_length: number

  constructor(total: number) {
    this.total = total
    this.current = 0
    this.bar_length = process.stdout.columns - 30
    process.stdout.write('\n')
  }

  incrementTotal () {
    this.total++
  }

  increment() {
    this.update(this.current + 1)
  }

  update(current: number) {
    this.current = current
    const current_progress = this.current / this.total
    this._draw(current_progress)
  }

  _draw(current_progress: number) {
    const filled_bar_length = Math.trunc(current_progress * this.bar_length)
    const empty_bar_length = this.bar_length - filled_bar_length

    const filled_bar = '>'.padStart(filled_bar_length, '-')
    const empty_bar = ''.padStart(empty_bar_length, ' ')
    const percentage_progress = (current_progress * 100).toFixed(2)

    process.stdout.clearLine(1)
    process.stdout.cursorTo(0)
    process.stdout.write(
      `Current progress: [${filled_bar}${empty_bar}] | ${percentage_progress}%`,
    )
  }

  _get_bar(length: number, char: string) {
    return
  }
}
