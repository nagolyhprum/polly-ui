export default screen => {
  screen.plugins.prerender.push(view => {
    screen.canvas.clear()
  })
}
