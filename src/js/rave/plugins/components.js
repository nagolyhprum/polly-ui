import Observable from 'rave/observable'
import font from 'font'
import drawable from 'drawable'

const slightRound = 4

export default function (screen) {
  screen.fab = function (icon = drawable.icons.add_white, color = 'gold') {
    this.padding(8)
    this.src(icon)
    this.background(color)
    this.circle()
  }
  screen.button = function (color) {
    this.textAlign('center')
    this.padding(16)
    this.textColor('white')
    if (color) {
      this.round(child => Math.min(child.bounds.width / 2, child.bounds.height / 2))
      this.background(color)
    }
  }
  screen.card = function () {
    this.background('white')
    this.round(slightRound)
    this.shadow()
  }
  screen.tabs = function (...tabs) {
    const tab$ = new Observable(0)
    this.container(this.MATCH, this.WRAP, () => {
      const horizontal = this.container(this.MATCH, this.WRAP, () => {
        this.linear(0, 'horizontal')
        tabs.forEach((text, index) => {
          this.container(0, this.WRAP, () => {
            this.textColor(index ? 'black' : 'white')
            this.padding(16)
            this.weight(1)
            this.text(text)
            this.style(font.normal_12)
            this.textAlign('center')
            this.onClick(() => tab$.set(index))
          })
        })
      })
      const indicator = this.container(dim => view => ({
        width: view.parent.bounds.width / tabs.length
      }), 5, () => {
        this.position(0, 1)
        this.anchor(0, 1)
        this.background('gold')
      })
      tab$.observe(tab => {
        horizontal.children.forEach(child => {
          child.text.color = 'black'
        })
        horizontal.children[tab].text.color = 'white'
        this.active = indicator
        this.animate({
          x: indicator.x
        }, {
          x: tab * horizontal.bounds.width / tabs.length
        }, 300)
      })
    })
    return tab$
  }
}
