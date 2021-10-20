/**
 * Generic API Error object.
 */
export function APIError (name, message, detail) {
  this.name = name
  this.message = message
  this.detail = detail
}
