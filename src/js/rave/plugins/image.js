export default function (screen) {
  const { TOP, LEFT, EMPTY_ARRAY } = screen
  screen.extend({
    src (view, image) {
      view.image = screen.canvas.image(image, () => {
        screen.render()
      })
    }
  })
  screen.plugins.render.push(function (view) {
    if (view.image && view.image.complete) {
      const margin = view.margin || EMPTY_ARRAY
      const padding = view.padding || EMPTY_ARRAY
      const x = view.bounds.x
      const y = view.bounds.y
      const w = view.bounds.width - screen.getLeftRight(margin) - screen.getLeftRight(padding)
      const h = view.bounds.height - screen.getTopBottom(margin) - screen.getTopBottom(padding)
      screen.canvas.drawImage(view.image, x + padding[LEFT] + margin[LEFT], y + padding[TOP] + margin[TOP], w, h)
    }
  })
}
