import { assign } from 'utils'
export default screen => {
  const {
    container,
    linear,
    text,
    weight,
    style,
    padding,
    separator,
    input,
    onTextChange,
    MATCH,
    WRAP,
    state$,
    resources: {
      font
    }
  } = screen
  container(MATCH, MATCH, () => {
    linear()
    separator()
    state$.get().strings.forEach((c, index) => {
      container(MATCH, WRAP, () => {
        separator('horizontal')
        linear(0, 'horizontal')
        container(0, WRAP, () => {
          padding(8)
          weight(1)
          text(c.key)
          style(font.normal_12)
        })
        container(0, WRAP, () => {
          padding(8)
          weight(3)
          text(c.value)
          style(font.normal_12)
          input()
          onTextChange(value => state$.set(assign(state$.get(), 'strings', index, 'value', value)))
        })
      })
    })
  })
}
