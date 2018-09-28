import { TOP, LEFT, EMPTY_ARRAY } from 'rave/screen'

export default function (screen) {
  screen.background = function (background) {
    this.active.background = background
  }
  return function (view) {
    if (view === screen) return false
    const margin = view.margin || EMPTY_ARRAY
    const x = view.bounds.x
    const y = view.bounds.y
    const wp = view.bounds.width - screen.getLeftRight(margin)
    const hp = view.bounds.height - screen.getTopBottom(margin)
    view.render(
      screen.canvas,
      x + margin[LEFT],
      y + margin[TOP],
      wp,
      hp,
      screen.getValue(view, 'round'),
      view.background || 'transparent'
    )
  }
}
