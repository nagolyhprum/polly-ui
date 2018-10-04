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
import colorPI from 'plugins/color'

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
  highlight,
  colorPI
)

/*
container(WRAP, WRAP, () => {
  src(drawable.navigation.menu)
  onClick(() => {

  })
})
*/

const list = [{
  title : "Demo Capabilities of Poly UI",
  description : "By showing a list"
}, {
  title : "Demo Capabilities of Poly UI",
  description : "By showing a list"
}, {
  title : "Demo Capabilities of Poly UI",
  description : "By showing a list"
}, {
  title : "Demo Capabilities of Poly UI",
  description : "By showing a list"
}, {
  title : "Demo Capabilities of Poly UI",
  description : "By showing a list"
}, {
  title : "Demo Capabilities of Poly UI",
  description : "By showing a list"
}, {
  title : "Demo Capabilities of Poly UI",
  description : "By showing a list"
}, {
  title : "Demo Capabilities of Poly UI",
  description : "By showing a list"
}, {
  title : "Demo Capabilities of Poly UI",
  description : "By showing a list"
}]

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
    scrollable,
    onColorChange,
    fab,
    separator,
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
        textColor(color.text)
        style(font.bold_20)
        anchor(0, .5)
        position(0, .5)
        weight(1)
      })
      container(32, 32, () => {
        src(drawable.action.feedback)
        anchor(0, .5)
        position(0, .5)
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
          textColor(color.text)
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

          container(MATCH, MATCH, () => {
            linear()
            container(MATCH, 16, () => {
              background(color.dark_primary)
            })
            container(MATCH, 16 * 16, () => {
              background(color.primary)
              padding(16)
              container(32, 32, () => {
                src(drawable.navigation.back)
              })
              container(32, 32, () => {
                src(drawable.navigation.more_vert)
                anchor(1, 0)
                position(1, 0)
              })
              container(WRAP, WRAP, () => {
                anchor(.5, .5)
                position(.5, .5)
                linear(8)
                container(WRAP, WRAP, () => {
                  text("Poly UI Preview")
                  style(font.bold_36)
                  textColor(color.text)
                })
                container(WRAP, WRAP, () => {
                  text("Demo of color pallette")
                  style(font.regular_16)
                  textColor(color.light_primary)
                })
              })
            })
            container(MATCH, 0, () => {
              weight(1)
              container(MATCH, MATCH, () => {
                linear()
                scrollable()
                separator()
                list.forEach(it => {
                  container(MATCH, WRAP, () => {
                    padding(16)
                    linear(16, "horizontal")
                    container(24, 24, () => {
                      src(drawable.navigation.check)
                      anchor(0, .5)
                      position(0, .5)
                    })
                    container(WRAP, WRAP, () => {
                      linear(8)
                      container(WRAP, WRAP, () => {
                        text(it.title)
                        textColor(color.primary_text)
                        style(font.regular_16)
                      })
                      container(WRAP, WRAP, () => {
                        text(it.description)
                        textColor(color.secondary_text)
                        style(font.regular_12)
                      })
                    })
                  })
                })
              })
              container(72, 56, () => {
                fab()
                margin(0, 16, 0, 0)
                anchor(1, .5)
                position(1, 0)
              })
            })
          })
          //END CONTENT
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
        weight(2)
        margin(64, 0, 64, 64)
        shadow()
        linear()
        container(MATCH, WRAP, () => {
          textColor(color.text)
          textAlign("center")
          padding(16)
          background(color.primary)
          text("Resources")
        })
        const tabs$ = tabs("Screens", "Images", "Text", "Colors", "Fonts")
        container(MATCH, 0, () => {
          weight(1)
          linear()
          padding(0, 16, 16, 16)
          state.colors.forEach(c => {
            container(MATCH, 0, () => {
              text(c.name)
              textAlign("center")
              weight(1)
              style(font.normal_12)
            })
            container(MATCH, 0, () => {
              weight(1)
              background(c.value)
              onColorChange(c, () => {
                //TODO
              })
            })
          })
        })
      })
    })
  })
}

screen.container(screen.MATCH, screen.MATCH, () => {
  Home(screen, {
    colors : [{
      name : "Dark Primary",
      value : "#00796B",
      key: "dark_primary"
    }, {
      name : "Light Primary",
      value : "#B2DFDB",
      key: "light_primary"
    }, {
      name : "Primary",
      value : "#009688",
      key: "primary"
    }, {
      name : "Accent",
      value : "#FF9800",
      key: "accent"
    }, {
      name : "Primary Text",
      value : "#212121",
      key: "primary_text"
    }, {
      name : "Secondary Text",
      value : "#757575",
      key: "secondary_text"
    }, {
      name : "Divider",
      value : "#BDBDBD",
      key: "divider_color"
    }]
  })
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
