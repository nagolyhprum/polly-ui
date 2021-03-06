import shadow from 'polly-ui/plugins/shadow'
import Screen from 'screen'
import View from 'view'
describe('shadow', () => {
  it('draws a shadow', () => {
    const view = View({
      parent: View()
    })
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
