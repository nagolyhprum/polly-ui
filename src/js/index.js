import './prototype'
import Splash from './views/splash'
import Screen from './rave/screen'
new Screen(document.getElementsByTagName('canvas')[0]).start(Splash)
