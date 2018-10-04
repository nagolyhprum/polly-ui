import Observable from 'rave/observable'
import font from 'font'
import color from 'color'
import drawable from 'drawable'

const slightRound = 4

export default screen => {
  screen.extend({
    fab (view, icon = drawable.icons.add_white, color = 'gold') {
      screen.padding(8)
      screen.src(icon)
      screen.background(color)
      screen.circle()
    },
    button (view, color) {
      screen.textAlign('center')
      screen.padding(16)
      screen.textColor('white')
      if (color) {
        screen.round(child => Math.min(child.bounds.width / 2, child.bounds.height / 2))
        screen.background(color)
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
