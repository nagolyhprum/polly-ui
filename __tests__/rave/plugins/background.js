import background from 'polly-ui/plugins/background'
import Screen from 'screen'
import View from 'view'
describe('background', () => {
  const bg = 'red'
  it('sets the background', () => {
    const view = View()
    const screen = Screen({
      active: view
    })
    background(screen)
    screen.background(bg)
    expect(view.background).toEqual(bg)
  })
  it('draws the view with margin', () => {
    const view = View()
    const screen = Screen({
      active: view
    })
    background(screen)
    screen.background(bg)
    screen.plugins.view[0](view)
    screen.plugins.render[0](view)
    expect(screen.canvas.drawn).toEqual([
      ['beginPath'],
      ['rect', 50, 30, -30, 0],
      ['fillStyle', bg],
      ['fill']
    ])
  })
  it('skips drawing the view without margin', () => {
    const view = View({
      margin: null
    })
    const screen = Screen({
      active: view
    })
    background(screen)
    screen.plugins.view[0](view)
    screen.plugins.render[0](view)
    expect(screen.canvas.drawn).toEqual([
      ['beginPath'],
      ['rect', 10, 20, 30, 40]
    ])
  })
})
