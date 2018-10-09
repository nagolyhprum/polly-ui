import { assign } from 'utils'
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
    padding,
    MATCH,
    state$,
    resources: {
      font
    }
  } = screen
  container(MATCH, MATCH, () => {
    linear()
    padding(0, 16, 16, 16)
    state$.get().colors.forEach((c, index) => {
      container(MATCH, 0, () => {
        text(c.key)
        textAlign('center')
        weight(1)
        style(font.normal_12)
      })
      container(MATCH, 0, () => {
        weight(1)
        background(c.value)
        onColorChange(c.value, value => {
          background(value)
          state$.set(assign(state$.get(), 'colors', index, 'value', value))
        })
      })
    })
  })
}
