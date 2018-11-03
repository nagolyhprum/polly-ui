const OPPOSITE_DIMENSIONS = {
  x: 'y',
  y: 'x',
  width: 'height',
  height: 'width'
}
export default screen => {
  const { TOP, LEFT, EMPTY_ARRAY } = screen
  screen.extend({
    src (view, image, color = screen.resources.color.text) {
      image && screen.canvas.image(image, color).then(image => {
        view.image = image
        screen.setDirty(view)
        screen.main.render()
      })
    }
  })
  screen.plugins.wrap.unshift((view, dim) => {
    if (view.image) {
      const spaceAround = {
        width: screen.getLeftRight(view.padding) + screen.getLeftRight(view.margin),
        height: screen.getTopBottom(view.padding) + screen.getTopBottom(view.margin)
      }[dim]
      const imageBounds = {
        width: screen.canvas.getWidth(view.image),
        height: screen.canvas.getHeight(view.image)
      }
      const other = OPPOSITE_DIMENSIONS[dim]
      const opposite = Math.max(0, view.bounds[other] - spaceAround) / imageBounds[other] * imageBounds[dim]
      return {
        [dim]: (opposite || view.image[dim])
      }
    }
  })
  screen.plugins.render.push(view => {
    if (view.image && view.image.complete && view.isDirty) {
      screen.canvas.shadow(false)
      const margin = view.margin || EMPTY_ARRAY
      const padding = view.padding || EMPTY_ARRAY
      const x = view.bounds.x
      const y = view.bounds.y
      const w = view.bounds.width - screen.getLeftRight(margin) - screen.getLeftRight(padding)
      const h = view.bounds.height - screen.getTopBottom(margin) - screen.getTopBottom(padding)
      screen.canvas.fillStyle('white')
      screen.canvas.strokeStyle('white')
      screen.canvas.drawImage(view.image, x + padding[LEFT] + margin[LEFT], y + padding[TOP] + margin[TOP], w, h)
    }
  })
}
