export default function(screen) {
  screen.separator = function(separator = true) {
    this.active.separator = separator
  }
  return function(view) {
    if(view === screen) return;
    const index = view.parent.children.indexOf(view)
    if (index > 0 && view.parent.separator) {
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
}
