const WEIGHTS = ['normal', 'medium', 'bold']
const SIZES = Array.from({ length: 32 }).map((_, i) => i + 8)
export default WEIGHTS.reduce((font, weight) => {
  return SIZES.reduce((font, size) => {
    return Object.assign({}, font, {
      [`${weight}_${size}`]: {
        weight,
        size
      }
    })
  }, font)
}, {})
