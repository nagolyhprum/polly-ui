export default function (screen) {
  screen.linear = function (spacing = 0, direction = 'vertical') {
    this.active.managers.unshift(view => {
      const weight = view.children.reduce((weight, child) => weight + (child.weight || 0), 0)
      if (weight) {
        const dim = direction === 'vertical' ? 'height' : 'width'
        const vp = this.getViewPortSize(view)
        const space = view.children.reduce((space, child) => {
          return space - (child.weight ? 0 : child.bounds[dim])
        }, vp[dim] - spacing * (view.children.length - 1))
        view.children.forEach(child => {
          if (child.weight) {
            child[dim] = (child.weight / weight) * space
          }
        })
      }
      view.children.forEach((child, index) => {
        if (index) {
          const previous = view.children[index - 1]
          if (direction === 'vertical') {
            child.y = previous.y + previous.bounds.height + spacing
          } else if (direction === 'horizontal') {
            child.x = previous.x + previous.bounds.width + spacing
          }
        }
      })
      return {}
    })
  }
  screen.weight = function (weight) {
    this.active.weight = weight
  }
}
