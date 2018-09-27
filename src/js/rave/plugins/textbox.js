//TODO abstract this
export default function (screen) {
  screen.textbox = document.createElement('input')
  document.body.appendChild(screen.textbox)
  screen.textbox.onblur = e => {
    const view = screen.textbox.view
    if (view) {
      screen.textbox.view = null
      view.textbox = null
      screen.render()
    }
  }
  screen.textbox.oninput = e => {
    const view = screen.textbox.view
    if (view) {
      view.text.display = screen.textbox.value
      screen.render()
    }
  }
  screen.input = function(input = 'text') {
    const view = this.active
    view.input = input
    view.overflow = false
    view.onClick = () => {
      view.textbox = this.textbox
      this.textbox.view = view
      this.textbox.value = view.text.display
      this.textbox.type = input
      this.render()
    }
  }
  return function(view) {
    if(view === screen) {
      screen.textbox.style.display = 'none'
    } else {
      if (view.textbox) {
        view.textbox.style.display = 'block'
        view.textbox.style.left = `${view.bounds.x}px`
        view.textbox.style.top = `${view.bounds.y}px`
        view.textbox.style.width = `${view.bounds.width}px`
        view.textbox.style.height = `${view.bounds.height}px`
        if (screen.textbox !== document.activeElement) {
          screen.textbox.focus()
        }
      }
    }
  }
}
