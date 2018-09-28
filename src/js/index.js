import './prototype'
import Screen from 'rave/screen'
import Canvas from 'rave/canvas/html'
import Splash from 'views/splash'

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

const screen = new Screen(
  new Canvas(document.getElementsByTagName('canvas')[0]),
  alpha,
  shadow,
  background,
  image,
  overflow,
  separator,
  textbox,
  text,
  layout(true),
  // not drawn
  components,
  scrollable,
  mouse,
  linear,
  highlight
)
screen.start(Splash)
