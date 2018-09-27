import './prototype'
import Screen from 'rave/screen'
import Canvas from 'rave/canvas/html'
import Splash from 'views/splash'
new Screen(new Canvas(document.getElementsByTagName('canvas')[0])).start(Splash)
