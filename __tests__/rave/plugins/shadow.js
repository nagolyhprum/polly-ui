import shadow from 'rave/plugins/shadow'
import Screen from 'screen'
import View from 'view'
describe('shadow', () => {
  it('draws a shadow', () => {
    const view = View()
    const screen = Screen({
      active: view
    })
    shadow(screen)
    screen.shadow()
    screen.plugins.render[0](view)
    expect(screen.canvas.drawn).toEqual([
      ['shadow', true]
    ])
  })
})
