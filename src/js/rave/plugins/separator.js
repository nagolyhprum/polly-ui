export default function (screen) {
  screen.separator = function (separator = true) {
    this.active.separator = separator
  }
  screen.plugins.render.push(function (view) {
    if (view.parent.separator) {
      const index = view.parent.children.indexOf(view)
      if (index) {
        screen.canvas.beginPath()
        screen.canvas.moveTo(
          view.bounds.x,
          view.bounds.y
        )
        screen.canvas.lineTo(
          view.bounds.x + view.bounds.width,
          view.bounds.y
        )
        screen.canvas.strokeStyle('rgba(0, 0, 0, .7)')
        screen.canvas.stroke()
      }
    }
  })
}
