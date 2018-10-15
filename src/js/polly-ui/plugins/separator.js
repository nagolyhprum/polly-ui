import color from 'color'
export default screen => {
  screen.extend({
    separator (view, separator = 'vertical') {
      view.separator = separator
    }
  })
  screen.plugins.render.push((view) => {
    const separator = view.parent.separator
    if (separator) {
      const index = view.parent.children.indexOf(view)
      if (index) {
        screen.canvas.beginPath()
        screen.canvas.moveTo(
          view.bounds.x,
          view.bounds.y
        )
        switch (separator) {
          case 'horizontal' :
            screen.canvas.lineTo(
              view.bounds.x,
              view.bounds.y + view.bounds.height
            )
            break
          case 'vertical':
            screen.canvas.lineTo(
              view.bounds.x + view.bounds.width,
              view.bounds.y
            )
            break
        }
        screen.canvas.strokeStyle(color.divider_color)
        screen.canvas.stroke()
      }
    }
  })
}
