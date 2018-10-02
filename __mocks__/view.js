export default extend => Object.assign({
  managers : [],
  children: [],
  x : 0,
  y : 0,
  width : 0,
  height : 0,
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
