const ap = Array.prototype
ap.contains = function (item) {
  return this.indexOf(item) !== -1
}
