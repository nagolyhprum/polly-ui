import Screen from 'rave/screen'
import Canvas from 'rave/canvas/html'
// resources
import color from './res/color'
import drawable from './res/drawable'
import font from './res/font'
import string from './res/string'

import Home from 'app/index'

import state from 'app/state'

const canvas = document.getElementsByTagName('canvas')[0]
const resources = {
  color,
  drawable,
  font,
  string
}

const screen = new Screen(
  state,
  resources,
  new Canvas(canvas)
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
