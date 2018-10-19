import textbox from 'polly-ui/plugins/textbox'
import Screen from 'screen'
import View from 'view'
describe('textbox', () => {
  it('responds to events', () => {
    let calls = 0
    const display = 'Hello World'
    const change = 'changed value'
    const view = View({
      text: {
        display
      }
    })
    const screen = Screen({
      render () {
        calls++
      },
      active: view
    })
    textbox(screen)
    screen.input('multi')
    // cant blur unless focused
    screen.textbox.onblur()
    expect(calls).toEqual(0)
    // cant input unless focused
    screen.textbox.oninput()
    expect(calls).toEqual(0)
    // focus it
    view.events.call('onClick')
    expect(calls).toEqual(1)
    expect(view.textbox).toEqual(screen.textbox)
    expect(screen.textbox.view()).toEqual(view)
    expect(screen.textbox.type()).toEqual('multi')
    // draw it
    screen.plugins.render[0](view)
    expect(screen.textbox.visibility()).toEqual('multi')
    expect(screen.textbox.bounds()).toEqual(view.bounds)
    // undraw it
    screen.plugins.prerender[0](view)
    expect(screen.textbox.visibility()).toEqual(false)
    // detect input
    screen.textbox.value(change)
    screen.textbox.oninput()
    expect(calls).toEqual(2)
    // detect unfocus
    screen.textbox.onblur()
    expect(screen.textbox.view()).toEqual(null)
    expect(view.textbox).toEqual(null)
    expect(calls).toEqual(3)
    // it no longer draws
    screen.plugins.render[0](view)
    expect(screen.textbox.visibility()).toEqual(false)
  })
})
