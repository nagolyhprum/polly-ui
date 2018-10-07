import { assign } from "utils"
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
    separator,
    input,
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
        separator("horizontal")
        linear(0, "horizontal")
        container(0, WRAP, () => {
          padding(8)
          weight(1)
          text(c.key)
          style(font.normal_12)
        })
        container(0, WRAP, () => {
          padding(8)
          weight(1)
          text(c.value)
          style(font.normal_12)
          input()
        })
      })
    })
  })
}
