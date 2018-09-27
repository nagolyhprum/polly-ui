export function(screen) {
  return function(view) {
    if(view === screen) {      
      screen.canvas.clear()
    }
  }
}
