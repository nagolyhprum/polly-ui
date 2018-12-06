const KEYS = {
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
  32: 'space'
}

const getKey = keycode => KEYS[keycode] || String.fromCharCode(keycode)

export default screen => {
  const { canvas } = screen
  const intervals = {}
  screen.extend({
    onKeyDown (view, object) {
      canvas.onKeyDown(keycode => {
        const key = getKey(keycode)
        if (object[key]) {
          object[key]()
        }
      })
    },
    onKeyUp (view, object) {
      canvas.onKeyUp(keycode => {
        const key = getKey(keycode)
        if (object[key]) {
          object[key]()
        }
      })
    },
    onKeyPressed (view, object) {
      canvas.onKeyDown(keycode => {
        const key = getKey(keycode)
        if (object[key] && !intervals[key]) {
          intervals[key] = screen.onRender(object[key])
        }
      })
      canvas.onKeyUp(keycode => {
        const key = getKey(keycode)
        if (intervals[key]) {
          intervals[key]()
          delete intervals[key]
        }
      })
    }
  })
}
