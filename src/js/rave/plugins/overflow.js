export default function (screen) {
  screen.plugins.render.push(function (view) {
    if (view.overflow === false) {
      screen.canvas.clip()
    }
  })
}
