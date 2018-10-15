import circle from '/plugins/circle'
import Screen from 'screen'
import View from 'view'
describe('circle', () => {
  it('draws a circle', () => {
    const view = View({
      background: 'red',
      margin: 0
    })
    const screen = Screen({
      active: view
    })
    circle(screen)
    screen.circle()
    view.render()
    expect(screen.canvas.drawn).toEqual([
      ['beginPath'],
      ['arc', 25, 35, 15, 0, 6.283185307179586, true]
    ])
    screen.canvas.clear()
    view.render(true)
    expect(screen.canvas.drawn).toEqual([
      ['beginPath'],
      ['arc', 25, 35, 15, 0, 6.283185307179586, true],
      ['fillStyle', 'red'],
      ['fill']
    ])
  })
})
