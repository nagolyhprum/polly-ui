export default parent => {
  parent.extend({
    screen(view, child) {
      child.main = parent
      view.render = () => {
        child.render(view.bounds)
      }
    }
  })
}
