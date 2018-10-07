export default screen => {
  const cp = screen.canvas.colorPicker()
  screen.extend({
    onColorChange (view, init, onColorChange) {
      screen.onClick(() => {
        cp.onChange(() => {
          screen.select(view)
          onColorChange(cp.value())
          screen.main.render()
        })
        cp.choose(init)
      })
    }
  })
}
