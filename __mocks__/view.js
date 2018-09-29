export default extend => Object.assign({
  children: [],
  bounds: {
    x: 10,
    y: 20,
    width: 30,
    height: 40
  },
  padding: [10, 20, 30, 40],
  margin: [10, 20, 30, 40],
  render () {},
  isInBounds: true
}, extend)
