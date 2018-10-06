export default screen => {
  const {
    container,
    linear,
    text,
    textAlign,
    weight,
    style,
    background,
    onColorChange,
    MATCH,
    state,
    resources: {
      font
    }
  } = screen
  container(MATCH, MATCH, () => {
    linear()
    state.colors.forEach(c => {
      container(MATCH, 0, () => {
        text(c.name)
        textAlign('center')
        weight(1)
        style(font.normal_12)
      })
      container(MATCH, 0, () => {
        weight(1)
        background(c.value)
        onColorChange(c, () => {
          // TODO
        })
      })
    })
  })
}
