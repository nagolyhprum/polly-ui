import components from '/plugins/components'

import text from '/plugins/text'
import round from '/plugins/round'
import background from '/plugins/background'
import circle from '/plugins/circle'
import image from '/plugins/image'
import shadow from '/plugins/shadow'
import linear from '/plugins/linear'
import mouse from '/plugins/mouse'

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
    shadow(screen)
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
