import Observable from 'rave/observable'

const slightRound = 4

export default screen => {
  const {
    resources: {
      font,
      color,
      drawable
    }
  } = screen
  screen.extend({
    pager (view, tab$, render) {
      screen.container(screen.MATCH, screen.MATCH, pager => {
        render()
        screen.observe(tab$, tab => {
          pager.children.forEach((child, index) => {
            screen.active = child
            screen.animateVisibility(index === tab)
          })
        })
      })
    },
    fab (view, icon = drawable.content.add, background = color.accent) {
      screen.padding(16)
      screen.src(icon)
      screen.background(background)
      screen.circle()
      screen.shadow()
    },
    button (view, background) {
      screen.textAlign('center')
      screen.padding(16)
      screen.textColor('white')
      if (background) {
        screen.round(child => Math.min(child.bounds.width / 2, child.bounds.height / 2))
        screen.background(background)
      }
    },
    card (view) {
      screen.background('white')
      screen.round(slightRound)
      screen.shadow()
    },
    tabs (view, ...tabs) {
      const tab$ = new Observable(0)
      screen.container(screen.MATCH, screen.WRAP, () => {
        screen.background(color.primary)
        const horizontal = screen.container(screen.MATCH, screen.WRAP, () => {
          screen.linear(0, 'horizontal')
          tabs.forEach((text, index) => {
            screen.container(0, screen.WRAP, () => {
              screen.textColor(index ? color.primary_text : 'white')
              screen.padding(16)
              screen.weight(1)
              screen.text(text)
              screen.style(font.normal_12)
              screen.textAlign('center')
              screen.onClick(() => tab$.set(index))
            })
          })
        })
        const indicator = screen.container(dim => view => ({
          width: view.parent.bounds.width / tabs.length
        }), 5, () => {
          screen.position(0, 1)
          screen.anchor(0, 1)
          screen.background(color.accent)
        })
        tab$.observe(tab => {
          horizontal.children.forEach(child => {
            child.text.color = color.primary_text
          })
          horizontal.children[tab].text.color = 'white'
          screen.animateObject(indicator, {
            x: indicator.x
          }, {
            x: tab * horizontal.bounds.width / tabs.length
          }, 300)
        })
      })
      return tab$
    }
  })
}
