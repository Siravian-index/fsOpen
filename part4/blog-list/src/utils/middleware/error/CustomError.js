class CustomError extends Error {
  constructor(msg, code = 400) {
    super(msg)
    this.code = code
    this.msg = msg
  }
  display() {
    return { error: this.msg, code: this.code }
  }
}

module.exports = CustomError
