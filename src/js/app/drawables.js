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
    src,
    anchor,
    position,
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
    const COLUMNS = 2
    Array.from({ length: Math.ceil(state$.get().images.length / COLUMNS) }).forEach((_, i) => {
      container(MATCH, WRAP, () => {
        linear(0, 'horizontal')
        separator('horizontal')
        state$.get().images.slice(i * COLUMNS, i * COLUMNS + COLUMNS).forEach((c, index) => {
          container(0, WRAP, () => {
            padding(8)
            weight(1)
            linear(8)
            container(WRAP, WRAP, () => {
              anchor(0.5, 0)
              position(0.5, 0)
              text(c.key)
              style(font.normal_12)
            })
            container(48, 48, () => {
              anchor(0.5, 0)
              position(0.5, 0)
              src(c.value, 'black')
            })
          })
        })
      })
    })
  })
}
