function isGoodNumber (num) {
  if (num === 1 / 0) {
    return false
  }
  return !isNaN(num) && isFinite(num) && num >= 0
}

function makeFixed (num, suffix = '', decimals = 2, prefix = '') {
  return isGoodNumber(num) ? prefix + num.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix : '...'
}

export {
  isGoodNumber,
  makeFixed,
}
