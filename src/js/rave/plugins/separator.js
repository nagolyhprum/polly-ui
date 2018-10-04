import color from 'color'
export default screen => {
  screen.extend({
    separator (view, separator = true) {
      view.separator = separator
    }
  })
  screen.plugins.render.push(view => {
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
        screen.canvas.strokeStyle(color.divider_color)
        screen.canvas.stroke()
      }
    }
  })
}
