import Screen from 'rave/screen'
export default function (screen) {
  screen.reposition = function (view) {
    const position = Screen.prototype.reposition.call(this, view)
    return {
      x: position.x + (view.parent.scrollX || 0),
      y: position.y + (view.parent.scrollY || 0)
    }
  }
  screen.scrollable = function () {
    const active = this.active
    active.scrollX = 0
    active.scrollY = 0
    active.overflow = false
    let lastMouse; let dx = 0; let dy = 0
    // TODO : DO SOMETHING WITH THIS
    // let lastTs = Date.now();
    setInterval(() => {
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
      const right = Math.max(0, ...active.children.map(child => child.bounds.x + child.bounds.width - (active.bounds.x + active.bounds.width + active.scrollX)))
      const bottom = Math.max(0, ...active.children.map(child => child.bounds.y + child.bounds.height - (active.bounds.y + active.bounds.height + active.scrollY)))
      active.scrollX = Math.max(Math.min(active.scrollX + dx, 0), -right)
      active.scrollY = Math.max(Math.min(active.scrollY + dy, 0), -bottom)
      this.render()
    }
    active.onMouseMove = function (mouse) {
      if (lastMouse) {
        dx = mouse.x - lastMouse.x
        dy = mouse.y - lastMouse.y
        update()
        lastMouse = mouse
      }
    }
    active.onMouseDown = function (mouse) {
      lastMouse = mouse
    }
    active.onMouseUp = active.onMouseOut = function (mouse) {
      lastMouse = null
    }
  }
}
