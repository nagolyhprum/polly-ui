import Screen from 'rave/screen'
import Canvas from 'rave/canvas/html'
// resources
import color from './res/color'
import drawable from './res/drawable'
import font from './res/font'
import string from './res/string'
// plugins
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

import Home from 'app/index'

const state = {
  colors: [{
    name: 'Dark Primary',
    value: '#00796B',
    key: 'dark_primary'
  }, {
    name: 'Light Primary',
    value: '#B2DFDB',
    key: 'light_primary'
  }, {
    name: 'Primary',
    value: '#009688',
    key: 'primary'
  }, {
    name: 'Accent',
    value: '#FF9800',
    key: 'accent'
  }, {
    name: 'Primary Text',
    value: '#212121',
    key: 'primary_text'
  }, {
    name: 'Secondary Text',
    value: '#757575',
    key: 'secondary_text'
  }, {
    name: 'Divider',
    value: '#BDBDBD',
    key: 'divider_color'
  }]
}

const canvas = document.getElementsByTagName('canvas')[0]
const plugins = [
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
]
const resources = {
  color,
  drawable,
  font,
  string
}

const screen = new Screen(
  state,
  resources,
  new Canvas(canvas),
  ...plugins
)

const setSize = () => {
  const ratio = window.devicePixelRatio || 1
  canvas.width = window.innerWidth * ratio
  canvas.height = window.innerHeight * ratio
  canvas.style.width = window.innerWidth + 'px'
  canvas.style.height = window.innerHeight + 'px'
}
setSize()
screen.start(Home)
window.onresize = function () {
  setSize()
  screen.render()
}
