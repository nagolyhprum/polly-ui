export default screen => {
  screen.extend({
    link(view, url) {
      screen.onClick(() => {
        window.location = url
      })
    }
  })
}
