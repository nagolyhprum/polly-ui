import text from 'polly-ui/plugins/text'
import Screen from 'screen'
import View from 'view'
describe('text', () => {
  it('draws text properly', () => {
    const display = 'hello world'
    const color = 'red'
    const align = 'center'
    const size = 16
    const style = { size }
    const view = View({
      margin: 0,
      padding: 0,
      textbox: {
        value () {

        },
        scroll () {
          return [10, 20]
        }
      }
    })
    const next = [
      // fillStyle
      // font
      // textBaseline
      // textAlign
      // fillText
      ['red'],
      [16, 'Polly, sans-serif', ''],
      ['top'],
      ['center'],
      [display, 15, 2],

      ['red'],
      [16, 'Polly, sans-serif', ''],
      ['top'],
      ['right'],
      ['\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022', 40, 22]
    ]
    const screen = Screen({
      canvas: {
        fillStyle () {
          expect([...arguments]).toEqual(next.shift())
        },
        font () {
          expect([...arguments]).toEqual(next.shift())
        },
        textBaseline () {
          expect([...arguments]).toEqual(next.shift())
        },
        textAlign () {
          expect([...arguments]).toEqual(next.shift())
        },
        fillText () {
          expect([...arguments]).toEqual(next.shift())
        }
      },
      active: view
    })
    text(screen)

    screen.text(display)
    expect(view.text.display).toEqual(display)
    expect(view.text.size).toEqual(12)
    expect(view.text.color).toEqual('black')
    expect(view.text.weight).toEqual('')
    expect(view.text.align).toEqual('left')

    screen.textColor(color)
    expect(view.text.color).toEqual(color)

    screen.textAlign(align)
    expect(view.text.align).toEqual(align)

    screen.style(style)
    expect(view.text.size).toEqual(size)

    screen.plugins.render[0](view)
    // ^ runs the expects

    view.input = 'password'
    screen.textAlign('right')
    view.textbox = null
    screen.plugins.render[0](view)
    // ^ runs the expects

    screen.text('')
    screen.plugins.render[0](view)
    expect(next).toHaveLength(0)
  })
})
