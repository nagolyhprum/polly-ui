import Screen from 'screen'
import View from 'view'
import scrollable from 'rave/plugins/scrollable'
describe('scrollable', () => {
  it('repositions', () => {
    const view = View({
      parent: {
        scrollX: 10,
        scrollY: 20
      }
    })
    const screen = Screen()
    scrollable(screen)
    expect(screen.plugins.reposition[0](view)).toEqual({
      x: 10,
      y: 20
    })
    view.parent.scrollX = null
    view.parent.scrollY = null
    expect(screen.plugins.reposition[0](view)).toEqual({
      x: 0,
      y: 0
    })
  })
  it('scrolls', () => {
    const view = View({
      children: [View({
        bounds: {
          x: 10,
          y: 20,
          width: 300,
          height: 300
        }
      })]
    })
    const screen = Screen({
      active: view
    })
    scrollable(screen)
    screen.scrollable()
    expect(view.scrollX).toEqual(0)
    expect(view.scrollY).toEqual(0)
    expect(view.overflow).toEqual(false)
    view.onMouseMove({ x: 0, y: 0 })
    expect(view.scrollX).toEqual(0)
    expect(view.scrollY).toEqual(0)
    view.onMouseDown({ x: 0, y: 0 })
    expect(view.scrollX).toEqual(0)
    expect(view.scrollY).toEqual(0)
    view.onMouseMove({ x: -1.2, y: -1.2 })
    expect(view.scrollX).toEqual(-1.2)
    expect(view.scrollY).toEqual(-1.2)
    view.onMouseUp()
    // test friction
    screen.interval()
    expect(view.scrollX).toEqual(-2.2)
    expect(view.scrollY).toEqual(-2.2)
    screen.interval()
    expect(view.scrollX).toEqual(-2.2)
    expect(view.scrollY).toEqual(-2.2)
  })
})
