import Screen from 'rave/screen'
import Observable from 'rave/observable'
import { getter } from 'utils'

const mapObject = arr => arr.reduce((map, obj) => Object.assign(map, {
  [obj.key]: obj.value
}), {})

const getFonts = state => mapObject(state.fonts)
const getText = state => mapObject(state.text)
const getColors = state => mapObject(state.colors)
const getImages = state => mapObject(state.images)

const parseNumber = (screen, input) => {
  if (input.match(/\d+%/)) {
    return screen.PERCENT(parseInt(input))
  }
  return parseInt(input)
}

const generateContent = (components, component) => screen => {
  let start
  while (component.length) {
    const top = component.shift()
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
      adapter,
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
            src(drawable[top.src[0]], color[top.src[1]])
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
          if (top.adapter) {
            const subview = screen => generateContent(components, components.find(it => it.key === top.adapter[0]).value.slice(0))(screen)
            const property = Observable.derive(screen.state$, state => getter(state, ...top.adapter[1]))
            adapter(property, subview)
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
          generateContent(components, component)(screen)
        })
        break
      case 'pop':
        return
    }
  }
}

export default screen => {
  const {
    container,
    screen: renderScreen,
    linear,
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
    child.state$ = new Observable(it.state)
    Object.assign(child.resources.color, getColors(it))
    Object.assign(child.resources.drawable, getImages(it))
    Object.assign(child.resources.font, getFonts(it))
    Object.assign(child.resources.string, getText(it))
    child.start(generateContent(it.components, it.components[0].value.slice(0)))
  })
  container(_ => child => ({
    width: child.bounds.height * 480 / 856
  }), _ => child => ({
    height: child.parent.parent.bounds.height * 0.75
  }), () => {
    renderScreen(child)
  })
}
