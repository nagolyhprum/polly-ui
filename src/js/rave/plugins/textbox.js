// TODO abstract this
export default function (screen) {
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
  screen.input = function (type = 'text') {
    const view = this.active
    const textbox = screen.textbox
    view.input = type
    view.overflow = false
    view.onClick = () => {
      view.textbox = textbox
      textbox.view = view
      textbox.value(view.text.display)
      textbox.type(type)
      this.render()
    }
  }
  screen.plugins.prerender.push(function (view) {
    screen.textbox.visibility(false)
  })
  screen.plugins.render.push(function (view) {
    if (view.textbox) {
      screen.textbox.visibility(true)
      view.textbox.bounds(view.bounds)
      view.textbox.focus()
    }
  })
}
