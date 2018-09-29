import background from 'rave/plugins/background'
import Screen from 'screen'
describe('background', () => {
  it('sets the background', () => {
    const bg = 'red'
    const view = {}
    const screen = Screen({
      active: view
    })
    background(screen)
    screen.background(bg)
    expect(view).toEqual({ background: bg })
  })
  it('draws the view with margin', done => {
    const screen = Screen()
    const view = {
      render: isRender => {
        expect(isRender).toEqual(true)
        done()
      }
    }
    background(screen)
    screen.plugins.render[0](view)
  })
})
