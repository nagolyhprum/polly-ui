import mouse from 'rave/plugins/mouse'
import Screen from 'screen'
describe('mouse', () => {
  it('can click and skip click', () => {
    const view = {
      render () {},
      isInBounds: true,
      children: []
    }
    const screen = Screen({
      children: [view],
      active: view
    })
    mouse(screen)
    let call = 0
    screen.onClick(function () {
      call++
    })
    for (let i = 0; i < 4; i++) {
      screen.canvas.onmousemove({})
    }
    screen.canvas.onclick({})
    expect(call).toEqual(1)
    screen.canvas.onmousemove({})
    screen.canvas.onclick({})
    expect(call).toEqual(1)
    screen.canvas.onmousedown({})
    screen.canvas.onclick({})
    expect(call).toEqual(2)
    screen.canvas.onmouseup({}) // just doing this for coverage
    expect(call).toEqual(2)
  })
  it('can skip mouse in and out', () => {
    const view = {
      render () {},
      isInBounds: true,
      children: []
    }
    const screen = Screen({
      canvas: {
        isPointInPath (x, y) {
          return x === 0 && y === 0
        }
      },
      children: [view],
      active: view
    })
    mouse(screen)
    let onMouseIn = 0
    let onMouseOut = 0
    screen.onMouseIn(() => {
      onMouseIn++
    })
    screen.onMouseOut(() => {
      onMouseOut++
    })
    screen.canvas.onmousemove({ x: 0, y: 0 })
    expect(onMouseIn).toEqual(1)
    expect(onMouseOut).toEqual(0)
    screen.canvas.onmousemove({})
    expect(onMouseIn).toEqual(1)
    expect(onMouseOut).toEqual(1)
    screen.canvas.onmousemove({ x: 0, y: 0 })
    expect(onMouseIn).toEqual(2)
    expect(onMouseOut).toEqual(1)
    screen.canvas.onmouseout({})
    expect(onMouseIn).toEqual(2)
    expect(onMouseOut).toEqual(2)
  })
})
