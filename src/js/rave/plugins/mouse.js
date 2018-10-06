import { contains } from 'utils'
export default screen => {
  const canvas = screen.canvas
  const getMouse = (e, name) => ({
    x: e.x * screen.canvas.getRatio(),
    y: e.y * screen.canvas.getRatio(),
    name
  })

  let previous = []
  let moved = 0

  const call = (e, name) => {
    const mouse = getMouse(e, name)
    const mo = mouseOver(mouse, screen)
    previous.forEach(view => {
      if (!contains(mo, view)) {
        view.onMouseOut && view.onMouseOut(getMouse(e, 'onMouseOut'))
      }
    })
    mo.forEach(view => {
      if (!contains(previous, view)) {
        view.onMouseIn && view.onMouseIn(getMouse(e, 'onMouseIn'))
      }
    })
    previous = mo
    let view = mo[mo.length - 1]
    while (view && !view[name]) {
      view = view.parent
    }
    if (view && view !== screen) {
      view[name](mouse)
    }
    screen.canvas.cursor('default')
    let last = mo[mo.length - 1]
    while (last) {
      if (last.cursor) {
        screen.canvas.cursor(last.cursor)
        break
      }
      last = last.parent
    }
  }

  canvas.onMouseDown(e => {
    moved = 0
    call(e, 'onMouseDown')
  })

  canvas.onMouseOut(e => {
    const mouse = getMouse(e, 'onMouseOut')
    previous.forEach(view => {
      view.onMouseOut && view.onMouseOut(mouse)
    })
    previous = []
  })

  canvas.onMouseMove(e => {
    moved++
    call(e, 'onMouseMove')
  })

  canvas.onMouseUp(e => {
    call(e, 'onMouseUp')
  })

  canvas.onClick(e => {
    if (moved < 5) {
      call(e, 'onClick')
    }
  })

  const mouseOver = (mouse, view) => {
    return view.children.reduce((mo, child) => {
      child.render()
      if (child.isInBounds && canvas.isPointInPath(mouse.x, mouse.y)) {
        return mo.concat([child]).concat(mouseOver(mouse, child))
      }
      return mo
    }, [])
  }

  screen.extend({
    onClick (view, onClick) {
      view.cursor = 'pointer'
      view.onClick = onClick
    },
    onMouseIn (view, onMouseIn) {
      view.onMouseIn = onMouseIn
    },
    onMouseOut (view, onMouseOut) {
      view.onMouseOut = onMouseOut
    }
  })
}
