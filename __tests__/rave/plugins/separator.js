import separator from 'rave/plugins/separator'
import color from 'color'
import View from 'view'
import Screen from 'screen'
describe('separator', () => {
  it('draws a separator!', () => {
    const parent = View({
      parent: {}
    })
    const a = View({
      parent
    })
    const b = View({
      parent
    })
    parent.children = [a, b]
    const screen = Screen({
      active: parent
    })
    separator(screen)
    screen.separator()
    expect(parent.separator).toEqual('vertical')
    screen.plugins.render[0](parent)
    screen.plugins.render[0](a)
    screen.plugins.render[0](b)
    expect(screen.canvas.drawn).toEqual([
      ['beginPath'],
      ['moveTo', 10, 20],
      ['lineTo', 40, 20],
      ['strokeStyle', color.divider_color],
      ['stroke']
    ])
  })
})
