import Screen from 'rave/screen'
import Canvas from 'rave/canvas/html'

const LIST = [{}, {}, {}, {}, {}, {}, {}, {}]

const mapObject = arr => arr.reduce((map, obj) => Object.assign(map, {
  [obj.key] : obj.value
}), {})

const getStrings = state => mapObject(state.strings)
const getColors = state => mapObject(state.colors)
const getDrawables = state => mapObject(state.drawables)

const content = screen => {
  const {
    fab,
    scrollable,
    separator,
    container,
    background,
    linear,
    src,
    anchor,
    position,
    padding,
    margin,
    text,
    style,
    textColor,
    weight,
    shadow,
    MATCH,
    WRAP,
    resources: {
      color,
      drawable,
      font,
      string
    }
  } = screen
  container(MATCH, MATCH, () => {
    background("white")
    linear()
    container(MATCH, 16, () => {
      background(color.dark_primary)
    })
    container(MATCH, 16 * 16, () => {
      background(color.primary)
      padding(16)
      shadow()
      container(32, 32, () => {
        src(drawable.back)
      })
      container(32, 32, () => {
        src(drawable.more_vert)
        anchor(1, 0)
        position(1, 0)
      })
      container(WRAP, WRAP, () => {
        anchor(0.5, 0.5)
        position(0.5, 0.5)
        linear(8)
        container(WRAP, WRAP, () => {
          text(string.title)
          style(font.bold_36)
          textColor(color.text)
        })
        container(WRAP, WRAP, () => {
          text(string.subtitle)
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
        LIST.forEach(it => {
          container(MATCH, WRAP, () => {
            padding(16)
            linear(16, 'horizontal')
            container(24, 24, () => {
              src(drawable.check, color.secondary_text)
              anchor(0, 0.5)
              position(0, 0.5)
            })
            container(WRAP, WRAP, () => {
              linear(8)
              container(WRAP, WRAP, () => {
                text(string.list_title)
                textColor(color.primary_text)
                style(font.regular_16)
              })
              container(WRAP, WRAP, () => {
                text(string.list_subtitle)
                textColor(color.secondary_text)
                style(font.regular_12)
              })
            })
          })
        })
      })
      container(72, 56, () => {
        fab(drawable.add)
        margin(0, 16, 0, 0)
        anchor(1, 0.5)
        position(1, 0)
      })
    })
  })
}

export default screen => {
  const {
    container,
    background,
    screen: renderScreen,
    state$
  } = screen

  const resources = {
    color : getColors(state$.get()),
    drawable : getDrawables(state$.get()),
    font : screen.resources.font,
    string : getStrings(state$.get())
  }
  const canvas = screen.canvas
  const child = new Screen(null, resources, canvas)
  child.start(content)

  container(_ => child => ({
    width: child.bounds.height * 480 / 856
  }), _ => child => ({
    height: child.parent.parent.bounds.height * 0.75
  }), () => {
    renderScreen(child)
  })
}
