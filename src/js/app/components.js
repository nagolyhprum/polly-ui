import { assign } from 'utils'

const getComponent = state => state.component || state.components.find(it => it.key === state.view).value[0]

export default screen => {
  const {
    scrollable,
    container,
    linear,
    text,
    weight,
    style,
    padding,
    separator,
    input,
    onTextChange,
    observe,
    background,
    clear,
    onClick,
    MATCH,
    WRAP,
    state$,
    resources: {
      font,
      color
    }
  } = screen
  container(MATCH, MATCH, () => {
    linear(0, 'horizontal')
    separator('horizontal')
    container(0, MATCH, () => {
      weight(1)
      linear()
      separator()
      state$.get().components.forEach((c, index) => {
        container(MATCH, WRAP, () => {
          observe(state$, state => {
            background(state.view === c.key ? color.light_primary : 'white')
          })
          padding(8)
          text(c.key)
          style(font.normal_12)
          onClick(() => {
            state$.assign('view', c.key)
            state$.assign('component', c.value[0])
          })
        })
      })
    })
    container(0, MATCH, () => {
      weight(2)
      linear(16)
      padding(16, 0, 0, 0)
      scrollable()
      observe(state$, state => {
        clear()
        const view = state.components.find(it => it.key === state.view).value
        tree(screen, view.slice(0))
      })
    })
    container(0, MATCH, () => {
      weight(3)
    })
  })
}
