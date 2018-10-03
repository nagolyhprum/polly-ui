import components from 'rave/plugins/components'

import text from 'rave/plugins/text'
import round from 'rave/plugins/round'
import background from 'rave/plugins/background'
import circle from 'rave/plugins/circle'
import image from 'rave/plugins/image'
import shadow from 'rave/plugins/shadow'
import linear from 'rave/plugins/linear'
import mouse from 'rave/plugins/mouse'

import Screen from 'screen'
import View from 'view'
describe('components', () => {
  it('supports fab', () => {
    const view = View()
    const screen = Screen({
      active: view
    })
    // deps
    circle(screen)
    background(screen)
    image(screen)
    // test it out
    components(screen)
    screen.fab()
  })
  it('supports buttons', () => {
    const view = View()
    const screen = Screen({
      active: view
    })
    // deps
    round(screen)
    background(screen)
    text(screen)
    // test it out
    components(screen)
    screen.button()
    screen.button('red')
    screen.plugins.render[0](view)
  })
  it('supports card', () => {
    const view = View()
    const screen = Screen({
      active: view
    })
    // deps
    round(screen)
    background(screen)
    shadow(screen)
    // test it out
    components(screen)
    screen.card()
  })
  it('supports tabs', () => {
    const view = View()
    const screen = Screen({
      active: view
    })
    // deps
    text(screen)
    linear(screen)
    mouse(screen)
    background(screen)
    // test it out
    components(screen)
    screen.tabs('a', 'b', 'c')
  })
})
