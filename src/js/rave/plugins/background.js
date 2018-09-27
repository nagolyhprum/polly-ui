import { TOP, LEFT, EMPTY_ARRAY } from "rave/screen"

export default function(screen) {
  screen.background = function(background) {
    this.active.background = background
  }
  return function(view) {
    if(view === screen) return;
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
