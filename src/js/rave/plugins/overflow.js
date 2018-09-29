export default screen => {
  screen.plugins.render.push(view => {
    if (view.overflow === false) {
      screen.canvas.clip()
    }
  })
}
