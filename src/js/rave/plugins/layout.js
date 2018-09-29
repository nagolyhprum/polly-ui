export default isDebug => function (screen) {
  const { LEFT, TOP, EMPTY_ARRAY } = screen
  screen.plugins.render.push(function (view) {
    if (isDebug) {
      const x = view.bounds.x
      const y = view.bounds.y
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
          x + margin[LEFT], y + margin[TOP], wp, hp,
          x + margin[LEFT] + padding[LEFT], y + margin[TOP] + padding[TOP], w, h
        )
      }
      // margin
      if (view.margin) {
        screen.highlightArea(
          'rgba(0, 0, 255, .7)',
          x, y, wpm, hpm,
          x + margin[LEFT], y + margin[TOP], wp, hp
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
