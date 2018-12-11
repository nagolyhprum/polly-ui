export default screen => {
  screen.extend({
    linear (view, spacing = 0, direction = 'vertical') {
      const scaledSpacing = spacing * screen.canvas.getRatio()
      view.managers.unshift(view => {
        const weight = view.children.reduce((weight, child) => weight + (child.weight || 0), 0)
        if (weight) {
          const dim = direction === 'vertical' ? 'height' : 'width'
          const vp = screen.getViewPortSize(view)
          const space = view.children.reduce((space, child) => {
            return space - (child.weight ? 0 : child.bounds[dim])
          }, vp[dim] - scaledSpacing * (view.children.length - 1))
          view.children.forEach(child => {
            if (child.weight) {
              child[dim] = (child.weight / weight) * space
            }
          })
        }
        view.children.forEach((child, index) => {
          if (index) {
            const previous = view.children[index - 1]
            switch (direction) {
              case 'vertical':
                child.y = previous.y + previous.bounds.height + (child.hidden ? 0 : scaledSpacing)
                break
              case 'horizontal':
                child.x = previous.x + previous.bounds.width + (child.hidden ? 0 : scaledSpacing)
                break
            }
          }
        })
        return {}
      })
    },
    weight  (view, weight) {
      view.weight = weight
    }
  })
}
