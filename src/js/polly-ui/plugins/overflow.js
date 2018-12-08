export default screen => {
  screen.plugins.render.push(view => {
    if (view.overflow === false) {
      screen.canvas.clip()
    }
  })
  screen.extend({
    clip(view, clip = true) {
      view.overflow = !clip
    }
  })
}
