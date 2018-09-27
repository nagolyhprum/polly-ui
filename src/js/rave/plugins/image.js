import { TOP, LEFT, EMPTY_ARRAY } from 'rave/screen'

export default function (screen) {
  screen.src = function (image) {
    this.active.image = this.canvas.image(image, () => {
      this.render()
    })
  }
  return function (view) {
    if (view.image && view.image.complete) {
      const margin = view.margin || EMPTY_ARRAY
      const padding = view.padding || EMPTY_ARRAY
      const x = view.bounds.x
      const y = view.bounds.y

      const wpm = view.bounds.width
      const hpm = view.bounds.height

      const wp = wpm - screen.getLeftRight(margin)
      const hp = hpm - screen.getTopBottom(margin)

      const w = wp - screen.getLeftRight(padding)
      const h = hp - screen.getTopBottom(padding)
      screen.canvas.drawImage(view.image, x + padding[LEFT] + margin[LEFT], y + padding[TOP] + margin[TOP], w, h)
    }
  }
}
