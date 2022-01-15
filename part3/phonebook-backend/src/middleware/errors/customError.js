export class customError extends Error {
  constructor(msg, code = 400) {
    super(msg)
    this.msg = msg
    this.code = code
  }
  render() {
    return { error: this.msg, code: this.code }
  }
}
