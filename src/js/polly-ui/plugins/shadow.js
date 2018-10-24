export default screen => {
  screen.extend({
    shadow (view, shadow = true) {
      view.shadow = shadow
    }
  })
  screen.plugins.render.push(view => {
    if (view.parent) {
      screen.canvas.shadow(view.shadow)
    }
  })
}
