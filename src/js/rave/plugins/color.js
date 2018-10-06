export default screen => {
  const cp = screen.canvas.colorPicker()
  screen.extend({
    onColorChange (view, color, onColorChange) {
      screen.onClick(() => {
        cp.onChange(() => {
          color.value = cp.value()
          view.background = cp.value()
          onColorChange()
          screen.main.render()
        })
        cp.choose(color.value)
      })
    }
  })
}
