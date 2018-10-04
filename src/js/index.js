import Screen from 'rave/screen'
import Canvas from 'rave/canvas/html'
import drawable from 'drawable'
import color from 'color'
import font from 'font'
//plugins
import link from 'plugins/link'
import layout from 'plugins/layout'
import shadow from 'plugins/shadow'
import background from 'plugins/background'
import image from 'plugins/image'
import alpha from 'plugins/alpha'
import separator from 'plugins/separator'
import overflow from 'plugins/overflow'
import textbox from 'plugins/textbox'
import text from 'plugins/text'
import scrollable from 'plugins/scrollable'
import mouse from 'plugins/mouse'
import components from 'plugins/components'
import linear from 'plugins/linear'
import highlight from 'plugins/highlight'
import round from 'plugins/round'
import circle from 'plugins/circle'
import clear from 'plugins/clear'

const canvas = document.getElementsByTagName('canvas')[0]
const screen = new Screen(
  new Canvas(canvas),
  clear,
  alpha,
  shadow,
  background,
  round,
  circle,
  image,
  overflow,
  separator,
  text,
  layout(false),
  // not drawn
  link,
  textbox,
  components,
  scrollable,
  mouse,
  linear,
  highlight
)

/*
container(WRAP, WRAP, () => {
  src(drawable.navigation.menu)
  onClick(() => {

  })
})
*/

const Home = (screen, state) => {
  const {
    style,
    padding,
    container,
    background,
    text,
    textColor,
    src,
    linear,
    position,
    anchor,
    onClick,
    link,
    weight,
    margin,
    shadow,
    round,
    circle,
    tabs,
    textAlign,
    MATCH,
    WRAP,
    PERCENT
  } = screen
  container(MATCH, MATCH, () => {
    linear()
    container(MATCH, WRAP, () => {
      linear(16, "horizontal")
      background(color.primary)
      padding(16)
      container(0, WRAP, () => {
        link("/")
        text("Poly UI")
        textColor("white")
        style(font.bold_20)
        anchor(0, .5)
        position(0, .5)
        weight(1)
      })
      container(WRAP, WRAP, () => {
        src(drawable.action.feedback)
      })
    })
    container(MATCH, 0, () => {
      weight(1)
      background(color.light_primary)
      linear(0, "horizontal")
      container(0, MATCH, () => {
        background("white")
        weight(1)
        margin(64, 64, 64, 0)
        shadow()
        container(MATCH, WRAP, () => {
          textColor("white")
          textAlign("center")
          padding(16)
          background(color.primary)
          text("Properties")
        })
      })
      container(WRAP, WRAP, () => {
        padding(16)
        anchor(0, .5)
        position(0, .5)
        background("black")
        round(20)
        linear(16)
        container(WRAP, WRAP, () => {
          linear(16, "horizontal")
          anchor(.5, 0)
          position(.5, 0)
          container(10, 10, () => {
            background("#757575")
            circle()
          })
          container(25, 5, () => {
            background("#EDEDED")
            anchor(0, .5)
            position(0, .5)
          })
          container(10, 10, () => {
            background("#757575")
            circle()
          })
        })
        container(_ => child => ({ width : child.bounds.height * 480 / 856 }), _ => child => ({ height : child.parent.parent.bounds.height * .75 }), () => {
          background("white")
          //CONTENT
        })
        container(30, 15, () => {
          background("#757575")
          round(5)
          anchor(.5, 0)
          position(.5, 0)
        })
      })
      container(0, MATCH, () => {
        background("white")
        weight(1)
        margin(64, 0, 64, 64)
        shadow()
        linear()
        container(MATCH, WRAP, () => {
          textColor("white")
          textAlign("center")
          padding(16)
          background(color.primary)
          text("Resources")
        })
        tabs("Screens", "Images", "Text", "Colors")
      })
    })
  })
}

screen.container(screen.MATCH, screen.MATCH, () => {
  Home(screen, {})
})

const setSize = () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}
setSize()

window.onresize = function() {
  setSize()
  screen.render()
}
