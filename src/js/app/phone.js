import Screen from 'rave/screen'
import Canvas from 'rave/canvas/html'

const mapObject = arr => arr.reduce((map, obj) => Object.assign(map, {
  [obj.key]: obj.value
}), {})

const getFonts = state => mapObject(state.fonts)
const getStrings = state => mapObject(state.strings)
const getColors = state => mapObject(state.colors)
const getDrawables = state => mapObject(state.drawables)

const parseNumber = (screen, input) => {
  if (input.match(/\d+%/)) {
    return screen.PERCENT(parseInt(input))
  }
  return parseInt(input)
}

const generateContent = views => screen => {
  let start
  while (views.length) {
    const top = views.shift()
    start = start || top
    const {
      container,
      background,
      linear,
      shadow,
      src,
      padding,
      position,
      anchor,
      text,
      style,
      weight,
      fab,
      textColor,
      margin,
      scrollable,
      separator,
      resources: {
        color,
        string,
        font,
        drawable
      }
    } = screen
    switch (top.action) {
      case 'push':
        container(screen[top.width] || parseNumber(screen, top.width), screen[top.height] || parseNumber(screen, top.height), () => {
          if (top.fab) {
            fab(drawable[top.fab[0]], color[top.fab[1]])
          }
          if (top.shadow) {
            shadow()
          }
          if (top.margin) {
            margin(...top.margin)
          }
          if (top.padding) {
            padding(...top.padding)
          }
          if (top.src) {
            src(drawable[top.src])
          }
          if (top.linear) {
            linear(...top.linear)
          }
          if (top.background) {
            background(color[top.background] || top.background)
          }
          if (top.anchor) {
            anchor(...top.anchor)
          }
          if (top.position) {
            position(...top.position)
          }
          if (top.text) {
            text(string[top.text] || top.text)
          }
          if (top.style) {
            style(font[top.style] || top.style)
          }
          if (top.textColor) {
            textColor(color[top.textColor] || top.textColor)
          }
          if (top.weight) {
            weight(top.weight)
          }
          if (top.scrollable) {
            scrollable()
          }
          if (top.separator) {
            separator(top.separator)
          }
          generateContent(views)(screen)
        })
        break
      case 'pop':
        return
    }
  }
  console.log('unbalanced push to pop', start)
}

export default screen => {
  const {
    container,
    background,
    screen: renderScreen,
    state$
  } = screen
  const child = new Screen(null, {
    color: {},
    drawable: {},
    font: {},
    string: {}
  }, screen.canvas)
  state$.observe(it => {
    child.children = []
    Object.assign(child.resources.color, getColors(it))
    Object.assign(child.resources.drawable, getDrawables(it))
    Object.assign(child.resources.font, getFonts(it))
    Object.assign(child.resources.string, getStrings(it))
    child.start(generateContent(it.views.slice(0)))
  })
  container(_ => child => ({
    width: child.bounds.height * 480 / 856
  }), _ => child => ({
    height: child.parent.parent.bounds.height * 0.75
  }), () => {
    renderScreen(child)
  })
}
