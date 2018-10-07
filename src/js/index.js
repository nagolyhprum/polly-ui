import Screen from 'rave/screen'
import Canvas from 'rave/canvas/html'
import Observable from 'rave/observable'
// resources
import color from './res/color'
import drawable from './res/drawable'
import font from './res/font'
import string from './res/string'

import Home from 'app/index'

import state from 'app/state'

const canvas = new Canvas(document.getElementsByTagName('canvas')[0])
const resources = {
  color,
  drawable,
  font,
  string
}

const screen = new Screen(
  new Observable(state),
  resources,
  canvas
)

const setSize = () => {
  const ratio = canvas.getRatio() || 1
  canvas.canvas.width = window.innerWidth * ratio
  canvas.canvas.height = window.innerHeight * ratio
  canvas.canvas.style.width = window.innerWidth + 'px'
  canvas.canvas.style.height = window.innerHeight + 'px'
}
setSize()
screen.start(Home)
window.onresize = function () {
  setSize()
  screen.render()
}
