const getBottom = (view, padding, margin, BOTTOM) => Math.max(0, ...view.children.map(
  child => child.bounds.y + child.bounds.height - (view.bounds.y + view.bounds.height + view.scrollY) + padding[BOTTOM] + margin[BOTTOM]
))

const getRight = (view, padding, margin, RIGHT) => Math.max(0, ...view.children.map(
  child => child.bounds.x + child.bounds.width - (view.bounds.x + view.bounds.width + view.scrollX) + padding[RIGHT] + margin[RIGHT]
))

export default screen => {
  const { BOTTOM, RIGHT } = screen
  screen.plugins.reposition.push(view => ({
    x: (view.parent.scrollX || 0),
    y: (view.parent.scrollY || 0)
  }))
  screen.extend({
    scrollTo (active, x, y) {
      setTimeout(() => {
        if (arguments.length === 3) {
          const padding = active.padding || screen.EMPTY_ARRAY
          const margin = active.margin || screen.EMPTY_ARRAY
          const right = getRight(active, padding, margin, RIGHT)
          const bottom = getBottom(active, padding, margin, BOTTOM)
          active.scrollX = Math.max(Math.min(-right * x, 0), -right)
          active.scrollY = Math.max(Math.min(-bottom * y, 0), -bottom)
          screen.setDirty(active)
          screen.main.render()
        } else {
          const padding = active.parent.padding || screen.EMPTY_ARRAY
          const margin = active.parent.margin || screen.EMPTY_ARRAY
          const right = getRight(active.parent, padding, margin, RIGHT)
          const bottom = getBottom(active.parent, padding, margin, BOTTOM)
          const goalX = active.parent.bounds.x - active.bounds.x - active.bounds.width / 2 + active.parent.scrollX + active.parent.bounds.width / 2
          const goalY = active.parent.bounds.y - active.bounds.y - active.bounds.height / 2 + active.parent.scrollY + active.parent.bounds.height / 2
          active.parent.scrollX = Math.max(Math.min(goalX, 0), -right)
          active.parent.scrollY = Math.max(Math.min(goalY, 0), -bottom)
          screen.setDirty(active.parent)
          screen.main.render()
        }
      }, 1000 / 60)
    },
    scrollable (active) {
      const padding = active.padding || screen.EMPTY_ARRAY
      const margin = active.margin || screen.EMPTY_ARRAY
      active.scrollX = 0
      active.scrollY = 0
      active.overflow = false
      let lastMouse; let dx = 0; let dy = 0
      // TODO : DO SOMETHING WITH DATE
      // let lastTs = Date.now();
      screen.setInterval(() => {
        // const now = Date.now()
        // const dt = (now - lastTs) / 1000
        // lastTs = now
        dx /= 1.2
        if (Math.abs(dx) < 1) {
          dx = 0
        }
        dy /= 1.2
        if (Math.abs(dy) < 1) {
          dy = 0
        }
        if (!lastMouse && (dx || dy)) {
          update()
        }
      }, 1000 / 60)
      const update = () => {
        const right = getRight(active, padding, margin, RIGHT)
        const bottom = getBottom(active, padding, margin, BOTTOM)
        active.scrollX = Math.max(Math.min(active.scrollX + dx, 0), -right)
        active.scrollY = Math.max(Math.min(active.scrollY + dy, 0), -bottom)
        screen.setDirty(active)
        screen.main.render()
      }
      active.events.add('onMouseMove', mouse => {
        if (lastMouse) {
          dx = mouse.x - lastMouse.x
          dy = mouse.y - lastMouse.y
          update()
          lastMouse = mouse
        }
      })
      active.events.add('onMouseDown', mouse => {
        lastMouse = mouse
      })
      active.events.add('onMouseUp', mouse => {
        lastMouse = null
      })
      active.events.add('onMouseOut', mouse => {
        lastMouse = null
      })
    }
  })
}
