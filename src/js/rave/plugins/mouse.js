import { contains } from 'utils'
export default function (screen) {
  const canvas = screen.canvas
  const getMouse = (e, name) => ({
    x: e.x,
    y: e.y,
    name
  })

  let last = []
  let moved = 0

  const call = (e, name) => {
    const mouse = getMouse(e, name)
    const mo = mouseOver(mouse, screen)
    last.forEach(view => {
      if (!contains(mo, view)) {
        view.onMouseOut && view.onMouseOut(getMouse(e, 'onMouseOut'))
      }
    })
    mo.forEach(view => {
      if (!contains(last, view)) {
        view.onMouseIn && view.onMouseIn(getMouse(e, 'onMouseIn'))
      }
    })
    last = mo
    let view = mo[mo.length - 1]
    while (view && !view[name]) {
      view = view.parent
    }
    if (view && view !== screen) {
      view[name](mouse)
    }
  }

  canvas.onMouseDown(e => {
    moved = 0
    call(e, 'onMouseDown')
  })

  canvas.onMouseOut(e => {
    const mouse = getMouse(e, 'onMouseOut')
    last.forEach(view => {
      view.onMouseOut && view.onMouseOut(mouse)
    })
    last = []
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
