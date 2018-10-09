import { assign } from 'utils'

const tree = (screen, views) => {
  const {
    container,
    text,
    linear,
    padding,
    onClick,
    background,
    state$,
    observe,
    resources: {
      color
    },
    WRAP,
    MATCH
  } = screen
  while (views.length) {
    const top = views.shift()
    switch (top.action) {
      case 'push':
        container(WRAP, WRAP, () => {
          padding(0, 0, 0, 16)
          container(WRAP, WRAP, () => {
            linear(8)
            container(WRAP, WRAP, () => {
              padding(8)
              const hint = top.text || top.src || (top.adapter && top.adapter[0]) || (top.fab && top.fab[0]) || `${top.width}, ${top.height}`
              text(`${top.type}${hint ? ` (${hint})` : ''}`)
              observe(state$, state => {
                background(state.component === top ? color.light_primary : 'white')
              })
              onClick(() => {
                state$.set(assign(state$.get(), 'component', top))
              })
            })
            tree(screen, views)
          })
          container(1, MATCH, () => {
            background('black')
          })
        })
        break
      case 'pop':
        return
    }
  }
  console.log(views)
}

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
      state$.get().views.forEach((c, index) => {
        container(MATCH, WRAP, () => {
          observe(state$, state => {
            background(state.view === c.key ? color.light_primary : 'white')
          })
          padding(8)
          text(c.key)
          style(font.normal_12)
          onClick(() => {
            state$.set(assign(state$.get(), 'view', c.key))
          })
        })
      })
    })
    container(0, MATCH, () => {
      weight(2)
      linear(16)
      padding(16, 0, 0, 0)
      observe(state$, state => {
        clear()
        const view = state.views.find(it => it.key === state.view).value
        tree(screen, view.slice(0))
      })
    })
    container(0, MATCH, () => {
      weight(3)
    })
  })
}
