export default function (screen) {
  screen.plugins.prerender.push(function (view) {
    screen.canvas.clear()
  })
}
