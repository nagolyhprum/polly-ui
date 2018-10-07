export default screen => {
  screen.plugins.prerender.push(view => {
    if(screen === screen.main) {      
      screen.canvas.clear()
    }
  })
}
