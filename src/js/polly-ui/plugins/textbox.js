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
  screen.textbox.onInput((keyCode, value) => {
    const view = screen.textbox.view()
    if (view) {
      if (keyCode === 13) {
        view.events.call('onSubmit')
      } else {
        if (value !== view.text.display) {
          view.text.display = value
          view.events.call('onTextChange', value)
        }
      }
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
        screen.setDirty(view)
        screen.main.render()
      })
    },
    onTextChange (view, onTextChange) {
      view.events.add('onTextChange', onTextChange)
    },
    onSubmit (view, onSubmit) {
      view.events.add('onSubmit', onSubmit)
    }
  })
  screen.plugins.prerender.push(view => screen.textbox.visibility(false))
  screen.plugins.render.push(view => {
    if (view.textbox && view.isDirty) {
      screen.textbox.visibility(view.input === 'multi' ? 'multi' : 'single')
      view.textbox.bounds(view.bounds, view.padding, view.margin)
      view.textbox.focus()
    }
  })
}
