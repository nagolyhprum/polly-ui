export default function (screen) {

  return function(view) {
    if (view.overflow === false) {
      screen.canvas.clip()
    }
  }
}
