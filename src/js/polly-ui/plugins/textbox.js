export default screen => {
  screen.textbox = screen.canvas.textbox()
  screen.textbox.onBlur(() => {
    const view = screen.textbox.view()
    if (view) {
      screen.textbox.view(null)
      view.textbox = null
      screen.main.render()
    }
  })
  screen.textbox.onInput(() => {
    const view = screen.textbox.view()
    if (view) {
      view.text.display = screen.textbox.value()
      view.events.call('onTextChange', view.text.display)
      screen.main.render()
    }
  })
  screen.extend({
    bindText (view, text$) {
      screen.observe(text$, text => screen.text(text))
      screen.onTextChange(text => text$.set(text))
    },
    input (view, type = 'text') {
      const textbox = screen.textbox
      view.cursor = 'text'
      view.input = type
      view.overflow = false
      view.events.add('onClick', () => {
        view.textbox = textbox
        textbox.view(view)
        textbox.value(view.text.display)
        textbox.type(type)
        screen.main.render()
      })
    },
    onTextChange (view, onTextChange) {
      view.events.add('onTextChange', onTextChange)
    }
  })
  screen.plugins.prerender.push(view => screen.textbox.visibility(false))
  screen.plugins.render.push(view => {
    if (view.textbox) {
      screen.textbox.visibility(true)
      view.textbox.bounds(view.bounds, view.padding, view.margin)
      view.textbox.focus()
    }
  })
}
