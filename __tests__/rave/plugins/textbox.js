import textbox from 'rave/plugins/textbox'
const Canvas = () => ({
  textbox: () => ({
    onBlur (onBlur) {
      this.onblur = onBlur
    },
    onInput (onInput) {
      this.oninput = onInput
    },
    value (value) {
      if (arguments.length === 1) {
        this._value = value
      }
      return this._value
    },
    type (type) {
      if (arguments.length === 1) {
        this._type = type
      }
      return this._type
    },
    visibility (visibility) {
      if (arguments.length === 1) {
        this._visibility = visibility
      }
      return this._visibility
    },
    bounds (bounds) {
      if (arguments.length === 1) {
        this._bounds = bounds
      }
      return this._bounds
    },
    focus () {
    }
  })
})
describe('textbox', () => {
  it('responds to events', () => {
    let calls = 0
    const display = 'Hello World'
    const change = 'changed value'
    const view = {
      text: {
        display
      },
      bounds: { x: 0, y: 0, width: 0, height: 0 }
    }
    const screen = {
      plugins: {
        prerender: [],
        render: []
      },
      render () {
        calls++
      },
      canvas: Canvas(),
      active: view
    }
    textbox(screen)
    screen.input()
    // cant blur unless focused
    screen.textbox.onblur()
    expect(calls).toEqual(0)
    // cant input unless focused
    screen.textbox.oninput()
    expect(calls).toEqual(0)
    // focus it
    view.onClick()
    expect(calls).toEqual(1)
    expect(view.textbox).toEqual(screen.textbox)
    expect(screen.textbox.view).toEqual(view)
    expect(screen.textbox.value()).toEqual(display)
    expect(screen.textbox.type()).toEqual('text')
    // draw it
    screen.plugins.render[0](view)
    expect(screen.textbox.visibility()).toEqual(true)
    expect(screen.textbox.bounds()).toEqual(view.bounds)
    // undraw it
    screen.plugins.prerender[0](view)
    expect(screen.textbox.visibility()).toEqual(false)
    // detect input
    screen.textbox.value(change)
    screen.textbox.oninput()
    expect(calls).toEqual(2)
    expect(view.text.display).toEqual(change)
    // detect unfocus
    screen.textbox.onblur()
    expect(screen.textbox.view).toEqual(null)
    expect(view.textbox).toEqual(null)
    expect(calls).toEqual(3)
    // it no longer draws
    screen.plugins.render[0](view)
    expect(screen.textbox.visibility()).toEqual(false)
  })
})
