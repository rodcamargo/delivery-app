module.exports = class GetterErrors extends Error {
  _status;
  constructor(message, status) {
    super(message);
    this._status = status;
  }

  get status() {
    return this._status;
  }
}
