export default screen => {
  screen.textbox = screen.canvas.textbox()
  screen.textbox.onBlur(() => {
    const view = screen.textbox.view
    if (view) {
      screen.textbox.view = null
      view.textbox = null
      screen.render()
    }
  })
  screen.textbox.onInput(() => {
    const view = screen.textbox.view
    if (view) {
      view.text.display = screen.textbox.value()
      screen.render()
    }
  })
  screen.extend({
    input (view, type = 'text') {
      const textbox = screen.textbox
      view.input = type
      view.overflow = false
      view.onClick = () => {
        view.textbox = textbox
        textbox.view = view
        textbox.value(view.text.display)
        textbox.type(type)
        screen.render()
      }
    }
  })
  screen.plugins.prerender.push(view => screen.textbox.visibility(false))
  screen.plugins.render.push(view => {
    if (view.textbox) {
      screen.textbox.visibility(true)
      view.textbox.bounds(view.bounds)
      view.textbox.focus()
    }
  })
}