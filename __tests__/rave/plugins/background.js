import background from 'rave/plugins/background'
import Screen from 'rave/screen'

describe('background', () => {
  it('sets the background', () => {
    const bg = 'red'
    const view = {}
    const screen = {
      active: view,
      plugins: {
        render: [],
        view: []
      }
    }
    background(screen)
    screen.background(bg)
    expect(view).toEqual({ background: bg })
  })
  it('draws the view with margin', done => {
    const canvas = {
      getWidth: () => 0,
      getHeight: () => 0
    }
    const screen = new Screen(canvas)
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
