export default isDebug => screen => {
  const { LEFT, TOP, EMPTY_ARRAY } = screen
  screen.plugins.render.push(view => {
    if (isDebug && view.isDirty) {
      const x = 0
      const y = 0
      const margin = view.margin || EMPTY_ARRAY
      const padding = view.padding || EMPTY_ARRAY
      const wpm = view.bounds.width
      const hpm = view.bounds.height
      const wp = wpm - screen.getLeftRight(margin)
      const hp = hpm - screen.getTopBottom(margin)
      const w = wp - screen.getLeftRight(padding)
      const h = hp - screen.getTopBottom(padding)
      // padding
      if (view.padding) {
        screen.highlightArea(
          'rgba(0, 255, 0, .7)',
          x, y, wp, hp,
          x + padding[LEFT], y + padding[TOP], w, h
        )
      }
      // margin
      if (view.margin) {
        screen.highlightArea(
          'rgba(0, 0, 255, .7)',
          x - margin[LEFT], y - margin[TOP], wpm, hpm,
          x, y, wp, hp
        )
      }
      // outline
      screen.canvas.strokeStyle('rgba(0, 0, 0, .7)')
      screen.canvas.setLineDash([2, 4])
      screen.canvas.strokeRect(x, y, wpm, hpm)
      screen.canvas.setLineDash([])
    }
  })
}
